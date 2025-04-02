export type Theme = "light" | "dark";

export const getTheme = (): Theme => {
    if (typeof window === "undefined") {
        return "light"; 
    }

    if (localStorage.theme === "light" || localStorage.theme === "dark") {
        return localStorage.theme as Theme;
    }

    try {
        const mediaQuery = window.matchMedia?.("(prefers-color-scheme: dark)");
        if (mediaQuery?.matches) {
            return "dark";
        }
    } catch (error) {
        console.warn("Error checking color scheme preference:", error);
    }

    return "light";
};

export const toggleTheme = (): Theme => {
    const newTheme: Theme = getTheme() === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    return newTheme;
};
