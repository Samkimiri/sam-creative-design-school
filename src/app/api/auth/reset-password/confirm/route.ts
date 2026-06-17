import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import { getDB, saveDB } from "@/lib/db";
import {
  hashPasswordResetToken,
  isExpiredReset,
  type PasswordResetRecord,
} from "@/lib/passwordReset";
import type { Student } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const token = String(body.token || "").trim();
    const password = String(body.password || "");

    if (!token) {
      return NextResponse.json({ success: false, message: "Reset link is missing or invalid." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ success: false, message: "Password must be at least 6 characters." }, { status: 400 });
    }

    const tokenHash = hashPasswordResetToken(token);
    const resets = await getDB<PasswordResetRecord>("password-resets.json");
    const reset = resets.find((record) => record.tokenHash === tokenHash && !record.usedAt);

    if (!reset || isExpiredReset(reset)) {
      return NextResponse.json({ success: false, message: "This reset link has expired or was already used." }, { status: 400 });
    }

    const students = await getDB<Student>("students.json");
    const studentIndex = students.findIndex((student) => student.id === reset.studentId);

    if (studentIndex === -1) {
      return NextResponse.json({ success: false, message: "This reset link is no longer valid." }, { status: 400 });
    }

    const now = new Date().toISOString();
    students[studentIndex] = {
      ...students[studentIndex],
      password: await hashPassword(password),
    };

    await saveDB("students.json", students);
    await saveDB("password-resets.json", resets.map((record) =>
      record.studentId === reset.studentId && !record.usedAt
        ? { ...record, usedAt: now }
        : record
    ));

    return NextResponse.json({
      success: true,
      message: "Your password has been reset. You can now sign in with your new password.",
    });
  } catch (error) {
    console.error("Password reset confirm error:", error);
    return NextResponse.json(
      { success: false, message: "Could not reset password. Please try again." },
      { status: 500 }
    );
  }
}
