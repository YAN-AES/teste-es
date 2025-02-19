"use server";
// Local imports
import { prisma } from "@/lib/prisma";
import type { Assign } from "@/schemas/assign";

export async function SaveAssign(args: Assign) {
  console.log("SaveAssign", args);

  const assign = await prisma.assign.create({
    data: {
      artistId: args.artistId,
      cep: args.cep,
      city: args.cidade,
      contractor: args.contratante,
      eventDate: args.dataEvento,
      neighborhood: args.bairro,
      number: args.numero,
      state: args.estado,
      street: args.rua,
    }
  });

  return {
    success: true,
    message: "Contratação realizada com sucesso!",
    args,
    assign,
  }
}