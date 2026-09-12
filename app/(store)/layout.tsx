import Link from "next/link";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-panel-line py-6 text-center">
        <Link href="/admin/login" className="text-xs text-ink-dim/60 hover:text-ink-dim">
          Área do lojista
        </Link>
      </footer>
    </CartProvider>
  );
}
