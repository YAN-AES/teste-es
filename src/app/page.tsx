"use client";

import type React from "react";

import { useState } from "react";
import ArtistCard from "@/components/artist-card";
import Link from "next/link";

import AssignForm from "@/components/assign-form";

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
        "https://images.unsplash.com/photo-1516873240891-4bf014598ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      tags: ["Eletrônica", "House", "Techno"],
    },
    {
      id: 3,
      name: "Tyler, The Creator",
      imageUrl:
        "https://images.unsplash.com/photo-1516873240891-4bf014598ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      tags: ["Pop", "R&B", "Dance"],
    },
    {
      id: 4,
      name: "SZA",
      imageUrl:
        "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      tags: ["Rock", "Indie", "Alternativo"],
    },
    {
      id: 5,
      name: "Kendrick Lamar",
      imageUrl:
        "https://images.unsplash.com/photo-1516873240891-4bf014598ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      tags: ["Hip-Hop", "Rap", "Underground"],
    },
  ];

  return (
    <div className="font-roboto flex flex-col items-center w-full justify-center">
      <h1 className="text-3xl font-bold font-roboto mb-6">
        Contratação de Artistas
      </h1>
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
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {searchResults.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4">Artistas em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            {featuredArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </>
      )}

      <div className="mt-8 flex items-center justify-center">
        <Link
          href="/artistas-agendados"
          className="px-4 py-2 font-semibold text-xl bg-rose-700 text-white rounded hover:bg-rose-800 transition-all ease-out duration-300 overflow-hidden"
        >
          Artistas Agendados
        </Link>
      </div>
      <AssignForm />
    </div>
  );
}
