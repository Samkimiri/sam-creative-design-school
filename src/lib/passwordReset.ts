import crypto from "crypto";

export interface PasswordResetRecord {
  id: string;
  studentId: string;
  email: string;
  tokenHash: string;
  createdAt: string;
  expiresAt: string;
  usedAt?: string;
}

export const passwordResetTokenTtlMs = 30 * 60 * 1000;

export function createPasswordResetToken() {
  const token = crypto.randomBytes(32).toString("base64url");
  return {
    token,
    tokenHash: hashPasswordResetToken(token),
  };
}

export function hashPasswordResetToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function isExpiredReset(record: PasswordResetRecord, now = new Date()) {
  return new Date(record.expiresAt).getTime() <= now.getTime();
}
