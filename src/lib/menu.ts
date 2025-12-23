export type ProductCategory = "bebidas" | "porcoes";

export type MenuItem = {
  name: string;
  price: string;
  imageSrc: string;
  category: ProductCategory;
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

export const bebidas: MenuItem[] = [
  {
    name: "Água sem / com gás",
    price: "R$ 6,00",
    imageSrc: "/Itens/agua.webp",
    category: "bebidas",
  },
  {
    name: "Balde de gelo",
    price: "R$ 6,00",
    imageSrc: "/Itens/balde-de-gelo.webp",
    category: "bebidas",
  },
  {
    name: "Cerveja lata",
    price: "R$ 9,00",
    imageSrc: "/Itens/cerveja-lata.png",
    category: "bebidas",
  },
  {
    name: "Cerveja long neck",
    price: "R$ 13,00",
    imageSrc: "/Itens/cerveja-long-neck.png",
    category: "bebidas",
  },
  {
    name: "Caipirinha de pinga",
    price: "R$ 25,00",
    imageSrc: "/Itens/caipirinha-de-pinga.png",
    category: "bebidas",
  },
  {
    name: "Caipirinha de vodka",
    price: "R$ 30,00",
    imageSrc: "/Itens/caipirinha-vodka.webp",
    category: "bebidas",
  },
  {
    name: "Gatorade",
    price: "R$ 9,00",
    imageSrc: "/Itens/gatorade.png",
    category: "bebidas",
  },
  {
    name: "H2O",
    price: "R$ 9,00",
    imageSrc: "/Itens/h2o.jpg",
    category: "bebidas",
  },
  {
    name: "Refrigerante",
    price: "R$ 8,00",
    imageSrc: "/Itens/refrigerante.png",
    category: "bebidas",
  },
];

export const porcoes: MenuItem[] = [
  {
    name: "Almôndega",
    price: "R$ 46,00",
    imageSrc: "/Itens/almondega.webp",
    category: "porcoes",
  },
  {
    name: "Bolinho de queijo",
    price: "R$ 36,00",
    imageSrc: "/Itens/bolinho-de-queijo.png",
    category: "porcoes",
  },
  {
    name: "Bolinho bacalhau",
    price: "R$ 61,00",
    imageSrc: "/Itens/bolinho-de-bacalhau.png",
    category: "porcoes",
  },
  {
    name: "Calabresa",
    price: "R$ 46,00",
    imageSrc: "/Itens/calabresa.png",
    category: "porcoes",
  },
  {
    name: "Camarão",
    price: "R$ 61,00",
    imageSrc: "/Itens/camarao.png",
    category: "porcoes",
  },
  {
    name: "Coxinha",
    price: "R$ 36,00",
    imageSrc: "/Itens/coxinha.png",
    category: "porcoes",
  },
  {
    name: "Fritas",
    price: "R$ 36,00",
    imageSrc: "/Itens/fritas.png",
    category: "porcoes",
  },
  {
    name: "Mandioca",
    price: "R$ 36,00",
    imageSrc: "/Itens/mandioca1.png",
    category: "porcoes",
  },
  {
    name: "Nuggets / Smiles",
    price: "R$ 36,00",
    imageSrc: "/Itens/nuggets-smile.png",
    category: "porcoes",
  },
  {
    name: "Pastelzinho",
    price: "R$ 36,00",
    imageSrc: "/Itens/pastelzinho.png",
    category: "porcoes",
  },
  {
    name: "Polenta",
    price: "R$ 36,00",
    imageSrc: "/Itens/polenta.png",
    category: "porcoes",
  },
  {
    name: "Quibe",
    price: "R$ 46,00",
    imageSrc: "/Itens/quibe.png",
    category: "porcoes",
  },
  {
    name: "Isca de peixe",
    price: "R$ 61,00",
    imageSrc: "/Itens/isca-de-peixe.png",
    category: "porcoes",
  },
];

export const allItems: MenuItem[] = [...bebidas, ...porcoes];

export function getItemBySlug(slug: string): MenuItem | undefined {
  return allItems.find((item) => slugify(item.name) === slug);
}
