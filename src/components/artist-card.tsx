// Libraries imports
import type { Artist } from "@spotify/web-api-ts-sdk";
import Image from "next/image";
import Link from "next/link";

interface ArtistCardProps {
  artist: Artist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link href={`/contratar/${artist.id}`}>
      <div className="flex flex-col justify-start items-center font-roboto border- border-rose-700 w-56 h-[370px] rounded-lg overflow-hidden hover:shadow-lg shadow-rose-700/50 transition-shadow duration-300">
        <div className="relative h-56 w-56 rounded-lg overflow-hidden">
          <Image
            src={artist.images?.[0]?.url || "/placeholder.svg"}
            alt={artist.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="py-3 px-1 flex flex-col items-center justify-center">
          <h3 className="text-2xl font-semibold mb-2">{artist.name}</h3>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            <div className="flex flex-wrap gap-2 mb-3">
              {artist.genres.map((genre, index) => (
                <span
                  key={`tag-${artist.id}-${index}`}
                  className="bg-rose-100 text-rose-800 text-xs font-semibold px-2.5 py-0.5 rounded"
                >
                  {genre}
                </span>
              ))}
            </div>
            <p className="text-sm text-gray-600">Clique para contratar</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
