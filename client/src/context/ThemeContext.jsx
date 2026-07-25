import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem("theme");
        return saved ? saved : "dark"; // Default to dark mode
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "light") {
            root.classList.add("light-theme");
        } else {
            root.classList.remove("light-theme");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        const root = document.documentElement;
        root.classList.add("theme-transition");
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
        setTimeout(() => {
            root.classList.remove("theme-transition");
        }, 600);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
