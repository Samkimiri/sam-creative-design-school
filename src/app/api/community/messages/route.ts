import { NextResponse } from "next/server";
import { getDB, saveDB, upsertDBRecord } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { containsAbusiveLanguage } from "@/lib/moderation";
import { isValidStickerId, purgeExpiredTrash, TRASH_RETENTION_MS, type CommunityMessage } from "@/lib/community";
import type { Student } from "@/types";

const MAX_MESSAGE_LENGTH = 500;
const RESPECT_MESSAGE = "That message isn't allowed here. Keep the community respectful.";

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const view = searchParams.get("view");

  const messages = await getDB<CommunityMessage>("community-messages.json");
  const { kept, changed } = purgeExpiredTrash(messages);
  if (changed) await saveDB("community-messages.json", kept);

  if (view === "trash") {
    const trash = kept
      .filter((message) => message.deletedBy === "student" && message.deletedAt && message.studentId === session.user.id)
      .sort((a, b) => new Date(b.deletedAt || 0).getTime() - new Date(a.deletedAt || 0).getTime());
    return NextResponse.json({ success: true, data: trash });
  }

  const visible = kept
    .filter((message) => !message.deletedAt)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .slice(-200);

  return NextResponse.json({ success: true, data: visible });
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const body = await request.json().catch(() => ({}));
    const rawText = typeof body.text === "string" ? body.text.trim().slice(0, MAX_MESSAGE_LENGTH) : "";
    const stickerId = typeof body.stickerId === "string" ? body.stickerId.trim() : "";

    if (!rawText && !stickerId) {
      return NextResponse.json({ success: false, message: "Write a message or pick a sticker." }, { status: 400 });
    }
    if (stickerId && !isValidStickerId(stickerId)) {
      return NextResponse.json({ success: false, message: "Unknown sticker." }, { status: 400 });
    }
    if (rawText && containsAbusiveLanguage(rawText)) {
      return NextResponse.json({ success: false, message: RESPECT_MESSAGE }, { status: 400 });
    }

    const students = await getDB<Student>("students.json");
    const student = students.find((item) => item.id === session.user.id);
    if (!student) {
      return NextResponse.json({ success: false, message: "Your account could not be found." }, { status: 401 });
    }

    const message: CommunityMessage = {
      id: `MSG-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      studentId: student.id,
      studentName: student.name || session.user.name || "Student",
      avatar: student.profileImage || student.avatar || null,
      role: student.role || "student",
      text: rawText || undefined,
      stickerId: stickerId || undefined,
      createdAt: new Date().toISOString(),
    };

    await upsertDBRecord("community-messages.json", message);

    return NextResponse.json({ success: true, data: message });
  } catch (error) {
    console.error("Community message POST error:", error);
    return NextResponse.json({ success: false, message: "Could not send your message. Please try again." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const body = await request.json().catch(() => ({}));
    const action = typeof body.action === "string" ? body.action : "edit";
    const messageId = typeof body.messageId === "string" ? body.messageId.trim() : "";
    if (!messageId) return NextResponse.json({ success: false, message: "Message ID is required" }, { status: 400 });

    const messages = await getDB<CommunityMessage>("community-messages.json");
    const index = messages.findIndex((item) => item.id === messageId);
    if (index === -1) return NextResponse.json({ success: false, message: "Message not found" }, { status: 404 });

    const message = messages[index];
    if (message.studentId !== session.user.id) {
      return NextResponse.json({ success: false, message: "You can only manage your own messages." }, { status: 403 });
    }

    if (action === "restore") {
      if (!message.deletedAt || message.deletedBy !== "student") {
        return NextResponse.json({ success: false, message: "This message isn't in your trash." }, { status: 400 });
      }
      const restored: CommunityMessage = { ...message, deletedAt: undefined, deletedBy: undefined, purgeAt: undefined };
      await upsertDBRecord("community-messages.json", restored);
      return NextResponse.json({ success: true, data: restored });
    }

    if (message.deletedAt) {
      return NextResponse.json({ success: false, message: "Restore this message before editing it." }, { status: 400 });
    }

    const newText = typeof body.text === "string" ? body.text.trim().slice(0, MAX_MESSAGE_LENGTH) : "";
    if (!newText) return NextResponse.json({ success: false, message: "Message cannot be empty." }, { status: 400 });
    if (containsAbusiveLanguage(newText)) {
      return NextResponse.json({ success: false, message: RESPECT_MESSAGE }, { status: 400 });
    }

    const edited: CommunityMessage = { ...message, text: newText, editedAt: new Date().toISOString() };
    await upsertDBRecord("community-messages.json", edited);
    return NextResponse.json({ success: true, data: edited });
  } catch (error) {
    console.error("Community message PATCH error:", error);
    return NextResponse.json({ success: false, message: "Could not update your message." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const body = await request.json().catch(() => ({}));
    const messageId = typeof body.messageId === "string" ? body.messageId.trim() : "";
    if (!messageId) return NextResponse.json({ success: false, message: "Message ID is required" }, { status: 400 });

    const messages = await getDB<CommunityMessage>("community-messages.json");
    const index = messages.findIndex((item) => item.id === messageId);
    if (index === -1) return NextResponse.json({ success: false, message: "Message not found" }, { status: 404 });

    const message = messages[index];
    const isOwner = message.studentId === session.user.id;
    const isAdmin = session.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return NextResponse.json({ success: false, message: "You can only delete your own messages." }, { status: 403 });
    }

    if (isAdmin && !isOwner) {
      messages.splice(index, 1);
      await saveDB("community-messages.json", messages);
      return NextResponse.json({ success: true, message: "Message removed by admin." });
    }

    if (message.deletedAt) {
      return NextResponse.json({ success: true, data: message });
    }

    const now = new Date();
    const deleted: CommunityMessage = {
      ...message,
      deletedAt: now.toISOString(),
      deletedBy: "student",
      purgeAt: new Date(now.getTime() + TRASH_RETENTION_MS).toISOString(),
    };
    await upsertDBRecord("community-messages.json", deleted);

    return NextResponse.json({ success: true, data: deleted, message: "Moved to your trash. Restorable for 24 hours." });
  } catch (error) {
    console.error("Community message DELETE error:", error);
    return NextResponse.json({ success: false, message: "Could not delete your message." }, { status: 500 });
  }
}
