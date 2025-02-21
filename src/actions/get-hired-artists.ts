"use server";
// Libraries Imports
import type { Artist } from "@spotify/web-api-ts-sdk";

// Local Imports
import { spotifySdk } from "@/lib/spotify-client";
import { prisma } from "@/lib/prisma";

interface HiredArtist extends Artist {
  contractId: string;
}

export async function getHiredArtists() {
  const artistsIds = await prisma.assign.findMany({
    select: {
      id: true,
      artistId: true,
    },
    take: 100,
  });

  const artists: HiredArtist[] = [];

  for (const artist of artistsIds) {
    const artistData = await spotifySdk.artists.get(artist.artistId);
    artists.push({
      ...artistData,
      contractId: artist.id,
    });
  }

  return artists;
}