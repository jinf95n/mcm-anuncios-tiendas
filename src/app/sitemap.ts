import type { MetadataRoute } from "next";
import { site } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Versión de prueba (site.indexable false): sitemap vacío.
  if (!site.indexable) return [];
  return site.routes.map((route) => ({
    url: new URL(route, site.url).toString(),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
