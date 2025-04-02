import React, { createContext, useContext, useEffect, useState } from "react";
import { Theme, getTheme } from "../utils/themes";

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [theme, setTheme] = useState<Theme>(() => getTheme());

    const toggleTheme = () => {
        const newTheme: Theme = theme === "dark" ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
    };

    useEffect(() => {
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
