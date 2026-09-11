import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getAdminSession, hasTrustedOrigin } from "@/lib/admin-auth";

const accepted = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const extensions: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

function cleanSlug(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 90);
}

export async function POST(request: Request) {
  if (!(await getAdminSession())) return NextResponse.json({ error: "Acceso administrativo requerido." }, { status: 401 });
  if (!(await hasTrustedOrigin())) return NextResponse.json({ error: "Solicitud no válida." }, { status: 403 });
  const form = await request.formData();
  const file = form.get("file");
  const kind = form.get("kind") === "film" ? "film" : "media";
  const requestedSlug = typeof form.get("slug") === "string" ? String(form.get("slug")) : "";
  if (!(file instanceof File) || !accepted.has(file.type)) return NextResponse.json({ error: "Seleccione una imagen JPG, PNG, WebP o AVIF." }, { status: 400 });
  if (file.size > 8 * 1024 * 1024) return NextResponse.json({ error: "La imagen supera el límite de 8 MB." }, { status: 400 });
  const originalBase = file.name.replace(/\.[^.]+$/, "");
  const safeSlug = cleanSlug(requestedSlug || originalBase);
  if (!safeSlug) return NextResponse.json({ error: "El producto necesita un slug válido antes de subir la imagen." }, { status: 400 });

  const filmBase = safeSlug.startsWith("lamina-") ? safeSlug : `lamina-${safeSlug}`;
  const baseName = kind === "film" ? filmBase : safeSlug;
  const uniqueVersion = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
  const filename = `${baseName}-${uniqueVersion}.${extensions[file.type]}`;
  const blob = await put(`media/${kind === "film" ? "laminas" : "general"}/${filename}`, file, {
    access: "public",
    addRandomSuffix: false,
    contentType: file.type,
  });

  return NextResponse.json(
    { url: blob.url, filename },
    { headers: { "Cache-Control": "private, no-store, max-age=0" } },
  );
}
