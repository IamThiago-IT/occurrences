"use client";

import { useSyncExternalStore } from "react";
import {
  listarOcorrencias,
  type Categoria,
  type Ocorrencia,
  type Status,
} from "../lib/ocorrencias";
import OcorrenciaCard from "../components/OcorrenciaCard";
import { useState } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getSnapshot() {
  return JSON.stringify(listarOcorrencias());
}

function getServerSnapshot() {
  return "[]";
}

export default function OcorrenciasPage() {
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ocorrencias: Ocorrencia[] = JSON.parse(data);
  const [filtroCategoria, setFiltroCategoria] = useState<Categoria | "">("");
  const [filtroStatus, setFiltroStatus] = useState<Status | "">("");

  const filtradas = ocorrencias.filter((o) => {
    if (filtroCategoria && o.categoria !== filtroCategoria) return false;
    if (filtroStatus && o.status !== filtroStatus) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        Ocorrencias
      </h1>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {filtradas.length} ocorrencia(s) encontrada(s).
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value as Categoria | "")}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        >
          <option value="">Todas categorias</option>
          <option value="infraestrutura">Infraestrutura</option>
          <option value="seguranca">Seguranca</option>
          <option value="meio-ambiente">Meio Ambiente</option>
          <option value="saude">Saude</option>
          <option value="outro">Outro</option>
        </select>

        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value as Status | "")}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        >
          <option value="">Todos status</option>
          <option value="aberta">Aberta</option>
          <option value="em-analise">Em analise</option>
          <option value="resolvida">Resolvida</option>
        </select>
      </div>

      <div className="mt-6 space-y-3">
        {filtradas.map((o) => (
          <OcorrenciaCard key={o.id} ocorrencia={o} />
        ))}
      </div>

      {filtradas.length === 0 && (
        <div className="mt-12 rounded-xl border-2 border-dashed border-zinc-200 p-12 text-center dark:border-zinc-800">
          <p className="text-zinc-500 dark:text-zinc-400">
            Nenhuma ocorrencia encontrada.
          </p>
        </div>
      )}
    </div>
  );
}
