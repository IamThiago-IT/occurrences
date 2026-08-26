"use client";

import { useSyncExternalStore } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  buscarOcorrencia,
  atualizarStatus,
  removerOcorrencia,
  type Ocorrencia,
  type Status,
} from "../../lib/ocorrencias";
import BadgeStatus from "../../components/BadgeStatus";
import BadgeCategoria from "../../components/BadgeCategoria";

function formatarData(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const statusOptions: { value: Status; label: string }[] = [
  { value: "aberta", label: "Aberta" },
  { value: "em-analise", label: "Em analise" },
  { value: "resolvida", label: "Resolvida" },
];

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function makeGetSnapshot(id: string) {
  return () => {
    const found = buscarOcorrencia(id);
    return found ? JSON.stringify(found) : null;
  };
}

function getServerSnapshot() {
  return null;
}

export default function OcorrenciaDetalhePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const data = useSyncExternalStore(
    subscribe,
    makeGetSnapshot(id),
    getServerSnapshot,
  );

  const ocorrencia: Ocorrencia | null = data ? JSON.parse(data) : null;

  if (!ocorrencia) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-12">
        <p className="text-zinc-500">Carregando...</p>
      </div>
    );
  }

  function handleStatusChange(newStatus: Status) {
    if (!ocorrencia) return;
    const updated = atualizarStatus(ocorrencia.id, newStatus);
    if (updated) {
      window.dispatchEvent(new Event("storage"));
    }
  }

  function handleRemover() {
    if (!ocorrencia) return;
    if (confirm("Tem certeza que deseja remover esta ocorrencia?")) {
      removerOcorrencia(ocorrencia.id);
      router.push("/ocorrencias");
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <button
        onClick={() => router.back()}
        className="mb-6 text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
      >
        &larr; Voltar
      </button>

      <div className="flex items-start justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {ocorrencia.titulo}
        </h1>
        <div className="flex shrink-0 gap-2">
          <BadgeCategoria categoria={ocorrencia.categoria} />
          <BadgeStatus status={ocorrencia.status} />
        </div>
      </div>

      {ocorrencia.local && (
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Local: {ocorrencia.local}
        </p>
      )}

      <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
        Registrada em {formatarData(ocorrencia.criadoEm)}
      </p>

      <div className="mt-6 rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
        <h2 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Descricao
        </h2>
        <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-600 dark:text-zinc-400">
          {ocorrencia.descricao}
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <h2 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Alterar Status
          </h2>
          <div className="mt-2 flex gap-2">
            {statusOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleStatusChange(opt.value)}
                disabled={ocorrencia.status === opt.value}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  ocorrencia.status === opt.value
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "border border-zinc-300 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
                } disabled:opacity-50`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleRemover}
          className="rounded-lg border border-red-300 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
        >
          Remover Ocorrencia
        </button>
      </div>
    </div>
  );
}
