import Appwrite from '@/components/technologies/Appwrite';
import BootStrap from '@/components/technologies/BootStrap';
import Bun from '@/components/technologies/Bun';
import CSS from '@/components/technologies/CSS';
import Drizzle from '@/components/technologies/Drizzle';
import ExpressJs from '@/components/technologies/ExpressJs';
import Figma from '@/components/technologies/Figma';
import Github from '@/components/technologies/Github';
import Html from '@/components/technologies/Html';
import JavaScript from '@/components/technologies/JavaScript';
import MDXIcon from '@/components/technologies/MDXIcon';
import MongoDB from '@/components/technologies/MongoDB';
import Motion from '@/components/technologies/Motion';
import NestJs from '@/components/technologies/NestJs';
import Netlify from '@/components/technologies/Netlify';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import Pnpm from '@/components/technologies/Pnpm';
import PostgreSQL from '@/components/technologies/PostgreSQL';
import Postman from '@/components/technologies/Postman';
import Prisma from '@/components/technologies/Prisma';
import ReactIcon from '@/components/technologies/ReactIcon';
import Redis from '@/components/technologies/Redis';
import Sanity from '@/components/technologies/Sanity';
import Shadcn from '@/components/technologies/Shadcn';
import SocketIo from '@/components/technologies/SocketIo';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';
import Vercel from '@/components/technologies/Vercel';
import Docker from '@/components/technologies/Docker';

export const skillComponents = {
  TypeScript,
  ReactIcon,
  NextJs,
  Bun,
  PostgreSQL,
  NodeJs,
  MongoDB,
  Prisma,
  JavaScript,
  TailwindCss,
  Html,
  CSS,
  Docker,
  Drizzle,
  Shadcn,
  Motion,
  BootStrap,
  ExpressJs,
  NestJs,
  SocketIo,
  Redis,
  Github,
  Vercel,
  Netlify,
  Postman,
  Pnpm,
  Figma,
  Sanity,
  MDXIcon,
  Appwrite,
} as const;

export type SkillComponentKey = keyof typeof skillComponents;

export interface SkillItem {
  name: string;
  href: string;
  component: SkillComponentKey;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export const skillsLandingConfig = {
  subHeading: 'My',
  heading: 'Skills',
};

export const skillsPageConfig = {
  title: 'Skills',
  description:
    'Technologies and tools I use to design, build, and ship full-stack web applications.',
  categories: [
    {
      id: 'frontend',
      title: 'Frontend',
      description: 'Interfaces, component systems, and client-side architecture.',
      skills: [
        {
          name: 'React',
          href: 'https://react.dev/',
          component: 'ReactIcon',
        },
        {
          name: 'Next.js',
          href: 'https://nextjs.org/',
          component: 'NextJs',
        },
        {
          name: 'TypeScript',
          href: 'https://www.typescriptlang.org/',
          component: 'TypeScript',
        },
        {
          name: 'JavaScript',
          href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
          component: 'JavaScript',
        },
        {
          name: 'Tailwind CSS',
          href: 'https://tailwindcss.com/',
          component: 'TailwindCss',
        },
        {
          name: 'HTML',
          href: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
          component: 'Html',
        },
        {
          name: 'CSS',
          href: 'https://developer.mozilla.org/en-US/docs/Web/CSS',
          component: 'CSS',
        },
        {
          name: 'shadcn/ui',
          href: 'https://ui.shadcn.com/',
          component: 'Shadcn',
        },
        {
          name: 'Motion',
          href: 'https://motion.dev/',
          component: 'Motion',
        }
      ],
    },
    {
      id: 'backend',
      title: 'Backend',
      description: 'APIs, runtimes, and real-time server-side systems.',
      skills: [
        {
          name: 'Node.js',
          href: 'https://nodejs.org/',
          component: 'NodeJs',
        },
        {
          name: 'Express.js',
          href: 'https://expressjs.com/',
          component: 'ExpressJs',
        },
      ],
    },
    {
      id: 'database',
      title: 'Database & ORM',
      description: 'Data modeling, persistence, and caching layers.',
      skills: [
        {
          name: 'MongoDB',
          href: 'https://www.mongodb.com/',
          component: 'MongoDB',
        },
        {
          name: 'PostgreSQL',
          href: 'https://www.postgresql.org/',
          component: 'PostgreSQL',
        },
        {
          name: 'Redis',
          href: 'https://redis.io/',
          component: 'Redis',
        },
        {
          name: 'Prisma',
          href: 'https://www.prisma.io/',
          component: 'Prisma',
        },
        {
          name: 'Drizzle',
          href: 'https://orm.drizzle.team/',
          component: 'Drizzle',
        },
      ],
    },
    {
      id: 'tools',
      title: 'Tools & DevOps',
      description: 'Workflow, deployment, and day-to-day development tooling.',
      skills: [
        {
          name: 'Docker',
          href: 'https://www.docker.com/',
          component: 'Docker',
        },
        {
          name: 'GitHub',
          href: 'https://github.com/',
          component: 'Github',
        },
        {
          name: 'Postman',
          href: 'https://www.postman.com/',
          component: 'Postman',
        },
      ],
    },
    {
      id: 'design',
      title: 'Design & Content',
      description: 'UI design, content systems, and authoring workflows.',
      skills: [
        {
          name: 'Figma',
          href: 'https://www.figma.com/',
          component: 'Figma',
        },
        {
          name: 'MDX',
          href: 'https://mdxjs.com/',
          component: 'MDXIcon',
        },
      ],
    },
    // {
    //   id: 'platforms',
    //   title: 'Platforms & BaaS',
    //   description: 'Backend-as-a-service and managed infrastructure.',
    //   skills: [
    //     {
    //       name: 'Appwrite',
    //       href: 'https://appwrite.io/',
    //       component: 'Appwrite',
    //     },
    //   ],
    // },
  ] as SkillCategory[],
};

export const allSkills: SkillItem[] = skillsPageConfig.categories.flatMap(
  (category) => category.skills,
);
