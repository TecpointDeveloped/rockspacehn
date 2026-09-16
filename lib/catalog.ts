import type { Film } from "@/data/films";

export type CatalogCategoryKey = Film["categoryKey"] | "personalization" | "accessories" | "other";

export type CatalogVariant = {
  label: string;
  stock: number;
  sku?: string;
  compatibility?: string[];
};

/** Extensible internal shape for future films, supplies and other products. */
export type CatalogProduct = {
  category: CatalogCategoryKey;
  subcategory?: string;
  name: string;
  slug: string;
  sku?: string;
  model?: string;
  variant?: string;
  stock: number;
  variants: CatalogVariant[];
  compatibility: string[];
  description: string;
  images: string[];
  features: string[];
  specifications: { label: string; value: string }[];
  videos: { title: string; youtubeId: string }[];
  price?: number;
  status: "active" | "draft";
};

export const CATALOG_CATEGORIES: { key: CatalogCategoryKey; label: string; description: string }[] = [
  { key: "flexible", label: "Flexibles", description: "Protección frontal flexible para uso diario y confort visual." },
  { key: "uv", label: "Láminas UV", description: "Soluciones híbridas con proceso de instalación UV." },
  { key: "matte", label: "Matte", description: "Acabados mate para reducir reflejos." },
  { key: "premium", label: "Premium", description: "Familias premium disponibles en catálogo." },
  { key: "gaming", label: "Gaming", description: "Superficies suaves y controladas para juego." },
  { key: "privacy", label: "Privacidad", description: "Protección frontal con visibilidad lateral reducida." },
  { key: "macbook", label: "MacBook", description: "Láminas magnéticas con compatibilidad documentada." },
  { key: "design", label: "Diseño y sublimación", description: "Láminas para personalización de cobertores compatibles." },
  { key: "rear", label: "Láminas traseras", description: "Diseños y acabados organizados por familia." },
  { key: "spares", label: "Repuestos", description: "Componentes de reemplazo identificados por SKU para máquinas Rock Space." },
  { key: "accessories", label: "Accesorios", description: "Herramientas, consumibles y complementos para instalación y personalización." },
  { key: "personalization", label: "Personalización", description: "Stickers, skins y soluciones de impresión." },
  { key: "other", label: "Otros productos", description: "Otras soluciones Rock Space." }
];

export function availableVariants<T extends { stock: number }>(variants: T[] = []) {
  return variants.filter((variant) => variant.stock > 0);
}

export function isPublicProduct(product: Pick<Film, "status">) {
  return product.status !== "draft";
}

export function publicFilms(items: Film[]) {
  return items.filter(isPublicProduct);
}

export function isMachineVisible() {
  return true;
}

export function isCategoryVisible<T>(products: T[]) {
  return products.length > 0;
}

export function groupPublicFilms(items: Film[]) {
  const visible = publicFilms(items);
  return CATALOG_CATEGORIES.flatMap((category) => {
    const products = visible.filter((product) => product.categoryKey === category.key);
    return products.length ? [{ ...category, products }] : [];
  });
}
