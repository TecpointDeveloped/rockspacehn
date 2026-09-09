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

const available = (label: string) => ({ label, stock: 1 });

export const films: Film[] = [
  {
    slug: "flexible-matte-txl",
    name: "Flexible Matte",
    short: "Acabado mate para pantallas de mayor formato.",
    description: "Película flexible mate orientada a laptops y pantallas de hasta 16 pulgadas.",
    benefits: ["Efecto mate anti-huellas", "Polímero flexible", "Reduce reflejos"],
    category: "Láminas flexibles",
    categoryKey: "flexible",
    subcategory: "Matte",
    availability: "Disponible en Honduras",
    stock: 0,
    variants: [available("T/XL")],
    compatibility: ["Pantallas de hasta 16 pulgadas"],
    specs: [{ label: "Acabado", value: "Mate anti-huellas" }, { label: "Material", value: "Polímero flexible" }, { label: "Formato", value: "T/XL" }],
    tone: "matte",
    image: "/images/films/flexible-matte-txl.png",
    images: ["/images/films/flexible-matte-txl.png"],
    alt: "Empaque completo de lámina Flexible Matte Rock Space T/XL con laptop"
  },
  {
    slug: "flexible-high-definition-tl",
    name: "Flexible High Definition",
    short: "Claridad y sensibilidad táctil para tablets.",
    description: "Película flexible de alta definición con cobertura completa para pantallas de hasta 11 pulgadas.",
    benefits: ["Polímero flexible", "Auto-reparación después de 24 horas", "Cobertura completa"],
    category: "Láminas flexibles",
    categoryKey: "flexible",
    subcategory: "High Definition",
    availability: "Disponible en Honduras",
    stock: 0,
    variants: [available("T/L")],
    compatibility: ["Pantallas de hasta 11 pulgadas"],
    specs: [{ label: "Acabado", value: "Alta definición" }, { label: "Superficie", value: "Sensible al tacto" }, { label: "Formato", value: "T/L" }],
    tone: "clear",
    image: "/images/films/flexible-high-definition-tl.png",
    images: ["/images/films/flexible-high-definition-tl.png"],
    alt: "Empaque completo de lámina Flexible High Definition Rock Space T/L con tablet"
  },
  {
    slug: "uv-high-definition-ts",
    name: "UV High Definition",
    short: "Claridad tipo vidrio con protección para bordes curvos.",
    description: "Lámina de curado UV que conserva los colores de la pantalla y ofrece una superficie suave.",
    benefits: ["Protección en bordes curvos", "Conserva los colores", "Resistente a rayones"],
    category: "Láminas UV",
    categoryKey: "uv",
    subcategory: "High Definition",
    availability: "Disponible en Honduras",
    stock: 0,
    variants: [available("T/S")],
    compatibility: [],
    specs: [{ label: "Dureza", value: "6H" }, { label: "Instalación", value: "Curado UV" }, { label: "Formato", value: "T/S" }],
    tone: "uv-hd",
    image: "/images/films/uv-high-definition-ts.png",
    images: ["/images/films/uv-high-definition-ts.png"],
    alt: "Empaque completo de lámina UV High Definition Rock Space T/S"
  },
  {
    slug: "uv-matte-ts",
    name: "UV Matte",
    short: "Curado UV con acabado mate anti-huellas.",
    description: "Lámina UV mate que reduce reflejos y mantiene protección contra rayones.",
    benefits: ["Efecto mate anti-huellas", "Curado UV", "Reduce reflejos"],
    category: "Láminas UV",
    categoryKey: "uv",
    subcategory: "Matte",
    availability: "Disponible en Honduras",
    stock: 0,
    variants: [available("T/S")],
    compatibility: [],
    specs: [{ label: "Dureza", value: "6H" }, { label: "Acabado", value: "Mate" }, { label: "Formato", value: "T/S" }],
    tone: "uv-matte",
    image: "/images/films/uv-matte-ts.png",
    images: ["/images/films/uv-matte-ts.png"],
    alt: "Empaque completo de lámina UV Matte Rock Space T/S"
  },
  {
    slug: "flexible-gaming-matte",
    name: "Flexible Gaming Matte",
    short: "Superficie mate y suave para juego en teléfono o tablet.",
    description: "Familia flexible gaming con acabado anti-reflejo en formatos para teléfonos y tablets.",
    benefits: ["Efecto mate anti-huellas", "Polímero flexible", "Resistente a salpicaduras y polvo"],
    category: "Láminas Gaming",
    categoryKey: "gaming",
    subcategory: "Matte Gaming",
    availability: "Disponible en Honduras",
    stock: 0,
    variants: [available("T/S"), available("T/L")],
    compatibility: ["Teléfonos", "Tablets de hasta 11 pulgadas"],
    specs: [{ label: "Acabado", value: "Mate anti-reflejo" }, { label: "Superficie", value: "Tacto suave" }, { label: "Formatos", value: "T/S y T/L" }],
    tone: "gaming",
    image: "/images/films/flexible-gaming-matte-ts.png",
    images: ["/images/films/flexible-gaming-matte-ts.png", "/images/films/flexible-gaming-matte-tl.png"],
    alt: "Empaques completos de lámina Flexible Gaming Matte Rock Space T/S y T/L"
  },
  {
    slug: "flexible-matte-privacy-ts",
    name: "Flexible Matte Privacy",
    short: "Privacidad lateral con acabado mate anti-huellas.",
    description: "Película flexible que limita la visión lateral y reduce los reflejos de luz.",
    benefits: ["Ángulo de visión de 30 grados", "Efecto mate anti-huellas", "Reduce reflejos"],
    category: "Láminas de privacidad",
    categoryKey: "privacy",
    subcategory: "Flexible Matte",
    availability: "Disponible en Honduras",
    stock: 0,
    variants: [available("T/S")],
    compatibility: [],
    specs: [{ label: "Visión", value: "Privacidad lateral a 30°" }, { label: "Acabado", value: "Mate anti-huellas" }, { label: "Formato", value: "T/S" }],
    tone: "privacy",
    image: "/images/films/flexible-matte-privacy-ts.png",
    images: ["/images/films/flexible-matte-privacy-ts.png"],
    alt: "Empaque completo de lámina Flexible Matte Privacy Rock Space T/S"
  },
  {
    slug: "uv-privacy-ts",
    name: "UV Privacy",
    short: "Privacidad lateral con protección UV para bordes curvos.",
    description: "Lámina de privacidad con curado UV, cobertura completa y resistencia a salpicaduras de agua y polvo.",
    benefits: ["Ángulo de visión de 30 grados", "Protección en bordes curvos", "Resistente a agua y polvo"],
    category: "Láminas de privacidad",
    categoryKey: "privacy",
    subcategory: "UV Privacy",
    availability: "Disponible en Honduras",
    stock: 0,
    variants: [available("T/S")],
    compatibility: [],
    specs: [{ label: "Dureza", value: "6H" }, { label: "Instalación", value: "Curado UV" }, { label: "Formato", value: "T/S" }],
    tone: "uv-privacy",
    image: "/images/films/uv-privacy-ts.png",
    images: ["/images/films/uv-privacy-ts.png"],
    alt: "Empaque completo de lámina UV Privacy Rock Space T/S"
  }
];
