import NodeJs from '@/components/technologies/NodeJs';
import JavaScript from '@/components/technologies/JavaScript';
import ReactIcon from '@/components/technologies/ReactIcon';
import Redis from '@/components/technologies/Redis';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';
import { Project } from '@/types/project';
import Bun from '@/components/technologies/Bun';
import NextJs from '@/components/technologies/NextJs';
import Shadcn from '@/components/technologies/Shadcn';

export const projects: Project[] = [
  {
  title: 'bextool',
  description:
    'An open-source CLI that scaffolds production-ready starter apps for frontend, backend, full-stack, mobile, browser extensions, and more.',
  image: '/project/bextool.png', 
  link: 'https://bextool.tech',
  github: 'https://github.com/bextool-cli/bextool',
  technologies: [
    { name: 'Node.js', icon: <NodeJs key="nodejs" /> },
    { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
    { name: 'React.js', icon: <ReactIcon key="react" /> },
    { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
  ],
  live: 'https://bextool.tech',
  details: false,
  projectDetailsPageSlug: '/projects/bextool',
  isWorking: true,
},

  {
    title: 'Flux-Private Chat App',
    description:
      'A secure, real-time messaging platform featuring ephemeral chatrooms that automatically self-destruct after 10 minutes.',
    image: '/project/flux.png',
    link: 'https://flux-chat-app.vercel.app',
    github: 'https://github.com/Abhiraj35/Real-time-chat-app',
    technologies: [
      { name: 'Bun.js', icon: <Bun key="bun" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'Redis', icon: <Redis key="redis" /> },
    ],
    live: 'https://flux-chat-app.vercel.app',
    details: false,
    projectDetailsPageSlug: '/projects/flux',
    isWorking: true,
  },
  {
    title: 'GitTutorial',
    description:
      'A Git tutorial built with React.js, JavaScript, and Tailwind CSS Gemini SDK.',
    image: '/project/git-tutorial.png',
    link: 'https://git-tutorials.netlify.app',
    github: 'https://github.com/Abhiraj35/GitTutorial',
    technologies: [
      { name: 'React.js', icon: <ReactIcon key="react" /> },
      { name: 'JavaScript', icon: <JavaScript key="javascript" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
    ],
    live: 'https://git-tutorials.netlify.app',
    details: false,
    projectDetailsPageSlug: '/projects/GitTutorial',
    isWorking: true,
  },
  {
    title: 'InkHive',
    description:
      'A multi-agent AI content platform that turns a single topic or article into blog posts, social content, email newsletters, and SEO metadata. Specialized agents research, write, optimize, and prepare assets for publishing.',
    image: '/project/inkhive.png',
    link: 'https://ink-hive-pearl.vercel.app',
    github: 'https://github.com/Abhiraj35/InkHive',
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
    ],
    live: 'https://ink-hive-pearl.vercel.app',
    details: false,
    projectDetailsPageSlug: '/projects/inkhive',
    isWorking: true,
  },
];