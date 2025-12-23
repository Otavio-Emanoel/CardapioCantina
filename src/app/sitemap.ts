import type { MetadataRoute } from "next";

import { allItems, slugify } from "@/lib/menu";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const now = new Date();

  const routes = ["/", "/precos", "/pedido", ...allItems.map((i) => `/produto/${slugify(i.name)}`)];

  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
  }));
}
