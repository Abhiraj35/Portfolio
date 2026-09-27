'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { type Project } from '@/types/project';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

import Github from '../svgs/Github';
import PlayCircle from '../svgs/PlayCircle';
import Website from '../svgs/Website';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  // Link target: if case study exists, link to it; otherwise directly link to live demo
  const primaryHref = project.details
    ? project.projectDetailsPageSlug
    : project.live || project.link;
  const isExternal = !project.details;

  return (
    <article className="group/card relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/8 bg-card text-card-foreground shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-black/20 hover:shadow-[0_12px_28px_-8px_rgba(0,0,0,0.1)] dark:border-white/8 dark:bg-neutral-900/50 dark:shadow-[0_2px_10px_-4px_rgba(0,0,0,0.4)] dark:hover:border-white/20 dark:hover:shadow-[0_12px_28px_-8px_rgba(0,0,0,0.6)]">
      {/* Media / Preview Header */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-950 border-b border-black/6 dark:border-white/8">
        <Image
          className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover/card:scale-[1.03]"
          src={project.image}
          alt={project.title}
          width={1280}
          height={800}
          priority={false}
        />

        {/* Crisp inner border ring */}
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/5 dark:ring-white/10" />

        {/* Video Preview Overlay (only on hover if project has a video) */}
        {project.video && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                aria-label={`Watch video preview for ${project.title}`}
                className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/35 opacity-0 transition-opacity duration-300 ease-out group-hover/card:opacity-100 focus:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
              >
                <div className="flex size-14 scale-90 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-sm transition-transform duration-300 ease-out group-hover/card:scale-100">
                  <PlayCircle />
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-full p-0 border-0 bg-transparent overflow-hidden">
              <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl bg-black">
                <video
                  className="h-full w-full object-cover"
                  src={project.video}
                  autoPlay
                  loop
                  controls
                />
              </div>
              <DialogTitle className="sr-only">
                {project.title} Preview
              </DialogTitle>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-1 flex-col justify-between p-5 gap-3.5">
        <div className="space-y-3">
          {/* Project Header - Title on left, Action Icons on right */}
          <div className="flex items-start justify-between gap-3">
            <Link
              href={primaryHref}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
              className="group/title inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
            >
              <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover/card:text-primary">
                {project.title}
              </h3>
              <ArrowUpRight className="size-4 shrink-0 text-muted-foreground/70 transition-all duration-300 ease-out group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5 group-hover/card:text-primary" />
            </Link>

            <div className="flex items-center gap-1 shrink-0 pt-0.5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={project.live || project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-neutral-100 hover:text-foreground dark:hover:bg-neutral-800"
                    aria-label={`Visit ${project.title}`}
                  >
                    <Website className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Website</p>
                </TooltipContent>
              </Tooltip>

              {project.github && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-neutral-100 hover:text-foreground dark:hover:bg-neutral-800"
                      aria-label={`View GitHub source code for ${project.title}`}
                    >
                      <Github className="size-4" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View Source</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-[13px] leading-relaxed text-muted-foreground line-clamp-2">
            {project.description}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {project.technologies.map((technology, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 rounded-md border border-black/6 bg-neutral-100/80 px-2 py-1 text-[11px] font-medium text-neutral-700 transition-colors hover:bg-neutral-200/70 hover:text-neutral-900 dark:border-white/8 dark:bg-neutral-900/60 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
              >
                <span className="flex size-3.5 shrink-0 items-center justify-center">
                  {technology.icon}
                </span>
                <span className="leading-none">{technology.name}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Optional Case Study Link (only shown if case study details exist) */}
        {project.details && (
          <div className="mt-auto pt-3 border-t border-black/6 dark:border-white/8">
            <Link
              href={project.projectDetailsPageSlug}
              className="group/details inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <span>View Case Study</span>
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover/details:translate-x-0.5" />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}

