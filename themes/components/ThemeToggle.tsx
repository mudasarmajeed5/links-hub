"use client"
import { useState } from "react";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleButtonProps {
    toggleTheme: () => void;
    themeToggleStyles: string;
    theme: "light" | "dark";
}

const ThemeToggleButton = ({ toggleTheme, themeToggleStyles, theme }: ThemeToggleButtonProps) => {
    const [isRotating, setIsRotating] = useState(false);

    const handleClick = () => {
        setIsRotating(true);

        setTimeout(() => {
            toggleTheme(); 
            setIsRotating(false);
        }, 500);
    };

    return (
        <button
            onClick={handleClick}
            className={themeToggleStyles}
            aria-label="Toggle theme"
        >
            {theme === "light" ? (
                <Moon className={`w-5 h-5 transition-transform duration-500 ${isRotating ? "rotate-[180deg]" : ""}`} />
            ) : (
                <Sun className={`w-5 h-5 transition-transform duration-500 ${isRotating ? "rotate-[180deg]" : ""}`} />
            )}
        </button>
    );
};

export default ThemeToggleButton;
