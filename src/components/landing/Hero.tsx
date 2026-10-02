import { heroConfig, skillComponents, socialLinks } from '@/config/Hero';
import { parseTemplate } from '@/lib/hero';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

import Container from '../common/Container';
import Skill from '../common/Skill';
import CV from '../svgs/CV'
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const buttonIcons = {
  CV: CV,
};

export default function Hero() {
  const { name, title, avatar, skills, description, location, email, buttons } =
    heroConfig;

  const renderDescription = () => {
    const parts = parseTemplate(description.template, skills);

    return parts.map((part) => {
      if (part.type === 'skill' && 'skill' in part && part.skill) {
        const SkillComponent =
          skillComponents[part.skill.component as keyof typeof skillComponents];
        return (
          <Skill key={part.key} name={part.skill.name} href={part.skill.href}>
            <SkillComponent />
          </Skill>
        );
      } else if (part.type === 'bold' && 'text' in part) {
        return (
          <b key={part.key} className="whitespace-pre-wrap text-primary">
            {part.text}
          </b>
        );
      } else if (part.type === 'text' && 'text' in part) {
        return (
          <span key={part.key} className="whitespace-pre-wrap">
            {part.text}
          </span>
        );
      }
      return null;
    });
  };

  return (
    <Container className="mx-auto max-w-5xl">
      {/* Header: Avatar + Name + Title */}
      <div className="flex items-center gap-4">
        <Image
          src={avatar}
          alt="hero"
          width={100}
          height={100}
          className="size-14 rounded-xl border border-neutral-200 dark:border-neutral-800 object-cover"
        />
        <div>
          <h1 className="text-xl font-bold leading-tight">{name}</h1>
          <p className="text-secondary text-sm">{title}</p>
        </div>
      </div>

      {/* Metadata Row: Location & Email */}
      <div className="mt-6 flex flex-wrap items-start gap-x-8 gap-y-3">
        <div>
          <span className="hero-meta-label">LOCATION</span>
          <div className="flex items-center gap-1.5 text-sm text-foreground mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="size-3.5 text-secondary" fill="currentColor" viewBox="0 0 256 256">
              <path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z"/>
            </svg>
            <span>{location}</span>
          </div>
        </div>

        <div>
          <span className="hero-meta-label">EMAIL</span>
          <div className="flex items-center gap-1.5 text-sm text-foreground mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="size-3.5 text-secondary" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"/>
            </svg>
            <Link href={`mailto:${email}`} className="hover:underline">
              {email}
            </Link>
          </div>
        </div>
      </div>

      {/* Bio / Description */}
      <div className="mt-6 flex flex-wrap items-center gap-x-1.5 gap-y-2 text-sm md:text-[15px] text-secondary leading-relaxed">
        {renderDescription()}
      </div>

      {/* Buttons */}
      <div className="mt-8 flex flex-wrap gap-4">
        {buttons.map((button, index) => {
          const IconComponent =
            buttonIcons[button.icon as keyof typeof buttonIcons];
          return (
            <Button
              key={index}
              variant={button.variant as 'outline' | 'default'}
              className={cn(
                button.variant === 'outline' && 'inset-shadow-indigo-500',
                button.variant === 'default' && 'inset-shadow-indigo-500',
              )}
              asChild
            >
              <Link href={button.href}>
                {IconComponent && <IconComponent />}
                {button.text}
              </Link>
            </Button>
          );
        })}
      </div>

      {/* Social Links */}
      <div className="mt-6 flex items-center gap-3">
        {socialLinks.map((link) => (
          <Tooltip key={link.name} delayDuration={0}>
            <TooltipTrigger asChild>
              <Link
                href={link.href}
                className="text-secondary hover:text-foreground transition-colors"
              >
                <span className="size-5 block">{link.icon}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{link.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </Container>
  );
}
