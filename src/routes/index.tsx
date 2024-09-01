import { createFileRoute } from '@tanstack/react-router'
import AboutMe from '../components/AboutMe'
import Hero from '../components/Hero'
import SkillsBar from '../components/SkillsBar'
import Projects from '../components/Projects'
// import AsciiArt from '../assets/ascii-art.png';
export const Route = createFileRoute('/')({
  component: Index,
});

//  // add border to horizontal later + add margins or padding perhaps
/* <br className='bg-blue-500'/> */
function Index() {
  return (
    <div className="p-2 flex flex-col gap-40 py-20">
      <Hero />
      <AboutMe />
      <SkillsBar />
      <Projects />
    </div>
  )
}
