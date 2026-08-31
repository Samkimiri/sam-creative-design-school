import { NextResponse } from "next/server";
import { getDB, saveDB } from "@/lib/db";
import { getRequiredString, notFound, requireAdminRequest } from "@/lib/adminAuth";
import { purgeExpiredTrash, type CommunityMessage } from "@/lib/community";

async function listMessages(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  const messages = await getDB<CommunityMessage>("community-messages.json");
  const { kept, changed } = purgeExpiredTrash(messages);
  if (changed) await saveDB("community-messages.json", kept);

  const visible = kept
    .filter((message) => !message.deletedAt)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return NextResponse.json(
    { success: true, data: visible },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}

export async function POST(request: Request) {
  return listMessages(request);
}

export async function DELETE(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  const messageId = getRequiredString(auth.body, "messageId", "Message ID");
  if ("response" in messageId) return messageId.response;

  const messages = await getDB<CommunityMessage>("community-messages.json");
  const index = messages.findIndex((message) => message.id === messageId.value);
  if (index === -1) return notFound("Message not found");

  const [deleted] = messages.splice(index, 1);
  await saveDB("community-messages.json", messages);

  return NextResponse.json({
    success: true,
    data: deleted,
    message: "Message permanently removed.",
  });
}
