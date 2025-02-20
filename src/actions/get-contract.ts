"use server";
// Local Imports
import { spotifySdk } from "@/lib/spotify-client";
import { prisma } from "@/lib/prisma";

type Args = {
  id: string;
};

export async function getContract(args: Args) {
  const contract = await prisma.assign.findUnique({
    where: {
      id: args.id
    }
  });

  if (!contract) {
    throw new Error("Contract not found");
  }

  const artist = await spotifySdk.artists.get(contract.artistId);

  return {
    artist,
    contract: contract
  };
}