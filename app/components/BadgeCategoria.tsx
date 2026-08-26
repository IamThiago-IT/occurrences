import type { Categoria } from "../lib/ocorrencias";

const estilos: Record<Categoria, string> = {
  infraestrutura:
    "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  seguranca:
    "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  "meio-ambiente":
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  saude:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  outro: "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300",
};

const labels: Record<Categoria, string> = {
  infraestrutura: "Infraestrutura",
  seguranca: "Seguranca",
  "meio-ambiente": "Meio Ambiente",
  saude: "Saude",
  outro: "Outro",
};

export default function BadgeCategoria({ categoria }: { categoria: Categoria }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${estilos[categoria]}`}
    >
      {labels[categoria]}
    </span>
  );
}
