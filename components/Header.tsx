import Link from "next/link";
import { CartButton } from "./CartDrawer";

export function Header() {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || "Loja";

  return (
    <header className="sticky top-0 z-40 border-b border-panel-line bg-cloud/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-extrabold text-cloud">
            BC
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-ink">
            {storeName}
          </span>
        </Link>
        <CartButton />
      </div>
    </header>
  );
}
