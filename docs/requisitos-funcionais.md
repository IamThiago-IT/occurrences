# Requisitos Funcionais

## RF01 - Cadastro de Ocorrencia

| ID | Descricao | Prioridade |
|---|---|---|
| RF01.1 | O sistema deve permitir o cadastro de uma nova ocorrencia | Alta |
| RF01.2 | O formulario deve conter campo titulo (obrigatorio, 3-120 caracteres) | Alta |
| RF01.3 | O formulario deve conter campo descricao (obrigatorio, 10-1000 caracteres) | Alta |
| RF01.4 | O formulario deve conter campo categoria (obrigatorio, selecao unica) | Alta |
| RF01.5 | O formulario deve conter campo local (opcional, ate 200 caracteres) | Media |
| RF01.6 | O sistema deve validar todos os campos antes de salvar | Alta |
| RF01.7 | O sistema deve gerar um ID unico (UUID) para cada ocorrencia | Alta |
| RF01.8 | A ocorrencia deve ser criada com status "Aberta" por padrao | Alta |
| RF01.9 | A data/hora do registro deve ser registrada automaticamente | Alta |

## RF02 - Listagem de Ocorrencias

| ID | Descricao | Prioridade |
|---|---|---|
| RF02.1 | O sistema deve listar todas as ocorrencias registradas | Alta |
| RF02.2 | As ocorrencias devem ser ordenadas por data de criacao (decrescente) | Alta |
| RF02.3 | Cada item da lista deve exibir: titulo, local, categoria, status e data | Alta |
| RF02.4 | O sistema deve exibir o total de ocorrencias encontradas | Media |
| RF02.5 | Se nao houver ocorrencias, exibir mensagem "Nenhuma ocorrencia registrada" | Media |

## RF03 - Filtragem de Ocorrencias

| ID | Descricao | Prioridade |
|---|---|---|
| RF03.1 | O sistema deve permitir filtrar por categoria | Media |
| RF03.2 | O sistema deve permitir filtrar por status | Media |
| RF03.3 | Os filtros devem funcionar de forma combinada (AND) | Media |
| RF03.4 | O contador de resultados deve atualizar em tempo real | Media |
| RF03.5 | Opcao "Todas categorias" e "Todos status" deve resetar o filtro | Media |

## RF04 - Visualizacao de Detalhes

| ID | Descricao | Prioridade |
|---|---|---|
| RF04.1 | O sistema deve exibir todos os dados de uma ocorrencia | Alta |
| RF04.2 | A descricao completa deve ser exibida sem truncamento | Alta |
| RF04.3 | Deve exibir data/hora formatada em pt-BR | Media |
| RF04.4 | Deve exibir badges visuais para categoria e status | Media |
| RF04.5 | Deve haver botao de voltar para a listagem | Alta |

## RF05 - Gerenciamento de Status

| ID | Descricao | Prioridade |
|---|---|---|
| RF05.1 | O sistema deve permitir alterar o status de uma ocorrencia | Alta |
| RF05.2 | Status disponiveis: Aberta, Em Analise, Resolvida | Alta |
| RF05.3 | O status atual deve estar destacado e desabilitado | Media |
| RF05.4 | A alteracao deve ser aplicada imediatamente sem confirmacao adicional | Media |

## RF06 - Remocao de Ocorrencia

| ID | Descricao | Prioridade |
|---|---|---|
| RF06.1 | O sistema deve permitir remover uma ocorrencia | Alta |
| RF06.2 | Uma confirmacao deve ser solicitada antes da remocao | Alta |
| RF06.3 | Apos remocao, o usuario deve ser redirecionado para a listagem | Media |
| RF06.4 | A remocao deve ser permanente (sem possibilidade de desfazer) | Alta |

## RF07 - Persistencia

| ID | Descricao | Prioridade |
|---|---|---|
| RF07.1 | Os dados devem ser persistidos no localStorage do navegador | Alta |
| RF07.2 | Os dados devem sobreviver ao fechamento e reabertura da pagina | Alta |
| RF07.3 | A aplicacao deve funcionar sem conexao com a internet | Alta |

## RF08 - Navegacao

| ID | Descricao | Prioridade |
|---|---|---|
| RF08.1 | Deve haver navegacao entre as paginas: Inicio, Relatar, Ocorrencias | Alta |
| RF08.2 | A rota ativa deve estar destacada na navegacao | Media |
| RF08.3 | A navegacao deve ser instantanea (client-side) | Alta |
