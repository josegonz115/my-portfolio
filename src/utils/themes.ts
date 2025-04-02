export type Theme = "light" | "dark";

export const getTheme = (): Theme => {
    if (typeof window === "undefined" || typeof localStorage === "undefined") {
        return "light";
    }

    if (localStorage.theme === "light" || localStorage.theme === "dark") {
        return localStorage.theme as Theme;
    }
    return "light";
};

export const toggleTheme = (): Theme => {
    if (typeof window === "undefined" || typeof localStorage === "undefined") {
        return "light";
    }
    
    const newTheme: Theme = getTheme() === "dark" ? "light" : "dark";
    try {
        localStorage.setItem("theme", newTheme);
    } catch (e) {
        console.warn("Could not set theme in localStorage:", e);
    }
    return newTheme;
};
