"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { salvarOcorrencia, type Categoria } from "../lib/ocorrencias";

const categorias: { value: Categoria; label: string }[] = [
  { value: "infraestrutura", label: "Infraestrutura" },
  { value: "seguranca", label: "Seguranca" },
  { value: "meio-ambiente", label: "Meio Ambiente" },
  { value: "saude", label: "Saude" },
  { value: "outro", label: "Outro" },
];

const schema = z.object({
  titulo: z
    .string()
    .min(3, "Titulo deve ter pelo menos 3 caracteres")
    .max(120, "Titulo muito longo"),
  descricao: z
    .string()
    .min(10, "Descricao deve ter pelo menos 10 caracteres")
    .max(1000, "Descricao muito longa"),
  categoria: z.enum([
    "infraestrutura",
    "seguranca",
    "meio-ambiente",
    "saude",
    "outro",
  ]),
  local: z.string().max(200, "Local muito longo").optional(),
});

type FormData = z.infer<typeof schema>;

export default function OcorrenciaForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      titulo: "",
      descricao: "",
      categoria: "outro",
      local: "",
    },
  });

  function onSubmit(data: FormData) {
    salvarOcorrencia(data);
    router.push("/ocorrencias");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label
          htmlFor="titulo"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Titulo *
        </label>
        <input
          id="titulo"
          {...register("titulo")}
          className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          placeholder="Ex: Buraco naRua"
        />
        {errors.titulo && (
          <p className="mt-1 text-xs text-red-600">{errors.titulo.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="descricao"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Descricao *
        </label>
        <textarea
          id="descricao"
          {...register("descricao")}
          rows={4}
          className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          placeholder="Descreva a ocorrencia com detalhes..."
        />
        {errors.descricao && (
          <p className="mt-1 text-xs text-red-600">
            {errors.descricao.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="categoria"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Categoria *
        </label>
        <select
          id="categoria"
          {...register("categoria")}
          className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        >
          {categorias.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="local"
          className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Local
        </label>
        <input
          id="local"
          {...register("local")}
          className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          placeholder="Ex: Rua das Flores, 123"
        />
        {errors.local && (
          <p className="mt-1 text-xs text-red-600">{errors.local.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {isSubmitting ? "Salvando..." : "Registrar Ocorrencia"}
      </button>
    </form>
  );
}
