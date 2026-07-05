import { getDB, saveDB, upsertDBRecord } from "@/lib/db";
import { courses } from "@/data/courses";
import type { Enrollment, Student } from "@/types";

function normalizeEmail(value?: string) {
  return String(value || "").trim().toLowerCase();
}

function normalizePhone(value?: string) {
  return String(value || "").trim();
}

function normalizeId(value?: string) {
  return String(value || "").trim();
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

  if (addedCourses.length > 0) {
    await upsertDBRecord("students.json", students[studentIndex]);
  }

  return { granted: true, student: students[studentIndex], addedCourses };
}

export async function getConfirmedEnrollmentCourseIdsForStudent(student: Student) {
  const enrollments = await getDB<Enrollment>("enrollments.json");
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

export function hasCourseAccess(student: Student | null | undefined, courseId: string) {
  if (!student) return false;
  if (student.role === "admin") return true;
  return Boolean(student.enrolledCourses?.includes(courseId));
}

export function adminCourseIds() {
  return courses.map((course) => course.id);
}
