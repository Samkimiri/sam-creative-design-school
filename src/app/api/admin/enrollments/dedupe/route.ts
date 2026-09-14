import { NextResponse } from "next/server";
import { deleteDBRecord, getDB } from "@/lib/db";
import { requireFullAdminRequest } from "@/lib/adminAuth";
import { logAdminAction } from "@/lib/auditLog";
import { enrollmentMatchesStudent, normalizeEmail, normalizeId, normalizePhone } from "@/lib/enrollmentAccess";
import type { Enrollment, Student } from "@/types";

/**
 * Tiny disjoint-set (union-find) so enrollment records can be clustered into
 * "same real person" groups even when they don't all share the SAME single
 * identity field - e.g. record A and B share an email, B and C share a
 * phone number, so A/B/C all end up in one cluster even though A and C
 * share nothing directly.
 */
class DisjointSet {
  private parent = new Map<number, number>();

  find(x: number): number {
    if (!this.parent.has(x)) this.parent.set(x, x);
    const p = this.parent.get(x) as number;
    if (p !== x) {
      const root = this.find(p);
      this.parent.set(x, root);
      return root;
    }
    return x;
  }

  union(a: number, b: number) {
    const rootA = this.find(a);
    const rootB = this.find(b);
    if (rootA !== rootB) this.parent.set(rootA, rootB);
  }
}

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
 * Picks which record in a duplicate group is worth keeping. A record that
 * actually resolves to a real student account always wins first - e.g. an
 * enrollment approved before the student had linked an account (its
 * accessGrantMessage says so) is real payment history, but it isn't doing
 * anything useful sitting on its own unlinked row, so the record that's
 * actually tied to the account takes priority even over a receipt or a
 * "confirmed" label. After that: confirmed beats pending beats
 * rejected/revoked, real M-Pesa reconciliation data beats none, and the
 * most recently created record wins any remaining tie.
 */
function pickRecordToKeep(records: Enrollment[], students: Student[]): Enrollment {
  return [...records].sort((a, b) => {
    const aLinked = Number(students.some((s) => enrollmentMatchesStudent(a, s, students)));
    const bLinked = Number(students.some((s) => enrollmentMatchesStudent(b, s, students)));
    if (aLinked !== bLinked) return bLinked - aLinked;

    const rankDiff = (STATUS_RANK[b.status] ?? 0) - (STATUS_RANK[a.status] ?? 0);
    if (rankDiff !== 0) return rankDiff;

    const receiptDiff = Number(Boolean(b.mpesaReceiptNumber)) - Number(Boolean(a.mpesaReceiptNumber));
    if (receiptDiff !== 0) return receiptDiff;

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  })[0];
}

// Two records are treated as "the same person" primarily by studentId - the
// one signal that's never ambiguous between two different real accounts.
// Email/phone are then used ONLY to rescue "orphan" records (no valid
// studentId - e.g. an enrollment approved before the student had linked an
// account) into the one grounded (has a valid studentId) cluster they match,
// which is exactly the gap that let a legacy backfilled record and its
// never-linked MPESA duplicate go undetected as duplicates of each other.
// Email/phone are deliberately NOT used to merge two records that both
// already have a valid, DIFFERENT studentId - that would risk quietly
// merging two genuinely distinct student accounts (e.g. two people, or one
// person's two separate registrations, that happen to share a phone number)
// rather than cleaning up one person's duplicate submission.
function findDuplicateGroups(enrollments: Enrollment[]): Enrollment[][] {
  const ds = new DisjointSet();
  const hasValidStudentId = enrollments.map((enrollment) => {
    const studentId = normalizeId(enrollment.studentId);
    return Boolean(studentId && studentId !== "guest");
  });

  const byStudentId = new Map<string, number[]>();
  enrollments.forEach((enrollment, index) => {
    if (!hasValidStudentId[index]) return;
    const studentId = normalizeId(enrollment.studentId);
    const existing = byStudentId.get(studentId) ?? [];
    existing.forEach((otherIndex) => ds.union(index, otherIndex));
    existing.push(index);
    byStudentId.set(studentId, existing);
  });

  const rescueOrphans = (getKey: (enrollment: Enrollment) => string) => {
    const byKey = new Map<string, number[]>();
    enrollments.forEach((enrollment, index) => {
      const key = getKey(enrollment);
      if (!key) return;
      const existing = byKey.get(key) ?? [];
      existing.push(index);
      byKey.set(key, existing);
    });

    for (const indices of byKey.values()) {
      if (indices.length < 2) continue;
      const groundedRoots = new Set(indices.filter((i) => hasValidStudentId[i]).map((i) => ds.find(i)));
      // Spans two or more already-distinct real accounts - ambiguous, leave alone.
      if (groundedRoots.size > 1) continue;
      const anchor = groundedRoots.size === 1 ? [...groundedRoots][0] : ds.find(indices[0]);
      indices.forEach((index) => ds.union(index, anchor));
    }
  };

  rescueOrphans((enrollment) => normalizeEmail(enrollment.studentEmail));
  rescueOrphans((enrollment) => normalizePhone(enrollment.phone));

  const byClusterAndCourse = new Map<string, Enrollment[]>();
  enrollments.forEach((enrollment, index) => {
    const clusterRoot = ds.find(index);
    const key = `${clusterRoot}::${enrollment.courseId}`;
    const existing = byClusterAndCourse.get(key) ?? [];
    existing.push(enrollment);
    byClusterAndCourse.set(key, existing);
  });

  return Array.from(byClusterAndCourse.values()).filter((group) => group.length > 1);
}

async function buildDuplicateGroups(): Promise<{ enrollments: Enrollment[]; groups: DuplicateGroup[] }> {
  const [enrollments, students] = await Promise.all([
    getDB<Enrollment>("enrollments.json"),
    getDB<Student>("students.json"),
  ]);
  const duplicates = findDuplicateGroups(enrollments);

  const groups: DuplicateGroup[] = duplicates.map((group) => {
    const keep = pickRecordToKeep(group, students);
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
