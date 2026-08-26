# Requisitos Nao-Funcionais

## RNF01 - Performance

| ID | Descricao | Meta |
|---|---|---|
| RNF01.1 | Tempo de carregamento inicial da pagina | < 2 segundos |
| RNF01.2 | Tempo de renderizacao apos interacao do usuario | < 100ms |
| RNF01.3 | Operacoes CRUD no localStorage | < 50ms |
| RNF01.4 | Tamanho maximo do bundle JavaScript | < 200KB (gzipped) |

## RNF02 - Usabilidade

| ID | Descricao | Meta |
|---|---|---|
| RNF02.1 | A interface deve ser responsiva (mobile-first) | Funcional em telas >= 320px |
| RNF02.2 | Suporte a modo escuro (dark mode) | Compatibilidade automatica com preferencia do SO |
| RNF02.3 | Formularios com feedback de erro em tempo real | Validacao no momento da digitacao/envio |
| RNF02.4 | Navegacao intuitiva com maximo 2 cliques para qualquer acao | Critico |
| RNF02.5 | Textos e labels em portugues (pt-BR) | Obrigatorio |

## RNF03 - Confiabilidade

| ID | Descricao | Meta |
|---|---|---|
| RNF03.1 | A aplicacao nao deve quebrar com dados corrompidos no localStorage | Tratar excecoes JSON.parse |
| RNF03.2 | A aplicacao deve funcionar mesmo sem dados no localStorage | Estado vazio tratado |
| RNF03.3 | Geracao de IDs unicos sem colisao | Uso de crypto.randomUUID() |

## RNF04 - Compatibilidade

| ID | Descricao | Meta |
|---|---|---|
| RNF04.1 | Navegadores suportados | Chrome 90+, Firefox 90+, Safari 15+, Edge 90+ |
| RNF04.2 | Resolucoes suportadas | Mobile (320px+) a Desktop (1920px+) |
| RNF04.3 | O localStorage deve estar habilitado no navegador | Verificar disponibilidade |

## RNF05 - Manutenibilidade

| ID | Descricao | Meta |
|---|---|---|
| RNF05.1 | Codigo deve seguir padrao TypeScript com tipagem estrita | zero erros de tipo |
| RNF05.2 | Componentes devem ser reutilizaveis e com responsabilidade unica | Princípio SRP |
| RNF05.3 | Logica de negocio deve estar separada da camada de presentacao | Lib separada de componentes |
| RNF05.4 | O codigo deve passar no lint sem erros | npm run lint limpo |

## RNF06 - Seguranca

| ID | Descricao | Meta |
|---|---|---|
| RNF06.1 | Nao expor dados sensiveis no localStorage | Sem chaves, tokens ou dados pessoais |
| RNF06.2 | Validacao de todos os dados de entrada | Zod schema em todas as entradas |
| RNF06.3 | O sistema nao deve aceitar scripts ou HTML nos campos de texto | Sanitizacao basica |

## RNF07 - Acessibilidade

| ID | Descricao | Meta |
|---|---|---|
| RNF07.1 | Formularios devem ter labels associados aos campos | HTML semantico |
| RNF07.2 | Botoes devem ter texto descritivo | Acessibilidade basica |
| RNF07.3 | Contraste de cores deve atender WCAG 2.1 nivel AA | Auditoria visual |
