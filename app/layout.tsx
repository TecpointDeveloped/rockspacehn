import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "./balanced.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Rock Space Honduras | Máquinas, láminas y personalización",
    template: "%s | Rock Space Honduras"
  },
  description: "Máquinas Rock Space, láminas frontales, personalización, tutoriales y soporte técnico en Honduras.",
  icons: { icon: "/brand/rock-space-honduras.png", apple: "/brand/rock-space-honduras.png" },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_HN",
    siteName: SITE.name,
    title: "Rock Space Honduras",
    description: "Máquinas, láminas frontales y personalización bajo demanda para tiendas de tecnología en Honduras.",
    url: SITE.url,
    images: [{ url: "/brand/rock-space-honduras.png", width: 1200, height: 630, alt: "Rock Space Honduras" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Rock Space Honduras | Máquinas y protección bajo demanda",
    description: "Plotters, láminas frontales, RCL1005, tutoriales y soporte local.",
    images: ["/brand/rock-space-honduras.png"]
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
