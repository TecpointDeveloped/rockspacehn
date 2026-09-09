"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CmsContent, CmsInstagramPost, CmsMachine } from "@/lib/cms";
import type { Film } from "@/data/films";
import styles from "./admin.module.css";

type Tab = "home" | "machines" | "tutorials" | "films" | "instagram" | "support";
const tabs: { id: Tab; label: string; description: string }[] = [
  { id: "home", label: "Inicio", description: "Portada de la empresa" },
  { id: "machines", label: "Máquinas", description: "Crear, editar y ocultar equipos" },
  { id: "tutorials", label: "Tutoriales", description: "Videos y guía en español" },
  { id: "films", label: "Láminas", description: "Tipos y beneficios" },
  { id: "instagram", label: "Instagram", description: "Perfil y destacados" },
  { id: "support", label: "Soporte", description: "WhatsApp del equipo" },
];

export function AdminPanel({ initial, email }: { initial: CmsContent; email: string }) {
  const router = useRouter();
  const [content, setContent] = useState(initial);
  const [tab, setTab] = useState<Tab>("home");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");

  async function save() {
    setBusy(true); setNotice("");
    const response = await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(content) });
    const data = await response.json();
    setBusy(false);
    setNotice(response.ok ? "Cambios publicados correctamente." : data.error || "No fue posible guardar.");
    if (response.ok) router.refresh();
  }

  async function logout() { await fetch("/api/admin/session", { method: "DELETE" }); router.replace("/admin/login"); router.refresh(); }

  async function upload(file: File, onUrl: (url: string) => void) {
    setBusy(true); setNotice("Subiendo imagen…");
    const body = new FormData(); body.set("file", file);
    const response = await fetch("/api/admin/upload", { method: "POST", body });
    const data = await response.json(); setBusy(false);
    if (!response.ok) { setNotice(data.error || "No fue posible subir la imagen."); return; }
    onUrl(data.url); setNotice("Imagen cargada. Presione Publicar cambios para aplicarla.");
  }

  function updateMachine(index: number, patch: Partial<CmsMachine>) {
    setContent((current) => ({ ...current, machines: current.machines.map((item, i) => i === index ? { ...item, ...patch } : item) }));
  }

  function updateFilm(index: number, patch: Partial<Film>) {
    setContent((current) => ({ ...current, films: current.films.map((item, i) => i === index ? { ...item, ...patch } : item) }));
  }

  function addMachine() {
    const item: CmsMachine = { slug: `nuevo-equipo-${content.machines.length + 1}`, name: "Nuevo equipo", eyebrow: "NUEVO", tagline: "Descripción breve", description: "Descripción del equipo", image: "/images/products/mini-zv2.webp", gallery: [], sourceUrl: "", videoLabel: "Tutorial", highlights: [], features: [], specs: [], steps: [{ title: "1. Prepare", text: "Prepare el equipo y confirme la conexión." }, { title: "2. Seleccione", text: "Seleccione el modelo o trabajo." }, { title: "3. Cargue", text: "Cargue el material compatible." }, { title: "4. Finalice", text: "Ejecute el trabajo y revise el resultado." }], compatibleFilms: [], idealFor: "", faqs: [], active: false, spanishSummary: "" };
    setContent((current) => ({ ...current, machines: [...current.machines, item] }));
  }

  function addFilm() {
    setContent((current) => ({ ...current, films: [...current.films, { slug: `nueva-lamina-${current.films.length + 1}`, name: "Nueva lámina", short: "Beneficio principal", description: "Descripción", benefits: [], category: "Lámina frontal", categoryKey: "flexible", availability: "Disponible", stock: 0, variants: [], compatibility: [], specs: [], tone: "clear", image: "/images/products/film-hd.webp", alt: "Lámina Rock Space" }] }));
  }

  function updateInstagramPost(index: number, patch: Partial<CmsInstagramPost>) {
    setContent((current) => ({ ...current, instagram: { ...current.instagram, posts: current.instagram.posts.map((item, i) => i === index ? { ...item, ...patch } : item) } }));
  }

  function addInstagramPost() {
    if (content.instagram.posts.length >= 3) { setNotice("La portada admite hasta tres destacados para conservar su velocidad."); return; }
    setContent((current) => ({ ...current, instagram: { ...current.instagram, posts: [...current.instagram.posts, { image: "/images/products/rcl1005-stickers.webp", alt: "Contenido de Rock Space Honduras en Instagram", caption: "Nuevo destacado", url: current.instagram.profileUrl }] } }));
  }

  return <div className={styles.page}>
    <header className={styles.header}>
      <div className={styles.brand}><Image src="/brand/rock-space-honduras.png" alt="Rock Space Honduras" width={58} height={58} /><div><small>PANEL CENTRAL</small><strong>{email}</strong></div></div>
      <div className={styles.headerActions}><a href="/" target="_blank">Ver sitio ↗</a><button onClick={logout}>Cerrar sesión</button></div>
    </header>
    <section className={styles.hero}><span>CONTROL DE CONTENIDO</span><h1>Todo lo importante, en un solo lugar.</h1><p>Edite textos, equipos, tutoriales, láminas e información de contacto. Los cambios se guardan en la nube y aparecen en el sitio público.</p></section>
    <div className={styles.workspace}>
      <nav className={styles.nav}>{tabs.map((item, index) => <button key={item.id} className={tab === item.id ? styles.active : ""} onClick={() => setTab(item.id)}><small>0{index + 1}</small><strong>{item.label}</strong><span>{item.description}</span></button>)}</nav>
      <section className={styles.editor}>
        {tab === "home" && <div className={styles.formGrid}><h2>Portada de Rock Space Honduras</h2><p className={styles.intro}>La empresa y su ecosistema completo son los protagonistas.</p><Field label="Etiqueta" value={content.home.eyebrow} onChange={(value) => setContent({ ...content, home: { ...content.home, eyebrow: value } })} /><Field label="Título" value={content.home.title} onChange={(value) => setContent({ ...content, home: { ...content.home, title: value } })} /><Field area label="Descripción" value={content.home.description} onChange={(value) => setContent({ ...content, home: { ...content.home, description: value } })} /><ImageField label="Imagen de la RCL1005" value={content.home.heroImage} onChange={(value) => setContent({ ...content, home: { ...content.home, heroImage: value } })} upload={upload} /></div>}
        {tab === "machines" && <div><div className={styles.sectionHead}><div><h2>Máquinas</h2><p>{content.machines.length} equipos de exhibición permanente</p></div><button onClick={addMachine}>+ Crear equipo</button></div>{content.machines.map((machine, index) => <details className={styles.record} key={`${machine.slug}-${index}`} open={index === 0}><summary><div><small>SIEMPRE VISIBLE</small><strong>{machine.name}</strong></div><span>Editar ↓</span></summary><div className={styles.formGrid}><Field label="Nombre" value={machine.name} onChange={(value) => updateMachine(index, { name: value })} /><Field label="Slug" value={machine.slug} onChange={(value) => updateMachine(index, { slug: value as CmsMachine["slug"] })} /><Field label="Lema" value={machine.tagline} onChange={(value) => updateMachine(index, { tagline: value })} /><Field area label="Descripción" value={machine.description} onChange={(value) => updateMachine(index, { description: value })} /><ImageField label="Imagen" value={machine.image} onChange={(value) => updateMachine(index, { image: value })} upload={upload} /></div></details>)}</div>}
        {tab === "tutorials" && <div><h2>Tutoriales y subtítulos</h2><p className={styles.intro}>Los videos se cargan solo al tocar Reproducir. YouTube abre los subtítulos en español y esta guía visible garantiza una explicación en español.</p><TutorialEditor title="RCL1005" youtubeId={content.sticker.youtubeId || ""} summary={content.sticker.spanishSummary || ""} onVideo={(value) => setContent({ ...content, sticker: { ...content.sticker, youtubeId: value } })} onSummary={(value) => setContent({ ...content, sticker: { ...content.sticker, spanishSummary: value } })} />{content.machines.map((machine, index) => <TutorialEditor key={machine.slug} title={machine.name} youtubeId={machine.youtubeId || ""} summary={machine.spanishSummary || ""} onVideo={(value) => updateMachine(index, { youtubeId: value })} onSummary={(value) => updateMachine(index, { spanishSummary: value })} />)}</div>}
        {tab === "films" && <div><div className={styles.sectionHead}><div><h2>Láminas frontales</h2><p>{content.films.length} tipos registrados; el stock controla la visibilidad</p></div><button onClick={addFilm}>+ Crear lámina</button></div>{content.films.map((film, index) => <details className={styles.record} key={`${film.name}-${index}`}><summary><div><small>{film.stock > 0 || film.variants?.some((variant) => variant.stock > 0) ? "VISIBLE" : "OCULTA SIN EXISTENCIA"}</small><strong>{film.name}</strong></div><span>Editar ↓</span></summary><div className={styles.formGrid}><Field label="Nombre" value={film.name} onChange={(value) => updateFilm(index, { name: value })} /><Field label="Slug" value={film.slug || ""} onChange={(value) => updateFilm(index, { slug: value })} /><Field label="Categoría interna" value={film.categoryKey || "flexible"} onChange={(value) => updateFilm(index, { categoryKey: value as Film["categoryKey"] })} /><Field label="Categoría pública" value={film.category || ""} onChange={(value) => updateFilm(index, { category: value })} /><Field label="Existencia general" value={String(film.stock || 0)} onChange={(value) => updateFilm(index, { stock: Math.max(0, Number(value) || 0) })} /><Field area label="Variantes (una por línea: talla: stock)" value={(film.variants || []).map((variant) => `${variant.label}: ${variant.stock}`).join("\n")} onChange={(value) => updateFilm(index, { variants: value.split("\n").map((line) => { const [label, stock] = line.split(":"); return { label: label.trim(), stock: Math.max(0, Number(stock) || 0) }; }).filter((variant) => variant.label) })} /><Field label="Beneficio principal" value={film.short} onChange={(value) => updateFilm(index, { short: value })} /><Field area label="Descripción" value={film.description} onChange={(value) => updateFilm(index, { description: value })} /><Field label="Beneficios (separados por coma)" value={film.benefits.join(", ")} onChange={(value) => updateFilm(index, { benefits: value.split(",").map((item) => item.trim()).filter(Boolean) })} /><Field area label="Especificaciones (una por línea: Nombre: valor)" value={(film.specs || []).map((spec) => `${spec.label}: ${spec.value}`).join("\n")} onChange={(value) => updateFilm(index, { specs: value.split("\n").map((line) => { const [label, ...rest] = line.split(":"); return { label: label.trim(), value: rest.join(":").trim() }; }).filter((spec) => spec.label && spec.value) })} /><ImageField label="Imagen" value={film.image} onChange={(value) => updateFilm(index, { image: value })} upload={upload} /><button className={styles.danger} onClick={() => setContent({ ...content, films: content.films.filter((_, i) => i !== index) })}>Eliminar lámina</button></div></details>)}</div>}
        {tab === "instagram" && <div><div className={styles.sectionHead}><div><h2>Instagram</h2><p>Perfil público y contenido destacado en la portada</p></div><button onClick={addInstagramPost}>+ Agregar destacado</button></div><div className={styles.formGrid}><label className={styles.check}><input type="checkbox" checked={content.instagram.enabled} onChange={(event) => setContent({ ...content, instagram: { ...content.instagram, enabled: event.target.checked } })} />Mostrar Instagram en la portada</label><Field label="Usuario" value={content.instagram.handle} onChange={(value) => setContent({ ...content, instagram: { ...content.instagram, handle: value } })} /><Field label="Enlace del perfil" value={content.instagram.profileUrl} onChange={(value) => setContent({ ...content, instagram: { ...content.instagram, profileUrl: value } })} /><Field label="Título de la sección" value={content.instagram.title} onChange={(value) => setContent({ ...content, instagram: { ...content.instagram, title: value } })} /><Field area label="Descripción" value={content.instagram.description} onChange={(value) => setContent({ ...content, instagram: { ...content.instagram, description: value } })} /></div>{content.instagram.posts.map((post, index) => <details className={styles.record} key={`${post.url}-${index}`} open={index === 0}><summary><div><small>DESTACADO 0{index + 1}</small><strong>{post.caption}</strong></div><span>Editar ↓</span></summary><div className={styles.formGrid}><Field label="Texto" value={post.caption} onChange={(value) => updateInstagramPost(index, { caption: value })} /><Field label="Enlace de la publicación o reel" value={post.url} onChange={(value) => updateInstagramPost(index, { url: value })} /><Field label="Descripción accesible de la imagen" value={post.alt} onChange={(value) => updateInstagramPost(index, { alt: value })} /><ImageField label="Imagen destacada" value={post.image} onChange={(value) => updateInstagramPost(index, { image: value })} upload={upload} /><button className={styles.danger} onClick={() => setContent({ ...content, instagram: { ...content.instagram, posts: content.instagram.posts.filter((_, i) => i !== index) } })}>Quitar destacado</button></div></details>)}</div>}
        {tab === "support" && <div className={styles.formGrid}><h2>Contactos de Rock Space</h2><p className={styles.intro}>Ventas y soporte técnico se mantienen separados en toda la web.</p><Field label="Atención al cliente / ventas (504...)" value={content.support.salesWhatsappNumber} onChange={(value) => setContent({ ...content, support: { ...content.support, salesWhatsappNumber: value.replace(/\D/g, "") } })} /><Field label="Soporte técnico (504...)" value={content.support.supportWhatsappNumber} onChange={(value) => setContent({ ...content, support: { ...content.support, supportWhatsappNumber: value.replace(/\D/g, "") } })} /></div>}
      </section>
    </div>
    <footer className={styles.saveBar}><span>{notice || (content.updatedAt ? `Última publicación: ${new Date(content.updatedAt).toLocaleString("es-HN")}` : "Sin cambios pendientes")}</span><button onClick={save} disabled={busy}>{busy ? "Procesando…" : "Publicar cambios"}</button></footer>
  </div>;
}

function Field({ label, value, onChange, area = false }: { label: string; value: string; onChange: (value: string) => void; area?: boolean }) {
  return <label>{label}{area ? <textarea value={value} onChange={(event) => onChange(event.target.value)} /> : <input value={value} onChange={(event) => onChange(event.target.value)} />}</label>;
}

function ImageField({ label, value, onChange, upload }: { label: string; value: string; onChange: (value: string) => void; upload: (file: File, onUrl: (url: string) => void) => void }) {
  return <div className={styles.imageField}><Field label={label} value={value} onChange={onChange} /><label className={styles.upload}>Subir imagen de alta calidad<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={(event) => { const file = event.target.files?.[0]; if (file) upload(file, onChange); }} /></label></div>;
}

function TutorialEditor({ title, youtubeId, summary, onVideo, onSummary }: { title: string; youtubeId: string; summary: string; onVideo: (value: string) => void; onSummary: (value: string) => void }) {
  return <article className={styles.tutorialRecord}><span>TUTORIAL</span><h3>{title}</h3><div className={styles.formGrid}><Field label="ID de YouTube" value={youtubeId} onChange={onVideo} /><Field area label="Guía / transcripción en español" value={summary} onChange={onSummary} /></div></article>;
}
