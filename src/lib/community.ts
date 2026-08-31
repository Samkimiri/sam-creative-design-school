export interface CommunityReplyPreview {
  studentId: string;
  studentName: string;
  text?: string;
  stickerId?: string;
}

export interface CommunityMessage {
  id: string;
  studentId: string;
  studentName: string;
  avatar?: string | null;
  role?: string;
  text?: string;
  stickerId?: string;
  /** Missing on very old records means "public" - treat undefined as public everywhere. */
  visibility?: "public" | "private";
  recipientId?: string;
  recipientName?: string;
  replyToId?: string;
  replyPreview?: CommunityReplyPreview;
  mentionIds?: string[];
  createdAt: string;
  editedAt?: string;
  deletedAt?: string;
  deletedBy?: "student" | "admin";
  purgeAt?: string;
}

export function isPrivateMessage(message: CommunityMessage): boolean {
  return message.visibility === "private";
}

export interface CommunityBlock {
  id: string;
  blockerId: string;
  blockedId: string;
  blockedName: string;
  createdAt: string;
}

export function isBlockedBy(blocks: CommunityBlock[], blockerId: string, blockedId: string): boolean {
  return blocks.some((block) => block.blockerId === blockerId && block.blockedId === blockedId);
}

/** Resolves @FirstName mentions in a message against a roster of known participants. */
export function resolveMentions(text: string, roster: { id: string; name: string }[]): string[] {
  const tokens = Array.from(text.matchAll(/@(\w+)/g)).map((match) => match[1].toLowerCase());
  if (tokens.length === 0) return [];

  const ids = new Set<string>();
  for (const token of tokens) {
    const match = roster.find((person) => person.name.trim().split(/\s+/)[0]?.toLowerCase() === token);
    if (match) ids.add(match.id);
  }
  return [...ids];
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
  return messages.filter(
    (message) => message.studentId === studentId && !message.deletedAt && !isPrivateMessage(message) && isWeekend(message.createdAt)
  ).length;
}

export function getCommunityPoints(messages: CommunityMessage[], studentId: string): number {
  return Math.floor(getWeekendMessageCount(messages, studentId) / POINTS_PER_WEEKEND_MESSAGES);
}

export interface CommunityNotificationSummary {
  unreadCount: number;
  hasMention: boolean;
  hasPrivate: boolean;
  latestMessage?: CommunityMessage;
}

export function getUnreadSummary(
  messages: CommunityMessage[],
  blocks: CommunityBlock[],
  currentUserId: string,
  lastSeenAt: string | undefined
): CommunityNotificationSummary {
  const since = lastSeenAt ? new Date(lastSeenAt).getTime() : 0;

  const relevant = messages.filter((message) => {
    if (message.deletedAt || message.studentId === currentUserId) return false;
    if (new Date(message.createdAt).getTime() <= since) return false;
    if (isPrivateMessage(message)) return message.recipientId === currentUserId;
    return !isBlockedBy(blocks, currentUserId, message.studentId);
  });

  const sorted = [...relevant].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return {
    unreadCount: relevant.length,
    hasMention: relevant.some((message) => message.mentionIds?.includes(currentUserId)),
    hasPrivate: relevant.some((message) => isPrivateMessage(message)),
    latestMessage: sorted[0],
  };
}
