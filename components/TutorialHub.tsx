"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { VideoEmbed } from "@/components/VideoEmbed";

export type TutorialHubItem = {
  id: string;
  name: string;
  label: string;
  image: string;
  href: string;
  youtubeId?: string;
  videoLabel: string;
  summary?: string;
  steps: { title: string; text: string }[];
};

export function TutorialHub({ items }: { items: TutorialHubItem[] }) {
  const [activeId, setActiveId] = useState(items[0]?.id || "");
  const active = items.find((item) => item.id === activeId) || items[0];
  if (!active) return null;

  return (
    <section className="tutorial-hub shell section" aria-label="Biblioteca de tutoriales">
      <div className="tutorial-hub-picker" role="tablist" aria-label="Seleccione un equipo">
        {items.map((item, index) => <button type="button" role="tab" aria-selected={item.id === active.id} className={item.id === active.id ? "is-active" : ""} onClick={() => setActiveId(item.id)} key={item.id}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <Image src={item.image} alt="" width={180} height={180} quality={88} sizes="90px" />
          <strong>{item.name}</strong>
          <small>{item.label}</small>
        </button>)}
      </div>

      <article className="tutorial-hub-stage" role="tabpanel">
        <div className="tutorial-hub-head">
          <div><span className="eyebrow">GUÍA SELECCIONADA · {active.name}</span><h2>{active.videoLabel}</h2></div>
          <Link className="text-link" href={active.href}>Abrir ficha completa →</Link>
        </div>
        <VideoEmbed key={active.id} youtubeId={active.youtubeId} title={active.videoLabel} spanishSummary={active.summary} />
        <div className="tutorial-hub-steps">
          {active.steps.map((step, index) => <div key={step.title}><b>{String(index + 1).padStart(2, "0")}</b><strong>{step.title}</strong><span>{step.text}</span></div>)}
        </div>
      </article>
    </section>
  );
}
