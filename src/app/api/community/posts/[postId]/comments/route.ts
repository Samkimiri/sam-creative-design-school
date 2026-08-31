import { NextResponse } from "next/server";
import { deleteDBRecord, getDB, upsertDBRecord } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { containsAbusiveLanguage } from "@/lib/moderation";
import {
  COMMENT_COOLDOWN_MS,
  isWithinCooldown,
  resolveMentions,
  summarizeReactions,
  type CommunityComment,
  type CommunityPost,
  type CommunityReaction,
} from "@/lib/community";
import type { Student } from "@/types";

const MAX_COMMENT_LENGTH = 800;
const MAX_COMMENTS_RETURNED = 300;
const RESPECT_MESSAGE = "That comment isn't allowed here. Keep the community respectful.";

export async function GET(request: Request, { params }: { params: Promise<{ postId: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const { postId } = await params;
  const [comments, reactions] = await Promise.all([
    getDB<CommunityComment>("community-post-comments.json"),
    getDB<CommunityReaction>("community-reactions.json"),
  ]);

  const visible = comments
    .filter((comment) => comment.postId === postId && !comment.deletedAt)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .slice(-MAX_COMMENTS_RETURNED)
    .map((comment) => ({ ...comment, reactionSummary: summarizeReactions(reactions, "comment", comment.id, session.user.id) }));

  return NextResponse.json({ success: true, data: visible });
}

export async function POST(request: Request, { params }: { params: Promise<{ postId: string }> }) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const { postId } = await params;
    const body = await request.json().catch(() => ({}));
    const text = typeof body.text === "string" ? body.text.trim().slice(0, MAX_COMMENT_LENGTH) : "";
    const parentCommentId = typeof body.parentCommentId === "string" ? body.parentCommentId.trim() : "";

    if (!text) return NextResponse.json({ success: false, message: "Write a comment first." }, { status: 400 });
    if (containsAbusiveLanguage(text)) {
      return NextResponse.json({ success: false, message: RESPECT_MESSAGE }, { status: 400 });
    }

    const posts = await getDB<CommunityPost>("community-posts.json");
    const post = posts.find((item) => item.id === postId && !item.deletedAt);
    if (!post) return NextResponse.json({ success: false, message: "This post no longer exists." }, { status: 404 });

    const students = await getDB<Student>("students.json");
    const student = students.find((item) => item.id === session.user.id);
    if (!student) return NextResponse.json({ success: false, message: "Your account could not be found." }, { status: 401 });
    if (student.communityBlocked) {
      return NextResponse.json(
        { success: false, message: "Your community access has been restricted by an admin." },
        { status: 403 }
      );
    }

    const comments = await getDB<CommunityComment>("community-post-comments.json");
    if (isWithinCooldown(comments, student.id, COMMENT_COOLDOWN_MS)) {
      return NextResponse.json({ success: false, message: "You're commenting too fast. Give it a moment." }, { status: 429 });
    }

    if (parentCommentId && !comments.some((item) => item.id === parentCommentId && item.postId === postId && !item.deletedAt)) {
      return NextResponse.json({ success: false, message: "The comment you're replying to is no longer available." }, { status: 404 });
    }

    const roster = students.map((item) => ({ id: item.id, name: item.name }));
    const mentionIds = resolveMentions(text, roster).filter((id) => id !== student.id);

    const comment: CommunityComment = {
      id: `CMT-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      postId,
      studentId: student.id,
      studentName: student.name || session.user.name || "Student",
      avatar: student.profileImage || student.avatar || null,
      role: student.role || "student",
      text,
      parentCommentId: parentCommentId || undefined,
      mentionIds: mentionIds.length > 0 ? mentionIds : undefined,
      createdAt: new Date().toISOString(),
    };

    await upsertDBRecord("community-post-comments.json", comment);

    return NextResponse.json({
      success: true,
      data: { ...comment, reactionSummary: { counts: {}, total: 0, myReaction: null } },
    });
  } catch (error) {
    console.error("Community comment POST error:", error);
    return NextResponse.json({ success: false, message: "Could not post your comment. Please try again." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const body = await request.json().catch(() => ({}));
    const commentId = typeof body.commentId === "string" ? body.commentId.trim() : "";
    const text = typeof body.text === "string" ? body.text.trim().slice(0, MAX_COMMENT_LENGTH) : "";
    if (!commentId) return NextResponse.json({ success: false, message: "Comment ID is required" }, { status: 400 });
    if (!text) return NextResponse.json({ success: false, message: "Comment cannot be empty." }, { status: 400 });
    if (containsAbusiveLanguage(text)) {
      return NextResponse.json({ success: false, message: RESPECT_MESSAGE }, { status: 400 });
    }

    const comments = await getDB<CommunityComment>("community-post-comments.json");
    const index = comments.findIndex((item) => item.id === commentId);
    if (index === -1) return NextResponse.json({ success: false, message: "Comment not found" }, { status: 404 });

    const comment = comments[index];
    if (comment.studentId !== session.user.id) {
      return NextResponse.json({ success: false, message: "You can only edit your own comments." }, { status: 403 });
    }

    const students = await getDB<Student>("students.json");
    const roster = students.map((item) => ({ id: item.id, name: item.name }));
    const mentionIds = resolveMentions(text, roster).filter((id) => id !== comment.studentId);

    const edited: CommunityComment = {
      ...comment,
      text,
      mentionIds: mentionIds.length > 0 ? mentionIds : undefined,
      editedAt: new Date().toISOString(),
    };
    await upsertDBRecord("community-post-comments.json", edited);

    return NextResponse.json({ success: true, data: edited });
  } catch (error) {
    console.error("Community comment PATCH error:", error);
    return NextResponse.json({ success: false, message: "Could not update your comment." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const body = await request.json().catch(() => ({}));
    const commentId = typeof body.commentId === "string" ? body.commentId.trim() : "";
    if (!commentId) return NextResponse.json({ success: false, message: "Comment ID is required" }, { status: 400 });

    const comments = await getDB<CommunityComment>("community-post-comments.json");
    const index = comments.findIndex((item) => item.id === commentId);
    if (index === -1) return NextResponse.json({ success: false, message: "Comment not found" }, { status: 404 });

    const comment = comments[index];
    const isOwner = comment.studentId === session.user.id;
    const isAdmin = session.user.role === "admin";
    if (!isOwner && !isAdmin) {
      return NextResponse.json({ success: false, message: "You can only delete your own comments." }, { status: 403 });
    }

    await deleteDBRecord("community-post-comments.json", comment.id);

    return NextResponse.json({ success: true, message: isAdmin && !isOwner ? "Comment removed by admin." : "Comment deleted." });
  } catch (error) {
    console.error("Community comment DELETE error:", error);
    return NextResponse.json({ success: false, message: "Could not delete this comment." }, { status: 500 });
  }
}
