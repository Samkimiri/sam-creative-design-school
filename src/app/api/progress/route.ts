import { NextResponse, after } from "next/server";
import { getSession } from "@/lib/auth";
import { findDBRecordsByField, getDBRecord, upsertDBRecord } from "@/lib/db";
import { courses, lessons } from "@/data/courses";
import { getStudentWithConfirmedEnrollmentAccess, hasCourseAccess } from "@/lib/enrollmentAccess";
import { sendProgressMilestoneEmail } from "@/lib/email";
import { absoluteUrl } from "@/lib/seo";
import { getCourseCompletion, isCourseComplete } from "@/lib/courseCompletion";
import { getUpcomingIntakeSettings } from "@/lib/siteSettings";
import type { Student } from "@/types";

interface ProgressRecord {
  id?: string;
  studentId: string;
  courseId: string;
  completedLessons: string[];
  quizScores: { lessonId: string; score: number; total: number; date: string }[];
  lastAccessed: string;
  courseCompletedAt?: string;
  completionCohort?: string;
}

interface QuizAttempt {
  studentId: string;
  lessonId: string;
  passed: boolean;
}

function isProgressRecord(record: Partial<ProgressRecord>): record is ProgressRecord {
  return Boolean(record.studentId && record.courseId && Array.isArray(record.completedLessons));
}

function progressRecordId(studentId: string, courseId: string) {
  return `${studentId}:${courseId}`;
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

  if (courseId) {
    const record = await getDBRecord<ProgressRecord>("progress.json", progressRecordId(session.user.id, courseId));
    const courseRecord: ProgressRecord = record && isProgressRecord(record)
      ? record
      : {
          studentId: session.user.id,
          courseId,
          completedLessons: [],
          quizScores: [],
          lastAccessed: new Date().toISOString(),
        };
    return NextResponse.json({ success: true, data: courseRecord });
  }

  const userProgress = (
    await findDBRecordsByField<ProgressRecord>("progress.json", { studentId: session.user.id })
  ).filter(isProgressRecord);
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

    // A quiz-gated lesson can only be completed by actually passing its quiz -
    // the UI already hides the "Mark Complete" button for these, but that's
    // only a client-side gate; without this check a direct API call could
    // complete (and eventually get a certificate for) a quiz lesson never
    // actually attempted.
    if (lesson.quiz && session.user.role !== "admin") {
      const attempts = await findDBRecordsByField<QuizAttempt>("quiz-attempts.json", {
        studentId: session.user.id,
        lessonId,
      });
      const hasPassed = attempts.some((attempt) => attempt.passed);
      if (!hasPassed) {
        return NextResponse.json({ error: "Pass this lesson's quiz before marking it complete." }, { status: 403 });
      }
    }

    // Read and write exactly this student's one course record (by a
    // deterministic id) instead of the whole progress collection - reading
    // it all in only to rewrite it all back was how a lesson completion from
    // one student could silently erase another student's progress that was
    // saved in between the read and the write (see git history for details).
    const recordId = progressRecordId(session.user.id, courseId);
    const existing = await getDBRecord<ProgressRecord>("progress.json", recordId);
    const existingRecord = existing && isProgressRecord(existing) ? existing : null;
    const before = getCourseCompletion(courseId, existingRecord?.completedLessons);

    const savedRecord: ProgressRecord = existingRecord
      ? {
          ...existingRecord,
          id: recordId,
          completedLessons: existingRecord.completedLessons.includes(lessonId)
            ? existingRecord.completedLessons
            : [...existingRecord.completedLessons, lessonId],
          lastAccessed: new Date().toISOString(),
        }
      : {
          id: recordId,
          studentId: session.user.id as string,
          courseId,
          completedLessons: [lessonId],
          quizScores: [],
          lastAccessed: new Date().toISOString(),
        };

    // The moment the last lesson lands, stamp the completion (date and cohort) on the
    // student's record. The certificate, verification page and admin views all read
    // this same stamp, so they can never disagree about when or whether a course was finished.
    const afterState = getCourseCompletion(courseId, savedRecord.completedLessons);
    const justCompleted = afterState.isComplete && !savedRecord.courseCompletedAt;
    if (justCompleted) {
      savedRecord.courseCompletedAt = new Date().toISOString();
      savedRecord.completionCohort = (await getUpcomingIntakeSettings()).currentCohort;
    }

    await upsertDBRecord("progress.json", savedRecord);

    const totalLessons = afterState.total;
    if (totalLessons > 0 && student?.email) {
      const beforeMilestone = Math.floor((before.completedCount / totalLessons) * 10);
      const afterMilestone = Math.floor((afterState.completedCount / totalLessons) * 10);

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
    }

    if (isCourseComplete(courseId, savedRecord.completedLessons) && student && !student.isAlumni) {
      const studentId = student.id;
      after(async () => {
        try {
          const currentStudent = await getDBRecord<Student>("students.json", studentId);
          if (currentStudent && !currentStudent.isAlumni) {
            await upsertDBRecord("students.json", {
              ...currentStudent,
              isAlumni: true,
              alumniSince: new Date().toISOString(),
            });
          }
        } catch (error) {
          console.error("Auto-alumni update failed (non-fatal):", error);
        }
      });
    }

    return NextResponse.json({
      success: true,
      data: savedRecord,
      courseCompleted: afterState.isComplete,
      justCompleted,
      certificateUrl: afterState.isComplete ? `/api/certificates/${courseId}` : null,
    });
  } catch (err) {
    console.error("Progress POST Error:", err);
    return NextResponse.json({ error: "Failed to update progress" }, { status: 500 });
  }
}
