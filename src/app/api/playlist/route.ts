import { SpotifyApi } from '@spotify/web-api-ts-sdk';

import { env } from "@/env";

// Choose one of the following:
const sdk = SpotifyApi.withClientCredentials(env.SPOTIFY_CLIENT_ID, env.SPOTIFY_SECRET_ID);


export async function GET() {
    const playlist = await sdk.playlists.getPlaylistItems('4gJGkR1ISXTIF42k9hKwbD', "BR", undefined, 10)

    return playlist;
}