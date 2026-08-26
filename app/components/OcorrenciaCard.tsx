import Link from "next/link";
import type { Ocorrencia } from "../lib/ocorrencias";
import BadgeStatus from "./BadgeStatus";
import BadgeCategoria from "./BadgeCategoria";

function formatarData(iso: string): string {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function OcorrenciaCard({
  ocorrencia,
}: {
  ocorrencia: Ocorrencia;
}) {
  return (
    <Link
      href={`/ocorrencias/${ocorrencia.id}`}
      className="block rounded-xl border border-zinc-200 p-5 transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-zinc-600 dark:hover:bg-zinc-900"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-zinc-900 dark:text-zinc-50">
            {ocorrencia.titulo}
          </h3>
          {ocorrencia.local && (
            <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
              {ocorrencia.local}
            </p>
          )}
        </div>
        <div className="flex shrink-0 gap-2">
          <BadgeCategoria categoria={ocorrencia.categoria} />
          <BadgeStatus status={ocorrencia.status} />
        </div>
      </div>
      <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
        {ocorrencia.descricao}
      </p>
      <p className="mt-3 text-xs text-zinc-400 dark:text-zinc-500">
        {formatarData(ocorrencia.criadoEm)}
      </p>
    </Link>
  );
}
