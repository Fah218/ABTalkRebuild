"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import styles from "./FinalCTA.module.css";

export function FinalCTA() {
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className={`${styles.section} observe-me`} style={{ opacity: 0 }} ref={sectionRef}>
      <h2 className={styles.title}>
        <span>You don&apos;t need</span>
        <span>60 perfect days.</span>
        <span className={styles.highlight}>You just need to build today.</span>
      </h2>
      
      <div className={styles.ctaWrapper}>
        <Link href="/dashboard" style={{ display: "block" }}>
          <Button className={styles.primaryCTA}>Start the 60-Day Challenge</Button>
        </Link>
      </div>
    </section>
  );
}
