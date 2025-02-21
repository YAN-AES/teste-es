"use server";
// Libraries imports
import React from "react";
import Link from "next/link";

// Components imports
import { QuerySearchInput } from "@/components/search-component";
import { Playlist, PlaylistSkeleton } from "@/components/playlist";
import {
  SearchResults,
  SearchResultsSkeleton,
} from "./_components/search-results";
import { Button } from "@/components/ui/button";

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

      <div className="flex flex-col gap-6 items-center justify-center">
        <h1 className="text-3xl font-bold font-roboto pb-6 pt-16">
          Contratação de Artistas
        </h1>

        <React.Suspense fallback={<PlaylistSkeleton />}>
          <Playlist
            playlistId="1BjhMWn1Ho8gCzyIpK9nq4"
            title="Artistas em Destaque - Mundo"
          />
        </React.Suspense>

        <React.Suspense fallback={<PlaylistSkeleton />}>
          <Playlist
            playlistId="6NiCKhKBZuY2HCRISdKoFP"
            title="Today's Top Hits"
          />
        </React.Suspense>

        <React.Suspense fallback={<PlaylistSkeleton />}>
          <Playlist
            playlistId="6aPupmf8E3mKdCtjiMfnNL"
            title="Artistas em Destaque - Brasil"
          />
        </React.Suspense>

        <div className="pt-7">
          <Link href="/artistas-agendados">
            <Button variant="rosebutton">Artistas Agendados</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
