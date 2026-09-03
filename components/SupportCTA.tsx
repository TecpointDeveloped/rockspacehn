import Link from "next/link";
import { SITE, whatsappUrl } from "@/lib/site";

export function SupportCTA() {
  return (
    <section className="support-cta shell">
      <div>
        <span className="eyebrow light">SOPORTE EN HONDURAS</span>
        <h2>La máquina no termina en la compra.</h2>
        <p>Tutoriales, guías rápidas y acompañamiento técnico con {SITE.advisor}.</p>
      </div>
      <div className="cta-stack">
        <a className="button button-white" href={whatsappUrl("Hola Benjamín, necesito soporte técnico con mi máquina Rock Space.")} target="_blank" rel="noreferrer">Hablar por WhatsApp</a>
        <Link className="button button-ghost-light" href="/soporte">Centro de soporte</Link>
      </div>
    </section>
  );
}
