export type Film = {
  slug: string;
  sku?: string;
  model?: string;
  name: string;
  short: string;
  description: string;
  benefits: string[];
  category: string;
  categoryKey: "flexible" | "uv" | "matte" | "premium" | "gaming" | "privacy" | "macbook" | "rear";
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

export const films: Film[] = [
  {
    slug: "hd-flexible",
    name: "HD Flexible",
    short: "Claridad para uso diario",
    description: "Una opción flexible orientada a conservar una visualización clara y una experiencia táctil natural.",
    benefits: ["Acabado transparente", "Protección flexible", "Uso diario"],
    category: "Lámina frontal flexible",
    categoryKey: "flexible",
    availability: "Disponible en Honduras",
    stock: 1,
    variants: [],
    compatibility: [],
    specs: [
      { label: "Acabado", value: "Transparente HD" },
      { label: "Superficie", value: "Flexible y sensible al tacto" },
      { label: "Función", value: "Claridad y protección diaria" }
    ],
    tone: "clear",
    image: "/images/products/film-hd.webp",
    alt: "Película Flexible HD Rock Space para protección de pantalla"
  },
  {
    slug: "gaming-matte",
    name: "Gaming Matte",
    short: "Menos reflejos, sensación mate",
    description: "Acabado mate para usuarios que prefieren menor brillo y una superficie más controlada al deslizar el dedo.",
    benefits: ["Acabado mate", "Menos reflejos", "Tacto suave"],
    category: "Lámina frontal flexible",
    categoryKey: "gaming",
    subcategory: "Gaming",
    availability: "Disponible en Honduras",
    stock: 1,
    variants: [],
    compatibility: [],
    specs: [
      { label: "Acabado", value: "Mate antirreflejo" },
      { label: "Superficie", value: "Tacto suave para juego" },
      { label: "Función", value: "Reduce reflejos y huellas" }
    ],
    tone: "matte",
    image: "/images/products/film-matte.webp",
    alt: "Película flexible mate Rock Space mostrando su acabado antirreflejo"
  },
  {
    slug: "privacy-guard",
    name: "Privacy Guard",
    short: "Privacidad lateral",
    description: "Diseñada para reducir la visibilidad de la pantalla desde los laterales y mantener una vista frontal funcional.",
    benefits: ["Privacidad lateral", "Uso en espacios públicos", "Protección de pantalla"],
    category: "Lámina frontal flexible",
    categoryKey: "privacy",
    availability: "Disponible en Honduras",
    stock: 1,
    variants: [],
    compatibility: [],
    specs: [
      { label: "Acabado", value: "HD con filtro de privacidad" },
      { label: "Visión", value: "Clara de frente, limitada lateralmente" },
      { label: "Función", value: "Privacidad y protección frontal" }
    ],
    tone: "privacy",
    image: "/images/products/film-privacy.webp",
    alt: "Película Privacy Guard Rock Space con privacidad lateral"
  },
  {
    slug: "anti-blue-light",
    name: "Anti‑Blue Light",
    short: "Filtro orientado al confort visual",
    description: "Película flexible con tratamiento para reducir parte de la luz azul, pensada para usuarios que pasan muchas horas frente a la pantalla.",
    benefits: ["Filtro de luz azul", "Película flexible", "Uso prolongado"],
    category: "Lámina frontal flexible",
    categoryKey: "flexible",
    subcategory: "Confort visual",
    availability: "Disponible en Honduras",
    stock: 1,
    variants: [],
    compatibility: [],
    specs: [
      { label: "Acabado", value: "Mate delicado" },
      { label: "Filtro", value: "Reducción de luz azul" },
      { label: "Función", value: "Confort visual y protección frontal" }
    ],
    tone: "blue",
    image: "/images/products/film-blue.webp",
    alt: "Película Anti-Blue Light Rock Space para protección visual"
  },
  {
    slug: "9h-uv-hybrid",
    name: "9H UV Hybrid",
    short: "Mayor dureza en formato cortable",
    description: "Película híbrida de mayor dureza compatible con la generación ZC5 según el fabricante.",
    benefits: ["Mayor dureza", "Corte bajo demanda", "Compatible con ZC5"],
    category: "Lámina frontal híbrida UV",
    categoryKey: "uv",
    availability: "Disponible en Honduras",
    stock: 1,
    variants: [],
    compatibility: ["ZC5"],
    specs: [
      { label: "Material", value: "Compuesto PET" },
      { label: "Dureza", value: "9H" },
      { label: "Espesor aplicado", value: "Aprox. 0.28 mm" },
      { label: "Transmisión de luz", value: "Hasta 92%" },
      { label: "Instalación", value: "Curado UV" }
    ],
    tone: "hybrid",
    image: "/images/products/film-9h.webp",
    alt: "Película híbrida 9H UV Rock Space para corte bajo demanda"
  }
];
