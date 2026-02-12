import type { Menu, MenuItem } from "@/lib/menuTypes";

function priceBRL(value: number): string {
  // 30 -> "R$ 30,00"
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

const placeholder = "/Itens/placeholder.svg";

const cantinaAlmoco: MenuItem[] = [
  {
    name: "Filé de Frango Grelhado",
    description: "Arroz, feijão, salada",
    price: priceBRL(30),
    imageSrc: "/cantina/frango-grelhado.png",
    category: "almoco",
  },
  {
    name: "Filé de Frango à Milanesa",
    description: "Arroz, feijão, salada",
    price: priceBRL(32),
    imageSrc: "/cantina/frango-a-milanesa.png",
    category: "almoco",
  },
  {
    name: "Filé de Frango com Legumes",
    description: "Arroz, feijão, legumes, salada",
    price: priceBRL(38),
    imageSrc: "/cantina/frango-legumes.png",
    category: "almoco",
  },
  {
    name: "Filé de Frango a Cavalo",
    description: "Arroz, feijão, ovo, salada",
    price: priceBRL(38),
    imageSrc: "/cantina/frango-cavalo.png",
    category: "almoco",
  },
  {
    name: "Filé de Frango a Parmegiana",
    description: "Arroz, fritas, salada",
    price: priceBRL(40),
    imageSrc: "/cantina/frango-parmegiana.png",
    category: "almoco",
  },
  {
    name: "Mignon a Parmegiana",
    description: "Arroz, fritas, salada",
    price: priceBRL(55),
    imageSrc: "/cantina/mignon-parmegiana.png",
    category: "almoco",
  },
  {
    name: "Mignon Grelhado",
    description: "Arroz, feijão, salada",
    price: priceBRL(42),
    imageSrc: "/cantina/mignon-grelhado.png",
    category: "almoco",
  },
  {
    name: "Mignon Acebolado",
    description: "Arroz, feijão, salada",
    price: priceBRL(45),
    imageSrc: "/cantina/mignon-acebolado.png",
    category: "almoco",
  },
  {
    name: "Mignon à Milanesa",
    description: "Arroz, feijão, salada",
    price: priceBRL(45),
    imageSrc: "/cantina/mignon-milanesa.png",
    category: "almoco",
  },
  {
    name: "Mignon com Legumes",
    description: "Arroz, feijão, legumes, salada",
    price: priceBRL(48),
    imageSrc: "/cantina/mignon-legumes.png",
    category: "almoco",
  },
  {
    name: "Mignon a Cavalo",
    description: "Arroz, feijão, ovo, salada, farofa",
    price: priceBRL(48),
    imageSrc: "/cantina/mignon-cavalo.png",
    category: "almoco",
  },
  {
    name: "Filé de Peixe a Milanesa",
    description: "Arroz, feijão, salada",
    price: priceBRL(38),
    imageSrc: "/cantina/peixe-milanesa.png",
    category: "almoco",
  },
  {
    name: "Filé de Peixe com Legumes",
    description: "Arroz, feijão, salada",
    price: priceBRL(42),
    imageSrc: "/cantina/peixe-legumes.png",
    category: "almoco",
  },
  {
    name: "Filé de Peixe c/molho Camarão",
    description: "Arroz, fritas, salada",
    price: priceBRL(48),
    imageSrc: "/cantina/peixe-molho-camarao.png",
    category: "almoco",
  },
  {
    name: "Macarrão ao Sugo",
    price: priceBRL(25),
    imageSrc: "/cantina/macarrao-sugo.png",
    category: "almoco",
  },
  {
    name: "Macarrão a Bolonhesa",
    price: priceBRL(28),
    imageSrc: "/cantina/macarrao-bolonhesa.png",
    category: "almoco",
  },
  {
    name: "Macarrão, Alho e Óleo",
    price: priceBRL(25),
    imageSrc: "/cantina/macarrao-alho-oleo.png",
    category: "almoco",
  },
  {
    name: "Nhoque com Almôndegas",
    price: priceBRL(45),
    imageSrc: "/cantina/nhoque-almondegas.png",
    category: "almoco",
  },
];

const cantinaLanches: MenuItem[] = [
  {
    name: "X-Bacon",
    description: "Hambúrguer, bacon, queijo, alface, tomate",
    price: priceBRL(28),
    imageSrc: "/cantina/x-bacon.png",
    category: "lanches",
  },
  {
    name: "X-Burguer",
    description: "Hambúrguer, queijo",
    price: priceBRL(22),
    imageSrc: "/cantina/x-burger.png",
    category: "lanches",
  },
  {
    name: "X-Calabresa",
    description: "Calabresa, queijo, alface, tomate",
    price: priceBRL(22),
    imageSrc: "/cantina/x-calabresa.png",
    category: "lanches",
  },
  {
    name: "X-Egg",
    description: "Hambúrguer, ovo, queijo, alface, tomate",
    price: priceBRL(28),
    imageSrc: "/cantina/x-egg.png",
    category: "lanches",
  },
  {
    name: "X-Frango",
    description: "Filé-frango, queijo, alface, tomate",
    price: priceBRL(25),
    imageSrc: "/cantina/x-frango.png",
    category: "lanches",
  },
  {
    name: "X-Mignon",
    description: "Filé-mignon, queijo, alface, tomate",
    price: priceBRL(30),
    imageSrc: "/cantina/x-mignon.png",
    category: "lanches",
  },
  {
    name: "X-Salada",
    description: "Hambúrguer, queijo, alface, tomate",
    price: priceBRL(25),
    imageSrc: "/cantina/x-salada.png",
    category: "lanches",
  },
  {
    name: "X-Tudo",
    description: "Hambúrguer, ovo, presunto, bacon, queijo, alface, tomate",
    price: priceBRL(35),
    imageSrc: "/cantina/x-tudo.png",
    category: "lanches",
  },
  {
    name: "Americano",
    description: "Pão, ovo, presunto, queijo, tomate, alface",
    price: priceBRL(20),
    imageSrc: "/cantina/americano.png",
    category: "lanches",
  },
  {
    name: "Bauru",
    description: "Pão, presunto, mussarela, tomate",
    price: priceBRL(14),
    imageSrc: "/cantina/bauru.png",
    category: "lanches",
  },
  {
    name: "Misto Quente",
    description: "Pão, presunto, mussarela",
    price: priceBRL(12),
    imageSrc: "/cantina/misto-quente.png",
    category: "lanches",
  },
  {
    name: "Queijo Quente",
    description: "Mussarela, tomate",
    price: priceBRL(10),
    imageSrc: "/cantina/queijo-quente.png",
    category: "lanches",
  },
];

const meiaPorcaoNote = "Meia porção: 60% do valor da porção inteira.";

const cantinaPorcoes: MenuItem[] = [
  {
    name: "Fritas Especial",
    description: "Com cheddar e bacon. " + meiaPorcaoNote,
    price: priceBRL(45),
    imageSrc: "/Itens/fritas.png",
    category: "porcoes",
  },
  {
    name: "Pasteizinhos (Queijo) 12uni",
    description: meiaPorcaoNote,
    price: priceBRL(35),
    imageSrc: "/Itens/pastelzinho.png",
    category: "porcoes",
  },
  {
    name: "Smiles",
    description: meiaPorcaoNote,
    price: priceBRL(35),
    imageSrc: "/Itens/nuggets-smile.png",
    category: "porcoes",
  },
  {
    name: "Fritas",
    description: meiaPorcaoNote,
    price: priceBRL(35),
    imageSrc: "/Itens/fritas.png",
    category: "porcoes",
  },
  {
    name: "Mandioca",
    description: meiaPorcaoNote,
    price: priceBRL(35),
    imageSrc: "/Itens/mandioca1.png",
    category: "porcoes",
  },
  {
    name: "Polenta",
    description: meiaPorcaoNote,
    price: priceBRL(35),
    imageSrc: "/Itens/polenta.png",
    category: "porcoes",
  },
  {
    name: "Nuggets",
    description: meiaPorcaoNote,
    price: priceBRL(35),
    imageSrc: "/Itens/nuggets-smile.png",
    category: "porcoes",
  },
  {
    name: "Isca de Frango",
    description: meiaPorcaoNote,
    price: priceBRL(45),
    imageSrc: "/cantina/isca-frango.png",
    category: "porcoes",
  },
  {
    name: "Coxinha",
    description: meiaPorcaoNote,
    price: priceBRL(35),
    imageSrc: "/Itens/coxinha.png",
    category: "porcoes",
  },
  {
    name: "Bolinha de Queijo",
    description: meiaPorcaoNote,
    price: priceBRL(35),
    imageSrc: "/Itens/bolinho-de-queijo.png",
    category: "porcoes",
  },
  {
    name: "Kibe",
    description: meiaPorcaoNote,
    price: priceBRL(45),
    imageSrc: "/Itens/quibe.png",
    category: "porcoes",
  },
  {
    name: "Almondeguinha",
    description: meiaPorcaoNote,
    price: priceBRL(45),
    imageSrc: "/Itens/almondega.webp",
    category: "porcoes",
  },
  {
    name: "Torresminho",
    description: meiaPorcaoNote,
    price: priceBRL(45),
    imageSrc: "/cantina/torresminho.png",
    category: "porcoes",
  },
  {
    name: "Calabresa Acebolada",
    description: meiaPorcaoNote,
    price: priceBRL(45),
    imageSrc: "/Itens/calabresa.png",
    category: "porcoes",
  },
  {
    name: "Camarão",
    description: meiaPorcaoNote,
    price: priceBRL(60),
    imageSrc: "/Itens/camarao.png",
    category: "porcoes",
  },
  {
    name: "Isca de Peixe",
    description: meiaPorcaoNote,
    price: priceBRL(60),
    imageSrc: "/Itens/isca-de-peixe.png",
    category: "porcoes",
  },
  {
    name: "Bolinho de Bacalhau",
    description: meiaPorcaoNote,
    price: priceBRL(60),
    imageSrc: "/Itens/bolinho-de-bacalhau.png",
    category: "porcoes",
  },
];

const cantinaPorcoesExtras: MenuItem[] = [
  {
    name: "Panaché de Legumes",
    price: priceBRL(10),
    imageSrc: "/cantina/panache-legumes.png",
    category: "porcoes_extras",
  },
  {
    name: "Arroz",
    price: priceBRL(10),
    imageSrc: "/cantina/arroz.png",
    category: "porcoes_extras",
  },
  {
    name: "Feijão",
    price: priceBRL(10),
    imageSrc: "/cantina/feijao.png",
    category: "porcoes_extras",
  },
  {
    name: "Filé de Frango",
    price: priceBRL(20),
    imageSrc: "/cantina/frango-a-milanesa.png",
    category: "porcoes_extras",
  },
  {
    name: "Filé de Peixe",
    price: priceBRL(22),
    imageSrc: "/cantina/peixe-milanesa.png",
    category: "porcoes_extras",
  },
  {
    name: "Mignon (Bife)",
    price: priceBRL(25),
    imageSrc: "/cantina/mignon-grelhado.png",
    category: "porcoes_extras",
  },
  {
    name: "Salmão",
    price: priceBRL(28),
    imageSrc: "/cantina/salmao.png",
    category: "porcoes_extras",
  },
];

const cantinaCafeDaManha: MenuItem[] = [
  {
    name: "Café Expresso",
    price: priceBRL(5),
    imageSrc: "/cantina/expresso.png",
    category: "cafe_da_manha",
  },
  {
    name: "Café Expresso com Leite",
    price: priceBRL(8),
    imageSrc: "/cantina/expresso-leite.png",
    category: "cafe_da_manha",
  },
  {
    name: "Leite com Chocolate",
    price: priceBRL(8),
    imageSrc: "/cantina/leite-chocolate.png",
    category: "cafe_da_manha",
  },
  {
    name: "Pão na Chapa",
    price: priceBRL(7),
    imageSrc: "/cantina/pao-chapa.png",
    category: "cafe_da_manha",
  },
  {
    name: "Pão com ovo",
    price: priceBRL(10),
    imageSrc: "/cantina/pao-ovo.png",
    category: "cafe_da_manha",
  },
];

const cantinaOmeletes: MenuItem[] = [
  {
    name: "Omelete Simples",
    description: "Acompanha pão e salada. Ovo, cebola, orégano",
    price: priceBRL(18),
    imageSrc: "/cantina/omelete-simples.png",
    category: "omeletes",
  },
  {
    name: "Omelete com Queijo",
    description: "Acompanha pão e salada. Ovo, queijo, orégano",
    price: priceBRL(20),
    imageSrc: "/cantina/omelete-queijo.png",
    category: "omeletes",
  },
  {
    name: "Omelete Bauru",
    description: "Acompanha pão e salada. Ovo, tomate, presunto, mussarela",
    price: priceBRL(22),
    imageSrc: "/cantina/omelete-bauru.png",
    category: "omeletes",
  },
  {
    name: "Omelete Big",
    description: "Acompanha pão e salada. Ovo, tomate, presunto, mussarela, batata",
    price: priceBRL(25),
    imageSrc: "/cantina/omelete-big.png",
    category: "omeletes",
  },
  {
    name: "Omelete Vegetariano",
    description: "Acompanha pão e salada. Ovo, mix de legumes, queijo",
    price: priceBRL(25),
    imageSrc: "/cantina/omelete-vegetariano.png",
    category: "omeletes",
  },
  {
    name: "Omelete Calabresa",
    description: "Acompanha pão e salada. Ovo, calabresa, queijo, cebola",
    price: priceBRL(25),
    imageSrc: "/cantina/omelete-calabresa.png",
    category: "omeletes",
  },
];

const cantinaSobremesas: MenuItem[] = [
  {
    name: "Doce de Abóbora",
    price: priceBRL(8),
    imageSrc: "/cantina/doce-abobora.png",
    category: "sobremesas",
  },
  {
    name: "Torta Holandesa",
    price: priceBRL(10),
    imageSrc: "/cantina/torta-holandesa.png",
    category: "sobremesas",
  },
  {
    name: "Torta de Limão",
    price: priceBRL(10),
    imageSrc: "/cantina/torta-limao.png",
    category: "sobremesas",
  },
  {
    name: "Torta de Maracujá",
    price: priceBRL(10),
    imageSrc: "/cantina/torta-maracuja.png",
    category: "sobremesas",
  },
  {
    name: "Petit Gateau com Sorvete",
    price: priceBRL(20),
    imageSrc: "/cantina/petit-gateau-sorvete.png",
    category: "sobremesas",
  },
];

const cantinaBebidas: MenuItem[] = [
  {
    name: "Água sem gás",
    price: priceBRL(5),
    imageSrc: "/Itens/agua.webp",
    category: "bebidas",
  },
  {
    name: "Água com gás",
    price: priceBRL(6),
    imageSrc: "/Itens/agua.webp",
    category: "bebidas",
  },
  {
    name: "H2O",
    price: priceBRL(10),
    imageSrc: "/Itens/h2o.jpg",
    category: "bebidas",
  },
  {
    name: "Refrigerante",
    price: priceBRL(8),
    imageSrc: "/Itens/refrigerante.png",
    category: "bebidas",
  },
  {
    name: "Sufresh",
    price: priceBRL(9),
    imageSrc: "/cantina/sufresh.png",
    category: "bebidas",
  },
  {
    name: "Gatorade",
    price: priceBRL(10),
    imageSrc: "/Itens/gatorade.png",
    category: "bebidas",
  },
  {
    name: "Água de Coco",
    price: priceBRL(6),
    imageSrc: "/cantina/agua-coco.png",
    category: "bebidas",
  },
  {
    name: "Suco de Laranja",
    price: priceBRL(15),
    imageSrc: "/cantina/suco-laranja.png",
    category: "bebidas",
  },
  {
    name: "Suco de Limão",
    price: priceBRL(12),
    imageSrc: "/cantina/suco-limao.png",
    category: "bebidas",
  },
  {
    name: "Suco de Polpa",
    price: priceBRL(15),
    imageSrc: "/cantina/suco-poupa.png",
    category: "bebidas",
  },
  {
    name: "Milk Shake",
    price: priceBRL(20),
    imageSrc: "/cantina/milk-shake.png",
    category: "bebidas",
  },
  {
    name: "Cerveja Lata",
    price: priceBRL(8),
    imageSrc: "/Itens/cerveja-lata.png",
    category: "bebidas",
  },
  {
    name: "Cerveja Original- Lata",
    price: priceBRL(8),
    imageSrc: "/Itens/cerveja-lata.png",
    category: "bebidas",
  },
  {
    name: "Heineken Long Neck",
    price: priceBRL(13),
    imageSrc: "/Itens/cerveja-long-neck.png",
    category: "bebidas",
  },
  {
    name: "Campari",
    price: priceBRL(12),
    imageSrc: "/cantina/campari.png",
    category: "bebidas",
  },
  {
    name: "Domecq",
    price: priceBRL(10),
    imageSrc: "/cantina/domecq.png",
    category: "bebidas",
  },
  {
    name: "Vodka Smirnoff",
    price: priceBRL(12),
    imageSrc: "/cantina/smirnoff.png",
    category: "bebidas",
  },
  {
    name: "Caipirinha de Pinga",
    price: priceBRL(25),
    imageSrc: "/Itens/caipirinha-de-pinga.png",
    category: "bebidas",
  },
  {
    name: "Caipirinha de Sake",
    price: priceBRL(28),
    imageSrc: "/cantina/sake.png",
    category: "bebidas",
  },
  {
    name: "Caipirinha de Vodka",
    description: "Acréscimo de R$ 3,00 para morango, maracujá ou abacaxi.",
    price: priceBRL(30),
    imageSrc: "/Itens/caipirinha-vodka.webp",
    category: "bebidas",
  },
];

export function getMenuCantina(): Menu {
  const allItems = [
    ...cantinaAlmoco,
    ...cantinaLanches,
    ...cantinaPorcoes,
    ...cantinaPorcoesExtras,
    ...cantinaCafeDaManha,
    ...cantinaOmeletes,
    ...cantinaSobremesas,
    ...cantinaBebidas,
  ];

  return {
    bebidas: cantinaBebidas,
    almoco: cantinaAlmoco,
    lanches: cantinaLanches,
    porcoes: cantinaPorcoes,
    porcoes_extras: cantinaPorcoesExtras,
    cafe_da_manha: cantinaCafeDaManha,
    omeletes: cantinaOmeletes,
    sobremesas: cantinaSobremesas,
    allItems,
  };
}
