import { Moon, Sun } from "lucide-react"

export const ThemeToggle = ({ theme, toggleTheme }: { theme: string, toggleTheme: () => void }) => {
        return (
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full transition-all duration-300 shadow-md border 
                 bg-purple-100 text-purple-600 
                 dark:bg-purple-800 dark:text-purple-200 
                 hover:scale-105 hover:shadow-lg"
                aria-label="Toggle theme"
            >
                {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
        )
    }