import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/SectionHeading";
import { SupportCTA } from "@/components/SupportCTA";
import { VideoEmbed } from "@/components/VideoEmbed";
import { LearningPath } from "@/components/LearningPath";
import { getMachine, machines } from "@/data/machines";
import { whatsappUrl } from "@/lib/site";

export function generateStaticParams() { return machines.map((machine) => ({ slug: machine.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const machine = getMachine(slug); if (!machine) return {};
  const description = `${machine.name}: características, especificaciones, tutorial y soporte en Rock Space Honduras.`;
  return {
    title: machine.name,
    description,
    openGraph: { title: `${machine.name} | Rock Space Honduras`, description, images: [{ url: machine.image, alt: `${machine.name} Rock Space` }] },
    twitter: { card: "summary_large_image", title: `${machine.name} | Rock Space Honduras`, description, images: [machine.image] }
  };
}

export default async function MachinePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const machine = getMachine(slug); if (!machine) notFound();
  const learningItems = [
    { label: "Cómo funciona", title: "Vea el corte completo", text: `El video muestra el flujo esencial de la ${machine.name} sin salir de esta página.` },
    { label: "Configuración inicial", title: "Conecte y prepare", text: machine.steps[0].text },
    { label: "Primer trabajo", title: "Seleccione, cargue y corte", text: `${machine.steps[1].text} ${machine.steps[2].text}` },
    { label: "Mantenimiento", title: "Revise antes de producir", text: machine.slug === "zc5" ? "Recalibre desde el software integrado después de sustituir la cuchilla y mantenga limpia la cámara de lectura." : "Mantenga limpios los rodillos y el área de alimentación; revise cuchilla y material antes de repetir un corte." },
    { label: "Solución de problemas", title: "Aísle la causa", text: "Confirme conexión, modelo, tamaño de película y estado de la cuchilla; comparta el resultado con soporte si el problema continúa." }
  ];
  return (
    <>
      <section className="product-hero-v2">
        <div className="shell product-hero-v2-grid">
          <div className="product-hero-copy">
            <span className="eyebrow light">{machine.eyebrow}</span><h1>{machine.name}</h1><h2>{machine.tagline}</h2><p>{machine.description}</p>
            <div className="button-row"><a className="button button-white" href={whatsappUrl(`Hola, quiero información y disponibilidad de la ${machine.name}.`)} target="_blank" rel="noreferrer">Consultar disponibilidad</a><a className="button button-ghost-light" href="#tutorial">Ver cómo funciona</a></div>
          </div>
          <div className="product-stage"><div className="stage-ring"/><Image src={machine.image} alt={`${machine.name} de Rock Space`} width={1200} height={900} priority sizes="(max-width: 900px) 94vw, 56vw" /><span className="stage-label">ROCK SPACE · HONDURAS</span></div>
        </div>
      </section>

      <section className="product-metrics shell">{machine.highlights.map((item) => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</section>

      <section className="section shell">
        <SectionHeading eyebrow="VÉALA EN DETALLE" title={`${machine.name}, desde diferentes ángulos.`}><p>Imágenes oficiales integradas directamente en la ficha para que el usuario conozca el equipo sin salir del sitio.</p></SectionHeading>
        <div className="product-gallery">{machine.gallery.map((image, index) => <figure className={index === 0 ? "gallery-wide" : ""} key={image.src}><Image src={image.src} alt={image.alt} width={1300} height={1000} sizes={index === 0 ? "(max-width: 900px) 100vw, 58vw" : "(max-width: 900px) 100vw, 42vw"}/><figcaption>{image.alt}</figcaption></figure>)}</div>
      </section>

      <section className="section shell"><SectionHeading eyebrow="LO ESENCIAL" title={`¿Qué hace diferente a ${machine.name}?`} /><div className="feature-grid">{machine.features.map((feature, index) => <article className="feature-card" key={feature.title}><span className="feature-index">0{index + 1}</span><h3>{feature.title}</h3><p>{feature.text}</p></article>)}</div></section>

      <section className="tutorial-dark" id="tutorial"><div className="shell tutorial-detail-grid"><div><span className="eyebrow light">TUTORIAL INTEGRADO</span><h2>Cómo funciona la {machine.name}</h2><p>Reproduzca el tutorial aquí mismo. No hace falta abrir la página del fabricante ni buscar el modelo en otra web.</p><div className="tutorial-chip">▶ VIDEO DENTRO DE ROCKSPACEHN</div></div><VideoEmbed youtubeId={machine.youtubeId} title={machine.videoLabel} /></div><div className="shell tutorial-steps">{machine.steps.map((step) => <article key={step.title}><h3>{step.title}</h3><p>{step.text}</p></article>)}</div><div className="shell learning-path-wrap"><span className="eyebrow light">RUTA DE APRENDIZAJE</span><LearningPath items={learningItems} /></div></section>

      <section className="section shell two-column-info"><div><SectionHeading eyebrow="ESPECIFICACIONES" title="Todo lo importante, aquí." /><dl className="spec-list">{machine.specs.map((spec) => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}</dl><p className="internal-source-note">Información técnica verificada con fichas oficiales de Rock Space y presentada dentro de ROCKSPACEHN.</p></div><aside className="ideal-card"><span className="eyebrow">IDEAL PARA</span><h2>{machine.idealFor}</h2><h3>Láminas / usos compatibles</h3><ul>{machine.compatibleFilms.map((film) => <li key={film}>✓ {film}</li>)}</ul><a className="button button-primary full-button" href={whatsappUrl(`Hola, quiero saber qué láminas recomiendan para la ${machine.name}.`)} target="_blank" rel="noreferrer">Consultar láminas</a></aside></section>

      <section className="section shell faq-section"><SectionHeading eyebrow="PREGUNTAS FRECUENTES" title={`Respuestas sobre la ${machine.name}`} /><div className="faq-list">{machine.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}</div></section>
      <div className="shell back-link"><Link className="text-link" href="/maquinas">← Volver a todas las máquinas</Link></div><SupportCTA />
    </>
  );
}
