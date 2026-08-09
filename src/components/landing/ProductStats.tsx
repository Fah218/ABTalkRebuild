"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./ProductStats.module.css";

// A simple hook to count up a number when in view
function useCountUp(end: number, duration: number = 2000, inView: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function for smoother finish
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [end, duration, inView]);

  return count;
}

export function ProductStats() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          // Disconnect once triggered
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const daysCount = useCountUp(60, 2000, inView);
  const buildsCount = useCountUp(60, 2000, inView);

  const stats = [
    {
      value: `${daysCount}`,
      label: "Days",
    },
    {
      value: `${buildsCount}`,
      label: "Daily Builds",
    },
    {
      value: "2",
      label: "Proof Channels\nGitHub + LinkedIn",
    },
    {
      value: "1",
      label: "Consistent Building Habit",
    }
  ];

  return (
    <section className={styles.section} ref={ref}>
      <div className={`container ${inView ? styles.animateSlideUp : ""}`} style={{ opacity: inView ? 1 : 0 }}>
        <div className={styles.header}>
          <div className={styles.badge}>Social Proof</div>
          <h2 className={styles.title}>Built by builders, proven by progress.</h2>
          <p className={styles.subtitle}>
            We don&apos;t just consume tutorials. We ship code every single day and prove our skills in public.
          </p>
        </div>

        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.value}>{stat.value}</div>
              <div className={styles.label}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
