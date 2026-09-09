import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { machines } from "@/data/machines";
import { stickerMachine } from "@/data/stickerMachine";
import { getCmsContent } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Soporte",
  description: "Soporte técnico y guías para RCL1005, MINI ZV2, ZC1 Max y ZC5 en Honduras."
};

export const revalidate = 60;

export default async function SupportPage() {
  const cms = await getCmsContent();
  const s = cms.sticker || stickerMachine;
  const support = cms.support;
  const supportUrl = (message: string) => `https://wa.me/${support.supportWhatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <>
      <section className="support-hero">
        <div className="shell support-hero-inner">
          <span className="eyebrow light">SOPORTE ROCKSPACEHN</span>
          <h1>¿Qué necesita resolver?</h1>
          <p>Empiece por la guía de su equipo. Si el problema continúa, escriba directamente a soporte técnico.</p>
          <a className="button button-white" href={supportUrl("Hola, necesito soporte técnico de Rock Space.")} target="_blank" rel="noreferrer">Hablar con soporte</a>
        </div>
      </section>

      <section className="section shell">
        <div className="support-machine-grid support-machine-grid-four">
          <Link className="support-machine-card support-sticker-card" href="/stickers#tutorial">
            <Image src={s.heroImage} alt="RCL1005" width={760} height={620} sizes="(max-width: 640px) 100vw, (max-width: 920px) 50vw, 25vw" />
            <div><span>Stickers · guía y tutorial</span><h2>RCL1005</h2><b>Abrir →</b></div>
          </Link>
          {cms.machines.map((machine) => (
            <Link className="support-machine-card" href={`/maquinas/${machine.slug}#tutorial`} key={machine.slug}>
              <Image src={machine.image} alt={machine.name} width={760} height={620} sizes="(max-width: 640px) 100vw, (max-width: 920px) 50vw, 25vw" />
              <div><span>Protección · guía y tutorial</span><h2>{machine.name}</h2><b>Abrir →</b></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section shell support-checklist">
        <div>
          <span className="eyebrow">ANTES DE ESCRIBIR</span>
          <h2>Envíe estos datos para resolver más rápido.</h2>
        </div>
        <ol>
          <li><b>Modelo del equipo.</b><span>RCL1005, MINI ZV2, ZC1 Max o ZC5.</span></li>
          <li><b>Qué estaba intentando hacer.</b><span>Subir foto, imprimir, cortar, buscar modelo, alimentar película, calibrar, conectar Wi‑Fi, etc.</span></li>
          <li><b>Foto o video corto.</b><span>Si aparece un mensaje o el resultado sale mal, muéstrelo.</span></li>
          <li><b>Consumible o material.</b><span>Para RCL1005 indique SD21; para plotters, nombre y tamaño de la película.</span></li>
        </ol>
      </section>

      <section className="section shell faq-section">
        <div className="section-heading"><span className="eyebrow">SOLUCIONES RÁPIDAS</span><h2>Preguntas comunes</h2></div>
        <div className="faq-list">
          <details><summary>¿Dónde veo el tutorial de la RCL1005?<span>+</span></summary><p>Entre a Stickers o Tutoriales. El video y los pasos están integrados dentro de ROCKSPACEHN.</p></details>
          <details><summary>La plotter no encuentra el modelo del teléfono.<span>+</span></summary><p>Revise la conexión de red y vuelva a buscar marca/modelo. Para lanzamientos recientes, confirme que la biblioteca ya haya recibido la actualización correspondiente.</p></details>
          <details><summary>El corte no atraviesa o queda demasiado profundo.<span>+</span></summary><p>Verifique cuchilla, material y parámetros. En ZC5, recalibre después de sustituir la cuchilla y confirme que la película compatible haya sido reconocida correctamente.</p></details>
          <details><summary>¿Puedo usar cualquier lámina o papel?<span>+</span></summary><p>No conviene asumirlo. RCL1005 utiliza consumibles SD21; en las plotters debe confirmarse compatibilidad, tamaño y material antes de cortar.</p></details>
        </div>
      </section>

      <section className="contact-panel shell">
        <div><span className="eyebrow">CONTACTO DIRECTO</span><h2>Nuestro equipo de expertos Rock Space</h2><p>Soporte técnico oficial en Honduras · {support.instagramHandle}</p></div>
        <div className="button-row">
          <a className="button button-primary" href={supportUrl("Hola, necesito soporte técnico de Rock Space.")} target="_blank" rel="noreferrer">Abrir WhatsApp</a>
        </div>
      </section>
    </>
  );
}
