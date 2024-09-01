import { createFileRoute } from '@tanstack/react-router';
import Project from '../../components/Project';

const ProjectPage = () =>{
  const { projectsName } = Route.useParams();

  console.log('projectsName:', projectsName);

  return (
    <Project projectsName={projectsName} />
  );
};

export const Route = createFileRoute('/projects/$projectsName')({
  component: ProjectPage,
});