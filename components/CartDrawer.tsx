"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "./CartProvider";
import { formatBRL, whatsappLinkForCart } from "@/lib/whatsapp";
import { CartIcon } from "./CartIcon";

export function CartButton() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir carrinho"
        className="relative flex h-9 w-9 items-center justify-center rounded-full text-ink transition hover:bg-ink/10"
      >
        <CartIcon className="h-5 w-5" />
        {count > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-leaf text-[10px] font-bold text-cloud">
            {count}
          </span>
        )}
      </button>
      {open && <CartDrawer onClose={() => setOpen(false)} />}
    </>
  );
}

const PUFFS = [
  { top: "-14%", left: "2%", size: 70, delay: 0 },
  { top: "-18%", left: "30%", size: 56, delay: 40 },
  { top: "-10%", left: "58%", size: 66, delay: 80 },
  { top: "-16%", left: "85%", size: 48, delay: 20 },
  { top: "14%", left: "-14%", size: 60, delay: 60 },
  { top: "45%", left: "-16%", size: 52, delay: 100 },
  { top: "72%", left: "-12%", size: 58, delay: 30 },
  { top: "10%", left: "98%", size: 54, delay: 90 },
  { top: "50%", left: "100%", size: 50, delay: 50 },
  { top: "88%", left: "78%", size: 64, delay: 70 },
  { top: "94%", left: "40%", size: 56, delay: 110 },
  { top: "90%", left: "10%", size: 48, delay: 15 },
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
              animationDuration: `450ms, ${3400 + p.delay * 6}ms`,
              animationDelay: `${p.delay}ms, ${450 + p.delay}ms`,
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
