import { list } from "@vercel/blob";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";

export async function GET() {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Acceso administrativo requerido." }, { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { available: false, reason: "El almacenamiento no está configurado." },
      { headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const { blobs } = await list({ prefix: "cms/site-content.json", limit: 1 });
    if (!blobs[0]) {
      return NextResponse.json(
        { available: true },
        { headers: { "Cache-Control": "no-store" } },
      );
    }

    const response = await fetch(blobs[0].url, { cache: "no-store" });
    return NextResponse.json(
      {
        available: response.ok,
        reason: response.ok
          ? undefined
          : "El almacenamiento de Vercel no permite abrir los archivos en este momento.",
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      {
        available: false,
        reason: "No se pudo comprobar el almacenamiento de imágenes.",
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  }
}
