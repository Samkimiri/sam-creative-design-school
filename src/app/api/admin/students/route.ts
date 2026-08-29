import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import { badRequest, getRequiredString, notFound, requireAdminRequest } from "@/lib/adminAuth";
import { courses, lessons } from "@/data/courses";
import { absoluteUrl } from "@/lib/seo";
import { sendInactivityNudgeEmail, sendNewCourseSuggestionEmail } from "@/lib/email";
import type { ProgressRecord } from "@/types";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  avatar?: string | null;
  profileImage?: string | null;
  enrolledCourses: string[];
  createdAt: string;
}

export async function POST(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  const students = await getDB<Student>("students.json");
  const safeStudents = students.map(({ password: _password, avatar: _avatar, profileImage: _profileImage, ...student }) => {
    void _password;
    void _avatar;
    void _profileImage;
    return student;
  });

  return NextResponse.json({ success: true, data: safeStudents });
}

export async function PATCH(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  const studentId = getRequiredString(auth.body, "studentId", "Student ID");
  if ("response" in studentId) return studentId.response;

  const emailType = getRequiredString(auth.body, "emailType", "Email type");
  if ("response" in emailType) return emailType.response;
  if (emailType.value !== "inactivity-nudge" && emailType.value !== "new-course-suggestion") {
    return badRequest("emailType must be inactivity-nudge or new-course-suggestion");
  }

  const students = await getDB<Student>("students.json");
  const student = students.find((item) => item.id === studentId.value);
  if (!student) {
    return notFound("Student not found");
  }
  if (!student.email) {
    return NextResponse.json({ success: true, data: { sent: false, message: "This student has no email on file." } });
  }

  const enrolledCourseIds = student.enrolledCourses ?? [];
  const progress = await getDB<ProgressRecord>("progress.json");
  const studentProgress = progress.filter((p) => p.studentId === student.id);

  const courseCompletion = enrolledCourseIds.map((courseId) => {
    const course = courses.find((c) => c.id === courseId);
    const total = lessons.filter((l) => l.courseId === courseId).length;
    const completed = new Set(studentProgress.find((p) => p.courseId === courseId)?.completedLessons ?? []).size;
    return { courseId, title: course?.title || courseId, complete: total > 0 && completed >= total };
  });

  if (emailType.value === "inactivity-nudge") {
    const incompleteCourses = courseCompletion.filter((c) => !c.complete).map((c) => c.title);
    const courseNames = incompleteCourses.length > 0 ? incompleteCourses : courseCompletion.map((c) => c.title);

    if (courseNames.length === 0) {
      return NextResponse.json({ success: true, data: { sent: false, message: "This student isn't enrolled in any course yet, so there's nothing to nudge them about." } });
    }

    const result = await sendInactivityNudgeEmail({
      to: student.email,
      studentName: student.name || "there",
      courseNames,
      lmsUrl: absoluteUrl("/lms"),
    });

    return NextResponse.json({
      success: true,
      data: {
        sent: result.sent,
        message: result.sent ? "Inactivity nudge email sent." : "Email could not be sent (check email settings).",
      },
    });
  }

  const completedCourses = courseCompletion.filter((c) => c.complete).map((c) => c.title);
  if (completedCourses.length === 0) {
    return NextResponse.json({ success: true, data: { sent: false, message: "This student hasn't completed a course yet, so a new-course suggestion wouldn't make sense." } });
  }

  const availableCourses = courses.filter((c) => !enrolledCourseIds.includes(c.id));
  const suggestedCourseIdField = auth.body.suggestedCourseId;
  let suggestedCourseNames: string[];

  if (typeof suggestedCourseIdField === "string" && suggestedCourseIdField.trim()) {
    const chosenCourse = availableCourses.find((c) => c.id === suggestedCourseIdField.trim());
    if (!chosenCourse) {
      return badRequest("Choose a course the student isn't already enrolled in.");
    }
    suggestedCourseNames = [chosenCourse.title];
  } else {
    suggestedCourseNames = availableCourses.slice(0, 3).map((c) => c.title);
  }

  const result = await sendNewCourseSuggestionEmail({
    to: student.email,
    studentName: student.name || "there",
    completedCourseNames: completedCourses,
    suggestedCourseNames,
    coursesUrl: absoluteUrl("/courses"),
  });

  return NextResponse.json({
    success: true,
    data: {
      sent: result.sent,
      message: result.sent ? "New course suggestion email sent." : "Email could not be sent (check email settings).",
    },
  });
}
