import "server-only";
import { list } from "@vercel/blob";
import { unstable_cache } from "next/cache";
import { films, type Film } from "@/data/films";
import { machines, type Machine } from "@/data/machines";
import { stickerMachine } from "@/data/stickerMachine";
import { SITE } from "@/lib/site";

export type CmsMachine = Machine & { active?: boolean; spanishSummary?: string };
export type CmsSticker = typeof stickerMachine & { spanishSummary?: string };
export type CmsInstagramPost = { image: string; alt: string; caption: string; url: string };
export type CmsInstagram = {
  enabled: boolean;
  handle: string;
  profileUrl: string;
  title: string;
  description: string;
  posts: CmsInstagramPost[];
};
export type CmsContent = {
  home: { eyebrow: string; title: string; accent: string; description: string; heroImage: string };
  sticker: CmsSticker;
  machines: CmsMachine[];
  films: Film[];
  support: { advisor: string; whatsappNumber: string; instagram: string; instagramHandle: string };
  instagram: CmsInstagram;
  updatedAt?: string;
};

export const defaultCmsContent: CmsContent = {
  home: {
    eyebrow: "ROCK SPACE HONDURAS · PERSONALIZACIÓN EN TIENDA",
    title: "Una foto. Un sticker.",
    accent: "En minutos.",
    description: "La RCL1005 imprime y corta stickers personalizados desde un solo equipo. También crea skins, imprime fotos y corta protección frontal.",
    heroImage: stickerMachine.heroImage,
  },
  sticker: {
    ...stickerMachine,
    spanishSummary: "Elija una plantilla, cargue la fotografía, confirme el diseño en la pantalla y deje que la RCL1005 imprima y corte el contorno. Retire la hoja terminada y entregue el sticker o la skin.",
  },
  machines: machines.map((machine) => ({
    ...machine,
    active: true,
    spanishSummary: machine.steps.map((step) => `${step.title}: ${step.text}`).join(" "),
  })),
  films,
  support: { advisor: SITE.advisor, whatsappNumber: SITE.whatsappNumber, instagram: SITE.instagram, instagramHandle: SITE.instagramHandle },
  instagram: {
    enabled: true,
    handle: SITE.instagramHandle,
    profileUrl: SITE.instagram,
    title: "Mirá lo que estamos creando.",
    description: "Novedades, demostraciones y resultados reales de Rock Space Honduras.",
    posts: [
      { image: "/images/products/rcl1005-stickers.webp", alt: "Stickers personalizados creados con RCL1005", caption: "Stickers personalizados", url: SITE.instagram },
      { image: "/images/products/rcl1005-skins.webp", alt: "Skins personalizadas Rock Space", caption: "Skins a la medida", url: SITE.instagram },
      { image: "/images/products/zc5-hybrid.webp", alt: "Máquina inteligente de corte Rock Space", caption: "Equipos y demostraciones", url: SITE.instagram },
    ],
  },
};

async function loadRemoteContent(): Promise<CmsContent> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return defaultCmsContent;
  try {
    const result = await list({ prefix: "cms/site-content.json", limit: 1 });
    const blob = result.blobs[0];
    if (!blob) return defaultCmsContent;
    const response = await fetch(blob.url, { cache: "no-store" });
    if (!response.ok) return defaultCmsContent;
    const saved = (await response.json()) as CmsContent;
    const merged: CmsContent = {
      ...defaultCmsContent,
      ...saved,
      home: { ...defaultCmsContent.home, ...saved.home },
      support: { ...defaultCmsContent.support, ...saved.support },
      instagram: {
        ...defaultCmsContent.instagram,
        ...saved.instagram,
        posts: Array.isArray(saved.instagram?.posts) ? saved.instagram.posts : defaultCmsContent.instagram.posts,
      },
      sticker: { ...defaultCmsContent.sticker, ...saved.sticker },
      machines: Array.isArray(saved.machines) ? saved.machines : defaultCmsContent.machines,
      films: Array.isArray(saved.films) ? saved.films : defaultCmsContent.films,
    };
    return merged;
  } catch {
    return defaultCmsContent;
  }
}

const cachedRemoteContent = unstable_cache(loadRemoteContent, ["rockspace-site-content"], { revalidate: 60, tags: ["rockspace-site-content"] });

export async function getCmsContent(): Promise<CmsContent> {
  return cachedRemoteContent();
}
