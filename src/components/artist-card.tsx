import Image from "next/image";
import Link from "next/link";

interface Artist {
  id: number;
  name: string;
  imageUrl: string;
  tags: string[];
}

interface ArtistCardProps {
  artist: Artist;
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link href={`/contratar/${artist.id}`}>
      <div className="flex flex-col justify-start items-center font-roboto border- border-rose-700 w-56 h-[370px] rounded-lg overflow-hidden hover:shadow-lg shadow-rose-700/50 transition-shadow duration-300">
        <div className="relative h-56 w-56 rounded-lg overflow-hidden">
          <Image
            src={artist.imageUrl || "/placeholder.svg"}
            alt={artist.name}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-4 flex flex-col items-center">
          <h3 className="text-2xl font-semibold mb-2">{artist.name}</h3>
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              {artist.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-rose-100 text-rose-800 text-xs font-semibold px-2.5 py-0.5 rounded"
                >
                  {tag}
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
