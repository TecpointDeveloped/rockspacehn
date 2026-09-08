import Image from "next/image";
import Link from "next/link";
import { MachineCard } from "@/components/MachineCard";
import { SupportCTA } from "@/components/SupportCTA";
import { films } from "@/data/films";
import { stickerMachine } from "@/data/stickerMachine";
import { getCmsContent } from "@/lib/cms";

export const revalidate = 60;

export default async function HomePage() {
  const cms = await getCmsContent();
  const visibleMachines = cms.machines.filter((machine) => machine.active !== false);
  const visibleFilms = cms.films.length ? cms.films : films;
  const equipment = [
    { name: "RCL1005", image: cms.sticker.heroImage || stickerMachine.heroImage, href: "/stickers", label: "Imprime y corta stickers" },
    ...visibleMachines.map((machine) => ({ name: machine.name, image: machine.image, href: `/maquinas/${machine.slug}`, label: machine.tagline }))
  ];

  return (
    <>
      <section className="balanced-hero">
        <div className="shell balanced-hero-copy">
          <span className="eyebrow light">{cms.home.eyebrow}</span>
          <h1>{cms.home.title}</h1>
          <p>{cms.home.description}</p>
          <div className="button-row">
            <Link className="button button-white" href="/maquinas">Explorar equipos</Link>
            <Link className="button button-ghost-light" href="/laminas">Ver láminas disponibles</Link>
          </div>
        </div>
        <div className="shell equipment-hero-grid" aria-label="Equipos Rock Space disponibles en Honduras">
          {equipment.map((item) => (
            <Link href={item.href} className="equipment-hero-card" key={item.name}>
              <div><span>{item.label}</span><h2>{item.name}</h2></div>
              <Image src={item.image} alt={`${item.name} Rock Space`} width={720} height={560} priority quality={88} sizes="(max-width: 640px) 88vw, (max-width: 920px) 44vw, 24vw" />
              <b>Conocer equipo <i>→</i></b>
            </Link>
          ))}
        </div>
      </section>

      <section className="section shell home-film-section">
        <div className="showcase-heading home-light-heading">
          <div><span className="eyebrow">LÁMINAS FRONTALES DISPONIBLES</span><h2>Una opción para cada pantalla.</h2><p>Compare acabado, función y compatibilidad antes de elegir. Consulte existencias actuales al confirmar su pedido.</p></div>
          <Link className="text-link" href="/laminas">Ver especificaciones completas <span>→</span></Link>
        </div>
        <div className="home-film-grid">
          {visibleFilms.map((film) => (
            <article className="home-film-card" key={film.name}>
              <div className={`home-film-image film-${film.tone}`}><Image src={film.image} alt={film.alt} width={720} height={560} quality={88} sizes="(max-width: 640px) 88vw, (max-width: 920px) 44vw, 31vw" /></div>
              <div className="home-film-card-copy">
                <span>{film.category}</span><h3>{film.name}</h3><p>{film.short}</p>
                <dl>{film.specs.slice(0, 2).map((spec) => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}</dl>
                <b className="stock-label">{film.availability}</b>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="machines-showcase balanced-machine-section">
        <div className="shell section">
          <div className="showcase-heading">
            <div><span className="eyebrow light">PLOTTERS DE CORTE</span><h2>Tres capacidades. La misma precisión.</h2><p>Desde un mostrador compacto hasta formatos grandes y ajuste automático por QR.</p></div>
            <Link className="text-link light-link" href="/maquinas">Comparar equipos →</Link>
          </div>
          <div className="machine-grid machine-grid-dark">{visibleMachines.map((machine, index) => <MachineCard key={machine.slug} machine={machine} index={index} />)}</div>
        </div>
      </section>

      <section className="section shell solution-grid">
        <article className="solution-feature solution-feature-sticker">
          <div><span className="eyebrow light">IMPRESIÓN + CORTE</span><h2>RCL1005</h2><p>Una solución para convertir fotografías y diseños en stickers personalizados listos para entregar.</p><Link className="button button-white" href="/stickers">Conocer la RCL1005</Link></div>
          <Image src={stickerMachine.gallery[0].src} alt={stickerMachine.gallery[0].alt} width={900} height={760} sizes="(max-width: 920px) 92vw, 48vw" />
        </article>
        <article className="solution-feature solution-feature-support">
          <span className="eyebrow">ACOMPAÑAMIENTO LOCAL</span><h2>No termina con la compra.</h2><p>Tutoriales, guías prácticas y atención de nuestro equipo de expertos Rock Space para elegir, instalar y operar cada solución.</p>
          <div className="solution-links"><Link href="/tutoriales">Ver tutoriales <span>→</span></Link><Link href="/soporte">Centro de soporte <span>→</span></Link></div>
        </article>
      </section>

      <section className="section shell ecosystem-bridge">
        <div className="ecosystem-bridge-copy"><span className="eyebrow">TODO EN UN SOLO SITIO</span><h2>Conozca el ecosistema Rock Space.</h2><p>Compare equipos, revise láminas, aprenda con tutoriales y contacte al equipo local sin salir del sitio.</p></div>
        <div className="ecosystem-links"><Link href="/maquinas"><strong>01</strong><span>Máquinas de corte</span></Link><Link href="/laminas"><strong>02</strong><span>Láminas frontales</span></Link><Link href="/stickers"><strong>03</strong><span>Stickers RCL1005</span></Link><Link href="/tutoriales"><strong>04</strong><span>Tutoriales y guías</span></Link></div>
      </section>

      {cms.instagram.enabled && <section className="instagram-section"><div className="shell section">
        <div className="instagram-heading"><div><span className="eyebrow light">INSTAGRAM · {cms.instagram.handle}</span><h2>{cms.instagram.title}</h2><p>{cms.instagram.description}</p></div><a className="button button-white" href={cms.instagram.profileUrl} target="_blank" rel="noreferrer">Seguir en Instagram ↗</a></div>
        <div className="instagram-grid">{cms.instagram.posts.slice(0, 3).map((post, index) => <a href={post.url || cms.instagram.profileUrl} target="_blank" rel="noreferrer" className="instagram-card" key={`${post.url}-${index}`}><Image src={post.image} alt={post.alt} width={720} height={720} sizes="(max-width: 640px) 92vw, (max-width: 920px) 46vw, 31vw" /><span><b>{post.caption}</b><i>Ver en Instagram ↗</i></span></a>)}</div>
      </div></section>}

      <SupportCTA />
    </>
  );
}
