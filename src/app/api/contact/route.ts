import { NextResponse } from "next/server";
import { readJSON, writeJSON } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const messages = readJSON<Record<string, unknown>>("messages.json");
    const newMessage = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      subject: subject || "No Subject",
      message,
      date: new Date().toISOString(),
      status: "unread",
    };

    messages.push(newMessage);
    writeJSON("messages.json", messages);

    return NextResponse.json({ success: true, message: "Your message has been sent!" });
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
