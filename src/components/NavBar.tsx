import { Link } from "@tanstack/react-router";
import me from '../assets/me.svg';
import Toggle from "./Toggle";
// import { useState } from "react";

const NavBar= () => {
    // const [navHeight, setNavHeight] = useState('auto');
    // const handleProjectClick = () => {
    //     setTimeout(() => {
    //         window.scrollBy(0, -50);
    //     }, 5);
    // };
    // const handleProjectClick = () => {
    //     const element = document.getElementById('projects');
    //     if (element) {
    //       element.scrollIntoView({ behavior: 'smooth' });
    //     //   window.scrollBy(0, -100); // Adjust the scroll position if needed
          
    //     //   setTimeout(() => {
    //     //     window.scrollBy(0, -50); // Adjust the scroll position if needed
    //     //   }, 500); // Adjust the timeout duration if needed
    //     }else{
    //         // setTimeout(() => {
    //         //     window.scrollBy(0, -50);
    //         // }, 5);
    //     }
    //   };
    //   const handleProjectClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    //     e.preventDefault();
    //     const element = document.getElementById('projects');
    //     if (element) {
    //       element.scrollIntoView();
    //       window.scrollBy(0, -50); // Adjust the scroll position if needed
    //     //   setTimeout(() => {
    //     //     window.scrollBy(0, -50); // Adjust the scroll position if needed
    //     //   }, 500); // Adjust the timeout duration if needed
    //     }
    //   };
    return (
        <div className="border-b border-solid border-black dark:border-white overflow-visible relative inline">
            <img
                src={me}
                alt="anya pointer"
                className="mx-auto w-80 md:w-full"
            />
            <nav 
                className="overflow-hidden sticky top-0 z-10   p-2 flex gap-8 sm:gap-2 justify-center sm:justify-around bg-light dark:bg-dark"
                // style={{ height: navHeight }}
            >
            {/* <div id='always-on-top' className="sticky top-0 z-10 p-2 flex gap-8 sm:gap-2 justify-center sm:justify-around bg-white dark:bg-black"> */}
                {/* style={{color: 'var(--color-text)'}} */}
                <Link to="/" className="font-bold hover:underline hover:underline-offset-4">
                    Home
                </Link>{" "}
                <Link
                    to='/'
                    hash="projects"
                    className="font-bold hover:underline hover:underline-offset-4"
                    // onClick={handleProjectClick}
                >
                    Projects
                </Link>
                <a
                    href="/jose_gonzalez_resume.pdf"
                    target="_blank"
                    className="font-bold hover:underline hover:underline-offset-4"
                    rel="noopener noreferrer" // Optional: Security measure when using target="_blank"
                >
                    Resume
                </a>
                <Toggle />
            </nav>

        </div>
    );
};

export default NavBar;
