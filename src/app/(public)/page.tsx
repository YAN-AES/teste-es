"use server";
// Libraries imports
import React from "react";
import Link from "next/link";

// Components imports
import { QuerySearchInput } from "@/components/search-component";
import { Playlist, PlaylistSkeleton } from "@/components/playlist";
import { SearchResults, SearchResultsSkeleton } from "./_components/search-results";

type Props = {
  searchParams: Promise<{
    search: string;
    offset: string;
  }>;
};

export default async function Home(props: Props) {
  const { searchParams } = props;
  const { search, offset } = await searchParams;

  return (
    <div className="font-roboto flex flex-col items-center justify-center min-h-screen">

      <QuerySearchInput searchable="artistas" />

      <React.Suspense fallback={<SearchResultsSkeleton />}>
        <SearchResults search={search} offset={offset} />
      </React.Suspense>

      <h1 className="text-3xl font-bold font-roboto pb-6 pt-16">
        Contratação de Artistas
      </h1>

      <React.Suspense fallback={<PlaylistSkeleton />}>
        <Playlist playlistId="4gJGkR1ISXTIF42k9hKwbD" title="Artistas em Destaque" />
      </React.Suspense>

      <React.Suspense fallback={<PlaylistSkeleton />}>
        <Playlist playlistId="2NIREBwQKsAJ6RUCfV7ghs" title="Artistas em Destaque" />
      </React.Suspense>

      <React.Suspense fallback={<PlaylistSkeleton />}>
        <Playlist playlistId="6k2NJwStYkPCUKkGErQfNH" title="Artistas em Destaque" />
      </React.Suspense>

      <div className="mt-8 flex items-center justify-center">
        <Link
          href="/artistas-agendados"
          className="px-4 py-2 font-semibold text-xl bg-rose-700 text-white rounded hover:bg-rose-800 transition-all ease-out duration-300 overflow-hidden"
        >
          Artistas Agendados
        </Link>
      </div>
    </div>
  );
}