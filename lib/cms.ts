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
  support: { salesWhatsappNumber: string; supportWhatsappNumber: string; instagram: string; instagramHandle: string };
  instagram: CmsInstagram;
  updatedAt?: string;
};

export const defaultCmsContent: CmsContent = {
  home: {
    eyebrow: "ROCK SPACE HONDURAS",
    title: "Soluciones para crear, cortar y proteger.",
    accent: "",
    description: "Equipos, láminas frontales y acompañamiento para llevar la personalización bajo demanda a su negocio.",
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
  support: { salesWhatsappNumber: SITE.salesWhatsappNumber, supportWhatsappNumber: SITE.supportWhatsappNumber, instagram: SITE.instagram, instagramHandle: SITE.instagramHandle },
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
    const savedHomeIsStickerFirst = saved.home?.title === "Una foto. Un sticker." || saved.home?.accent === "En minutos.";
    const merged: CmsContent = {
      ...defaultCmsContent,
      ...saved,
      home: savedHomeIsStickerFirst ? defaultCmsContent.home : { ...defaultCmsContent.home, ...saved.home },
      support: {
        ...defaultCmsContent.support,
        ...saved.support,
        salesWhatsappNumber: saved.support?.salesWhatsappNumber || defaultCmsContent.support.salesWhatsappNumber,
        supportWhatsappNumber: saved.support?.supportWhatsappNumber || defaultCmsContent.support.supportWhatsappNumber,
      },
      instagram: {
        ...defaultCmsContent.instagram,
        ...saved.instagram,
        posts: Array.isArray(saved.instagram?.posts) ? saved.instagram.posts : defaultCmsContent.instagram.posts,
      },
      sticker: {
        ...defaultCmsContent.sticker,
        ...saved.sticker,
        heroImage: saved.sticker?.heroImage === "/images/products/rcl1005-hero.webp" ? defaultCmsContent.sticker.heroImage : (saved.sticker?.heroImage || defaultCmsContent.sticker.heroImage),
      },
      machines: Array.isArray(saved.machines) ? [
        ...defaultCmsContent.machines.map((baseline) => {
          const machine = saved.machines.find((item) => item.slug === baseline.slug);
          if (!machine) return baseline;
          const legacyImages = ["/images/products/mini-zv2.webp", "/images/products/zc1-max.webp", "/images/products/zc5.webp"];
          return { ...baseline, ...machine, image: legacyImages.includes(machine.image) ? baseline.image : machine.image };
        }),
        ...saved.machines.filter((machine) => !defaultCmsContent.machines.some((baseline) => baseline.slug === machine.slug)),
      ] : defaultCmsContent.machines,
      films: Array.isArray(saved.films) && saved.films.some((film) => film.slug === "uv-high-definition-ts") ? saved.films.map((film, index) => {
        const baseline = defaultCmsContent.films.find((item) => item.name === film.name) || defaultCmsContent.films[index];
        const mergedFilm = { ...baseline, ...film } as Film;
        return {
          ...mergedFilm,
          slug: mergedFilm.slug || film.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
          categoryKey: mergedFilm.categoryKey || "flexible",
          stock: Number(mergedFilm.stock) || 0,
          variants: Array.isArray(mergedFilm.variants) ? mergedFilm.variants : [],
          compatibility: Array.isArray(mergedFilm.compatibility) ? mergedFilm.compatibility : [],
        } as Film;
      }) : defaultCmsContent.films,
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
