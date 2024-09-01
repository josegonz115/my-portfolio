import { FC } from "react";
import { retrieveSingleProject } from "../utils/retrieveProjects";
import { Link } from "@tanstack/react-router";

type ProjectProps = {
    projectsName: string;
}

const Project:FC<ProjectProps> = ({ projectsName }) => {
    const project = retrieveSingleProject(projectsName);
    if (!project) {
        return (<div className="mx-auto text-center my-4">
            <h1 className="mb-8">Project not found!</h1>
            <Link to="/"><button className="text-white dark:text-black">Click here to go home</button></Link>
        </div>)
    };

    return (
        <div className="flex flex-col gap-4 mt-4">
            <h1>{project.heading}</h1>
            <h3>{project.date}</h3>
            <div className="project-container flex flex-col justify-center items-center gap-6">
                {project.images.length === 1 ? (
                    <img
                        src={project.images[0]}
                        alt={project.heading}
                        width={720}
                        className="rounded-2xl shadow-xl mb-6 aspect-thumbnail object-cover mx-auto w-[720px]"
                    /> ) : (project.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={project.heading}
                                className="
                                w-[365px] 
                                bg-gray-200 
                                rounded-lg 
                                shadow-md 
                                transition-transform 
                                duration-300 
                                ease-linear
                                hover:scale-105 
                                hover:shadow-lg
                                md:odd:rotate-[-5deg]
                                md:odd:translate-x-[-10rem]
                                md:even:rotate-[5deg]
                                md:even:translate-x-[10rem]
                                last:mb-10
                            "
                            />
                        )))}
            </div>

            <div className="prose prose-invert prose-2xl overflow-visible relative mb-10">
                {project.summary.split('\n\n').map((paragraph, index) => (
                    <>
                    <p key={index}>{paragraph}</p>
                    <br />
                    </>
                ))}
                {/* <p>{project.summary}</p> */}
            </div>
            
        </div>
    )
}

export default Project;