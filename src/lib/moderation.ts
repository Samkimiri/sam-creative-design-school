// Blocklist-based filter for the student community chat. It's intentionally
// simple (word-boundary matching against a fixed list) rather than a full
// NLP moderation service - good enough to catch plain abusive language
// without needing a paid moderation API. Admins can still remove anything
// that slips through from the admin Community tab.
const BLOCKED_TERMS = [
  "fuck",
  "fucking",
  "fucker",
  "shit",
  "bullshit",
  "bitch",
  "asshole",
  "bastard",
  "dick",
  "pussy",
  "cunt",
  "slut",
  "whore",
  "faggot",
  "retard",
  "retarded",
  "nigger",
  "nigga",
  "kike",
  "chink",
  "spic",
  "tranny",
  "rape",
  "kys",
  "kill yourself",
  "malaya",
  "mjinga",
  "shenzi",
  "pumbavu",
  "kumaa",
  "mkundu",
];

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const BLOCKED_PATTERN = new RegExp(
  `\\b(${BLOCKED_TERMS.map(escapeRegex).join("|")})\\b`,
  "i"
);

export function containsAbusiveLanguage(text: string): boolean {
  if (!text) return false;
  return BLOCKED_PATTERN.test(text);
}
