import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDB } from "@/lib/db";
import type { ProgressRecord, Student } from "@/types";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const students = await getDB<Student>("students.json");
    const student = students.find((s) => s.id === session.user.id);
    
    if (!student) {
      return NextResponse.json({ success: false, message: "Student record not found" }, { status: 404 });
    }

    const allProgress = await getDB<ProgressRecord>("progress.json");
    const progress = allProgress.filter((p) => p.studentId === session.user.id);

    return NextResponse.json({ 
      success: true, 
      user: session.user,
      student,
      progress
    });
  } catch (error) {
    console.error("Me API Error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
