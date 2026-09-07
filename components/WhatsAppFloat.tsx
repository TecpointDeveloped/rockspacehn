"use client";

import { usePathname } from "next/navigation";
import { whatsappUrl } from "@/lib/site";

export function WhatsAppFloat() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return (
    <a
      className="whatsapp-float"
      href={whatsappUrl("Hola, quiero información sobre Rock Space Honduras.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Abrir WhatsApp"
    >
      <span aria-hidden="true">↗</span>
      <b>WhatsApp</b>
    </a>
  );
}
