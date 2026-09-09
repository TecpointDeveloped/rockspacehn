import Link from "next/link";
import { getCmsContent } from "@/lib/cms";
import { whatsappUrlFor } from "@/lib/site";

export async function SupportCTA({ machineName }: { machineName?: string }) {
  const { support } = await getCmsContent();
  return (
    <section className="support-cta shell">
      <div>
        <span className="eyebrow light">SOPORTE EN HONDURAS</span>
        <h2>La máquina no termina en la compra.</h2>
        <p>Tutoriales, guías rápidas y acompañamiento técnico con nuestro equipo de expertos Rock Space.</p>
      </div>
      <div className="cta-stack">
        <a className="button button-white" href={whatsappUrlFor(support.supportWhatsappNumber, machineName ? `Hola, ya tengo una ${machineName} y necesito soporte técnico.` : "Hola, necesito soporte técnico con mi máquina Rock Space.")} target="_blank" rel="noreferrer">Solicitar soporte técnico</a>
        <Link className="button button-ghost-light" href="/soporte">Centro de soporte</Link>
      </div>
    </section>
  );
}
