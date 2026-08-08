"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Benefits.module.css";
import { LineChart, History, Eye, CheckSquare } from "lucide-react";

export function Benefits() {
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

  const benefits = [
    {
      title: "Real GitHub history",
      desc: "Stop collecting certificates. Start collecting commits. A green contribution graph proves your capability.",
      icon: <History size={20} />
    },
    {
      title: "Finished projects",
      desc: "Escape tutorial hell. Actually finish what you start by breaking large goals into daily, manageable tasks.",
      icon: <CheckSquare size={20} />
    },
    {
      title: "Public visibility",
      desc: "By sharing daily updates on LinkedIn, recruiters see your dedication and problem-solving process over time.",
      icon: <Eye size={20} />
    },
    {
      title: "Unbreakable consistency",
      desc: "Building a habit is the hardest part. The 60-day format is designed to permanently shift you from consumer to creator.",
      icon: <LineChart size={20} />
    }
  ];

  return (
    <section className={styles.section} ref={sectionRef}>
      <h2 className={`${styles.title} font-heading observe-me`} style={{ opacity: 0 }}>Why public building matters</h2>
      
      <div className={styles.benefitsList}>
        {benefits.map((benefit, idx) => (
          <div key={idx} className={`${styles.benefitItem} observe-me`} style={{ opacity: 0, animationDelay: `${idx * 100}ms` }}>
            <div className={styles.iconWrapper}>
              {benefit.icon}
            </div>
            <div className={styles.benefitContent}>
              <h3 className={`${styles.benefitTitle} font-heading`}>{benefit.title}</h3>
              <p className={styles.benefitDesc}>{benefit.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
