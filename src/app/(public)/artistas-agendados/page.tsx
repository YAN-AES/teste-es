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
    <div className="flex flex-col gap-5">
      <h1 className="text-3xl font-bold mb-6">Artistas Agendados</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {
          artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))
        }
      </div>
      <Link href="/">
        <Button variant="rosebutton">Voltar para Início</Button>
      </Link>
    </div>
  );
}
