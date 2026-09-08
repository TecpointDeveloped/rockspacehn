import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Estamos preparando algo mejor",
  description: "Rock Space Honduras se encuentra temporalmente en mantenimiento.",
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <section className="maintenance-page">
      <div className="maintenance-glow" aria-hidden="true" />
      <div className="maintenance-card">
        <Image src="/brand/rock-space-honduras.png" alt="Rock Space Honduras" width={124} height={124} priority />
        <span>ROCK SPACE HONDURAS</span>
        <h1>Estamos preparando algo mejor.</h1>
        <p>Muy pronto volveremos con una experiencia renovada para conocer nuestras máquinas, materiales y soluciones de personalización.</p>
        <div className="maintenance-status"><i aria-hidden="true" /> Sitio temporalmente en mantenimiento</div>
      </div>
    </section>
  );
}
