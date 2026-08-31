import { lessons } from "@/data/courses";
import { getDB } from "@/lib/db";
import { getManagedCourses } from "@/lib/contentSettings";

interface ProgressRecord {
  studentId: string;
  courseId: string;
  completedLessons: string[];
  quizScores?: { lessonId: string; score: number; total: number; date: string }[];
  lastAccessed?: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  role?: string;
  avatar?: string | null;
  profileImage?: string | null;
  enrolledCourses?: string[];
}

export interface LeaderboardEntry {
  studentId: string;
  name: string;
  avatar?: string | null;
  score: number;
  completedLessons: number;
  activeCourses: number;
  certificates: number;
  quizAverage: number;
  recentActivity: string;
  rankLabel: string;
}

function isProgressRecord(record: Partial<ProgressRecord>): record is ProgressRecord {
  return Boolean(record.studentId && record.courseId && Array.isArray(record.completedLessons));
}

function getRecentBonus(lastAccessed?: string) {
  if (!lastAccessed) return 0;
  const lastAccessedTime = new Date(lastAccessed).getTime();
  if (Number.isNaN(lastAccessedTime)) return 0;

  const daysSinceActivity = (Date.now() - lastAccessedTime) / 86400000;
  if (daysSinceActivity <= 2) return 60;
  if (daysSinceActivity <= 7) return 35;
  if (daysSinceActivity <= 30) return 15;
  return 0;
}

function getRankLabel(score: number) {
  if (score >= 900) return "Studio Elite";
  if (score >= 600) return "Portfolio Pro";
  if (score >= 350) return "Skill Builder";
  if (score >= 150) return "Rising Creative";
  return "Starter";
}

export async function getLeaderboardEntries(): Promise<LeaderboardEntry[]> {
  const [students, progressRecords, courses] = await Promise.all([
    getDB<Student>("students.json"),
    getDB<ProgressRecord>("progress.json"),
    getManagedCourses(),
  ]);

  const courseLessonTotals = new Map(
    courses.map((course) => [
      course.id,
      lessons.filter((lesson) => lesson.courseId === course.id).length,
    ])
  );
  const progressByStudent = new Map<string, ProgressRecord[]>();

  progressRecords.filter(isProgressRecord).forEach((record) => {
    const currentRecords = progressByStudent.get(record.studentId) || [];
    currentRecords.push(record);
    progressByStudent.set(record.studentId, currentRecords);
  });

  // Every enrolled student is ranked, including those just starting out with
  // no activity yet - the admin account is excluded since it isn't a learner.
  const enrolledStudents = students.filter(
    (student) => student.role !== "admin" && (student.enrolledCourses?.length ?? 0) > 0
  );

  return enrolledStudents
    .map((student) => {
      const records = progressByStudent.get(student.id) || [];
      const completedLessons = records.reduce((sum, record) => sum + new Set(record.completedLessons).size, 0);
      const activeCourses = records.length > 0
        ? new Set(records.map((record) => record.courseId)).size
        : student.enrolledCourses?.length ?? 0;
      const certificates = records.filter((record) => {
        const totalLessons = courseLessonTotals.get(record.courseId) || 0;
        return totalLessons > 0 && new Set(record.completedLessons).size >= totalLessons;
      }).length;
      const quizScores = records.flatMap((record) => record.quizScores || []);
      const quizAverage = quizScores.length
        ? Math.round(
            quizScores.reduce((sum, quiz) => sum + (quiz.total > 0 ? (quiz.score / quiz.total) * 100 : 0), 0) /
              quizScores.length
          )
        : 0;
      const recentActivity = records
        .map((record) => record.lastAccessed)
        .filter((date): date is string => Boolean(date))
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0] || "";
      const score =
        completedLessons * 50 +
        activeCourses * 25 +
        certificates * 180 +
        quizScores.length * 20 +
        Math.round(quizAverage * 1.5) +
        getRecentBonus(recentActivity);

      return {
        studentId: student.id,
        name: student.name?.trim() || "SCDS Student",
        avatar: student.profileImage || student.avatar || null,
        score,
        completedLessons,
        activeCourses,
        certificates,
        quizAverage,
        recentActivity,
        rankLabel: getRankLabel(score),
      };
    })
    .sort((a, b) => b.score - a.score || b.completedLessons - a.completedLessons || a.name.localeCompare(b.name));
}
