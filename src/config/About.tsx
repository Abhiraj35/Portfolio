import Appwrite from '@/components/technologies/Appwrite';
import Bun from '@/components/technologies/Bun';
import JavaScript from '@/components/technologies/JavaScript';
import MongoDB from '@/components/technologies/MongoDB';
import NextJs from '@/components/technologies/NextJs';
import NodeJs from '@/components/technologies/NodeJs';
import ReactIcon from '@/components/technologies/ReactIcon';
import TypeScript from '@/components/technologies/TypeScript';
import Express from '@/components/technologies/ExpressJs';
import Motion from '@/components/technologies/Motion';
import SocketIo from '@/components/technologies/SocketIo';
import TailwindCss from '@/components/technologies/TailwindCss';



export const frontendTechnologies = [
  <ReactIcon key="react" />,
  <NextJs key="nextjs" />,
  <TypeScript key="typescript" />,
  <JavaScript key="javascript" />,
  <TailwindCss key="tailwindcss" />,
];

export const backendTechnologies = [
  <NodeJs key="nodejs" />,
  <Express key="express" />,
  <Bun key="bun" />,
  <MongoDB key="mongodb" />,
  <SocketIo key="socketio" />,
];

export const servicesAndPlatforms = [
  <Appwrite key="appwrite" />,
];

export const toolingAndLibraries = [
  <Motion key="motion" />,
];

export const mySkills = [
  ...frontendTechnologies,
  ...backendTechnologies,
  ...servicesAndPlatforms,
  ...toolingAndLibraries,
];

export const about = {
  name: 'Abhiraj Kumar',
  description:
    "I'm a Full Stack developer who builds reliable, user‑focused web apps with Next.js and TypeScript. I care about clean UX and scalable architecture.",
};

