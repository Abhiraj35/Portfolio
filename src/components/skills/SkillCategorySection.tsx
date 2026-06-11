import Skill from '@/components/common/Skill';
import {
  type SkillCategory,
  skillComponents,
} from '@/config/Skills';
import React from 'react';

interface SkillCategorySectionProps {
  category: SkillCategory;
  compact?: boolean;
}

export function SkillCategorySection({
  category,
  compact = false,
}: SkillCategorySectionProps) {
  return (
    <section className={compact ? 'space-y-3' : 'space-y-4'}>
      <div className={compact ? undefined : 'space-y-1'}>
        <h2
          className={
            compact
              ? 'text-sm font-semibold text-secondary'
              : 'text-xl font-semibold tracking-tight'
          }
        >
          {category.title}
        </h2>
        {!compact && (
          <p className="text-sm text-muted-foreground">{category.description}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, index) => {
          const SkillIcon = skillComponents[skill.component];

          return (
            <Skill key={`${category.id}-${skill.component}-${index}`} name={skill.name} href={skill.href}>
              <SkillIcon />
            </Skill>
          );
        })}
      </div>
    </section>
  );
}
