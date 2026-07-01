import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDB, getDBRecord } from "@/lib/db";
import { adminCourseIds, attachConfirmedEnrollmentsToStudent } from "@/lib/enrollmentAccess";
import type { ProgressRecord, Student } from "@/types";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const student = await getDBRecord<Student>("students.json", session.user.id);
    
    if (!student) {
      return NextResponse.json({ success: false, message: "Student record not found" }, { status: 404 });
    }

    const syncedStudent = await attachConfirmedEnrollmentsToStudent(student);
    const allProgress = await getDB<ProgressRecord>("progress.json");
    const progress = allProgress.filter((p) => p.studentId === session.user.id);
    const isAdmin = session.user.role === "admin" || syncedStudent.role === "admin";
    const normalizedStudent = isAdmin
      ? { ...syncedStudent, enrolledCourses: adminCourseIds() }
      : syncedStudent;

    return NextResponse.json({ 
      success: true, 
      user: session.user,
      student: normalizedStudent,
      progress
    });
  } catch (error) {
    console.error("Me API Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
