"use server";

import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile, mkdir, unlink } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { uploadDir } from "@/lib/storage";

async function requireAdmin() {
  if (!(await isAuthenticated())) {
    throw new Error("Não autorizado");
  }
}

export async function saveImage(file: File): Promise<string> {
  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const filename = `${randomUUID()}.${ext || "jpg"}`;
  const dir = uploadDir();
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), bytes);
  return `/media/${filename}`;
}

function unlinkImageFile(url: string) {
  if (url.startsWith("/media/")) {
    const filename = url.replace("/media/", "");
    return unlink(path.join(uploadDir(), filename)).catch(() => {});
  }
  if (url.startsWith("/uploads/")) {
    const filename = url.replace("/uploads/", "");
    const legacyDir = path.join(process.cwd(), "public", "uploads");
    return unlink(path.join(legacyDir, filename)).catch(() => {});
  }
  return Promise.resolve();
}

export async function createProduct(formData: FormData) {
  await requireAdmin();

  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const price = parseFloat(String(formData.get("price") || "0").replace(",", "."));
  const category = String(formData.get("category") || "Outros");
  const images = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);

  if (!name || !price || images.length === 0) {
    throw new Error("Preencha nome, preço e ao menos uma foto do produto.");
  }

  const urls = await Promise.all(images.map(saveImage));

  await prisma.product.create({
    data: {
      name,
      description,
      price,
      category,
      status: "AVAILABLE",
      images: { create: urls.map((url, order) => ({ url, order })) },
    },
  });

  revalidatePath("/");
  redirect("/");
}

export async function updateProduct(id: string, formData: FormData) {
  await requireAdmin();

  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const price = parseFloat(String(formData.get("price") || "0").replace(",", "."));
  const category = String(formData.get("category") || "Outros");

  await prisma.product.update({
    where: { id },
    data: { name, description, price, category },
  });

  revalidatePath("/");
  redirect("/");
}

export async function addProductImages(productId: string, formData: FormData) {
  await requireAdmin();

  const images = formData.getAll("images").filter((f): f is File => f instanceof File && f.size > 0);
  if (images.length === 0) return;

  const existing = await prisma.productImage.count({ where: { productId } });
  const urls = await Promise.all(images.map(saveImage));

  await prisma.productImage.createMany({
    data: urls.map((url, i) => ({ productId, url, order: existing + i })),
  });

  revalidatePath("/");
  revalidatePath(`/admin/${productId}/editar`);
}

export async function deleteProductImage(imageId: string, productId: string) {
  await requireAdmin();

  const total = await prisma.productImage.count({ where: { productId } });
  if (total <= 1) {
    throw new Error("O produto precisa ter ao menos uma foto.");
  }

  const image = await prisma.productImage.delete({ where: { id: imageId } });
  await unlinkImageFile(image.url);

  revalidatePath("/");
  revalidatePath(`/admin/${productId}/editar`);
}

export async function toggleStatus(id: string) {
  await requireAdmin();
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return;
  const status = product.status === "AVAILABLE" ? "OUT_OF_STOCK" : "AVAILABLE";
  await prisma.product.update({ where: { id }, data: { status } });
  revalidatePath("/");
}

export async function deleteProduct(id: string) {
  await requireAdmin();
  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true },
  });
  await prisma.product.delete({ where: { id } });

  await Promise.all((product?.images ?? []).map((img) => unlinkImageFile(img.url)));

  revalidatePath("/");
}

export async function addVariant(productId: string, formData: FormData) {
  await requireAdmin();
  const name = String(formData.get("variantName") || "").trim();
  if (!name) return;

  await prisma.variant.create({
    data: { productId, name, status: "AVAILABLE" },
  });

  revalidatePath("/");
  revalidatePath(`/admin/${productId}/editar`);
}

export async function toggleVariantStatus(variantId: string, productId: string) {
  await requireAdmin();
  const variant = await prisma.variant.findUnique({ where: { id: variantId } });
  if (!variant) return;
  const status = variant.status === "AVAILABLE" ? "OUT_OF_STOCK" : "AVAILABLE";
  await prisma.variant.update({ where: { id: variantId }, data: { status } });
  revalidatePath("/");
  revalidatePath(`/admin/${productId}/editar`);
}

export async function deleteVariant(variantId: string, productId: string) {
  await requireAdmin();
  await prisma.variant.delete({ where: { id: variantId } });
  revalidatePath("/");
  revalidatePath(`/admin/${productId}/editar`);
}
