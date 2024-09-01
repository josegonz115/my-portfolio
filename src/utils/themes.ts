export const getPreferredTheme = () => {
    if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        return "dark";
    } else {
        return "light";
    }
};

export function setTheme(
    themeName: string,
    setClassName: React.Dispatch<React.SetStateAction<string>>
) {
    localStorage.setItem("theme", themeName);
    setClassName(themeName);
}

export function keepTheme(
    setClassName: React.Dispatch<React.SetStateAction<string>>
) {
    const theme = localStorage.getItem("theme");
    if (theme) {
        setTheme(theme, setClassName);
        return;
    }
    const prefersDarkTheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
    );
    if (prefersDarkTheme.matches) {
        setTheme("dark", setClassName);
        return;
    }
    setTheme("light", setClassName);
}


// themeUtils.js
// export function applyThemeBasedOnPreference() {
//     const prefersDarkScheme = window.matchMedia(
//         "(prefers-color-scheme: dark)"
//     ).matches;
//     if (prefersDarkScheme) {
//         document.documentElement.classList.add("dark");
//     } else {
//         document.documentElement.classList.remove("dark");
//     }
// }

// export function listenForThemeChanges() {
//     const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
//     mediaQuery.addEventListener("change", (e) => {
//         if (e.matches) {
//             document.documentElement.classList.add("dark");
//         } else {
//             document.documentElement.classList.remove("dark");
//         }
//     });
// }

// // On page load or when changing themes, best to add inline in `head` to avoid FOUC
// if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
//     document.documentElement.classList.add('dark')
//   } else {
//     document.documentElement.classList.remove('dark')
//   }

// Whenever the user explicitly chooses light mode
// localStorage.theme = 'light'

// Whenever the user explicitly chooses dark mode
// localStorage.theme = 'dark'

// Whenever the user explicitly chooses to respect the OS preference
// localStorage.removeItem('theme')