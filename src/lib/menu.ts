import type { OrderLocation } from "@/lib/location";
import { getMenuCantina } from "@/lib/menuCantina";
import {
  allItems as praiaAllItems,
  bebidas as praiaBebidas,
  getItemBySlug as getPraiaItemBySlug,
  porcoes as praiaPorcoes,
} from "@/lib/menuPraia";
import { slugify, type Menu, type MenuItem, type ProductCategory } from "@/lib/menuTypes";

export type { Menu, MenuItem, ProductCategory };
export { slugify };

export function getMenu(location: OrderLocation): Menu {
  if (location === "cantina") return getMenuCantina();
  return {
    bebidas: praiaBebidas,
    almoco: [],
    lanches: [],
    porcoes: praiaPorcoes,
    porcoes_extras: [],
    cafe_da_manha: [],
    omeletes: [],
    sobremesas: [],
    allItems: praiaAllItems,
  };
}

export function getItemBySlugForLocation(
  location: OrderLocation,
  slug: string,
): MenuItem | undefined {
  return getMenu(location).allItems.find((item) => slugify(item.name) === slug);
}

// Backward-compatible exports (praia)
export const bebidas: MenuItem[] = praiaBebidas;
export const porcoes: MenuItem[] = praiaPorcoes;
export const allItems: MenuItem[] = praiaAllItems;

export function getItemBySlug(slug: string): MenuItem | undefined {
  return getPraiaItemBySlug(slug);
}
