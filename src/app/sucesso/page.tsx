import Link from "next/link"

export default function Sucesso() {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold mb-6">Contratação Realizada com Sucesso!</h1>
      <p className="mb-4">Sua solicitação de contratação foi registrada.</p>
      <div className="space-x-4">
        <Link href="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Nova Contratação
        </Link>
        <Link href="/contratacoes" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Ver Contratações
        </Link>
      </div>
    </div>
  )
}

