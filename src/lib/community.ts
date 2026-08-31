export interface CommunityMessage {
  id: string;
  studentId: string;
  studentName: string;
  avatar?: string | null;
  role?: string;
  text?: string;
  stickerId?: string;
  createdAt: string;
  editedAt?: string;
  deletedAt?: string;
  deletedBy?: "student" | "admin";
  purgeAt?: string;
}

export const STICKERS: Record<string, { emoji: string; label: string }> = {
  cheer: { emoji: "🎉", label: "Cheer" },
  fire: { emoji: "🔥", label: "On fire" },
  clap: { emoji: "👏", label: "Applause" },
  strong: { emoji: "💪", label: "Keep going" },
  heart: { emoji: "❤️", label: "Love it" },
  laugh: { emoji: "😂", label: "Haha" },
  thumbsUp: { emoji: "👍", label: "Nice" },
  star: { emoji: "⭐", label: "Star work" },
  trophy: { emoji: "🏆", label: "Winning" },
  wave: { emoji: "👋", label: "Hello" },
};

export function isValidStickerId(id: string): boolean {
  return Object.prototype.hasOwnProperty.call(STICKERS, id);
}

// Africa/Nairobi is a fixed UTC+3 offset with no daylight saving.
const NAIROBI_OFFSET_MS = 3 * 60 * 60 * 1000;

export function isWeekend(dateIso: string): boolean {
  const time = new Date(dateIso).getTime();
  if (Number.isNaN(time)) return false;
  const localDay = new Date(time + NAIROBI_OFFSET_MS).getUTCDay();
  return localDay === 0 || localDay === 6;
}

export const TRASH_RETENTION_MS = 24 * 60 * 60 * 1000;

export function purgeExpiredTrash(messages: CommunityMessage[]): { kept: CommunityMessage[]; changed: boolean } {
  const now = Date.now();
  const kept = messages.filter((message) => {
    if (!message.deletedAt || message.deletedBy !== "student") return true;
    const purgeAt = message.purgeAt
      ? new Date(message.purgeAt).getTime()
      : new Date(message.deletedAt).getTime() + TRASH_RETENTION_MS;
    return purgeAt > now;
  });
  return { kept, changed: kept.length !== messages.length };
}

const POINTS_PER_WEEKEND_MESSAGES = 10;

export function getWeekendMessageCount(messages: CommunityMessage[], studentId: string): number {
  return messages.filter((message) => message.studentId === studentId && !message.deletedAt && isWeekend(message.createdAt))
    .length;
}

export function getCommunityPoints(messages: CommunityMessage[], studentId: string): number {
  return Math.floor(getWeekendMessageCount(messages, studentId) / POINTS_PER_WEEKEND_MESSAGES);
}
