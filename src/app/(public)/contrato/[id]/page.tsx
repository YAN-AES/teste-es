"use server";
// Libraries Imports
import Link from "next/link"

// Actions imports
import { getContract } from "@/actions/get-contract";

type Props = {
  params: Promise<{
    id: string
  }>;
};

export default async function ContratoDetalhes(props: Props) {
  const contractId = (await props.params).id;

  const contract = await getContract({ id: contractId });

  return (
    <div className="max-w-2xl mx-auto">
      <pre>
        {JSON.stringify(props, null, 2)}
      </pre>
      <h1 className="text-3xl font-bold mb-6">Detalhes do Contrato</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">{contract.artist.name}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Contratante:</p>
            <p>{contract.contract.contractor}</p>
          </div>
          <div>
            <p className="font-semibold">Data do Evento:</p>
            <p>
              {formactDate(contract.contract.eventDate)}
            </p>
          </div>
          <div>
            <p className="font-semibold">Cachê:</p>
            <p>{formatCurrency(contract.contract.cache)}</p>
          </div>
          <div>
            <p className="font-semibold">Endereço:</p>
            {/* <p>{contrato.endereco}</p> */}
          </div>
          <pre>
            {
              JSON.stringify(contract.artist.name, null, 2)
            }
          </pre>
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

function formactDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR").format(date);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}