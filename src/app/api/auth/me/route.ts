import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDB } from "@/lib/db";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ success: false }, { status: 401 });
    }

    const students = await getDB<any>("students.json");
    const student = students.find((s: any) => s.id === session.user.id);
    
    if (!student) {
      return NextResponse.json({ success: false, message: "Student record not found" }, { status: 404 });
    }

    const allProgress = await getDB<any>("progress.json");
    const progress = allProgress.filter((p: any) => p.studentId === session.user.id);

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
