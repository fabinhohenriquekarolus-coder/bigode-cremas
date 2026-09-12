"use client";

import Image from "next/image";
import { addProductImages, deleteProductImage } from "@/app/actions/products";

type ProductImage = { id: string; url: string };

export function ProductImageManager({
  productId,
  images,
}: {
  productId: string;
  images: ProductImage[];
}) {
  return (
    <div className="space-y-4 rounded-xl border border-panel-line bg-cloud p-6">
      <div>
        <h2 className="font-display font-bold text-ink">Fotos</h2>
        <p className="text-sm text-ink-dim">
          Adicione quantas fotos quiser — elas aparecem em carrossel na loja.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {images.map((img) => (
          <div key={img.id} className="group relative aspect-square overflow-hidden rounded-lg border border-panel-line">
            <Image src={img.url} alt="" fill sizes="150px" className="object-cover" />
            <form action={deleteProductImage.bind(null, img.id, productId)}>
              <button
                type="submit"
                disabled={images.length <= 1}
                className="absolute right-1 top-1 rounded-full bg-ink/80 px-2 py-0.5 text-xs text-cloud disabled:cursor-not-allowed disabled:opacity-40"
              >
                excluir
              </button>
            </form>
          </div>
        ))}
      </div>

      <form action={addProductImages.bind(null, productId)} className="flex gap-2">
        <input
          name="images"
          type="file"
          accept="image/*"
          multiple
          required
          className="flex-1 rounded-lg border border-panel-line bg-white px-3 py-2 text-sm text-ink file:mr-3 file:rounded-md file:border-0 file:bg-accent file:px-3 file:py-1.5 file:text-cloud file:font-medium"
        />
        <button
          type="submit"
          className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-cloud hover:bg-ink-dim"
        >
          Adicionar
        </button>
      </form>
    </div>
  );
}
