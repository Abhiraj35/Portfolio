import { NextRequest, NextResponse } from 'next/server';
import * as z from 'zod';
import dns from 'node:dns';

dns.setDefaultResultOrder('ipv4first');

type RateLimitEntry = {
  count: number;
  resetTime: number;
};

type ContactSubmission = z.infer<typeof contactSchema>;
type EmailResult =
  | {
      sent: true;
    }
  | {
      sent: false;
      error: string;
    };

const rateLimitStore = new Map<string, RateLimitEntry>();

const RATE_LIMIT_WINDOW = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(120),
  message: z.string().trim().min(10).max(1000),
  company: z.string().optional(),
});

const HTML_ESCAPE_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => HTML_ESCAPE_MAP[character]);
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfConnectingIP = request.headers.get('cf-connecting-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  return 'unknown';
}

function pruneRateLimitStore(now: number) {
  for (const [clientIP, clientData] of rateLimitStore) {
    if (now > clientData.resetTime) {
      rateLimitStore.delete(clientIP);
    }
  }
}

function checkRateLimit(clientIP: string): {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  retryAfter: number;
} {
  const now = Date.now();
  pruneRateLimitStore(now);

  const clientData = rateLimitStore.get(clientIP);

  if (!clientData) {
    const resetTime = now + RATE_LIMIT_WINDOW;

    rateLimitStore.set(clientIP, {
      count: 1,
      resetTime,
    });

    return {
      allowed: true,
      remaining: RATE_LIMIT_MAX_REQUESTS - 1,
      resetTime,
      retryAfter: Math.ceil((resetTime - now) / 1000),
    };
  }

  const retryAfter = Math.ceil((clientData.resetTime - now) / 1000);

  if (clientData.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: clientData.resetTime,
      retryAfter,
    };
  }

  clientData.count += 1;
  rateLimitStore.set(clientIP, clientData);

  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX_REQUESTS - clientData.count,
    resetTime: clientData.resetTime,
    retryAfter,
  };
}

function getRateLimitHeaders(rateLimit: {
  remaining: number;
  resetTime: number;
  retryAfter: number;
}) {
  return {
    'Retry-After': rateLimit.retryAfter.toString(),
    'X-RateLimit-Limit': RATE_LIMIT_MAX_REQUESTS.toString(),
    'X-RateLimit-Remaining': rateLimit.remaining.toString(),
    'X-RateLimit-Reset': rateLimit.resetTime.toString(),
  };
}

function getEmailContent(data: ContactSubmission) {
  const submittedAt = new Date().toISOString();
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safeMessage = escapeHtml(data.message).replace(/\n/g, '<br />');

  return {
    subject: `Portfolio contact from ${data.name}`,
    text: [
      'New contact form submission',
      '',
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      '',
      'Message:',
      data.message,
      '',
      `Submitted: ${submittedAt}`,
    ].join('\n'),
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111827;">
        <h2 style="margin:0 0 16px;">New contact form submission</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
        <p style="color:#6b7280;font-size:12px;">Submitted: ${submittedAt}</p>
      </div>
    `.trim(),
  };
}

function getEmailProviderError(errorText: string) {
  if (errorText.includes('domain is not verified')) {
    return 'Contact email sender is not verified. Please configure CONTACT_FROM_EMAIL with a verified Resend domain address.';
  }

  return 'Message delivery failed. Please email me directly.';
}

async function sendEmail(data: ContactSubmission): Promise<EmailResult> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const contactToEmail = process.env.CONTACT_TO_EMAIL;
  const contactFromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !contactToEmail || !contactFromEmail) {
    console.error('Contact email environment variables are not configured');
    return {
      sent: false,
      error: 'Message delivery is not configured yet. Please email me directly.',
    };
  }

  const emailContent = getEmailContent(data);
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: contactFromEmail,
      to: [contactToEmail],
      reply_to: data.email,
      subject: emailContent.subject,
      text: emailContent.text,
      html: emailContent.html,
    }),
  });

  if (response.ok) {
    return { sent: true };
  }

  const errorText = await response.text();
  console.error('Failed to send contact email:', errorText);
  return {
    sent: false,
    error: getEmailProviderError(errorText),
  };
}

async function getRequestBody(request: NextRequest) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  const body = await getRequestBody(request);
  const parsedData = contactSchema.safeParse(body);

  if (!parsedData.success) {
    return NextResponse.json(
      { error: 'Please check the form and try again.' },
      { status: 400 },
    );
  }

  if (parsedData.data.company?.trim()) {
    return NextResponse.json({
      message: 'Message sent successfully.',
      success: true,
    });
  }

  const clientIP = getClientIP(request);
  const rateLimit = checkRateLimit(clientIP);
  const headers = getRateLimitHeaders(rateLimit);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        error:
          'You have sent a few messages recently. Please wait before trying again.',
        retryAfter: rateLimit.retryAfter,
      },
      {
        status: 429,
        headers,
      },
    );
  }

  try {
    const emailResult = await sendEmail(parsedData.data);

    if (!emailResult.sent) {
      return NextResponse.json(
        { error: emailResult.error },
        { status: 500, headers },
      );
    }

    return NextResponse.json(
      {
        message: "Thanks for your message. I'll get back to you soon.",
        success: true,
      },
      { headers },
    );
  } catch (error) {
    console.error('Contact API error:', error);

    return NextResponse.json(
      { error: 'Something went wrong. Please try again later.' },
      { status: 500, headers },
    );
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
