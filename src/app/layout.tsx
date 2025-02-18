import type React from "react";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Contratação de Artistas",
  description: "Aplicação para contratação de artistas para shows particulares",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <nav className="bg-blue-500 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-white text-xl font-bold">
              Contratação de Artistas
            </Link>
            <div>
              <Link href="/" className="text-white mr-4">
                Início
              </Link>
              <Link href="/artistas-agendados" className="text-white">
                Artistas Agendados
              </Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
