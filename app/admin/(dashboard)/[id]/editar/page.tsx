import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProductForm } from "@/components/ProductForm";
import { updateProduct } from "@/app/actions/products";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      variants: { orderBy: { createdAt: "asc" } },
      images: { orderBy: { order: "asc" } },
    },
  });
  if (!product) notFound();

  return (
    <div className="space-y-6">
      <h1 className="font-display text-xl font-bold text-ink">Editar produto</h1>
      <ProductForm
        action={updateProduct.bind(null, id)}
        initial={{
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          images: product.images,
          variants: product.variants,
        }}
        submitLabel="Salvar alterações"
      />
    </div>
  );
}
