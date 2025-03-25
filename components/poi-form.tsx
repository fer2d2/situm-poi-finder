"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormData } from "@/lib/types";
import { useCredentials } from "@/hooks/use-credentials";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().email("Email inválido"),
  apiKey: z.string().min(1, "API Key es requerida"),
  buildingId: z.string().transform((val) => parseInt(val, 10)),
});

interface POIFormProps {
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

export function POIForm({ onSubmit, isLoading }: POIFormProps) {
  const { credentials, saveCredentials } = useCredentials();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: credentials.email,
      apiKey: credentials.apiKey,
      buildingId: "",
    },
  });

  useEffect(() => {
    if (credentials.email && credentials.apiKey) {
      form.setValue("email", credentials.email);
      form.setValue("apiKey", credentials.apiKey);
    }
  }, [credentials, form]);

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    saveCredentials(data.email, data.apiKey);
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 w-full max-w-md">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="tu@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="apiKey"
          render={({ field }) => (
            <FormItem>
              <FormLabel>API Key</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Tu API Key" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="buildingId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID del Edificio</FormLabel>
              <FormControl>
                <Input type="number" placeholder="123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Enviando..." : "ENVIAR"}
        </Button>
      </form>
    </Form>
  );
} 