import { NextResponse, after } from "next/server";
import { appendDBRecord, getDB } from "@/lib/db";
import { sendAdminContactMessageAlertEmail } from "@/lib/email";
import { absoluteUrl } from "@/lib/seo";
import { getClientIp, isSubmissionRateLimited } from "@/lib/rateLimit";
import type { Student } from "@/types";

const CONTACT_RATE_LIMIT = { maxAttempts: 5, windowMs: 10 * 60 * 1000 };

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: "unread" | "read";
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (value: unknown, maxLength: number) =>
  String(value || "").trim().replace(/\s+/g, " ").slice(0, maxLength);

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (await isSubmissionRateLimited(`contact:${ip}`, CONTACT_RATE_LIMIT)) {
      return NextResponse.json(
        { success: false, message: "Too many messages sent. Please try again later or reach us on WhatsApp." },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const name = clean(body.name, 80);
    const email = clean(body.email, 120).toLowerCase();
    const subject = clean(body.subject, 120) || "Website inquiry";
    const message = String(body.message || "").trim().slice(0, 2000);

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Enter a valid email address." },
        { status: 400 }
      );
    }

    const newMessage: ContactMessage = {
      id: `MSG-${Date.now()}`,
      name,
      email,
      subject,
      message,
      date: new Date().toISOString(),
      status: "unread",
    };

    await appendDBRecord("messages.json", newMessage);

    const students = await getDB<Student>("students.json").catch(() => [] as Student[]);
    const adminAlertEmail = process.env.SCDS_ADMIN_ALERT_EMAIL
      || students.find((s) => s.role === "admin")?.email
      || process.env.SCDS_EMAIL_REPLY_TO;
    if (adminAlertEmail) {
      after(() =>
        sendAdminContactMessageAlertEmail({
          to: adminAlertEmail,
          name,
          email,
          subject,
          message,
          adminUrl: absoluteUrl("/admin"),
        }).catch(() => {})
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your message has been sent. We will respond shortly.",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to send message. Please try WhatsApp or call us." },
      { status: 500 }
    );
  }
}
