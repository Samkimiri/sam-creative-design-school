import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDB } from "@/lib/db";

const DEV_ADMIN_PASSWORD = "sam-admin-2026";

export type AdminRequestBody = Record<string, unknown>;

export interface AdminActor {
  id: string;
  name: string;
  email: string;
  role: "admin" | "staff";
}

interface AdminStudent {
  id: string;
  name: string;
  email: string;
  role?: string;
}

type AdminRequestResult =
  | { body: AdminRequestBody; actor: AdminActor }
  | { response: NextResponse };

type BodyParseResult =
  | { body: AdminRequestBody }
  | { response: NextResponse };

export function adminError(message: string, status: number) {
  return NextResponse.json({ success: false, message }, { status });
}

export function badRequest(message: string) {
  return adminError(message, 400);
}

export function notFound(message: string) {
  return adminError(message, 404);
}

export function getConfiguredAdminPassword() {
  return (
    process.env.ADMIN_PASSWORD ||
    process.env.SCDS_ADMIN_PASSWORD ||
    (process.env.NODE_ENV !== "production" ? DEV_ADMIN_PASSWORD : undefined)
  );
}

const SHARED_PASSWORD_ACTOR: AdminActor = {
  id: "password",
  name: "Admin (shared password)",
  email: "",
  role: "admin",
};

/**
 * Accepts either a full admin or a staff account (limited to the routes that
 * explicitly allow staff). Use requireFullAdminRequest for anything financial,
 * account-level, or otherwise admin-only.
 */
export async function requireAdminRequest(request: Request): Promise<AdminRequestResult> {
  const parsed = await readRequestBody(request);
  if ("response" in parsed) return parsed;

  const password = typeof parsed.body.password === "string" ? parsed.body.password : undefined;
  const adminPassword = getConfiguredAdminPassword();
  const passwordAllowed = Boolean(adminPassword && password === adminPassword);

  if (passwordAllowed) {
    return { body: parsed.body, actor: SHARED_PASSWORD_ACTOR };
  }

  const session = await getSession();
  const actor = await resolveSessionActor(session?.user.id, session?.user.email);

  if (!actor) {
    return { response: adminError("Unauthorized", 401) };
  }

  return { body: parsed.body, actor };
}

/** Same as requireAdminRequest, but rejects staff accounts - use for financial, account, and settings routes. */
export async function requireFullAdminRequest(request: Request): Promise<AdminRequestResult> {
  const result = await requireAdminRequest(request);
  if ("response" in result) return result;

  if (result.actor.role !== "admin") {
    return { response: adminError("This action requires full admin access.", 403) };
  }

  return result;
}

export function getRequiredString(body: AdminRequestBody, key: string, label: string) {
  const value = body[key];
  if (typeof value !== "string" || value.trim() === "") {
    return { response: badRequest(`${label} is required`) };
  }

  return { value: value.trim() };
}

async function readRequestBody(request: Request): Promise<BodyParseResult> {
  const text = await request.text();
  if (text.trim() === "") return { body: {} };

  try {
    const body = JSON.parse(text);
    if (!isPlainObject(body)) {
      return { response: badRequest("Request body must be a JSON object") };
    }

    return { body };
  } catch {
    return { response: badRequest("Invalid JSON body") };
  }
}

function isPlainObject(value: unknown): value is AdminRequestBody {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

async function resolveSessionActor(id?: string, email?: string): Promise<AdminActor | null> {
  if (!id && !email) return null;

  const students = await getDB<AdminStudent>("students.json");
  const normalizedEmail = email?.toLowerCase();
  const student = students.find((item) =>
    (id && item.id === id) ||
    (normalizedEmail && item.email?.toLowerCase() === normalizedEmail)
  );

  if (!student || (student.role !== "admin" && student.role !== "staff")) return null;

  return { id: student.id, name: student.name, email: student.email, role: student.role };
}
