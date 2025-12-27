import type { Menu, MenuItem } from "@/lib/menuTypes";
import { slugify } from "@/lib/menuTypes";

const praiaBebidas: MenuItem[] = [
  {
    name: "Água",
    price: "R$ 6,00",
    imageSrc: "/Itens/agua.webp",
    category: "bebidas",
    options: ["Sem gás", "Com gás"],
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
    options: ["Heineken Zero", "Original", "Amstel", "Brahma"],
  },
  {
    name: "Cerveja long neck",
    price: "R$ 13,00",
    imageSrc: "/Itens/cerveja-long-neck.png",
    category: "bebidas",
    options: ["Heineken", "Original", "Malzbier"],
  },
  {
    name: "Caipirinha de pinga",
    price: "R$ 25,00",
    imageSrc: "/Itens/caipirinha-de-pinga.png",
    category: "bebidas",
    options: ["Morango", "Limão"],
  },
  {
    name: "Caipirinha de vodka",
    price: "R$ 30,00",
    imageSrc: "/Itens/caipirinha-vodka.webp",
    category: "bebidas",
    options: ["Morango", "Limão"],
  },
  {
    name: "Gatorade",
    price: "R$ 9,00",
    imageSrc: "/Itens/gatorade.png",
    category: "bebidas",
    options: ["Azul", "Vermelho"],
  },
  {
    name: "H2O",
    price: "R$ 9,00",
    imageSrc: "/Itens/h2o.jpg",
    category: "bebidas",
    options: ["Limoneto", "Normal"],
  },
  {
    name: "Refrigerante",
    price: "R$ 8,00",
    imageSrc: "/Itens/refrigerante.png",
    category: "bebidas",
    options: [
      "Coca-Cola",
      "Guaraná",
      "Coca-Cola Zero",
      "Guaraná Zero",
      "Fanta",
      "Sukita",
    ],
  },
];

const praiaPorcoes: MenuItem[] = [
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
    options: ["Nuggets", "Smiles"],
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

export function getMenuPraia(): Menu {
  const allItems = [...praiaBebidas, ...praiaPorcoes];

  return {
    bebidas: praiaBebidas,
    almoco: [],
    lanches: [],
    porcoes: praiaPorcoes,
    porcoes_extras: [],
    cafe_da_manha: [],
    omeletes: [],
    sobremesas: [],
    allItems,
  };
}

export const bebidas: MenuItem[] = praiaBebidas;
export const porcoes: MenuItem[] = praiaPorcoes;
export const allItems: MenuItem[] = [...praiaBebidas, ...praiaPorcoes];

export function getItemBySlug(slug: string): MenuItem | undefined {
  return allItems.find((item) => slugify(item.name) === slug);
}
