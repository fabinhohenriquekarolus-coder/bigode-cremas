"use client";

import { ProductCarousel } from "./ProductCarousel";
import { CartIcon } from "./CartIcon";
import { formatBRL } from "@/lib/whatsapp";

type Variant = { id: string; name: string; status: string };

export function ProductLightbox({
  name,
  images,
  price,
  outOfStock,
  variants,
  variantId,
  onVariantChange,
  onAdd,
  added,
  buyHref,
  onClose,
}: {
  name: string;
  images: string[];
  price: number;
  outOfStock: boolean;
  variants: Variant[];
  variantId: string;
  onVariantChange: (id: string) => void;
  onAdd: () => void;
  added: boolean;
  buyHref?: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink/60 p-4 sm:items-center"
      onClick={onClose}
    >
      <div
        className="comic-cloud comic-cloud-a my-6 flex w-full max-w-3xl flex-col overflow-hidden sm:my-0 sm:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative sm:w-3/5">
          <ProductCarousel images={images} alt={name} outOfStock={outOfStock} />
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-ink/70 text-lg text-cloud hover:bg-ink/90"
          >
            ×
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5 sm:justify-center">
          <h3 className="font-display text-lg font-bold text-ink">{name}</h3>
          <p className="font-display text-2xl font-extrabold text-leaf">{formatBRL(price)}</p>

          {variants.length > 0 && (
            <select
              value={variantId}
              onChange={(e) => onVariantChange(e.target.value)}
              className="rounded-lg border border-panel-line bg-white px-2 py-1.5 text-sm text-ink outline-none focus:border-accent"
            >
              {variants.map((v) => (
                <option key={v.id} value={v.id} disabled={v.status === "OUT_OF_STOCK"}>
                  {v.name} {v.status === "OUT_OF_STOCK" ? "(esgotado)" : ""}
                </option>
              ))}
            </select>
          )}

          <div className="mt-2 flex flex-col gap-2">
            <button
              disabled={outOfStock}
              onClick={onAdd}
              className="flex items-center justify-center gap-2 rounded-full border border-panel-line py-2.5 text-sm font-medium text-ink transition hover:border-ink-dim disabled:cursor-not-allowed disabled:opacity-30"
            >
              <CartIcon className="h-4 w-4" />
              {added ? "Adicionado" : "Adicionar ao carrinho"}
            </button>
            <a
              href={outOfStock ? undefined : buyHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={outOfStock}
              className={`rounded-full py-2.5 text-center text-sm font-semibold transition ${
                outOfStock
                  ? "pointer-events-none bg-panel-line text-ink-dim/50"
                  : "bg-accent text-cloud hover:bg-accent-bright"
              }`}
            >
              Comprar pelo WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
