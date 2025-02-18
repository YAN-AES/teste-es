import Image from "next/image"
import Link from "next/link"

interface Artist {
  id: number
  name: string
  imageUrl: string
  tags: string[]
}

interface ArtistCardProps {
  artist: Artist
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Link href={`/contratar/${artist.id}`}>
      <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-48">
          <Image src={artist.imageUrl || "/placeholder.svg"} alt={artist.name} layout="fill" objectFit="cover" />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{artist.name}</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {artist.tags.map((tag, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-sm text-gray-600">Clique para contratar</p>
        </div>
      </div>
    </Link>
  )
}

