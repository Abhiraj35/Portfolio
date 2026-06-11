import { SkillCategorySection } from '@/components/skills/SkillCategorySection';
import { Separator } from '@/components/ui/separator';
import { skillsLandingConfig, skillsPageConfig } from '@/config/Skills';
import Link from 'next/link';
import React from 'react';

import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';
import { Button } from '../ui/button';

export default function Skills() {
  const { subHeading, heading } = skillsLandingConfig;
  const { categories } = skillsPageConfig;

  return (
    <Container className="mt-20">
      <SectionHeading subHeading={subHeading} heading={heading} />

      <div className="mt-8 space-y-6 rounded-lg border border-dashed border-black/20 p-6 dark:border-white/10">
        {categories.map((category, index) => (
          <div key={category.id} className="space-y-6">
            <SkillCategorySection category={category} compact />
            {index < categories.length - 1 && <Separator />}
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button variant="outline" asChild>
          <Link href="/skills" className="cursor-pointer">View all skills</Link>
        </Button>
      </div>
    </Container>
  );
}
