import Link from "next/link";
import Image from "next/image";
import { CartButton } from "./CartDrawer";
import { getLogoUrl } from "@/app/actions/settings";

export async function Header() {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || "Loja";
  const logoUrl = (await getLogoUrl()) ?? "/brand/logo.png";

  return (
    <header className="sticky top-0 z-40 border-b border-panel-line bg-cloud/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center">
          <span className="relative h-14 w-14">
            <Image src={logoUrl} alt={storeName} fill sizes="56px" className="object-contain" priority />
          </span>
        </Link>
        <CartButton />
      </div>
    </header>
  );
}
