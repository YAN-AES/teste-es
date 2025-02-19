// Libraries imports
import type React from "react";
import Link from "next/link";

type PublicLayoutProps = {
  children: React.ReactNode;
}

export default function PublicLayout(props: PublicLayoutProps) {
  return (
    <>
      <nav className="bg-rose-900 p-4">
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
      <main className="container mx-auto px-4 py-8">
        {props.children}
      </main>
    </>
  );
}
