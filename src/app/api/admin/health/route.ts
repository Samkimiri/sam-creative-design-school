import { NextResponse } from "next/server";
import { requireFullAdminRequest, getConfiguredAdminPassword } from "@/lib/adminAuth";
import { getDB } from "@/lib/db";
import { hasSupabaseConfig } from "@/lib/supabase";
import { hasMongoConfig } from "@/lib/mongodb";
import { hasKVConfig } from "@/lib/kv";
import type { Student } from "@/types";

interface HealthCheck {
  id: string;
  label: string;
  status: "ok" | "warning" | "error";
  detail: string;
}

export async function POST(request: Request) {
  const auth = await requireFullAdminRequest(request);
  if ("response" in auth) return auth.response;

  const checks: HealthCheck[] = [];

  const provider = hasSupabaseConfig() ? "Supabase" : hasMongoConfig() ? "MongoDB" : hasKVConfig() ? "Vercel KV" : null;
  let students: Student[] = [];
  if (!provider) {
    checks.push({
      id: "storage",
      label: "Persistent Storage",
      status: "error",
      detail: "No database configured. Students, enrollments, and community data will not persist reliably in production.",
    });
  } else {
    try {
      students = await getDB<Student>("students.json");
      checks.push({ id: "storage", label: "Persistent Storage", status: "ok", detail: `Connected to ${provider}.` });
    } catch (error) {
      checks.push({
        id: "storage",
        label: "Persistent Storage",
        status: "error",
        detail: `${provider} is configured but not reachable right now: ${error instanceof Error ? error.message : "unknown error"}`,
      });
    }
  }

  const emailConfigured = Boolean(process.env.RESEND_API_KEY);
  checks.push({
    id: "email",
    label: "Transactional Email",
    status: emailConfigured ? "ok" : "warning",
    detail: emailConfigured
      ? "Resend is configured - approval, reset, and alert emails can send."
      : "RESEND_API_KEY is not set. Password resets, enrollment confirmations, and admin alerts will not actually send.",
  });

  const alertEmail = process.env.SCDS_ADMIN_ALERT_EMAIL
    || students.find((s) => s.role === "admin")?.email
    || process.env.SCDS_EMAIL_REPLY_TO;
  checks.push({
    id: "alerts",
    label: "New Enrollment Alerts",
    status: alertEmail && emailConfigured ? "ok" : "warning",
    detail: !alertEmail
      ? "No admin email found to send new-enrollment alerts to."
      : !emailConfigured
        ? `Would send to ${alertEmail}, but email isn't configured yet.`
        : `Sent to ${alertEmail}.`,
  });

  const paymentNumberConfigured = Boolean(
    process.env.MPESA_TILL_NUMBER || process.env.MPESA_PARTY_B || process.env.MPESA_SHORTCODE
  );
  checks.push({
    id: "payment",
    label: "M-Pesa Payment Number",
    status: paymentNumberConfigured ? "ok" : "warning",
    detail: paymentNumberConfigured
      ? "A configured Till/Paybill number is in use."
      : "No MPESA_TILL_NUMBER set - the enrollment page is showing a hardcoded fallback till number.",
  });

  const adminPassword = getConfiguredAdminPassword();
  const usingDevPassword = !process.env.ADMIN_PASSWORD && !process.env.SCDS_ADMIN_PASSWORD;
  checks.push({
    id: "admin-password",
    label: "Admin Shared Password",
    status: !adminPassword ? "warning" : usingDevPassword ? "warning" : "ok",
    detail: !adminPassword
      ? "No shared admin password configured - only registered admin/staff accounts can sign in."
      : usingDevPassword
        ? "Using the built-in development password. Set ADMIN_PASSWORD in production."
        : "A custom admin password is configured.",
  });

  return NextResponse.json(
    { success: true, data: checks },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}
