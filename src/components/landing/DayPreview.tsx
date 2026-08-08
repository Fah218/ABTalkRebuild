"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./DayPreview.module.css";
import { CheckCircle2, Circle, Clock, ArrowRight } from "lucide-react";

export function DayPreview() {
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
      <div className={`${styles.header} observe-me`} style={{ opacity: 0 }}>
        <h2 className={`${styles.title} font-heading`}>One day. One build.</h2>
        <p className={styles.subtitle}>A miniature representation of your daily workspace.</p>
      </div>

      <div className={`${styles.previewContainer} observe-me`} style={{ opacity: 0, animationDelay: "150ms" }}>
        <div className={`${styles.dayLabel} font-heading`}>DAY 12</div>
        <h3 className={`${styles.taskTitle} font-heading`}>Build a responsive developer portfolio</h3>
        
        <div className={styles.meta}>
          <Clock size={14} />
          <span>45–60 min</span>
        </div>

        <div className={styles.checklist}>
          <div className={`${styles.checkItem} ${styles.done}`}>
            <CheckCircle2 size={18} className={styles.iconDone} />
            <span>Hero section completed</span>
          </div>
          <div className={`${styles.checkItem} ${styles.done}`}>
            <CheckCircle2 size={18} className={styles.iconDone} />
            <span>Mobile responsive layout works</span>
          </div>
          <div className={styles.checkItem}>
            <Circle size={18} className={styles.iconPending} />
            <span>GitHub repository updated</span>
          </div>
          <div className={styles.checkItem}>
            <Circle size={18} className={styles.iconPending} />
            <span>LinkedIn post published</span>
          </div>
        </div>
      </div>

      <div className={`${styles.ctaWrapper} observe-me`} style={{ opacity: 0, animationDelay: "300ms" }}>
        <Link href="/day/12" className={styles.ctaLink}>
          See a challenge day <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
