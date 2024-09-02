import { Link } from "@tanstack/react-router";
import me from '../assets/me.svg';
import Toggle from "./Toggle";

const NavBar= () => {
    return (
        <nav className="border-b border-solid border-black dark:border-white">
            <img
                src={me}
                alt="anya pointer"
                className="mx-auto w-80 md:w-full"
            />
            <div className="p-2 flex gap-2 justify-around ">
                {/* style={{color: 'var(--color-text)'}} */}
                <Link to="/" className="font-bold hover:underline hover:underline-offset-4">
                    Home
                </Link>{" "}
                <Link
                    to="/"
                    
                    hash="about-me"
                    className="font-bold hover:underline hover:underline-offset-4"
                >
                    About
                </Link>
                <Link
                    to="/"
                    hash="projects"
                    className="font-bold hover:underline hover:underline-offset-4"
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
            </div>
        </nav>
    );
};

export default NavBar;
