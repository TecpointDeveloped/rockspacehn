import { NextResponse } from "next/server";
import { adminCookie, clearAdminCookie, createAdminSession, getAdminSession, hasTrustedOrigin, isAllowedAdmin, verifyAdminPassword } from "@/lib/admin-auth";

const attempts = new Map<string, { count: number; resetAt: number }>();

export async function GET() {
  const session = await getAdminSession();
  return NextResponse.json({ authenticated: Boolean(session), email: session?.email || null });
}

export async function POST(request: Request) {
  if (!(await hasTrustedOrigin())) return NextResponse.json({ error: "Solicitud no válida." }, { status: 403 });
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now();
  const current = attempts.get(forwarded);
  if (current && current.resetAt > now && current.count >= 8) return NextResponse.json({ error: "Demasiados intentos. Espere 15 minutos." }, { status: 429 });
  const body = await request.json().catch(() => ({}));
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");
  const allowed = isAllowedAdmin(email);
  const validPassword = await verifyAdminPassword(password);
  if (!allowed || !validPassword) {
    attempts.set(forwarded, { count: current?.resetAt && current.resetAt > now ? current.count + 1 : 1, resetAt: now + 15 * 60_000 });
    return NextResponse.json({ error: "Correo o clave incorrectos." }, { status: 401 });
  }
  attempts.delete(forwarded);
  const response = NextResponse.json({ authenticated: true, email });
  response.cookies.set(adminCookie(createAdminSession(email)));
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set(clearAdminCookie());
  return response;
}
