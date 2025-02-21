"use server";
// Libraries Imports
import Link from "next/link";
import Image from "next/image";

// Actions imports
import { getContract } from "@/actions/get-contract";

// Components imports
import { Button } from "@/components/ui/button";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ContratoDetalhes(props: Props) {
  const contractId = (await props.params).id;

  const contract = await getContract({ id: contractId });

  return (
    <div className="max-w-2xl mx-auto w-full flex flex-col items-center justify-center gap-8 font-roboto">
      {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
      <h1 className="text-3xl font-bold">Detalhes do Contrato</h1>
      <Image
        src={contract.artist.images?.[0]?.url || "/placeholder.svg"}
        alt={contract.artist.name}
        width={400}
        height={256}
        className="rounded-lg hover:scale-105 transition-all ease-in-out duration-200"
        priority
      />
      <div className="bg-white border shadow-lg rounded-lg p-6 w-full flex flex-col gap-4 hover:shadow-xl hover:scale-105 transition-all ease-in-out duration-200">
        <div className="flex flex-row justify-start items-center">
          <span className="text-2xl font-semibold mb-4 whitespace-nowrap">
            {contract.artist.name}
          </span>
          <div className="flex flex-wrap gap-2 mb-3 h-7 w-full items-center justify-center">
            {contract.artist.genres.slice(0, 4).map((genre, index) => (
              <span
                key={`tag-${contract.artist.id}-${index}`}
                className="bg-rose-100 text-rose-800 text-xs font-semibold px-2.5 py-0.5 rounded"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
        <div className="h-[1px] w-full bg-gray-200 px-4 "></div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Contratante:</p>
            <p>{contract.contract.contractor}</p>
          </div>
          <div>
            <p className="font-semibold">Data do Evento:</p>
            <p>{formactDate(contract.contract.eventDate)}</p>
          </div>
          <div>
            <p className="font-semibold">Cachê:</p>
            <p>{formatCurrency(contract.contract.cache)}</p>
          </div>
          <div>
            <p className="font-semibold">Cidade/Estado:</p>
            <p>
              {contract.contract.city} - {contract.contract.state}
            </p>
          </div>
          <div>
            <p className="font-semibold">Rua/Número:</p>
            <p>
              {contract.contract.street}, {contract.contract.number}
            </p>
          </div>
          <div>
            <p className="font-semibold">Bairro:</p>
            <p>{contract.contract.neighborhood}</p>
          </div>
          <div>
            <p className="font-semibold">CEP:</p>
            <p>{contract.contract.cep}</p>
          </div>
          <div>
            <p className="font-semibold">Data do Contrato:</p>
            <p>{formactDate(contract.contract.createdAt)}</p>
          </div>
          {/* <pre>{JSON.stringify(contract.artist.name, null, 2)}</pre> */}
        </div>
      </div>
      <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/artistas-agendados">
          <Button variant="rosebutton">Voltar para Artistas Agendados</Button>
        </Link>
        <Link href="/">
          <Button variant="rosebutton">Home</Button>
        </Link>
      </div>
    </div>
  );
}

function formactDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR").format(date);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
