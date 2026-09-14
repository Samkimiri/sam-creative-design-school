import { NextResponse } from "next/server";
import { getDB, upsertDBRecord } from "@/lib/db";
import { requireFullAdminRequest } from "@/lib/adminAuth";
import { logAdminAction } from "@/lib/auditLog";
import { enrollmentMatchesStudent } from "@/lib/enrollmentAccess";
import type { Enrollment, Student } from "@/types";

interface ReconcileFix {
  studentId: string;
  studentName: string;
  courseId: string;
  courseName: string;
  enrollmentId: string;
}

interface OrphanedEnrollment {
  enrollmentId: string;
  studentName: string;
  courseName: string;
  reason: string;
}

function courseIdsFromEnrollment(enrollment: Pick<Enrollment, "courseId">) {
  return enrollment.courseId.split(",").map((id) => id.trim()).filter(Boolean);
}

/**
 * A confirmed enrollment record and a student's enrolledCourses list are two
 * separate stores that should always agree, but nothing keeps them in sync
 * if the write that grants access never ran or only partly ran (e.g. an
 * ambiguous phone match under enrollmentMatchesStudent's unambiguous-only
 * rule, a crash between the two writes, or a manual data edit). This finds
 * every confirmed enrollment whose course is missing from its matched
 * student's access, plus any confirmed enrollment that matches no student
 * account at all (which needs a human, since there's no safe id to grant to).
 */
async function buildReconcilePlan() {
  const [enrollments, students] = await Promise.all([
    getDB<Enrollment>("enrollments.json"),
    getDB<Student>("students.json"),
  ]);

  const fixes: ReconcileFix[] = [];
  const orphaned: OrphanedEnrollment[] = [];

  for (const enrollment of enrollments) {
    if (enrollment.status !== "confirmed") continue;

    const student = students.find((item) => enrollmentMatchesStudent(enrollment, item, students));
    if (!student) {
      orphaned.push({
        enrollmentId: enrollment.id,
        studentName: enrollment.studentName,
        courseName: enrollment.courseName,
        reason: "No registered student account matches this enrollment's ID, email, or an unambiguous phone number.",
      });
      continue;
    }

    const enrolledCourses = student.enrolledCourses ?? [];
    for (const courseId of courseIdsFromEnrollment(enrollment)) {
      if (!enrolledCourses.includes(courseId)) {
        fixes.push({
          studentId: student.id,
          studentName: student.name,
          courseId,
          courseName: enrollment.courseName,
          enrollmentId: enrollment.id,
        });
      }
    }
  }

  return { fixes, orphaned, students };
}

export async function POST(request: Request) {
  const auth = await requireFullAdminRequest(request);
  if ("response" in auth) return auth.response;

  const confirm = auth.body.confirm === true;
  const { fixes, orphaned, students } = await buildReconcilePlan();

  if (!confirm || fixes.length === 0) {
    return NextResponse.json({
      success: true,
      data: { applied: false, fixCount: fixes.length, orphanedCount: orphaned.length, fixes, orphaned },
    });
  }

  const studentsById = new Map(students.map((item) => [item.id, item]));
  const coursesByStudent = new Map<string, Set<string>>();
  for (const fix of fixes) {
    const existing = coursesByStudent.get(fix.studentId) ?? new Set(studentsById.get(fix.studentId)?.enrolledCourses ?? []);
    existing.add(fix.courseId);
    coursesByStudent.set(fix.studentId, existing);
  }

  for (const [studentId, courseSet] of coursesByStudent) {
    const student = studentsById.get(studentId);
    if (!student) continue;
    await upsertDBRecord("students.json", { ...student, enrolledCourses: [...courseSet] });
  }

  await logAdminAction({
    actorId: auth.actor.id,
    actorName: auth.actor.name,
    actorRole: auth.actor.role,
    action: "enrollments.reconciled",
    targetType: "enrollment",
    details: `Granted ${fixes.length} missing course access grant(s) across ${coursesByStudent.size} student(s) to match confirmed enrollment records.`,
  });

  return NextResponse.json({
    success: true,
    data: { applied: true, fixCount: fixes.length, orphanedCount: orphaned.length, fixes, orphaned },
  });
}
