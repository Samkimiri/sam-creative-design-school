import { NextResponse } from "next/server";
import { getDB, upsertDBRecord } from "@/lib/db";
import { badRequest, getRequiredString, notFound, requireFullAdminRequest } from "@/lib/adminAuth";
import { logAdminAction } from "@/lib/auditLog";

interface Student {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role?: string;
  createdAt: string;
}

const VALID_ROLES = new Set(["admin", "staff", "student"]);

export async function POST(request: Request) {
  const auth = await requireFullAdminRequest(request);
  if ("response" in auth) return auth.response;

  const students = await getDB<Student>("students.json");
  const team = students
    .filter((s) => s.role === "admin" || s.role === "staff")
    .map(({ id, name, email, phone, role, createdAt }) => ({ id, name, email, phone, role, createdAt }))
    .sort((a, b) => (a.role === b.role ? a.name.localeCompare(b.name) : a.role === "admin" ? -1 : 1));

  return NextResponse.json({ success: true, data: team });
}

export async function PATCH(request: Request) {
  const auth = await requireFullAdminRequest(request);
  if ("response" in auth) return auth.response;

  const studentId = getRequiredString(auth.body, "studentId", "Student ID");
  if ("response" in studentId) return studentId.response;

  const role = getRequiredString(auth.body, "role", "Role");
  if ("response" in role) return role.response;
  if (!VALID_ROLES.has(role.value)) return badRequest("role must be admin, staff, or student");

  const students = await getDB<Student>("students.json");
  const index = students.findIndex((s) => s.id === studentId.value);
  if (index === -1) return notFound("Student not found");

  const target = students[index];
  const previousRole = target.role === "admin" || target.role === "staff" ? target.role : "student";

  if (previousRole === "admin" && role.value !== "admin") {
    const remainingAdmins = students.filter((s) => s.role === "admin" && s.id !== target.id).length;
    if (remainingAdmins === 0) {
      return badRequest("Cannot remove the last remaining admin. Promote someone else first.");
    }
  }

  target.role = role.value === "student" ? "student" : role.value;
  await upsertDBRecord("students.json", target);

  await logAdminAction({
    actorId: auth.actor.id,
    actorName: auth.actor.name,
    actorRole: auth.actor.role,
    action: role.value === "student" ? "admin.role.removed" : "admin.role.set",
    targetType: "student",
    targetId: target.id,
    targetLabel: target.name,
    details: `${previousRole} -> ${role.value}`,
  });

  return NextResponse.json({
    success: true,
    data: { id: target.id, name: target.name, email: target.email, role: target.role },
    message: role.value === "student" ? `${target.name} is no longer part of the admin team.` : `${target.name} is now ${role.value === "admin" ? "a full admin" : "a staff member"}.`,
  });
}
