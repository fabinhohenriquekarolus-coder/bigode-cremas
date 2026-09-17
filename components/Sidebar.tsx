"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { logout } from "@/app/actions/auth";
import { MenuIcon } from "./MenuIcon";

export function Sidebar(props: { categories: string[]; isAdmin: boolean }) {
  return (
    <Suspense
      fallback={
        <span className="flex h-9 w-9 items-center justify-center rounded-full text-ink">
          <MenuIcon />
        </span>
      }
    >
      <SidebarInner {...props} />
    </Suspense>
  );
}

function SidebarInner({
  categories,
  isAdmin,
}: {
  categories: string[];
  isAdmin: boolean;
}) {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const active = searchParams.get("categoria");

  const close = () => setOpen(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Abrir menu de categorias"
        className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition hover:bg-ink/10"
      >
        <MenuIcon />
      </button>

      {open && (
        <div className="fixed inset-0 z-[150] h-screen w-screen">
          <div className="sidebar-backdrop absolute inset-0 bg-ink/45" onClick={close} />

          <nav className="sidebar-panel absolute left-0 top-0 flex h-screen w-72 max-w-[85vw] flex-col bg-ink p-5 text-on-blue shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display text-lg font-bold text-cloud">Categorias</span>
              <button
                onClick={close}
                aria-label="Fechar menu"
                className="text-xl leading-none text-on-blue-dim hover:text-cloud"
              >
                ×
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-1 overflow-y-auto">
              <Link
                href="/"
                onClick={close}
                className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  !active ? "bg-cloud text-ink" : "text-on-blue-dim hover:bg-cloud/10 hover:text-cloud"
                }`}
              >
                Todos
              </Link>
              {categories.map((c) => (
                <Link
                  key={c}
                  href={`/?categoria=${encodeURIComponent(c)}`}
                  onClick={close}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    active === c
                      ? "bg-cloud text-ink"
                      : "text-on-blue-dim hover:bg-cloud/10 hover:text-cloud"
                  }`}
                >
                  {c}
                </Link>
              ))}
            </div>

            <div className="mt-4 border-t border-cloud/15 pt-4">
              {isAdmin ? (
                <form action={logout}>
                  <button className="w-full rounded-lg bg-cloud/10 px-3 py-2.5 text-left text-sm font-medium text-cloud hover:bg-cloud/20">
                    Sair da conta
                  </button>
                </form>
              ) : (
                <Link
                  href="/admin/login"
                  onClick={close}
                  className="block rounded-lg bg-cloud/10 px-3 py-2.5 text-sm font-medium text-cloud hover:bg-cloud/20"
                >
                  Entrar como lojista
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
