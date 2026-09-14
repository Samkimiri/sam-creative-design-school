import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import { getDB, saveDB } from "@/lib/db";
import {
  hashPasswordResetToken,
  isExpiredReset,
  type PasswordResetRecord,
} from "@/lib/passwordReset";
import { clearFailedAttempts, isRateLimited, recordFailedAttempt } from "@/lib/rateLimit";
import { validatePasswordStrength } from "@/lib/passwordPolicy";
import type { Student } from "@/types";

// The 6-digit code is only 1,000,000 combinations - without this, a script
// that knows a victim's email could brute-force it well within the code's
// own 30-minute expiry window. Tighter than the login limiter since this is
// guessing a short numeric code, not a real password.
const RESET_CODE_RATE_LIMIT = { maxAttempts: 8, windowMs: 30 * 60 * 1000 };

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const token = String(body.token || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const resetCode = String(body.resetCode || body.code || "").replace(/\D/g, "");
    const password = String(body.password || "");

    if (!token && (!email || resetCode.length !== 6)) {
      return NextResponse.json({ success: false, message: "Enter the reset code sent to your email." }, { status: 400 });
    }

    const passwordError = validatePasswordStrength(password);
    if (passwordError) {
      return NextResponse.json({ success: false, message: passwordError }, { status: 400 });
    }

    // Only the guessable 6-digit code path is rate-limited - a reset token
    // from an emailed link is a long random string, not realistically
    // brute-forceable, so there's nothing useful to throttle there.
    const rateLimitKey = !token && email ? `reset-code:${email}` : "";
    if (rateLimitKey && (await isRateLimited(rateLimitKey, RESET_CODE_RATE_LIMIT))) {
      return NextResponse.json(
        { success: false, message: "Too many attempts. Please request a new reset code and try again later." },
        { status: 429 }
      );
    }

    const resets = await getDB<PasswordResetRecord>("password-resets.json");
    const tokenHash = token ? hashPasswordResetToken(token) : "";
    const codeHash = resetCode ? hashPasswordResetToken(resetCode) : "";
    const reset = resets.find((record) => {
      if (record.usedAt) return false;
      if (tokenHash && record.tokenHash === tokenHash) return true;
      return Boolean(
        codeHash &&
          record.codeHash === codeHash &&
          record.email.toLowerCase() === email
      );
    });

    if (!reset || isExpiredReset(reset)) {
      if (rateLimitKey) await recordFailedAttempt(rateLimitKey, RESET_CODE_RATE_LIMIT);
      return NextResponse.json({ success: false, message: "This reset link or code has expired or was already used." }, { status: 400 });
    }

    if (rateLimitKey) await clearFailedAttempts(rateLimitKey);

    const students = await getDB<Student>("students.json");
    const studentIndex = students.findIndex((student) => student.id === reset.studentId);

    if (studentIndex === -1) {
      return NextResponse.json({ success: false, message: "This reset link or code is no longer valid." }, { status: 400 });
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
