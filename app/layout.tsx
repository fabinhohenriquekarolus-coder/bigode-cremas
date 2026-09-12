import type { Metadata } from "next";
import { Baloo_2, Inter } from "next/font/google";
import { CloudScape } from "@/components/CloudScape";
import "./globals.css";

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const storeName = process.env.NEXT_PUBLIC_STORE_NAME || "Loja";

export const metadata: Metadata = {
  title: storeName,
  description: `${storeName} — acessórios e artigos selecionados.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${baloo.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-ink font-sans">
        <CloudScape />
        <div className="relative z-10 flex min-h-full flex-1 flex-col">{children}</div>
      </body>
    </html>
  );
}
