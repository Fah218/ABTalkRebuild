import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Clock, Circle, Trophy, Zap, RefreshCw } from "lucide-react";
import styles from "./page.module.css";
import studentData from "@/data/student.json";
import challengeData from "@/data/challenge.json";
import day12Data from "@/data/day12.json";

export default function DashboardPage() {
  const isMissedDay = studentData.currentStreak === 0;

  return (
    <div className="container">
      <header className={styles.header}>
        <h1 className={styles.greeting}>Good evening, builder.</h1>
      </header>

      <main className={styles.grid}>
        {/* Momentum Recovery or Streak */}
        {isMissedDay ? (
          <div className={styles.recoveryBanner}>
            <RefreshCw size={20} className={styles.recoveryIcon} />
            <div className={styles.recoveryText}>
              <strong>Your streak paused. Your progress didn&apos;t.</strong>
              You&apos;ve completed {studentData.progress} out of {challengeData.totalDays} days. Get back on track today.
            </div>
          </div>
        ) : (
          <Card className={styles.streakCard}>
            <div className={styles.streakNumber}>{studentData.currentStreak}</div>
            <div className={styles.streakLabel}>Day Streak</div>
            <div className={styles.streakMessage}>You&apos;re building momentum.</div>
          </Card>
        )}

        {/* Today's Build */}
        <section>
          <h2 className={styles.sectionTitle}>Today&apos;s Action</h2>
          <Card className={styles.todaysBuildCard}>
            <div className={styles.dayLabel}>Day {day12Data.dayNumber}</div>
            <h3 className={styles.taskTitle}>{day12Data.title}</h3>
            
            <div className={styles.taskMeta}>
              <div className={styles.taskMetaItem}>
                <Clock size={14} />
                <span>{day12Data.estimatedTime}</span>
              </div>
              <div className={styles.taskMetaItem}>
                <Circle size={14} />
                <span>GitHub</span>
              </div>
              <div className={styles.taskMetaItem}>
                <Circle size={14} />
                <span>LinkedIn</span>
              </div>
            </div>

            <Link href={`/day/${day12Data.dayNumber}`} style={{ width: "100%", display: "block" }}>
              <Button style={{ width: "100%" }}>Continue today&apos;s build</Button>
            </Link>
          </Card>
        </section>

        {/* Challenge Progress */}
        <section>
          <h2 className={styles.sectionTitle}>Your Journey</h2>
          <Card>
            <div className={styles.progressHeader}>
              <div className={styles.progressLabel}>
                {studentData.progress} / {challengeData.totalDays} days
              </div>
              <div className={styles.progressPercent}>
                {Math.round((studentData.progress / challengeData.totalDays) * 100)}% complete
              </div>
            </div>
            <ProgressBar value={studentData.progress} max={challengeData.totalDays} />
            <div className={styles.milestones}>
              <span>0</span>
              <span>15</span>
              <span>30</span>
              <span>45</span>
              <span>60</span>
            </div>
          </Card>
        </section>

        {/* Achievements */}
        <section>
          <h2 className={styles.sectionTitle}>Achievements</h2>
          <div className={styles.achievementGrid}>
            {studentData.achievements.map((achievement) => (
              <div key={achievement.id} className={styles.achievementCard}>
                {achievement.icon === "Trophy" ? (
                  <Trophy size={24} className={styles.achievementIcon} />
                ) : (
                  <Zap size={24} className={styles.achievementIcon} />
                )}
                <div>
                  <h3 className={styles.achievementTitle}>{achievement.title}</h3>
                  <p className={styles.achievementDesc}>{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
