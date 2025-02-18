"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import ArtistCard from "@/components/artist-card"

export default function ArtistasAgendados() {
  const [contratacoes, setContratacoes] = useState([])

  useEffect(() => {
    const storedContratacoes = JSON.parse(localStorage.getItem("contratacoes") || "[]")
    setContratacoes(storedContratacoes)
  }, [])

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
                tags: [`Data: ${contratacao.data}`, `Cachê: R$ ${contratacao.cache}`],
              }}
              href={`/contrato/${index}`}
              actionText="Ver Detalhes"
            />
          ))}
        </div>
      )}
      <Link href="/" className="mt-6 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Voltar para Início
      </Link>
    </div>
  )
}

