"use client";

import { Moon, Sun, Contrast } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  contrastStorageKey,
  themeStorageKey,
  type ContrastMode,
  type ThemeMode,
} from "@/config/themes";

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>("light");
  const [contrast, setContrast] = useState<ContrastMode>("normal");

  useEffect(() => {
    const storedTheme = (localStorage.getItem(themeStorageKey) as ThemeMode | null) ?? "light";
    const storedContrast =
      (localStorage.getItem(contrastStorageKey) as ContrastMode | null) ?? "normal";
    setTheme(storedTheme);
    setContrast(storedContrast);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
    document.documentElement.classList.toggle("high-contrast", storedContrast === "high");
  }, []);

  function applyTheme(next: ThemeMode) {
    setTheme(next);
    localStorage.setItem(themeStorageKey, next);
    document.documentElement.classList.toggle("dark", next === "dark");
  }

  function applyContrast(next: ContrastMode) {
    setContrast(next);
    localStorage.setItem(contrastStorageKey, next);
    document.documentElement.classList.toggle("high-contrast", next === "high");
  }

  return (
    <div className="flex shrink-0 items-center gap-0.5">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-9 w-9 min-h-9 sm:h-11 sm:w-11 sm:min-h-11"
        aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
        onClick={() => applyTheme(theme === "light" ? "dark" : "light")}
      >
        {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="hidden h-9 w-9 min-h-9 sm:inline-flex sm:h-11 sm:w-11 sm:min-h-11"
        aria-label={
          contrast === "normal" ? "Enable high contrast" : "Disable high contrast"
        }
        onClick={() => applyContrast(contrast === "normal" ? "high" : "normal")}
      >
        <Contrast className="h-4 w-4" />
      </Button>
    </div>
  );
}
