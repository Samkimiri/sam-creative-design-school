import { NextResponse } from "next/server";
import { deleteDBRecord, getDB, saveDB } from "@/lib/db";
import { badRequest, getRequiredString, notFound, requireAdminRequest } from "@/lib/adminAuth";
import { purgeExpiredTrash, type CommunityComment, type CommunityMessage, type CommunityPost } from "@/lib/community";

async function listCommunityContent(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  const [messages, posts, comments] = await Promise.all([
    getDB<CommunityMessage>("community-messages.json"),
    getDB<CommunityPost>("community-posts.json"),
    getDB<CommunityComment>("community-post-comments.json"),
  ]);

  const purgedMessages = purgeExpiredTrash(messages);
  if (purgedMessages.changed) await saveDB("community-messages.json", purgedMessages.kept);
  const purgedPosts = purgeExpiredTrash(posts);
  if (purgedPosts.changed) await saveDB("community-posts.json", purgedPosts.kept);

  const visibleMessages = purgedMessages.kept
    .filter((message) => !message.deletedAt)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const visiblePosts = purgedPosts.kept
    .filter((post) => !post.deletedAt)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const visibleComments = comments
    .filter((comment) => !comment.deletedAt)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json(
    { success: true, data: { messages: visibleMessages, posts: visiblePosts, comments: visibleComments } },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}

export async function POST(request: Request) {
  return listCommunityContent(request);
}

const COLLECTION_BY_TYPE: Record<string, string> = {
  message: "community-messages.json",
  post: "community-posts.json",
  comment: "community-post-comments.json",
};

export async function DELETE(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  const type = getRequiredString(auth.body, "type", "Content type");
  if ("response" in type) return type.response;
  const collection = COLLECTION_BY_TYPE[type.value];
  if (!collection) return badRequest("type must be message, post, or comment");

  const id = getRequiredString(auth.body, "id", "Content ID");
  if ("response" in id) return id.response;

  const items = await getDB<{ id: string }>(collection);
  if (!items.some((item) => item.id === id.value)) return notFound("Content not found");

  await deleteDBRecord(collection, id.value);

  return NextResponse.json({ success: true, data: { id: id.value, type: type.value }, message: "Removed permanently." });
}
