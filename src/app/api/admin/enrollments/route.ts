import { NextResponse } from "next/server";
import { readJSON, writeJSON, getDB, saveDB } from "@/lib/db";
import { getSession } from "@/lib/auth";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "sam-admin-2026";

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
  const body = await request.json().catch(() => ({}));
  const { password } = body;
  
  const session = await getSession();
  const isAdminSession = session?.user.role === "admin";

  if (password !== ADMIN_PASSWORD && !isAdminSession) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const enrollments = await getDB<Enrollment>("enrollments.json");
  return NextResponse.json({ success: true, data: enrollments });
}

export async function PATCH(request: Request) {
  const { password, enrollmentId, status } = await request.json();
  
  const session = await getSession();
  const isAdminSession = session?.user.role === "admin";

  if (password !== ADMIN_PASSWORD && !isAdminSession) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const enrollments = await getDB<Enrollment>("enrollments.json");
  const index = enrollments.findIndex((e) => e.id === enrollmentId);
  
  if (index > -1) {
    enrollments[index].status = status;
    await saveDB("enrollments.json", enrollments);
    
    // If confirmed, add to student's enrolledCourses
    if (status === "confirmed") {
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
  }

  return NextResponse.json({ success: true });
}
