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

export const CATEGORIAS: { value: Categoria; label: string }[] = [
  { value: "infraestrutura", label: "Infraestrutura" },
  { value: "seguranca", label: "Seguranca" },
  { value: "meio-ambiente", label: "Meio Ambiente" },
  { value: "saude", label: "Saude" },
  { value: "outro", label: "Outro" },
];

export const STATUS: { value: Status; label: string }[] = [
  { value: "aberta", label: "Aberta" },
  { value: "em-analise", label: "Em analise" },
  { value: "resolvida", label: "Resolvida" },
];

const STORAGE_KEY = "ocorrencias";
const CHANGE_EVENT = "ocorrencias:changed";

const categoriasValidas = new Set<string>(CATEGORIAS.map((c) => c.value));
const statusValidos = new Set<string>(STATUS.map((s) => s.value));

function isOcorrencia(valor: unknown): valor is Ocorrencia {
  if (typeof valor !== "object" || valor === null) return false;
  const o = valor as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.titulo === "string" &&
    typeof o.descricao === "string" &&
    typeof o.categoria === "string" &&
    categoriasValidas.has(o.categoria) &&
    typeof o.status === "string" &&
    statusValidos.has(o.status) &&
    typeof o.criadoEm === "string" &&
    (o.local === undefined || typeof o.local === "string")
  );
}

export function localStorageDisponivel(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const chave = "__ocorrencias_teste__";
    window.localStorage.setItem(chave, "1");
    window.localStorage.removeItem(chave);
    return true;
  } catch {
    return false;
  }
}

function persistir(ocorrencias: Ocorrencia[]): boolean {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ocorrencias));
    return true;
  } catch {
    return false;
  }
}

function notificarMudanca() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function gerarId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16);
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  window.addEventListener(CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

export function listarOcorrencias(): Ocorrencia[] {
  if (typeof window === "undefined") return [];
  try {
    const data = window.localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const parsed: unknown = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isOcorrencia);
  } catch {
    return [];
  }
}

export function buscarOcorrencia(id: string): Ocorrencia | undefined {
  return listarOcorrencias().find((o) => o.id === id);
}

export function salvarOcorrencia(
  dados: Omit<Ocorrencia, "id" | "status" | "criadoEm">,
): Ocorrencia | null {
  if (!localStorageDisponivel()) return null;
  const ocorrencias = listarOcorrencias();
  const nova: Ocorrencia = {
    ...dados,
    local: dados.local?.trim() || undefined,
    id: gerarId(),
    status: "aberta",
    criadoEm: new Date().toISOString(),
  };
  ocorrencias.unshift(nova);
  if (!persistir(ocorrencias)) return null;
  notificarMudanca();
  return nova;
}

export function atualizarStatus(id: string, status: Status): Ocorrencia | null {
  const ocorrencias = listarOcorrencias();
  const idx = ocorrencias.findIndex((o) => o.id === id);
  if (idx === -1) return null;
  ocorrencias[idx].status = status;
  if (!persistir(ocorrencias)) return null;
  notificarMudanca();
  return ocorrencias[idx];
}

export function removerOcorrencia(id: string): boolean {
  const ocorrencias = listarOcorrencias();
  const filtradas = ocorrencias.filter((o) => o.id !== id);
  if (filtradas.length === ocorrencias.length) return false;
  if (!persistir(filtradas)) return false;
  notificarMudanca();
  return true;
}
