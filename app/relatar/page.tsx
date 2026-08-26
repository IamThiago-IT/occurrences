import type { Metadata } from "next";
import OcorrenciaForm from "../components/OcorrenciaForm";

export const metadata: Metadata = {
  title: "Relatar Ocorrencia",
  description: "Registre uma nova ocorrencia",
};

export default function RelatarPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Relatar Ocorrencia
      </h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Preencha os campos abaixo para registrar uma nova ocorrencia.
      </p>
      <div className="mt-8">
        <OcorrenciaForm />
      </div>
    </div>
  );
}
