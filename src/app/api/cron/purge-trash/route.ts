import { NextResponse } from "next/server";
import { getDB, saveDB } from "@/lib/db";
import { purgeExpiredTrash, type CommunityMessage, type CommunityPost } from "@/lib/community";

/**
 * Soft-deleted messages/posts only got purged as a side effect of someone
 * happening to GET the collection they live in (the community feed, the
 * admin moderation tab) - if nobody visits those routes for a while, expired
 * trash just sits there indefinitely instead of being cleaned up on schedule.
 * Vercel Cron hits this on a fixed interval (see vercel.json) so purging no
 * longer depends on incidental traffic.
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const [messages, posts] = await Promise.all([
    getDB<CommunityMessage>("community-messages.json"),
    getDB<CommunityPost>("community-posts.json"),
  ]);

  const purgedMessages = purgeExpiredTrash(messages);
  if (purgedMessages.changed) await saveDB("community-messages.json", purgedMessages.kept);

  const purgedPosts = purgeExpiredTrash(posts);
  if (purgedPosts.changed) await saveDB("community-posts.json", purgedPosts.kept);

  return NextResponse.json({
    success: true,
    purgedMessages: messages.length - purgedMessages.kept.length,
    purgedPosts: posts.length - purgedPosts.kept.length,
  });
}
