"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Clock, Code2, Briefcase, Trophy, Zap, ArrowRight, Search, CheckCircle2 } from "lucide-react";
import styles from "./page.module.css";
import studentData from "@/data/student.json";
import challengeData from "@/data/challenge.json";
import day12Data from "@/data/day12.json";

export default function DashboardPage() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Generate 60 days of history
  const history = useMemo(() => {
    return Array.from({ length: challengeData.totalDays }, (_, i) => {
      const dayNum = i + 1;
      let status = "upcoming";
      if (dayNum < studentData.currentDay) status = "completed";
      else if (dayNum === studentData.currentDay) status = "today";
      
      return {
        day: dayNum,
        status,
        title: status === "upcoming" ? "Locked" : dayNum === studentData.currentDay ? day12Data.title : `Build task for Day ${dayNum}`,
        learned: status === "completed" ? `Successfully learned and applied concepts for day ${dayNum}. Built something cool and shared it.` : "",
        timeSpent: status === "completed" ? "45 min" : status === "today" ? "-" : "-",
      };
    });
  }, []);

  const selectedDayData = selectedDay ? history.find(d => d.day === selectedDay) : null;
  const recentBuilds = history.filter(d => d.status === "completed").reverse().slice(0, 3);

  // Filter for search
  const searchedBuilds = searchQuery 
    ? history.filter(d => d.status === "completed" && d.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : recentBuilds;

  return (
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

                  const isSelected = selectedDay === day.day;

                  return (
                    <div 
                      key={day.day} 
                      className={`${styles.dayCell} ${cellClass} ${isSelected ? styles.selected : ''}`}
                      onClick={() => (day.status === "completed" || day.status === "today") ? setSelectedDay(isSelected ? null : day.day) : null}
                      title={`Day ${day.day}: ${day.title}`}
                    >
                      {day.day}
                    </div>
                  );
                })}
              </div>

              {/* Clickable Day Journal Panel */}
              {selectedDayData && (
                <div className={styles.journalPanel}>
                  <div className={styles.journalHeader}>
                    <div>
                      <h4 className={styles.journalTitle}>Day {selectedDayData.day}: {selectedDayData.title}</h4>
                      <div className={styles.journalMeta}>
                        <div className={styles.journalMetaItem}>
                          <CheckCircle2 size={14} className="text-brand-success" />
                          <span>{selectedDayData.status === "today" ? "In Progress" : "Completed"}</span>
                        </div>
                        <div className={styles.journalMetaItem}>
                          <Clock size={14} />
                          <span>{selectedDayData.timeSpent}</span>
                        </div>
                      </div>
                    </div>
                    {selectedDayData.status === "today" && (
                      <Link href={`/day/${selectedDayData.day}`} className={styles.heroCta} style={{ padding: "8px 16px", fontSize: "13px" }}>
                        Open Task
                      </Link>
                    )}
                  </div>

                  {selectedDayData.learned && (
                    <div className={styles.journalContent}>
                      <div className={styles.journalLabel}>What I learned</div>
                      <div className={styles.journalText}>{selectedDayData.learned}</div>
                    </div>
                  )}

                  {selectedDayData.status === "completed" && (
                    <div className={styles.journalLinks}>
                      <a href="#" className={styles.journalLink}>
                        <Code2 size={16} /> View Code
                      </a>
                      <a href="#" className={styles.journalLink}>
                        <Briefcase size={16} /> View Post
                      </a>
                    </div>
                  )}
                </div>
              )}
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
                <div key={achievement.id} className={styles.achievementBadge}>
                  <div className={styles.listItemIcon}>
                    {achievement.icon === "Trophy" ? <Trophy size={18} /> : <Zap size={18} />}
                  </div>
                  <div className={styles.listContent}>
                    <div className={styles.achievementTitle}>{achievement.title}</div>
                    <div className={styles.listDesc}>{achievement.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
