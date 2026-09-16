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

const legacyFilmSlugs = new Set([
  "flexible-matte-txl", "flexible-high-definition-tl", "uv-high-definition-ts", "uv-matte-ts",
  "flexible-gaming-matte", "flexible-matte-privacy-ts", "uv-privacy-ts",
  "flexible-super-self-healing-ts", "flexible-matte-super-self-healing-ts", "premium-film",
  "laptop-privacy", "uv-hd-anti-reflective", "uv-armor-9h-hd", "uv-hd-premium",
  "rear-blingbling", "rear-carbon", "rear-dark", "rear-foil", "rear-geometric",
  "rear-printed-leather", "rear-relief-translucent", "rear-vivid",
]);
const legacyFilmNames = new Set(["Lámina Super Self Healing", "Lámina Matte Gaming"]);

async function loadRemoteContent(): Promise<CmsContent> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return defaultCmsContent;
  try {
    const result = await list({ prefix: "cms/site-content.json", limit: 1 });
    const blob = result.blobs[0];
    if (!blob) return defaultCmsContent;
    const response = await fetch(blob.url, { cache: "no-store" });
    if (!response.ok) return defaultCmsContent;
    const saved = (await response.json()) as CmsContent;
    const savedFilms = Array.isArray(saved.films) ? saved.films : [];
    const savedImageUsage = savedFilms.reduce((usage, film) => {
      if (film.image) usage.set(film.image, (usage.get(film.image) || 0) + 1);
      return usage;
    }, new Map<string, number>());
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
      films: savedFilms.length > 0 ? [
        ...defaultCmsContent.films.map((baseline) => {
          const savedFilm = savedFilms.find((film) => film.sku === baseline.sku || film.slug === baseline.slug);
          if (!savedFilm) return baseline;
          const isCurrentRecord = savedFilm.slug === baseline.slug;
          const mergedFilm = (isCurrentRecord ? { ...baseline, ...savedFilm } : baseline) as Film;
          const uploadedImage = /^https?:\/\//.test(savedFilm.image || "") ? savedFilm.image : baseline.image;
          const imageIsShared = Boolean(uploadedImage && (savedImageUsage.get(uploadedImage) || 0) > 1);
          return {
            ...mergedFilm,
            slug: baseline.slug,
            sku: baseline.sku,
            image: imageIsShared ? baseline.image : uploadedImage,
            images: uploadedImage && !imageIsShared ? [uploadedImage] : [],
            categoryKey: mergedFilm.categoryKey || baseline.categoryKey,
            stock: Math.max(0, Number(mergedFilm.stock) || 0),
            variants: Array.isArray(mergedFilm.variants) ? mergedFilm.variants : baseline.variants,
            compatibility: Array.isArray(mergedFilm.compatibility) ? mergedFilm.compatibility : baseline.compatibility,
          } as Film;
        }),
        ...savedFilms.filter((film) => {
          const matchesCatalog = defaultCmsContent.films.some((baseline) => baseline.sku === film.sku || baseline.slug === film.slug);
          const containsCatalogSku = film.variants?.some((variant) => variant.sku && defaultCmsContent.films.some((baseline) => baseline.sku === variant.sku));
          return !matchesCatalog && !containsCatalogSku && !legacyFilmSlugs.has(film.slug) && !legacyFilmNames.has(film.name);
        }),
      ] : defaultCmsContent.films,
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
