"use client";

import React, { useEffect, useRef } from "react";
import styles from "./ProductIntro.module.css";
import { BookOpen, Code2, GitCommit, Share2, RotateCw } from "lucide-react";

export function ProductIntro() {
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

  const steps = [
    {
      title: "Choose",
      desc: "Pick a track (e.g., Frontend, Backend) and commit to it.",
      icon: <BookOpen size={16} />
    },
    {
      title: "Build",
      desc: "Complete a small, targeted coding task every day.",
      icon: <Code2 size={16} />
    },
    {
      title: "Commit",
      desc: "Push your actual code to GitHub to build real history.",
      icon: <GitCommit size={16} />
    },
    {
      title: "Share",
      desc: "Publish your progress on LinkedIn for public visibility.",
      icon: <Share2 size={16} />
    },
    {
      title: "Continue",
      desc: "Return the next day to maintain momentum.",
      icon: <RotateCw size={16} />
    }
  ];

  return (
    <section id="how-it-works" className={styles.introSection} ref={sectionRef}>
      <h2 className={`${styles.title} font-heading observe-me`} style={{ opacity: 0 }}>What is ABTalks?</h2>
      <p className={`${styles.description} observe-me`} style={{ opacity: 0 }}>
        ABTalks is a 60-day challenge where students <strong>build something every day</strong> and publicly document their progress. No more endless tutorials—only real projects and a public track record.
      </p>

      <div className={styles.visualLoop}>
        <div className={styles.loopLine} />
        {steps.map((step, idx) => (
          <div key={idx} className={`${styles.loopItem} observe-me`} style={{ opacity: 0, animationDelay: `${idx * 100}ms` }}>
            <div className={styles.loopNode}>
              <div className={styles.loopNodeInner} />
            </div>
            <div className={styles.loopContent}>
              <h3 className={styles.loopTitle}>
                <span style={{ color: "var(--brand-primary)" }}>{step.icon}</span>
                {step.title}
              </h3>
              <p className={styles.loopDesc}>{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
