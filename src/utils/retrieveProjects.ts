import { Project } from "../types/types";
import projectsData from "../data/projects.json";

const projects: Project[] = projectsData;
const retrieveProjects = () => projects;
export const retrieveSingleProject = (projectName: string) => {
    const projectNameProcessed = projectName.toLowerCase().replace(/ /g, '_');
    try {
        return projects.find(project => project.heading.toLowerCase().replace(/ /g, '_') === projectNameProcessed);   
    } catch (error) {
        console.error(`Error retrieving project: ${projectName}`, error);
        return null; 
    }
};

export default retrieveProjects;