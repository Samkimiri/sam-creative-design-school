import { NextResponse } from "next/server";
import { getDB, saveDB, upsertDBRecord } from "@/lib/db";
import { badRequest, getRequiredString, notFound, requireAdminRequest, type AdminRequestBody } from "@/lib/adminAuth";
import { courses, lessons } from "@/data/courses";
import { absoluteUrl } from "@/lib/seo";
import { sendInactivityNudgeEmail, sendNewCourseSuggestionEmail } from "@/lib/email";
import type {
  AlumniReferral,
  AnalyticsEvent,
  AssignmentSubmission,
  CourseFeedback,
  Enrollment,
  ProgressRecord,
  ProjectSubmission,
  Review,
  VisitorSession,
} from "@/types";

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  role?: string;
  avatar?: string | null;
  profileImage?: string | null;
  enrolledCourses: string[];
  pausedCourses?: string[];
  isAlumni?: boolean;
  alumniSince?: string;
  createdAt: string;
}

async function handleCoursePauseToggle(body: AdminRequestBody, pause: boolean) {
  const studentId = getRequiredString(body, "studentId", "Student ID");
  if ("response" in studentId) return studentId.response;

  const courseId = getRequiredString(body, "courseId", "Course ID");
  if ("response" in courseId) return courseId.response;

  const students = await getDB<Student>("students.json");
  const index = students.findIndex((item) => item.id === studentId.value);
  if (index === -1) {
    return notFound("Student not found");
  }

  const student = students[index];
  if (!(student.enrolledCourses ?? []).includes(courseId.value)) {
    return badRequest("This student is not enrolled in that course.");
  }

  const pausedCourses = new Set(student.pausedCourses ?? []);
  const noChange = pause ? pausedCourses.has(courseId.value) : !pausedCourses.has(courseId.value);

  if (pause) pausedCourses.add(courseId.value);
  else pausedCourses.delete(courseId.value);

  student.pausedCourses = [...pausedCourses];
  await upsertDBRecord("students.json", student);

  const { password: _password, avatar: _avatar, profileImage: _profileImage, ...safeStudent } = student;
  void _password;
  void _avatar;
  void _profileImage;

  return NextResponse.json({
    success: true,
    data: {
      student: safeStudent,
      message: noChange
        ? `${student.name} was already ${pause ? "paused" : "active"} for this course.`
        : pause
          ? `Access paused for ${student.name}. They'll be asked to complete payment, and keep their progress once resumed.`
          : `Access resumed for ${student.name}. They can continue right where they left off.`,
    },
  });
}

async function handleAlumniToggle(body: AdminRequestBody, makeAlumni: boolean) {
  const studentId = getRequiredString(body, "studentId", "Student ID");
  if ("response" in studentId) return studentId.response;

  const students = await getDB<Student>("students.json");
  const index = students.findIndex((item) => item.id === studentId.value);
  if (index === -1) {
    return notFound("Student not found");
  }

  const student = students[index];
  student.isAlumni = makeAlumni;
  if (makeAlumni && !student.alumniSince) {
    student.alumniSince = new Date().toISOString();
  }

  await upsertDBRecord("students.json", student);

  const { password: _password, avatar: _avatar, profileImage: _profileImage, ...safeStudent } = student;
  void _password;
  void _avatar;
  void _profileImage;

  return NextResponse.json({
    success: true,
    data: {
      student: safeStudent,
      message: makeAlumni
        ? `${student.name} has been added to the Alumni Network and can now appear on the homepage.`
        : `${student.name} has been removed from the Alumni Network.`,
    },
  });
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

  const action = typeof auth.body.action === "string" ? auth.body.action : "";
  if (action === "pause-course" || action === "unpause-course") {
    return handleCoursePauseToggle(auth.body, action === "pause-course");
  }
  if (action === "set-alumni" || action === "remove-alumni") {
    return handleAlumniToggle(auth.body, action === "set-alumni");
  }

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

export async function DELETE(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  const studentId = getRequiredString(auth.body, "studentId", "Student ID");
  if ("response" in studentId) return studentId.response;

  const students = await getDB<Student>("students.json");
  const target = students.find((item) => item.id === studentId.value);
  if (!target) {
    return notFound("Student not found");
  }
  if (target.role === "admin") {
    return badRequest("Admin accounts cannot be deleted this way.");
  }

  const nameLower = target.name.trim().toLowerCase();
  const emailLower = target.email.trim().toLowerCase();

  await saveDB("students.json", students.filter((s) => s.id !== target.id));

  const [enrollments, progress, assignments, projects, feedback, reviews, referrals, videoProgress, communityMessages] = await Promise.all([
    getDB<Enrollment>("enrollments.json"),
    getDB<ProgressRecord>("progress.json"),
    getDB<AssignmentSubmission>("assignments.json"),
    getDB<ProjectSubmission>("projects.json"),
    getDB<CourseFeedback>("course-feedback.json"),
    getDB<Review>("reviews.json"),
    getDB<AlumniReferral>("alumni-referrals.json"),
    getDB<{ id: string; studentId: string }>("video-progress.json"),
    getDB<{ id: string; studentId: string }>("community-messages.json"),
  ]);

  await Promise.all([
    saveDB(
      "enrollments.json",
      enrollments.filter((e) => e.studentId !== target.id && e.studentEmail?.trim().toLowerCase() !== emailLower)
    ),
    saveDB("progress.json", progress.filter((p) => p.studentId !== target.id)),
    saveDB("assignments.json", assignments.filter((a) => a.studentId !== target.id)),
    saveDB("projects.json", projects.filter((p) => p.studentName.trim().toLowerCase() !== nameLower)),
    saveDB("course-feedback.json", feedback.filter((f) => f.studentId !== target.id)),
    saveDB("reviews.json", reviews.filter((r) => r.name.trim().toLowerCase() !== nameLower)),
    saveDB("alumni-referrals.json", referrals.filter((r) => r.postedByStudentId !== target.id)),
    saveDB("video-progress.json", videoProgress.filter((v) => v.studentId !== target.id)),
    saveDB("community-messages.json", communityMessages.filter((m) => m.studentId !== target.id)),
  ]);

  // Analytics cleanup is best-effort - never let it block the account deletion itself.
  try {
    const [sessions, events] = await Promise.all([
      getDB<VisitorSession>("analytics-sessions.json"),
      getDB<AnalyticsEvent>("analytics-events.json"),
    ]);
    await Promise.all([
      saveDB(
        "analytics-sessions.json",
        sessions.filter((s) => s.userId !== target.id && s.userEmail?.trim().toLowerCase() !== emailLower)
      ),
      saveDB(
        "analytics-events.json",
        events.filter((e) => e.userEmail?.trim().toLowerCase() !== emailLower)
      ),
    ]);
  } catch (error) {
    console.error("Analytics cleanup during student deletion failed (non-fatal):", error);
  }

  return NextResponse.json({
    success: true,
    data: {
      id: target.id,
      message: `${target.name} and all related enrollments, progress, submissions, and records have been permanently deleted.`,
    },
  });
}
