"use server";
//* Libraries imports
import type { Artist, MaxInt } from '@spotify/web-api-ts-sdk';

//* Local imports
import { spotifySdk, } from "@/lib/spotify-client";

type GetPlaylistArgs = {
  playlistId: string;
  limit?: MaxInt<50>;
};

export async function getPlaylist({ playlistId, limit = 10 }: GetPlaylistArgs) {
  const playlist = await spotifySdk.playlists.getPlaylistItems(playlistId, "BR", undefined, limit);

  const artistsIds = playlist.items
    .map((item) => item.track.artists[0].id)
    .filter((id, index, self) => self.indexOf(id) === index);

  const artists: Artist[] = [];

  for (const artistId of artistsIds) {
    const artist = await spotifySdk.artists.get(artistId);
    artists.push(artist);
  }

  return {
    playlist,
    artists,
  };
}