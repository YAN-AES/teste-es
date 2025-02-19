import React, { useState } from "react";
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
import { ptBR } from "date-fns/locale";

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
  const [isLoading, setIsLoading] = useState(false);
  const [cepError, setCepError] = useState("");

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

  const fetchAddressData = async (cep: string) => {
    setIsLoading(true);
    setCepError("");

    const cleanCep = cep.replace(/\D/g, "");

    if (cleanCep.length !== 8) {
      setCepError("CEP deve conter 8 dígitos");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cleanCep}/json/`
      );

      if (!response.ok) {
        setCepError("Erro ao buscar CEP");
        setIsLoading(false);
        return;
      }

      const data = await response.json();

      if (data.erro) {
        setCepError("CEP não encontrado");
        setIsLoading(false);
        return;
      }

      form.setValue("rua", data.logradouro);
      form.setValue("bairro", data.bairro);
      form.setValue("cidade", data.localidade);
      form.setValue("estado", data.uf);
    } catch (error) {
      setCepError("Erro ao buscar endereço");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    let formattedCep = value.replace(/\D/g, "");
    if (formattedCep.length >= 5) {
      formattedCep = formattedCep.replace(/^(\d{5})(\d)/, "$1-$2");
    }

    form.setValue("cep", formattedCep);

    if (formattedCep.replace(/\D/g, "").length === 8) {
      fetchAddressData(formattedCep);
    }
  };

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
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: ptBR })
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
                    <Input
                      placeholder="12345-678"
                      {...field}
                      onChange={handleCepChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                  {cepError && (
                    <span className="text-red-500 text-sm">{cepError}</span>
                  )}
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
                  <Input
                    placeholder="Nome da rua"
                    {...field}
                    disabled={isLoading}
                  />
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
                  <Input
                    placeholder="Nome do bairro"
                    {...field}
                    disabled={isLoading}
                  />
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
                    <Input
                      placeholder="Nome da cidade"
                      {...field}
                      disabled={isLoading}
                    />
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
                    <Input
                      placeholder="SP"
                      {...field}
                      maxLength={2}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" variant="rosebutton2" disabled={isLoading}>
            Enviar
          </Button>
        </div>
      </form>
    </Form>
  );
}
