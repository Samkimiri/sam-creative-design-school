import { deleteDBRecord, getDB, upsertDBRecord } from "@/lib/db";

const RATE_LIMIT_FILE = "rate-limits.json";

interface RateLimitRecord {
  id: string;
  attempts: number;
  windowStart: string;
}

export interface RateLimitOptions {
  maxAttempts: number;
  windowMs: number;
}

// Only FAILED attempts are ever recorded here (see callers) - a login or
// admin-password check that succeeds never touches this counter. That's
// deliberate: the admin dashboard resends the same shared password on every
// single request while a session is open, so counting every request (not
// just wrong ones) would lock out normal use almost immediately. Counting
// only failures still stops brute-forcing, since a real guesser is wrong far
// more often than they're right.

export async function isRateLimited(key: string, options: RateLimitOptions): Promise<boolean> {
  const records = await getDB<RateLimitRecord>(RATE_LIMIT_FILE);
  const record = records.find((item) => item.id === key);
  if (!record) return false;

  const windowStart = new Date(record.windowStart).getTime();
  if (Date.now() - windowStart > options.windowMs) return false;

  return record.attempts >= options.maxAttempts;
}

export async function recordFailedAttempt(key: string, options: RateLimitOptions): Promise<void> {
  try {
    const records = await getDB<RateLimitRecord>(RATE_LIMIT_FILE);
    const record = records.find((item) => item.id === key);
    const now = Date.now();

    if (!record || now - new Date(record.windowStart).getTime() > options.windowMs) {
      await upsertDBRecord(RATE_LIMIT_FILE, { id: key, attempts: 1, windowStart: new Date(now).toISOString() });
      return;
    }

    await upsertDBRecord(RATE_LIMIT_FILE, { ...record, attempts: record.attempts + 1 });
  } catch (error) {
    // Rate limiting must never be the reason a real login/reset request 500s.
    console.error("recordFailedAttempt error (non-fatal):", error);
  }
}

export async function clearFailedAttempts(key: string): Promise<void> {
  await deleteDBRecord(RATE_LIMIT_FILE, key).catch(() => {});
}
