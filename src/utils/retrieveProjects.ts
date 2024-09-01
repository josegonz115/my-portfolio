import { Project } from "../types/types";

const modules: Record<string, { default: Project }> = import.meta.glob(['../data/*.json', '!../data/json-template.json'],   { eager: true });

const retrieveProjects =  () => {
    const projects: Project[] = [];
    for (const path in modules) {
        projects.push(modules[path].default);
    };
    return projects;
};

export const retrieveSingleProject = (projectName: string) => {
    const projectNameProcessed = projectName.toLowerCase().replace(/ /g, '_');
    try {
        return modules[`../data/${projectNameProcessed}.json`].default;   
    } catch (error) {
        console.error(`Error retrieving project: ${projectName}`, error);
        return null; 
    }
};

export default retrieveProjects;