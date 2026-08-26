export type Categoria =
  | "infraestrutura"
  | "seguranca"
  | "meio-ambiente"
  | "saude"
  | "outro";

export type Status = "aberta" | "em-analise" | "resolvida";

export interface Ocorrencia {
  id: string;
  titulo: string;
  descricao: string;
  categoria: Categoria;
  local?: string;
  status: Status;
  criadoEm: string;
}

const STORAGE_KEY = "ocorrencias";

export function listarOcorrencias(): Ocorrencia[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  return JSON.parse(data) as Ocorrencia[];
}

export function buscarOcorrencia(id: string): Ocorrencia | undefined {
  return listarOcorrencias().find((o) => o.id === id);
}

export function salvarOcorrencia(
  dados: Omit<Ocorrencia, "id" | "status" | "criadoEm">,
): Ocorrencia {
  const ocorrencias = listarOcorrencias();
  const nova: Ocorrencia = {
    ...dados,
    id: crypto.randomUUID(),
    status: "aberta",
    criadoEm: new Date().toISOString(),
  };
  ocorrencias.unshift(nova);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ocorrencias));
  return nova;
}

export function atualizarStatus(id: string, status: Status): Ocorrencia | null {
  const ocorrencias = listarOcorrencias();
  const idx = ocorrencias.findIndex((o) => o.id === id);
  if (idx === -1) return null;
  ocorrencias[idx].status = status;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ocorrencias));
  return ocorrencias[idx];
}

export function removerOcorrencia(id: string): boolean {
  const ocorrencias = listarOcorrencias();
  const filtradas = ocorrencias.filter((o) => o.id !== id);
  if (filtradas.length === ocorrencias.length) return false;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtradas));
  return true;
}
