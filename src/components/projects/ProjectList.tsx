import { type Project } from '@/types/project';
import React from 'react';

import { ProjectCard } from './ProjectCard';

interface ProjectListProps {
  projects: Project[];
  className?: string;
}

export function ProjectList({ projects, className }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No projects found.</p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 ${className ?? ''}`}
    >
      {projects.map((project: Project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </div>
  );
}
