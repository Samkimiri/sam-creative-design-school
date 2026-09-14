import { NextResponse } from "next/server";
import { deleteDBRecord, getDB, upsertDBRecord } from "@/lib/db";
import { getSession } from "@/lib/auth";
import {
  isBlockedBy,
  isValidReactionType,
  reactionId,
  summarizeReactions,
  type CommunityBlock,
  type CommunityComment,
  type CommunityPost,
  type CommunityReaction,
  type ReactionTargetType,
} from "@/lib/community";
import type { Student } from "@/types";

function isValidTargetType(value: unknown): value is ReactionTargetType {
  return value === "post" || value === "comment";
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const body = await request.json().catch(() => ({}));
    const targetType = body.targetType;
    const targetId = typeof body.targetId === "string" ? body.targetId.trim() : "";
    const reactionType = typeof body.reactionType === "string" ? body.reactionType.trim() : "";

    if (!isValidTargetType(targetType) || !targetId) {
      return NextResponse.json({ success: false, message: "Invalid reaction target." }, { status: 400 });
    }
    if (!isValidReactionType(reactionType)) {
      return NextResponse.json({ success: false, message: "Unknown reaction." }, { status: 400 });
    }

    // Confirm the target actually exists and isn't deleted, so reactions can't pile up on ghost content.
    let targetOwnerId: string | undefined;
    if (targetType === "post") {
      const posts = await getDB<CommunityPost>("community-posts.json");
      const target = posts.find((post) => post.id === targetId && !post.deletedAt);
      if (!target) {
        return NextResponse.json({ success: false, message: "This post no longer exists." }, { status: 404 });
      }
      targetOwnerId = target.studentId;
    } else {
      const comments = await getDB<CommunityComment>("community-post-comments.json");
      const target = comments.find((comment) => comment.id === targetId && !comment.deletedAt);
      if (!target) {
        return NextResponse.json({ success: false, message: "This comment no longer exists." }, { status: 404 });
      }
      targetOwnerId = target.studentId;
    }

    const students = await getDB<Student>("students.json");
    const student = students.find((item) => item.id === session.user.id);
    if (!student) return NextResponse.json({ success: false, message: "Your account could not be found." }, { status: 401 });
    if (student.communityBlocked) {
      return NextResponse.json(
        { success: false, message: "Your community access has been restricted by an admin." },
        { status: 403 }
      );
    }

    if (targetOwnerId && targetOwnerId !== student.id) {
      const blocks = await getDB<CommunityBlock>("community-blocks.json");
      if (isBlockedBy(blocks, targetOwnerId, student.id)) {
        return NextResponse.json({ success: false, message: "You can't react to this." }, { status: 403 });
      }
    }

    const id = reactionId(targetType, targetId, student.id);
    const reactions = await getDB<CommunityReaction>("community-reactions.json");
    const existing = reactions.find((item) => item.id === id);

    if (existing && existing.reactionType === reactionType) {
      // Tapping the same reaction again removes it - a single targeted delete, not a full rewrite.
      await deleteDBRecord("community-reactions.json", id);
      const remaining = reactions.filter((item) => item.id !== id);
      return NextResponse.json({
        success: true,
        data: { removed: true, reactionSummary: summarizeReactions(remaining, targetType, targetId, student.id) },
      });
    }

    const reaction: CommunityReaction = {
      id,
      targetType,
      targetId,
      studentId: student.id,
      studentName: student.name,
      reactionType,
      createdAt: new Date().toISOString(),
    };
    await upsertDBRecord("community-reactions.json", reaction);

    const updated = existing ? reactions.map((item) => (item.id === id ? reaction : item)) : [...reactions, reaction];

    return NextResponse.json({
      success: true,
      data: { removed: false, reactionSummary: summarizeReactions(updated, targetType, targetId, student.id) },
    });
  } catch (error) {
    console.error("Community reaction POST error:", error);
    return NextResponse.json({ success: false, message: "Could not save your reaction." }, { status: 500 });
  }
}
