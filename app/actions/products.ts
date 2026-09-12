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

async function saveImage(file: File): Promise<string> {
  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
  const filename = `${randomUUID()}.${ext || "jpg"}`;
  const dir = uploadDir();
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), bytes);
  return `/media/${filename}`;
}

export async function createProduct(formData: FormData) {
  await requireAdmin();

  const name = String(formData.get("name") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const price = parseFloat(String(formData.get("price") || "0").replace(",", "."));
  const category = String(formData.get("category") || "Outros");
  const image = formData.get("image") as File | null;

  if (!name || !price || !image || image.size === 0) {
    throw new Error("Preencha nome, preço e uma foto do produto.");
  }

  const imageUrl = await saveImage(image);

  await prisma.product.create({
    data: { name, description, price, imageUrl, category, status: "AVAILABLE" },
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
  const image = formData.get("image") as File | null;

  const data: {
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl?: string;
  } = { name, description, price, category };

  if (image && image.size > 0) {
    data.imageUrl = await saveImage(image);
  }

  await prisma.product.update({ where: { id }, data });

  revalidatePath("/");
  redirect("/");
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
  const product = await prisma.product.findUnique({ where: { id } });
  await prisma.product.delete({ where: { id } });

  if (product?.imageUrl?.startsWith("/media/")) {
    const filename = product.imageUrl.replace("/media/", "");
    await unlink(path.join(uploadDir(), filename)).catch(() => {});
  } else if (product?.imageUrl?.startsWith("/uploads/")) {
    const filename = product.imageUrl.replace("/uploads/", "");
    const legacyDir = path.join(process.cwd(), "public", "uploads");
    await unlink(path.join(legacyDir, filename)).catch(() => {});
  }

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
