import { NextResponse } from "next/server";
import { requireFullAdminRequest } from "@/lib/adminAuth";
import { getRecentAuditLog } from "@/lib/auditLog";

export async function POST(request: Request) {
  const auth = await requireFullAdminRequest(request);
  if ("response" in auth) return auth.response;

  const entries = await getRecentAuditLog(200);

  return NextResponse.json(
    { success: true, data: entries },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}
