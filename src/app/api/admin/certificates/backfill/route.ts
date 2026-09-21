import { NextResponse } from "next/server";
import { requireFullAdminRequest } from "@/lib/adminAuth";
import { logAdminAction } from "@/lib/auditLog";
import { backfillCompletionStamps } from "@/lib/completionStamp";

// Records a completion date for every student who finished a course before completion
// dates were tracked, so their certificates and verification results carry one.
// Certificates themselves are drawn from the current design on every download, so
// earlier finishers already get the new look - this only fills in the missing date.
export async function POST(request: Request) {
  const auth = await requireFullAdminRequest(request);
  if ("response" in auth) return auth.response;

  const result = await backfillCompletionStamps();

  await logAdminAction({
    actorId: auth.actor.id,
    actorName: auth.actor.name,
    actorRole: auth.actor.role,
    action: "certificates.backfill",
    targetType: "certificates",
    details: `Checked ${result.checked} progress records, dated ${result.stamped} earlier completions (${result.failed} failed)`,
  });

  return NextResponse.json({ success: true, data: result });
}
