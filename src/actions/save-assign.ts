"use server";

export async function SaveAssign(args: unknown) {
  console.log("SaveAssign", args);

  return {
    success: true,
    message: "Contratação realizada com sucesso!",
    args
  }
}