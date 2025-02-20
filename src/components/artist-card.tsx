// Libraries imports
import type { Artist } from "@spotify/web-api-ts-sdk";
import Image from "next/image";
import Link from "next/link";

// Components imports
import { Skeleton } from "@/components/ui/skeleton";

interface ArtistCardProps {
  artist: Artist;
  href?: string;
}

export default function ArtistCard(props: ArtistCardProps) {
  const href = props.href || `/contratar/${props.artist.id}`;

  return (
    <Link href={href} className="group">
      <div className="flex flex-col justify-start items-center font-roboto border pt-2 w-60 h-[378px] rounded-lg overflow-hidden hover:shadow-xl group-hover:bg-rose-400 transition-all ease-in-out duration-200">
        <div className="relative size-56 rounded-lg overflow-hidden">
          <Image
            src={props.artist.images?.[0]?.url || "/placeholder.svg"}
            alt={props.artist.name}
            width={256}
            height={256}
            className="size-full object-fill"
            priority
          />
        </div>
        <div className="py-3 px-1 flex flex-col items-center justify-center w-full transition-all">
          <h3 className="text-2xl font-semibold mb-2 group-hover:text-white">{props.artist.name}</h3>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
            <div className="flex flex-col w-full items-center">
              <div className="flex flex-wrap gap-2 mb-3 h-12 w-full items-center justify-center">
                {props.artist.genres.slice(0, 4).map((genre, index) => (
                  <span
                    key={`tag-${props.artist.id}-${index}`}
                    className="bg-rose-100 text-rose-800 text-xs font-semibold px-2.5 py-0.5 rounded"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600 group-hover:text-gray-200">Clique para contratar</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function ArtistCardSkeleton() {
  return (
    <div className="flex flex-col justify-start items-center font-roboto border- border-rose-700 w-56 h-[370px] rounded-lg overflow-hidden hover:shadow-lg shadow-rose-700/50 transition-shadow duration-300">
      <div className="relative size-56 rounded-lg overflow-hidden">
        <Skeleton className="size-full object-fill" />
      </div>
      <div className="py-3 px-1 flex flex-col items-center justify-center">
        <Skeleton className="w-1/2 h-8 mb-2" />
        <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
          <div className="flex flex-wrap gap-2 mb-3">
            <Skeleton className="w-8 h-4" />
            <Skeleton className="w-8 h-4" />
            <Skeleton className="w-8 h-4" />
          </div>
          <Skeleton className="w-12 h-5" />
        </div>
      </div>
    </div>
  );
}
