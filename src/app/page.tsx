"use server";
// Libraries imports
import React from "react";
import Link from "next/link";
import Image from "next/image";

// Components imports
import ArtistCard from "@/components/artist-card";
import AssignForm from "@/app/contratar/[artistId]/_components/assign-form";
import { QuerySearchInput } from "@/components/search-component";

// Actions imports
import { getPlaylist } from "@/actions/get-playlist";
import { searchArtists } from "@/actions/search-artists";

type Props = {
  searchParams: Promise<{
    search: string;
  }>;
};

export default async function Home(props: Props) {
  const { searchParams } = props;
  const { search } = await searchParams;

  const searchedArtists = await searchArtists({ search, limit: 3 });
  const playlist1 = await getPlaylist({ playlistId: "4gJGkR1ISXTIF42k9hKwbD" });

  return (
    <div className="font-roboto flex flex-col items-center justify-center min-h-screen">

      <QuerySearchInput searchable="artistas" />

      <div className="w-full max-w-7xl px-4">
        <h2 className="text-2xl font-bold pb-4">Artistas pesquisados</h2>
        <div className="flex flex-row w-full gap-2">
          {
            searchedArtists.items.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))
          }
        </div>
      </div>

      <h1 className="text-3xl font-bold font-roboto pb-6 pt-16">
        Contratação de Artistas
      </h1>

      <div className="w-full max-w-7xl px-4">
        <h2 className="text-2xl font-bold pb-4">Artistas em Destaque</h2>
        <div className="grid grid-cols-1 pd:grid-cols-5 gap-6 pb-8">
          {
            playlist1.artists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))
          }
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center">
        <Link
          href="/artistas-agendados"
          className="px-4 py-2 font-semibold text-xl bg-rose-700 text-white rounded hover:bg-rose-800 transition-all ease-out duration-300 overflow-hidden"
        >
          Artistas Agendados
        </Link>
      </div>

      <AssignForm />
    </div>
  );
}