"use client";

import React, { useEffect, useRef } from "react";
import styles from "./StreakStory.module.css";

export function StreakStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".observe-me");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={`${styles.card} observe-me`} style={{ opacity: 0 }}>
        
        <div className={styles.visuals}>
          <div className={styles.streakVisual}>
            <div className={`${styles.streakNumber} font-heading`}>12</div>
            <div className={styles.streakLabel}>Day Streak</div>
          </div>
          
          <div className={styles.progressVisual}>
            <div className={styles.progressLabel}>11 / 60 DAYS COMPLETE</div>
            <div className={styles.progressBarContainer}>
              <div className={styles.progressBarFill} />
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <h2 className={`${styles.title} font-heading`}>Your streak can pause.<br />Your progress doesn&apos;t have to.</h2>
          <p className={styles.description}>
            ABTalks tracks both your consecutive <span className={styles.highlight}>momentum</span> and your total <span className={styles.highlight}>progress</span>. If life happens and you miss a day, you don&apos;t start from zero. You just pick up where you left off.
          </p>
        </div>

      </div>
    </section>
  );
}
