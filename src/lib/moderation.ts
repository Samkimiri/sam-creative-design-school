// Blocklist-based filter for the student community chat. It's intentionally
// simple (matching against a fixed list) rather than a full NLP moderation
// service - good enough to catch plain abusive language without needing a
// paid moderation API. Admins can still remove anything that slips through
// from the admin Community tab.
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

const SEPARATOR = "[\\s.\\-_*]*";

/**
 * For each blocked term, builds a pattern where separators (spaces, dots,
 * dashes, underscores, asterisks) are optionally allowed BETWEEN every one
 * of the term's own letters - so "fuck", "f u c k", "f.u.c.k", and (for a
 * multi-word term like "kill yourself") "k i l l y o u r s e l f" all match
 * the same pattern. Lookaround (not \b) bounds each match so it can't be
 * fooled by inserted separators right at the edge, and - critically - so a
 * match never extends into or swallows an adjacent, unrelated real word.
 */
const BLOCKED_PATTERN = new RegExp(
  BLOCKED_TERMS.map((term) => {
    const spelled = term.replace(/ /g, "").split("").map(escapeRegex).join(SEPARATOR);
    return `(?<![a-z])${spelled}(?![a-z])`;
  }).join("|"),
  "i"
);

// Unicode combining diacritical marks (U+0300-U+036F), stripped after NFKD
// decomposition so accented lookalikes ("fúck") normalize to their plain form.
const COMBINING_MARKS = new RegExp("[\\u0300-\\u036f]", "g");

/**
 * Undoes the cheapest ways to dodge the blocklist: accented/decomposable
 * unicode characters, common leetspeak substitutions (4->a, 3->e, 0->o, ...),
 * and a letter repeated for emphasis ("fuuuuck"). Every step preserves
 * character positions/word structure (no merging across unrelated words) -
 * BLOCKED_PATTERN's own separator-tolerance handles spelled-out spacing.
 * Still just a blocklist, not a full NLP filter - see file header.
 */
function normalizeForModeration(text: string): string {
  let normalized = text.normalize("NFKD").replace(COMBINING_MARKS, "").toLowerCase();

  normalized = normalized
    .replace(/@/g, "a")
    .replace(/0/g, "o")
    .replace(/[1!|]/g, "i")
    .replace(/3/g, "e")
    .replace(/4/g, "a")
    .replace(/[5$]/g, "s")
    .replace(/7/g, "t");

  // Collapse 3+ repeated letters down to one ("fuuuuck" -> "fuck")
  normalized = normalized.replace(/([a-z])\1{2,}/g, "$1");

  return normalized;
}

export function containsAbusiveLanguage(text: string): boolean {
  if (!text) return false;
  if (BLOCKED_PATTERN.test(text)) return true;
  return BLOCKED_PATTERN.test(normalizeForModeration(text));
}
