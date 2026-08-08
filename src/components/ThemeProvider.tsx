"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("system");

  useEffect(() => {
    // On mount, read from localStorage
    const savedTheme = localStorage.getItem("abtalks-theme") as Theme | null;
    if (savedTheme) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setThemeState(savedTheme);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("abtalks-theme", newTheme);
    
    if (newTheme === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", newTheme);
    }
  };

  const toggleTheme = () => {
    // If it's system, we resolve the actual current theme to toggle against it
    let currentTheme = theme;
    if (currentTheme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      currentTheme = isDark ? "dark" : "light";
    }
    
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  // Prevent hydration mismatch on toggle button rendering by returning context with mounted state
  // But wait, the children still need to render. We just provide context.
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
