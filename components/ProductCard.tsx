"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "./CartProvider";
import { formatBRL, whatsappLinkForProduct } from "@/lib/whatsapp";
import { toggleStatus, deleteProduct } from "@/app/actions/products";
import { ProductCarousel } from "./ProductCarousel";
import { ProductLightbox } from "./ProductLightbox";
import { CartIcon } from "./CartIcon";

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
  const [lightboxOpen, setLightboxOpen] = useState(false);
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
  const buyHref = outOfStock ? undefined : whatsappLinkForProduct(displayName, product.price);

  const handleAdd = () => {
    addItem({
      id: cartId,
      name: displayName,
      price: product.price,
      imageUrl: product.images[0]?.url,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const variant = ["a", "b", "c"][
    product.id.split("").reduce((sum, c) => sum + c.charCodeAt(0), 0) % 3
  ];

  return (
    <div className={`comic-cloud comic-cloud-${variant} flex flex-col gap-1.5 p-2.5 sm:gap-3 sm:p-4`}>
      <div className="relative overflow-hidden rounded-lg sm:rounded-xl">
        <ProductCarousel
          images={product.images.map((img) => img.url)}
          alt={product.name}
          outOfStock={outOfStock}
          onImageClick={() => setLightboxOpen(true)}
        />
        {outOfStock && (
          <span className="absolute bottom-1.5 left-1.5 rounded-full bg-ink/85 px-2 py-0.5 text-[10px] font-medium text-cloud sm:bottom-3 sm:left-3 sm:px-3 sm:py-1 sm:text-xs">
            Esgotado
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 sm:gap-2">
        <h3 className="font-display text-xs font-bold leading-tight text-ink line-clamp-1 sm:text-base">
          {product.name}
        </h3>
        {product.description && (
          <p className="hidden text-sm leading-relaxed text-ink-dim line-clamp-2 sm:block">
            {product.description}
          </p>
        )}
        <p className="font-display text-sm font-extrabold text-leaf sm:mt-1 sm:text-xl">
          {formatBRL(product.price)}
        </p>

        {product.variants.length > 0 && (
          <select
            value={variantId}
            onChange={(e) => setVariantId(e.target.value)}
            className="rounded-md border border-panel-line bg-white px-1.5 py-1 text-[11px] text-ink outline-none focus:border-accent sm:rounded-lg sm:px-2 sm:py-1.5 sm:text-sm"
          >
            {product.variants.map((v) => (
              <option key={v.id} value={v.id} disabled={v.status === "OUT_OF_STOCK"}>
                {v.name} {v.status === "OUT_OF_STOCK" ? "(esgotado)" : ""}
              </option>
            ))}
          </select>
        )}

        <div className="mt-1 flex gap-1 sm:mt-2 sm:gap-2">
          <button
            disabled={outOfStock}
            onClick={handleAdd}
            className="flex flex-1 items-center justify-center gap-1 rounded-full border border-panel-line py-1 text-[11px] font-medium text-ink transition hover:border-ink-dim disabled:cursor-not-allowed disabled:opacity-30 sm:py-2 sm:text-sm"
          >
            <CartIcon className="h-3 w-3 sm:h-4 sm:w-4" />
            {added ? "OK" : "Adicionar"}
          </button>
          <a
            href={buyHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={outOfStock}
            className={`flex-1 rounded-full py-1 text-center text-[11px] font-semibold transition sm:py-2 sm:text-sm ${
              outOfStock
                ? "pointer-events-none bg-panel-line text-ink-dim/50"
                : "bg-accent text-cloud hover:bg-accent-bright"
            }`}
          >
            Comprar
          </a>
        </div>

        {isAdmin && (
          <div className="mt-1 flex gap-1 border-t border-panel-line pt-1.5 sm:mt-2 sm:gap-2 sm:pt-3">
            <Link
              href={`/admin/${product.id}/editar`}
              className="flex-1 rounded-full border border-panel-line py-1 text-center text-[10px] font-medium text-ink hover:bg-panel-line/40 sm:py-1.5 sm:text-xs"
            >
              Editar
            </Link>
            <form action={toggleStatus.bind(null, product.id)} className="flex-1">
              <button className="w-full rounded-full border border-panel-line py-1 text-[10px] font-medium text-ink hover:bg-panel-line/40 sm:py-1.5 sm:text-xs">
                {product.status === "AVAILABLE" ? "Esgotar" : "Reativar"}
              </button>
            </form>
            <form action={deleteProduct.bind(null, product.id)}>
              <button className="rounded-full border border-coral/30 px-2 py-1 text-[10px] font-medium text-coral hover:bg-coral/10 sm:px-3 sm:py-1.5 sm:text-xs">
                Excluir
              </button>
            </form>
          </div>
        )}
      </div>

      {lightboxOpen && (
        <ProductLightbox
          name={product.name}
          description={product.description}
          images={product.images.map((img) => img.url)}
          price={product.price}
          outOfStock={outOfStock}
          variants={product.variants}
          variantId={variantId}
          onVariantChange={setVariantId}
          onAdd={handleAdd}
          added={added}
          buyHref={buyHref}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
