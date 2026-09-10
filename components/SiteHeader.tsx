"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SITE, whatsappUrlFor } from "@/lib/site";

const links = [
  { href: "/stickers", label: "Stickers" },
  { href: "/maquinas", label: "Máquinas" },
  { href: "/laminas", label: "Láminas" },
  { href: "/tutoriales", label: "Tutoriales" },
  { href: "/soporte", label: "Soporte" }
];

export function SiteHeader({ salesNumber = SITE.salesWhatsappNumber }: { salesNumber?: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Link className="brand" href="/" aria-label="Rock Space Honduras - Inicio" onClick={() => setOpen(false)}>
          <Image className="official-brand-logo" src="/brand/rock-space-honduras.png" alt="" width={72} height={72} priority />
          <span className="brand-copy"><strong>rock space</strong><small>HONDURAS</small></span>
        </Link>

        <nav className={`main-nav ${open ? "is-open" : ""}`} aria-label="Navegación principal">
          {links.map((link) => (
            <Link className={pathname === link.href || pathname.startsWith(`${link.href}/`) ? "is-active" : ""} aria-current={pathname === link.href || pathname.startsWith(`${link.href}/`) ? "page" : undefined} key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>
          ))}
          <a
            className="nav-cta mobile-only"
            href={whatsappUrlFor(salesNumber, "Hola, quiero información de Rock Space Honduras.")}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        </nav>

        <div className="nav-actions">
          <a
            className="nav-cta desktop-only"
            href={whatsappUrlFor(salesNumber, "Hola, quiero información de Rock Space Honduras.")}
            target="_blank"
            rel="noreferrer"
          >
            Consultar
          </a>
          <button
            className="menu-button"
            type="button"
            aria-expanded={open}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((value) => !value)}
          >
            <span /><span />
          </button>
        </div>
      </div>
      <span className="sr-only">{SITE.name}</span>
    </header>
  );
}
