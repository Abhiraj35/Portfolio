import Github from '@/components/svgs/Github';
import LinkedIn from '@/components/svgs/LinkedIn';
import Mail from '@/components/svgs/Mail';

export { skillComponents } from '@/config/Skills';

export const heroConfig = {
  // Personal Information
  name: 'Abhiraj Kumar',
  title: 'Full Stack Web Developer',
  avatar: '/assets/logo.jpg',

  // Skills Configuration
  skills: [
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
      name: 'React',
      href: 'https://react.dev/',
      component: 'ReactIcon',
    },
    {
      name: 'Node.js',
      href: 'https://nodejs.org/',
      component: 'NodeJs',
    },
    {
      name: 'MongoDB',
      href: 'https://www.mongodb.com/',
      component: 'MongoDB',
    },
  ],

  // Description Configuration
  description: {
    template:
      "Yup! I'm a Full Stack Developer. Big deal, right? But wait... there's more! I'm not just any developer, I love building solutions and solving problems. I enjoy crafting websites with {skills:0}, {skills:1}, {skills:2}, {skills:3} and {skills:4}.",
  },

  // Buttons Configuration
  buttons: [
    {
      variant: 'outline',
      text: 'Resume / CV',
      href: '/resume',
      icon: 'CV',
    },
    {
      variant: 'default',
      text: 'Get in touch',
      href: '/contact',
      icon: 'Chat',
    },
  ],
};

// Social Links Configuration
export const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/abhiraj01/',
    icon: <LinkedIn />,
  },
  {
    name: 'Github',
    href: 'https://github.com/abhiraj35',
    icon: <Github />,
  },
  {
    name: 'Email',
    href: 'mailto:royabhi2406@gmail.com',
    icon: <Mail />,
  },
];

