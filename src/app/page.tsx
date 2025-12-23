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

function ProductCard({
  item,
  badge,
  icon,
}: {
  item: MenuItem;
  badge: string;
  icon: React.ReactNode;
}) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-transform hover:-translate-y-0.5">
      <div className="relative h-36">
        <div className="absolute inset-0 bg-muted" />
        <div className="absolute inset-0 opacity-70 [background:radial-gradient(600px_220px_at_70%_0%,color-mix(in_oklab,var(--primary)_22%,transparent)_0%,transparent_55%),radial-gradient(500px_220px_at_10%_100%,color-mix(in_oklab,var(--accent)_20%,transparent)_0%,transparent_60%)]" />
        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
          <span className="h-2 w-2 rounded-full bg-accent" />
          {badge}
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
          <a
            href="#cardapio"
            className="text-xs font-semibold text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          >
            Ver no cardápio
          </a>
          <span className="inline-flex items-center rounded-xl bg-muted px-3 py-2 text-xs font-semibold text-foreground">
            Disponível
          </span>
        </div>
      </div>
    </article>
  );
}

const destaques: Array<{ item: MenuItem; badge: string; icon: React.ReactNode }> = [
  { item: bebidas[0], badge: "Bebida", icon: <IconDrink /> },
  { item: bebidas[3], badge: "Bebida", icon: <IconDrink /> },
  { item: bebidas[5], badge: "Bebida", icon: <IconDrink /> },
  { item: porcoes[0], badge: "Porção", icon: <IconSnack /> },
  { item: porcoes[3], badge: "Porção", icon: <IconSnack /> },
  { item: porcoes[7], badge: "Porção", icon: <IconSnack /> },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-border bg-card">
              <Image
                src="/icon.png"
                alt="Logo da Cantina Bouga 1"
                fill
                sizes="40px"
                className="object-cover"
                priority
              />
            </div>
            <div className="leading-tight">
              <p className="text-xs font-semibold text-primary">Cardápio</p>
              <p className="text-sm font-semibold tracking-tight">Cantina Bouga 1</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 sm:flex">
            <NavLink href="#destaques" label="Top produtos" />
            <NavLink href="#bebidas" label="Bebidas" />
            <NavLink href="#porcoes" label="Porções" />
            <NavLink href="#cardapio" label="Foto do cardápio" />
          </nav>
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
              Bebidas e porções da Cantina Bouga 1 em um layout mais moderno,
              organizado e fácil de consultar.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <PrimaryButton href="#destaques" label="Ver top produtos" />
              <SecondaryButton href="#cardapio" label="Abrir foto do cardápio" />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2.25rem] border border-border bg-card shadow-sm">
            <div className="absolute inset-0 opacity-60 [background:radial-gradient(900px_420px_at_20%_0%,color-mix(in_oklab,var(--primary)_18%,transparent)_0%,transparent_60%),radial-gradient(700px_360px_at_80%_100%,color-mix(in_oklab,var(--accent)_18%,transparent)_0%,transparent_60%)]" />
            <div className="relative p-4 sm:p-6">
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-border bg-muted">
                <Image
                  src="/cardapio.jpeg"
                  alt="Imagem do cardápio da Cantina Bouga 1"
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold">Cantina Bouga 1</p>
                  <p className="text-xs text-muted-foreground">
                    Consulta rápida do cardápio
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-2xl border border-border bg-background/70 px-4 py-2 text-xs font-semibold text-muted-foreground backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  Atualizado
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="destaques" className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Top produtos"
          title="Alguns destaques do cardápio"
          subtitle="Um recorte rápido para escolher sem ficar rolando demais."
        />

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destaques.map(({ item, badge, icon }) => (
            <ProductCard key={`${badge}-${item.name}`} item={item} badge={badge} icon={icon} />
          ))}
        </div>
      </section>

      <section id="bebidas" className="mx-auto w-full max-w-6xl px-4 pb-14 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Bebidas"
          title="Para acompanhar"
          subtitle="Todas as bebidas do cardápio, em cards para ficar fácil de ler."
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {bebidas.map((item) => (
            <ProductCard key={item.name} item={item} badge="Bebida" icon={<IconDrink />} />
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
          {porcoes.map((item) => (
            <ProductCard key={item.name} item={item} badge="Porção" icon={<IconSnack />} />
          ))}
        </div>
      </section>

      <section id="cardapio" className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">Foto do cardápio</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Referência para conferir nomes e valores rapidamente.
              </p>
            </div>
            <a
              href="#"
              className="text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              Voltar ao topo
            </a>
          </div>

          <div className="mt-5 overflow-hidden rounded-3xl border border-border bg-background">
            <div className="relative aspect-[3/4] w-full">
              <Image
                src="/cardapio.jpeg"
                alt="Foto do cardápio da Cantina Bouga 1"
                fill
                sizes="(max-width: 640px) 100vw, 720px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="pb-10 text-center text-sm text-muted-foreground">
        Cantina Bouga 1 • Cardápio
      </footer>
    </div>
  );
}
