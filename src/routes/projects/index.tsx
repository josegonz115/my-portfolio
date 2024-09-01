import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'

const ProjectPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: '/' });
  }, [navigate])

  return <div>Redirecting...</div>
}


export const Route = createFileRoute('/projects/')({
  component: ProjectPage,
});