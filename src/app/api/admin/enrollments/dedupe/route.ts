import { NextResponse } from "next/server";
import { deleteDBRecord, getDB } from "@/lib/db";
import { requireFullAdminRequest } from "@/lib/adminAuth";
import { logAdminAction } from "@/lib/auditLog";
import type { Enrollment } from "@/types";

interface DuplicateGroup {
  studentName: string;
  courseName: string;
  keepId: string;
  removeIds: string[];
}

const STATUS_RANK: Record<string, number> = {
  confirmed: 3,
  pending: 2,
  rejected: 1,
  revoked: 1,
  failed: 0,
};

/**
 * Picks which record in a duplicate group is worth keeping: confirmed beats
 * pending beats rejected/revoked, real M-Pesa reconciliation data beats none,
 * and the most recently created record wins any remaining tie.
 */
function pickRecordToKeep(records: Enrollment[]): Enrollment {
  return [...records].sort((a, b) => {
    const rankDiff = (STATUS_RANK[b.status] ?? 0) - (STATUS_RANK[a.status] ?? 0);
    if (rankDiff !== 0) return rankDiff;

    const receiptDiff = Number(Boolean(b.mpesaReceiptNumber)) - Number(Boolean(a.mpesaReceiptNumber));
    if (receiptDiff !== 0) return receiptDiff;

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  })[0];
}

// Only records that are true literal duplicates - the exact same signed-in
// student submitting the exact same course selection more than once - are
// grouped. Records that legitimately cover different courses, or belong to
// students without a linked account, are left alone; merging those would
// risk losing real, distinct enrollment history.
function findDuplicateGroups(enrollments: Enrollment[]): { group: Enrollment[]; key: string }[] {
  const byKey = new Map<string, Enrollment[]>();

  for (const enrollment of enrollments) {
    if (!enrollment.studentId) continue;
    const key = `${enrollment.studentId}::${enrollment.courseId}`;
    const existing = byKey.get(key) ?? [];
    existing.push(enrollment);
    byKey.set(key, existing);
  }

  return Array.from(byKey.entries())
    .filter(([, group]) => group.length > 1)
    .map(([key, group]) => ({ key, group }));
}

async function buildDuplicateGroups(): Promise<{ enrollments: Enrollment[]; groups: DuplicateGroup[] }> {
  const enrollments = await getDB<Enrollment>("enrollments.json");
  const duplicates = findDuplicateGroups(enrollments);

  const groups: DuplicateGroup[] = duplicates.map(({ group }) => {
    const keep = pickRecordToKeep(group);
    return {
      studentName: keep.studentName,
      courseName: keep.courseName,
      keepId: keep.id,
      removeIds: group.filter((item) => item.id !== keep.id).map((item) => item.id),
    };
  });

  return { enrollments, groups };
}

export async function POST(request: Request) {
  const auth = await requireFullAdminRequest(request);
  if ("response" in auth) return auth.response;

  const confirm = auth.body.confirm === true;
  const { groups } = await buildDuplicateGroups();
  const removeCount = groups.reduce((sum, group) => sum + group.removeIds.length, 0);

  if (!confirm) {
    return NextResponse.json({
      success: true,
      data: {
        applied: false,
        duplicateGroupCount: groups.length,
        recordsToRemove: removeCount,
        groups,
      },
    });
  }

  if (removeCount === 0) {
    return NextResponse.json({
      success: true,
      data: { applied: true, duplicateGroupCount: 0, recordsToRemove: 0, groups: [] },
    });
  }

  for (const group of groups) {
    for (const id of group.removeIds) {
      await deleteDBRecord("enrollments.json", id);
    }
  }

  await logAdminAction({
    actorId: auth.actor.id,
    actorName: auth.actor.name,
    actorRole: auth.actor.role,
    action: "enrollments.deduplicated",
    targetType: "enrollment",
    details: `Removed ${removeCount} duplicate enrollment record(s) across ${groups.length} student/course pair(s).`,
  });

  return NextResponse.json({
    success: true,
    data: { applied: true, duplicateGroupCount: groups.length, recordsToRemove: removeCount, groups },
  });
}
