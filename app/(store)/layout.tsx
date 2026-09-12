import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <main className="flex-1">{children}</main>
    </CartProvider>
  );
}
