import { NextResponse } from "next/server";
import { deleteDBRecord, getDB, saveDB, upsertDBRecord } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { containsAbusiveLanguage } from "@/lib/moderation";
import {
  isBlockedBy,
  isPrivateMessage,
  isValidStickerId,
  isWithinCooldown,
  MESSAGE_COOLDOWN_MS,
  purgeExpiredTrash,
  resolveMentions,
  TRASH_RETENTION_MS,
  type CommunityBlock,
  type CommunityMessage,
} from "@/lib/community";
import type { Student } from "@/types";

const MAX_MESSAGE_LENGTH = 500;
const RESPECT_MESSAGE = "That message isn't allowed here. Keep the community respectful.";

function buildReplyPreview(original: CommunityMessage | undefined) {
  if (!original) return undefined;
  return {
    studentId: original.studentId,
    studentName: original.studentName,
    text: original.text ? original.text.slice(0, 140) : undefined,
    stickerId: original.stickerId,
  };
}

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const view = searchParams.get("view") || "public";
  const withId = searchParams.get("with") || "";

  const [messages, blocks] = await Promise.all([
    getDB<CommunityMessage>("community-messages.json"),
    getDB<CommunityBlock>("community-blocks.json"),
  ]);
  const { kept, changed } = purgeExpiredTrash(messages);
  if (changed) await saveDB("community-messages.json", kept);

  if (view === "trash") {
    const trash = kept
      .filter((message) => message.deletedBy === "student" && message.deletedAt && message.studentId === session.user.id)
      .sort((a, b) => new Date(b.deletedAt || 0).getTime() - new Date(a.deletedAt || 0).getTime());
    return NextResponse.json({ success: true, data: trash });
  }

  if (view === "dmList") {
    const myPrivate = kept.filter(
      (message) => !message.deletedAt && isPrivateMessage(message) &&
        (message.studentId === session.user.id || message.recipientId === session.user.id)
    );
    const partners = new Map<string, { id: string; name: string; avatar?: string | null; lastMessage: CommunityMessage }>();
    for (const message of myPrivate) {
      const isMine = message.studentId === session.user.id;
      const partnerId = isMine ? message.recipientId || "" : message.studentId;
      const partnerName = isMine ? message.recipientName || "Student" : message.studentName;
      const partnerAvatar = isMine ? undefined : message.avatar;
      if (!partnerId) continue;
      const existing = partners.get(partnerId);
      if (!existing || new Date(message.createdAt).getTime() > new Date(existing.lastMessage.createdAt).getTime()) {
        partners.set(partnerId, { id: partnerId, name: partnerName, avatar: partnerAvatar, lastMessage: message });
      }
    }
    const list = [...partners.values()].sort(
      (a, b) => new Date(b.lastMessage.createdAt).getTime() - new Date(a.lastMessage.createdAt).getTime()
    );
    return NextResponse.json({ success: true, data: list });
  }

  if (view === "dm") {
    if (!withId) return NextResponse.json({ success: false, message: "Missing conversation partner." }, { status: 400 });
    const thread = kept
      .filter(
        (message) =>
          !message.deletedAt &&
          isPrivateMessage(message) &&
          ((message.studentId === session.user.id && message.recipientId === withId) ||
            (message.studentId === withId && message.recipientId === session.user.id))
      )
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    return NextResponse.json({ success: true, data: thread });
  }

  const myBlocks = blocks.filter((block) => block.blockerId === session.user.id).map((block) => block.blockedId);
  const visible = kept
    .filter((message) => !message.deletedAt && !isPrivateMessage(message) && !myBlocks.includes(message.studentId))
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
    const replyToId = typeof body.replyToId === "string" ? body.replyToId.trim() : "";
    const recipientId = typeof body.recipientId === "string" ? body.recipientId.trim() : "";

    if (!rawText && !stickerId) {
      return NextResponse.json({ success: false, message: "Write a message or pick a sticker." }, { status: 400 });
    }
    if (stickerId && !isValidStickerId(stickerId)) {
      return NextResponse.json({ success: false, message: "Unknown sticker." }, { status: 400 });
    }
    if (rawText && containsAbusiveLanguage(rawText)) {
      return NextResponse.json({ success: false, message: RESPECT_MESSAGE }, { status: 400 });
    }
    if (recipientId && recipientId === session.user.id) {
      return NextResponse.json({ success: false, message: "You can't send yourself a private message." }, { status: 400 });
    }

    const students = await getDB<Student>("students.json");
    const student = students.find((item) => item.id === session.user.id);
    if (!student) {
      return NextResponse.json({ success: false, message: "Your account could not be found." }, { status: 401 });
    }
    if (student.communityBlocked) {
      return NextResponse.json(
        { success: false, message: "Your community access has been restricted by an admin." },
        { status: 403 }
      );
    }

    let recipient: Student | undefined;
    if (recipientId) {
      recipient = students.find((item) => item.id === recipientId);
      if (!recipient) return NextResponse.json({ success: false, message: "Recipient not found." }, { status: 404 });

      const blocks = await getDB<CommunityBlock>("community-blocks.json");
      if (isBlockedBy(blocks, recipientId, session.user.id)) {
        return NextResponse.json({ success: false, message: "This student isn't accepting messages from you." }, { status: 403 });
      }
    }

    const messages = await getDB<CommunityMessage>("community-messages.json");
    if (isWithinCooldown(messages, student.id, MESSAGE_COOLDOWN_MS)) {
      return NextResponse.json({ success: false, message: "You're sending messages too fast. Give it a second." }, { status: 429 });
    }

    const original = replyToId ? messages.find((item) => item.id === replyToId && !item.deletedAt) : undefined;

    const roster = students.map((item) => ({ id: item.id, name: item.name }));
    const mentionIds = rawText ? resolveMentions(rawText, roster).filter((id) => id !== student.id) : [];

    const message: CommunityMessage = {
      id: `MSG-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      studentId: student.id,
      studentName: student.name || session.user.name || "Student",
      avatar: student.profileImage || student.avatar || null,
      role: student.role || "student",
      text: rawText || undefined,
      stickerId: stickerId || undefined,
      visibility: recipientId ? "private" : "public",
      recipientId: recipientId || undefined,
      recipientName: recipient?.name || undefined,
      replyToId: original?.id,
      replyPreview: buildReplyPreview(original),
      mentionIds: mentionIds.length > 0 ? mentionIds : undefined,
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

    if (action === "markSeen") {
      // Reserved for future read-receipt UI; notifications currently use the dedicated endpoint.
      return NextResponse.json({ success: true });
    }

    if (message.deletedAt) {
      return NextResponse.json({ success: false, message: "Restore this message before editing it." }, { status: 400 });
    }

    const newText = typeof body.text === "string" ? body.text.trim().slice(0, MAX_MESSAGE_LENGTH) : "";
    if (!newText) return NextResponse.json({ success: false, message: "Message cannot be empty." }, { status: 400 });
    if (containsAbusiveLanguage(newText)) {
      return NextResponse.json({ success: false, message: RESPECT_MESSAGE }, { status: 400 });
    }

    const students = await getDB<Student>("students.json");
    const roster = students.map((item) => ({ id: item.id, name: item.name }));
    const mentionIds = resolveMentions(newText, roster).filter((id) => id !== message.studentId);

    const edited: CommunityMessage = {
      ...message,
      text: newText,
      mentionIds: mentionIds.length > 0 ? mentionIds : undefined,
      editedAt: new Date().toISOString(),
    };
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
      await deleteDBRecord("community-messages.json", message.id);
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
