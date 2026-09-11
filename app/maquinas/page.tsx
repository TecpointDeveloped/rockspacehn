import type { Metadata } from "next";
import Link from "next/link";
import { MachineCard } from "@/components/MachineCard";
import { SectionHeading } from "@/components/SectionHeading";
import { SupportCTA } from "@/components/SupportCTA";
import { machines } from "@/data/machines";
import { whatsappUrlFor } from "@/lib/site";
import { getCmsContent } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Máquinas",
  description: "Compare plotters, equipos UV y soluciones de transferencia de Rock Space Honduras."
};

export const revalidate = 60;

export default async function MachinesPage() {
  const cms = await getCmsContent();
  const visibleMachines = cms.machines;
  return (
    <>
      <section className="page-hero shell narrow-hero">
        <span className="eyebrow">MÁQUINAS ROCK SPACE</span>
        <h1>Equipos para cortar, proteger y personalizar.</h1>
        <p>Compare formato, función y capacidad para elegir la solución que mejor encaja con su tienda.</p>
      </section>

      <section className="section shell machine-grid">
        {visibleMachines.map((machine, index) => <MachineCard key={machine.slug} machine={machine} index={index} salesNumber={cms.support.supportWhatsappNumber} />)}
      </section>

      <section className="section shell">
        <SectionHeading eyebrow="COMPARACIÓN RÁPIDA" title="¿Cuál le conviene?" />
        <div className="compare-wrap">
          <table className="compare-table">
            <thead>
              <tr><th>Característica</th>{visibleMachines.map((m) => <th key={m.slug}>{m.name}</th>)}</tr>
            </thead>
            <tbody>
              {[
                { label: "Precisión", value: (name: string) => name === "Precisión" },
                { label: "Pantalla", value: (name: string) => name === "Panel" },
                { label: "Presión máxima", value: (name: string) => name.toLowerCase().includes("presión") },
                { label: "Ancho de corte", value: (name: string) => name.toLowerCase().includes("ancho máx. de corte") },
              ].map((row) => <tr key={row.label}><td>{row.label}</td>{visibleMachines.map((machine) => <td key={machine.slug}>{machine.specs.find((spec) => row.value(spec.label))?.value || "Consultar ficha"}</td>)}</tr>)}
              <tr><td>Usos compatibles</td>{visibleMachines.map((machine) => <td key={machine.slug}>{machine.compatibleFilms.slice(0, 3).join(" · ")}</td>)}</tr>
              <tr><td></td>{visibleMachines.map((m) => <td key={m.slug}><Link className="table-link" href={`/maquinas/${m.slug}`}>Ver ficha →</Link></td>)}</tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="decision-strip shell">
        <div><span className="eyebrow">¿NO SABE CUÁL ELEGIR?</span><h2>Cuéntenos qué vende y cuánto espacio tiene.</h2></div>
        <a className="button button-primary" href={whatsappUrlFor(cms.support.supportWhatsappNumber, "Hola, necesito ayuda para elegir una máquina Rock Space.")} target="_blank" rel="noreferrer">Ayudarme a elegir</a>
      </section>

      <SupportCTA />
    </>
  );
}
