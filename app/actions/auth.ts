"use server";

import { createSession, destroySession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const password = String(formData.get("password") || "");

  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: "Senha incorreta." };
  }

  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}
