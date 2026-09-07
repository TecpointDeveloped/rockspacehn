import Link from "next/link";
import Image from "next/image";
import type { Machine } from "@/data/machines";

export function MachineCard({ machine, index = 0 }: { machine: Machine; index?: number }) {
  return (
    <article className={`machine-card machine-tone-${index % 3}`}>
      <div className="machine-card-copy">
        <span className="eyebrow">{machine.eyebrow}</span>
        <h3>{machine.name}</h3>
        <p>{machine.tagline}</p>
        <Link className="text-link" href={`/maquinas/${machine.slug}`}>Conocer {machine.name} <span>→</span></Link>
      </div>
      <div className="machine-card-image">
        <Image src={machine.image} alt={`${machine.name} de Rock Space`} width={1000} height={760} quality={88} sizes="(max-width: 640px) 92vw, (max-width: 920px) 86vw, 580px" />
      </div>
    </article>
  );
}
