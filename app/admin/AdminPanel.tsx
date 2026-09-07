"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CmsContent, CmsMachine } from "@/lib/cms";
import type { Film } from "@/data/films";
import styles from "./admin.module.css";

type Tab = "home" | "machines" | "tutorials" | "films" | "support";
const tabs: { id: Tab; label: string; description: string }[] = [
  { id: "home", label: "Inicio", description: "Portada y RCL1005" },
  { id: "machines", label: "Máquinas", description: "Crear, editar y ocultar equipos" },
  { id: "tutorials", label: "Tutoriales", description: "Videos y guía en español" },
  { id: "films", label: "Láminas", description: "Tipos y beneficios" },
  { id: "support", label: "Soporte", description: "WhatsApp e Instagram" },
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
    setContent((current) => ({ ...current, films: [...current.films, { name: "Nueva lámina", short: "Beneficio principal", description: "Descripción", benefits: [], tone: "clear", image: "/images/products/film-hd.webp", alt: "Lámina Rock Space" }] }));
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
        {tab === "home" && <div className={styles.formGrid}><h2>Portada principal</h2><Field label="Etiqueta" value={content.home.eyebrow} onChange={(value) => setContent({ ...content, home: { ...content.home, eyebrow: value } })} /><Field label="Título" value={content.home.title} onChange={(value) => setContent({ ...content, home: { ...content.home, title: value } })} /><Field label="Línea destacada" value={content.home.accent} onChange={(value) => setContent({ ...content, home: { ...content.home, accent: value } })} /><Field area label="Descripción" value={content.home.description} onChange={(value) => setContent({ ...content, home: { ...content.home, description: value } })} /><ImageField label="Imagen protagonista" value={content.home.heroImage} onChange={(value) => setContent({ ...content, home: { ...content.home, heroImage: value } })} upload={upload} /></div>}
        {tab === "machines" && <div><div className={styles.sectionHead}><div><h2>Máquinas</h2><p>{content.machines.length} equipos registrados</p></div><button onClick={addMachine}>+ Crear equipo</button></div>{content.machines.map((machine, index) => <details className={styles.record} key={`${machine.slug}-${index}`} open={index === 0}><summary><div><small>{machine.active === false ? "OCULTO" : "PUBLICADO"}</small><strong>{machine.name}</strong></div><span>Editar ↓</span></summary><div className={styles.formGrid}><Field label="Nombre" value={machine.name} onChange={(value) => updateMachine(index, { name: value })} /><Field label="Slug" value={machine.slug} onChange={(value) => updateMachine(index, { slug: value as CmsMachine["slug"] })} /><Field label="Lema" value={machine.tagline} onChange={(value) => updateMachine(index, { tagline: value })} /><Field area label="Descripción" value={machine.description} onChange={(value) => updateMachine(index, { description: value })} /><ImageField label="Imagen" value={machine.image} onChange={(value) => updateMachine(index, { image: value })} upload={upload} /><label className={styles.check}><input type="checkbox" checked={machine.active !== false} onChange={(event) => updateMachine(index, { active: event.target.checked })} />Visible en el sitio</label><button className={styles.danger} onClick={() => setContent({ ...content, machines: content.machines.filter((_, i) => i !== index) })}>Eliminar equipo</button></div></details>)}</div>}
        {tab === "tutorials" && <div><h2>Tutoriales y subtítulos</h2><p className={styles.intro}>Los videos se cargan solo al tocar Reproducir. YouTube abre los subtítulos en español y esta guía visible garantiza una explicación en español.</p><TutorialEditor title="RCL1005" youtubeId={content.sticker.youtubeId || ""} summary={content.sticker.spanishSummary || ""} onVideo={(value) => setContent({ ...content, sticker: { ...content.sticker, youtubeId: value } })} onSummary={(value) => setContent({ ...content, sticker: { ...content.sticker, spanishSummary: value } })} />{content.machines.map((machine, index) => <TutorialEditor key={machine.slug} title={machine.name} youtubeId={machine.youtubeId || ""} summary={machine.spanishSummary || ""} onVideo={(value) => updateMachine(index, { youtubeId: value })} onSummary={(value) => updateMachine(index, { spanishSummary: value })} />)}</div>}
        {tab === "films" && <div><div className={styles.sectionHead}><div><h2>Láminas</h2><p>{content.films.length} tipos publicados</p></div><button onClick={addFilm}>+ Crear lámina</button></div>{content.films.map((film, index) => <details className={styles.record} key={`${film.name}-${index}`}><summary><div><small>TIPO DE PELÍCULA</small><strong>{film.name}</strong></div><span>Editar ↓</span></summary><div className={styles.formGrid}><Field label="Nombre" value={film.name} onChange={(value) => updateFilm(index, { name: value })} /><Field label="Beneficio principal" value={film.short} onChange={(value) => updateFilm(index, { short: value })} /><Field area label="Descripción" value={film.description} onChange={(value) => updateFilm(index, { description: value })} /><Field label="Beneficios (separados por coma)" value={film.benefits.join(", ")} onChange={(value) => updateFilm(index, { benefits: value.split(",").map((item) => item.trim()).filter(Boolean) })} /><ImageField label="Imagen" value={film.image} onChange={(value) => updateFilm(index, { image: value })} upload={upload} /><button className={styles.danger} onClick={() => setContent({ ...content, films: content.films.filter((_, i) => i !== index) })}>Eliminar lámina</button></div></details>)}</div>}
        {tab === "support" && <div className={styles.formGrid}><h2>Soporte y contacto</h2><Field label="Nombre del asesor" value={content.support.advisor} onChange={(value) => setContent({ ...content, support: { ...content.support, advisor: value } })} /><Field label="WhatsApp (504...)" value={content.support.whatsappNumber} onChange={(value) => setContent({ ...content, support: { ...content.support, whatsappNumber: value.replace(/\D/g, "") } })} /><Field label="Usuario de Instagram" value={content.support.instagramHandle} onChange={(value) => setContent({ ...content, support: { ...content.support, instagramHandle: value } })} /><Field label="Enlace de Instagram" value={content.support.instagram} onChange={(value) => setContent({ ...content, support: { ...content.support, instagram: value } })} /></div>}
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
