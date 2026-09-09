import Link from "next/link";
import Image from "next/image";
import type { Machine } from "@/data/machines";
import { SITE, whatsappUrlFor } from "@/lib/site";

export function MachineCard({ machine, index = 0, salesNumber = SITE.salesWhatsappNumber }: { machine: Machine; index?: number; salesNumber?: string }) {
  return (
    <article className={`machine-card machine-tone-${index % 3}`}>
      <div className="machine-card-copy">
        <span className="eyebrow">{machine.eyebrow}</span>
        <h3>{machine.name}</h3>
        <p>{machine.tagline}</p>
        <div className="machine-card-actions"><Link className="text-link" href={`/maquinas/${machine.slug}`}>Conocer {machine.name} <span>→</span></Link><a href={whatsappUrlFor(salesNumber, `Hola, quiero información sobre la ${machine.name}.`)} target="_blank" rel="noreferrer">Solicitar información</a></div>
      </div>
      <div className="machine-card-image">
        <Image src={machine.image} alt={`${machine.name} de Rock Space`} width={1000} height={760} quality={88} sizes="(max-width: 640px) 92vw, (max-width: 920px) 86vw, 580px" />
      </div>
    </article>
  );
}
