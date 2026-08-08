import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";
import styles from "./page.module.css";

export default function LandingPage() {
  return (
    <div className="container">
      <header style={{ padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className={styles.logo}>ABTalks</div>
        <Link href="/dashboard" style={{ fontSize: "14px", fontWeight: 500, color: "var(--brand-primary)" }}>
          Sign In
        </Link>
      </header>

      <main style={{ flex: 1 }}>
        <section className={styles.hero}>
          <h1 className={styles.title}>
            60 days.<br />
            60 builds.<br />
            One public proof<br />
            of growth.
          </h1>
          <p className={styles.subtitle}>
            Stop learning in private. Build something every day, commit your work to GitHub, and share your progress publicly.
          </p>
          <Link href="/dashboard" style={{ width: "100%" }}>
            <Button className={styles.primaryCTA}>Start the 60-Day Challenge</Button>
          </Link>
        </section>

        <section className={styles.journeySection}>
          <h2 className={styles.sectionTitle}>How it works</h2>
          <div className={styles.journeyList}>
            <div className={styles.journeyItem}>
              <div className={styles.journeyNumber}>01</div>
              <div className={styles.journeyContent}>
                <h3>Choose your track</h3>
                <p>Pick a discipline and commit to the journey.</p>
              </div>
            </div>
            <div className={styles.journeyItem}>
              <div className={styles.journeyNumber}>02</div>
              <div className={styles.journeyContent}>
                <h3>Build today&apos;s task</h3>
                <p>Complete a targeted mini-project each day.</p>
              </div>
            </div>
            <div className={styles.journeyItem}>
              <div className={styles.journeyNumber}>03</div>
              <div className={styles.journeyContent}>
                <h3>Push your work</h3>
                <p>Submit your GitHub commit as proof.</p>
              </div>
            </div>
            <div className={styles.journeyItem}>
              <div className={styles.journeyNumber}>04</div>
              <div className={styles.journeyContent}>
                <h3>Share your proof</h3>
                <p>Post on LinkedIn to build public visibility.</p>
              </div>
            </div>
            <div className={styles.journeyItem}>
              <div className={styles.journeyNumber}>05</div>
              <div className={styles.journeyContent}>
                <h3>Come back tomorrow</h3>
                <p>Maintain your streak and build momentum.</p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.benefitsSection}>
          <h2 className={styles.sectionTitle}>Why ABTalks?</h2>
          <ul className={styles.benefitList}>
            <li className={styles.benefitItem}>
              <CheckCircle2 size={20} className={styles.benefitIcon} />
              <span>Build consistently instead of sporadically</span>
            </li>
            <li className={styles.benefitItem}>
              <CheckCircle2 size={20} className={styles.benefitIcon} />
              <span>Create real GitHub history</span>
            </li>
            <li className={styles.benefitItem}>
              <CheckCircle2 size={20} className={styles.benefitIcon} />
              <span>Share public proof of work</span>
            </li>
            <li className={styles.benefitItem}>
              <CheckCircle2 size={20} className={styles.benefitIcon} />
              <span>Become more visible to recruiters</span>
            </li>
            <li className={styles.benefitItem}>
              <CheckCircle2 size={20} className={styles.benefitIcon} />
              <span>Finish projects instead of endlessly learning</span>
            </li>
          </ul>
        </section>

        <section className={styles.finalCTASection}>
          <h2 className={styles.sectionTitle}>Start building in public.</h2>
          <Link href="/dashboard" style={{ width: "100%" }}>
            <Button className={styles.primaryCTA}>Start the 60-Day Challenge</Button>
          </Link>
        </section>
      </main>
    </div>
  );
}
