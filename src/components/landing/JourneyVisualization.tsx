"use client";

import React, { useEffect, useState, useRef } from "react";
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
    { day: "01", progressTrigger: 0 },
    { day: "15", progressTrigger: 25 },
    { day: "30", progressTrigger: 50 },
    { day: "45", progressTrigger: 75 },
    { day: "60", progressTrigger: 100 },
  ];

  return (
    <section className={styles.journeySection} ref={sectionRef}>
      <h2 className={styles.title}>The 60-Day Journey</h2>
      
      <div className={styles.timeline}>
        <div className={styles.timelineLine} />
        <div className={styles.timelineProgress} style={{ width: `${progress}%` }} />
        
        {milestones.map((m) => {
          const isActive = progress >= m.progressTrigger;
          const isHighlight = progress === m.progressTrigger; // Optional subtle effect
          
          return (
            <div 
              key={m.day} 
              className={`${styles.milestone} ${isActive ? styles.active : ""} ${isHighlight ? styles.highlight : ""}`}
            >
              <div className={styles.milestoneNode} />
              <div className={styles.milestoneLabel}>DAY {m.day}</div>
            </div>
          );
        })}
      </div>
      
      <p className={styles.message}>
        &quot;This isn&apos;t one project. This is 60 days of consistent building.&quot;
      </p>
    </section>
  );
}
