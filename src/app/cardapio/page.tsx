"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import {
  getOrderLocationFromBrowser,
  getOrderLocationLabel,
  type OrderLocation,
} from "@/lib/location";
import { getMenu, slugify, type MenuItem, type ProductCategory } from "@/lib/menu";

type CategoryFilter = ProductCategory | "all";

function getCategoryLabel(category: CategoryFilter): string {
  switch (category) {
    case "all":
      return "Todos";
    case "almoco":
      return "Almoço";
    case "lanches":
      return "Lanches";
    case "porcoes":
      return "Porções";
    case "porcoes_extras":
      return "Extras";
    case "cafe_da_manha":
      return "Café da manhã";
    case "omeletes":
      return "Omeletes";
    case "sobremesas":
      return "Sobremesas";
    case "bebidas":
      return "Bebidas";
    default:
      return "Categoria";
  }
}

function getBadgeLabel(category: ProductCategory): string {
  return getCategoryLabel(category);
}

function IconDrink() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <path
        d="M8 3h9m-4 0v4m-6 3 3.5 10.5a2 2 0 0 0 1.9 1.3h2.2a2 2 0 0 0 1.9-1.3L20 10H7Z"
        stroke="var(--primary)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 10h15"
        stroke="var(--primary)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M10 14c.8.8 1.2 1.2 2 2 .8-.8 1.2-1.2 2-2"
        stroke="var(--accent)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
    </svg>
  );
}

function IconSnack() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none">
      <path
        d="M4 14c2.2 2.8 5 4 8 4s5.8-1.2 8-4"
        stroke="var(--primary)"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 14h14a7 7 0 0 0-14 0Z"
        stroke="var(--primary)"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 10c.8-1 1.8-1.5 3-1.5S14.2 9 15 10"
        stroke="var(--accent)"
        strokeWidth="1.7"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  );
}

function FilterChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background " +
        (active
          ? "border-transparent bg-primary text-primary-foreground"
          : "border-border bg-card text-foreground hover:bg-muted/40")
      }
    >
      {label}
    </button>
  );
}

function ProductCard({ item }: { item: MenuItem }) {
  const badgeLabel = getBadgeLabel(item.category);
  const badgeDotClass = item.category === "bebidas" ? "bg-primary" : "bg-accent";
  const icon = item.category === "bebidas" ? <IconDrink /> : <IconSnack />;

  return (
    <article className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-transform hover:-translate-y-0.5">
      <div className="relative aspect-square w-full bg-muted">
        <Image
          src={item.imageSrc}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, 360px"
          className="object-contain"
        />
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
          <span className={`h-2 w-2 rounded-full ${badgeDotClass}`} />
          {badgeLabel}
        </div>
        <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-2xl bg-background/70 backdrop-blur">
          {icon}
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm font-semibold text-foreground">{item.price}</p>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-foreground">
          {item.name}
        </h3>
        {item.description ? (
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
            {item.description}
          </p>
        ) : null}
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="inline-flex items-center rounded-xl bg-muted px-3 py-2 text-xs font-semibold text-foreground">
            Disponível
          </span>
          <Link
            href={`/produto/${slugify(item.name)}`}
            className="inline-flex items-center justify-center rounded-2xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-card active:translate-y-0"
          >
            Ver mais
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function CardapioPage() {
  const router = useRouter();

  const [location, setLocation] = useState<OrderLocation | null>(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");

  useEffect(() => {
    const selected = getOrderLocationFromBrowser();
    if (!selected) {
      router.replace("/");
      return;
    }
    setLocation(selected);
  }, [router]);

  const menu = useMemo(() => {
    if (!location) return null;
    return getMenu(location);
  }, [location]);

  const visibleCategories = useMemo<CategoryFilter[]>(() => {
    if (!menu || !location) return ["all"];

    if (location === "praia") return ["all", "bebidas", "porcoes"];

    const categories: ProductCategory[] = [
      "almoco",
      "lanches",
      "bebidas",
      "porcoes",
      "porcoes_extras",
      "cafe_da_manha",
      "omeletes",
      "sobremesas",
    ];

    const result: CategoryFilter[] = ["all"];

    for (const cat of categories) {
      const items = menu[cat];
      if (items?.length) result.push(cat);
    }

    return result;
  }, [location, menu]);

  useEffect(() => {
    if (!visibleCategories.includes(category)) {
      setCategory("all");
    }
  }, [category, visibleCategories]);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredItems = useMemo(() => {
    if (!menu) return [];

    return menu.allItems.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (!normalizedQuery) return true;
      const haystack = `${item.name} ${item.price}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [category, menu, normalizedQuery]);

  const filteredBebidas = useMemo(
    () => filteredItems.filter((i) => i.category === "bebidas"),
    [filteredItems],
  );

  const filteredAlmoco = useMemo(
    () => filteredItems.filter((i) => i.category === "almoco"),
    [filteredItems],
  );

  const filteredLanches = useMemo(
    () => filteredItems.filter((i) => i.category === "lanches"),
    [filteredItems],
  );

  const filteredPorcoes = useMemo(
    () => filteredItems.filter((i) => i.category === "porcoes"),
    [filteredItems],
  );

  const filteredExtras = useMemo(
    () => filteredItems.filter((i) => i.category === "porcoes_extras"),
    [filteredItems],
  );

  const filteredCafe = useMemo(
    () => filteredItems.filter((i) => i.category === "cafe_da_manha"),
    [filteredItems],
  );

  const filteredOmeletes = useMemo(
    () => filteredItems.filter((i) => i.category === "omeletes"),
    [filteredItems],
  );

  const filteredSobremesas = useMemo(
    () => filteredItems.filter((i) => i.category === "sobremesas"),
    [filteredItems],
  );

  if (!menu || !location) return null;

  const locationLabel = getOrderLocationLabel(location);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 pb-14 pt-10 sm:px-6 lg:px-8">
        <header className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-primary">
              Cantina Bougainville 1 • {locationLabel}
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Cardápio
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Escolha os itens para ver detalhes e montar seu pedido.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/pedido"
              className="inline-flex items-center justify-center rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 active:translate-y-0"
            >
              Fazer pedido
            </Link>
            <Link
              href="/precos"
              className="inline-flex items-center justify-center rounded-2xl border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              Ver preços
            </Link>
            <Link
              href="/"
              className="text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Trocar local
            </Link>
          </div>
        </header>

        <section className="mt-6 rounded-[2rem] border border-border bg-card p-5 sm:p-6">
          <h2 className="text-sm font-semibold text-foreground">Avisos</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              Cardápio selecionado: <span className="font-semibold">{locationLabel}</span>.
            </li>
            <li>
              As imagens são <span className="font-semibold">ilustrativas</span> e podem não representar o produto final.
            </li>
            <li>
              Preços e disponibilidade podem <span className="font-semibold">mudar sem aviso</span>.
            </li>
          </ul>
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-[1fr,auto] lg:items-end">
          <div>
            <label className="text-sm font-semibold" htmlFor="search">
              Buscar
            </label>
            <input
              id="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Digite o nome do item..."
              className="mt-2 w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {visibleCategories.map((cat) => (
              <FilterChip
                key={cat}
                active={category === cat}
                label={getCategoryLabel(cat)}
                onClick={() => setCategory(cat)}
              />
            ))}
          </div>
        </section>

        {filteredItems.length === 0 ? (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Nenhum item encontrado.
          </p>
        ) : (
          <div className="mt-10 space-y-12">
            {filteredAlmoco.length ? (
              <section>
                <h2 className="text-lg font-semibold tracking-tight">Almoço</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredAlmoco.map((item) => (
                    <ProductCard key={item.name} item={item} />
                  ))}
                </div>
              </section>
            ) : null}

            {filteredLanches.length ? (
              <section>
                <h2 className="text-lg font-semibold tracking-tight">Lanches</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredLanches.map((item) => (
                    <ProductCard key={item.name} item={item} />
                  ))}
                </div>
              </section>
            ) : null}

            {filteredBebidas.length ? (
              <section>
                <h2 className="text-lg font-semibold tracking-tight">Bebidas</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredBebidas.map((item) => (
                    <ProductCard key={item.name} item={item} />
                  ))}
                </div>
              </section>
            ) : null}

            {filteredPorcoes.length ? (
              <section>
                <h2 className="text-lg font-semibold tracking-tight">Porções</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredPorcoes.map((item) => (
                    <ProductCard key={item.name} item={item} />
                  ))}
                </div>
              </section>
            ) : null}

            {filteredExtras.length ? (
              <section>
                <h2 className="text-lg font-semibold tracking-tight">Extras</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredExtras.map((item) => (
                    <ProductCard key={item.name} item={item} />
                  ))}
                </div>
              </section>
            ) : null}

            {filteredCafe.length ? (
              <section>
                <h2 className="text-lg font-semibold tracking-tight">Café da manhã</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredCafe.map((item) => (
                    <ProductCard key={item.name} item={item} />
                  ))}
                </div>
              </section>
            ) : null}

            {filteredOmeletes.length ? (
              <section>
                <h2 className="text-lg font-semibold tracking-tight">Omeletes</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredOmeletes.map((item) => (
                    <ProductCard key={item.name} item={item} />
                  ))}
                </div>
              </section>
            ) : null}

            {filteredSobremesas.length ? (
              <section>
                <h2 className="text-lg font-semibold tracking-tight">Sobremesas</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredSobremesas.map((item) => (
                    <ProductCard key={item.name} item={item} />
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        )}

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          Cantina Bougainville 1 • Cardápio • {locationLabel}
          <p>Desenvolvido por Otavio Emanoel</p>
        </footer>
      </div>
    </div>
  );
}
