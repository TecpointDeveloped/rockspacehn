"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type CarouselMachine = { name: string; image: string; href: string; label: string };

function relativePosition(index: number, active: number, count: number) {
  let position = index - active;
  if (position > count / 2) position -= count;
  if (position < -count / 2) position += count;
  return position;
}

export function MachineCarousel({ machines }: { machines: CarouselMachine[] }) {
  const [active, setActive] = useState(0);
  const pauseUntil = useRef(0);
  const touchStart = useRef<number | null>(null);
  const count = machines.length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || count < 2) return;
    const timer = window.setInterval(() => {
      if (Date.now() >= pauseUntil.current) setActive((value) => (value + 1) % count);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [count]);

  function select(index: number) {
    setActive((index + count) % count);
    pauseUntil.current = Date.now() + 9000;
  }

  return (
    <div className="machine-carousel machine-carousel-3d" aria-roledescription="carrusel" aria-label="Máquinas Rock Space">
      <div
        className="machine-carousel-stage"
        onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }}
        onTouchEnd={(event) => {
          if (touchStart.current === null) return;
          const distance = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current;
          if (Math.abs(distance) > 42) select(active + (distance < 0 ? 1 : -1));
          touchStart.current = null;
        }}
      >
        <div className="machine-carousel-halo" aria-hidden="true" />
        {machines.map((machine, index) => {
          const position = relativePosition(index, active, count);
          const positionClass = position === 0
            ? "is-active"
            : Math.abs(position) === 1
              ? (position < 0 ? "is-left" : "is-right")
              : Math.abs(position) === 2
                ? (position < 0 ? "is-far-left" : "is-far-right")
                : "is-hidden";
          return (
            <article className={`machine-slide-3d ${positionClass}`} aria-hidden={position !== 0} key={machine.name}>
              <div className="machine-slide-visual">
                <Image src={machine.image} alt={`${machine.name} Rock Space sobre fondo blanco`} width={1200} height={1200} priority={index === 0} quality={88} sizes="(max-width: 700px) 82vw, 52vw" />
              </div>
              <div className="machine-slide-copy-3d">
                <span>{String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</span>
                <h2>{machine.name}</h2>
                <p>{machine.label}</p>
                <Link tabIndex={position === 0 ? 0 : -1} href={machine.href}>Conocer equipo <b>↗</b></Link>
              </div>
            </article>
          );
        })}
      </div>
      <div className="machine-carousel-controls machine-carousel-controls-3d">
        <button type="button" onClick={() => select(active - 1)} aria-label="Máquina anterior">←</button>
        <div>{machines.map((machine, index) => <button className={index === active ? "is-active" : ""} type="button" aria-label={`Mostrar ${machine.name}`} aria-current={index === active} onClick={() => select(index)} key={machine.name}><span /></button>)}</div>
        <button type="button" onClick={() => select(active + 1)} aria-label="Máquina siguiente">→</button>
      </div>
    </div>
  );
}
