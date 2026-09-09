import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { SupportCTA } from "@/components/SupportCTA";
import { VideoEmbed } from "@/components/VideoEmbed";
import { LearningPath } from "@/components/LearningPath";
import { stickerMachine } from "@/data/stickerMachine";
import { whatsappUrlFor } from "@/lib/site";
import { getCmsContent } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Stickers personalizados | RCL1005",
  description: "RCL1005 en Honduras: impresión y corte de stickers personalizados, skins, fotos y protectores desde un solo equipo.",
  alternates: { canonical: "/stickers" },
  openGraph: {
    title: "RCL1005 | Stickers personalizados en Honduras",
    description: "Convierta fotos en stickers, skins y recuerdos personalizados desde un equipo de escritorio.",
    images: [{ url: "/images/products/rcl1005-stickers.webp", alt: "Stickers personalizados creados con RCL1005" }]
  },
  twitter: { card: "summary_large_image", images: ["/images/products/rcl1005-stickers.webp"] }
};

export const revalidate = 60;

export default async function StickersPage() {
  const cms = await getCmsContent();
  const s = cms.sticker || stickerMachine;
  const learningItems = [
    { label: "Cómo funciona", title: "Vea el flujo completo", text: "Conozca cómo una foto se convierte en una hoja impresa y cortada desde el mismo equipo." },
    { label: "Configuración inicial", title: "Prepare equipo y SD21", text: "Ubique la RCL1005 en un mostrador estable, conecte la red y cargue los consumibles dedicados." },
    { label: "Primer trabajo", title: "Foto, pedido y entrega", text: "Seleccione el formato, reciba la imagen, revise el pedido en pantalla e inicie impresión y corte." },
    { label: "Mantenimiento", title: "Proteja la calidad", text: "Mantenga limpia el área de papel, use el set SD21 emparejado y reemplace el ribbon al completar su capacidad." },
    { label: "Solución de problemas", title: "Diagnóstico con contexto", text: "Anote el mensaje en pantalla, fotografíe el resultado y comparta consumible y paso exacto con soporte local." }
  ];

  return (
    <>
      <section className="sticker-product-hero">
        <div className="shell sticker-product-grid">
          <div className="sticker-product-copy">
            <span className="eyebrow light">{s.eyebrow}</span>
            <h1>RCL1005</h1>
            <h2>{s.tagline}</h2>
            <p>{s.description}</p>
            <div className="button-row">
              <a className="button button-white" href={whatsappUrlFor(cms.support.salesWhatsappNumber, "Hola, quiero información y disponibilidad de la RCL1005 para stickers personalizados.")} target="_blank" rel="noreferrer">Consultar RCL1005</a>
              <a className="button button-ghost-light" href="#tutorial">Ver cómo funciona</a>
            </div>
          </div>
          <div className="sticker-product-stage">
            <div className="sticker-burst" />
            <Image src={s.heroImage} alt="RCL1005 AI Photo Sticker Printer and Cutter" width={1200} height={900} priority sizes="(max-width: 920px) 94vw, 56vw" />
            <div className="sticker-tag tag-a">FOTOS → STICKERS</div>
            <div className="sticker-tag tag-b">PRINT + CUT</div>
            <div className="sticker-tag tag-c">AI TOOLS</div>
          </div>
        </div>
      </section>

      <section className="product-metrics shell">
        {s.highlights.map((item) => <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}
      </section>

      <section className="section shell sticker-output-section">
        <SectionHeading eyebrow="UNA MÁQUINA · VARIAS VENTAS" title="No se queda solo en stickers.">
          <p>La RCL1005 convierte el mostrador en un punto de personalización bajo demanda.</p>
        </SectionHeading>
        <div className="sticker-output-grid">
          {s.outputs.map((item, index) => (
            <article key={item.title}>
              <span>0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sticker-gallery-section">
        <div className="shell">
          <div className="sticker-gallery-heading">
            <span className="eyebrow light">PERSONALIZACIÓN QUE SE VE</span>
            <h2>El producto final es el protagonista.</h2>
            <p>Stickers para teléfonos, powerbanks, tablets, vasos, laptops y libretas; además de skins y fotografías personalizadas.</p>
          </div>
          <div className="sticker-gallery">
            {s.gallery.map((image, index) => (
              <figure className={index === 0 || index === 3 ? "sticker-gallery-wide" : ""} key={image.src}>
                <Image src={image.src} alt={image.alt} width={1400} height={900} priority={index === 0} quality={88} sizes={index === 0 || index === 3 ? "(max-width: 1180px) 100vw, 1180px" : "(max-width: 640px) 100vw, 50vw"} />
                <figcaption>{image.alt}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell">
        <SectionHeading eyebrow="POR QUÉ ES EL CENTRO" title="Una experiencia que atrae al cliente al mostrador." />
        <div className="feature-grid">
          {s.features.map((feature, index) => (
            <article className="feature-card" key={feature.title}>
              <span className="feature-index">0{index + 1}</span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="tutorial-dark sticker-tutorial" id="tutorial">
        <div className="shell tutorial-detail-grid">
          <div>
            <span className="eyebrow light">TUTORIAL INTEGRADO</span>
            <h2>De una foto a stickers, sin salir de ROCKSPACEHN.</h2>
            <p>El video se reproduce dentro de esta página. Debajo está el flujo resumido para que el equipo de tienda pueda aprenderlo aquí mismo.</p>
            <div className="tutorial-chip">▶ RCL1005 · VIDEO INTEGRADO</div>
          </div>
          <VideoEmbed youtubeId={s.youtubeId} title={s.videoLabel} spanishSummary={s.spanishSummary} />
        </div>
        <div className="shell sticker-step-grid">
          {s.steps.map((step) => <article key={step.title}><h3>{step.title}</h3><p>{step.text}</p></article>)}
        </div>
        <div className="shell learning-path-wrap">
          <span className="eyebrow light">RUTA DE APRENDIZAJE</span>
          <LearningPath items={learningItems} />
        </div>
      </section>

      <section className="section shell two-column-info" id="consumible">
        <div>
          <SectionHeading eyebrow="FICHA TÉCNICA" title="Todo lo importante, aquí mismo." />
          <dl className="spec-list">
            {s.specs.map((spec) => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}
          </dl>
        </div>
        <aside className="ideal-card sticker-consumable-card">
          <Image className="consumable-image" src={s.consumable.image} alt="Set SD21 de hojas adhesivas y ribbon para RCL1005" width={720} height={520} sizes="(max-width: 920px) 100vw, 38vw" />
          <span className="eyebrow">CONSUMIBLE</span>
          <h2>{s.consumable.name}</h2>
          <p>{s.consumable.text}</p>
          <div className="consumable-number"><strong>36</strong><span>impresiones por set</span></div>
          <a className="button button-primary full-button" href={whatsappUrlFor(cms.support.salesWhatsappNumber, "Hola, quiero información sobre consumibles SD21 para la RCL1005.")} target="_blank" rel="noreferrer">Consultar consumibles</a>
        </aside>
      </section>

      <section className="section shell faq-section" id="preguntas">
        <SectionHeading eyebrow="PREGUNTAS FRECUENTES" title="RCL1005, sin complicaciones." />
        <div className="faq-list">
          {s.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}
        </div>
      </section>

      <div className="shell back-link"><Link className="text-link" href="/">← Volver al inicio</Link></div>
      <SupportCTA machineName="RCL1005" />
    </>
  );
}
