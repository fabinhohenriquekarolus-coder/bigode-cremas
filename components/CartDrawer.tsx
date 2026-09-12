"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import { formatBRL, whatsappLinkForCart } from "@/lib/whatsapp";

export function CartButton() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative rounded-full border border-panel-line bg-cloud px-4 py-2 text-sm font-medium text-ink transition hover:border-ink-dim"
      >
        Carrinho
        {count > 0 && (
          <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-leaf text-xs font-bold text-cloud">
            {count}
          </span>
        )}
      </button>
      {open && <CartDrawer onClose={() => setOpen(false)} />}
    </>
  );
}

function CartDrawer({ onClose }: { onClose: () => void }) {
  const { items, removeItem, updateQuantity, total, clear } = useCart();

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-ink/30" onClick={onClose} />
      <div className="relative flex h-full w-full max-w-sm flex-col bg-cloud border-l border-panel-line p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold text-ink">Seu carrinho</h2>
          <button onClick={onClose} className="text-ink-dim hover:text-ink text-xl leading-none">
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <p className="text-sm text-ink-dim">Seu carrinho está vazio.</p>
        ) : (
          <div className="flex-1 overflow-y-auto space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 border-b border-panel-line pb-3">
                <div className="flex-1">
                  <p className="text-sm text-ink">{item.name}</p>
                  <p className="text-xs text-ink-dim">{formatBRL(item.price)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="h-7 w-7 rounded-full border border-panel-line text-ink/80 hover:border-ink-dim"
                  >
                    −
                  </button>
                  <span className="w-5 text-center text-sm text-ink">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="h-7 w-7 rounded-full border border-panel-line text-ink/80 hover:border-ink-dim"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-xs text-ink-dim hover:text-coral"
                  aria-label="Remover"
                >
                  remover
                </button>
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="mt-4 space-y-3 border-t border-panel-line pt-4">
            <div className="flex justify-between font-display text-lg font-bold text-ink">
              <span>Total</span>
              <span className="text-leaf">{formatBRL(total)}</span>
            </div>
            <a
              href={whatsappLinkForCart(items)}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full bg-accent py-3 text-center font-semibold text-cloud transition hover:bg-accent-bright"
            >
              Finalizar pedido pelo WhatsApp
            </a>
            <button
              onClick={clear}
              className="w-full text-center text-xs text-ink-dim hover:text-ink"
            >
              Esvaziar carrinho
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
