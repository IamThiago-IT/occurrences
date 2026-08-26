"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { listarOcorrencias, type Ocorrencia } from "./lib/ocorrencias";
import OcorrenciaCard from "./components/OcorrenciaCard";

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

export default function Home() {
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ocorrencias: Ocorrencia[] = JSON.parse(data).slice(0, 5);

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Sistema de Ocorrencias
        </h1>
        <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
          Registre e acompanhe ocorrencias da sua empresa de forma simples e
          rapida.
        </p>
        <Link
          href="/relatar"
          className="mt-6 inline-flex items-center rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          + Relatar Ocorrencia
        </Link>
      </div>

      {ocorrencias.length > 0 && (
        <section className="mt-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Ultimas Ocorrencias
            </h2>
            <Link
              href="/ocorrencias"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              Ver todas
            </Link>
          </div>
          <div className="space-y-3">
            {ocorrencias.map((o) => (
              <OcorrenciaCard key={o.id} ocorrencia={o} />
            ))}
          </div>
        </section>
      )}

      {ocorrencias.length === 0 && (
        <section className="mt-12 rounded-xl border-2 border-dashed border-zinc-200 p-12 text-center dark:border-zinc-800">
          <p className="text-zinc-500 dark:text-zinc-400">
            Nenhuma ocorrencia registrada ainda.
          </p>
        </section>
      )}
    </div>
  );
}
