import crypto from "crypto";

export interface PasswordResetRecord {
  id: string;
  studentId: string;
  email: string;
  tokenHash: string;
  codeHash?: string;
  createdAt: string;
  expiresAt: string;
  usedAt?: string;
}

export const passwordResetTokenTtlMs = 30 * 60 * 1000;

export function createPasswordResetToken() {
  const token = crypto.randomBytes(32).toString("base64url");
  const code = String(crypto.randomInt(100000, 1000000));
  return {
    code,
    codeHash: hashPasswordResetToken(code),
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
