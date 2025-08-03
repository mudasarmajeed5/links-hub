"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="w-9 h-9 flex items-center justify-center rounded-md border border-input bg-background shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          {/* Sun Icon */}
          <Sun
            className={`h-[1.2rem] w-[1.2rem] transition-all ${
              theme === "dark" ? "scale-0 rotate-90" : "scale-100 rotate-0"
            }`}
          />

          {/* Moon Icon */}
          <Moon
            className={`h-[1.2rem] w-[1.2rem] absolute transition-all ${
              theme === "dark" ? "scale-100 rotate-0" : "scale-0 -rotate-90"
            }`}
          />

          <span className="sr-only">Toggle theme</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
