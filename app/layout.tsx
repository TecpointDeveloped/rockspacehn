import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Rock Space Honduras | Stickers, máquinas y personalización",
    template: "%s | Rock Space Honduras"
  },
  description: "RCL1005 para stickers personalizados, máquinas inteligentes de corte Rock Space, tutoriales integrados y soporte técnico en Honduras.",
  icons: { icon: "/brand/rock-space-honduras.png", apple: "/brand/rock-space-honduras.png" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_HN",
    siteName: SITE.name,
    title: "Rock Space Honduras",
    description: "Stickers personalizados y protección bajo demanda para tiendas de tecnología en Honduras.",
    url: SITE.url,
    images: [{ url: "/images/products/rcl1005-stickers.webp", width: 1200, height: 630, alt: "Stickers personalizados con RCL1005 en Rock Space Honduras" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Rock Space Honduras | Personalización bajo demanda",
    description: "RCL1005 para stickers, skins y fotos; plotters, láminas, tutoriales y soporte local.",
    images: ["/images/products/rcl1005-stickers.webp"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <a className="skip-link" href="#contenido">Saltar al contenido</a>
        <SiteHeader />
        <main id="contenido">{children}</main>
        <SiteFooter />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
