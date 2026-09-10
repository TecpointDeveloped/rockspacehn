export type Spec = { label: string; value: string };
export type Step = { title: string; text: string };
export type Faq = { question: string; answer: string };

export type Machine = {
  slug: string;
  name: string;
  eyebrow: string;
  tagline: string;
  description: string;
  image: string;
  gallery: { src: string; alt: string }[];
  sourceUrl: string;
  youtubeId?: string;
  videoLabel: string;
  highlights: { value: string; label: string }[];
  features: { title: string; text: string }[];
  specs: Spec[];
  steps: Step[];
  compatibleFilms: string[];
  idealFor: string;
  faqs: Faq[];
};

export const machines: Machine[] = [
  {
    slug: "mini-zv2",
    name: "MINI ZV2",
    eyebrow: "COMPACTA · RÁPIDA · PARA MOSTRADOR",
    tagline: "Corte profesional en un formato mucho más compacto.",
    description:
      "La MINI ZV2 está pensada para tiendas que quieren cortar protectores de teléfonos y tablets bajo demanda sin ocupar demasiado espacio. Integra alimentación automática de película, pantalla táctil, Wi‑Fi y Bluetooth.",
    image: "/images/products/mini-zv2-white-v2.png",
    gallery: [
      { src: "/images/products/mini-zv2-feed.webp", alt: "MINI ZV2 con alimentación automática de película" },
      { src: "/images/products/mini-zv2-counter.webp", alt: "MINI ZV2 en mostrador compacto" },
      { src: "/images/products/mini-zv2-devices.webp", alt: "MINI ZV2 para teléfonos y tablets" }
    ],
    sourceUrl: "https://www.rockspacediy.com/products/mini-zv2-smart-plotter/",
    youtubeId: "oPZsBVUgjLY",
    videoLabel: "Video oficial: MINI ZV2 en funcionamiento",
    highlights: [
      { value: "0.1 mm", label: "precisión de corte" },
      { value: "500 mm/s", label: "velocidad máxima" },
      { value: "11\"", label: "tablets compatibles" },
      { value: "5.5\"", label: "pantalla táctil" }
    ],
    features: [
      {
        title: "Ocupa menos espacio",
        text: "Rock Space la describe como aproximadamente un tercio del tamaño de la ZC1 Max, ideal para mostradores compactos."
      },
      {
        title: "Alimentación automática",
        text: "La película se introduce directamente en la máquina y el flujo habitual no requiere tapete de corte."
      },
      {
        title: "Teléfonos y tablets",
        text: "Puede cortar protectores para teléfonos y tablets de hasta 11 pulgadas."
      },
      {
        title: "Conectividad integrada",
        text: "Incluye Wi‑Fi, Bluetooth y panel táctil para buscar modelos y operar desde la propia máquina."
      }
    ],
    specs: [
      { label: "Modelo", value: "MINI ZV2" },
      { label: "Conectividad", value: "Bluetooth + Wi‑Fi" },
      { label: "Panel", value: "Pantalla táctil 5.5\"" },
      { label: "Ancho máx. de alimentación", value: "215 mm" },
      { label: "Ancho máx. de corte", value: "200 mm" },
      { label: "Precisión", value: "0.1 mm" },
      { label: "Velocidad", value: "300–500 mm/s" },
      { label: "Presión máxima", value: "1200 g" },
      { label: "Potencia", value: "< 50 W" },
      { label: "Dimensiones", value: "299 × 176 × 158 mm" }
    ],
    steps: [
      {
        title: "1. Encienda y conecte",
        text: "Coloque la MINI ZV2 sobre una superficie estable, enciéndala y confirme la conexión a la red."
      },
      {
        title: "2. Busque el dispositivo",
        text: "Desde la pantalla seleccione la marca y el modelo del teléfono o tablet que desea proteger."
      },
      {
        title: "3. Inserte la película",
        text: "Alinee una película compatible en la entrada. La alimentación automática ayuda a posicionarla."
      },
      {
        title: "4. Corte e instale",
        text: "Confirme la plantilla, ejecute el corte y retire la pieza para continuar con la instalación del protector."
      }
    ],
    compatibleFilms: ["HD flexible", "Mate", "Privacidad", "Anti‑blue light", "Películas traseras"],
    idealFor: "Puntos de venta pequeños, kioscos y tiendas que quieren empezar con corte bajo demanda.",
    faqs: [
      {
        question: "¿Puede cortar protectores para tablet?",
        answer: "Sí. El fabricante indica compatibilidad con protectores para tablets de hasta 11 pulgadas."
      },
      {
        question: "¿Necesita tapete de corte?",
        answer: "Para el flujo normal de película, la MINI ZV2 utiliza alimentación automática y no requiere tapete de corte."
      },
      {
        question: "¿Se conecta por Wi‑Fi?",
        answer: "Sí. Sus especificaciones oficiales incluyen Wi‑Fi y Bluetooth."
      }
    ]
  },
  {
    slug: "zc1-max",
    name: "ZC1 Max",
    eyebrow: "MAYOR FORMATO · MÁS DISPOSITIVOS",
    tagline: "Una estación de corte para tiendas que necesitan cubrir mucho más.",
    description:
      "La ZC1 Max amplía el formato de trabajo para teléfonos, tablets, relojes, consolas, cámaras y laptops de hasta 16 pulgadas. Su pantalla táctil integrada y conexión Wi‑Fi permiten trabajar desde la máquina.",
    image: "/images/products/zc1-max-white-v2.png",
    gallery: [
      { src: "/images/products/zc1-formats.webp", alt: "ZC1 Max y compatibilidad de formatos" },
      { src: "/images/products/zc1-devices.webp", alt: "Compatibilidad ZC1 Max con tablets y laptops" },
      { src: "/images/products/zc1-workflow.webp", alt: "ZC1 Max trabajando con sistema de personalización" }
    ],
    sourceUrl: "https://es.rockspacediy.com/products/zc1-smart-protective-film-plotter/",
    youtubeId: "rGq9mg1-HHo",
    videoLabel: "Tutorial integrado: ZC1 Max",
    highlights: [
      { value: "16\"", label: "laptops compatibles" },
      { value: "0.1 mm", label: "precisión de corte" },
      { value: "1000 g", label: "presión de corte" },
      { value: "S–XL", label: "formatos de película" }
    ],
    features: [
      {
        title: "Compatibilidad amplia",
        text: "Trabaja formatos S, M, L y XL para dispositivos que van desde teléfonos hasta laptops de 16 pulgadas."
      },
      {
        title: "Estructura de cinco ruedas",
        text: "El fabricante destaca una estructura de cinco ruedas orientada a mantener presión y precisión en formatos grandes."
      },
      {
        title: "Pantalla + Wi‑Fi",
        text: "Permite buscar plantillas y controlar el flujo sin depender de una computadora externa."
      },
      {
        title: "Biblioteca actualizable",
        text: "Las plantillas de corte se actualizan para incorporar nuevos dispositivos."
      }
    ],
    specs: [
      { label: "Modelo", value: "ZC1 Max" },
      { label: "Conectividad", value: "Wi‑Fi 802.11n" },
      { label: "Panel", value: "LCD táctil 5.5\"" },
      { label: "Ancho máx. de alimentación", value: "370 mm" },
      { label: "Ancho máx. de corte", value: "280 mm" },
      { label: "Precisión", value: "0.1 mm" },
      { label: "Velocidad", value: "33 mm/s" },
      { label: "Presión de corte", value: "1000 g" },
      { label: "Potencia", value: "80 W" },
      { label: "Dimensiones", value: "613 × 220 × 174 mm" }
    ],
    steps: [
      {
        title: "1. Prepare la estación",
        text: "Conecte la máquina y confirme que el Wi‑Fi esté disponible para acceder a la biblioteca de plantillas."
      },
      {
        title: "2. Seleccione el modelo",
        text: "Busque el dispositivo y revise el tamaño de película correspondiente: S, M, L o XL."
      },
      {
        title: "3. Cargue la lámina",
        text: "Alinee la película sobre el área de alimentación respetando las guías de la máquina."
      },
      {
        title: "4. Ejecute el corte",
        text: "Confirme el trazado, inicie el trabajo y continúe con la instalación cuando termine el corte."
      }
    ],
    compatibleFilms: ["HD flexible", "Mate", "Privacidad", "Anti‑reflejo", "Anti‑blue light", "Películas traseras"],
    idealFor: "Tiendas con mayor volumen y negocios que necesitan cubrir teléfonos, tablets y laptops desde una sola estación.",
    faqs: [
      {
        question: "¿Cuál es la diferencia principal frente a MINI ZV2?",
        answer: "La ZC1 Max trabaja formatos más grandes y puede cortar protectores para laptops de hasta 16 pulgadas; la MINI ZV2 está enfocada en teléfonos y tablets pequeñas."
      },
      {
        question: "¿Qué materiales puede cortar?",
        answer: "La ficha oficial menciona películas protectoras TPU, PET y EPU, además de varios tamaños de película."
      },
      {
        question: "¿Las plantillas se actualizan?",
        answer: "Sí. Rock Space indica que los datos de nuevos modelos se actualizan después del lanzamiento del dispositivo."
      }
    ]
  },
  {
    slug: "zc5",
    name: "ZC5",
    eyebrow: "NUEVA GENERACIÓN · PRESIÓN AUTOMÁTICA",
    tagline: "Escanee la película. Ajuste automático. Corte preciso.",
    description:
      "La ZC5 incorpora cámara para leer el QR de películas compatibles y ajustar automáticamente parámetros de presión y profundidad. Tiene pantalla HD de 7 pulgadas, Wi‑Fi de doble banda y una biblioteca de más de 65,000 plantillas.",
    image: "/images/products/zc5-white-v2.png",
    gallery: [
      { src: "/images/products/zc5-recognition.webp", alt: "ZC5 con reconocimiento inteligente de película" },
      { src: "/images/products/zc5-hybrid.webp", alt: "ZC5 cortando película híbrida" },
      { src: "/images/products/zc5-screen.webp", alt: "Pantalla HD de la ZC5" }
    ],
    sourceUrl: "https://www.rockspacediy.com/products/zc5-smart-protective-film-plotter/",
    youtubeId: "HBQ9hVbiN1Y",
    videoLabel: "Tutorial integrado: ZC5",
    highlights: [
      { value: "65K+", label: "plantillas" },
      { value: "1500 g", label: "fuerza máxima" },
      { value: "500 mm/s", label: "velocidad de corte" },
      { value: "7\"", label: "pantalla HD" }
    ],
    features: [
      {
        title: "Presión automática",
        text: "La cámara integrada lee el QR de la película y configura automáticamente parámetros de corte compatibles."
      },
      {
        title: "Más tipos de película",
        text: "Está diseñada para trabajar TPU, hidrogel, privacidad y 9H UV Hybrid Glass Film, entre otras categorías."
      },
      {
        title: "Pantalla HD de 7 pulgadas",
        text: "Una interfaz más grande para buscar modelos y controlar el corte directamente desde el equipo."
      },
      {
        title: "Biblioteca de 65,000+ plantillas",
        text: "Rock Space indica cobertura de marcas y modelos principales con actualizaciones para nuevos dispositivos."
      }
    ],
    specs: [
      { label: "Modelo", value: "ZC5" },
      { label: "Conectividad", value: "Wi‑Fi 2.4 GHz + 5 GHz" },
      { label: "Panel", value: "Pantalla HD táctil 7\"" },
      { label: "Ancho máx. de alimentación", value: "300 mm" },
      { label: "Ancho máx. de corte", value: "200 mm" },
      { label: "Precisión", value: "0.1 mm" },
      { label: "Velocidad", value: "500 mm/s" },
      { label: "Presión máxima", value: "1500 g" },
      { label: "Potencia", value: "< 50 W" },
      { label: "Dimensiones", value: "408 × 216 × 214 mm" }
    ],
    steps: [
      {
        title: "1. Encienda y conecte",
        text: "Coloque la ZC5 en una superficie estable, enciéndala y confirme la conexión Wi‑Fi."
      },
      {
        title: "2. Calibre cuando corresponda",
        text: "Después de sustituir la cuchilla, realice la calibración desde el software integrado antes de volver al trabajo normal."
      },
      {
        title: "3. Escanee la película",
        text: "La cámara identifica el QR del material compatible para asignar presión y profundidad de corte."
      },
      {
        title: "4. Seleccione y corte",
        text: "Busque el dispositivo, confirme la plantilla y ejecute el corte con los parámetros definidos por el sistema."
      }
    ],
    compatibleFilms: ["TPU / hidrogel", "Privacidad", "9H UV Hybrid", "Mate", "HD", "Películas con QR compatible"],
    idealFor: "Tiendas que buscan automatizar parámetros de corte, trabajar más materiales y reducir ajustes manuales.",
    faqs: [
      {
        question: "¿Cómo ajusta la presión de corte?",
        answer: "La cámara integrada escanea el QR de la película y usa esa identificación para asignar presión y profundidad de corte compatibles."
      },
      {
        question: "¿Cuándo se debe calibrar la cuchilla?",
        answer: "La documentación del fabricante recomienda recalibrar después de cada sustitución de cuchilla."
      },
      {
        question: "¿Qué tamaño de dispositivos cubre?",
        answer: "La ficha oficial indica teléfonos de hasta 8.2 pulgadas y tablets de hasta 12.2 pulgadas, con tamaños de película S, M y L."
      }
    ]
  },
  {
    slug: "smart-vacuum-uv",
    name: "Smart Vacuum UV",
    eyebrow: "CURADO UV · VACÍO · ACABADO UNIFORME",
    tagline: "Curado UV al vacío para completar instalaciones con precisión.",
    description: "La Smart Vacuum UV es una estación compacta para el proceso final de láminas UV. Su cámara con tapa reúne vacío y curado en un solo equipo para mantener un flujo de trabajo limpio en el punto de venta.",
    image: "/images/products/uv-curing-white-v1.png",
    gallery: [],
    sourceUrl: "",
    youtubeId: "RoUU_y7quXE",
    videoLabel: "Video oficial: aplicación y curado con Smart Vacuum UV",
    highlights: [
      { value: "UV", label: "sistema de curado" },
      { value: "Vacío", label: "proceso integrado" },
      { value: "37", label: "unidades reportadas" },
      { value: "Compacta", label: "estación de mostrador" }
    ],
    features: [
      { title: "Vacío y curado", text: "Integra las etapas finales del proceso de instalación UV dentro de una sola cámara." },
      { title: "Formato compacto", text: "Su cuerpo cerrado está pensado para incorporarse con facilidad al área de trabajo." },
      { title: "Presentación profesional", text: "Ayuda a mantener un flujo ordenado al terminar protectores compatibles con tecnología UV." },
      { title: "Disponibilidad local", text: "Equipo incorporado al catálogo de Rock Space Honduras con existencia reportada." }
    ],
    specs: [
      { label: "Código", value: "RS-PLOTCUV" },
      { label: "UPC", value: "6941402717360" },
      { label: "Existencia reportada", value: "37 unidades" },
      { label: "Precio detalle", value: "L 8,200.00" },
      { label: "Precio mayorista", value: "L 4,250.00" }
    ],
    steps: [
      { title: "1. Prepare", text: "Confirme que la lámina UV esté instalada y lista para el proceso final." },
      { title: "2. Coloque", text: "Ubique el dispositivo dentro de la cámara sin forzar la tapa." },
      { title: "3. Ejecute", text: "Seleccione el ciclo correspondiente siguiendo la guía del material utilizado." },
      { title: "4. Revise", text: "Retire el dispositivo y compruebe el acabado antes de entregarlo." }
    ],
    compatibleFilms: ["Láminas UV compatibles", "Protectores frontales UV"],
    idealFor: "Tiendas que instalan láminas UV y necesitan completar el proceso en una estación compacta.",
    faqs: [
      { question: "¿Para qué sirve esta máquina?", answer: "Está destinada al proceso final de instalación de protectores UV compatibles, combinando vacío y curado dentro de una cámara." },
      { question: "¿Incluye la lámina?", answer: "La disponibilidad de consumibles se consulta por separado con el equipo de ventas y soporte." }
    ]
  },
  {
    slug: "heat-transfer-110v",
    name: "Heat Transfer 110 V",
    eyebrow: "TRANSFERENCIA · DISEÑOS · 110 V",
    tagline: "Transferencia de diseños en un equipo compacto y fácil de integrar.",
    description: "Equipo Rock Space de transferencia térmica para impresión de diseños. Su formato compacto y controles integrados permiten incorporarlo a un área de personalización sin ocupar una estación industrial.",
    image: "/images/products/heat-transfer-white-v1.png",
    gallery: [],
    sourceUrl: "",
    youtubeId: "r9XRM-7MHyw",
    videoLabel: "Video oficial: Heat Transfer para personalización de fundas",
    highlights: [
      { value: "110 V", label: "alimentación indicada" },
      { value: "Térmica", label: "transferencia de diseños" },
      { value: "1", label: "unidad reportada" },
      { value: "Compacta", label: "estación de personalización" }
    ],
    features: [
      { title: "Transferencia de diseños", text: "Pensada para aplicar diseños mediante un proceso controlado de calor y tiempo." },
      { title: "Controles integrados", text: "La interfaz del equipo reúne los ajustes operativos en el propio cuerpo de la máquina." },
      { title: "Formato de mostrador", text: "Su diseño compacto permite sumarla a una estación de personalización existente." },
      { title: "Disponible en Honduras", text: "Modelo incorporado al catálogo con voltaje de 110 V y existencia reportada." }
    ],
    specs: [
      { label: "Código", value: "RS-PLOTDISÑ" },
      { label: "UPC", value: "6941402771799" },
      { label: "Voltaje", value: "110 V" },
      { label: "Existencia reportada", value: "1 unidad" },
      { label: "Precio detalle", value: "L 24,975.00" },
      { label: "Precio detalle sin ISV", value: "L 21,717.39" },
      { label: "Precio mayorista", value: "L 10,350.00" },
      { label: "Precio mayorista sin ISV", value: "L 9,000.00" }
    ],
    steps: [
      { title: "1. Prepare", text: "Prepare el diseño y el material compatible según el trabajo que realizará." },
      { title: "2. Configure", text: "Ajuste tiempo y temperatura de acuerdo con las indicaciones del material." },
      { title: "3. Posicione", text: "Alinee el diseño sobre la superficie antes de cerrar el equipo." },
      { title: "4. Transfiera", text: "Complete el ciclo y deje enfriar el material antes de revisar el acabado." }
    ],
    compatibleFilms: ["Materiales de transferencia compatibles", "Diseños para personalización"],
    idealFor: "Negocios que desean ampliar su oferta con transferencia de diseños y personalización compacta.",
    faqs: [
      { question: "¿Qué voltaje utiliza?", answer: "La ficha suministrada identifica esta versión para 110 V." },
      { question: "¿Qué materiales acepta?", answer: "La compatibilidad depende del insumo de transferencia; ventas y soporte puede confirmar el material adecuado para cada trabajo." }
    ]
  },
  {
    slug: "zc3",
    name: "ZC3 Smart Plotter",
    eyebrow: "PLOTTER INTELIGENTE · VERSIÓN EN INGLÉS",
    tagline: "Corte inteligente para ampliar la oferta de protectores bajo demanda.",
    description: "La ZC3 Smart Plotter es una máquina de corte para preparar protectores y otros trabajos compatibles desde una estación compacta. Esta unidad corresponde a la versión American Standard / English.",
    image: "/images/products/zc3-white-v1.png",
    gallery: [],
    sourceUrl: "",
    youtubeId: "5nUEkaVhWYQ",
    videoLabel: "Tutorial oficial: cómo utilizar la ZC3 Smart Plotter",
    highlights: [
      { value: "Smart", label: "plotter de corte" },
      { value: "English", label: "idioma de esta versión" },
      { value: "1", label: "unidad reportada" },
      { value: "Compacta", label: "para mostrador" }
    ],
    features: [
      { title: "Corte bajo demanda", text: "Permite preparar trabajos compatibles desde una sola estación de corte." },
      { title: "Pantalla integrada", text: "La selección y operación principal se realiza desde el panel del propio equipo." },
      { title: "Formato compacto", text: "Su estructura está pensada para aprovechar mejor el espacio del mostrador." },
      { title: "Versión identificada", text: "La unidad disponible corresponde a American Standard con interfaz en inglés." }
    ],
    specs: [
      { label: "Modelo", value: "ZC3" },
      { label: "Código", value: "RS-PLOTZC3" },
      { label: "UPC", value: "6941402764951" },
      { label: "Versión", value: "American Standard / English" },
      { label: "Existencia reportada", value: "1 unidad" },
      { label: "Precio detalle", value: "L 25,000.00" },
      { label: "Precio detalle sin ISV", value: "L 21,739.13" },
      { label: "Precio mayorista", value: "L 12,700.00" },
      { label: "Precio mayorista sin ISV", value: "L 11,043.48" }
    ],
    steps: [
      { title: "1. Prepare", text: "Encienda el equipo y confirme que la superficie de trabajo esté despejada." },
      { title: "2. Seleccione", text: "Busque el modelo o plantilla desde la interfaz en inglés." },
      { title: "3. Cargue", text: "Alinee el material compatible siguiendo las guías de alimentación." },
      { title: "4. Corte", text: "Confirme el trazado, ejecute el trabajo y revise la pieza antes de instalarla." }
    ],
    compatibleFilms: ["Láminas frontales compatibles", "Protectores de corte bajo demanda"],
    idealFor: "Tiendas que necesitan una estación compacta de corte inteligente con interfaz en inglés.",
    faqs: [
      { question: "¿En qué idioma viene esta unidad?", answer: "La ficha suministrada la identifica como versión American Standard / English." },
      { question: "¿Qué láminas utiliza?", answer: "La compatibilidad exacta depende del formato; ventas y soporte puede confirmar los insumos disponibles para la ZC3." }
    ]
  }
];

export function getMachine(slug: string) {
  return machines.find((machine) => machine.slug === slug);
}
