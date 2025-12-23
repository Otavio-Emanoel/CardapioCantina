"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { allItems, bebidas, porcoes, slugify, type MenuItem, type ProductCategory } from "@/lib/menu";

function IconDrink() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
    >
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
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
    >
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

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {label}
    </a>
  );
}

function PrimaryButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0"
    >
      {label}
    </a>
  );
}

function SecondaryButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-2xl border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {label}
    </a>
  );
}

function NoticeBox() {
  return (
    <section className="rounded-[2rem] border border-border bg-card p-5 sm:p-6">
      <h2 className="text-sm font-semibold text-foreground">Avisos</h2>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        <li>
          Este cardápio é válido <span className="font-semibold">apenas na praia</span>.
        </li>
        <li>
          As imagens são <span className="font-semibold">ilustrativas</span> e podem não
          representar o produto final.
        </li>
        <li>
          Preços e disponibilidade podem <span className="font-semibold">mudar sem aviso</span>.
        </li>
        <li>Em caso de dúvida, confirme diretamente com a cantina.</li>
      </ul>
    </section>
  );
}

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
}) {
  return (
    <header className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <p className="text-sm font-semibold text-primary">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      <p className="mt-3 text-sm text-muted-foreground sm:text-base">
        {subtitle}
      </p>
    </header>
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

function ProductCard({
  item,
  icon,
}: {
  item: MenuItem;
  icon: React.ReactNode;
}) {
  const badgeLabel = item.category === "bebidas" ? "Bebida" : "Porção";
  const badgeDotClass = item.category === "bebidas" ? "bg-primary" : "bg-accent";

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

function pickByName(items: MenuItem[], name: string): MenuItem {
  return items.find((item) => item.name === name) ?? items[0]!;
}

const destaques: MenuItem[] = [
  pickByName(bebidas, "Cerveja long neck"),
  pickByName(bebidas, "Caipirinha de vodka"),
  pickByName(bebidas, "Gatorade"),
  pickByName(porcoes, "Almôndega"),
  pickByName(porcoes, "Calabresa"),
  pickByName(porcoes, "Fritas"),
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | "all">("all");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (!normalizedQuery) return true;

      const haystack = `${item.name} ${item.price}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [category, normalizedQuery]);

  const filteredBebidas = useMemo(
    () => filteredItems.filter((i) => i.category === "bebidas"),
    [filteredItems],
  );

  const filteredPorcoes = useMemo(
    () => filteredItems.filter((i) => i.category === "porcoes"),
    [filteredItems],
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border bg-card">
              <Image
                src="/icon.png"
                alt="Logo da Cantina Bougainville 1"
                fill
                sizes="40px"
                className="object-cover"
                priority
              />
            </div>
            <div className="leading-tight">
              <p className="text-xs font-semibold text-primary">Cardápio</p>
              <p className="text-sm font-semibold tracking-tight">
                Cantina Bougainville 1
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/precos"
              className="inline-flex items-center justify-center rounded-2xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0 sm:hidden"
            >
              Tabela de preços
            </Link>

            <nav className="hidden items-center gap-6 sm:flex">
              <a
                href="/precos"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Preços
              </a>
              <NavLink href="#destaques" label="Top produtos" />
              <NavLink href="#bebidas" label="Bebidas" />
              <NavLink href="#porcoes" label="Porções" />
            </nav>
          </div>
        </div>
      </header>

      <section className="mx-auto w-full max-w-6xl px-4 pb-12 pt-10 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Valores em reais (R$)
            </p>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
              Seu cardápio, bonito e rápido
            </h1>
            <p className="mt-4 max-w-prose text-sm text-muted-foreground sm:text-base">
              Bebidas e porções da Cantina Bougainville 1 em um layout mais
              moderno, organizado e fácil de consultar.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <PrimaryButton href="#destaques" label="Ver top produtos" />
              <SecondaryButton href="/precos" label="Tabela de preços" />
            </div>

            <div className="mt-8">
              <NoticeBox />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2.25rem] border border-border bg-card shadow-sm">
            <div className="absolute inset-0 opacity-60 [background:radial-gradient(900px_420px_at_20%_0%,color-mix(in_oklab,var(--primary)_18%,transparent)_0%,transparent_60%),radial-gradient(700px_360px_at_80%_100%,color-mix(in_oklab,var(--accent)_18%,transparent)_0%,transparent_60%)]" />
            <div className="relative p-4 sm:p-6">
              <div className="grid grid-cols-2 gap-3">
                {[bebidas[3], bebidas[6], porcoes[9], porcoes[0]].map((item) => (
                  <div
                    key={item.name}
                    className="overflow-hidden rounded-3xl border border-border bg-muted"
                  >
                    <div className="relative aspect-square w-full">
                      <Image
                        src={item.imageSrc}
                        alt={item.name}
                        fill
                        sizes="(max-width: 1024px) 50vw, 260px"
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">Cantina Bougainville 1</p>
                  <p className="text-xs text-muted-foreground">
                    Fotos reais dos itens
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-2xl border border-border bg-background/70 px-4 py-2 text-xs font-semibold text-muted-foreground backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  Itens
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="destaques" className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Top produtos"
          title="Alguns destaques do cardápio"
          subtitle="Um recorte rápido para escolher sem ficar rolando demais."
        />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destaques.map((item) => (
            <ProductCard
              key={item.name}
              item={item}
              icon={item.category === "bebidas" ? <IconDrink /> : <IconSnack />}
            />
          ))}
        </div>
      </section>

      <section id="itens" className="mx-auto w-full max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Itens"
          title="Encontre seu pedido"
          subtitle="Pesquise pelo nome e filtre por categoria para achar rápido."
        />

        <div className="mx-auto mt-6 max-w-3xl rounded-[2rem] border border-border bg-card p-4 sm:p-5">
          <label className="block text-sm font-semibold text-foreground">
            Pesquisar
          </label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ex.: cerveja, caipirinha, fritas..."
            className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none ring-0 placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            <FilterChip
              active={category === "all"}
              label="Todos"
              onClick={() => setCategory("all")}
            />
            <FilterChip
              active={category === "bebidas"}
              label="Bebidas"
              onClick={() => setCategory("bebidas")}
            />
            <FilterChip
              active={category === "porcoes"}
              label="Porções"
              onClick={() => setCategory("porcoes")}
            />
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            {filteredItems.length} item(ns) encontrado(s)
          </p>
        </div>
      </section>

      <section id="bebidas" className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Bebidas"
          title="Para acompanhar"
          subtitle="Todas as bebidas do cardápio, em cards para ficar fácil de ler."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBebidas.map((item) => (
            <ProductCard key={item.name} item={item} icon={<IconDrink />} />
          ))}
        </div>
      </section>

      <section id="porcoes" className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Porções"
          title="Para compartilhar"
          subtitle="Todas as porções do cardápio, com o preço sempre visível."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPorcoes.map((item) => (
            <ProductCard key={item.name} item={item} icon={<IconSnack />} />
          ))}
        </div>
      </section>

      <footer className="pb-10 text-center text-sm text-muted-foreground">
        Cantina Bougainville 1 • Cardápio da Praia • Desenvolvido por Otavio Emanoel
      </footer>
    </div>
  );
}
