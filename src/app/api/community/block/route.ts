import { NextResponse } from "next/server";
import { getDB, saveDB, upsertDBRecord } from "@/lib/db";
import { getSession } from "@/lib/auth";
import type { CommunityBlock } from "@/lib/community";
import type { Student } from "@/types";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const blocks = await getDB<CommunityBlock>("community-blocks.json");
  const mine = blocks
    .filter((block) => block.blockerId === session.user.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json({ success: true, data: mine });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const blockedId = typeof body.blockedId === "string" ? body.blockedId.trim() : "";
  if (!blockedId) return NextResponse.json({ success: false, message: "Missing student to block." }, { status: 400 });
  if (blockedId === session.user.id) {
    return NextResponse.json({ success: false, message: "You can't block yourself." }, { status: 400 });
  }

  const students = await getDB<Student>("students.json");
  const target = students.find((item) => item.id === blockedId);
  if (!target) return NextResponse.json({ success: false, message: "Student not found." }, { status: 404 });

  const block: CommunityBlock = {
    id: `${session.user.id}__${blockedId}`,
    blockerId: session.user.id,
    blockedId,
    blockedName: target.name,
    createdAt: new Date().toISOString(),
  };

  await upsertDBRecord("community-blocks.json", block);
  return NextResponse.json({ success: true, data: block });
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const blockedId = typeof body.blockedId === "string" ? body.blockedId.trim() : "";
  if (!blockedId) return NextResponse.json({ success: false, message: "Missing student to unblock." }, { status: 400 });

  const blocks = await getDB<CommunityBlock>("community-blocks.json");
  const remaining = blocks.filter((block) => !(block.blockerId === session.user.id && block.blockedId === blockedId));
  await saveDB("community-blocks.json", remaining);

  return NextResponse.json({ success: true });
}
