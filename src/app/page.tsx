import Image from "next/image";

type MenuItem = {
  name: string;
  price: string;
};

const bebidas: MenuItem[] = [
  { name: "Água sem / com gás", price: "R$ 6,00" },
  { name: "Balde de gelo", price: "R$ 6,00" },
  { name: "Cerveja lata", price: "R$ 9,00" },
  { name: "Cerveja long neck", price: "R$ 13,00" },
  { name: "Caipirinha de pinga", price: "R$ 25,00" },
  { name: "Caipirinha de vodka", price: "R$ 30,00" },
  { name: "Gatorade / H2O", price: "R$ 9,00" },
  { name: "Refrigerante", price: "R$ 8,00" },
];

const porcoes: MenuItem[] = [
  { name: "Almôndega", price: "R$ 46,00" },
  { name: "Bolinho de queijo", price: "R$ 36,00" },
  { name: "Bolinho bacalhau", price: "R$ 61,00" },
  { name: "Calabresa", price: "R$ 46,00" },
  { name: "Camarão", price: "R$ 61,00" },
  { name: "Coxinha", price: "R$ 36,00" },
  { name: "Fritas", price: "R$ 36,00" },
  { name: "Mandioca", price: "R$ 36,00" },
  { name: "Nuggets / Smiles", price: "R$ 36,00" },
  { name: "Pastelzinho", price: "R$ 36,00" },
  { name: "Polenta", price: "R$ 36,00" },
  { name: "Kibe", price: "R$ 46,00" },
  { name: "Isca de peixe", price: "R$ 61,00" },
];

function WavesTop() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 240"
      className="absolute inset-x-0 -top-1 h-28 w-full"
      preserveAspectRatio="none"
    >
      <path
        d="M0,96 C120,128 240,160 360,160 C480,160 600,128 720,112 C840,96 960,96 1080,112 C1200,128 1320,160 1440,160 L1440,0 L0,0 Z"
        fill="var(--muted)"
        opacity="0.9"
      />
      <path
        d="M0,160 C140,200 280,224 420,214 C560,204 700,160 840,150 C980,140 1120,164 1260,190 C1340,204 1390,212 1440,208 L1440,0 L0,0 Z"
        fill="var(--primary)"
        opacity="0.18"
      />
    </svg>
  );
}

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

function ItemRow({ item }: { item: MenuItem }) {
  return (
    <li className="group flex items-baseline justify-between gap-4 rounded-2xl border border-border/70 bg-background/40 px-4 py-3">
      <span className="flex min-w-0 items-center gap-3">
        <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
        <span className="truncate text-base font-medium text-foreground">
          {item.name}
        </span>
      </span>
      <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-sm font-semibold text-foreground">
        {item.price}
      </span>
    </li>
  );
}

function MenuCard({
  title,
  subtitle,
  icon,
  items,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  items: MenuItem[];
}) {
  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <header className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-muted">
            {icon}
          </div>
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              {title}
            </h2>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
      </header>

      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <ItemRow key={item.name} item={item} />
        ))}
      </ul>
    </section>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <WavesTop />

      <div className="mx-auto w-full max-w-6xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-full border border-border bg-card">
              <Image
                src="/icon.png"
                alt="Logo da Cantina Bouga 1"
                fill
                sizes="56px"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">
                Cardápio da praia
              </p>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Cantina Bouga 1
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Bebidas e porções com clima de praia.
              </p>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-muted">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                >
                  <path
                    d="M3 16c2.5 1.4 5 1.4 7.5 0s5-1.4 7.5 0 5 1.4 7.5 0"
                    stroke="var(--primary)"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                  <path
                    d="M3 12c2.5 1.4 5 1.4 7.5 0s5-1.4 7.5 0 5 1.4 7.5 0"
                    stroke="var(--primary)"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                  <path
                    d="M3 8c2.5 1.4 5 1.4 7.5 0s5-1.4 7.5 0 5 1.4 7.5 0"
                    stroke="var(--accent)"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    opacity="0.7"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold">Valores</p>
                <p className="text-sm text-muted-foreground">Todos em reais (R$).</p>
              </div>
            </div>
          </div>
        </header>

        <main className="mt-10 grid gap-6 lg:grid-cols-2">
          <MenuCard
            title="Bebidas"
            subtitle="Para refrescar na areia"
            icon={<IconDrink />}
            items={bebidas}
          />

          <MenuCard
            title="Porções"
            subtitle="Pra compartilhar"
            icon={<IconSnack />}
            items={porcoes}
          />
        </main>

        <section className="mt-6 rounded-3xl border border-border bg-card p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                Referência do cardápio (foto)
              </h2>
              <p className="text-sm text-muted-foreground">
                Conferência rápida do cardápio usado na praia.
              </p>
            </div>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-background">
            <div className="relative aspect-[3/4] w-full">
              <Image
                src="/cardapio.jpeg"
                alt="Foto do cardápio da praia da Cantina Bouga 1"
                fill
                sizes="(max-width: 640px) 100vw, 720px"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <footer className="mt-10 text-center text-sm text-muted-foreground">
          Cantina Bouga 1 • Cardápio Praia
        </footer>
      </div>
    </div>
  );
}
