import type { Metadata } from "next";
import { FilmCategorySection } from "@/components/FilmCategorySection";
import { SectionHeading } from "@/components/SectionHeading";
import { SupportCTA } from "@/components/SupportCTA";
import { groupPublicFilms } from "@/lib/catalog";
import { whatsappUrlFor } from "@/lib/site";
import { getCmsContent } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Láminas",
  description: "Láminas frontales y traseras Rock Space disponibles en Honduras, con acabados, beneficios y especificaciones."
};

export const revalidate = 60;

export default async function FilmsPage() {
  const cms = await getCmsContent();
  const groups = groupPublicFilms(cms.films);
  return (
    <>
      <section className="page-hero shell narrow-hero">
        <span className="eyebrow">LÁMINAS ROCK SPACE</span>
        <h1>Láminas para cada necesidad.</h1>
        <p>Conozca las opciones frontales y traseras disponibles en Honduras y compare sus acabados, funciones y especificaciones.</p>
      </section>

      <nav className="quick-categories shell film-category-nav" aria-label="Familias de láminas">{groups.map((group, index) => <a href={`#${group.key}`} key={group.key}><b>{String(index + 1).padStart(2, "0")}</b><span>{group.label}</span></a>)}</nav>

      {groups.map((group, index) => <FilmCategorySection key={group.key} id={group.key} title={group.label} description={group.description} products={group.products} dark={index % 3 === 1} salesNumber={cms.support.supportWhatsappNumber} />)}

      <section className="section shell">
        <SectionHeading eyebrow="ANTES DE CORTAR" title="Compatibilidad primero.">
          <p>El material y el tamaño recomendado pueden variar según el equipo y el dispositivo. Consulte existencias actuales y confirme la compatibilidad antes del corte.</p>
        </SectionHeading>
        <div className="compatibility-cards">
          <div><strong>MINI ZV2</strong><span>Teléfonos + tablets hasta 11&quot;</span></div>
          <div><strong>ZC1 Max</strong><span>Formatos S, M, L y XL; laptops hasta 16&quot;</span></div>
          <div><strong>ZC5</strong><span>Teléfonos, tablets y materiales con ajuste por QR compatible</span></div>
        </div>
      </section>

      <section className="decision-strip shell">
        <div><span className="eyebrow">¿QUÉ LÁMINA NECESITA?</span><h2>Díganos el equipo y el acabado que busca.</h2></div>
        <a className="button button-primary" href={whatsappUrlFor(cms.support.supportWhatsappNumber, "Hola, quiero consultar disponibilidad y compatibilidad de láminas Rock Space.")} target="_blank" rel="noreferrer">Consultar por WhatsApp</a>
      </section>

      <SupportCTA />
    </>
  );
}
