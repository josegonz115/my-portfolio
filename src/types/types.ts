
export type Project = {
    author: string;
    tech_stack: string[];
    images: string[];
    heading: string;
    subheading?: string;
    date: string;
    links: {
        live: string;
        github: string;
    };
    summary: string;
};