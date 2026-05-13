import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "sam-creative-secret-key-2026");

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export interface SessionData {
  user: UserSession;
  expires: string;
}

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

export async function encrypt(payload: SessionData) {
  return await new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(SECRET);
}

export async function decrypt(input: string): Promise<SessionData | null> {
  try {
    const { payload } = await jwtVerify(input, SECRET, {
      algorithms: ["HS256"],
    });
    return payload as unknown as SessionData;
  } catch {
    return null;
  }
}

export async function getSession() {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function setSession(user: UserSession) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const session = await encrypt({ user, expires: expires.toISOString() });
  (await cookies()).set("session", session, { expires, httpOnly: true, secure: process.env.NODE_ENV === "production" });
}

export async function logout() {
  (await cookies()).set("session", "", { expires: new Date(0) });
}
