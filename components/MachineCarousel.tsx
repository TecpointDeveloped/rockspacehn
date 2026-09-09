"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

export type CarouselMachine = { name: string; image: string; href: string; label: string };

export function MachineCarousel({ machines }: { machines: CarouselMachine[] }) {
  const [active, setActive] = useState(0);
  const [pausedUntil, setPausedUntil] = useState(0);
  const touchStart = useRef<number | null>(null);
  const count = machines.length;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || count < 2) return;
    const timer = window.setInterval(() => {
      if (Date.now() >= pausedUntil) setActive((value) => (value + 1) % count);
    }, 4800);
    return () => window.clearInterval(timer);
  }, [count, pausedUntil]);

  function select(index: number) {
    setActive((index + count) % count);
    setPausedUntil(Date.now() + 9000);
  }

  return (
    <div className="machine-carousel" aria-roledescription="carrusel" aria-label="Máquinas Rock Space">
      <div
        className="machine-carousel-track"
        style={{ "--slide-x": `calc(${-active * 100}% - ${active * 12}px)` } as CSSProperties}
        onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }}
        onTouchEnd={(event) => {
          if (touchStart.current === null) return;
          const distance = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
          if (Math.abs(distance) > 45) select(active + (distance < 0 ? 1 : -1));
          touchStart.current = null;
        }}
      >
        {machines.map((machine, index) => (
          <article className={`machine-slide ${index === active ? "is-active" : ""}`} aria-hidden={index !== active} key={machine.name}>
            <div className="machine-slide-copy"><span>0{index + 1} · EQUIPO ROCK SPACE</span><h2>{machine.name}</h2><p>{machine.label}</p><Link tabIndex={index === active ? 0 : -1} href={machine.href}>Conocer equipo <b>→</b></Link></div>
            <Image src={machine.image} alt={`${machine.name} Rock Space`} width={900} height={700} priority={index === 0} quality={88} sizes="(max-width: 700px) 90vw, 42vw" />
          </article>
        ))}
      </div>
      <div className="machine-carousel-controls">
        <button type="button" onClick={() => select(active - 1)} aria-label="Máquina anterior">←</button>
        <div>{machines.map((machine, index) => <button className={index === active ? "is-active" : ""} type="button" aria-label={`Mostrar ${machine.name}`} aria-current={index === active} onClick={() => select(index)} key={machine.name}><span /></button>)}</div>
        <button type="button" onClick={() => select(active + 1)} aria-label="Máquina siguiente">→</button>
      </div>
    </div>
  );
}
