"use server";
// Libraries imports
import React from "react";

// Components imports
import ArtistCard, { ArtistCardSkeleton } from "@/components/artist-card";

// Actions imports
import { getPlaylist } from "@/actions/get-playlist";

type Props = {
  playlistId: string;
  title: string;
};

export async function Playlist(props: Props) {
  const playlist1 = await getPlaylist({ playlistId: props.playlistId });

  return (
    <div className="flex flex-col w-full px-4 gap-1">
      <h2 className="text-2xl font-bold pb-4">{props.title}</h2>
      <div className="grid w-full gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {
          playlist1.artists.map((artist, index) => (
            <div key={`${artist.id}-${index}`} className="col-span-1 w-full">
              <ArtistCard artist={artist} width />
            </div>
          ))
        }
      </div>
    </div>
  );
}

export async function PlaylistSkeleton() {
  return (
    <div className="w-full max-w-7xl px-4">
      <h2 className="text-2xl font-bold pb-4">Artistas em Destaque</h2>
      <div className="flex flex-row w-full gap-6 justify-between">
        <ArtistCardSkeleton />
        <ArtistCardSkeleton />
        <ArtistCardSkeleton />
        <ArtistCardSkeleton />
        <ArtistCardSkeleton />
      </div>
    </div>
  )
}