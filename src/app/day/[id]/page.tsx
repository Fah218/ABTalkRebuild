"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, CheckCircle2, Circle, CheckSquare, GitCommit, Briefcase, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import styles from "./page.module.css";

import studentData from "@/data/student.json";
import challengeData from "@/data/challenge.json";
import day12Data from "@/data/day12.json";
import completedDaysData from "@/data/completed-days.json";

export default function DayPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  // Handle Next.js 15+ params which is a Promise
  const resolvedParams = params instanceof Promise ? use(params) : params as { id: string };
  const dayId = parseInt(resolvedParams.id, 10);

  // States for Day 12
  const [checklist, setChecklist] = useState(day12Data.checklist);
  const [githubUrl, setGithubUrl] = useState("");
  const [githubCommit, setGithubCommit] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  // Determine which data to use
  const isCompletedDay = dayId >= 1 && dayId <= 11;
  const isCurrentDay = dayId === 12;
  const completedData = isCompletedDay ? completedDaysData.find(d => d.day === dayId) : null;

  const handleToggleCheck = (id: string) => {
    setChecklist(prev => 
      prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    );
  };

  const allChecked = checklist.every(item => item.checked);
  const githubReady = githubUrl.length > 10 && githubCommit.length > 5;
  const linkedinReady = linkedinUrl.length > 10;
  const canComplete = allChecked && githubReady && linkedinReady;

  const handleComplete = () => {
    if (canComplete) {
      setIsCompleted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!isCompletedDay && !isCurrentDay) {
    return (
      <div className="container" style={{ justifyContent: "center", alignItems: "center", padding: "60px 0" }}>
        <h2>Day {dayId} is not available.</h2>
        <Link href="/dashboard" style={{ marginTop: "24px" }}>
          <Button variant="secondary">Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  // ACTIVE SUBMISSION VIEW (DAY 12)
  if (isCurrentDay) {
    if (isCompleted) {
      return (
        <div className="container" style={{ justifyContent: "center", alignItems: "center" }}>
          <div className={styles.completionSection}>
            <CheckCircle2 size={64} color="var(--brand-success)" />
            <div className={styles.completionMessage}>
              <strong>✓ DAY 12 COMPLETE</strong>
              You shipped today.<br />
              Come back tomorrow.
            </div>
            <Link href="/dashboard" style={{ marginTop: "24px" }}>
              <Button variant="secondary">Return to Dashboard</Button>
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <header className={styles.header}>
          <Link href="/dashboard" className={styles.backLink}>
            <ArrowLeft size={16} />
            Challenge
          </Link>
          <div className={styles.dayInfo}>
            <div className={styles.dayLabel}>DAY {day12Data.dayNumber} OF {challengeData.totalDays}</div>
            <div className={styles.progressText}>{Math.round((studentData.progress / challengeData.totalDays) * 100)}% complete</div>
          </div>
        </header>

        <main style={{ paddingBottom: "60px" }}>
          <section className={styles.titleSection}>
            <div className={styles.sectionLabel}>Today&apos;s Build</div>
            <h1 className={styles.taskTitle}>{day12Data.title}</h1>
            <p className={styles.description}>{day12Data.description}</p>

            <div className={styles.metaGrid}>
              <div>
                <div className={styles.metaLabel}>Estimated time</div>
                <div className={styles.timeEstimate}>
                  <Clock size={16} />
                  {day12Data.estimatedTime}
                </div>
              </div>
              <div>
                <div className={styles.metaLabel}>Skills</div>
                <div className={styles.skillsList}>
                  {day12Data.skills.map(skill => (
                    <Badge key={skill}>{skill}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className={styles.cardSection}>
            <h2 className={styles.cardSectionTitle}>Definition of Done</h2>
            <div className={styles.checklist}>
              {checklist.map(item => (
                <div 
                  key={item.id} 
                  className={`${styles.checklistItem} ${item.checked ? styles.checked : ''}`}
                  onClick={() => handleToggleCheck(item.id)}
                >
                  <Checkbox checked={item.checked} readOnly />
                  <span className={styles.checklistLabel}>{item.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.cardSection}>
            <h2 className={styles.cardSectionTitle}>Proof of Work</h2>
            
            <Card style={{ marginBottom: "16px" }}>
              <h3 style={{ fontSize: "15px", fontWeight: 600, marginBottom: "16px" }}>GitHub Proof</h3>
              <div className={styles.proofForm}>
                <div className={styles.proofInputGroup}>
                  <label className={styles.proofInputLabel}>Repository URL</label>
                  <Input 
                    placeholder="https://github.com/username/repo" 
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                  />
                </div>
                <div className={styles.proofInputGroup}>
                  <label className={styles.proofInputLabel}>Commit SHA / Message</label>
                  <Input 
                    placeholder="e.g. 3a7b9c2 or 'feat: add hero'" 
                    value={githubCommit}
                    onChange={(e) => setGithubCommit(e.target.value)}
                  />
                </div>
                <div className={`${styles.proofStatus} ${githubReady ? styles.verified : ''}`}>
                  {githubReady ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                  {githubReady ? "✓ Repository connected" : "○ Waiting for repository"}
                </div>
              </div>
            </Card>

            <Card>
              <h3 style={{ fontSize: "15px", fontWeight: 600, marginBottom: "16px" }}>LinkedIn Proof</h3>
              <div className={styles.proofForm}>
                <div className={styles.proofInputGroup}>
                  <label className={styles.proofInputLabel}>Post URL</label>
                  <Input 
                    placeholder="https://linkedin.com/posts/..." 
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                  />
                </div>
                <div className={`${styles.proofStatus} ${linkedinReady ? styles.verified : ''}`}>
                  {linkedinReady ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                  {linkedinReady ? "✓ Post submitted" : "○ Waiting for post"}
                </div>
              </div>
            </Card>
          </section>

          <section>
            <Button 
              style={{ width: "100%", padding: "16px", fontSize: "16px" }}
              disabled={!canComplete}
              onClick={handleComplete}
            >
              {canComplete ? `Complete Day ${day12Data.dayNumber}` : "Finish requirements to complete"}
            </Button>
          </section>
        </main>
      </div>
    );
  }

  // COMPLETED DAY VIEW (DAYS 1-11)
  if (completedData) {
    return (
      <div className="container">
        <header className={styles.header}>
          <Link href="/dashboard" className={styles.backLink}>
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
          <div className={styles.dayInfo}>
            <div className={styles.dayLabel}>DAY {completedData.day}</div>
            <div className={styles.progressTextCompleted}>{completedData.completionDate}</div>
          </div>
        </header>

        <main style={{ paddingBottom: "60px" }}>
          <section className={styles.titleSection}>
            <h1 className={styles.taskTitle}>{completedData.title}</h1>
            <p className={styles.description}>{completedData.subtitle}</p>

            <div className={styles.metaRow}>
              <Badge variant="success" className={styles.completedBadge}>
                <CheckCircle2 size={14} /> Completed / On Time
              </Badge>
              <div className={styles.timeEstimate}>
                <Clock size={16} />
                {completedData.estimatedTime}
              </div>
              <div className={styles.difficultyBadge}>
                {completedData.difficulty}
              </div>
            </div>
          </section>

          <section className={styles.journalSection}>
            <h2 className={styles.sectionHeader}>What I learned</h2>
            <div className={styles.journalTextBox}>
              <p>{completedData.whatILearned}</p>
            </div>
          </section>

          <section className={styles.journalSection}>
            <h2 className={styles.sectionHeader}>Learning Objectives</h2>
            <ul className={styles.objectivesList}>
              {completedData.learningObjectives.map((obj, i) => (
                <li key={i}>
                  <CheckSquare size={16} className={styles.objectiveIcon} />
                  {obj}
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.journalSection}>
            <h2 className={styles.sectionHeader}>Resources & Tags</h2>
            <div className={styles.resourcesGrid}>
              <div className={styles.resourcesList}>
                {completedData.resources.map((res, i) => (
                  <div key={i} className={styles.resourceItem}>
                    <ExternalLink size={14} />
                    {res}
                  </div>
                ))}
              </div>
              <div className={styles.skillsList}>
                {completedData.tags.map(tag => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.journalSection}>
            <h2 className={styles.sectionHeader}>Your Proof</h2>
            <div className={styles.proofGrid}>
              <a href={completedData.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.proofCardLink}>
                <GitCommit size={20} className={styles.proofIcon} />
                <div>
                  <div className={styles.proofCardTitle}>GitHub Repository</div>
                  <div className={styles.proofCardDesc}>View commit history</div>
                </div>
                <ArrowLeft size={16} className={styles.proofArrow} style={{ transform: "rotate(135deg)" }} />
              </a>

              <a href={completedData.linkedinUrl} target="_blank" rel="noopener noreferrer" className={styles.proofCardLink}>
                <Briefcase size={20} className={styles.proofIcon} style={{ color: "#0A66C2" }} />
                <div>
                  <div className={styles.proofCardTitle}>LinkedIn Post</div>
                  <div className={styles.proofCardDesc}>View public commitment</div>
                </div>
                <ArrowLeft size={16} className={styles.proofArrow} style={{ transform: "rotate(135deg)" }} />
              </a>
            </div>
          </section>

          <div className={styles.completedBanner}>
            <CheckCircle2 size={24} className={styles.completedBannerIcon} />
            <div className={styles.completedBannerText}>
              <strong>Completed</strong>
              <span>This challenge was completed and submitted.</span>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return null;
}
