import retrieveProjects from "../utils/retrieveProjects";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const projects = retrieveProjects().sort((a, b) => new Date(a.date) > new Date(b.date) ? -1 : 1);
  return (
    <section className="mx-auto">
      <a id='projects' className="block relative top-[-3rem] invisible"></a>
      <h2 className="text-5xl text-center md:text-left font-medium py-5">My Projects</h2>
      <div className='w-full mt-10 grid lg:grid-cols-2 xl:grid-cols-3  gap-5 justify-between '>
        {projects.map(project => <ProjectCard key={project.heading} project={project} /> )}
      </div>
    </section>
  )
};

export default Projects;