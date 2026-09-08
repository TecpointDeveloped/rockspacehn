import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "true") return NextResponse.next();

  const pathname = request.nextUrl.pathname;
  const allowed = pathname === "/mantenimiento" || pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
  if (allowed) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/mantenimiento";
  url.search = "";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|brand/|images/).*)"],
};
