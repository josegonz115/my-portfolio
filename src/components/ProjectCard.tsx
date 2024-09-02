import external from '../assets/svg/External.svg';
import code from '../assets/svg/Code.svg';
import { Project } from '../types/types';
import { FC } from 'react';
import { Link } from "@tanstack/react-router";
import getImagePath from '../utils/iconSrcLoader';

type ProjectCardProps = {
    project: Project;
}
const ProjectCard:FC<ProjectCardProps> = ({ project }) => {
  return (
<div
    className="shadow-neutral-200/5 backdrop-blur-sm  border-neutral-200/10 max-w-[350px] md:max-w-xl group relative overflow-hidden flex flex-col      bg-gray-400   border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 gap-4"
    // className="shadow-lg bg-slate-400 shadow-neutral-200/5 backdrop-blur-sm rounded-lg border border-neutral-200/10 max-w-[350px] md:max-w-xl h-[40rem] group relative overflow-hidden flex flex-col"
>
    <Link 
        to='/projects/$projectsName' 
        params={{projectsName: project.heading}}
        className='h-[15rem] w-full'
    ><div className="h-[15rem] bg-gray-800 cursor-pointer">
    {/* <div className="relative overflow-hidden w-134 m-auto cursor-pointer h-[20rem] bg-gray-800 flex items-center justify-center "> */}
        <img
            src={project.images[0]}
            alt={project.heading}
            // format="webp"
            // className="relative rounded-t-lg object-contain my-auto max-h-full"
            className="object-scale-down  h-full  mx-auto "
        />
    </div></Link>
    <div className="px-3 flex flex-col  flex-grow pb-3">
    {/* <div className="p-6 text-lg mt-auto grow"> */}
        <div className='flex flex-row justify-between items-center'>
            <Link
                to='/projects/$projectsName'
                params={{ projectsName: project.heading }}
                className="text-xl md:text-2xl font-bold primary-gradient flex items-center hover:underline"
            >
                {project.heading}
            </Link>
            <p className='text-sm'>{project.date}</p>
        </div>

        <div className="flex items-center my-2 gap-1 ">
            {
                project.tech_stack.map((item) => (
                    <div
                        key={item + project.heading + 'tech_stack'}
                        // className="text-xs md:text-xl bg-neutral-300/10 backdrop-blur-sm border border-neutral-300/20 rounded-md p-1 md:p-2 flex items-center place-content-center"
                        className="text-xs md:text-xl bg-neutral-300/10 backdrop-blur-sm border border-neutral-300/20 rounded-md p-1 md:p-2 lg:p-1 flex items-center place-content-center w-10 h-10 has-tooltip"
                    >   
                        <img src={getImagePath(item)} alt={item} className='w-full h-full object-contain'/>
                        <span className='tooltip rounded shadow-lg p-1 text-xs bg-gray-100 text-black -mt-20 ml-5 z-50'>{item}</span>
                    </div>
                ))
            }
        </div>
        {/* <!-- <p className="text-sm md:text-base pt-2 line-clamp-4">{project.body}</p> --> */}
        <p className="text-sm md:text-base pt-2 line-clamp-[8]">
            {project.summary.split("\n").slice(1).join("\n")}
        </p>
        <div className="flex flex-row justify-between">
            <a
                href={project.links.github}
                className="text-lg font-bold primary-gradient hover:underline flex items-center mt-2"
            >
                <img src={code} alt="code" className='w-7'/>
                Code
            </a>
            {project.links.live.length === 0 ? null :
                <a
                    href={project.links.live}
                    rel="noopener nofollow"
                    target="_blank"
                    className="text-lg font-bold primary-gradient hover:underline flex items-center mt-2"
                >
                    <p className='pr-1'>Showcase</p>
                    <img src={external} alt="external" className='w-6' />
                </a>
            }
        </div>
    </div>
</div>
  )
}

export default ProjectCard