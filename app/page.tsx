import Image from "next/image";
import Link from "next/link";
import { FilmCategorySection } from "@/components/FilmCategorySection";
import { MachineCard } from "@/components/MachineCard";
import { MachineCarousel } from "@/components/MachineCarousel";
import { SupportCTA } from "@/components/SupportCTA";
import { stickerMachine } from "@/data/stickerMachine";
import { groupPublicFilms } from "@/lib/catalog";
import { getCmsContent } from "@/lib/cms";
import { whatsappUrlFor } from "@/lib/site";

export const revalidate = 60;

export default async function HomePage() {
  const cms = await getCmsContent();
  const filmGroups = groupPublicFilms(cms.films);
  const carouselMachines = [
    ...cms.machines.map((machine) => ({ name: machine.name, image: machine.image, href: `/maquinas/${machine.slug}`, label: machine.tagline })),
    { name: "RCL1005", image: cms.sticker.heroImage || stickerMachine.heroImage, href: "/stickers", label: "Impresión y corte para stickers personalizados." }
  ];

  return (
    <>
      <section className="home-machine-banner">
        <div className="shell home-machine-intro">
          <div><span className="eyebrow light">{cms.home.eyebrow}</span><h1>{cms.home.title}</h1></div>
          <div><p>{cms.home.description}</p><a className="text-link light-link" href={whatsappUrlFor(cms.support.salesWhatsappNumber, "Hola, quiero conocer las soluciones Rock Space disponibles.")} target="_blank" rel="noreferrer">Hablar con ventas →</a></div>
        </div>
        <div className="shell"><MachineCarousel machines={carouselMachines} /></div>
      </section>

      <nav className="quick-categories shell" aria-label="Categorías de productos">
        <a href="#maquinas"><b>01</b><span>Máquinas</span></a>
        {filmGroups.map((group, index) => <a href={`#${group.key}`} key={group.key}><b>{String(index + 2).padStart(2, "0")}</b><span>{group.label}</span></a>)}
        <a href="#personalizacion"><b>{String(filmGroups.length + 2).padStart(2, "0")}</b><span>Personalización</span></a>
      </nav>

      <section className="machines-showcase permanent-machines" id="maquinas">
        <div className="shell section">
          <div className="showcase-heading"><div><span className="eyebrow light">CATÁLOGO PERMANENTE</span><h2>Máquinas que muestran lo que Rock Space puede hacer.</h2><p>Los equipos permanecen visibles para conocer su tecnología, disponibilidad inmediata o no.</p></div><Link className="text-link light-link" href="/maquinas">Comparar equipos →</Link></div>
          <div className="machine-grid machine-grid-dark">{cms.machines.map((machine, index) => <MachineCard key={machine.slug} machine={machine} index={index} salesNumber={cms.support.salesWhatsappNumber} />)}</div>
        </div>
      </section>

      {filmGroups.map((group, index) => <FilmCategorySection key={group.key} id={group.key} title={group.label} description={group.description} products={group.products} dark={index % 3 === 1} salesNumber={cms.support.salesWhatsappNumber} />)}

      <section className="section shell personalization-block" id="personalizacion">
        <div className="personalization-copy"><span className="eyebrow light">STICKERS / PERSONALIZACIÓN</span><h2>Ideas que salen listas para pegar.</h2><p>La RCL1005 reúne impresión y corte para crear stickers, skins y fotografías personalizadas desde un solo equipo.</p><div className="button-row"><Link className="button button-white" href="/stickers">Explorar personalización</Link><a className="button button-ghost-light" href={whatsappUrlFor(cms.support.salesWhatsappNumber, "Hola, quiero información sobre la RCL1005 y personalización.")} target="_blank" rel="noreferrer">Solicitar información</a></div></div>
        <div className="personalization-gallery"><Image src={stickerMachine.gallery[0].src} alt={stickerMachine.gallery[0].alt} width={1000} height={850} quality={88} sizes="(max-width: 920px) 92vw, 50vw" /><Image src={stickerMachine.gallery[2].src} alt={stickerMachine.gallery[2].alt} width={720} height={620} quality={88} sizes="(max-width: 920px) 46vw, 24vw" /></div>
      </section>

      <section className="section shell ecosystem-bridge">
        <div className="ecosystem-bridge-copy"><span className="eyebrow">APRENDA Y DECIDA</span><h2>Tecnología explicada dentro del sitio.</h2><p>Cada equipo conserva su ficha técnica, beneficios, usos, video integrado, pasos y acceso independiente a ventas y soporte.</p></div>
        <div className="ecosystem-links"><Link href="/maquinas"><strong>01</strong><span>Fichas de máquinas</span></Link><Link href="/laminas"><strong>02</strong><span>Catálogo de láminas</span></Link><Link href="/tutoriales"><strong>03</strong><span>Videos y tutoriales</span></Link><Link href="/soporte"><strong>04</strong><span>Soporte técnico</span></Link></div>
      </section>

      {cms.instagram.enabled && <section className="instagram-section"><div className="shell section">
        <div className="instagram-heading"><div><span className="eyebrow light">INSTAGRAM · {cms.instagram.handle}</span><h2>{cms.instagram.title}</h2><p>{cms.instagram.description}</p></div><a className="button button-white" href={cms.instagram.profileUrl} target="_blank" rel="noreferrer">Seguir en Instagram ↗</a></div>
        <div className="instagram-grid">{cms.instagram.posts.slice(0, 3).map((post, index) => <a href={post.url || cms.instagram.profileUrl} target="_blank" rel="noreferrer" className="instagram-card" key={`${post.url}-${index}`}><Image src={post.image} alt={post.alt} width={720} height={720} sizes="(max-width: 640px) 92vw, (max-width: 920px) 46vw, 31vw" /><span><b>{post.caption}</b><i>Ver en Instagram ↗</i></span></a>)}</div>
      </div></section>}

      <SupportCTA />
    </>
  );
}
