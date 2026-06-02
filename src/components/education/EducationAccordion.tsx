'use client';

import { educationData } from '@/config/Education';
import { educationSchema } from '@/types/education';
import Link from 'next/link';
import React from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Container from '../common/Container';

function EducationAvatar({ education }: { education: educationSchema }) {
  const { institution, logo } = education;

  return (
    <Avatar className="size-10 shrink-0 border border-border/80 sm:size-11">
      {logo ? (
        <AvatarImage
          src={logo}
          alt={institution}
          className="bg-background object-contain"
        />
      ) : (
        <AvatarFallback className="text-xs font-medium">
          {institution[0]}
        </AvatarFallback>
      )}
    </Avatar>
  );
}

export default function EducationAccordion() {
  return (
    <Container className='border border-dashed dark:border-white/10 border-black/20 p-6 rounded-lg'>
      <Accordion
        type="single"
        collapsible
        defaultValue={`${educationData[0]?.institution}-0`}
        className="w-full"
      >
        {educationData.map((education, index) => {
          const { institution, degree, start, end, description, href } =
            education;
          const value = `${institution}-${index}`;

          return (
            <AccordionItem
              key={value}
              value={value}
              className="border-border/60 px-1"
            >
              <AccordionTrigger className="gap-3 py-3 hover:no-underline sm:gap-4 sm:py-3.5 [&>svg]:text-muted-foreground">
                <div className="flex min-w-0 flex-1 items-center gap-3 text-left sm:gap-4">
                  <EducationAvatar education={education} />
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <p className="truncate text-sm font-semibold leading-tight sm:text-base">
                      {institution}
                    </p>
                    <p className="line-clamp-2 text-xs text-muted-foreground sm:text-sm">
                      {degree}
                    </p>
                  </div>
                  <time className="hidden shrink-0 text-xs tabular-nums text-muted-foreground sm:block">
                    {start}
                    {' – '}
                    {end ?? 'Present'}
                  </time>
                </div>
              </AccordionTrigger>

              <AccordionContent className="pb-3 pl-[52px] sm:pl-[60px]">
                {href && (
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-2 inline-flex text-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {institution}
                  </Link>
                )}
                <time className="mb-2 block text-xs tabular-nums text-muted-foreground sm:hidden">
                  {start}
                  {' – '}
                  {end ?? 'Present'}
                </time>
                {description && description.length > 0 && (
                  <ul className="list-outside list-disc space-y-1.5 pl-4">
                    {description.map((item, i) => (
                      <li
                        key={i}
                        className="text-sm leading-relaxed text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

    </Container>
  );
}
