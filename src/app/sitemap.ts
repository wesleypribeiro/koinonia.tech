import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
export const dynamic = 'force-static';

// Só páginas de verdade. Âncoras (/#servicos) o Google ignora, e /bio é noindex.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteConfig.url}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}