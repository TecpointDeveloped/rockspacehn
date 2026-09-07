import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { getAdminSession, hasTrustedOrigin } from "@/lib/admin-auth";
import { getCmsContent, type CmsContent } from "@/lib/cms";

export async function GET() {
  if (!(await getAdminSession())) return NextResponse.json({ error: "Acceso administrativo requerido." }, { status: 401 });
  return NextResponse.json(await getCmsContent(), { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(request: Request) {
  if (!(await getAdminSession())) return NextResponse.json({ error: "Acceso administrativo requerido." }, { status: 401 });
  if (!(await hasTrustedOrigin())) return NextResponse.json({ error: "Solicitud no válida." }, { status: 403 });
  const content = (await request.json()) as CmsContent;
  if (!content?.home || !Array.isArray(content.machines) || !Array.isArray(content.films) || !content.support) {
    return NextResponse.json({ error: "El contenido está incompleto." }, { status: 400 });
  }
  content.updatedAt = new Date().toISOString();
  await put("cms/site-content.json", JSON.stringify(content), { access: "public", allowOverwrite: true, contentType: "application/json", cacheControlMaxAge: 60 });
  revalidateTag("rockspace-site-content", "max");
  for (const path of ["/", "/stickers", "/maquinas", "/tutoriales", "/laminas", "/soporte"]) revalidatePath(path);
  return NextResponse.json({ ok: true, updatedAt: content.updatedAt });
}
