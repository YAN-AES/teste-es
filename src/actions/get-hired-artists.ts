"use server";
// Libraries Imports
import type { Artist } from "@spotify/web-api-ts-sdk";

// Local Imports
import { spotifySdk } from "@/lib/spotify-client";
import { prisma } from "@/lib/prisma";

export async function getHiredArtists() {
  const artistsIds = await prisma.assign.findMany({
    select: {
      artistId: true,
    },
  });

  const artists: Artist[] = [];

  for (const artist of artistsIds) {
    const artistData = await spotifySdk.artists.get(artist.artistId);
    artists.push(artistData);
  }

  return artists;
}