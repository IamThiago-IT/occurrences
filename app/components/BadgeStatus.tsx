import type { Status } from "../lib/ocorrencias";

const estilos: Record<Status, string> = {
  aberta:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  "em-analise":
    "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  resolvida:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
};

const labels: Record<Status, string> = {
  aberta: "Aberta",
  "em-analise": "Em analise",
  resolvida: "Resolvida",
};

export default function BadgeStatus({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${estilos[status]}`}
    >
      {labels[status]}
    </span>
  );
}
