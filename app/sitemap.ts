import type { MetadataRoute } from "next";
import { machines } from "@/data/machines";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/stickers", "/maquinas", "/laminas", "/tutoriales", "/soporte"].map((path) => ({
    url: `${SITE.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8
  }));

  const machineRoutes = machines.map((machine) => ({
    url: `${SITE.url}/maquinas/${machine.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9
  }));

  return [...routes, ...machineRoutes];
}
