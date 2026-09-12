import { ProductForm } from "@/components/ProductForm";
import { createProduct } from "@/app/actions/products";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-xl font-bold text-ink">Cadastrar produto</h1>
      <ProductForm action={createProduct} submitLabel="Cadastrar produto" />
    </div>
  );
}
