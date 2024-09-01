import { useState } from "react";
// import "../styles/toggle.css";
import { getPreferredTheme, setTheme } from "../utils/themes";
import useBodyClass from "../hooks/useBodyClass";


const Toggle = () => {
    const [className, setClassName] = useState<string>(getPreferredTheme());
    const darkLabel = "color mode toggle, dark mode";
    const lightLabel = "color mode toggle, light mode";
    const isLightMode = className === 'light';
    const [active, setActive] = useState(isLightMode);
    const [ariaActive, setAriaActive] = useState(!isLightMode);
    const [ariaLabel, setAriaLabel] = useState(isLightMode ? lightLabel : darkLabel);

    const changeThemeAndToggle = () => {
        const newTheme = localStorage.getItem("theme") === "dark" ? "light" : "dark";
        setTheme(newTheme, setClassName);
        const isLight = newTheme === "light";
        setActive(isLight);
        setAriaActive(!isLight);
        setAriaLabel(isLight ? lightLabel : darkLabel);
    };
    const handleOnClick = () => {
        changeThemeAndToggle();
    };
    const handleKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === "Enter") {
            changeThemeAndToggle();
        }
    };

    useBodyClass(className);

    return (
        <div id='theme-toggle' className="container--toggle hover:underline hover:underline-offset-4 " title="color mode toggle">
            <input
                role="switch"
                aria-checked={ariaActive}
                onKeyDown={handleKeypress}
                type="checkbox"
                id="toggle"
                className="toggle--checkbox"
                onClick={handleOnClick}
                checked={active}
                readOnly
                hidden
            />
            <label
                htmlFor="toggle"
                className="toggle--label text-xl cursor-pointer"
                aria-label={ariaLabel}
                id={className}
            >
                {className==='light' ? '🌚' : '🌝'}
            </label>
        </div>
    );
};

export default Toggle;
