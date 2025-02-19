// Components imports
import { AssignForm } from "./_components/assign-form";

type Props = {
  params: Promise<{ artistId: string }>;
}


export default async function AssignArtistPage(props: Props) {
  const { artistId } = await props.params;

  return (
    <div>
      <h1>Contratar Artista</h1>
      <AssignForm artistId={artistId} />
    </div>
  );
}