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
    include: {
      variants: { orderBy: { createdAt: "asc" } },
      images: { orderBy: { order: "asc" } },
    },
  });

  const categories = Array.from(new Set(allProducts.map((p) => p.category))).sort();
  const products = categoria
    ? allProducts.filter((p) => p.category === categoria)
    : allProducts;

  return (
    <div>
      <div className="mx-auto max-w-5xl px-5 pt-14 pb-10">
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
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-accent/30 bg-accent/10 px-5 py-3">
            <p className="text-sm font-medium text-ink">
              Modo dono: você pode editar, esgotar e excluir produtos direto aqui.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/admin/novo"
                className="whitespace-nowrap rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-cloud hover:bg-accent-bright"
              >
                Cadastrar produto
              </Link>
              <Link href="/admin/logo" className="text-sm text-ink-dim hover:text-ink">
                Trocar logo
              </Link>
              <form action={logout}>
                <button className="text-sm text-ink-dim hover:text-ink">Sair</button>
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="mx-auto max-w-5xl px-5 pb-14">
        {categories.length > 0 && (
          <CategoryTabs categories={categories} active={categoria ?? null} />
        )}

        {products.length === 0 ? (
          <p className="mt-16 text-ink-dim">Nenhum produto cadastrado ainda.</p>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} isAdmin={isAdmin} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
