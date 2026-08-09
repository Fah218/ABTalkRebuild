/* eslint-disable */
"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Clock, Code2, Briefcase, Trophy, Zap, ArrowRight, Search, CheckCircle2, AlertCircle, Calendar } from "lucide-react";
import { Header } from "@/components/shared/Header";
import styles from "./page.module.css";
import studentData from "@/data/student.json";
import challengeData from "@/data/challenge.json";
import day12Data from "@/data/day12.json";
import { getDayById } from "@/lib/dayResolver";

export default function DashboardPage() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Generate 60 days of history
  const history = useMemo(() => {
    return Array.from({ length: challengeData.totalDays }, (_, i) => {
      const dayNum = i + 1;
      const dayData = getDayById(dayNum);

      let learned = "";
      if (dayData?.status === "completed") {
        learned = `Successfully learned and applied concepts for day ${dayNum}. Built something cool and shared it.`;
      }

      return {
        day: dayNum,
        status: dayData?.status || "upcoming",
        title: dayData?.title || `Build task for Day ${dayNum}`,
        learned,
        timeSpent: dayData?.estimatedTime || "-",
      };
    });
  }, []);

  const selectedDayData = selectedDay ? history.find(d => d.day === selectedDay) : null;
  const recentBuilds = history.filter(d => d.status === "completed").reverse().slice(0, 3);

  const searchedBuilds = searchQuery 
    ? history.filter(d => ["completed", "today", "missed", "catchup"].includes(d.status) && d.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : recentBuilds;

  const renderJournalContent = () => {
    if (!selectedDayData) return null;

    if (selectedDayData.status === "upcoming") {
      return (
        <div className={styles.journalPanel}>
          <div className={styles.journalHeader}>
            <div>
              <h4 className={styles.journalTitle}>Day {selectedDayData.day}</h4>
              <div className={styles.journalMeta}>
                <div className={styles.journalMetaItem}>
                  <Calendar size={14} className={styles.badgeUpcoming} />
                  <span className={styles.badgeUpcoming}>Upcoming</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.journalContent}>
            <div className={styles.journalText}>Keep building today&apos;s task. This day will unlock when it becomes available.</div>
          </div>
          <div className={styles.journalActions}>
            <button className={styles.btnSecondary} onClick={() => setSelectedDay(null)}>Close</button>
          </div>
        </div>
      );
    }

    if (selectedDayData.status === "missed" || selectedDayData.status === "catchup") {
      const isCatchUp = selectedDayData.status === "catchup";
      const statusClass = isCatchUp ? styles.badgeCatchUp : styles.badgeMissed;
      
      return (
        <div className={styles.journalPanel}>
          <div className={styles.journalHeader}>
            <div>
              <h4 className={styles.journalTitle}>Day {selectedDayData.day}: {selectedDayData.title}</h4>
              <div className={styles.journalMeta}>
                <div className={styles.journalMetaItem}>
                  <AlertCircle size={14} className={statusClass} />
                  <span className={statusClass}>{isCatchUp ? "Catch Up Available" : "Missed"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.journalActions}>
            <Link href={`/day/${selectedDayData.day}`} className={styles.btnPrimary}>
              {isCatchUp ? "Catch Up" : "View Task"}
            </Link>
            <button className={styles.btnSecondary} onClick={() => setSelectedDay(null)}>Close</button>
          </div>
        </div>
      );
    }

    if (selectedDayData.status === "today") {
      return (
        <div className={styles.journalPanel}>
          <div className={styles.journalHeader}>
            <div>
              <h4 className={styles.journalTitle}>Day {selectedDayData.day}: {selectedDayData.title}</h4>
              <div className={styles.journalMeta}>
                <div className={styles.journalMetaItem}>
                  <Clock size={14} className={styles.badgeToday} />
                  <span className={styles.badgeToday}>Current / In Progress</span>
                </div>
                <div className={styles.journalMetaItem}>
                  <Clock size={14} />
                  <span>{selectedDayData.timeSpent}</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.journalActions}>
            <Link href={`/day/${selectedDayData.day}`} className={styles.btnPrimary}>
              Continue Today&apos;s Build
            </Link>
            <button className={styles.btnSecondary} onClick={() => setSelectedDay(null)}>Close</button>
          </div>
        </div>
      );
    }

    // Completed Day Flow
    return (
      <div className={styles.journalPanel}>
        <div className={styles.journalHeader}>
          <div>
            <h4 className={styles.journalTitle}>Day {selectedDayData.day}: {selectedDayData.title}</h4>
            <div className={styles.journalMeta}>
              <div className={styles.journalMetaItem}>
                <CheckCircle2 size={14} className={styles.badgeCompleted} />
                <span className={styles.badgeCompleted}>Completed / On Time</span>
              </div>
              <div className={styles.journalMetaItem}>
                <Clock size={14} />
                <span>{selectedDayData.timeSpent}</span>
              </div>
            </div>
          </div>
        </div>

        {selectedDayData.learned && (
          <div className={styles.journalContent}>
            <div className={styles.journalLabel}>What I learned</div>
            <div className={styles.journalText}>{selectedDayData.learned}</div>
          </div>
        )}

        <div className={styles.journalLinks}>
          <div className={styles.journalLink}>
            <Code2 size={16} /> GitHub Proof
          </div>
          <div className={styles.journalLink}>
            <Briefcase size={16} /> LinkedIn Proof
          </div>
        </div>

        <div className={styles.journalActions}>
          <Link href={`/day/${selectedDayData.day}`} className={styles.btnPrimary}>
            View Task
          </Link>
          <button className={styles.btnSecondary} onClick={() => setSelectedDay(null)}>Close</button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="container">
        <header className={`${styles.header} ${styles.animateSection}`}>
        <h1 className={styles.greeting}>Good evening, builder.</h1>
        
        {/* Today's Build Hero */}
        <div className={styles.heroCard}>
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}>Day {studentData.currentDay}</span>
            <h2 className={styles.heroTitle}>{day12Data.title}</h2>
            <div className={styles.heroMeta}>
              <div className={styles.heroMetaItem}>
                <Clock size={16} />
                <span>{day12Data.estimatedTime}</span>
              </div>
              <div className={styles.heroMetaItem}>
                <Code2 size={16} />
                <span>GitHub Proof</span>
              </div>
              <div className={styles.heroMetaItem}>
                <Briefcase size={16} />
                <span>LinkedIn Proof</span>
              </div>
            </div>
          </div>
          <Link href={`/day/${studentData.currentDay}`} className={styles.heroCta}>
            Continue today&apos;s build
            <ArrowRight size={18} />
          </Link>
        </div>
      </header>

      <main className={styles.workspaceGrid}>
        
        {/* Left Column: History & Grid */}
        <div className={styles.mainColumn}>
          
          <section className={styles.animateSection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>60-Day Activity</h3>
              <span className={styles.sectionTitle}>{studentData.progress} / {challengeData.totalDays} Built</span>
            </div>
            
            <div className={styles.gridContainer}>
              <div className={styles.daysGrid}>
                {history.map((day) => {
                  let cellClass = styles.statusUpcoming;
                  if (day.status === "completed") cellClass = styles.statusCompleted;
                  if (day.status === "today") cellClass = styles.statusToday;
                  if (day.status === "missed") cellClass = styles.statusMissed;
                  if (day.status === "catchup") cellClass = styles.statusCatchUp;

                  const isSelected = selectedDay === day.day;

                  return (
                    <div 
                      key={day.day} 
                      className={`${styles.dayCell} ${cellClass} ${isSelected ? styles.selected : ''}`}
                      onClick={() => setSelectedDay(isSelected ? null : day.day)}
                      title={`Day ${day.day}: ${day.title}`}
                    >
                      {day.day}
                    </div>
                  );
                })}
              </div>

              {/* Legend & Helper Text */}
              <div className={styles.gridFooter}>
                <div className={styles.legend}>
                  <div className={styles.legendItem}><div className={`${styles.legendDot} ${styles.legendCompleted}`} /> Completed</div>
                  <div className={styles.legendItem}><div className={`${styles.legendDot} ${styles.legendToday}`} /> Today</div>
                  <div className={styles.legendItem}><div className={`${styles.legendDot} ${styles.legendUpcoming}`} /> Upcoming</div>
                  <div className={styles.legendItem}><div className={`${styles.legendDot} ${styles.legendMissed}`} /> Missed</div>
                  <div className={styles.legendItem}><div className={`${styles.legendDot} ${styles.legendCatchUp}`} /> Catch Up</div>
                </div>
                <div className={styles.helperText}>
                  Click any day to view its task and progress &rarr;
                </div>
              </div>

              {/* Clickable Day Journal Panel */}
              {renderJournalContent()}
            </div>
          </section>

        </div>

        {/* Right Column: Metrics, Search, Milestones */}
        <div className={styles.sideColumn}>
          
          <section className={styles.animateSection}>
            <div className={styles.metricsGrid}>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>{studentData.currentStreak}</div>
                <div className={styles.metricLabel}>Day Streak</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>{Math.round((studentData.progress / challengeData.totalDays) * 100)}%</div>
                <div className={styles.metricLabel}>Journey</div>
              </div>
            </div>
          </section>

          <section className={styles.animateSection}>
            <div className={styles.searchBox}>
              <Search size={18} className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Search your builds..." 
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <h3 className={styles.sectionTitle}>{searchQuery ? 'Search Results' : 'Recent Builds'}</h3>
            <div className={styles.itemList}>
              {searchedBuilds.length > 0 ? (
                searchedBuilds.map((build) => (
                  <div key={build.day} className={styles.listItem} onClick={() => setSelectedDay(build.day)}>
                    <div className={styles.recentDayBadge}>D {build.day}</div>
                    <div className={styles.listContent}>
                      <div className={styles.listTitle}>{build.title}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', padding: '10px 0' }}>No builds found.</div>
              )}
            </div>
          </section>

          <section className={styles.animateSection}>
            <h3 className={styles.sectionTitle}>Milestones</h3>
            <div className={styles.itemList}>
              {studentData.achievements.map((achievement) => (
                <div key={achievement.id} className={styles.listItem}>
                  <div className={styles.listItemIcon}>
                    {achievement.icon === "Trophy" ? <Trophy size={18} /> : <Zap size={18} />}
                  </div>
                  <div className={styles.listContent}>
                    <div className={styles.listTitle}>{achievement.title}</div>
                    <div className={styles.listDesc}>{achievement.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
    </>
  );
}
