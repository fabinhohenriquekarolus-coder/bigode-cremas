"use client";

import { useState } from "react";
import Image from "next/image";
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

const PUFFS = [
  { top: "-8%", left: "8%", size: 46, delay: 0 },
  { top: "-4%", left: "60%", size: 36, delay: 60 },
  { top: "20%", left: "-6%", size: 40, delay: 30 },
  { top: "70%", left: "-8%", size: 34, delay: 90 },
  { top: "85%", left: "70%", size: 44, delay: 45 },
  { top: "-6%", left: "35%", size: 28, delay: 120 },
];

function CartDrawer({ onClose }: { onClose: () => void }) {
  const { items, removeItem, updateQuantity, total, clear } = useCart();

  return (
    <div className="fixed inset-0 z-[100] isolate flex items-start justify-center px-4 pt-16 sm:justify-end sm:pr-8">
      <div
        className="cart-backdrop absolute inset-0 bg-ink/35 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div className="relative">
        {PUFFS.map((p, i) => (
          <span
            key={i}
            className="cart-puff"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}ms`,
            }}
          />
        ))}

        <div className="cart-cloud-card relative flex max-h-[80vh] w-[min(92vw,26rem)] flex-col rounded-[2rem] bg-cloud p-6 shadow-[0_30px_70px_-20px_rgba(23,50,74,0.45)]">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-ink">Seu carrinho</h2>
            <button onClick={onClose} className="text-ink-dim hover:text-ink text-xl leading-none">
              ×
            </button>
          </div>

          {items.length === 0 ? (
            <p className="text-sm text-ink-dim">Seu carrinho está vazio.</p>
          ) : (
            <div className="flex-1 space-y-3 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 border-b border-panel-line pb-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-panel-line">
                    {item.imageUrl && (
                      <Image src={item.imageUrl} alt="" fill sizes="56px" className="object-cover" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{item.name}</p>
                    <p className="text-xs text-ink-dim">{formatBRL(item.price)}</p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-6 w-6 rounded-full border border-panel-line text-xs text-ink/80 hover:border-ink-dim"
                    >
                      −
                    </button>
                    <span className="w-4 text-center text-sm text-ink">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-6 w-6 rounded-full border border-panel-line text-xs text-ink/80 hover:border-ink-dim"
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
    </div>
  );
}
