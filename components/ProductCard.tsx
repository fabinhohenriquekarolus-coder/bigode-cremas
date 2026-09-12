"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "./CartProvider";
import { formatBRL, whatsappLinkForProduct } from "@/lib/whatsapp";
import { toggleStatus, deleteProduct } from "@/app/actions/products";
import { ProductCarousel } from "./ProductCarousel";

type Variant = { id: string; name: string; status: string };
type ProductImage = { id: string; url: string };

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: ProductImage[];
  status: string;
  variants: Variant[];
};

export function ProductCard({
  product,
  isAdmin = false,
}: {
  product: Product;
  isAdmin?: boolean;
}) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [variantId, setVariantId] = useState(
    () =>
      product.variants.find((v) => v.status === "AVAILABLE")?.id ??
      product.variants[0]?.id ??
      ""
  );

  const selectedVariant = useMemo(
    () => product.variants.find((v) => v.id === variantId) ?? null,
    [product.variants, variantId]
  );

  const outOfStock =
    product.status === "OUT_OF_STOCK" ||
    (product.variants.length > 0 && selectedVariant?.status === "OUT_OF_STOCK");

  const displayName = selectedVariant ? `${product.name} - ${selectedVariant.name}` : product.name;
  const cartId = selectedVariant ? `${product.id}:${selectedVariant.id}` : product.id;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-panel-line bg-cloud shadow-[0_12px_30px_-18px_rgba(23,50,74,0.35)]">
      <div className="relative">
        <ProductCarousel
          images={product.images.map((img) => img.url)}
          alt={product.name}
          outOfStock={outOfStock}
        />
        {outOfStock && (
          <span className="absolute bottom-3 left-3 rounded-full bg-ink/85 px-3 py-1 text-xs font-medium text-cloud">
            Esgotado — consulte encomenda
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-base font-bold text-ink">{product.name}</h3>
        {product.description && (
          <p className="text-sm leading-relaxed text-ink-dim line-clamp-2">
            {product.description}
          </p>
        )}
        <p className="mt-1 font-display text-xl font-extrabold text-leaf">
          {formatBRL(product.price)}
        </p>

        {product.variants.length > 0 && (
          <select
            value={variantId}
            onChange={(e) => setVariantId(e.target.value)}
            className="rounded-lg border border-panel-line bg-white px-2 py-1.5 text-sm text-ink outline-none focus:border-accent"
          >
            {product.variants.map((v) => (
              <option key={v.id} value={v.id} disabled={v.status === "OUT_OF_STOCK"}>
                {v.name} {v.status === "OUT_OF_STOCK" ? "(esgotado)" : ""}
              </option>
            ))}
          </select>
        )}

        <div className="mt-2 flex gap-2">
          <button
            disabled={outOfStock}
            onClick={() => {
              addItem({ id: cartId, name: displayName, price: product.price });
              setAdded(true);
              setTimeout(() => setAdded(false), 1500);
            }}
            className="flex-1 rounded-full border border-panel-line py-2 text-sm font-medium text-ink transition hover:border-ink-dim disabled:cursor-not-allowed disabled:opacity-30"
          >
            {added ? "Adicionado" : "Adicionar"}
          </button>
          <a
            href={outOfStock ? undefined : whatsappLinkForProduct(displayName, product.price)}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={outOfStock}
            className={`flex-1 rounded-full py-2 text-center text-sm font-semibold transition ${
              outOfStock
                ? "pointer-events-none bg-panel-line text-ink-dim/50"
                : "bg-accent text-cloud hover:bg-accent-bright"
            }`}
          >
            Comprar
          </a>
        </div>

        {isAdmin && (
          <div className="mt-2 flex gap-2 border-t border-panel-line pt-3">
            <Link
              href={`/admin/${product.id}/editar`}
              className="flex-1 rounded-full border border-panel-line py-1.5 text-center text-xs font-medium text-ink hover:bg-panel-line/40"
            >
              Editar
            </Link>
            <form action={toggleStatus.bind(null, product.id)} className="flex-1">
              <button className="w-full rounded-full border border-panel-line py-1.5 text-xs font-medium text-ink hover:bg-panel-line/40">
                {product.status === "AVAILABLE" ? "Marcar esgotado" : "Marcar disponível"}
              </button>
            </form>
            <form action={deleteProduct.bind(null, product.id)}>
              <button className="rounded-full border border-coral/30 px-3 py-1.5 text-xs font-medium text-coral hover:bg-coral/10">
                Excluir
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
