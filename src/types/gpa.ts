export interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  semester: number;
  grade: string; // e.g. "A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "E", "Pending"
  isCustom?: boolean;
}

export interface DegreeProgram {
  id: string;
  code: string;
  name: string;
  gid: string;
  tsvUrl: string;
  /** Duration in years, when provided by the [Degree] sheet */
  years?: number;
  /** Academic level, when provided by the [Degree] sheet */
  level?: string;
}

export interface GradeOption {
  letter: string;
  points: number;
  description: string;
  colorClass: string;
}

export interface SemesterSummary {
  semesterNumber: number;
  totalCredits: number;
  earnedCredits: number;
  gpa: number;
  coursesCount: number;
}

export interface GpaStats {
  cgpa: number;
  totalCredits: number;
  earnedCredits: number;
  gradedCoursesCount: number;
  totalCoursesCount: number;
  honorsClassification: string;
  honorsBadgeColor: string;
}

export interface TsvSyncState {
  url: string;
  lastSyncedAt: string | null;
  isLoading: boolean;
  error: string | null;
  courseCount: number;
  activeDegree?: DegreeProgram;
  availableDegrees?: DegreeProgram[];
}
