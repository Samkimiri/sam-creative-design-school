import { NextResponse } from "next/server";
import { getDB, saveDB } from "@/lib/db";
import { badRequest, getRequiredString, notFound, requireAdminRequest } from "@/lib/adminAuth";

interface Enrollment {
  id: string;
  studentName: string;
  studentEmail: string;
  courseId: string;
  courseName: string;
  amount: number;
  phone: string;
  reference: string;
  status: string;
  createdAt: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  enrolledCourses: string[];
}

export async function POST(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  const enrollments = await getDB<Enrollment>("enrollments.json");
  return NextResponse.json({ success: true, data: enrollments });
}

export async function PATCH(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  const enrollmentId = getRequiredString(auth.body, "enrollmentId", "Enrollment ID");
  if ("response" in enrollmentId) return enrollmentId.response;

  const status = getRequiredString(auth.body, "status", "Status");
  if ("response" in status) return status.response;
  if (status.value !== "pending" && status.value !== "confirmed") {
    return badRequest("Status must be pending or confirmed");
  }

  const enrollments = await getDB<Enrollment>("enrollments.json");
  const index = enrollments.findIndex((e) => e.id === enrollmentId.value);
  
  if (index === -1) {
    return notFound("Enrollment not found");
  }

  enrollments[index].status = status.value;
  await saveDB("enrollments.json", enrollments);

  // If confirmed, add to student's enrolledCourses
  if (status.value === "confirmed") {
    const students = await getDB<Student>("students.json");
    const enrollment = enrollments[index];

    // Match by email (case-insensitive) OR phone
    const studentIndex = students.findIndex((s) =>
      (s.email && enrollment.studentEmail && s.email.toLowerCase() === enrollment.studentEmail.toLowerCase()) ||
      (s.phone && enrollment.phone && s.phone === enrollment.phone)
    );

    if (studentIndex > -1) {
      const courseIds = enrollment.courseId.split(",");
      let updated = false;

      students[studentIndex].enrolledCourses = students[studentIndex].enrolledCourses ?? [];
      courseIds.forEach(cid => {
        const trimmedId = cid.trim();
        if (trimmedId && !students[studentIndex].enrolledCourses.includes(trimmedId)) {
          students[studentIndex].enrolledCourses.push(trimmedId);
          updated = true;
        }
      });

      if (updated) {
        await saveDB("students.json", students);
        console.log(`Successfully enrolled student ${enrollment.studentEmail} in courses: ${courseIds.join(", ")}`);
      }
    } else {
      console.warn(`Could not find student record for email: ${enrollment.studentEmail} or phone: ${enrollment.phone}`);
    }
  }

  return NextResponse.json({ success: true, data: enrollments[index] });
}
