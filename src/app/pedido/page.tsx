"use client";

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

type OrderLine = {
  item: MenuItem;
  option?: string;
  qty: number;
  unit: number;
  subtotal: number;
};

function parseBRL(input: string): number {
  // "R$ 13,00" -> 13
  const normalized = input
    .replace(/\s/g, "")
    .replace(/^R\$/i, "")
    .replace(/\./g, "")
    .replace(",", ".")
    .replace(/[^0-9.]/g, "");

  const value = Number(normalized);
  return Number.isFinite(value) ? value : 0;
}

function formatBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
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

function QtyControl({
  value,
  onChange,
}: {
  value: number;
  onChange: (next: number) => void;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-2 py-1">
      <button
        type="button"
        onClick={() => onChange(Math.max(0, value - 1))}
        className="grid h-8 w-8 place-items-center rounded-xl bg-card text-sm font-semibold text-foreground shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 active:translate-y-0"
        aria-label="Diminuir quantidade"
      >
        -
      </button>
      <span className="min-w-[2ch] text-center text-sm font-semibold text-foreground">
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        className="grid h-8 w-8 place-items-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 active:translate-y-0"
        aria-label="Aumentar quantidade"
      >
        +
      </button>
    </div>
  );
}

function buildWhatsAppText(
  location: OrderLocation,
  name: string,
  extra:
    | {
        praiaReference?: string;
        cantinaFulfillment?: "retirar" | "entregar";
        deliveryStreet?: string;
        deliveryNumber?: string;
      }
    | undefined,
  lines: OrderLine[],
  total: number,
): string {
  const safeName = name.trim();

  const where = location === "praia" ? "na praia" : "na cantina/casa";
  const header = `Olá, estou fazendo um pedido ${where}, sou ${safeName} e vou querer:`;

  const details: string[] = [];
  if (location === "praia") {
    const reference = extra?.praiaReference?.trim();
    if (reference) details.push(`Ponto de referência (praia): ${reference}`);
  }

  if (location === "cantina") {
    const fulfillment = extra?.cantinaFulfillment ?? "retirar";
    if (fulfillment === "retirar") {
      details.push("Retirada: vou retirar na cantina.");
    } else {
      const street = extra?.deliveryStreet?.trim();
      const number = extra?.deliveryNumber?.trim();
      details.push("Entrega: somente dentro do condomínio.");
      if (street || number) {
        const address = [street ? `Rua ${street}` : "", number ? `Nº ${number}` : ""]
          .filter(Boolean)
          .join(", ");
        if (address) details.push(`Endereço: ${address}`);
      }
    }
  }

  const body = lines
    .map((line) => {
      const unitText = formatBRL(line.unit);
      const subtotalText = formatBRL(line.subtotal);

      const itemLabel = line.option
        ? `${line.item.name} (${line.option})`
        : line.item.name;

      return `- ${line.qty}x ${itemLabel} — ${unitText} (subtotal: ${subtotalText})`;
    })
    .join("\n");

  const footer = `Total: ${formatBRL(total)}`;

  return [header, ...details, body, footer].filter(Boolean).join("\n");
}

function buildWhatsAppUrl(phoneRaw: string, text: string): string {
  const phone = phoneRaw.replace(/\D/g, "");
  const encoded = encodeURIComponent(text);
  if (phone) return `https://wa.me/${phone}?text=${encoded}`;
  return `https://wa.me/?text=${encoded}`;
}

export default function PedidoPage() {
  const router = useRouter();
  const cantinaPhone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE ?? "";

  const [location, setLocation] = useState<OrderLocation | null>(null);

  const [praiaReference, setPraiaReference] = useState("");
  const [cantinaFulfillment, setCantinaFulfillment] = useState<
    "retirar" | "entregar"
  >("retirar");
  const [deliveryStreet, setDeliveryStreet] = useState("");
  const [deliveryNumber, setDeliveryNumber] = useState("");

  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [qtyByKey, setQtyByKey] = useState<Record<string, number>>({});

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

  useEffect(() => {
    const selected = getOrderLocationFromBrowser();
    if (!selected) {
      router.replace("/");
      return;
    }
    setLocation(selected);

    if (selected === "cantina") {
      setCantinaFulfillment("retirar");
    }
  }, [router]);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredItems = useMemo(() => {
    if (!menu) return [];

    return menu.allItems.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (!normalizedQuery) return true;
      return item.name.toLowerCase().includes(normalizedQuery);
    });
  }, [category, menu, normalizedQuery]);

  const lines = useMemo<OrderLine[]>(() => {
    const result: OrderLine[] = [];

    if (!menu) return result;

    for (const item of menu.allItems) {
      const slug = slugify(item.name);
      const unit = parseBRL(item.price);

      if (item.options?.length) {
        for (const option of item.options) {
          const key = `${slug}::${option}`;
          const qty = qtyByKey[key] ?? 0;
          if (qty <= 0) continue;
          result.push({ item, option, qty, unit, subtotal: qty * unit });
        }
      } else {
        const qty = qtyByKey[slug] ?? 0;
        if (qty <= 0) continue;
        result.push({ item, qty, unit, subtotal: qty * unit });
      }
    }

    result.sort((a, b) => {
      const byName = a.item.name.localeCompare(b.item.name);
      if (byName !== 0) return byName;
      return (a.option ?? "").localeCompare(b.option ?? "");
    });

    return result;
  }, [menu, qtyByKey]);

  const totalQty = useMemo(() => {
    return lines.reduce((acc, line) => acc + line.qty, 0);
  }, [lines]);

  const total = useMemo(() => {
    return lines.reduce((acc, line) => acc + line.subtotal, 0);
  }, [lines]);

  const whatsText = useMemo(() => {
    if (!location) return "";
    return buildWhatsAppText(
      location,
      name,
      {
        praiaReference,
        cantinaFulfillment,
        deliveryStreet,
        deliveryNumber,
      },
      lines,
      total,
    );
  }, [
    location,
    name,
    lines,
    total,
    praiaReference,
    cantinaFulfillment,
    deliveryStreet,
    deliveryNumber,
  ]);

  const needsAddress = location === "cantina" && cantinaFulfillment === "entregar";
  const hasAddress =
    deliveryStreet.trim().length > 0 && deliveryNumber.trim().length > 0;
  const canSend =
    name.trim().length > 0 && lines.length > 0 && (!needsAddress || hasAddress);

  if (!menu || !location) return null;

  const locationLabel = getOrderLocationLabel(location);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 pb-14 pt-10 sm:px-6 lg:px-8">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold text-primary">
              Cantina Bougainville 1 • {locationLabel}
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
              Fazer pedido
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Monte seu pedido e envie no WhatsApp com nome, itens, quantidades e total.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/precos"
              className="inline-flex items-center justify-center rounded-2xl border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              Ver preços
            </Link>
            <Link
              href="/cardapio"
              className="inline-flex items-center justify-center rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 active:translate-y-0"
            >
              Voltar
            </Link>
          </div>
        </header>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1fr,360px]">
          <div className="rounded-4xl border border-border bg-card p-5 sm:p-6">
            <h2 className="text-sm font-semibold text-foreground">Dados do pedido</h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-foreground">Seu nome</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex.: Otávio"
                  className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-foreground">
                  WhatsApp da cantina
                </span>
                <input
                  value={cantinaPhone || "Não configurado"}
                  readOnly
                  disabled
                  className="w-full cursor-not-allowed rounded-2xl border border-border bg-muted px-4 py-3 text-sm text-muted-foreground outline-none"
                />
                <span className="text-xs text-muted-foreground">
                  Número fixo da cantina.
                </span>
              </label>
            </div>

            {location === "praia" ? (
              <div className="mt-4">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    Pontos de referência (para te encontrarmos na praia)
                  </span>
                  <textarea
                    value={praiaReference}
                    onChange={(e) => setPraiaReference(e.target.value)}
                    placeholder="Ex.: em frente a tenda, perto da rampa, x pessoas no guarda sol..."
                    rows={3}
                    className="w-full resize-y rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
                  />
                  <span className="text-xs text-muted-foreground">
                    Quanto mais detalhes, mais rápido a entrega chega até você.
                  </span>
                </label>
              </div>
            ) : null}

            {location === "cantina" ? (
              <div className="mt-4 rounded-3xl border border-border bg-background/60 p-4">
                <p className="text-sm font-semibold text-foreground">
                  Retirada ou entrega
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Entregamos somente dentro do condomínio.
                </p>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground">
                    <input
                      type="radio"
                      name="fulfillment"
                      value="retirar"
                      checked={cantinaFulfillment === "retirar"}
                      onChange={() => setCantinaFulfillment("retirar")}
                      className="h-4 w-4"
                    />
                    Vou retirar na cantina
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground">
                    <input
                      type="radio"
                      name="fulfillment"
                      value="entregar"
                      checked={cantinaFulfillment === "entregar"}
                      onChange={() => setCantinaFulfillment("entregar")}
                      className="h-4 w-4"
                    />
                    Quero entrega
                  </label>
                </div>

                {cantinaFulfillment === "entregar" ? (
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <label className="grid gap-2 sm:col-span-1">
                      <span className="text-sm font-semibold text-foreground">Rua</span>
                      <input
                        value={deliveryStreet}
                        onChange={(e) => setDeliveryStreet(e.target.value)}
                        placeholder="Ex.: Rua das Palmeiras"
                        className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
                      />
                    </label>

                    <label className="grid gap-2 sm:col-span-1">
                      <span className="text-sm font-semibold text-foreground">Número</span>
                      <input
                        value={deliveryNumber}
                        onChange={(e) => setDeliveryNumber(e.target.value)}
                        placeholder="Ex.: 123"
                        className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
                      />
                      <span className="text-xs text-muted-foreground">
                        Obrigatório para pedidos com entrega.
                      </span>
                    </label>
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="mt-6 rounded-3xl border border-border bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground">
                Cardápio selecionado: <span className="font-semibold">{locationLabel}</span>. Imagens
                <span className="font-semibold"> ilustrativas</span>. Preços e disponibilidade podem
                mudar sem aviso.
              </p>
            </div>

            <div className="mt-6">
              <h2 className="text-sm font-semibold text-foreground">Adicionar itens</h2>

              <div className="mt-4 grid gap-3 sm:grid-cols-[1fr,auto] sm:items-end">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-foreground">Pesquisar</span>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ex.: cerveja, fritas..."
                    className="w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary/40"
                  />
                </label>

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
              </div>

              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((item) => {
                  const slug = slugify(item.name);
                  const badgeLabel = getCategoryLabel(item.category);
                  const badgeClass =
                    item.category === "bebidas"
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-accent-foreground";

                  return (
                    <li
                      key={item.name}
                      className="rounded-3xl border border-border bg-background/60 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-foreground">{item.name}</p>
                          <p className="mt-1 text-sm font-semibold text-foreground">{item.price}</p>
                          {item.description ? (
                            <p className="mt-1 text-xs text-muted-foreground">
                              {item.description}
                            </p>
                          ) : null}
                        </div>
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}
                        >
                          {badgeLabel}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        {item.options?.length ? (
                          <div className="grid w-full gap-2">
                            <p className="text-xs font-semibold text-muted-foreground">
                              Escolha o tipo
                            </p>
                            <ul className="grid gap-2">
                              {item.options.map((option) => {
                                const key = `${slug}::${option}`;
                                const qty = qtyByKey[key] ?? 0;

                                return (
                                  <li
                                    key={option}
                                    className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-card px-3 py-2"
                                  >
                                    <span className="text-xs font-semibold text-foreground">
                                      {option}
                                    </span>
                                    <QtyControl
                                      value={qty}
                                      onChange={(next) =>
                                        setQtyByKey((prev) => ({
                                          ...prev,
                                          [key]: next,
                                        }))
                                      }
                                    />
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        ) : (
                          <QtyControl
                            value={qtyByKey[slug] ?? 0}
                            onChange={(next) =>
                              setQtyByKey((prev) => ({ ...prev, [slug]: next }))
                            }
                          />
                        )}
                        <Link
                          href={`/produto/${slug}`}
                          className="text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                        >
                          Detalhes
                        </Link>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <aside className="h-fit rounded-4xl border border-border bg-card p-5 sm:p-6">
            <h2 className="text-sm font-semibold text-foreground">Resumo</h2>

            <div className="mt-4 flex items-baseline justify-between gap-4">
              <span className="text-sm font-semibold text-muted-foreground">Itens</span>
              <span className="text-sm font-semibold text-foreground">{totalQty}</span>
            </div>

            <div className="mt-2 flex items-baseline justify-between gap-4">
              <span className="text-sm font-semibold text-muted-foreground">Tipos</span>
              <span className="text-sm font-semibold text-foreground">{lines.length}</span>
            </div>

            <div className="mt-2 flex items-baseline justify-between gap-4">
              <span className="text-sm font-semibold text-muted-foreground">Total</span>
              <span className="text-lg font-semibold text-foreground">
                {formatBRL(total)}
              </span>
            </div>

            <div className="mt-5 rounded-3xl border border-border bg-background/60 p-4">
              <p className="text-xs font-semibold text-muted-foreground">Mensagem</p>
              <pre className="mt-2 max-h-56 overflow-auto whitespace-pre-wrap wrap-break-word text-sm text-foreground">
                {canSend
                  ? whatsText
                  : needsAddress
                    ? "Para entrega, informe Rua e Número (e selecione ao menos 1 item)."
                    : "Preencha seu nome e selecione ao menos 1 item."}
              </pre>
            </div>

            <a
              href={canSend ? buildWhatsAppUrl(cantinaPhone, whatsText) : "#"}
              target={canSend ? "_blank" : undefined}
              rel={canSend ? "noreferrer" : undefined}
              className={
                "mt-5 inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-card " +
                (canSend
                  ? "bg-primary text-primary-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0"
                  : "cursor-not-allowed bg-muted text-muted-foreground")
              }
              aria-disabled={!canSend}
            >
              Enviar no WhatsApp
            </a>

            {!cantinaPhone ? (
              <p className="mt-3 text-xs text-muted-foreground">
                Você pode configurar o número fixo via `NEXT_PUBLIC_WHATSAPP_PHONE`.
              </p>
            ) : null}
          </aside>
        </section>
      </div>
    </div>
  );
}
