import { whatsappUrl } from "@/lib/site";

export function WhatsAppFloat() {
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
