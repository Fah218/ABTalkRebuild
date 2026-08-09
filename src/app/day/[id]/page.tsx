/* eslint-disable */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock, CheckCircle2, Circle, CheckSquare, GitCommit, Briefcase, ExternalLink, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import styles from "./page.module.css";

import challengeData from "@/data/challenge.json";
import studentData from "@/data/student.json";
import { getDayById } from "@/lib/dayResolver";

export default function DayPage() {
  const params = useParams();
  const dayId = parseInt(params?.id as string, 10);
  
  const [forceCatchup, setForceCatchup] = useState(false);

  const initialDayData = getDayById(dayId);
  
  // States
  const [checklist, setChecklist] = useState<{id: string, label: string, checked: boolean}[]>([]);
  const [githubUrl, setGithubUrl] = useState("");
  const [githubCommit, setGithubCommit] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (initialDayData && (initialDayData.status === "today" || initialDayData.status === "catchup" || forceCatchup)) {
      if (initialDayData.checklist) {
        setChecklist(initialDayData.checklist);
      } else {
        setChecklist([
          { id: '1', label: 'Complete learning objectives', checked: false },
          { id: 'github', label: 'GitHub repository updated', checked: false },
          { id: 'linkedin', label: 'LinkedIn post published', checked: false }
        ]);
      }
    }
  }, [initialDayData, forceCatchup]);

  const handleToggleCheck = (id: string) => {
    setChecklist(prev => 
      prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    );
  };

  const allChecked = checklist.length > 0 && checklist.every(item => item.checked);
  const githubReady = githubUrl.length > 10 && (githubCommit.length > 5 || initialDayData?.status === "catchup"); // commit might not be required if we simplified
  const linkedinReady = linkedinUrl.length > 10;
  const canComplete = allChecked && githubReady && linkedinReady;

  const handleComplete = () => {
    if (canComplete) {
      setIsCompleted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!initialDayData) {
    return (
      <div className="container" style={{ justifyContent: "center", alignItems: "center", padding: "60px 0" }}>
        <h2>Day is not available.</h2>
        <Link href="/dashboard" style={{ marginTop: "24px" }}>
          <Button variant="secondary">Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const { status } = initialDayData;
  const isUpcoming = status === "upcoming";
  const isToday = status === "today";
  const isCatchup = status === "catchup" || forceCatchup;
  const isMissed = status === "missed" && !forceCatchup;
  const isCompletedPast = status === "completed";

  if (isUpcoming) {
    return (
      <div className="container" style={{ justifyContent: "center", alignItems: "center", padding: "60px 0" }}>
        <h2>Day {dayId} is locked.</h2>
        <p style={{ marginTop: "12px", color: "var(--text-muted)" }}>This task will unlock when it becomes available.</p>
        <Link href="/dashboard" style={{ marginTop: "24px" }}>
          <Button variant="secondary">Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  // ACTIVE SUBMISSION VIEW (CURRENT OR CATCHUP)
  if (isToday || isCatchup) {
    if (isCompleted) {
      return (
        <div className="container" style={{ justifyContent: "center", alignItems: "center" }}>
          <div className={styles.completionSection}>
            <CheckCircle2 size={64} color="var(--brand-success)" />
            <div className={styles.completionMessage}>
              <strong>✓ DAY {dayId} COMPLETE</strong>
              You shipped {isCatchup ? "and caught up" : "today"}.<br />
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
            <div className={styles.dayLabel}>DAY {dayId} OF {challengeData.totalDays}</div>
            <div className={styles.progressText}>{Math.round((studentData.progress / challengeData.totalDays) * 100)}% complete</div>
          </div>
        </header>

        <main style={{ paddingBottom: "60px" }}>
          <section className={styles.titleSection}>
            <div className={styles.sectionLabel}>{isCatchup ? "Catch Up" : "Today's Build"}</div>
            <h1 className={styles.taskTitle}>{initialDayData.title}</h1>
            <p className={styles.description}>{initialDayData.description}</p>

            <div className={styles.metaGrid}>
              <div>
                <div className={styles.metaLabel}>Estimated time</div>
                <div className={styles.timeEstimate}>
                  <Clock size={16} />
                  {initialDayData.estimatedTime}
                </div>
              </div>
              <div>
                <div className={styles.metaLabel}>{isCatchup ? "Difficulty" : "Skills"}</div>
                <div className={styles.skillsList}>
                  {initialDayData.tags?.map((tag: string) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                  {initialDayData.difficulty && (
                    <Badge>{initialDayData.difficulty}</Badge>
                  )}
                </div>
              </div>
            </div>
          </section>

          {(initialDayData.whatILearned || initialDayData.learningObjectives) && isCatchup && (
            <>
              {initialDayData.whatILearned && (
                <section className={styles.cardSection}>
                  <h2 className={styles.cardSectionTitle}>What you&apos;ll learn</h2>
                  <div className={styles.journalTextBox}>
                    <p>{initialDayData.whatILearned}</p>
                  </div>
                </section>
              )}
              {initialDayData.learningObjectives && (
                <section className={styles.cardSection}>
                  <h2 className={styles.cardSectionTitle}>Learning Objectives</h2>
                  <ul className={styles.objectivesList}>
                    {initialDayData.learningObjectives.map((obj: string, i: number) => (
                      <li key={i}>
                        <CheckSquare size={16} className={styles.objectiveIcon} />
                        {obj}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {initialDayData.resources && (
                 <section className={styles.cardSection}>
                  <h2 className={styles.cardSectionTitle}>Resources & Tags</h2>
                  <div className={styles.resourcesGrid}>
                    <div className={styles.resourcesList}>
                      {initialDayData.resources.map((res: string, i: number) => (
                        <div key={i} className={styles.resourceItem}>
                          <ExternalLink size={14} />
                          {res}
                        </div>
                      ))}
                    </div>
                    <div className={styles.skillsList}>
                      {initialDayData.tags?.map((tag: string) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  </div>
                 </section>
              )}
            </>
          )}

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
              {canComplete ? (isCatchup ? `Catch Up & Submit` : `Complete Day ${dayId}`) : "Finish requirements to complete"}
            </Button>
          </section>
        </main>
      </div>
    );
  }

  // COMPLETED OR MISSED VIEW (DAYS 1-11)
  if (isCompletedPast || isMissed) {
    return (
      <div className="container">
        <header className={styles.header}>
          <Link href="/dashboard" className={styles.backLink}>
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
          <div className={styles.dayInfo}>
            <div className={styles.dayLabel}>DAY {initialDayData.id}</div>
            <div className={styles.progressTextCompleted}>
              {isMissed ? "Missed" : initialDayData.completionDate}
            </div>
          </div>
        </header>

        <main style={{ paddingBottom: "60px" }}>
          <section className={styles.titleSection}>
            <h1 className={styles.taskTitle}>{initialDayData.title}</h1>
            <p className={styles.description}>{initialDayData.description}</p>

            <div className={styles.metaRow}>
              {isMissed ? (
                <Badge className={styles.missedBadge} style={{ backgroundColor: 'var(--brand-danger)', color: 'white' }}>
                  <AlertCircle size={14} /> Missed
                </Badge>
              ) : (
                <Badge variant="success" className={styles.completedBadge}>
                  <CheckCircle2 size={14} /> Completed / On Time
                </Badge>
              )}
              <div className={styles.timeEstimate}>
                <Clock size={16} />
                {initialDayData.estimatedTime}
              </div>
              <div className={styles.difficultyBadge}>
                {initialDayData.difficulty}
              </div>
            </div>
          </section>

          <section className={styles.journalSection}>
            <h2 className={styles.sectionHeader}>{isMissed ? "What you were expected to learn" : "What I learned"}</h2>
            <div className={styles.journalTextBox}>
              <p>{initialDayData.whatILearned}</p>
            </div>
          </section>

          <section className={styles.journalSection}>
            <h2 className={styles.sectionHeader}>Learning Objectives</h2>
            <ul className={styles.objectivesList}>
              {initialDayData.learningObjectives?.map((obj: string, i: number) => (
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
                {initialDayData.resources?.map((res: string, i: number) => (
                  <div key={i} className={styles.resourceItem}>
                    <ExternalLink size={14} />
                    {res}
                  </div>
                ))}
              </div>
              <div className={styles.skillsList}>
                {initialDayData.tags?.map((tag: string) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </div>
          </section>

          <section className={styles.journalSection}>
            <h2 className={styles.sectionHeader}>{isMissed ? "Proof of Work" : "Your Proof"}</h2>
            <div className={styles.proofGrid}>
              {isMissed ? (
                <>
                  <div className={styles.proofCardLink} style={{ cursor: "default" }}>
                    <GitCommit size={20} className={styles.proofIcon} color="var(--text-muted)" />
                    <div>
                      <div className={styles.proofCardTitle}>GitHub Repository</div>
                      <div className={styles.proofCardDesc}>Not submitted</div>
                    </div>
                  </div>
                  <div className={styles.proofCardLink} style={{ cursor: "default" }}>
                    <Briefcase size={20} className={styles.proofIcon} color="var(--text-muted)" />
                    <div>
                      <div className={styles.proofCardTitle}>LinkedIn Post</div>
                      <div className={styles.proofCardDesc}>Not submitted</div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <a href={initialDayData.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.proofCardLink}>
                    <GitCommit size={20} className={styles.proofIcon} />
                    <div>
                      <div className={styles.proofCardTitle}>GitHub Repository</div>
                      <div className={styles.proofCardDesc}>View commit history</div>
                    </div>
                    <ArrowLeft size={16} className={styles.proofArrow} style={{ transform: "rotate(135deg)" }} />
                  </a>

                  <a href={initialDayData.linkedinUrl} target="_blank" rel="noopener noreferrer" className={styles.proofCardLink}>
                    <Briefcase size={20} className={styles.proofIcon} style={{ color: "#0A66C2" }} />
                    <div>
                      <div className={styles.proofCardTitle}>LinkedIn Post</div>
                      <div className={styles.proofCardDesc}>View public commitment</div>
                    </div>
                    <ArrowLeft size={16} className={styles.proofArrow} style={{ transform: "rotate(135deg)" }} />
                  </a>
                </>
              )}
            </div>
          </section>

          {isMissed ? (
            <div className={styles.completedBanner} style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
              <AlertCircle size={24} className={styles.completedBannerIcon} style={{ color: 'var(--brand-danger)' }} />
              <div className={styles.completedBannerText}>
                <strong>Missed</strong>
                <span>This day was missed, but your overall progress is still intact.</span>
              </div>
            </div>
          ) : (
            <div className={styles.completedBanner}>
              <CheckCircle2 size={24} className={styles.completedBannerIcon} />
              <div className={styles.completedBannerText}>
                <strong>Completed</strong>
                <span>This challenge was completed and submitted.</span>
              </div>
            </div>
          )}
          
          {isMissed && (
             <section style={{ marginTop: '24px' }}>
                <Button 
                  style={{ width: "100%", padding: "16px", fontSize: "16px" }}
                  onClick={() => setForceCatchup(true)}
                >
                  Catch Up
                </Button>
             </section>
          )}
        </main>
      </div>
    );
  }

  return null;
}
