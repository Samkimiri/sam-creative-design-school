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
const emailUnavailableMessage = "Password reset email is not configured yet. Please contact SCDS support for help resetting your password.";

function getResetBaseUrl(request: Request) {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configuredUrl) return configuredUrl.replace(/\/$/, "");
  return new URL(request.url).origin;
}

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

    // Some accounts (e.g. enrolled by admin, or created before a password was
    // set) have no password yet. Reset still issues a token for them so this
    // flow doubles as "set my password", not just "change my password".
    if (student?.id) {
      const { code, codeHash, token, tokenHash } = createPasswordResetToken();
      const now = new Date();
      const expiresAt = new Date(now.getTime() + passwordResetTokenTtlMs);
      const existingResets = await getDB<PasswordResetRecord>("password-resets.json");
      const resetRecord: PasswordResetRecord = {
        id: `RESET-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        studentId: student.id,
        email,
        tokenHash,
        codeHash,
        createdAt: now.toISOString(),
        expiresAt: expiresAt.toISOString(),
      };
      const resetUrl = new URL("/auth/reset-password", getResetBaseUrl(request));
      resetUrl.searchParams.set("token", token);
      const nextResets = [
        resetRecord,
        ...existingResets
          .map((record) => record.studentId === student.id && !record.usedAt
            ? { ...record, usedAt: now.toISOString() }
            : record
          )
          .filter((record) => new Date(record.expiresAt).getTime() > now.getTime() - 24 * 60 * 60 * 1000),
      ].slice(0, 100);

      await saveDB("password-resets.json", nextResets);

      const emailResult = await sendPasswordResetEmail({
        to: student.email,
        studentName: student.name || "Student",
        resetCode: code,
        resetUrl: resetUrl.toString(),
        expiresInMinutes: Math.round(passwordResetTokenTtlMs / 60000),
      });

      if (!emailResult.sent) {
        if (process.env.NODE_ENV === "production") {
          return NextResponse.json(
            {
              success: false,
              message: emailResult.reason === "missing-provider"
                ? emailUnavailableMessage
                : "Could not send reset instructions right now. Please try again or contact SCDS support.",
            },
            { status: 503 }
          );
        }

        return NextResponse.json({
          success: true,
          message: `${genericMessage} Email delivery is not configured locally, so use the test code or link below.`,
          resetCode: code,
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
