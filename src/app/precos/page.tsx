import Link from "next/link";
import { cookies } from "next/headers";

import {
  getOrderLocationLabel,
  isOrderLocation,
  ORDER_LOCATION_COOKIE,
  type OrderLocation,
} from "@/lib/location";
import { getMenu } from "@/lib/menu";

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

export default async function PrecosPage() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(ORDER_LOCATION_COOKIE)?.value;
  const location: OrderLocation = isOrderLocation(cookieValue) ? cookieValue : "praia";
  const menu = getMenu(location);
  const locationLabel = getOrderLocationLabel(location);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-3xl px-4 pb-14 pt-10 sm:px-6 lg:px-8">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-primary">
              Cantina Bougainville 1 • {locationLabel}
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">
              Preços (lista simples)
            </h1>
          </div>
          <Link
            href="/cardapio"
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Voltar
          </Link>
        </header>

        <section className="mt-6 rounded-[2rem] border border-border bg-card p-5 sm:p-6">
          <h2 className="text-sm font-semibold text-foreground">Avisos</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              Cardápio selecionado: <span className="font-semibold">{locationLabel}</span>.
            </li>
            <li>
              Preços e disponibilidade podem <span className="font-semibold">mudar sem aviso</span>.
            </li>
            <li>Em caso de dúvida, confirme diretamente com a cantina.</li>
          </ul>
        </section>

        {menu.almoco.length ? (
          <section className="mt-10">
            <h2 className="text-lg font-semibold tracking-tight">Almoço</h2>
            <ul className="mt-4 space-y-3">
              {menu.almoco.map((item) => (
                <PriceRow key={item.name} name={item.name} price={item.price} />
              ))}
            </ul>
          </section>
        ) : null}

        {menu.lanches.length ? (
          <section className="mt-10">
            <h2 className="text-lg font-semibold tracking-tight">Lanches</h2>
            <ul className="mt-4 space-y-3">
              {menu.lanches.map((item) => (
                <PriceRow key={item.name} name={item.name} price={item.price} />
              ))}
            </ul>
          </section>
        ) : null}

        <section className="mt-10">
          <h2 className="text-lg font-semibold tracking-tight">Bebidas</h2>
          <ul className="mt-4 space-y-3">
            {menu.bebidas.map((item) => (
              <PriceRow key={item.name} name={item.name} price={item.price} />
            ))}
          </ul>
        </section>

        {menu.porcoes.length ? (
          <section className="mt-10">
            <h2 className="text-lg font-semibold tracking-tight">Porções</h2>
            <ul className="mt-4 space-y-3">
              {menu.porcoes.map((item) => (
                <PriceRow key={item.name} name={item.name} price={item.price} />
              ))}
            </ul>
          </section>
        ) : null}

        {menu.porcoes_extras.length ? (
          <section className="mt-10">
            <h2 className="text-lg font-semibold tracking-tight">Extras</h2>
            <ul className="mt-4 space-y-3">
              {menu.porcoes_extras.map((item) => (
                <PriceRow key={item.name} name={item.name} price={item.price} />
              ))}
            </ul>
          </section>
        ) : null}

        {menu.cafe_da_manha.length ? (
          <section className="mt-10">
            <h2 className="text-lg font-semibold tracking-tight">Café da manhã</h2>
            <ul className="mt-4 space-y-3">
              {menu.cafe_da_manha.map((item) => (
                <PriceRow key={item.name} name={item.name} price={item.price} />
              ))}
            </ul>
          </section>
        ) : null}

        {menu.omeletes.length ? (
          <section className="mt-10">
            <h2 className="text-lg font-semibold tracking-tight">Omeletes</h2>
            <ul className="mt-4 space-y-3">
              {menu.omeletes.map((item) => (
                <PriceRow key={item.name} name={item.name} price={item.price} />
              ))}
            </ul>
          </section>
        ) : null}

        {menu.sobremesas.length ? (
          <section className="mt-10">
            <h2 className="text-lg font-semibold tracking-tight">Sobremesas</h2>
            <ul className="mt-4 space-y-3">
              {menu.sobremesas.map((item) => (
                <PriceRow key={item.name} name={item.name} price={item.price} />
              ))}
            </ul>
          </section>
        ) : null}

        <footer className="mt-10 text-center text-sm text-muted-foreground">
          Cantina Bougainville 1 • Preços • {locationLabel}
        </footer>
      </div>
    </div>
  );
}
