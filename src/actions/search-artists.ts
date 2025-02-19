"use server";
//* Libraries imports
import type { MaxInt, PartialSearchResult } from '@spotify/web-api-ts-sdk';

//* Local imports
import { spotifySdk, } from "@/lib/spotify-client";

type SearchArtistsArgs = {
  search?: string;
  limit?: MaxInt<50>;
};

export async function searchArtists({ search, limit = 10 }: SearchArtistsArgs) {
  if(!search || search.length === 0) {
    return [] as unknown as Required<Pick<PartialSearchResult, "artists">>["artists"];
  }

  const queryResult = await spotifySdk.search(search, ["artist"], "BR", limit);

  return queryResult.artists;
}