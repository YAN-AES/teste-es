import { SpotifyApi } from '@spotify/web-api-ts-sdk';

const clientId = process.env.SPOTIFY_CLIENT_ID as string;
const clientSecret = process.env.SPOTIFY_SECRET_ID as string;

// Choose one of the following:
const sdk = SpotifyApi.withClientCredentials(clientId, clientSecret);


export async function GET (request: Request) {
    const playlist = await sdk.playlists.getPlaylistItems('4gJGkR1ISXTIF42k9hKwbD',"BR",undefined, 10)

    return new Response(JSON.stringify(playlist))
}