import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero shell narrow-hero" style={{ minHeight: "60vh" }}>
      <span className="eyebrow">404</span>
      <h1>Esta página no está disponible.</h1>
      <p>Puede volver al inicio o revisar las máquinas Rock Space disponibles en el sitio.</p>
      <div className="button-row">
        <Link className="button button-primary" href="/">Volver al inicio</Link>
        <Link className="button button-secondary" href="/maquinas">Ver máquinas</Link>
      </div>
    </section>
  );
}
