import discord from '../assets/svg/discord.svg'
import linkedin from '../assets/svg/linkedin.svg'

const Footer = () => {
  return (
    // <footer className="py-20 sm:py-32 border-t border-solid border-violet-950 flex flex-col 
    // gap-4 sm:gap-8 justify-center items-center">
    <footer className="py-20  border-t border-solid border-black dark:border-white flex flex-col 
    gap-4 sm:gap-8 justify-center items-center">
        <p className="px-4 py-2 bg-white text-slate-950 font-medium">Connect with me &darr;</p>
        <div className="flex flex-col gap-4 items-center justify-center">
            <p>
                <strong className="pr-2">Email</strong>
                <a href="mailto:josegonz115@gmail.com" target="_blank" rel="noopener noreferrer">
                    josegonz115@gmail.com
                </a>
            </p>
            <p>
                <b className="pr-2">GitHub</b>
                <a href="https://github.com/josegonz115/" target="_blank" className="text-violet-500 hover:text-violet-600">josegonz115
                        <img src={discord} alt="discord" className='inline'/>
                </a>
            </p>
            <p>
                <b className="pr-2">LinkedIn</b>
                <a href="https://linkedin.com/in/josegonz115/" target="_blank" className="text-violet-500 hover:text-violet-600">josegonz115
                    <img src={linkedin} alt="linkedin" className='inline'/>
                </a>
            </p>
        </div>
    </footer>
  )
}

export default Footer