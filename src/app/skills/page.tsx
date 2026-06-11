import Container from '@/components/common/Container';
import { SkillCategorySection } from '@/components/skills/SkillCategorySection';
import { Separator } from '@/components/ui/separator';
import { skillsPageConfig } from '@/config/Skills';
import { generateMetadata as getMetadata } from '@/config/Meta';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...getMetadata('/skills'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function SkillsPage() {
  const { title, description, categories } = skillsPageConfig;
  const skillCount = categories.reduce(
    (total, category) => total + category.skills.length,
    0,
  );

  return (
    <Container className="py-16">
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{title}</h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {description}
          </p>
        </div>

        <Separator />

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              Tech Stack
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({skillCount} {skillCount === 1 ? 'skill' : 'skills'})
              </span>
            </h2>
          </div>

          <div className="space-y-8 rounded-lg border border-dashed border-black/20 p-6 dark:border-white/10">
            {categories.map((category, index) => (
              <div key={category.id} className="space-y-8">
                <SkillCategorySection category={category} />
                {index < categories.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
