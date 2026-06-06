import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDB, getDBRecord } from "@/lib/db";
import { courses } from "@/data/courses";
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

    const allProgress = await getDB<ProgressRecord>("progress.json");
    const progress = allProgress.filter((p) => p.studentId === session.user.id);
    const isAdmin = session.user.role === "admin" || student.role === "admin";
    const normalizedStudent = isAdmin
      ? { ...student, enrolledCourses: courses.map((course) => course.id) }
      : student;

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
