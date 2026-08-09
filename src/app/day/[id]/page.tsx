/* eslint-disable */
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock, CheckCircle2, Circle, CheckSquare, GitCommit, Briefcase, ExternalLink, AlertCircle, ChevronDown, MonitorPlay, Wrench, FileText, Share2, Target } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import styles from "./page.module.css";

import challengeData from "@/data/challenge.json";
import studentData from "@/data/student.json";
import { getDayById } from "@/lib/dayResolver";
import { Header } from "@/components/shared/Header";

export default function DayPage() {
  const params = useParams();
  const dayId = parseInt(params?.id as string, 10);
  
  const initialDayData = getDayById(dayId);
  const status = initialDayData?.status;
  const isUpcoming = status === "upcoming";
  const isToday = status === "today";
  const isCatchup = status === "catchup";
  const isMissed = status === "missed";
  const isCompletedPast = status === "completed";

  // States
  const [checklist, setChecklist] = useState<{id: string, label: string, checked: boolean}[]>(() => {
    if (initialDayData && (initialDayData.status === "today" || initialDayData.status === "catchup")) {
      return initialDayData.checklist || [
        { id: '1', label: 'Complete today\'s build objectives', checked: false }
      ];
    }
    return [];
  });
  const [githubUrl, setGithubUrl] = useState("");
  const [githubCommit, setGithubCommit] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [whatILearnedInput, setWhatILearnedInput] = useState("");
  const [reflectionSaved, setReflectionSaved] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("task");
  const [isCompleted, setIsCompleted] = useState(false);

  const handleToggleCheck = (id: string) => {
    setChecklist(prev => 
      prev.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    );
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(prev => prev === id ? null : id);
  };

  const allChecked = checklist.length > 0 && checklist.every(item => item.checked);
  const githubReady = githubUrl.length > 10 && (githubCommit.length > 5 || initialDayData?.status === "catchup");
  const linkedinReady = linkedinUrl.length > 10;
  const canComplete = allChecked && githubReady && linkedinReady && isConfirmed;

  let missingRequirements = [];
  if (!allChecked) missingRequirements.push("Definition of Done");
  if (!githubReady) missingRequirements.push("GitHub Proof");
  if (!linkedinReady) missingRequirements.push("LinkedIn Proof");
  if (!isConfirmed) missingRequirements.push("Confirmation");

  const submitText = canComplete 
    ? (isCatchup ? `Catch Up & Submit` : `Submit Day ${dayId}`) 
    : `Missing: ${missingRequirements.join(", ")}`;

  const handleComplete = () => {
    if (canComplete) {
      setIsCompleted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (!initialDayData) {
    return (
      <>
        <Header />
        <div className="container" style={{ display: "flex", flexDirection: "column", minHeight: "100vh", justifyContent: "center", alignItems: "center", padding: "60px 0" }}>
          <h2 className="font-heading">Day is not available.</h2>
          <Link href="/dashboard" style={{ marginTop: "24px" }}>
            <Button variant="secondary">Return to Dashboard</Button>
          </Link>
        </div>
      </>
    );
  }
  if (isUpcoming) {
    return (
      <>
        <Header />
        <div className="container" style={{ display: "flex", flexDirection: "column", minHeight: "100vh", justifyContent: "center", alignItems: "center", padding: "60px 0" }}>
          <h2 className="font-heading">Day {dayId} is locked.</h2>
          <p style={{ marginTop: "12px", color: "var(--text-muted)" }}>This task will unlock when it becomes available.</p>
          <Link href="/dashboard" style={{ marginTop: "24px" }}>
            <Button variant="secondary">Return to Dashboard</Button>
          </Link>
        </div>
      </>
    );
  }

  // ACTIVE SUBMISSION VIEW (CURRENT OR CATCHUP)
  if (isToday || isCatchup) {
    if (isCompleted) {
      return (
        <>
          <Header />
          <div className="container" style={{ display: "flex", flexDirection: "column", minHeight: "100vh", justifyContent: "center", alignItems: "center" }}>
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
        </>
      );
    }

    return (
      <>
        <Header />
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
              <div className={styles.sectionLabel} style={isCatchup ? { color: '#F59E0B', display: 'flex', alignItems: 'center', gap: '6px' } : {}}>
                {isCatchup && <AlertCircle size={14} />} {isCatchup ? "Catch Up" : "Today's Build"}
              </div>
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
              <section className={styles.cardSection}>
                <div className={styles.accordionList}>
                  {initialDayData.whatILearned && (
                    <div className={`${styles.accordionItem} ${openAccordion === 'whatILearned' ? styles.open : ''}`}>
                      <button className={styles.accordionHeader} onClick={() => toggleAccordion('whatILearned')}>
                        <div className={styles.accordionHeaderTitle}>
                          <div className={styles.accordionIconWrapper}><FileText size={16} /></div>
                          What You'll Learn
                        </div>
                        <ChevronDown size={20} className={`${styles.accordionChevron} ${openAccordion === 'whatILearned' ? styles.open : ''}`} />
                      </button>
                      <div className={styles.accordionContent}>
                        {initialDayData.whatILearned}
                      </div>
                    </div>
                  )}

                  {initialDayData.learningObjectives && (
                    <div className={`${styles.accordionItem} ${openAccordion === 'objectives' ? styles.open : ''}`}>
                      <button className={styles.accordionHeader} onClick={() => toggleAccordion('objectives')}>
                        <div className={styles.accordionHeaderTitle}>
                          <div className={styles.accordionIconWrapper}><Target size={16} /></div>
                          Learning Objectives
                        </div>
                        <ChevronDown size={20} className={`${styles.accordionChevron} ${openAccordion === 'objectives' ? styles.open : ''}`} />
                      </button>
                      <div className={styles.accordionContent}>
                        <ul className={styles.objectivesList}>
                          {initialDayData.learningObjectives.map((obj: string, i: number) => (
                            <li key={i} style={{ padding: 0, border: 'none', backgroundColor: 'transparent' }}>
                              <CheckSquare size={16} className={styles.objectiveIcon} />
                              {obj}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {initialDayData.resources && (
                    <div className={`${styles.accordionItem} ${openAccordion === 'resources' ? styles.open : ''}`}>
                      <button className={styles.accordionHeader} onClick={() => toggleAccordion('resources')}>
                        <div className={styles.accordionHeaderTitle}>
                          <div className={styles.accordionIconWrapper}><ExternalLink size={16} /></div>
                          Resources & Tags
                        </div>
                        <ChevronDown size={20} className={`${styles.accordionChevron} ${openAccordion === 'resources' ? styles.open : ''}`} />
                      </button>
                      <div className={styles.accordionContent}>
                        <div className={styles.resourcesList}>
                          {initialDayData.resources.map((res: string, i: number) => (
                            <div key={i} className={styles.resourceItem} style={{ marginBottom: '8px' }}>
                              <ExternalLink size={14} />
                              {res}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {!isCatchup && (
              <section className={styles.cardSection}>
                <div className={styles.accordionList}>
                  <div className={`${styles.accordionItem} ${openAccordion === 'tutorial' ? styles.open : ''}`}>
                    <button className={styles.accordionHeader} onClick={() => toggleAccordion('tutorial')}>
                      <div className={styles.accordionHeaderTitle}>
                        <div className={styles.accordionIconWrapper}><MonitorPlay size={16} /></div>
                        Tutorial Video
                      </div>
                      <ChevronDown size={20} className={`${styles.accordionChevron} ${openAccordion === 'tutorial' ? styles.open : ''}`} />
                    </button>
                    <div className={styles.accordionContent}>
                      {initialDayData.tutorialVideo ? (
                        <>
                          <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)', marginBottom: '16px' }}>
                            <iframe 
                              width="100%" 
                              height="100%" 
                              src={`https://www.youtube.com/embed/${initialDayData.tutorialVideo.youtubeId}`} 
                              title={initialDayData.tutorialVideo.title} 
                              frameBorder="0" 
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                              allowFullScreen
                              style={{ display: 'block' }}
                            ></iframe>
                          </div>
                          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px', fontFamily: 'var(--font-syne), sans-serif' }}>
                            {initialDayData.tutorialVideo.title}
                          </h3>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--brand-primary)', marginBottom: '12px' }}>
                            {initialDayData.tutorialVideo.channel}
                          </div>
                          <p style={{ marginBottom: '16px', color: 'var(--text-muted)' }}>
                            {initialDayData.tutorialVideo.description}
                          </p>
                          <a 
                            href={initialDayData.tutorialVideo.youtubeUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 16px', backgroundColor: 'var(--bg-surface-muted)', borderRadius: 'var(--radius-full)', fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', textDecoration: 'none', border: '1px solid var(--border-color)', transition: 'background-color 0.2s' }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--border-color)'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-surface-muted)'}
                          >
                            <MonitorPlay size={14} /> Watch on YouTube ↗
                          </a>
                        </>
                      ) : (
                        <>
                          <div style={{ backgroundColor: 'var(--bg-surface-muted)', width: '100%', aspectRatio: '16/9', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '16px' }}>
                            <MonitorPlay size={48} color="var(--text-muted)" opacity={0.5} />
                            <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-muted)' }}>Tutorial coming soon</span>
                          </div>
                          Watch the walkthrough before you build. This covers the main concepts needed to complete today's task.
                        </>
                      )}
                    </div>
                  </div>

                  <div className={`${styles.accordionItem} ${openAccordion === 'tool' ? styles.open : ''}`}>
                    <button className={styles.accordionHeader} onClick={() => toggleAccordion('tool')}>
                      <div className={styles.accordionHeaderTitle}>
                        <div className={styles.accordionIconWrapper}><Wrench size={16} /></div>
                        Tool of the Day: VS Code
                      </div>
                      <ChevronDown size={20} className={`${styles.accordionChevron} ${openAccordion === 'tool' ? styles.open : ''}`} />
                    </button>
                    <div className={styles.accordionContent}>
                      Today we are going to rely heavily on VS Code. Ensure you have the necessary extensions installed, such as ESLint and Prettier, to keep your code clean and standardized.
                    </div>
                  </div>

                  <div className={`${styles.accordionItem} ${openAccordion === 'task' ? styles.open : ''}`}>
                    <button className={styles.accordionHeader} onClick={() => toggleAccordion('task')}>
                      <div className={styles.accordionHeaderTitle}>
                        <div className={styles.accordionIconWrapper}><FileText size={16} /></div>
                        Your Task
                      </div>
                      <ChevronDown size={20} className={`${styles.accordionChevron} ${openAccordion === 'task' ? styles.open : ''}`} />
                    </button>
                    <div className={styles.accordionContent}>
                      {initialDayData.objective || "Follow the instructions to complete today's build challenge."}
                    </div>
                  </div>

                  <div className={`${styles.accordionItem} ${openAccordion === 'learn' ? styles.open : ''}`}>
                    <button className={styles.accordionHeader} onClick={() => toggleAccordion('learn')}>
                      <div className={styles.accordionHeaderTitle}>
                        <div className={styles.accordionIconWrapper}><Target size={16} /></div>
                        What You'll Learn
                      </div>
                      <ChevronDown size={20} className={`${styles.accordionChevron} ${openAccordion === 'learn' ? styles.open : ''}`} />
                    </button>
                    <div className={styles.accordionContent}>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><CheckSquare size={14} color="var(--brand-primary)" style={{ marginTop: '3px' }}/> Applying responsive design principles</li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><CheckSquare size={14} color="var(--brand-primary)" style={{ marginTop: '3px' }}/> Structuring semantic HTML</li>
                        <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}><CheckSquare size={14} color="var(--brand-primary)" style={{ marginTop: '3px' }}/> Showcasing projects professionally</li>
                      </ul>
                    </div>
                  </div>

                  <div className={`${styles.accordionItem} ${openAccordion === 'linkedin' ? styles.open : ''}`}>
                    <button className={styles.accordionHeader} onClick={() => toggleAccordion('linkedin')}>
                      <div className={styles.accordionHeaderTitle}>
                        <div className={styles.accordionIconWrapper}><Share2 size={16} /></div>
                        LinkedIn Post Guidelines
                      </div>
                      <ChevronDown size={20} className={`${styles.accordionChevron} ${openAccordion === 'linkedin' ? styles.open : ''}`} />
                    </button>
                    <div className={styles.accordionContent}>
                      Share a screenshot of your new portfolio. Mention one challenge you overcame while building it, and tag #ABTalks. Include a link to the live version if you have deployed it!
                    </div>
                  </div>
                </div>
              </section>
            )}

            <section className={styles.cardSection}>
              <h2 className={styles.cardSectionTitle}>Definition of Done</h2>
              <div className={styles.checklist}>
                {checklist.map(item => (
                  <label 
                    key={item.id} 
                    className={`${styles.checklistItem} ${item.checked ? styles.checked : ''}`}
                  >
                    <Checkbox 
                      checked={item.checked} 
                      onChange={() => handleToggleCheck(item.id)} 
                    />
                    <span className={styles.checklistLabel}>{item.label}</span>
                  </label>
                ))}
              </div>
            </section>

            <section className={styles.cardSection}>
              <div className={styles.reflectionArea}>
                <label className={styles.reflectionLabel}>
                  What did you learn?
                  <span className={styles.optionalTag}>Optional</span>
                </label>
                {!reflectionSaved ? (
                  <>
                    <textarea 
                      className={styles.reflectionTextarea}
                      placeholder="Briefly describe what you learned or what you improved while completing today's build..."
                      value={whatILearnedInput}
                      onChange={(e) => setWhatILearnedInput(e.target.value)}
                    />
                    {whatILearnedInput.trim().length > 0 && (
                      <Button variant="secondary" onClick={() => setReflectionSaved(true)} style={{ marginTop: '12px', padding: '8px 12px', fontSize: '13px' }}>
                        Save reflection
                      </Button>
                    )}
                  </>
                ) : (
                  <div style={{ backgroundColor: 'rgba(var(--brand-success-rgb), 0.05)', border: '1px solid rgba(var(--brand-success-rgb), 0.3)', padding: '16px', borderRadius: 'var(--radius-md)', color: 'var(--text-main)', fontSize: '14px', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '16px', right: '16px', color: 'var(--brand-success)' }}>
                      <CheckCircle2 size={16} />
                    </div>
                    <p style={{ margin: 0, paddingRight: '24px' }}>{whatILearnedInput}</p>
                    <div style={{ marginTop: '12px' }}>
                      <button onClick={() => setReflectionSaved(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontSize: '12px', color: 'var(--text-muted)' }}>
                        Edit reflection
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>

            <section className={styles.cardSection}>
              <div className={styles.unifiedProofCard}>
                <div className={styles.proofSection}>
                  <div className={styles.proofSectionHeader}>
                    <GitCommit size={20} />
                    GitHub Proof
                  </div>
                  <div className={styles.proofSectionDesc}>Submit your source code repository link and the exact commit SHA for today's work.</div>
                  
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
                    <div className={`${styles.proofStatusNeutral} ${githubReady ? styles.verified : ''}`}>
                      {githubReady ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                      {githubReady ? "Repository proof ready" : (githubUrl.length > 10 ? "Repository link added" : "Repository not connected yet")}
                    </div>
                  </div>
                </div>

                <div className={styles.proofDivider} />

                <div className={styles.proofSection}>
                  <div className={styles.proofSectionHeader}>
                    <Briefcase size={20} />
                    LinkedIn Proof
                  </div>
                  <div className={styles.proofSectionDesc}>Share your build in public. Paste the direct URL to your LinkedIn post.</div>
                  
                  <div className={styles.proofForm}>
                    <div className={styles.proofInputGroup}>
                      <label className={styles.proofInputLabel}>Post URL</label>
                      <Input 
                        placeholder="https://linkedin.com/posts/..." 
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                      />
                    </div>
                    <div className={`${styles.proofStatusNeutral} ${linkedinReady ? styles.verified : ''}`}>
                      {linkedinReady ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                      {linkedinReady ? "LinkedIn post added" : "Post not connected yet"}
                    </div>
                  </div>
                </div>

                <div className={styles.proofDivider} />

                <label 
                  className={`${styles.confirmBox} ${isConfirmed ? styles.checked : ''}`}
                >
                  <Checkbox 
                    checked={isConfirmed} 
                    onChange={() => setIsConfirmed(!isConfirmed)} 
                    style={{ marginTop: '2px' }} 
                  />
                  <div className={styles.confirmLabel}>I confirm that I have completed today's build.</div>
                </label>

                <div className={styles.submitAction}>
                  <button 
                    className={styles.btnSubmit}
                    disabled={!canComplete}
                    onClick={handleComplete}
                  >
                    {submitText}
                  </button>
                </div>
              </div>
            </section>
          </main>
        </div>
      </>
    );
  }

  // COMPLETED OR MISSED VIEW (DAYS 1-11)
  if (isCompletedPast || isMissed) {
    return (
      <>
        <Header />
        <div className="container">
          <header className={styles.header}>
            <Link href="/dashboard" className={styles.backLink}>
              <ArrowLeft size={16} />
              Back to Dashboard
            </Link>
            <div className={styles.dayInfo}>
              <div className={styles.dayLabel}>DAY {initialDayData.id}</div>
              <div className={styles.progressTextCompleted} style={isMissed ? { color: 'var(--brand-danger)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' } : {}}>
                {isMissed ? (
                  <>MISSED <AlertCircle size={14} /></>
                ) : (
                  initialDayData.completionDate
                )}
              </div>
            </div>
          </header>

          <main style={{ paddingBottom: "60px" }}>
            <section className={styles.titleSection}>
              <h1 className={styles.taskTitle}>{initialDayData.title}</h1>
              {isMissed && <p className={styles.description}>{initialDayData.description}</p>}

              <div className={styles.metaRow}>
                {isMissed ? (
                  <Badge className={styles.missedBadge} style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)', color: 'var(--brand-danger)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
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

            {isCompletedPast && (
              <section className={styles.journalSection} style={{ marginTop: "8px", marginBottom: "32px" }}>
                <h2 className={styles.sectionHeader}>Build Record</h2>
                <div style={{ display: "flex", gap: "24px", color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><CheckCircle2 size={16} color="var(--brand-success)" /> <strong>Completed:</strong> {initialDayData.completionDate}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><Clock size={16} /> <strong>Duration:</strong> {initialDayData.estimatedTime}</div>
                </div>
              </section>
            )}

            {isCompletedPast && (
              <section className={styles.journalSection}>
                <h2 className={styles.sectionHeader}>What I Built</h2>
                <div className={styles.journalTextBox} style={{ fontSize: "1.1rem", lineHeight: 1.6, color: "var(--text-primary)" }}>
                  <p>{initialDayData.description}</p>
                </div>
              </section>
            )}

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
              <h2 className={styles.sectionHeader}>Proof of Work</h2>
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
                        <div className={styles.proofCardDesc}>View Repository ↗</div>
                      </div>
                      <ArrowLeft size={16} className={styles.proofArrow} style={{ transform: "rotate(135deg)" }} />
                    </a>

                    <a href={initialDayData.linkedinUrl} target="_blank" rel="noopener noreferrer" className={styles.proofCardLink}>
                      <Briefcase size={20} className={styles.proofIcon} style={{ color: "#0A66C2" }} />
                      <div>
                        <div className={styles.proofCardTitle}>LinkedIn Post</div>
                        <div className={styles.proofCardDesc}>View LinkedIn Post ↗</div>
                      </div>
                      <ArrowLeft size={16} className={styles.proofArrow} style={{ transform: "rotate(135deg)" }} />
                    </a>
                  </>
                )}
              </div>
            </section>

            {isCompletedPast && (
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "48px", paddingTop: "24px", borderTop: "1px solid var(--border-color)" }}>
                {dayId > 1 ? (
                  <Link href={`/day/${dayId - 1}`}>
                    <Button variant="secondary">← Previous Day</Button>
                  </Link>
                ) : <div />}
                {dayId < challengeData.totalDays ? (
                  <Link href={`/day/${dayId + 1}`}>
                    <Button variant="secondary">Next Day →</Button>
                  </Link>
                ) : <div />}
              </div>
            )}

            {isMissed && (
              <section className={styles.journalSection}>
                <h2 className={styles.sectionHeader}>Portfolio Record</h2>
                <Card style={{ padding: '24px', textAlign: 'center', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
                  <p style={{ color: 'var(--text-muted)', margin: 0 }}>No public proof recorded</p>
                </Card>
              </section>
            )}

            {isMissed ? (
              <div className={styles.completedBanner} style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.2)', flexDirection: 'column', alignItems: 'flex-start', gap: '24px', padding: '24px' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <AlertCircle size={24} className={styles.completedBannerIcon} style={{ color: 'var(--brand-danger)' }} />
                  <div className={styles.completedBannerText}>
                    <strong style={{ color: 'var(--brand-danger)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>MISSED DAY</strong>
                    <span style={{ color: 'var(--text-secondary)' }}>This day cannot be recovered, but it remains part of your 60-day journey.</span>
                  </div>
                </div>
                <Link href="/dashboard" style={{ width: '100%' }}>
                  <Button style={{ width: "100%", padding: "16px", fontSize: "16px", backgroundColor: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
                    Back to Dashboard &rarr;
                  </Button>
                </Link>
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

          </main>
        </div>
      </>
    );
  }

  return null;
}
