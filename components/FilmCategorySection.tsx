import Image from "next/image";
import type { Film } from "@/data/films";
import { availableVariants } from "@/lib/catalog";
import { SITE, whatsappUrlFor } from "@/lib/site";

export function FilmCategorySection({ id, title, description, products, dark = false, salesNumber = SITE.salesWhatsappNumber }: { id: string; title: string; description: string; products: Film[]; dark?: boolean; salesNumber?: string }) {
  return (
    <section className={`catalog-family ${dark ? "catalog-family-dark" : ""}`} id={id}>
      <div className="shell section">
        <div className="catalog-family-head"><div><span className={`eyebrow ${dark ? "light" : ""}`}>LÁMINAS ROCK SPACE</span><h2>{title}</h2><p>{description}</p></div><span>{String(products.length).padStart(2, "0")} soluciones</span></div>
        <div className="catalog-product-grid">
          {products.map((product, index) => {
            const variants = availableVariants(product.variants || []);
            const productImages = product.images?.length ? product.images : [product.image];
            return <article className="catalog-product" key={product.slug || product.name}>
              <div className={`catalog-product-image ${productImages.length > 1 ? "catalog-product-image-pair" : ""}`}>
                {productImages.map((image, imageIndex) => <Image key={image} src={image} alt={imageIndex === 0 ? product.alt : `${product.name} ${variants[imageIndex]?.label || "presentación adicional"}`} width={1000} height={1000} quality={88} priority={index === 0 && imageIndex === 0 && id === "flexible"} sizes={productImages.length > 1 ? "(max-width: 700px) 82vw, 22vw" : "(max-width: 700px) 88vw, 40vw"} />)}
              </div>
              <div className="catalog-product-copy"><span>{product.subcategory || product.category}</span><h3>{product.name}</h3><p>{product.short}</p><ul>{product.benefits.slice(0, 3).map((benefit) => <li key={benefit}>✓ {benefit}</li>)}</ul>
                <dl className="catalog-product-specs">{product.specs.slice(0, 3).map((spec) => <div key={spec.label}><dt>{spec.label}</dt><dd>{spec.value}</dd></div>)}</dl>
                {product.compatibility.length > 0 && <p className="catalog-compatibility"><b>Compatibilidad:</b> {product.compatibility.join(" · ")}</p>}
                {variants.length > 0 && <div className="variant-list" aria-label="Variantes disponibles">{variants.map((variant) => <b key={variant.label}>{variant.label}</b>)}</div>}
                <a href={whatsappUrlFor(salesNumber, `Hola, quiero información sobre la lámina ${product.name}.`)} target="_blank" rel="noreferrer">Consultar <b>→</b></a>
              </div>
            </article>;
          })}
        </div>
      </div>
    </section>
  );
}
