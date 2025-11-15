import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { educationSchema } from "@/types/education";

interface Props {
  education: educationSchema;
}

export default function EducationTimelineItem({ education }: Props) {
  const { institution, degree, start, end, logo, href, description } =
    education;

  return (
    <li className="relative ml-24 py-4 list-none">
      {href ? (
        <Link
          href={href}
          target="_blank"
          className="absolute -left-16 top-4 flex items-center justify-center rounded-full bg-white "
        >
          <Avatar className="size-12 border">
            {logo ? (
              <AvatarImage
                src={logo}
                alt={institution}
                className="bg-background object-contain"
              />
            ) : (
              <AvatarFallback>{institution[0]}</AvatarFallback>
            )}
          </Avatar>
        </Link>
      ) : (
        <div className="absolute -left-16 top-4 flex items-center justify-center rounded-full bg-white">
          <Avatar className="size-12 border">
            {logo ? (
              <AvatarImage
                src={logo}
                alt={institution}
                className="bg-background object-contain"
              />
            ) : (
              <AvatarFallback>{institution[0]}</AvatarFallback>
            )}
          </Avatar>
        </div>
      )}

      <div className="flex flex-1 flex-col justify-start gap-1 pl-2">
        <time className="text-xs text-muted-foreground">
          <span>{start}</span>
          <span>{" - "}</span>
          <span>{end ? end : "Present"}</span>
        </time>

        <h3 className="font-semibold leading-none">{institution}</h3>
        <p className="text-sm text-muted-foreground">{degree}</p>

        {description && (
          <ul className="ml-4 list-outside list-disc mt-2">
            {description.map((d, i) => (
              <li key={i} className="prose pr-8 text-sm dark:prose-invert">
                {d}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}
