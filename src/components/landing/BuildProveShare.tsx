"use client";

import React, { useEffect, useRef } from "react";
import styles from "./BuildProveShare.module.css";
import { Code2, GitCommit, Share2, RefreshCw } from "lucide-react";

export function BuildProveShare() {
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
      <h2 className={`${styles.title} font-heading observe-me`} style={{ opacity: 0 }}>The Daily Loop</h2>
      
      <div className={styles.grid}>
        <div className={`${styles.step} observe-me`} style={{ opacity: 0, animationDelay: "100ms" }}>
          <div className={styles.stepHeader}>
            <div className={`${styles.iconWrapper} ${styles.buildIcon}`}>
              <Code2 size={24} />
            </div>
            <h3 className={`${styles.stepTitle} font-heading`}>Build</h3>
          </div>
          <p className={styles.stepDesc}>Build today&apos;s task. Follow the spec, write the code, and learn by doing.</p>
        </div>

        <div className={styles.connector} />

        <div className={`${styles.step} observe-me`} style={{ opacity: 0, animationDelay: "200ms" }}>
          <div className={styles.stepHeader}>
            <div className={`${styles.iconWrapper} ${styles.proveIcon}`}>
              <GitCommit size={24} />
            </div>
            <h3 className={`${styles.stepTitle} font-heading`}>Prove</h3>
          </div>
          <p className={styles.stepDesc}>Push your work to GitHub. A real commit history speaks louder than certificates.</p>
        </div>

        <div className={styles.connector} />

        <div className={`${styles.step} observe-me`} style={{ opacity: 0, animationDelay: "300ms" }}>
          <div className={styles.stepHeader}>
            <div className={`${styles.iconWrapper} ${styles.shareIcon}`}>
              <Share2 size={24} />
            </div>
            <h3 className={`${styles.stepTitle} font-heading`}>Share</h3>
          </div>
          <p className={styles.stepDesc}>Publish your progress on LinkedIn. Let recruiters see your consistency in real-time.</p>
        </div>

        <div className={styles.connector} />

        <div className={`${styles.step} observe-me`} style={{ opacity: 0, animationDelay: "400ms" }}>
          <div className={styles.stepHeader}>
            <div className={`${styles.iconWrapper} ${styles.repeatIcon}`}>
              <RefreshCw size={24} />
            </div>
            <h3 className={`${styles.stepTitle} font-heading`}>Repeat</h3>
          </div>
          <p className={styles.stepDesc}>Come back tomorrow. Maintain your streak and watch your portfolio grow.</p>
        </div>
      </div>
    </section>
  );
}
