import { NextRequest, NextResponse } from "next/server";

const LEETCODE_GRAPHQL_URL = "https://leetcode.com/graphql";
const LEETCODE_FETCH_TIMEOUT_MS = 8000;

type LeetCodeCalendarResponse = {
  data?: {
    matchedUser?: {
      userCalendar?: {
        submissionCalendar?: string | Record<string, number>;
      };
      submitStats?: {
        acSubmissionNum?: Array<{ count: number; difficulty: string }>;
      };
    } | null;
  };
  errors?: Array<{ message?: string }>;
};

async function fetchUserCalendar(username: string, year: number) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), LEETCODE_FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(LEETCODE_GRAPHQL_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "https://leetcode.com",
        referer: `https://leetcode.com/${username}/`,
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({
        operationName: "userProfileCalendar",
        variables: { username, year },
        query: `
                query userProfileCalendar($username: String!, $year: Int) {
                  matchedUser(username: $username) {
                    userCalendar(year: $year) {
                      submissionCalendar
                    }
                    submitStats {
                      acSubmissionNum {
                        count
                        difficulty
                      }
                    }
                  }
                }
            `,
      }),
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`LeetCode request failed with status ${response.status}`);
    }

    return (await response.json()) as LeetCodeCalendarResponse;
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }

  try {
    const currentYear = new Date().getFullYear();
    const [current, previous] = await Promise.all([
      fetchUserCalendar(username, currentYear),
      fetchUserCalendar(username, currentYear - 1),
    ]);

    const matchedUser =
      current.data?.matchedUser ?? previous.data?.matchedUser ?? null;
    const currentCalendar =
      current.data?.matchedUser?.userCalendar?.submissionCalendar;
    const previousCalendar =
      previous.data?.matchedUser?.userCalendar?.submissionCalendar;

    const parseCalendar = (calendar?: string | Record<string, number>) => {
      if (!calendar) return {};
      if (typeof calendar === "string") {
        try {
          return JSON.parse(calendar) as Record<string, number>;
        } catch {
          return {};
        }
      }

      return calendar;
    };

    const mergedCalendar = {
      ...parseCalendar(previousCalendar),
      ...parseCalendar(currentCalendar),
    };

    const totalSolved =
      matchedUser?.submitStats?.acSubmissionNum?.find(
        (item) => item.difficulty === "All",
      )?.count ?? 0;

    return NextResponse.json({
      status: "success",
      totalSolved,
      submissionCalendar: mergedCalendar,
    });
  } catch (error) {
    console.error("Failed to fetch LeetCode data:", error);
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        { status: "error", message: "LeetCode request timed out" },
        { status: 504 },
      );
    }
    return NextResponse.json(
      { status: "error", message: "Unable to load LeetCode activity" },
      { status: 502 },
    );
  }
}
