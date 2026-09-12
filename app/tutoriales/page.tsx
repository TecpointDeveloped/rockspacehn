import type { Metadata } from "next";
import { TutorialHub } from "@/components/TutorialHub";
import { stickerMachine } from "@/data/stickerMachine";
import { whatsappUrlFor } from "@/lib/site";
import { getCmsContent } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Tutoriales",
  description: "Centro de tutoriales para las máquinas y soluciones de Rock Space Honduras."
};

export const revalidate = 60;

export default async function TutorialsPage() {
  const cms = await getCmsContent();
  const s = cms.sticker || stickerMachine;
  const visibleMachines = cms.machines;
  const tutorialItems = [
    { id: "rcl1005", name: "RCL1005", label: "Impresión y corte", image: s.heroImage, href: "/stickers#tutorial", youtubeId: s.youtubeId, videoLabel: s.videoLabel, summary: s.spanishSummary, steps: s.steps },
    ...visibleMachines.map((machine) => ({ id: machine.slug, name: machine.name, label: machine.slug === "smart-vacuum-uv" ? "Curado UV al vacío" : machine.slug === "heat-transfer-110v" ? "Transferencia térmica" : "Corte de protección", image: machine.image, href: `/maquinas/${machine.slug}#tutorial`, youtubeId: machine.youtubeId, videoLabel: machine.videoLabel, summary: machine.spanishSummary, steps: machine.steps }))
  ];

  return (
    <>
      <section className="page-hero shell narrow-hero">
        <span className="eyebrow">CENTRO DE TUTORIALES</span>
        <h1>Aprenda a usar cada equipo aquí mismo.</h1>
        <p>Guías para todas las máquinas Rock Space disponibles, con videos, pasos y acceso a soporte en una sola biblioteca.</p>
      </section>

      <nav className="tutorial-nav shell" aria-label="Temas del centro de aprendizaje">
        <span>Cómo funciona</span><span>Configuración inicial</span><span>Primer trabajo</span><span>Mantenimiento</span><span>Solución de problemas</span>
      </nav>

      <TutorialHub items={tutorialItems} />

      <section className="tutorial-upload-note shell">
        <span className="eyebrow">TODO EN ROCKSPACEHN</span>
        <h2>La guía vive junto al producto.</h2>
        <p>Cada equipo concentra su video oficial, pasos, especificaciones y soporte. La guía escrita en español acompaña cada demostración para que la información principal siempre esté disponible.</p>
      </section>

      <section className="support-cta shell">
        <div><span className="eyebrow light">¿NO ENCONTRÓ SU RESPUESTA?</span><h2>Soporte con nuestro equipo de expertos Rock Space.</h2><p>Envíe el modelo del equipo, una foto o una descripción del problema.</p></div>
        <a className="button button-white" href={whatsappUrlFor(cms.support.supportWhatsappNumber, "Hola, necesito ayuda técnica con mi equipo Rock Space.")} target="_blank" rel="noreferrer">Abrir soporte técnico</a>
      </section>
    </>
  );
}
