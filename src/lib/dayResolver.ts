import studentData from "@/data/student.json";
import challengeData from "@/data/challenge.json";
import day12Data from "@/data/day12.json";
import completedDaysData from "@/data/completed-days.json";

export type DayStatus = "completed" | "missed" | "catchup" | "today" | "upcoming";

export interface DayData {
  id: number;
  status: DayStatus;
  title: string;
  description: string;
  estimatedTime: string;
  difficulty?: string;
  objective?: string;
  whatILearned?: string;
  learningObjectives?: string[];
  resources?: string[];
  tags?: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  checklist?: { id: string; label: string; checked: boolean }[];
  completionDate?: string;
}

export function getDayById(id: number): DayData | null {
  if (id < 1 || id > challengeData.totalDays) {
    return null;
  }

  // 1. Check if it's the current active day (today)
  if (id === studentData.currentDay) {
    return {
      id,
      status: "today",
      title: day12Data.title,
      description: day12Data.description,
      objective: day12Data.objective,
      estimatedTime: day12Data.estimatedTime,
      difficulty: "Medium", // Or fetch from somewhere else if needed
      checklist: day12Data.checklist,
      tags: day12Data.skills,
      learningObjectives: [], // We can fill these based on requirements
      resources: [],
    };
  }

  // 2. Check if it's an upcoming day
  if (id > studentData.currentDay) {
    return {
      id,
      status: "upcoming",
      title: "Locked",
      description: "This task will unlock when it becomes available.",
      estimatedTime: "-",
    };
  }

  // 3. It's a past day, check completed-days.json
  const pastDay = completedDaysData.find((d: { day: number, [key: string]: unknown }) => d.day === id);
  
  if (pastDay) {
    // If it's a past day, its status should be in the JSON, defaulting to completed
    const status = (pastDay.status as DayStatus) || "completed";
    return {
      id,
      status,
      title: pastDay.title,
      description: pastDay.subtitle || "",
      estimatedTime: pastDay.estimatedTime,
      difficulty: pastDay.difficulty,
      whatILearned: pastDay.whatILearned,
      learningObjectives: pastDay.learningObjectives,
      resources: pastDay.resources,
      tags: pastDay.tags,
      githubUrl: pastDay.githubUrl,
      linkedinUrl: pastDay.linkedinUrl,
      checklist: pastDay.checklist,
      completionDate: pastDay.completionDate,
    };
  }

  // Fallback for past days without data
  return {
    id,
    status: "missed",
    title: `Day ${id} task`,
    description: "Data missing for this day.",
    estimatedTime: "-",
  };
}
