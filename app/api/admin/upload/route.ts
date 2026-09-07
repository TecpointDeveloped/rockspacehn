import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getAdminSession, hasTrustedOrigin } from "@/lib/admin-auth";

const accepted = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

export async function POST(request: Request) {
  if (!(await getAdminSession())) return NextResponse.json({ error: "Acceso administrativo requerido." }, { status: 401 });
  if (!(await hasTrustedOrigin())) return NextResponse.json({ error: "Solicitud no válida." }, { status: 403 });
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || !accepted.has(file.type)) return NextResponse.json({ error: "Seleccione una imagen JPG, PNG, WebP o AVIF." }, { status: 400 });
  if (file.size > 8 * 1024 * 1024) return NextResponse.json({ error: "La imagen supera el límite de 8 MB." }, { status: 400 });
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-");
  const blob = await put(`media/${safeName}`, file, { access: "public", addRandomSuffix: true });
  return NextResponse.json({ url: blob.url });
}
