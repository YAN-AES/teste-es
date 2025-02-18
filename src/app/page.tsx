"use client";

import type React from "react";

import { useState } from "react";
import ArtistCard from "@/components/artist-card";
import Link from "next/link";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simular uma chamada de API com dados mockados
    const mockResults = featuredArtists.filter(
      (artist) =>
        artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    setSearchResults(mockResults);
  };

  const featuredArtists = [
    {
      id: 1,
      name: "Banda Rock Star",
      imageUrl:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      tags: ["Rock", "Alternativo", "Anos 90"],
    },
    {
      id: 2,
      name: "DJ Eletrônico",
      imageUrl:
        "https://images.unsplash.com/photo-1571266028243-e4b44c0a1d36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      tags: ["Eletrônica", "House", "Techno"],
    },
    {
      id: 3,
      name: "Cantora Pop",
      imageUrl:
        "https://images.unsplash.com/photo-1516873240891-4bf014598ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      tags: ["Pop", "R&B", "Dance"],
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Contratação de Artistas</h1>
      <form onSubmit={handleSearch} className="mb-8">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar artistas ou gêneros..."
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Buscar
        </button>
      </form>

      {searchResults.length > 0 ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Resultados da Pesquisa</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {searchResults.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Artistas em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {featuredArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Artistas Agendados</h2>
        <Link
          href="/artistas-agendados"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Ver Artistas Agendados
        </Link>
      </div>
    </div>
  );
}
