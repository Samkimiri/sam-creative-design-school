export function getSafeNextPath(): string {
  if (typeof window === "undefined") return "";

  const next = new URLSearchParams(window.location.search).get("next") || "";
  if (!next.startsWith("/") || next.startsWith("//") || next.startsWith("/api")) return "";
  return next;
}

export function withNextPath(href: string): string {
  const next = getSafeNextPath();
  return next ? `${href}?next=${encodeURIComponent(next)}` : href;
}
