"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  STATUS,
  buscarOcorrencia,
  atualizarStatus,
  removerOcorrencia,
  subscribe,
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

function makeGetSnapshot(id: string) {
  return () => {
    const found = buscarOcorrencia(id);
    return found ? JSON.stringify(found) : "";
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

  if (data === null) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-12">
        <p className="text-zinc-500">Carregando...</p>
      </div>
    );
  }

  if (!ocorrencia) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Ocorrencia nao encontrada
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Ela pode ter sido removida ou o link esta incorreto.
        </p>
        <Link
          href="/ocorrencias"
          className="mt-6 inline-flex items-center rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          Voltar para a listagem
        </Link>
      </div>
    );
  }

  function handleStatusChange(newStatus: Status) {
    if (!ocorrencia) return;
    const updated = atualizarStatus(ocorrencia.id, newStatus);
    if (!updated) {
      alert(
        "Nao foi possivel atualizar o status. Verifique o armazenamento do navegador.",
      );
    }
  }

  function handleRemover() {
    if (!ocorrencia) return;
    if (!confirm("Tem certeza que deseja remover esta ocorrencia?")) return;
    if (!removerOcorrencia(ocorrencia.id)) {
      alert(
        "Nao foi possivel remover a ocorrencia. Verifique o armazenamento do navegador.",
      );
      return;
    }
    router.push("/ocorrencias");
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
            {STATUS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleStatusChange(opt.value)}
                disabled={ocorrencia.status === opt.value}
                aria-pressed={ocorrencia.status === opt.value}
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
