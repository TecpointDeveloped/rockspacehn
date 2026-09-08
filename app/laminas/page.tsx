import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { SupportCTA } from "@/components/SupportCTA";
import { films } from "@/data/films";
import { whatsappUrl } from "@/lib/site";
import { getCmsContent } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Láminas",
  description: "Láminas frontales Rock Space disponibles en Honduras, con acabados, beneficios y especificaciones."
};

export const revalidate = 60;

export default async function FilmsPage() {
  const cms = await getCmsContent();
  return (
    <>
      <section className="page-hero shell narrow-hero">
        <span className="eyebrow">LÁMINAS ROCK SPACE</span>
        <h1>Láminas frontales para cada necesidad.</h1>
        <p>Conozca los tipos disponibles en Honduras y compare sus acabados, funciones y especificaciones.</p>
      </section>

      <section className="section shell film-catalog">
        {cms.films.map((film, index) => (
          <article className={`film-catalog-card ${index % 2 ? "reverse" : ""}`} key={film.name}>
            <div className={`film-product-image film-${film.tone}`}>
              <Image src={film.image} alt={film.alt} width={1100} height={860} quality={88} priority={index === 0} sizes="(max-width: 920px) 92vw, 560px" />
            </div>
            <div className="film-catalog-copy">
              <span className="eyebrow">{film.category}</span>
              <h2>{film.name}</h2>
              <h3>{film.short}</h3>
              <p>{film.description}</p>
              <ul>{film.benefits.map((benefit) => <li key={benefit}>✓ {benefit}</li>)}</ul>
              <dl className="film-spec-list">
                {film.specs.map((spec) => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}
              </dl>
              <span className="film-availability">{film.availability}</span>
            </div>
          </article>
        ))}
      </section>

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
        <a className="button button-primary" href={whatsappUrl("Hola, quiero consultar disponibilidad y compatibilidad de láminas Rock Space.")} target="_blank" rel="noreferrer">Consultar por WhatsApp</a>
      </section>

      <SupportCTA />
    </>
  );
}
