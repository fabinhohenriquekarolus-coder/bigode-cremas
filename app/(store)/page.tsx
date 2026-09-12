import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import { ProductCard } from "@/components/ProductCard";
import { CategoryTabs } from "@/components/CategoryTabs";
import { logout } from "@/app/actions/auth";

export const revalidate = 0;

export default async function StorePage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const isAdmin = await isAuthenticated();
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || "Loja";

  const allProducts = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { variants: { orderBy: { createdAt: "asc" } } },
  });

  const categories = Array.from(new Set(allProducts.map((p) => p.category))).sort();
  const products = categoria
    ? allProducts.filter((p) => p.category === categoria)
    : allProducts;

  return (
    <div className="mx-auto max-w-5xl px-5 py-14">
      <div className="cloud-panel max-w-lg px-10 py-9">
        <p className="text-sm font-semibold text-leaf">Headshop premium</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight text-ink sm:text-5xl">
          {storeName}
        </h1>
        <p className="mt-4 text-base text-ink-dim">
          Acessórios selecionados pra quem entende da sessão. Adicione ao
          carrinho ou resolva na hora pelo WhatsApp.
        </p>
      </div>

      {isAdmin && (
        <div className="mt-8 flex items-center justify-between rounded-xl border border-accent/30 bg-accent/10 px-5 py-3">
          <p className="text-sm font-medium text-ink">
            Modo dono: você pode editar, esgotar e excluir produtos direto aqui.
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/novo"
              className="whitespace-nowrap rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-cloud hover:bg-accent-bright"
            >
              Cadastrar produto
            </Link>
            <form action={logout}>
              <button className="text-sm text-ink-dim hover:text-ink">Sair</button>
            </form>
          </div>
        </div>
      )}

      {categories.length > 0 && (
        <div className="mt-10">
          <CategoryTabs categories={categories} active={categoria ?? null} />
        </div>
      )}

      {products.length === 0 ? (
        <p className="mt-16 text-ink-dim">Nenhum produto cadastrado ainda.</p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} isAdmin={isAdmin} />
          ))}
        </div>
      )}
    </div>
  );
}
