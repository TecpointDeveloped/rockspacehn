import Link from "next/link";
import Image from "next/image";
import { MachineCard } from "@/components/MachineCard";
import { SupportCTA } from "@/components/SupportCTA";
import { VideoEmbed } from "@/components/VideoEmbed";
import { stickerMachine } from "@/data/stickerMachine";
import { machines } from "@/data/machines";
import { whatsappUrl } from "@/lib/site";
import { getCmsContent } from "@/lib/cms";

export const revalidate = 60;

export default async function HomePage() {
  const cms = await getCmsContent();
  const s = cms.sticker || stickerMachine;
  const visibleMachines = cms.machines.filter((machine) => machine.active !== false);

  return (
    <>
      <section className="sticker-home-hero">
        <div className="shell sticker-home-grid">
          <div className="sticker-home-copy">
            <span className="eyebrow light">{cms.home.eyebrow}</span>
            <h1>{cms.home.title}<br/><em>{cms.home.accent}</em></h1>
            <p>{cms.home.description}</p>
            <div className="button-row">
              <Link className="button button-white" href="/stickers">Conocer RCL1005</Link>
              <a className="button button-ghost-light" href="#como-funciona">Ver cómo funciona</a>
            </div>
            <div className="impact-badges">
              <span>✓ Foto → sticker</span>
              <span>✓ 300 DPI</span>
              <span>✓ Corte 0.1 mm</span>
              <span>✓ Herramientas con IA</span>
            </div>
          </div>

          <div className="sticker-home-stage" aria-label="RCL1005 creando stickers personalizados">
            <div className="sticker-burst" />
            <Image className="sticker-home-machine" src={cms.home.heroImage || s.heroImage} alt="RCL1005 impresora y cortadora de stickers Rock Space" width={1200} height={900} priority quality={88} sizes="(max-width: 920px) 94vw, 56vw" />
            <div className="floating-card sticker-float-one"><b>300 DPI</b><span>impresión HD</span></div>
            <div className="floating-card sticker-float-two"><b>0.1 mm</b><span>corte de contorno</span></div>
            <div className="floating-card sticker-float-three"><b>PRINT + CUT</b><span>todo en uno</span></div>
          </div>
        </div>
      </section>

      <section className="sticker-ticker" aria-label="Funciones de la RCL1005">
        <div className="shell ticker-inner">
          <span>PHOTO STICKERS</span><i>•</i><span>SKINS PERSONALIZADAS</span><i>•</i><span>FOTOS</span><i>•</i><span>PROTECCIÓN FRONTAL</span><i>•</i><span>DISEÑOS LOCALES</span>
        </div>
      </section>

      <section className="section shell home-sticker-intro">
        <div className="statement-block">
          <span className="eyebrow">LA EXPERIENCIA PRINCIPAL</span>
          <h2>Que el cliente no solo compre. Que cree algo suyo.</h2>
          <p>Una foto del teléfono puede convertirse en una hoja de stickers, una skin trasera o una impresión personalizada. El proceso se hace en el mismo sistema y el resultado sale listo para entregar.</p>
        </div>
        <div className="sticker-output-grid home-output-grid">
          {s.outputs.map((item, index) => (
            <article key={item.title}>
              <span>0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-sticker-visual">
        <div className="shell home-sticker-visual-grid">
          <div className="home-sticker-photo home-sticker-photo-main">
            <Image src={s.gallery[0].src} alt={s.gallery[0].alt} width={1200} height={1200} sizes="(max-width: 920px) 100vw, 56vw" />
          </div>
          <div className="home-sticker-visual-copy">
            <span className="eyebrow light">PERSONALIZACIÓN REAL</span>
            <h2>Stickers que terminan en el teléfono, la laptop, el vaso o la libreta.</h2>
            <p>No queremos que la web se sienta como un catálogo técnico. Primero mostramos lo que el cliente puede crear; después explicamos la máquina.</p>
            <Link className="button button-white" href="/stickers">Ver todo lo que hace</Link>
          </div>
          <div className="home-sticker-photo">
            <Image src={s.gallery[2].src} alt={s.gallery[2].alt} width={1000} height={720} sizes="(max-width: 920px) 100vw, 44vw" />
          </div>
        </div>
      </section>

      <section className="section shell" id="como-funciona">
        <div className="statement-block compact-statement">
          <span className="eyebrow">CÓMO FUNCIONA</span>
          <h2>De la foto al sticker en cinco pasos.</h2>
        </div>
        <div className="sticker-step-grid home-step-grid">
          {s.steps.map((step) => <article key={step.title}><h3>{step.title}</h3><p>{step.text}</p></article>)}
        </div>
      </section>

      <section className="tutorial-feature tutorial-feature-v2 sticker-home-tutorial">
        <div className="shell tutorial-feature-grid">
          <div className="tutorial-feature-copy">
            <span className="eyebrow light">TUTORIAL DENTRO DE ROCKSPACEHN</span>
            <h2>Véala trabajar antes de preguntar cómo funciona.</h2>
            <p>El tutorial de la RCL1005 se reproduce aquí mismo. El cliente aprende el flujo sin salir del sitio ni tener que buscar el modelo en otra página.</p>
            <Link className="button button-white" href="/stickers#tutorial">Abrir guía completa</Link>
          </div>
          <div className="video-stage">
            <VideoEmbed youtubeId={s.youtubeId} title={s.videoLabel} spanishSummary={s.spanishSummary} />
            <div className="video-under"><span>RCL1005</span><b>Foto → impresión → corte → sticker</b></div>
          </div>
        </div>
      </section>

      <section className="section shell ai-feature-block">
        <div className="ai-feature-image"><Image src={s.gallery[1].src} alt={s.gallery[1].alt} width={1200} height={900} sizes="(max-width: 920px) 100vw, 54vw" /></div>
        <div className="ai-feature-copy">
          <span className="eyebrow">RECORTE Y DISTRIBUCIÓN CON IA</span>
          <h2>Menos diseño manual. Más velocidad en mostrador.</h2>
          <p>El sistema puede retirar fondos y organizar elementos para preparar composiciones de stickers sin que el personal tenga que construir cada hoja desde cero.</p>
          <a className="button button-primary" href={whatsappUrl("Hola, quiero una demostración de la RCL1005 y sus herramientas para stickers.")} target="_blank" rel="noreferrer">Solicitar información</a>
        </div>
      </section>

      <section className="section shell home-proof-grid">
        <div className="home-consumable-visual">
          <Image src={s.consumable.image} alt="Set de papel fotográfico adhesivo SD21 para RCL1005" width={900} height={720} sizes="(max-width: 920px) 100vw, 46vw" />
        </div>
        <div className="home-consumable-copy">
          <span className="eyebrow">CONSUMIBLE ORIGINAL SD21</span>
          <h2>36 hojas. 36 impresiones listas para vender.</h2>
          <p>{s.consumable.text}</p>
          <Link className="button button-primary" href="/stickers#consumible">Conocer el sistema SD21</Link>
        </div>
      </section>

      <section className="section shell home-faq-block">
        <div className="statement-block compact-statement">
          <span className="eyebrow">ANTES DE ELEGIR</span>
          <h2>Lo esencial sobre la RCL1005.</h2>
        </div>
        <div className="faq-list">
          {s.faqs.slice(0, 3).map((faq) => <details key={faq.question}><summary>{faq.question}<span>+</span></summary><p>{faq.answer}</p></details>)}
        </div>
        <Link className="text-link home-faq-link" href="/stickers#preguntas">Ver todas las preguntas <span>→</span></Link>
      </section>

      <section className="machines-showcase machines-after-stickers">
        <div className="shell section">
          <div className="showcase-heading">
            <div><span className="eyebrow light">PROTECCIÓN BAJO DEMANDA</span><h2>Después de personalizar, también protegemos.</h2></div>
            <Link className="text-link light-link" href="/maquinas">Comparar plotters →</Link>
          </div>
          <p className="machines-after-intro">MINI ZV2, ZC1 Max y ZC5 complementan el ecosistema con corte profesional de láminas para teléfonos, tablets y otros dispositivos.</p>
          <div className="machine-grid machine-grid-dark">
            {visibleMachines.map((machine, index) => <MachineCard key={machine.slug} machine={machine} index={index} />)}
          </div>
        </div>
      </section>

      <section className="section shell ecosystem-bridge">
        <div className="ecosystem-bridge-copy">
          <span className="eyebrow">UN SOLO SITIO</span>
          <h2>Stickers, máquinas, tutoriales y soporte.</h2>
          <p>ROCKSPACEHN concentra la información para conocer los equipos, aprender a usarlos y contactar soporte local sin mandar al usuario a buscar respuestas afuera.</p>
        </div>
        <div className="ecosystem-links">
          <Link href="/stickers"><strong>01</strong><span>Stickers RCL1005</span></Link>
          <Link href="/maquinas"><strong>02</strong><span>Plotters</span></Link>
          <Link href="/tutoriales"><strong>03</strong><span>Tutoriales</span></Link>
          <Link href="/soporte"><strong>04</strong><span>Soporte</span></Link>
        </div>
      </section>

      {cms.instagram.enabled && <section className="instagram-section">
        <div className="shell section">
          <div className="instagram-heading">
            <div><span className="eyebrow light">INSTAGRAM · {cms.instagram.handle}</span><h2>{cms.instagram.title}</h2><p>{cms.instagram.description}</p></div>
            <a className="button button-white" href={cms.instagram.profileUrl} target="_blank" rel="noreferrer">Seguir en Instagram ↗</a>
          </div>
          <div className="instagram-grid">
            {cms.instagram.posts.slice(0, 3).map((post, index) => <a href={post.url || cms.instagram.profileUrl} target="_blank" rel="noreferrer" className="instagram-card" key={`${post.url}-${index}`}>
              <Image src={post.image} alt={post.alt} width={720} height={720} sizes="(max-width: 640px) 92vw, (max-width: 920px) 46vw, 31vw" />
              <span><b>{post.caption}</b><i>Ver en Instagram ↗</i></span>
            </a>)}
          </div>
        </div>
      </section>}

      <SupportCTA />
    </>
  );
}
