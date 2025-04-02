export type Theme = "light" | "dark";

export const getTheme = (): Theme => {
    // Check localStorage first
    if (localStorage.theme === "light" || localStorage.theme === "dark") {
        return localStorage.theme as Theme;
    }

    try {
        if (
            typeof window !== "undefined" &&
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            return "dark";
        }
    } catch (error) {
        console.warn("Error checking color scheme preference:", error);
    }

    // Default fallback
    return "light";
};

export const toggleTheme = (): Theme => {
    const newTheme: Theme = getTheme() === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    return newTheme;
};
