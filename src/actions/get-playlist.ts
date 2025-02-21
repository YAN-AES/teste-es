"use server";
//* Libraries imports
import type { Artist, MaxInt } from '@spotify/web-api-ts-sdk';

//* Local imports
import { spotifySdk, } from "@/lib/spotify-client";
import { prisma } from "@/lib/prisma";

type GetPlaylistArgs = {
  playlistId: string;
  limit?: MaxInt<50>;
};

export async function getPlaylist({ playlistId, limit = 5 }: GetPlaylistArgs) {
  const playlist = await spotifySdk.playlists.getPlaylistItems(playlistId, "BR", undefined, limit);

  const artistsIds = playlist.items
    .map((item) => item.track.artists[0].id)
    .filter((id, index, self) => self.indexOf(id) === index);

  const artists: Partial<Artist>[] = [];

  for (const artistId of artistsIds) {
    // const artist = await spotifySdk.artists.get(artistId);
    // artists.push(artist);

    //verify if artis is on local database
    const artistFromDB = await prisma.artist.findFirst({
      where: {
        artistId: artistId,
      },
      include: {
        genres: true,
        images: true,
      }
    });

    // if artist is on local database, push it to artists array
    if (artistFromDB) {
      artists.push({
        id: artistFromDB.artistId,
        name: artistFromDB.name,
        genres: artistFromDB.genres.map((genre) => genre.name),
        images: artistFromDB.images,
      });
    } else { // if artist is not on local database, get it from spotify api
      const artist = await spotifySdk.artists.get(artistId);
      artists.push(artist);

      // save artist to local database
      const newArtist = await prisma.artist.create({
        data: {
          artistId: artist.id,
          name: artist.name,
          popularity: artist.popularity,
        },
      });

      // save genres to local database
      for (const genre of artist.genres) {
        // verify if genre is on local database
        let genreFromDB = await prisma.genre.findFirst({
          where: {
            name: genre,
          },
        });

        // if genre is not on local database, create it
        if (!genreFromDB) {
          genreFromDB = await prisma.genre.create({
            data: {
              name: genre,
            },
          });
        } else { // if genre is on local database, connect it to artist
          await prisma.artist.update({
            where: {
              id: newArtist.id,
            },
            data: {
              genres: {
                connect: {
                  id: genreFromDB.id,
                },
              },
            },
          });
        }
      }

      // save images to local database
      for (const image of artist.images){
        const imagesFromDB = await prisma.image.create({
          data: {
            url: image.url,
            width: image.width,
            height: image.height,
          },
        });

        await prisma.artist.update({
          where: {
            id: newArtist.id,
          },
          data: {
            images: {
              connect: {
                id: imagesFromDB.id,
              },
            },
          },
        });
      }
    }
  }

  // await fakeDelay(5000);

  return {
    playlist,
    artists,
  };
}

// async function fakeDelay(ms: number) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }