"use server";
// Libraries Imports
import Link from "next/link";

// Components imports
import ArtistCard from "@/components/artist-card";
import { Button } from "@/components/ui/button";

// Actions imports
import { getHiredArtists } from "@/actions/get-hired-artists";

export default async function ArtistasAgendados() {
  const artists = await getHiredArtists();

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h1 className="text-3xl font-bold mb-6">Artistas Agendados</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6">
        {
          artists.map((artist, index) => (
            <ArtistCard
              key={`${artist.id}-${index}`}
              artist={artist}
              href={`/contrato/${artist.contractId}`}
              width={false}
            />
          ))
        }
      </div>
      <Link href="/">
        <Button type="button" variant="rosebutton">Voltar para Início</Button>
      </Link>
    </div>
  );
}
