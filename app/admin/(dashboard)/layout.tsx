import Link from "next/link";
import { logout } from "@/app/actions/auth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--sky-top)]">
      <header className="border-b border-panel-line bg-cloud/80 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-5 py-4">
          <Link href="/" className="font-display font-bold text-ink">
            {process.env.NEXT_PUBLIC_STORE_NAME || "Loja"} — modo dono
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-ink-dim hover:text-ink">
              Ver loja
            </Link>
            <form action={logout}>
              <button className="text-sm text-ink-dim hover:text-ink">Sair</button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-5 py-8">{children}</main>
    </div>
  );
}
