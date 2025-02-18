"use client";

// Imports
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  contratante: z.string().min(2, {
    message: "Nome do contratante deve ter pelo menos 2 caracteres.",
  }),
  dataEvento: z.date({
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
});

export default function AddressForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contratante: "",
      cep: "",
      numero: "",
      rua: "",
      bairro: "",
      cidade: "",
      estado: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-4 w-full sm:w-[512px] mx-auto">
          <FormField
            control={form.control}
            name="contratante"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-roboto font-semibold">
                  Contratante
                </FormLabel>
                <FormControl>
                  <Input placeholder="Nome do contratante" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dataEvento"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="font-roboto font-semibold">
                  Data do Evento
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="cep"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-roboto font-semibold">
                    CEP
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="12345-678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numero"
              render={({ field }) => (
                <FormItem className="w-32">
                  <FormLabel className="font-roboto font-semibold">
                    Número
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="rua"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-roboto font-semibold">Rua</FormLabel>
                <FormControl>
                  <Input placeholder="Nome da rua" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bairro"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-roboto font-semibold">
                  Bairro
                </FormLabel>
                <FormControl>
                  <Input placeholder="Nome do bairro" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="cidade"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="font-roboto font-semibold">
                    Cidade
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da cidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="estado"
              render={({ field }) => (
                <FormItem className="w-32">
                  <FormLabel className="font-roboto font-semibold">
                    Estado
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="SP" {...field} maxLength={2} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" variant="rosebutton2">
            Enviar
          </Button>
        </div>
      </form>
    </Form>
  );
}
