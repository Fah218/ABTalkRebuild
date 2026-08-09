"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import studentData from "@/data/student.json";
import styles from "./Header.module.css";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <header 
      className={styles.header}
      style={{
        borderBottomColor: scrolled ? "var(--border-color)" : "transparent",
      }}
    >
      <Link href="/" className={`${styles.logo} font-heading font-extrabold`} onClick={handleLogoClick}>
        ABTalks
      </Link>

      <nav className={`${styles.nav} ${mobileMenuOpen ? styles.mobileOpen : ""}`}>
        <Link href="/#how-it-works" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
          How it works
        </Link>
        <Link href="/day/12" className={styles.navLink} onClick={() => setMobileMenuOpen(false)}>
          Challenge
        </Link>
        <Link href="/dashboard" className={styles.startBtn} onClick={() => setMobileMenuOpen(false)}>
          Start
        </Link>
      </nav>

      <div className={styles.actions}>
        {mounted && (
          <button 
            onClick={toggleTheme} 
            className={styles.themeToggle} 
            aria-label="Toggle theme"
          >
            {theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>
        )}
        
        <div className={styles.avatar}>
          {studentData.initials}
        </div>
        
        <button className={styles.mobileMenuBtn} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
