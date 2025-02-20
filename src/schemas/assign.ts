// Libraries imports
import z from "zod";

export const assignSchema = z.object({
  artistId: z.string().min(1),
  contratante: z.string().min(2, {
    message: "Nome do contratante deve ter pelo menos 2 caracteres.",
  }),
  dataEvento: z.coerce.date({
    required_error: "A data do evento é obrigatória.",
  }),
  cep: z.string().regex(/^\d{5}-?\d{3}$/, {
    message: "CEP inválido. Use o formato: 12345-678",
  }),
  numero: z.string().min(1, {
    message: "Número é obrigatório.",
  }),
  rua: z.string().min(2, {
    message: "Rua deve ter pelo menos 2 caracteres.",
  }),
  bairro: z.string().min(2, {
    message: "Bairro deve ter pelo menos 2 caracteres.",
  }),
  cidade: z.string().min(2, {
    message: "Cidade deve ter pelo menos 2 caracteres.",
  }),
  estado: z.string().length(2, {
    message: "Use a sigla do estado com 2 caracteres.",
  }),
  cache: z.coerce
    .number({
      required_error: "O cachê é obrigatório.",
    })
    .min(1, {
      message: "O cachê deve ser maior que 0.",
    }),
});

export type Assign = z.infer<typeof assignSchema>;