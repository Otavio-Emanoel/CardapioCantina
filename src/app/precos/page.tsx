import Link from "next/link";

import { bebidas, porcoes } from "@/lib/menu";

function PriceRow({ name, price }: { name: string; price: string }) {
  return (
    <li className="flex items-baseline justify-between gap-4 rounded-2xl border border-border bg-card px-4 py-3">
      <span className="min-w-0 text-sm font-medium text-foreground">
        {name}
      </span>
      <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-sm font-semibold text-foreground">
        {price}
      </span>
    </li>
  );
}

export default function PrecosPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-3xl px-4 pb-14 pt-10 sm:px-6 lg:px-8">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-primary">Cantina Bougainville 1</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">Preços (lista simples)</h1>
          </div>
          <Link
            href="/"
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Voltar
          </Link>
        </header>

        <section className="mt-6 rounded-[2rem] border border-border bg-card p-5 sm:p-6">
          <h2 className="text-sm font-semibold text-foreground">Avisos</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              Este cardápio é válido <span className="font-semibold">apenas na praia</span>.
            </li>
            <li>
              Preços e disponibilidade podem <span className="font-semibold">mudar sem aviso</span>.
            </li>
            <li>Em caso de dúvida, confirme diretamente com a cantina.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold tracking-tight">Bebidas</h2>
          <ul className="mt-4 space-y-3">
            {bebidas.map((item) => (
              <PriceRow key={item.name} name={item.name} price={item.price} />
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-semibold tracking-tight">Porções</h2>
          <ul className="mt-4 space-y-3">
            {porcoes.map((item) => (
              <PriceRow key={item.name} name={item.name} price={item.price} />
            ))}
          </ul>
        </section>

        <footer className="mt-10 text-center text-sm text-muted-foreground">
          Cantina Bougainville 1 • Preços
        </footer>
      </div>
    </div>
  );
}
