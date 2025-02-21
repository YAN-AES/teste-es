// Components imports
import { AssignForm } from "./_components/assign-form";

type Props = {
  params: Promise<{ artistId: string }>;
}


export default async function AssignArtistPage(props: Props) {
  const { artistId } = await props.params;

  return (
    <div className="flex flex-col items-center font-roboto gap-5">
      <h1 className="font-bold text-2xl">Contratar Artista</h1>
      <AssignForm artistId={artistId} />
    </div>
  );
}