"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";

type LoginState = { error?: string } | undefined;

export default function LoginPage() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    async (_prev, formData) => login(formData),
    undefined
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--sky-top)] px-5">
      <form
        action={formAction}
        className="w-full max-w-sm space-y-4 rounded-xl border border-panel-line bg-cloud p-6"
      >
        <h1 className="font-display text-lg font-bold text-ink">Modo dono da loja</h1>
        <p className="text-sm text-ink-dim">
          {process.env.NEXT_PUBLIC_STORE_NAME || "Loja"}
        </p>

        <div className="space-y-1">
          <label htmlFor="password" className="text-sm text-ink-dim">
            Senha
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            className="w-full rounded-lg border border-panel-line bg-white px-3 py-2 text-ink outline-none focus:border-accent"
          />
        </div>

        {state?.error && <p className="text-sm text-coral">{state.error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-lg bg-accent py-2 font-semibold text-cloud hover:bg-accent-bright transition disabled:opacity-50"
        >
          {pending ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
