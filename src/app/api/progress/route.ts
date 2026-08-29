import { NextResponse, after } from "next/server";
import { getSession } from "@/lib/auth";
import { getDB, saveDB, upsertDBRecord } from "@/lib/db";
import { courses, lessons } from "@/data/courses";
import { getStudentWithConfirmedEnrollmentAccess, hasCourseAccess } from "@/lib/enrollmentAccess";
import { sendProgressMilestoneEmail } from "@/lib/email";
import { absoluteUrl } from "@/lib/seo";
import type { Student } from "@/types";

interface ProgressRecord {
  studentId: string;
  courseId: string;
  completedLessons: string[];
  quizScores: { lessonId: string; score: number; total: number; date: string }[];
  lastAccessed: string;
}

function isProgressRecord(record: Partial<ProgressRecord>): record is ProgressRecord {
  return Boolean(record.studentId && record.courseId && Array.isArray(record.completedLessons));
}

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get("courseId");

  if (courseId && !courses.some((course) => course.id === courseId)) {
    return NextResponse.json({ error: "Invalid course" }, { status: 400 });
  }

  if (courseId) {
    const student = await getStudentWithConfirmedEnrollmentAccess(session.user.id);
    const canAccess = session.user.role === "admin" || hasCourseAccess(student, courseId);
    if (!canAccess) {
      return NextResponse.json({ error: "Course access requires admin approval" }, { status: 403 });
    }
  }

  const progress = await getDB<ProgressRecord>("progress.json");
  const userProgress = progress.filter((p) => isProgressRecord(p) && p.studentId === session.user.id);

  if (courseId) {
    const courseRecord = userProgress.find((p) => p.courseId === courseId) || {
      studentId: session.user.id,
      courseId,
      completedLessons: [],
      quizScores: [],
      lastAccessed: new Date().toISOString()
    };
    return NextResponse.json({ success: true, data: courseRecord });
  }

  return NextResponse.json({ success: true, data: userProgress });
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session || !session.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { courseId, lessonId } = await request.json();
    if (typeof courseId !== "string" || typeof lessonId !== "string") {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const lesson = lessons.find((item) => item.id === lessonId && item.courseId === courseId);
    if (!lesson) {
      return NextResponse.json({ error: "Invalid lesson" }, { status: 400 });
    }

    const student = await getStudentWithConfirmedEnrollmentAccess(session.user.id);
    const canAccess = session.user.role === "admin" || hasCourseAccess(student, courseId);
    if (!canAccess) {
      return NextResponse.json({ error: "Course access requires admin approval" }, { status: 403 });
    }

    const progress = (await getDB<ProgressRecord>("progress.json")).filter(isProgressRecord);
    const existingIndex = progress.findIndex(
      (p) => p.studentId === session.user.id && p.courseId === courseId
    );
    let savedRecord: ProgressRecord;
    const beforeCompleted = existingIndex > -1 ? progress[existingIndex].completedLessons.length : 0;

    if (existingIndex > -1) {
      if (!progress[existingIndex].completedLessons.includes(lessonId)) {
        progress[existingIndex].completedLessons.push(lessonId);
      }
      progress[existingIndex].lastAccessed = new Date().toISOString();
      savedRecord = progress[existingIndex];
    } else {
      savedRecord = {
        studentId: session.user.id as string,
        courseId,
        completedLessons: [lessonId],
        quizScores: [],
        lastAccessed: new Date().toISOString(),
      };
      progress.push(savedRecord);
    }

    await saveDB("progress.json", progress);

    const totalLessons = lessons.filter((item) => item.courseId === courseId).length;
    if (totalLessons > 0 && student?.email) {
      const afterCompleted = savedRecord.completedLessons.length;
      const beforeMilestone = Math.floor((beforeCompleted / totalLessons) * 10);
      const afterMilestone = Math.floor((afterCompleted / totalLessons) * 10);

      if (afterMilestone > beforeMilestone) {
        const course = courses.find((item) => item.id === courseId);
        const studentEmail = student.email;
        const studentName = student.name || "there";
        const courseName = course?.title || courseId;
        const percent = afterMilestone * 10;

        after(() =>
          sendProgressMilestoneEmail({
            to: studentEmail,
            studentName,
            courseName,
            percent,
            lmsUrl: absoluteUrl(`/lms/${courseId}`),
          }).catch(() => {})
        );
      }

      if (afterCompleted >= totalLessons && !student.isAlumni) {
        const studentId = student.id;
        after(async () => {
          try {
            const allStudents = await getDB<Student>("students.json");
            const index = allStudents.findIndex((item) => item.id === studentId);
            if (index > -1 && !allStudents[index].isAlumni) {
              allStudents[index].isAlumni = true;
              allStudents[index].alumniSince = new Date().toISOString();
              await upsertDBRecord("students.json", allStudents[index]);
            }
          } catch (error) {
            console.error("Auto-alumni update failed (non-fatal):", error);
          }
        });
      }
    }

    return NextResponse.json({ success: true, data: savedRecord });
  } catch (err) {
    console.error("Progress POST Error:", err);
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 });
  }
}
