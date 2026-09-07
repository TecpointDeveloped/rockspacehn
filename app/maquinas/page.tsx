import type { Metadata } from "next";
import Link from "next/link";
import { MachineCard } from "@/components/MachineCard";
import { SectionHeading } from "@/components/SectionHeading";
import { SupportCTA } from "@/components/SupportCTA";
import { machines } from "@/data/machines";
import { whatsappUrl } from "@/lib/site";
import { getCmsContent } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Máquinas",
  description: "Compare MINI ZV2, ZC1 Max y ZC5 de Rock Space Honduras."
};

export const revalidate = 60;

export default async function MachinesPage() {
  const cms = await getCmsContent();
  const visibleMachines = cms.machines.filter((machine) => machine.active !== false);
  return (
    <>
      <section className="page-hero shell narrow-hero">
        <span className="eyebrow">MÁQUINAS ROCK SPACE</span>
        <h1>Tres formas de llevar el corte bajo demanda a su negocio.</h1>
        <p>Compare formato, capacidad y automatización para elegir el equipo que mejor encaja con su tienda.</p>
      </section>

      <section className="section shell machine-grid">
        {visibleMachines.map((machine, index) => <MachineCard key={machine.slug} machine={machine} index={index} />)}
      </section>

      <section className="section shell">
        <SectionHeading eyebrow="COMPARACIÓN RÁPIDA" title="¿Cuál le conviene?" />
        <div className="compare-wrap">
          <table className="compare-table">
            <thead>
              <tr><th>Característica</th>{visibleMachines.map((m) => <th key={m.slug}>{m.name}</th>)}</tr>
            </thead>
            <tbody>
              <tr><td>Enfoque</td><td>Compacta</td><td>Formatos grandes</td><td>Automatización</td></tr>
              <tr><td>Precisión</td><td>0.1 mm</td><td>0.1 mm</td><td>0.1 mm</td></tr>
              <tr><td>Pantalla</td><td>5.5&quot;</td><td>5.5&quot;</td><td>7&quot; HD</td></tr>
              <tr><td>Presión máx.</td><td>1200 g</td><td>1000 g</td><td>1500 g</td></tr>
              <tr><td>Formato destacado</td><td>Tablet hasta 11&quot;</td><td>Laptop hasta 16&quot;</td><td>Tablet hasta 12.2&quot;</td></tr>
              <tr><td>Automatización por QR</td><td>—</td><td>—</td><td>Sí</td></tr>
              <tr><td></td>{visibleMachines.map((m) => <td key={m.slug}><Link className="table-link" href={`/maquinas/${m.slug}`}>Ver ficha →</Link></td>)}</tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="decision-strip shell">
        <div><span className="eyebrow">¿NO SABE CUÁL ELEGIR?</span><h2>Cuéntenos qué vende y cuánto espacio tiene.</h2></div>
        <a className="button button-primary" href={whatsappUrl("Hola, necesito ayuda para elegir entre MINI ZV2, ZC1 Max y ZC5.")} target="_blank" rel="noreferrer">Ayudarme a elegir</a>
      </section>

      <SupportCTA />
    </>
  );
}
