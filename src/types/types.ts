export type Project = {
  author: string;
  tech_stack: string[];
  images: string[];
  heading: string;
  subheading?: string;
  date: string;
  category: 'project' | 'research';
  links: {
    live: string;
    github: string;
  };
  summary: string;
};
