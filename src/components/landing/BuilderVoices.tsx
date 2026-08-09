"use client";

import React, { useRef, useState } from "react";
import styles from "./BuilderVoices.module.css";

const VOICES = [
  {
    quote: "ABTalks forced me to stop collecting tutorials and start shipping.",
    name: "Builder",
    role: "Frontend Developer",
    initial: "B"
  },
  {
    quote: "The daily GitHub proof made my progress visible instead of just theoretical.",
    name: "Builder",
    role: "Full-Stack Developer",
    initial: "B"
  },
  {
    quote: "Having a fixed daily build gave me a much better reason to code consistently.",
    name: "Builder",
    role: "Software Developer",
    initial: "B"
  }
];

export function BuilderVoices() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Fallback for drag-to-scroll on touch/desktop devices if the user grabs it
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.badge}>Builder Voices</div>
          <h2 className={styles.title}>What builders are saying</h2>
        </div>
      </div>
      
      <div className={styles.marqueeWrapper}>
        <div 
          className={styles.marqueeContent}
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {/* Render the list twice to create the infinite loop effect */}
          {[...VOICES, ...VOICES].map((voice, idx) => (
            <div key={idx} className={styles.card}>
              <p className={styles.quote}>&quot;{voice.quote}&quot;</p>
              <div className={styles.author}>
                <div className={styles.avatar}>{voice.initial}</div>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{voice.name}</span>
                  <span className={styles.authorRole}>{voice.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
