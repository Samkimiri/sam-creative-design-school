import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { appendDBRecord, getDB, getDBRecord, saveDB } from "@/lib/db";
import type { AlumniReferral, Student } from "@/types";

export async function GET() {
  const referrals = await getDB<AlumniReferral>("alumni-referrals.json");
  const sorted = [...referrals].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return NextResponse.json(
    { success: true, data: sorted.slice(0, 100) },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Sign in to post an opportunity." }, { status: 401 });
  }

  const student = await getDBRecord<Student>("students.json", session.user.id);
  if (!student?.isAlumni) {
    return NextResponse.json(
      { success: false, message: "Only Alumni Network members can post opportunities." },
      { status: 403 }
    );
  }

  const body = await request.json().catch(() => ({}));
  const title = String(body.title || "").trim().slice(0, 120);
  const company = String(body.company || "").trim().slice(0, 80);
  const description = String(body.description || "").trim().slice(0, 500);
  const contactInfo = String(body.contactInfo || "").trim().slice(0, 160);

  if (!title || !description || !contactInfo) {
    return NextResponse.json(
      { success: false, message: "Title, description, and contact info are required." },
      { status: 400 }
    );
  }

  const referral: AlumniReferral = {
    id: `REF-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    postedByStudentId: student.id,
    postedByName: student.name,
    title,
    company: company || undefined,
    description,
    contactInfo,
    createdAt: new Date().toISOString(),
  };

  await appendDBRecord("alumni-referrals.json", referral);

  return NextResponse.json({ success: true, data: referral });
}

export async function DELETE(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Sign in required." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const id = String(body.id || "").trim();
  if (!id) {
    return NextResponse.json({ success: false, message: "id is required." }, { status: 400 });
  }

  const referrals = await getDB<AlumniReferral>("alumni-referrals.json");
  const index = referrals.findIndex((item) => item.id === id);
  if (index === -1) {
    return NextResponse.json({ success: false, message: "Post not found." }, { status: 404 });
  }

  const isOwner = referrals[index].postedByStudentId === session.user.id;
  const isAdmin = session.user.role === "admin";
  if (!isOwner && !isAdmin) {
    return NextResponse.json({ success: false, message: "You can only remove your own posts." }, { status: 403 });
  }

  referrals.splice(index, 1);
  await saveDB("alumni-referrals.json", referrals);

  return NextResponse.json({ success: true });
}
