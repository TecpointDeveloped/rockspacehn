import type { Metadata } from "next";
import Link from "next/link";
import { VideoEmbed } from "@/components/VideoEmbed";
import { machines } from "@/data/machines";
import { stickerMachine } from "@/data/stickerMachine";
import { whatsappUrl } from "@/lib/site";
import { getCmsContent } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Tutoriales",
  description: "Centro de tutoriales Rock Space Honduras para RCL1005, MINI ZV2, ZC1 Max y ZC5."
};

export const revalidate = 60;

export default async function TutorialsPage() {
  const cms = await getCmsContent();
  const s = cms.sticker || stickerMachine;
  const visibleMachines = cms.machines.filter((machine) => machine.active !== false);

  return (
    <>
      <section className="page-hero shell narrow-hero">
        <span className="eyebrow">CENTRO DE TUTORIALES</span>
        <h1>Aprenda a usar cada equipo aquí mismo.</h1>
        <p>Guías para RCL1005, MINI ZV2, ZC1 Max y ZC5, con videos, pasos y acceso a soporte en una sola biblioteca.</p>
      </section>

      <nav className="tutorial-nav shell" aria-label="Temas del centro de aprendizaje">
        <span>Cómo funciona</span><span>Configuración inicial</span><span>Primer trabajo</span><span>Mantenimiento</span><span>Solución de problemas</span>
      </nav>

      <section className="section shell tutorial-library sticker-tutorial-library">
        <article className="tutorial-library-item tutorial-library-featured">
          <div className="tutorial-library-head">
            <div><span className="eyebrow">RCL1005 · STICKERS</span><h2>De una foto al sticker terminado</h2></div>
            <Link className="text-link" href="/stickers#tutorial">Abrir guía completa →</Link>
          </div>
          <VideoEmbed youtubeId={s.youtubeId} title={s.videoLabel} spanishSummary={s.spanishSummary} />
          <div className="tutorial-topic-grid tutorial-topic-grid-five">
            {s.steps.map((step) => <div key={step.title}><strong>{step.title}</strong><span>{step.text}</span></div>)}
          </div>
        </article>

        <div className="tutorial-divider"><span>PROTECCIÓN DE PANTALLA</span></div>

        {visibleMachines.map((machine) => (
          <article className="tutorial-library-item" key={machine.slug}>
            <div className="tutorial-library-head">
              <div><span className="eyebrow">{machine.name}</span><h2>Primer uso y funcionamiento</h2></div>
              <Link className="text-link" href={`/maquinas/${machine.slug}#tutorial`}>Abrir guía completa →</Link>
            </div>
            <VideoEmbed youtubeId={machine.youtubeId} title={machine.videoLabel} spanishSummary={machine.spanishSummary} />
            <div className="tutorial-topic-grid">
              {machine.steps.map((step) => <div key={step.title}><strong>{step.title}</strong><span>{step.text}</span></div>)}
            </div>
          </article>
        ))}
      </section>

      <section className="tutorial-upload-note shell">
        <span className="eyebrow">TODO EN ROCKSPACEHN</span>
        <h2>La guía vive junto al producto.</h2>
        <p>Cada equipo concentra video, pasos, especificaciones y soporte. Cuando grabemos tutoriales propios en español, se sustituyen los videos embebidos sin cambiar la estructura del sitio.</p>
      </section>

      <section className="support-cta shell">
        <div><span className="eyebrow light">¿NO ENCONTRÓ SU RESPUESTA?</span><h2>Soporte con nuestro equipo de expertos Rock Space.</h2><p>Envíe el modelo del equipo, una foto o una descripción del problema.</p></div>
        <a className="button button-white" href={whatsappUrl("Hola, necesito ayuda con mi equipo Rock Space.")} target="_blank" rel="noreferrer">Abrir WhatsApp</a>
      </section>
    </>
  );
}
