"use client";

import { usePathname } from "next/navigation";
import { SITE, whatsappUrlFor } from "@/lib/site";

export function WhatsAppFloat({ salesNumber = SITE.salesWhatsappNumber }: { salesNumber?: string }) {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return (
    <a
      className="whatsapp-float"
      href={whatsappUrlFor(salesNumber, "Hola, quiero información sobre Rock Space Honduras.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Abrir WhatsApp"
    >
      <span aria-hidden="true">↗</span>
      <b>WhatsApp</b>
    </a>
  );
}
