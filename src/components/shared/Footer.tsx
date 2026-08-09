"use client";

import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const TwitterIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const YoutubeIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);

// Basic Discord SVG since lucide might not guarantee the brand icon
const DiscordIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M9 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
    <path d="M15 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
    <path d="M18.81 7.15A11.66 11.66 0 0 0 15 5.25v0a.44.44 0 0 0-.25.13 8.35 8.35 0 0 0-.39.81 11.83 11.83 0 0 0-4.7 0 8 8 0 0 0-.39-.81.44.44 0 0 0-.25-.13 11.66 11.66 0 0 0-3.81 1.9.46.46 0 0 0-.2.15c-2.43 3.63-3.08 7.16-2.8 10.66a.42.42 0 0 0 .17.3 11.96 11.96 0 0 0 3.6 1.83.42.42 0 0 0 .45-.16 9.38 9.38 0 0 0 .75-1.22.42.42 0 0 0-.22-.59 8.29 8.29 0 0 1-1.15-.55.42.42 0 0 1-.04-.69c.09-.07.18-.14.27-.22a.4.4 0 0 1 .42-.05 8.37 8.37 0 0 0 7.82 0 .4.4 0 0 1 .42.05c.09.08.18.15.27.22a.42.42 0 0 1-.04.69 8.2 8.2 0 0 1-1.15.55.42.42 0 0 0-.22.59 9.38 9.38 0 0 0 .75 1.22.42.42 0 0 0 .45.16 11.96 11.96 0 0 0 3.6-1.83.42.42 0 0 0 .17-.3c.32-4-.37-7.46-2.84-10.82a.46.46 0 0 0-.2-.14z"/>
  </svg>
);

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          
          <div className={styles.brandSection}>
            <Link href="/" className={`${styles.logo} font-heading font-extrabold`}>
              ABTalks
            </Link>
            <p className={styles.quote}>
              Consistency is the ultimate proof of work.
            </p>
          </div>

          <div className={styles.socialSection}>
            <a href="#" className={styles.socialIcon} aria-label="LinkedIn">
              <LinkedinIcon size={20} />
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Instagram">
              <InstagramIcon size={20} />
            </a>
            <a href="#" className={styles.socialIcon} aria-label="X (Twitter)">
              <TwitterIcon size={20} />
            </a>
            <a href="#" className={styles.socialIcon} aria-label="YouTube">
              <YoutubeIcon size={20} />
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Discord">
              <DiscordIcon size={20} />
            </a>
          </div>

        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} ABTalks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
