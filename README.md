# Ocorrencias

Micro-funcao para relato e acompanhamento de ocorrencias empresariais.

## Stack

- **Next.js 16** (App Router)
- **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **React Hook Form** + **Zod** (formularios e validacao)
- **localStorage** (persistencia local)

## Funcionalidades

- Relatar ocorrencia (titulo, descricao, categoria, local)
- Listar ocorrencias com filtros por categoria e status
- Visualizar detalhes de uma ocorrencia
- Alterar status (aberta / em analise / resolvida)
- Remover ocorrencia

## Categorias

| Categoria | Descricao |
|---|---|
| `infraestrutura` | Problemas com estrutura fisica |
| `seguranca` | Incidentes de seguranca |
| `meio-ambiente` | Questoes ambientais |
| `saude` | Saude e bem-estar |
| `outro` | Outras ocorrencias |

## Como rodar

```bash
# Instalar dependencias
npm install

# Desenvolvimento
npm run dev

# Build de producao
npm run build
npm start

# Lint
npm run lint
```

## Estrutura

```
app/
  lib/
    ocorrencias.ts    # Utilitarios CRUD (localStorage)
  components/
    Header.tsx        # Navegacao
    OcorrenciaForm.tsx # Formulario com validacao Zod
    OcorrenciaCard.tsx # Card de exibicao
    BadgeStatus.tsx   # Badge de status
    BadgeCategoria.tsx # Badge de categoria
  page.tsx            # Pagina inicial
  layout.tsx          # Layout raiz
  relatar/
    page.tsx          # Formulario de relato
  ocorrencias/
    page.tsx          # Listagem com filtros
    [id]/
      page.tsx        # Detalhe da ocorrencia
```

## Persistencia

Os dados sao salvos no `localStorage` do navegador. Para uso em producao, recomenda-se integrar com uma API e banco de dados.
