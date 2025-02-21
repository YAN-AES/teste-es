// Libraries imports
import type React from "react";
import Link from "next/link";
import Image from "next/image";

import Logo from "@/../public/eventlog-1.png";

type PublicLayoutProps = {
  children: React.ReactNode;
};

export default function PublicLayout(props: PublicLayoutProps) {
  return (
    <>
      <nav className="bg-rose-700 p-4 font-roboto">
        <div className="container mx-auto flex justify-between items-center gap-3">
          <Link href="/" className="text-white text-xl font-bold">
            <Image
            src={Logo}
            alt="EventLog Logo"
            height={40}
            />
          </Link>
          <div className="font-semibold flex gap-2 items-center">
            <Link
              href="/"
              className="flex items-center text-center justify-center text-white hover:bg-rose-800 transition-all ease-in-out px-2 py-[1px] rounded-md"
            >
              Home
            </Link>
            <Link
              href="/artistas-agendados"
              className="flex flex-col items-center text-center justify-center text-white hover:bg-rose-800 transition-all ease-in-out px-2 py-[1px] rounded-md"
            >
              Artistas Agendados
            </Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">{props.children}</main>
    </>
  );
}
