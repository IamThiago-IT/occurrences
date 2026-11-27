# Changelog

Todas as mudanças relevantes deste projeto são documentadas neste arquivo.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e o
versionamento segue [SemVer](https://semver.org/lang/pt-BR/).

## [1.1.0] - 2026-11-26

### Corrigido

- Leitura do `localStorage` não quebra mais com dados corrompidos ou ausentes;
  registros inválidos são descartados em vez de derrubar a interface.
- A aplicação detecta `localStorage` indisponível (modo privado ou bloqueado)
  e exibe erro ao salvar, remover ou atualizar o status.
- A página de detalhe agora exibe "Ocorrência não encontrada" com link de volta
  para a listagem, em vez de "Carregando..." infinito.
- Geração de ID com fallback para navegadores sem `crypto.randomUUID`
  (contextos não seguros/HTTP).
- Alterações passam a refletir na mesma aba sem depender de recarregar a página
  ou de um evento `storage` disparado manualmente.

### Alterado

- Campos `titulo`, `descricao` e `local` são normalizados (`trim`) antes da
  validação e do salvamento.
- `local` vazio deixa de ser persistido como string vazia.
- Opções de categoria e status centralizadas em `app/lib/ocorrencias.ts`.
- Filtros da listagem receberam rótulos acessíveis (`aria-label`) e os botões
  de status usam `aria-pressed`.
- Versão do `package.json` alinhada ao versionamento das releases.

### Adicionado

- Mensagem de erro no formulário quando o navegador não consegue persistir a
  ocorrência.
- `CHANGELOG.md`.

## [1.0.0] - 2026-08-26

### Adicionado

- Relato de ocorrências (título, descrição, categoria e local).
- Listagem com filtros por categoria e status.
- Página de detalhe com alteração de status e remoção.
- Persistência via `localStorage`.
- Formulários com validação (React Hook Form + Zod).
- Dark mode automático.
- Documentação: UML de caso de uso, histórias de usuário, requisitos
  funcionais, requisitos não funcionais e regras de negócio.
