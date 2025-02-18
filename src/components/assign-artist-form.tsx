"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ContrataArtista({ params }: { params: { artistId: string } }) {
  const router = useRouter()
  const [artist, setArtist] = useState({ id: "", name: "" })
  const [formData, setFormData] = useState({
    nome: "",
    artista: "",
    cache: "",
    data: "",
    endereco: "",
  })

  useEffect(() => {
    // Simular busca do artista por ID
    const mockArtist = { id: params.artistId, name: `Artista ${params.artistId}` }
    setArtist(mockArtist)
    setFormData((prev) => ({ ...prev, artista: mockArtist.name }))
  }, [params.artistId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Salvar no localStorage
    const contratacoes = JSON.parse(localStorage.getItem("contratacoes") || "[]")
    contratacoes.push(formData)
    localStorage.setItem("contratacoes", JSON.stringify(contratacoes))
    router.push("/sucesso")
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Contratar {artist.name}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nome" className="block mb-1">
            Nome*
          </label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="artista" className="block mb-1">
            Artista Selecionado*
          </label>
          <input
            type="text"
            id="artista"
            name="artista"
            value={formData.artista}
            onChange={handleChange}
            required
            readOnly
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>
        <div>
          <label htmlFor="cache" className="block mb-1">
            Cachê
          </label>
          <input
            type="number"
            id="cache"
            name="cache"
            value={formData.cache}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="data" className="block mb-1">
            Data do evento*
          </label>
          <input
            type="date"
            id="data"
            name="data"
            value={formData.data}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <label htmlFor="endereco" className="block mb-1">
            Endereço
          </label>
          <input
            type="text"
            id="endereco"
            name="endereco"
            value={formData.endereco}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Contratar
        </button>
      </form>
    </div>
  )
}

