import Image from "next/image";
import { getLogoUrl, updateLogo } from "@/app/actions/settings";

export default async function LogoPage() {
  const logoUrl = await getLogoUrl();

  return (
    <div className="space-y-6">
      <h1 className="font-display text-xl font-bold text-ink">Logo da loja</h1>

      <form action={updateLogo} className="space-y-5 rounded-xl border border-panel-line bg-cloud p-6">
        {logoUrl && (
          <div className="space-y-1">
            <p className="text-sm text-ink-dim">Logo atual</p>
            <div className="relative h-20 w-20 overflow-hidden rounded-full border border-panel-line">
              <Image src={logoUrl} alt="Logo atual" fill className="object-cover" />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm text-ink-dim">Nova imagem do logo (fica redonda no cabeçalho)</label>
          <input
            name="logo"
            type="file"
            accept="image/*"
            required
            className="w-full rounded-lg border border-panel-line bg-white px-3 py-2 text-ink file:mr-3 file:rounded-md file:border-0 file:bg-accent file:px-3 file:py-1.5 file:text-cloud file:font-medium"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-accent py-2.5 font-semibold text-cloud hover:bg-accent-bright transition"
        >
          Salvar logo
        </button>
      </form>
    </div>
  );
}
