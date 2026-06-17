import { NextResponse } from "next/server";
import { findDBRecordByField, getDB, saveDB } from "@/lib/db";
import { sendPasswordResetEmail } from "@/lib/email";
import {
  createPasswordResetToken,
  passwordResetTokenTtlMs,
  type PasswordResetRecord,
} from "@/lib/passwordReset";
import type { Student } from "@/types";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const genericMessage = "If this email is registered, password reset instructions will be sent.";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = String(body.email || "").trim().toLowerCase();

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Enter a valid email address." },
        { status: 400 }
      );
    }

    const student = await findDBRecordByField<Student>("students.json", "email", email);

    if (student?.id && student.password) {
      const { token, tokenHash } = createPasswordResetToken();
      const now = new Date();
      const expiresAt = new Date(now.getTime() + passwordResetTokenTtlMs);
      const existingResets = await getDB<PasswordResetRecord>("password-resets.json");
      const resetRecord: PasswordResetRecord = {
        id: `RESET-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        studentId: student.id,
        email,
        tokenHash,
        createdAt: now.toISOString(),
        expiresAt: expiresAt.toISOString(),
      };
      const resetUrl = new URL("/auth/reset-password", request.url);
      resetUrl.searchParams.set("token", token);

      await saveDB("password-resets.json", [
        resetRecord,
        ...existingResets
          .map((record) => record.studentId === student.id && !record.usedAt
            ? { ...record, usedAt: now.toISOString() }
            : record
          )
          .filter((record) => new Date(record.expiresAt).getTime() > now.getTime() - 24 * 60 * 60 * 1000),
      ].slice(0, 100));

      const emailResult = await sendPasswordResetEmail({
        to: student.email,
        studentName: student.name || "Student",
        resetUrl: resetUrl.toString(),
        expiresInMinutes: Math.round(passwordResetTokenTtlMs / 60000),
      });

      if (!emailResult.sent && process.env.NODE_ENV !== "production") {
        return NextResponse.json({
          success: true,
          message: genericMessage,
          resetUrl: resetUrl.toString(),
        });
      }
    }

    return NextResponse.json({ success: true, message: genericMessage });
  } catch {
    return NextResponse.json(
      { success: false, message: "Could not process this request. Please try again." },
      { status: 500 }
    );
  }
}
