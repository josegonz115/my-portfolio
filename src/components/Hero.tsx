import { ReactTyped } from "react-typed";
import bitme from '../assets/bitme.png';

const HeroAttributes = () => {

  return (
      <ReactTyped
      strings={[
        "&lt;Programmer&gt;", 
        "&lt;Developer&gt;", 
        "&lt;Student&gt;", 
        "&lt;Rock Climber&gt;",
        "&lt;Runner&gt;",
        "&lt;ML Enthusiast&gt;",
      ]}
      typeSpeed={100}
      loop
      startDelay={100}
      className="text-purple-600"
    ></ReactTyped>
  );
};

const Hero = () => {
  return (
<section id="nav-hero">
  <a className="anchor" id="hero"></a>
  <div className="flex flex-col sm:flex-row mx-16 h-fit col-span-6 2xl:col-span-12">
    <div
      className='flex flex-col w-fit h-fit col-span-6 2xl:col-span-12 bg-gradient-to-tr text-center md:text-left'
    >
      <h1
        // className='font-black text-6xl md:text-7xl 2xl:text-8xl primary-gradient '
        className='font-medium text-6xl primary-gradient '
      >
        Hi! I'm Jose Gonzalez.
      </h1>
      <small className='text-lg md:text-xl max-w-prose my-4'>I'm a <HeroAttributes /></small>
      <a 
        href="https://www.linkedin.com/in/josegonz115/"
        target="_blank"
        className="blueShadow mx-auto mt-2 lg:mr-auto lg:ml-0  text-base sm:text-lg md:text-xl relative overflow-hidden px-6 py-3 group rounded-full dark-mode-button cursor-pointer" 
      >
        <div
            className="absolute top-0 right-full w-full h-full bg-violet-400 opacity-20 group-hover:translate-x-full z-0 duration-200"
        />
        <h4 className="relative z-9">Get in touch &rarr;</h4>
      </a>
    </div>
    <div className="relative grid place-items-center">
      <img src={bitme} alt="Profile of Jose Juan Gonzalez Jr" className="object-cover z-[2] max-h-[70vh]" />
      {/* <img src={'https://i.imgur.com/Q4P6ZLo.png'} alt="Profile of Jose Juan Gonzalez Jr" className="object-cover z-[2] max-h-[70vh]" /> */}
    </div>
  </div>
</section>
  )
}

export default Hero