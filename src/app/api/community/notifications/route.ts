import { NextResponse } from "next/server";
import { getDB, upsertDBRecord } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { getUnreadSummary, type CommunityBlock, type CommunityMessage } from "@/lib/community";
import type { Student } from "@/types";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const [messages, blocks, students] = await Promise.all([
    getDB<CommunityMessage>("community-messages.json"),
    getDB<CommunityBlock>("community-blocks.json"),
    getDB<Student>("students.json"),
  ]);

  const student = students.find((item) => item.id === session.user.id);
  const summary = getUnreadSummary(messages, blocks, session.user.id, student?.communityLastSeenAt);

  return NextResponse.json(
    { success: true, data: summary },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}

export async function POST() {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const students = await getDB<Student>("students.json");
  const student = students.find((item) => item.id === session.user.id);
  if (!student) return NextResponse.json({ success: false, message: "Account not found." }, { status: 404 });

  const updated: Student = { ...student, communityLastSeenAt: new Date().toISOString() };
  await upsertDBRecord("students.json", updated);

  return NextResponse.json({ success: true });
}
