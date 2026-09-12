"use client";

import { useState } from "react";
import { CATEGORIES } from "@/lib/categories";
import { VariantManager } from "./VariantManager";
import { ProductImageManager } from "./ProductImageManager";

type Props = {
  action: (formData: FormData) => void;
  initial?: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    images: { id: string; url: string }[];
    variants: { id: string; name: string; status: string }[];
  };
  submitLabel: string;
};

export function ProductForm({ action, initial, submitLabel }: Props) {
  const [previews, setPreviews] = useState<string[]>([]);

  return (
    <div className="space-y-6">
      <form action={action} className="space-y-5 rounded-xl border border-panel-line bg-cloud p-6">
        <div className="space-y-1">
          <label className="text-sm text-ink-dim">Nome do produto</label>
          <input
            name="name"
            required
            defaultValue={initial?.name}
            className="w-full rounded-lg border border-panel-line bg-white px-3 py-2 text-ink outline-none focus:border-accent"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-ink-dim">Categoria</label>
          <select
            name="category"
            defaultValue={initial?.category ?? CATEGORIES[0]}
            className="w-full rounded-lg border border-panel-line bg-white px-3 py-2 text-ink outline-none focus:border-accent"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm text-ink-dim">Descrição</label>
          <textarea
            name="description"
            rows={3}
            defaultValue={initial?.description}
            className="w-full rounded-lg border border-panel-line bg-white px-3 py-2 text-ink outline-none focus:border-accent"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm text-ink-dim">Preço (R$)</label>
          <input
            name="price"
            type="text"
            inputMode="decimal"
            required
            defaultValue={initial?.price}
            placeholder="Ex: 49,90"
            className="w-full rounded-lg border border-panel-line bg-white px-3 py-2 text-ink outline-none focus:border-accent"
          />
        </div>

        {!initial && (
          <div className="space-y-2">
            <label className="text-sm text-ink-dim">Fotos do produto (pode escolher várias)</label>
            <input
              name="images"
              type="file"
              accept="image/*"
              multiple
              required
              onChange={(e) => {
                const files = Array.from(e.target.files ?? []);
                setPreviews(files.map((f) => URL.createObjectURL(f)));
              }}
              className="w-full rounded-lg border border-panel-line bg-white px-3 py-2 text-ink file:mr-3 file:rounded-md file:border-0 file:bg-accent file:px-3 file:py-1.5 file:text-cloud file:font-medium"
            />
            {previews.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {previews.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={src} alt="Pré-visualização" className="h-24 w-24 rounded-lg object-cover" />
                ))}
              </div>
            )}
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-accent py-2.5 font-semibold text-cloud hover:bg-accent-bright transition"
        >
          {submitLabel}
        </button>
      </form>

      {initial && (
        <>
          <ProductImageManager productId={initial.id} images={initial.images} />
          <VariantManager productId={initial.id} variants={initial.variants} />
        </>
      )}
    </div>
  );
}
