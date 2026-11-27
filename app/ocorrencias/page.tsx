"use client";

import { useSyncExternalStore } from "react";
import {
  CATEGORIAS,
  STATUS,
  listarOcorrencias,
  subscribe,
  type Categoria,
  type Ocorrencia,
  type Status,
} from "../lib/ocorrencias";
import OcorrenciaCard from "../components/OcorrenciaCard";
import { useState } from "react";

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
          aria-label="Filtrar por categoria"
          className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        >
          <option value="">Todas categorias</option>
          {CATEGORIAS.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>

        <select
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value as Status | "")}
          aria-label="Filtrar por status"
          className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        >
          <option value="">Todos status</option>
          {STATUS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
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
