# Regras de Negocio

## RN01 - Dados Obrigatorios

| Regra | Descricao |
|---|---|
| RN01.1 | Toda ocorrencia DEVE ter um titulo com no minimo 3 caracteres |
| RN01.2 | Toda ocorrencia DEVE ter uma descricao com no minimo 10 caracteres |
| RN01.3 | Toda ocorrencia DEVE ter uma categoria definida |
| RN01.4 | O campo local e OPCIONAL. Se nao informado, deve ser exibido como "-" na listagem |

## RN02 - Categorias

| Regra | Descricao |
|---|---|
| RN02.1 | Uma ocorrencia PERTENCE a exatamente UMA categoria |
| RN02.2 | As categorias validas sao: infraestrutura, seguranca, meio-ambiente, saude, outro |
| RN02.3 | A categoria NAO pode ser alterada apos o cadastro |
| RN02.4 | Cada categoria possui uma cor associada para identificacao visual |

## RN03 - Status

| Regra | Descricao |
|---|---|
| RN03.1 | Toda ocorrencia inicia com status "Aberta" |
| RN03.2 | Os status validos sao: Aberta, Em Analise, Resolvida |
| RN03.3 | O status PODE ser alterado a qualquer momento |
| RN03.4 | Nao existe ordem obrigatoria de transicao de status |
| RN03.5 | Uma ocorrencia "Resolvida" PODE voltar para "Aberta" ou "Em Analise" |
| RN03.6 | O status atual nao pode ser selecionado novamente (botao desabilitado) |

## RN04 - Identificacao

| Regra | Descricao |
|---|---|
| RN04.1 | Cada ocorrencia recebe um ID unico (UUID v4) no momento do cadastro |
| RN04.2 | O ID e gerado automaticamente e NAO pode ser definido pelo usuario |
| RN04.3 | O ID e imutavel apos a criacao |

## RN05 - Temporalidade

| Regra | Descricao |
|---|---|
| RN05.1 | A data/hora de criacao e registrada automaticamente no momento do cadastro |
| RN05.2 | A data/hora NAO pode ser alterada pelo usuario |
| RN05.3 | A data e exibida no formato pt-BR (DD/MM/AAAA HH:mm) |

## RN06 - Ordenacao

| Regra | Descricao |
|---|---|
| RN06.1 | As ocorrencias sao exibidas da mais recente para a mais antiga |
| RN06.2 | A ordenacao e fixa (nao pode ser alterada pelo usuario) |

## RN07 - Filtragem

| Regra | Descricao |
|---|---|
| RN07.1 | Os filtros de categoria e status funcionam de forma combinada (AND) |
| RN07.2 | Filtros sao aplicados sobre a lista completa de ocorrencias |
| RN07.3 | Ao selecionar "Todas categorias" ou "Todos status", o respectivo filtro e removido |
| RN07.4 | O contador de resultados reflete apenas as ocorrencias visiveis apos filtragem |

## RN08 - Remocao

| Regra | Descricao |
|---|---|
| RN08.1 | A remocao de uma ocorrencia e PERMANENTE e IRREVERSIVEL |
| RN08.2 | Uma confirmacao OBRIGATORIA deve ser solicitada antes da remocao |
| RN08.3 | Apos a remocao, o usuario deve ser redirecionado para a listagem |
| RN08.4 | A ocorrencia removida NAO pode ser recuperada |

## RN09 - Persistencia

| Regra | Descricao |
|---|---|
| RN09.1 | Todos os dados sao persistidos exclusivamente no localStorage |
| RN09.2 | Os dados sao compartilhados entre abas do mesmo navegador via evento "storage" |
| RN09.3 | Limpar o cache do navegador resulta em PERDA TOTAL dos dados |
| RN09.4 | Nao existe sincronizacao com servidor ou banco de dados externo |
