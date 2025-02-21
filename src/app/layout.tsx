// Libraries imports
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

// Components imports
import { Toaster } from "@/components/ui/toaster"

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
        {children}
        <Toaster />
      </body>
    </html>
  );
}
