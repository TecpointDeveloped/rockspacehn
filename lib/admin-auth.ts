import "server-only";
import { cookies, headers } from "next/headers";
import { createHmac, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
const COOKIE_NAME = "rockspace_admin";
const SESSION_SECONDS = 60 * 60 * 8;

type Session = { email: string; exp: number };

function encode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function sign(value: string) {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET no está configurado.");
  return createHmac("sha256", secret).update(value).digest("base64url");
}

export function isAllowedAdmin(email: string) {
  return email.trim().toLowerCase() === (process.env.ADMIN_EMAIL || "rockspacehn1@gmail.com").trim().toLowerCase();
}

export async function verifyAdminPassword(password: string) {
  const stored = process.env.ADMIN_PASSWORD_HASH || "";
  const [scheme, salt, expected] = stored.split(":");
  if (scheme !== "scrypt" || !salt || !expected || !password) return false;
  const actual = (await scrypt(password, salt, 64)) as Buffer;
  const expectedBuffer = Buffer.from(expected, "base64url");
  return actual.length === expectedBuffer.length && timingSafeEqual(actual, expectedBuffer);
}

export function createAdminSession(email: string) {
  const payload = encode(JSON.stringify({ email: email.toLowerCase(), exp: Date.now() + SESSION_SECONDS * 1000 } satisfies Session));
  return `${payload}.${sign(payload)}`;
}

export function readAdminSession(token?: string): Session | null {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const session = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as Session;
    return session.exp > Date.now() && isAllowedAdmin(session.email) ? session : null;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const store = await cookies();
  return readAdminSession(store.get(COOKIE_NAME)?.value);
}

export function adminCookie(token: string) {
  return { name: COOKIE_NAME, value: token, httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict" as const, path: "/", maxAge: SESSION_SECONDS };
}

export function clearAdminCookie() {
  return { name: COOKIE_NAME, value: "", httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict" as const, path: "/", maxAge: 0 };
}

export async function hasTrustedOrigin() {
  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin");
  const host = requestHeaders.get("host");
  if (!origin || !host) return false;
  try { return new URL(origin).host === host; } catch { return false; }
}
