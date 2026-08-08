"use client";

import React from "react";
import Link from "next/link";
import { Code2, GitCommit, Share2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.heroSection}>
      <h1 className={`${styles.title} animate-fade-in-up`}>
        <span>60 days.</span>
        <span>60 builds.</span>
        <span className={styles.titleHighlight}>One public proof<br />of growth.</span>
      </h1>
      
      <p className={`${styles.subtitle} animate-fade-in-up delay-100`}>
        Stop learning in private. Build something every day, commit your work to GitHub, and share your progress publicly.
      </p>

      <div className={`${styles.ctaWrapper} animate-fade-in-up delay-200`}>
        <Link href="/dashboard" style={{ display: "block" }}>
          <Button className={styles.primaryCTA}>Start the 60-Day Challenge</Button>
        </Link>
      </div>

      {/* Mini UI Representation of the core loop */}
      <div className={`${styles.visualSequence} animate-fade-in-up delay-300`}>
        <div className={styles.connector} />
        
        <div className={`${styles.visualCard} animate-scale-in delay-300`}>
          <div className={`${styles.cardIconWrapper} ${styles.buildIcon}`}>
            <Code2 size={16} />
          </div>
          <div className={styles.cardText}>
            <span className={styles.cardTitle}>Build</span>
            <span className={styles.cardSub}>Complete today&apos;s task</span>
          </div>
        </div>

        <div className={`${styles.visualCard} animate-scale-in delay-400`}>
          <div className={`${styles.cardIconWrapper} ${styles.proveIcon}`}>
            <GitCommit size={16} />
          </div>
          <div className={styles.cardText}>
            <span className={styles.cardTitle}>Prove</span>
            <span className={styles.cardSub}>Push to GitHub</span>
          </div>
        </div>

        <div className={`${styles.visualCard} animate-scale-in delay-500`}>
          <div className={`${styles.cardIconWrapper} ${styles.shareIcon}`}>
            <Share2 size={16} />
          </div>
          <div className={styles.cardText}>
            <span className={styles.cardTitle}>Share</span>
            <span className={styles.cardSub}>Post on LinkedIn</span>
          </div>
        </div>
      </div>
    </section>
  );
}
