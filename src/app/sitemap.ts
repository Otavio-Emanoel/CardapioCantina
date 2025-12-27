import type { MetadataRoute } from "next";

import { getMenu, slugify } from "@/lib/menu";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const now = new Date();

  const praiaItems = getMenu("praia").allItems;
  const cantinaItems = getMenu("cantina").allItems;

  const productRoutes = Array.from(
    new Set([...praiaItems, ...cantinaItems].map((i) => `/produto/${slugify(i.name)}`)),
  );

  const routes = ["/", "/cardapio", "/precos", "/pedido", ...productRoutes];

  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
  }));
}
