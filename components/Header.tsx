import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import { CartButton } from "./CartDrawer";
import { Sidebar } from "./Sidebar";

export async function Header() {
  const [products, isAdmin] = await Promise.all([
    prisma.product.findMany({ select: { category: true } }),
    isAuthenticated(),
  ]);
  const categories = Array.from(new Set(products.map((p) => p.category))).sort();

  return (
    <header className="sticky top-0 z-40 border-b border-panel-line bg-cloud/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <Sidebar categories={categories} isAdmin={isAdmin} />
        <CartButton />
      </div>
    </header>
  );
}
