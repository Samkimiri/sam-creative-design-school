import { NextResponse } from "next/server";
import { deleteDBRecord, getDB, saveDB, upsertDBRecord } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { containsAbusiveLanguage } from "@/lib/moderation";
import {
  isValidPostImage,
  isWithinCooldown,
  POST_COOLDOWN_MS,
  purgeExpiredTrash,
  summarizeReactions,
  TRASH_RETENTION_MS,
  type CommunityComment,
  type CommunityPost,
  type CommunityReaction,
  type PostKind,
} from "@/lib/community";
import type { Student } from "@/types";

const MAX_TEXT_LENGTH = 3000;
const MAX_TITLE_LENGTH = 140;
const MAX_ARTICLE_LENGTH = 10000;
const PAGE_SIZE = 20;
const RESPECT_MESSAGE = "That post isn't allowed here. Keep the community respectful.";

function isValidKind(value: unknown): value is PostKind {
  return value === "text" || value === "image" || value === "article";
}

export async function GET(request: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const view = searchParams.get("view") || "feed";
  const before = searchParams.get("before");
  const limitParam = Number(searchParams.get("limit"));
  const limit = Number.isFinite(limitParam) && limitParam > 0 ? Math.min(limitParam, PAGE_SIZE) : PAGE_SIZE;

  const [posts, comments, reactions] = await Promise.all([
    getDB<CommunityPost>("community-posts.json"),
    getDB<CommunityComment>("community-post-comments.json"),
    getDB<CommunityReaction>("community-reactions.json"),
  ]);

  const { kept, changed } = purgeExpiredTrash(posts);
  if (changed) await saveDB("community-posts.json", kept);

  if (view === "trash") {
    const trash = kept
      .filter((post) => post.deletedBy === "student" && post.deletedAt && post.studentId === session.user.id)
      .sort((a, b) => new Date(b.deletedAt || 0).getTime() - new Date(a.deletedAt || 0).getTime());
    return NextResponse.json({ success: true, data: trash });
  }

  const beforeTime = before ? new Date(before).getTime() : Infinity;
  const visible = kept
    .filter((post) => !post.deletedAt && new Date(post.createdAt).getTime() < beforeTime)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);

  const data = visible.map((post) => ({
    ...post,
    commentCount: comments.filter((comment) => comment.postId === post.id && !comment.deletedAt).length,
    reactionSummary: summarizeReactions(reactions, "post", post.id, session.user.id),
  }));

  return NextResponse.json({
    success: true,
    data,
    nextBefore: visible.length > 0 ? visible[visible.length - 1].createdAt : null,
    hasMore: visible.length === limit,
  });
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const body = await request.json().catch(() => ({}));
    const kind = body.kind;
    if (!isValidKind(kind)) {
      return NextResponse.json({ success: false, message: "Choose a post type." }, { status: 400 });
    }

    const title = typeof body.title === "string" ? body.title.trim().slice(0, MAX_TITLE_LENGTH) : "";
    const bodyText = typeof body.body === "string"
      ? body.body.trim().slice(0, kind === "article" ? MAX_ARTICLE_LENGTH : MAX_TEXT_LENGTH)
      : "";
    const imageUrl = typeof body.imageUrl === "string" ? body.imageUrl.trim() : "";

    if (kind === "article" && !title) {
      return NextResponse.json({ success: false, message: "Give your article a title." }, { status: 400 });
    }
    if (kind === "image" && !imageUrl) {
      return NextResponse.json({ success: false, message: "Add an image to post." }, { status: 400 });
    }
    if (kind !== "image" && !bodyText) {
      return NextResponse.json({ success: false, message: "Write something before posting." }, { status: 400 });
    }
    if (imageUrl && !isValidPostImage(imageUrl)) {
      return NextResponse.json(
        { success: false, message: "That image couldn't be used - try a smaller file (under ~1.5MB) or a direct image link." },
        { status: 400 }
      );
    }
    if ((title && containsAbusiveLanguage(title)) || (bodyText && containsAbusiveLanguage(bodyText))) {
      return NextResponse.json({ success: false, message: RESPECT_MESSAGE }, { status: 400 });
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

    const posts = await getDB<CommunityPost>("community-posts.json");
    if (isWithinCooldown(posts, student.id, POST_COOLDOWN_MS)) {
      return NextResponse.json({ success: false, message: "You're posting too fast. Give it a moment." }, { status: 429 });
    }

    const post: CommunityPost = {
      id: `POST-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      studentId: student.id,
      studentName: student.name || session.user.name || "Student",
      avatar: student.profileImage || student.avatar || null,
      role: student.role || "student",
      kind,
      title: title || undefined,
      body: bodyText || undefined,
      imageUrl: imageUrl || undefined,
      createdAt: new Date().toISOString(),
    };

    await upsertDBRecord("community-posts.json", post);

    return NextResponse.json({
      success: true,
      data: { ...post, commentCount: 0, reactionSummary: { counts: {}, total: 0, myReaction: null } },
    });
  } catch (error) {
    console.error("Community post POST error:", error);
    return NextResponse.json({ success: false, message: "Could not publish your post. Please try again." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const body = await request.json().catch(() => ({}));
    const postId = typeof body.postId === "string" ? body.postId.trim() : "";
    if (!postId) return NextResponse.json({ success: false, message: "Post ID is required" }, { status: 400 });

    const posts = await getDB<CommunityPost>("community-posts.json");
    const index = posts.findIndex((item) => item.id === postId);
    if (index === -1) return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });

    const post = posts[index];
    if (post.studentId !== session.user.id) {
      return NextResponse.json({ success: false, message: "You can only manage your own posts." }, { status: 403 });
    }

    if (body.action === "restore") {
      if (!post.deletedAt || post.deletedBy !== "student") {
        return NextResponse.json({ success: false, message: "This post isn't in your trash." }, { status: 400 });
      }
      const restored: CommunityPost = { ...post, deletedAt: undefined, deletedBy: undefined, purgeAt: undefined };
      await upsertDBRecord("community-posts.json", restored);
      return NextResponse.json({ success: true, data: restored });
    }

    if (post.deletedAt) {
      return NextResponse.json({ success: false, message: "Restore this post before editing it." }, { status: 400 });
    }

    const title = typeof body.title === "string" ? body.title.trim().slice(0, MAX_TITLE_LENGTH) : post.title || "";
    const bodyText = typeof body.body === "string"
      ? body.body.trim().slice(0, post.kind === "article" ? MAX_ARTICLE_LENGTH : MAX_TEXT_LENGTH)
      : post.body || "";
    const imageUrl = typeof body.imageUrl === "string" ? body.imageUrl.trim() : post.imageUrl || "";

    if (post.kind === "article" && !title) {
      return NextResponse.json({ success: false, message: "Give your article a title." }, { status: 400 });
    }
    if (post.kind !== "image" && !bodyText) {
      return NextResponse.json({ success: false, message: "Write something before saving." }, { status: 400 });
    }
    if (imageUrl && !isValidPostImage(imageUrl)) {
      return NextResponse.json({ success: false, message: "That image couldn't be used." }, { status: 400 });
    }
    if ((title && containsAbusiveLanguage(title)) || (bodyText && containsAbusiveLanguage(bodyText))) {
      return NextResponse.json({ success: false, message: RESPECT_MESSAGE }, { status: 400 });
    }

    const edited: CommunityPost = {
      ...post,
      title: title || undefined,
      body: bodyText || undefined,
      imageUrl: imageUrl || undefined,
      editedAt: new Date().toISOString(),
    };
    await upsertDBRecord("community-posts.json", edited);

    return NextResponse.json({ success: true, data: edited });
  } catch (error) {
    console.error("Community post PATCH error:", error);
    return NextResponse.json({ success: false, message: "Could not update your post." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const body = await request.json().catch(() => ({}));
    const postId = typeof body.postId === "string" ? body.postId.trim() : "";
    if (!postId) return NextResponse.json({ success: false, message: "Post ID is required" }, { status: 400 });

    const posts = await getDB<CommunityPost>("community-posts.json");
    const index = posts.findIndex((item) => item.id === postId);
    if (index === -1) return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 });

    const post = posts[index];
    const isOwner = post.studentId === session.user.id;
    const isAdmin = session.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return NextResponse.json({ success: false, message: "You can only delete your own posts." }, { status: 403 });
    }

    if (isAdmin && !isOwner) {
      await deleteDBRecord("community-posts.json", post.id);
      return NextResponse.json({ success: true, message: "Post removed by admin." });
    }

    if (post.deletedAt) {
      return NextResponse.json({ success: true, data: post });
    }

    const now = new Date();
    const deleted: CommunityPost = {
      ...post,
      deletedAt: now.toISOString(),
      deletedBy: "student",
      purgeAt: new Date(now.getTime() + TRASH_RETENTION_MS).toISOString(),
    };
    await upsertDBRecord("community-posts.json", deleted);

    return NextResponse.json({ success: true, data: deleted, message: "Moved to your trash. Restorable for 24 hours." });
  } catch (error) {
    console.error("Community post DELETE error:", error);
    return NextResponse.json({ success: false, message: "Could not delete your post." }, { status: 500 });
  }
}
