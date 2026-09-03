import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/SectionHeading";
import { SupportCTA } from "@/components/SupportCTA";
import { films } from "@/data/films";
import { whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Láminas",
  description: "Tipos de láminas de protección compatibles con soluciones Rock Space."
};

export default function FilmsPage() {
  return (
    <>
      <section className="page-hero shell narrow-hero">
        <span className="eyebrow">LÁMINAS ROCK SPACE</span>
        <h1>El protector cambia. La máquina sigue siendo la misma.</h1>
        <p>Ofrezca diferentes acabados según lo que busca cada cliente y corte la plantilla cuando la necesita.</p>
      </section>

      <section className="section shell film-catalog">
        {films.map((film, index) => (
          <article className={`film-catalog-card ${index % 2 ? "reverse" : ""}`} key={film.name}>
            <div className={`film-product-image film-${film.tone}`}>
              <Image src={film.image} alt={film.alt} width={1100} height={860} sizes="(max-width: 920px) 100vw, 50vw" />
            </div>
            <div className="film-catalog-copy">
              <span className="eyebrow">TIPO DE PELÍCULA</span>
              <h2>{film.name}</h2>
              <h3>{film.short}</h3>
              <p>{film.description}</p>
              <ul>{film.benefits.map((benefit) => <li key={benefit}>✓ {benefit}</li>)}</ul>
            </div>
          </article>
        ))}
      </section>

      <section className="section shell">
        <SectionHeading eyebrow="ANTES DE CORTAR" title="Compatibilidad primero.">
          <p>El material disponible y el tamaño recomendado pueden variar según el equipo y el dispositivo. Confirme la película antes de ejecutar el corte.</p>
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
