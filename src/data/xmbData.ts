import type { XMBCategory } from '../types/xmb';
import type { Project } from '../types/types';
import projectsData from './projects.json';

const projects = projectsData as Project[];

const parseDate = (dateStr: string): number => {
  const [month, year] = dateStr.split(' ');
  const months: Record<string, number> = {
    January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
    July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
  };
  return new Date(parseInt(year), months[month] ?? 0).getTime();
};

const projectToItem = (p: Project) => ({
  id: p.heading.toLowerCase().replace(/\s+/g, '-'),
  label: p.heading,
  sublabel: p.subheading || p.date,
  thumbnail: p.images[0],
  icon: p.tech_stack[0],
  data: p as unknown as Record<string, unknown>,
});

const sortedProjects = [...projects]
  .filter(p => p.category === 'project')
  .sort((a, b) => parseDate(b.date) - parseDate(a.date));

const sortedResearch = [...projects]
  .filter(p => p.category === 'research')
  .sort((a, b) => parseDate(b.date) - parseDate(a.date));

export const xmbCategories: XMBCategory[] = [
  {
    id: 'about',
    label: 'About',
    icon: 'terminal',
    items: [
      {
        id: 'bio',
        label: 'Bio',
        sublabel: 'Who I am',
        data: {
          type: 'bio',
          content: "Hey, I'm Jose Juan Gonzalez Jr \u2014 a 25-year-old Software Engineering student at UC Irvine. I first studied Sociology at UC Berkeley, but found my passion in programming and made the leap to software engineering. I'm a self-taught developer who loves building things from scratch and learning new technologies along the way.",
          image: '/images/bitme.png',
        },
      },
      {
        id: 'education',
        label: 'Education',
        sublabel: 'UC Irvine \u2022 UC Berkeley',
        data: {
          type: 'education',
          entries: [
            { school: 'University of California, Irvine', degree: 'B.S. Software Engineering', period: '2022 \u2013 Present' },
            { school: 'University of California, Berkeley', degree: 'B.A. Sociology', period: '2019 \u2013 2022' },
          ],
        },
      },
      {
        id: 'interests',
        label: 'Interests',
        sublabel: 'Climbing \u2022 Running \u2022 ML',
        data: {
          type: 'interests',
          items: [
            { name: 'Rock Climbing', description: 'Bouldering and sport climbing keep me sharp and focused.' },
            { name: 'Running', description: 'Long-distance running for endurance and clarity.' },
            { name: 'Machine Learning', description: 'Exploring ML/AI to understand intelligent systems.' },
            { name: 'Web Development', description: 'Full-stack development with React, Node.js, and cloud services.' },
          ],
        },
      },
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: 'code',
    items: sortedProjects.map(projectToItem),
  },
  {
    id: 'research',
    label: 'Research',
    icon: 'microscope',
    items: sortedResearch.map(projectToItem),
  },
  {
    id: 'resume',
    label: 'Resume',
    icon: 'file-text',
    items: [
      {
        id: 'view-resume',
        label: 'View Resume',
        sublabel: 'Open in browser',
        data: { type: 'view', url: '/jose_gonzalez_resume.pdf' },
      },
      {
        id: 'download-resume',
        label: 'Download PDF',
        sublabel: 'Save to device',
        data: { type: 'download', url: '/jose_gonzalez_resume.pdf' },
      },
      {
        id: 'skills',
        label: 'Skills Overview',
        sublabel: 'Languages \u2022 Frameworks \u2022 Tools',
        data: {
          type: 'skills',
          categories: [
            { name: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'Java', 'C++', 'Go', 'SQL'] },
            { name: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'HTML/CSS'] },
            { name: 'Backend', items: ['Node.js', 'Express.js', 'Prisma'] },
            { name: 'Databases', items: ['PostgreSQL', 'MongoDB', 'Supabase'] },
            { name: 'Cloud & Tools', items: ['AWS', 'Google Cloud', 'Git', 'Docker'] },
          ],
        },
      },
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    icon: 'mail',
    items: [
      {
        id: 'email',
        label: 'Email',
        sublabel: 'josegonz115@gmail.com',
        data: { type: 'email', href: 'mailto:josegonz115@gmail.com', display: 'josegonz115@gmail.com' },
      },
      {
        id: 'github',
        label: 'GitHub',
        sublabel: 'josegonz115',
        data: { type: 'link', href: 'https://github.com/josegonz115', display: 'github.com/josegonz115' },
      },
      {
        id: 'linkedin',
        label: 'LinkedIn',
        sublabel: 'josegonz115',
        data: { type: 'link', href: 'https://www.linkedin.com/in/josegonz115/', display: 'linkedin.com/in/josegonz115' },
      },
    ],
  },
];
