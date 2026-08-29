import { NextResponse } from "next/server";
import { appendDBRecord, getDB, saveDB } from "@/lib/db";
import { badRequest, getRequiredString, notFound, requireAdminRequest } from "@/lib/adminAuth";
import type { CourseFeedback } from "@/types";

export async function POST(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  const feedback = await getDB<CourseFeedback>("course-feedback.json");
  const studentId = typeof auth.body.studentId === "string" ? auth.body.studentId.trim() : "";
  const data = studentId ? feedback.filter((item) => item.studentId === studentId) : feedback;

  return NextResponse.json(
    { success: true, data },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}

export async function PATCH(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  const studentId = getRequiredString(auth.body, "studentId", "Student ID");
  if ("response" in studentId) return studentId.response;

  const studentName = getRequiredString(auth.body, "studentName", "Student name");
  if ("response" in studentName) return studentName.response;

  const courseId = getRequiredString(auth.body, "courseId", "Course ID");
  if ("response" in courseId) return courseId.response;

  const courseName = getRequiredString(auth.body, "courseName", "Course name");
  if ("response" in courseName) return courseName.response;

  const message = getRequiredString(auth.body, "message", "Feedback message");
  if ("response" in message) return message.response;
  if (message.value.length > 1000) {
    return badRequest("Feedback message must be 1000 characters or fewer.");
  }

  const entry: CourseFeedback = {
    id: `FB-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    studentId: studentId.value,
    studentName: studentName.value,
    courseId: courseId.value,
    courseName: courseName.value,
    message: message.value,
    createdAt: new Date().toISOString(),
  };

  await appendDBRecord("course-feedback.json", entry);

  return NextResponse.json(
    { success: true, data: entry },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}

export async function DELETE(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  const id = getRequiredString(auth.body, "id", "Feedback ID");
  if ("response" in id) return id.response;

  const feedback = await getDB<CourseFeedback>("course-feedback.json");
  const index = feedback.findIndex((item) => item.id === id.value);
  if (index === -1) {
    return notFound("Feedback entry not found");
  }

  const [deleted] = feedback.splice(index, 1);
  await saveDB("course-feedback.json", feedback);

  return NextResponse.json(
    { success: true, data: deleted, message: "Feedback deleted." },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}
