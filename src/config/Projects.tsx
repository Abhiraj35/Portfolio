import NextJs from '@/components/technologies/NextJs';
import ReactIcon from '@/components/technologies/ReactIcon';
import Shadcn from '@/components/technologies/Shadcn';
import TailwindCss from '@/components/technologies/TailwindCss';
import TypeScript from '@/components/technologies/TypeScript';
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    title: 'Portfolio Website',
    description:
      'My personal portfolio built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.',
    image: '/project/ramspace.png',//TODO: Update this image
    link: '/',
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
    ],
    live: '/',
    details: false,
    projectDetailsPageSlug: '/projects',
    isWorking: true,
  },
  {
    title: "AgriEmpower",
    description:
      "AgriEmpower is a platform connecting farmers and buyers for direct trade. Built during my first-year inter-college hackathon, it features product listings, a chat system, a chatbot, and user authentication.",
    image: '/project/agriempower.png',//TODO: Update this image
    link: "https://agriamigo.netlify.app/",
    technologies: [
      { name: "React", icon: <ReactIcon key="react" /> },
      { name: "Tailwind CSS", icon: <TailwindCss key="tailwindcss" /> },
      // { name: "AI Chatbot", icon: <Sparkles key="ai" /> }, // replace with your AI icon component
    ],
    live: "https://agriamigo.netlify.app/",
    github: "https://github.com/Abhiraj35/AgriEmpower",
    details: false,
    projectDetailsPageSlug: "/projects/agriempower",
    isWorking: true,
  },

  {
    title: "Miranda - Paper Animated Website",
    description:
      "Miranda is a paper-styled animated website showcasing high-quality animations, smooth transitions, and layered motion effects. It has been featured on awarded websites for its creativity and interaction design.",
    image: '/project/miranda.png',//TODO: Update this image
    link: "https://abhiraj35.github.io/Miranda---paper-animated-website/",
    technologies: [
      { name: 'Next.js', icon: <NextJs key="nextjs" /> },
      { name: 'TypeScript', icon: <TypeScript key="typescript" /> },
      { name: 'React', icon: <ReactIcon key="react" /> },
      { name: 'Tailwind CSS', icon: <TailwindCss key="tailwindcss" /> },
      { name: 'shadcn/ui', icon: <Shadcn key="shadcn" /> },
    ],
    live: "https://abhiraj35.github.io/Miranda---paper-animated-website/",
    github: "https://github.com/Abhiraj35/Miranda---paper-animated-website",
    details: false,
    projectDetailsPageSlug: "/projects/miranda",
    isWorking: true,
  },
];

