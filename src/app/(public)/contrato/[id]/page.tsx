"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { formatDate } from "@/utils/dateUtils"

export default function ContratoDetalhes({ params }: { params: { id: string } }) {
  const [contrato, setContrato] = useState(null)

  useEffect(() => {
    const storedContratacoes = JSON.parse(localStorage.getItem("contratacoes") || "[]")
    const contratoSelecionado = storedContratacoes[params.id]
    setContrato(contratoSelecionado)
  }, [params.id])

  if (!contrato) {
    return <div>Carregando...</div>
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Detalhes do Contrato</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">{contrato.artista}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Contratante:</p>
            <p>{contrato.nome}</p>
          </div>
          <div>
            <p className="font-semibold">Data do Evento:</p>
            <p>{formatDate(contrato.data)}</p>
          </div>
          <div>
            <p className="font-semibold">Cachê:</p>
            <p>R$ {contrato.cache}</p>
          </div>
          <div>
            <p className="font-semibold">Endereço:</p>
            <p>{contrato.endereco}</p>
          </div>
        </div>
      </div>
      <div className="mt-6 space-x-4">
        <Link href="/artistas-agendados" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Voltar para Artistas Agendados
        </Link>
        <Link href="/" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Página Inicial
        </Link>
      </div>
    </div>
  )
}

