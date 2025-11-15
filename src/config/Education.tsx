import { educationSchema } from '@/types/education';
 
 
 export const educationData: educationSchema[] = [
    {
      institution: 'Haldia Institute of Technology',
      degree: 'Bachelor of Technology (B.Tech) in Electronics and Communication Engineering',
      start: '2023',
      end: '2027',
      description: [
        'Pursuing a comprehensive curriculum covering core subjects in electronics, embedded systems, and programming.',
        'Gaining hands-on experience in software development, circuit design, and IoT applications.',
        'Actively participating in technical societies and hackathons to enhance practical knowledge.'
      ]
    },
    {
      institution: "St. Xavier's Public School",
      degree: 'Higher Secondary Education (Class 12) - Science (PCM)',
      start: '2020',
      end: '2022',
      description: [
        'Specialized in Science with a focus on Physics, Chemistry, and Mathematics.',
        'Developed problem-solving and analytical skills through academic projects and competitive exams.',
        'Engaged in extracurricular activities, including coding competitions and science exhibitions.'
      ],
    },
    {
      institution: "St. Xavier's Public School",
      degree: 'Secondary Education (Class 10)',
      start: '2019',
      end: '2020',
      description: [
        'Completed foundational education with a strong emphasis on Mathematics and Science.',
        'Built a keen interest in technology and logical reasoning through various academic challenges.',
        'Secured excellent grades and actively participated in school-level tech events.'
      ],
    }
  ];