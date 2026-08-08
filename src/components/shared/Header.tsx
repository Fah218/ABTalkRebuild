"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Terminal } from "lucide-react";
import styles from "./Header.module.css";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
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
        <Terminal size={20} className={styles.logoIcon} />
        ABTalks
      </Link>

      <nav className={styles.nav}>
        <Link href="/#how-it-works" className={styles.navLink}>
          How it works
        </Link>
        <Link href="/day/12" className={styles.navLink}>
          Challenge
        </Link>
        <Link href="/dashboard" className={styles.startBtn}>
          Start
        </Link>
      </nav>
    </header>
  );
}
