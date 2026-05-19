import { NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/db";
import type { Student } from "@/types";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, newPassword } = await request.json();
    if (!email) return NextResponse.json({ success: false, message: "Email is required" }, { status: 400 });

    const students = readJSON<Student>("students.json");
    const idx = students.findIndex((s) => s.email.toLowerCase() === email.toLowerCase());

    if (idx > -1) {
      // In a real app, we'd send an email. For this mock, we update immediately if requested.
      if (newPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        students[idx].password = hashedPassword;
        writeJSON("students.json", students);
        return NextResponse.json({ success: true, message: "Password updated successfully" });
      }
      return NextResponse.json({ success: true, message: "Reset link sent (simulated)" });
    }

    return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 });
  } catch {
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
  }
}
