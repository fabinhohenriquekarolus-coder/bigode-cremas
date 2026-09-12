import Link from "next/link";
import Image from "next/image";
import { CartButton } from "./CartDrawer";
import { getLogoUrl } from "@/app/actions/settings";

export async function Header() {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || "Loja";
  const logoUrl = await getLogoUrl();

  return (
    <header className="sticky top-0 z-40 border-b border-panel-line bg-cloud/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          {logoUrl ? (
            <span className="relative h-9 w-9 overflow-hidden rounded-full border border-panel-line">
              <Image src={logoUrl} alt={storeName} fill className="object-cover" />
            </span>
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-extrabold text-cloud">
              BC
            </span>
          )}
          <span className="font-display text-xl font-bold tracking-tight text-ink">
            {storeName}
          </span>
        </Link>
        <CartButton />
      </div>
    </header>
  );
}
