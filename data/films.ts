export type Film = {
  slug: string;
  sku?: string;
  model?: string;
  name: string;
  short: string;
  description: string;
  benefits: string[];
  category: string;
  categoryKey: "flexible" | "uv" | "matte" | "premium" | "gaming" | "privacy" | "macbook" | "design" | "rear" | "spares" | "accessories";
  subcategory?: string;
  availability: string;
  stock: number;
  variants: { label: string; stock: number; sku?: string; compatibility?: string[] }[];
  compatibility: string[];
  price?: number;
  status?: "active" | "draft";
  images?: string[];
  videos?: { title: string; youtubeId: string }[];
  specs: { label: string; value: string }[];
  tone: string;
  image: string;
  alt: string;
};

type Seed = [sku: string, name: string, stock: number, format: string, pieces: number, categoryKey: Film["categoryKey"], subcategory: string];
type ExtraSeed = [sku: string, name: string, stock: number, categoryKey: "spares" | "accessories", subcategory: string];

// One row per unique film SKU in the 10 September 2026 inventory file.
// Duplicate rows in the PDF are intentionally represented once.
const seeds: Seed[] = [
  ["RS-FAHE20S", "Super Self Healing T/S", 560, "T/S", 20, "flexible", "Super Self Healing"],
  ["RS-FAME20S", "Matte Super Self Healing T/S", 160, "T/S", 20, "matte", "Matte Super Self Healing"],
  ["RS-FD70969", "Lámina para diseño de cobertores", 10, "Universal", 5, "design", "Diseño de cobertores"],
  ["RS-FHDP10L", "Premium T/L", 160, "T/L", 10, "premium", "Premium"],
  ["RS-FHDP3XL", "Premium T/XL", 143, "T/XL", 3, "premium", "Premium"],
  ["RS-FHDP50S", "Premium T/S", 750, "T/S", 50, "premium", "Premium"],
  ["RS-FMP20S", "Matte Privacidad T/S", 920, "T/S", 20, "privacy", "Matte Privacidad"],
  ["RS-FMT10L", "Matte Gaming T/L", 72, "T/L", 10, "gaming", "Matte Gaming"],
  ["RS-FMT20M", "Matte Gaming T/M", 100, "T/M", 20, "gaming", "Matte Gaming"],
  ["RS-FMT20S", "Matte Gaming T/S", 160, "T/S", 20, "gaming", "Matte Gaming"],
  ["RS-FMT3XL", "Matte Gaming T/XL", 102, "T/XL", 3, "gaming", "Matte Gaming"],
  ["RS-FPP20S", "Privacidad HD T/S", 740, "T/S", 20, "privacy", "Privacidad HD"],
  ["RS-FPV133", "Laptop Privacidad 13.3", 16, "13.3 pulgadas", 1, "macbook", "Privacidad"],
  ["RS-FPV142", "Laptop Privacidad 14.2", 16, "14.2 pulgadas", 1, "macbook", "Privacidad"],
  ["RS-FPV162", "Laptop Privacidad 16.2", 6, "16.2 pulgadas", 1, "macbook", "Privacidad"],
  ["RS-FUVAN10S", "UV HD Anti-Reflectiva T/S", 260, "T/S", 10, "uv", "HD Anti-Reflectiva"],
  ["RS-FUVAR10S", "UV Armor 9H HD T/S", 230, "T/S", 10, "uv", "Armor 9H HD"],
  ["RS-FUVHD20S", "UV HD T/S", 300, "T/S", 20, "uv", "UV HD"],
  ["RS-FUVHDP20S", "UV HD Premium T/S", 160, "T/S", 20, "uv", "UV HD Premium"],
  ["RS-FUVMT20S", "UV Matte T/S", 293, "T/S", 20, "uv", "UV Matte"],
  ["RS-FUVPV10S", "UV Privacidad T/S", 410, "T/S", 10, "uv", "UV Privacidad"],
  ["RS-TRB1-5S", "Trasera BlingBling 1 T/S", 5, "T/S", 5, "rear", "BlingBling"],
  ["RS-TRB4-5S", "Trasera BlingBling 4 T/S", 5, "T/S", 5, "rear", "BlingBling"],
  ["RS-TRB5-5S", "Trasera BlingBling 5 T/S", 5, "T/S", 5, "rear", "BlingBling"],
  ["RS-TRC1-5S", "Trasera Carbon 1 T/S", 30, "T/S", 5, "rear", "Carbon"],
  ["RS-TRD1-5S", "Trasera Dark 1 T/S", 35, "T/S", 5, "rear", "Dark"],
  ["RS-TRD2-5S", "Trasera Dark 2 T/S", 40, "T/S", 5, "rear", "Dark"],
  ["RS-TRD3-5S", "Trasera Dark 3 T/S", 35, "T/S", 5, "rear", "Dark"],
  ["RS-TRD4-5S", "Trasera Dark 4 T/S", 40, "T/S", 5, "rear", "Dark"],
  ["RS-TRD5-5S", "Trasera Dark 5 T/S", 5, "T/S", 5, "rear", "Dark"],
  ["RS-TRD6-5S", "Trasera Dark 6 T/S", 5, "T/S", 5, "rear", "Dark"],
  ["RS-TRD7-5S", "Trasera Dark 7 T/S", 5, "T/S", 5, "rear", "Dark"],
  ["RS-TRF1-5S", "Trasera Foil 1 T/S", 5, "T/S", 5, "rear", "Foil"],
  ["RS-TRF2-5S", "Trasera Foil 2 T/S", 20, "T/S", 5, "rear", "Foil"],
  ["RS-TRF3-5S", "Trasera Foil 3 T/S", 5, "T/S", 5, "rear", "Foil"],
  ["RS-TRF4-5S", "Trasera Foil 4 T/S", 25, "T/S", 5, "rear", "Foil"],
  ["RS-TRG-5S", "Trasera Geométrica Translúcida T/S", 45, "T/S", 5, "rear", "Geométrica translúcida"],
  ["RS-TRP1-5M", "Trasera Printed Leather 1 T/M", 5, "T/M", 5, "rear", "Printed Leather"],
  ["RS-TRP3-5M", "Trasera Printed Leather 3 T/M", 5, "T/M", 5, "rear", "Printed Leather"],
  ["RS-TRT1-3L", "Trasera Relieve Translúcida 1 T/L", 6, "T/L", 3, "rear", "Relieve translúcida"],
  ["RS-TRT1-3XL", "Trasera Relieve Translúcida 1 T/XL", 3, "T/XL", 3, "rear", "Relieve translúcida"],
  ["RS-TRT2-3L", "Trasera Relieve Translúcida 2 T/L", 6, "T/L", 3, "rear", "Relieve translúcida"],
  ["RS-TRT2-3XL", "Trasera Relieve Translúcida 2 T/XL", 3, "T/XL", 3, "rear", "Relieve translúcida"],
  ["RS-TRT3-3L", "Trasera Relieve Translúcida 3 T/L", 3, "T/L", 3, "rear", "Relieve translúcida"],
  ["RS-TRT4-3L", "Trasera Relieve Translúcida 4 T/L", 3, "T/L", 3, "rear", "Relieve translúcida"],
  ["RS-TRV1-5S", "Trasera Vivid 1 T/S", 45, "T/S", 5, "rear", "Vivid"],
  ["RS-TRV2-5S", "Trasera Vivid 2 T/S", 15, "T/S", 5, "rear", "Vivid"],
  ["RS-TRV3-5S", "Trasera Vivid 3 T/S", 15, "T/S", 5, "rear", "Vivid"],
  ["RS-TRV4-5S", "Trasera Vivid 4 T/S", 5, "T/S", 5, "rear", "Vivid"],
];

const extraSeeds: ExtraSeed[] = [
  ["RS-AADTEZC1", "Adaptador de corriente C180 / C210 / ZC1 / ZC1-A", 4, "spares", "Alimentación"],
  ["RS-ACIADEZC1", "Cinta adhesiva de goma para ZC1-A", 8, "spares", "Repuesto de plotter"],
  ["RS-ACIADEZC3", "Cinta adhesiva de goma para ZC3 / ZC3-B", 8, "spares", "Repuesto de plotter"],
  ["RS-APATZC2", "Pantalla ZC1-A / MINI ZV2 de 5.5 pulgadas", 2, "spares", "Pantalla"],
  ["RS-ASPZC1MX", "Soporte de cuchilla ZC1 / ZC1-A Purple", 20, "spares", "Soporte de cuchilla"],
  ["RS-ATORNIAJ", "Tornillo ajustable de soporte de cuchilla", 10, "spares", "Soporte de cuchilla"],

  ["RS-AALFO160", "Molde de corte de láminas MINI ZV1 160 x 215 cm", 20, "accessories", "Moldes de corte"],
  ["RS-AALFO183", "Molde de corte de lámina trasera 18.35 x 10.5 cm", 6, "accessories", "Moldes de corte"],
  ["RS-AALFO380N", "Alfombrilla antideslizante 380 x 270 x 6.5 mm", 18, "accessories", "Superficie de trabajo"],
  ["RS-ACRIBNT", "Ribbon Phone Skin Printer Color SET (36)", 9, "accessories", "Consumibles"],
  ["RS-ACU70983", "Cuchilla para corte de láminas 70983 Rose Gold", 42, "accessories", "Cuchillas"],
  ["RS-ACU74424", "Cuchilla para corte de láminas UV 74424", 422, "accessories", "Cuchillas"],
  ["RS-AESP11X8.5", "Espátula doble para instalación 11 x 8.5 cm", 37, "accessories", "Instalación"],
  ["RS-AESP18X6", "Espátula mediana para instalación 18 x 6 cm", 14, "accessories", "Instalación"],
  ["RS-AESP25X71", "Espátula grande para laptop 25 x 71 cm", 22, "accessories", "Instalación"],
  ["RS-AESP75X9", "Espátula Mini H S/M 7.5 x 9 cm", 1150, "accessories", "Instalación"],
  ["RS-AESP93X5", "Espátula pequeña V 9.3 x 5.5 cm", 112, "accessories", "Instalación"],
  ["RS-ALA75414", "Lápiz calefactor para instalación 75414", 131, "accessories", "Instalación"],
  ["RS-ALIMPT1", "Limpiador de pantalla", 4, "accessories", "Limpieza"],
  ["RS-ALIMPT5", "Paño de limpieza de pantallas", 524, "accessories", "Limpieza"],
  ["RS-CBI16", "Cobertor de impresión de diseño iPhone 16", 5, "accessories", "Cobertores"],
  ["RS-CBI16PRM", "Cobertor de impresión de diseño iPhone 16 Pro Max", 3, "accessories", "Cobertores"],
  ["RS-CBI16PRO", "Cobertor de impresión de diseño iPhone 16 Pro", 2, "accessories", "Cobertores"],
  ["RS-CBS25UL", "Cobertor de impresión de diseño Samsung S25 Ultra", 4, "accessories", "Cobertores"],
  ["RS-MDI1516", "Molde de cobertor de impresión iPhone 15 / 16", 1, "accessories", "Moldes de cobertor"],
  ["RS-MDI16PRM", "Molde de cobertor de impresión iPhone 16 Pro Max", 1, "accessories", "Moldes de cobertor"],
  ["RS-MDI16PRO", "Molde de cobertor de impresión iPhone 16 Pro", 1, "accessories", "Moldes de cobertor"],
  ["RS-MDS25UL", "Molde de cobertor de impresión Samsung S25 Ultra", 1, "accessories", "Moldes de cobertor"],
];

const categoryNames: Record<Film["categoryKey"], string> = {
  flexible: "Láminas flexibles",
  uv: "Láminas UV",
  matte: "Láminas Matte",
  premium: "Láminas Premium",
  gaming: "Láminas Gaming",
  privacy: "Láminas de privacidad",
  macbook: "Láminas para laptop",
  design: "Diseño y sublimación",
  rear: "Láminas traseras",
  spares: "Repuestos",
  accessories: "Accesorios",
};

function compatibilityFor(categoryKey: Film["categoryKey"], format: string) {
  if (categoryKey === "rear") return format === "T/L" ? ["Tablets"] : format === "T/XL" ? ["Pantallas grandes"] : ["Parte trasera de teléfonos"];
  if (categoryKey === "macbook") return [`Laptops de ${format}`];
  if (categoryKey === "design") return ["Cobertores compatibles"];
  if (format === "T/L") return ["Tablets"];
  if (format === "T/XL") return ["Pantallas grandes"];
  return ["Teléfonos"];
}

function makeFilm([sku, name, stock, format, pieces, categoryKey, subcategory]: Seed): Film {
  const units = `${pieces} ${pieces === 1 ? "pieza" : "piezas"}`;
  const presentation = `${format} · ${units}`;
  return {
    slug: sku.toLowerCase(),
    sku,
    name,
    short: `Presentación ${presentation}.`,
    description: `Lámina Rock Space ${name}, código ${sku}.`,
    benefits: [subcategory, `Formato ${format}`, units],
    category: categoryNames[categoryKey],
    categoryKey,
    subcategory,
    availability: stock > 0 ? "Disponible en Honduras" : "Sin existencia registrada",
    stock,
    variants: [{ label: presentation, stock, sku }],
    compatibility: compatibilityFor(categoryKey, format),
    specs: [{ label: "SKU", value: sku }, { label: "Formato", value: format }, { label: "Presentación", value: units }],
    tone: categoryKey,
    image: "",
    images: [],
    alt: `${name} Rock Space - imagen pendiente`,
  };
}

function makeExtra([sku, name, stock, categoryKey, subcategory]: ExtraSeed): Film {
  return {
    slug: sku.toLowerCase(),
    sku,
    name,
    short: `${subcategory} Rock Space.`,
    description: `${name}, código ${sku}.`,
    benefits: [subcategory, "Producto Rock Space", "Disponible en Honduras"],
    category: categoryNames[categoryKey],
    categoryKey,
    subcategory,
    availability: stock > 0 ? "Disponible en Honduras" : "Sin existencia registrada",
    stock,
    variants: [{ label: "Unidad", stock, sku }],
    compatibility: ["Consulte compatibilidad antes de comprar"],
    specs: [{ label: "SKU", value: sku }, { label: "Existencia", value: String(stock) }, { label: "Tipo", value: subcategory }],
    tone: categoryKey,
    image: "",
    images: [],
    alt: `${name} Rock Space - imagen pendiente`,
  };
}

export const films: Film[] = [...seeds.map(makeFilm), ...extraSeeds.map(makeExtra)];
