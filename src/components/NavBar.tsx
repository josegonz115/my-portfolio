import { Link } from "@tanstack/react-router";
import me from '../assets/me.svg';
import Toggle from "./Toggle";

const NavBar= () => {

    return (
        <div className="border-b border-solid border-black dark:border-white overflow-visible relative inline">
            <img
                src={me}
                alt="anya pointer"
                className="mx-auto w-80 md:w-full"
            />
            <nav 
                className="overflow-hidden sticky top-0 z-10 p-2 flex gap-8 sm:gap-2 justify-center sm:justify-around bg-light dark:bg-dark"
            >
                <Link to="/" className="font-bold hover:underline hover:underline-offset-4">
                    Home
                </Link>{" "}
                <Link
                    to='/'
                    hash="projects"
                    className="font-bold hover:underline hover:underline-offset-4"
                >
                    Projects
                </Link>
                <a
                    href="/Jose_Gonzalez_resume.pdf"
                    target="_blank"
                    className="font-bold hover:underline hover:underline-offset-4"
                    rel="noopener noreferrer"
                >
                    Resume
                </a>
                <Toggle />
            </nav>

        </div>
    );
};

export default NavBar;
