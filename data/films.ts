export type Film = {
  name: string;
  short: string;
  description: string;
  benefits: string[];
  tone: string;
  image: string;
  alt: string;
};

export const films: Film[] = [
  {
    name: "HD Flexible",
    short: "Claridad para uso diario",
    description: "Una opción flexible orientada a conservar una visualización clara y una experiencia táctil natural.",
    benefits: ["Acabado transparente", "Protección flexible", "Uso diario"],
    tone: "clear",
    image: "/images/products/film-hd.webp",
    alt: "Película Flexible HD Rock Space para protección de pantalla"
  },
  {
    name: "Gaming Matte",
    short: "Menos reflejos, sensación mate",
    description: "Acabado mate para usuarios que prefieren menor brillo y una superficie más controlada al deslizar el dedo.",
    benefits: ["Acabado mate", "Menos reflejos", "Tacto suave"],
    tone: "matte",
    image: "/images/products/film-matte.webp",
    alt: "Película flexible mate Rock Space mostrando su acabado antirreflejo"
  },
  {
    name: "Privacy Guard",
    short: "Privacidad lateral",
    description: "Diseñada para reducir la visibilidad de la pantalla desde los laterales y mantener una vista frontal funcional.",
    benefits: ["Privacidad lateral", "Uso en espacios públicos", "Protección de pantalla"],
    tone: "privacy",
    image: "/images/products/film-privacy.webp",
    alt: "Película Privacy Guard Rock Space con privacidad lateral"
  },
  {
    name: "Anti‑Blue Light",
    short: "Filtro orientado al confort visual",
    description: "Película flexible con tratamiento para reducir parte de la luz azul, pensada para usuarios que pasan muchas horas frente a la pantalla.",
    benefits: ["Filtro de luz azul", "Película flexible", "Uso prolongado"],
    tone: "blue",
    image: "/images/products/film-blue.webp",
    alt: "Película Anti-Blue Light Rock Space para protección visual"
  },
  {
    name: "9H UV Hybrid",
    short: "Mayor dureza en formato cortable",
    description: "Película híbrida de mayor dureza compatible con la generación ZC5 según el fabricante.",
    benefits: ["Mayor dureza", "Corte bajo demanda", "Compatible con ZC5"],
    tone: "hybrid",
    image: "/images/products/film-9h.webp",
    alt: "Película híbrida 9H UV Rock Space para corte bajo demanda"
  }
];
