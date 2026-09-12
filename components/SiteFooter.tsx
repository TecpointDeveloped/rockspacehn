"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SITE, whatsappUrlFor } from "@/lib/site";

export function SiteFooter({ salesNumber = SITE.salesWhatsappNumber, supportNumber = SITE.supportWhatsappNumber }: { salesNumber?: string; supportNumber?: string }) {
  const pathname = usePathname();
  const displayNumber = (value: string) => {
    const digits = value.replace(/\D/g, "");
    const local = digits.replace(/^504/, "");
    return `+504 ${local.replace(/(\d{4})(\d{4})/, "$1-$2")}`;
  };
  if (pathname.startsWith("/admin")) return null;
  return (
    <footer className="site-footer">
      <div className="footer-grid shell">
        <div className="footer-brand">
          <div className="brand brand-footer">
            <span className="brand-lockup footer-lockup">
              <Image className="brand-wordmark" src="/brand/rock-space-wordmark.webp" alt="rock space" width={800} height={125} />
              <small>HONDURAS</small>
            </span>
          </div>
          <p>Stickers personalizados, máquinas inteligentes de corte, láminas, tutoriales y soporte para Honduras.</p>
        </div>
        <div>
          <h3>Explorar</h3>
          <Link href="/stickers">Stickers RCL1005</Link>
          <Link href="/maquinas">Máquinas</Link>
          <Link href="/laminas">Láminas</Link>
          <Link href="/tutoriales">Tutoriales</Link>
          <Link href="/soporte">Soporte</Link>
        </div>
        <div className="footer-contacts">
          <h3>Contacto</h3>
          <a href={whatsappUrlFor(salesNumber, "Hola, necesito atención al cliente de Rock Space Honduras.")} target="_blank" rel="noreferrer"><small>Atención al cliente</small><strong>{displayNumber(salesNumber)}</strong></a>
          <a href={whatsappUrlFor(supportNumber, "Hola, necesito ventas o soporte para mi equipo Rock Space.")} target="_blank" rel="noreferrer"><small>Ventas y soporte</small><strong>{displayNumber(supportNumber)}</strong></a>
          <a href={SITE.instagram} target="_blank" rel="noreferrer">{SITE.instagramHandle}</a>
        </div>
      </div>
      <div className="footer-bottom shell">
        <span>© {new Date().getFullYear()} Rock Space Honduras.</span>
        <span>Información técnica basada en fichas oficiales de Rock Space.</span>
      </div>
    </footer>
  );
}
