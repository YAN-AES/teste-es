// Libraries imports
import { SpotifyApi } from '@spotify/web-api-ts-sdk';

// Local imports
import { env } from "@/env";

export const spotifySdk = SpotifyApi.withClientCredentials(env.SPOTIFY_CLIENT_ID, env.SPOTIFY_SECRET_ID);