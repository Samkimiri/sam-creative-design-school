import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getDB } from "@/lib/db";

const DEV_ADMIN_PASSWORD = "sam-admin-2026";

export type AdminRequestBody = Record<string, unknown>;

interface AdminStudent {
  id: string;
  email: string;
  role?: string;
}

type AdminRequestResult =
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

export async function requireAdminRequest(request: Request): Promise<AdminRequestResult> {
  const parsed = await readRequestBody(request);
  if ("response" in parsed) return parsed;

  const session = await getSession();
  const password = typeof parsed.body.password === "string" ? parsed.body.password : undefined;
  const adminPassword = process.env.ADMIN_PASSWORD || (process.env.NODE_ENV !== "production" ? DEV_ADMIN_PASSWORD : undefined);
  const passwordAllowed = Boolean(adminPassword && password === adminPassword);
  const sessionAllowed = await hasCurrentAdminRole(session?.user.id, session?.user.email);

  if (!passwordAllowed && !sessionAllowed) {
    return { response: adminError("Unauthorized", 401) };
  }

  return parsed;
}

export function getRequiredString(body: AdminRequestBody, key: string, label: string) {
  const value = body[key];
  if (typeof value !== "string" || value.trim() === "") {
    return { response: badRequest(`${label} is required`) };
  }

  return { value: value.trim() };
}

async function readRequestBody(request: Request): Promise<AdminRequestResult> {
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

async function hasCurrentAdminRole(id?: string, email?: string) {
  if (!id && !email) return false;

  const students = await getDB<AdminStudent>("students.json");
  const normalizedEmail = email?.toLowerCase();
  const student = students.find((item) =>
    (id && item.id === id) ||
    (normalizedEmail && item.email?.toLowerCase() === normalizedEmail)
  );

  return student?.role === "admin";
}
