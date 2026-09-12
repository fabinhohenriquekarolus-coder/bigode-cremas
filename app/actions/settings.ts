"use server";

import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { saveImage } from "./products";

async function requireAdmin() {
  if (!(await isAuthenticated())) {
    throw new Error("Não autorizado");
  }
}

export async function getLogoUrl(): Promise<string | null> {
  const settings = await prisma.settings.findUnique({ where: { id: "singleton" } });
  return settings?.logoUrl ?? null;
}

export async function updateLogo(formData: FormData) {
  await requireAdmin();

  const logo = formData.get("logo") as File | null;
  if (!logo || logo.size === 0) {
    throw new Error("Escolha uma imagem para o logo.");
  }

  const logoUrl = await saveImage(logo);

  await prisma.settings.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", logoUrl },
    update: { logoUrl },
  });

  revalidatePath("/");
  redirect("/");
}
