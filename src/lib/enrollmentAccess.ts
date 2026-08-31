import { getDB, saveDB, upsertDBRecord } from "@/lib/db";
import { courses } from "@/data/courses";
import type { Enrollment, Student } from "@/types";

export function normalizeEmail(value?: string) {
  return String(value || "").trim().toLowerCase();
}

export function normalizePhone(value?: string) {
  const digits = String(value || "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("254") && digits.length === 12) return `0${digits.slice(3)}`;
  if ((digits.startsWith("7") || digits.startsWith("1")) && digits.length === 9) return `0${digits}`;
  return digits;
}

function normalizeId(value?: string) {
  return String(value || "").trim().toLowerCase();
}

function courseIdsFromEnrollment(enrollment: Pick<Enrollment, "courseId">) {
  return enrollment.courseId
    .split(",")
    .map((courseId) => courseId.trim())
    .filter(Boolean);
}

export function enrollmentMatchesStudent(enrollment: Enrollment, student: Student) {
  const enrollmentStudentId = normalizeId(enrollment.studentId);
  const studentId = normalizeId(student.id);
  const enrollmentEmail = normalizeEmail(enrollment.studentEmail);
  const studentEmail = normalizeEmail(student.email);
  const enrollmentPhone = normalizePhone(enrollment.phone);
  const studentPhone = normalizePhone(student.phone);

  return Boolean(
    (enrollmentStudentId && enrollmentStudentId !== "guest" && studentId && enrollmentStudentId === studentId) ||
      (enrollmentEmail && studentEmail && enrollmentEmail === studentEmail) ||
      (enrollmentPhone && studentPhone && enrollmentPhone === studentPhone)
  );
}

export async function grantEnrollmentAccess(enrollment: Enrollment) {
  const students = await getDB<Student>("students.json");
  const studentIndex = students.findIndex((student) => enrollmentMatchesStudent(enrollment, student));

  if (studentIndex === -1) {
    return { granted: false, student: null, addedCourses: [] as string[] };
  }

  const currentCourses = students[studentIndex].enrolledCourses ?? [];
  const addedCourses: string[] = [];

  for (const courseId of courseIdsFromEnrollment(enrollment)) {
    if (!currentCourses.includes(courseId)) {
      currentCourses.push(courseId);
      addedCourses.push(courseId);
    }
  }

  students[studentIndex].enrolledCourses = currentCourses;

  if (addedCourses.length > 0) await upsertDBRecord("students.json", students[studentIndex]);

  return { granted: true, student: students[studentIndex], addedCourses };
}

export async function findStudentForEnrollment(enrollment: Enrollment) {
  const students = await getDB<Student>("students.json");
  return students.find((student) => enrollmentMatchesStudent(enrollment, student)) ?? null;
}

export async function revokeEnrollmentAccess(enrollment: Enrollment) {
  const students = await getDB<Student>("students.json");
  const studentIndex = students.findIndex((student) => enrollmentMatchesStudent(enrollment, student));

  if (studentIndex === -1) {
    return { revoked: false, student: null, removedCourses: [] as string[] };
  }

  const currentCourses = students[studentIndex].enrolledCourses ?? [];
  const targetCourseIds = new Set(courseIdsFromEnrollment(enrollment));
  const removedCourses: string[] = [];

  const remainingCourses = currentCourses.filter((courseId) => {
    if (!targetCourseIds.has(courseId)) return true;
    removedCourses.push(courseId);
    return false;
  });

  students[studentIndex].enrolledCourses = remainingCourses;

  if (removedCourses.length > 0) await upsertDBRecord("students.json", students[studentIndex]);

  return { revoked: true, student: students[studentIndex], removedCourses };
}

export async function getConfirmedEnrollmentCourseIdsForStudent(student: Student) {
  let enrollments: Enrollment[] = [];
  try {
    enrollments = await getDB<Enrollment>("enrollments.json");
  } catch (error) {
    console.error("Confirmed enrollment lookup failed; using saved student courses only:", error);
    return [];
  }

  const courseIds = new Set<string>();

  for (const enrollment of enrollments) {
    if (enrollment.status !== "confirmed" || !enrollmentMatchesStudent(enrollment, student)) continue;
    for (const courseId of courseIdsFromEnrollment(enrollment)) {
      courseIds.add(courseId);
    }
  }

  return [...courseIds];
}

export async function attachConfirmedEnrollmentsToStudent(student: Student) {
  const approvedCourseIds = await getConfirmedEnrollmentCourseIdsForStudent(student);
  if (approvedCourseIds.length === 0) return student;

  const enrolledCourses = student.enrolledCourses ?? [];
  let changed = false;

  for (const courseId of approvedCourseIds) {
    if (!enrolledCourses.includes(courseId)) {
      enrolledCourses.push(courseId);
      changed = true;
    }
  }

  if (!changed) return student;

  const updatedStudent = { ...student, enrolledCourses };
  const students = await getDB<Student>("students.json");
  const index = students.findIndex((item) => item.id === student.id);

  if (index > -1) {
    students[index] = updatedStudent;
    await saveDB("students.json", students);
  } else {
    await upsertDBRecord("students.json", updatedStudent);
  }

  return updatedStudent;
}

export async function getStudentWithConfirmedEnrollmentAccess(studentId: string) {
  const student = await getDB<Student>("students.json")
    .then((students) => students.find((item) => item.id === studentId) ?? null);

  if (!student) return null;
  return attachConfirmedEnrollmentsToStudent(student);
}

/**
 * Some students received course access directly (added before the M-Pesa
 * approval workflow existed, or granted by an admin outside /enroll), so
 * they have no matching row in enrollments.json. This backfills a "legacy"
 * confirmed record for each such student+course pair so the admin
 * Enrollments tab reflects everyone who actually has access, not just
 * requests submitted through the online form. Idempotent: reruns are safe
 * because each backfilled record has a deterministic id.
 */
export async function backfillLegacyEnrollments(enrollments: Enrollment[]): Promise<Enrollment[]> {
  const students = await getDB<Student>("students.json");
  const existingIds = new Set(enrollments.map((enrollment) => enrollment.id));
  const newRecords: Enrollment[] = [];

  for (const student of students) {
    if (student.role === "admin") continue;

    for (const courseId of student.enrolledCourses ?? []) {
      const alreadyTracked = enrollments.some(
        (enrollment) =>
          enrollmentMatchesStudent(enrollment, student) && courseIdsFromEnrollment(enrollment).includes(courseId)
      );
      if (alreadyTracked) continue;

      const legacyId = `ENR-LEGACY-${student.id}-${courseId}`;
      if (existingIds.has(legacyId)) continue;

      const course = courses.find((item) => item.id === courseId);
      const createdAt = student.createdAt || new Date().toISOString();

      const legacyRecord: Enrollment = {
        id: legacyId,
        studentId: student.id,
        studentName: student.name,
        studentEmail: student.email,
        courseId,
        courseName: course?.title || courseId,
        amount: course?.price || 0,
        phone: student.phone || "",
        reference: legacyId,
        paymentProvider: "legacy",
        paymentVerificationStatus: "legacy",
        adminApprovalStatus: "approved",
        adminApprovedAt: createdAt,
        accessGrantedAt: createdAt,
        accessGrantMessage: "Backfilled automatically: this student already had course access before enrollment requests were tracked here. No original payment record exists.",
        status: "confirmed",
        createdAt,
      };

      newRecords.push(legacyRecord);
      existingIds.add(legacyId);
    }
  }

  if (newRecords.length === 0) return enrollments;

  for (const record of newRecords) {
    await upsertDBRecord("enrollments.json", record);
  }

  return [...enrollments, ...newRecords];
}

export function hasCourseAccess(student: Student | null | undefined, courseId: string) {
  if (!student) return false;
  if (student.role === "admin") return true;
  if (student.pausedCourses?.includes(courseId)) return false;
  return Boolean(student.enrolledCourses?.includes(courseId));
}

export function adminCourseIds() {
  return courses.map((course) => course.id);
}
