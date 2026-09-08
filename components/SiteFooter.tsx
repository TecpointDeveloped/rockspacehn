"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SITE, whatsappUrl } from "@/lib/site";

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return (
    <footer className="site-footer">
      <div className="footer-grid shell">
        <div className="footer-brand">
          <div className="brand brand-footer">
            <Image className="official-brand-logo footer-logo" src="/brand/rock-space-honduras.png" alt="" width={82} height={82} />
            <span className="brand-copy"><strong>rock space</strong><small>HONDURAS</small></span>
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
        <div>
          <h3>Contacto</h3>
          <a href={whatsappUrl("Hola, necesito asesoría sobre Rock Space.")} target="_blank" rel="noreferrer">WhatsApp</a>
          <span>{SITE.instagramHandle}</span>
          <span>Soporte: equipo de expertos Rock Space</span>
        </div>
      </div>
      <div className="footer-bottom shell">
        <span>© {new Date().getFullYear()} Rock Space Honduras.</span>
        <span>Información técnica basada en fichas oficiales de Rock Space.</span>
      </div>
    </footer>
  );
}
