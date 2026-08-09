"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import styles from "./JourneyVisualization.module.css";

export function JourneyVisualization() {
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Animate progress line from 0 to 100 over 1.5s
          setTimeout(() => setProgress(100), 200);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const milestones = [
    { 
      day: "01", 
      progressTrigger: 0,
      topic: "Setup & Mindset",
      description: "Configuring the environment and committing to 60 days of shipping."
    },
    { 
      day: "15", 
      progressTrigger: 25,
      topic: "Component Architecture",
      description: "Building reusable, accessible UI elements and managing state."
    },
    { 
      day: "30", 
      progressTrigger: 50,
      topic: "Data Fetching & APIs",
      description: "Connecting to backends, handling loading states, and mutating data."
    },
    { 
      day: "45", 
      progressTrigger: 75,
      topic: "Performance & Polish",
      description: "Mastering Core Web Vitals, dynamic imports, and optimizations."
    },
    { 
      day: "60", 
      progressTrigger: 100,
      topic: "The Final Build",
      description: "Shipping a complete, production-ready full-stack application."
    },
  ];

  return (
    <section className={styles.journeySection} ref={sectionRef}>
      <h2 className={`${styles.title} font-heading`}>The 60-Day Journey</h2>
      
      <div className={styles.timeline}>
        <div className={styles.timelineLine} />
        <div className={styles.timelineProgress} style={{ '--progress': `${progress}%` } as React.CSSProperties} />
        
        {milestones.map((m) => {
          const isActive = progress >= m.progressTrigger;
          const isHighlight = progress === m.progressTrigger;
          
          return (
            <Link 
              key={m.day} 
              href={`/day/${parseInt(m.day, 10)}`}
              className={`${styles.milestone} ${isActive ? styles.active : ""} ${isHighlight ? styles.highlight : ""}`}
              style={{ textDecoration: 'none' }}
            >
              <div className={styles.milestoneNode} />
              <div className={styles.milestoneContent}>
                <div className={`${styles.milestoneLabel} font-heading`}>DAY {m.day}</div>
                <div className={`${styles.milestoneTopic} font-heading`}>{m.topic}</div>
                <div className={styles.milestoneDesc}>{m.description}</div>
              </div>
            </Link>
          );
        })}
      </div>
      
      <p className={styles.message}>
        &quot;This isn&apos;t one project. This is 60 days of consistent building.&quot;
      </p>
    </section>
  );
}
