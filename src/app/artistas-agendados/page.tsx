"use client";

// Imports
import { useState, useEffect } from "react";
import Link from "next/link";
import ArtistCard from "@/components/artist-card";
import { Button } from "@/components/ui/button";

export default function ArtistasAgendados() {
  const [contratacoes, setContratacoes] = useState([]);

  useEffect(() => {
    const storedContratacoes = JSON.parse(
      localStorage.getItem("contratacoes") || "[]"
    );
    setContratacoes(storedContratacoes);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Artistas Agendados</h1>
      {contratacoes.length === 0 ? (
        <p>Nenhum artista agendado ainda.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contratacoes.map((contratacao, index) => (
            <ArtistCard
              key={index}
              artist={{
                id: index,
                name: contratacao.artista,
                imageUrl: "/placeholder.svg",
                tags: [
                  `Data: ${contratacao.data}`,
                  `Cachê: R$ ${contratacao.cache}`,
                ],
              }}
              href={`/contrato/${index}`}
              actionText="Ver Detalhes"
            />
          ))}
        </div>
      )}
      <Link href="/">
        <Button variant="rosebutton">Voltar para Início</Button>
      </Link>
    </div>
  );
}
