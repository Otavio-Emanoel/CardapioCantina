import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getItemBySlug } from "@/lib/menu";

export default async function ProdutoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getItemBySlug(slug);

  if (!item) notFound();

  const badgeLabel = item.category === "bebidas" ? "Bebida" : "Porção";
  const badgeDotClass = item.category === "bebidas" ? "bg-primary" : "bg-accent";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-3xl px-4 pb-12 pt-10 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Voltar
          </Link>

          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-muted-foreground">
            <span className={`h-2 w-2 rounded-full ${badgeDotClass}`} />
            {badgeLabel}
          </span>
        </header>

        <main className="mt-6 overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm">
          <div className="p-5 sm:p-6">
            <div className="grid gap-6 sm:grid-cols-[220px,1fr] sm:items-start">
              <div className="overflow-hidden rounded-3xl border border-border bg-muted">
                <div className="relative aspect-square w-full">
                  <Image
                    src={item.imageSrc}
                    alt={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 220px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>

              <div>
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  {item.name}
                </h1>

                <p className="mt-2 text-sm text-muted-foreground">
                  Informações do produto no cardápio da Cantina Bougainville 1.
                </p>

                <div className="mt-4 rounded-3xl border border-border bg-muted/30 p-4">
                  <p className="text-sm text-muted-foreground">
                    Cardápio válido <span className="font-semibold">apenas na praia</span>. Imagens
                    <span className="font-semibold"> ilustrativas</span>. Preços e disponibilidade
                    podem mudar sem aviso.
                  </p>
                </div>

                <div className="mt-5 grid gap-3 rounded-3xl border border-border bg-background/60 p-4">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm font-semibold text-muted-foreground">
                      Preço
                    </span>
                    <span className="text-base font-semibold text-foreground">
                      {item.price}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm font-semibold text-muted-foreground">
                      Categoria
                    </span>
                    <span className="text-base font-semibold text-foreground">
                      {badgeLabel}
                    </span>
                  </div>
                </div>

                <div className="mt-5">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-card active:translate-y-0"
                  >
                    Ver mais itens
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
