"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  setOrderLocationInBrowser,
  type OrderLocation,
} from "@/lib/location";

function LocationButton({
  label,
  description,
  onClick,
  variant,
}: {
  label: string;
  description: string;
  onClick: () => void;
  variant: "primary" | "secondary";
}) {
  const className =
    variant === "primary"
      ? "w-full rounded-[2rem] bg-primary px-6 py-5 text-left text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-0"
      : "w-full rounded-[2rem] border border-border bg-card px-6 py-5 text-left text-foreground shadow-sm transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  return (
    <button type="button" onClick={onClick} className={className}>
      <p className="text-base font-semibold">{label}</p>
      <p
        className={
          "mt-1 text-sm " +
          (variant === "primary"
            ? "text-primary-foreground/85"
            : "text-muted-foreground")
        }
      >
        {description}
      </p>
    </button>
  );
}

export default function Home() {
  const router = useRouter();

  function choose(location: OrderLocation) {
    setOrderLocationInBrowser(location);
    router.push("/cardapio");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-3xl px-4 pb-14 pt-10 sm:px-6 lg:px-8">
        <header className="flex items-center gap-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-border bg-card">
            <Image
              src="/icon.png"
              alt="Logo da Cantina Bougainville 1"
              fill
              sizes="48px"
              className="object-cover"
              priority
            />
          </div>

          <div>
            <p className="text-xs font-semibold text-primary">Cantina Bougainville 1</p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Onde você está fazendo o pedido?
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Selecione para ver o cardápio correto.
            </p>
          </div>
        </header>

        <section className="mt-8 grid gap-3">
          <LocationButton
            variant="primary"
            label="Estou na praia"
            description="Cardápio da praia."
            onClick={() => choose("praia")}
          />
          <LocationButton
            variant="secondary"
            label="Estou na cantina/em casa"
            description="Cardápio da cantina."
            onClick={() => choose("cantina")}
          />
        </section>

        <footer className="mt-10 text-center text-sm text-muted-foreground">
          Cantina Bougainville 1 • Seletor de cardápio
        </footer>
      </div>
    </div>
  );
}
