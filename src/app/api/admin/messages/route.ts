import { NextResponse } from "next/server";
import { deleteDBRecord, getDB, upsertDBRecord } from "@/lib/db";
import { badRequest, getRequiredString, notFound, requireAdminRequest } from "@/lib/adminAuth";
import { logAdminAction } from "@/lib/auditLog";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: "unread" | "read";
}

export async function POST(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  const messages = await getDB<ContactMessage>("messages.json");
  const sorted = [...messages].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return NextResponse.json({ success: true, data: sorted });
}

export async function PATCH(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  const id = getRequiredString(auth.body, "id", "Message ID");
  if ("response" in id) return id.response;

  const status = auth.body.status;
  if (status !== "read" && status !== "unread") {
    return badRequest("Status must be read or unread");
  }

  const messages = await getDB<ContactMessage>("messages.json");
  const index = messages.findIndex((item) => item.id === id.value);
  if (index === -1) return notFound("Message not found");

  messages[index] = { ...messages[index], status };
  await upsertDBRecord("messages.json", messages[index]);

  return NextResponse.json({ success: true, data: messages[index] });
}

export async function DELETE(request: Request) {
  const auth = await requireAdminRequest(request);
  if ("response" in auth) return auth.response;

  const id = getRequiredString(auth.body, "id", "Message ID");
  if ("response" in id) return id.response;

  await deleteDBRecord("messages.json", id.value);

  await logAdminAction({
    actorId: auth.actor.id,
    actorName: auth.actor.name,
    actorRole: auth.actor.role,
    action: "message.deleted",
    targetType: "message",
    targetId: id.value,
  });

  return NextResponse.json({ success: true });
}
