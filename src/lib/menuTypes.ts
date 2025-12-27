export type ProductCategory =
  | "bebidas"
  | "almoco"
  | "lanches"
  | "porcoes"
  | "porcoes_extras"
  | "cafe_da_manha"
  | "omeletes"
  | "sobremesas";

export type MenuItem = {
  name: string;
  description?: string;
  price: string;
  imageSrc: string;
  category: ProductCategory;
  options?: string[];
};

export type Menu = {
  bebidas: MenuItem[];
  almoco: MenuItem[];
  lanches: MenuItem[];
  porcoes: MenuItem[];
  porcoes_extras: MenuItem[];
  cafe_da_manha: MenuItem[];
  omeletes: MenuItem[];
  sobremesas: MenuItem[];
  allItems: MenuItem[];
};

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/\s*\/\s*/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}
