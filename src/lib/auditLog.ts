import { getDB, upsertDBRecord } from "@/lib/db";

export interface AuditLogEntry {
  id: string;
  actorId: string;
  actorName: string;
  actorRole: string;
  action: string;
  targetType?: string;
  targetId?: string;
  targetLabel?: string;
  details?: string;
  createdAt: string;
}

/** Best-effort: a logging failure should never block the admin action itself. */
export async function logAdminAction(entry: Omit<AuditLogEntry, "id" | "createdAt">): Promise<void> {
  try {
    const record: AuditLogEntry = {
      id: `LOG-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      ...entry,
      createdAt: new Date().toISOString(),
    };
    await upsertDBRecord("admin-audit-log.json", record);
  } catch (error) {
    console.error("Audit log write failed (non-fatal):", error);
  }
}

export async function getRecentAuditLog(limit = 200): Promise<AuditLogEntry[]> {
  const entries = await getDB<AuditLogEntry>("admin-audit-log.json");
  return [...entries]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}
