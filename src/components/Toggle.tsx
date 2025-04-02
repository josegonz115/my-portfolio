import { useTheme } from "../contexts/ThemeContext";

const Toggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div
            id="theme-toggle"
            className="hover:underline hover:underline-offset-4"
            title="Toggle theme"
        >
            <button
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                className="text-xl cursor-pointer bg-transparent border-none p-0"
            >
                {theme === "light" ? "🌚" : "🌝"}
            </button>
        </div>
    );
};

export default Toggle;
