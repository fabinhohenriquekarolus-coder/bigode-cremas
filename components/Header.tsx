import { isAuthenticated } from "@/lib/auth";
import { CATEGORIES } from "@/lib/categories";
import { CartButton } from "./CartDrawer";
import { Sidebar } from "./Sidebar";

export async function Header() {
  const isAdmin = await isAuthenticated();

  return (
    <header className="sticky top-0 z-40 border-b border-panel-line bg-cloud/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <Sidebar categories={[...CATEGORIES]} isAdmin={isAdmin} />
        <CartButton />
      </div>
    </header>
  );
}
