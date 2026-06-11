import Link from 'next/link';
import React from 'react';

interface SkillProps {
  name: string;
  href: string;
  children: React.ReactNode;
}

export default function Skill({ name, href, children }: SkillProps) {
  return (
    <Link
      href={href ?? ''}
      className="inline-flex items-center gap-1.5 text-sm bg-black/5 dark:bg-white/15 border border-dashed dark:border-white/30 border-black/20 py-1 px-2 rounded-md skill-inner-shadow text-black dark:text-white"
    >
      <span className="flex size-4 shrink-0 items-center justify-center [&_svg]:size-full">
        {children}
      </span>
      <span className="text-sm font-bold leading-none">{name}</span>
    </Link>
  );
}
