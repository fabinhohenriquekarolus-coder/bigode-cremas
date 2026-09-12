"use client";

import { addVariant, toggleVariantStatus, deleteVariant } from "@/app/actions/products";

type Variant = { id: string; name: string; status: string };

export function VariantManager({
  productId,
  variants,
}: {
  productId: string;
  variants: Variant[];
}) {
  return (
    <div className="space-y-4 rounded-xl border border-panel-line bg-cloud p-6">
      <div>
        <h2 className="font-display font-bold text-ink">Variações</h2>
        <p className="text-sm text-ink-dim">
          Cor, tamanho, modelo ou fabricante — cada variação tem seu próprio estoque.
        </p>
      </div>

      {variants.length > 0 && (
        <ul className="space-y-2">
          {variants.map((v) => (
            <li
              key={v.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-panel-line px-3 py-2"
            >
              <span className="text-sm text-ink">{v.name}</span>
              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    v.status === "AVAILABLE"
                      ? "bg-leaf/15 text-leaf"
                      : "bg-coral/15 text-coral"
                  }`}
                >
                  {v.status === "AVAILABLE" ? "Disponível" : "Esgotado"}
                </span>
                <form action={toggleVariantStatus.bind(null, v.id, productId)}>
                  <button className="rounded-lg border border-panel-line px-2 py-1 text-xs text-ink hover:bg-panel-line/40">
                    Alternar
                  </button>
                </form>
                <form action={deleteVariant.bind(null, v.id, productId)}>
                  <button className="rounded-lg border border-coral/30 px-2 py-1 text-xs text-coral hover:bg-coral/10">
                    Excluir
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}

      <form action={addVariant.bind(null, productId)} className="flex gap-2">
        <input
          name="variantName"
          placeholder="Ex: Preto - Grande"
          required
          className="flex-1 rounded-lg border border-panel-line bg-white px-3 py-2 text-sm text-ink outline-none focus:border-accent"
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
