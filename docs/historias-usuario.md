# Historias de Usuario

## US01 - Relatar uma Ocorrencia

**Como** usuario do sistema,
**Eu quero** relatar uma ocorrencia preenchendo um formulario,
**Para que** a empresa tome conhecimento e possa tomar providencias.

### Criterios de Aceite

- [ ] O formulario deve conter campos: titulo (obrigatorio), descricao (obrigatoria), categoria (obrigatoria), local (opcional)
- [ ] Titulo deve ter entre 3 e 120 caracteres
- [ ] Descricao deve ter entre 10 e 1000 caracteres
- [ ] Categoria deve ser uma das opcoes: infraestrutura, seguranca, meio-ambiente, saude, outro
- [ ] Ao submeter com sucesso, o usuario e redirecionado para a listagem
- [ ] A ocorrencia e criada com status "Aberta" automaticamente

---

## US02 - Listar Ocorrencias

**Como** usuario do sistema,
**Eu quero** visualizar todas as ocorrencias registradas,
**Para que** eu possa acompanhar o que foi relatado.

### Criterios de Aceite

- [ ] As ocorrencias sao exibidas em ordem cronologica (mais recente primeiro)
- [ ] Cada card mostra: titulo, local (se informado), categoria, status e data
- [ ] O titulo e clicavel e leva para a pagina de detalhes
- [ ] Se nao houver ocorrencias, uma mensagem amigavel e exibida
- [ ] Um contador mostra o total de ocorrencias

---

## US03 - Filtrar Ocorrencias

**Como** usuario do sistema,
**Eu quero** filtrar ocorrencias por categoria e/ou status,
**Para que** eu encontre rapidamente o que preciso.

### Criterios de Aceite

- [ ] Disponivel um seletor de categoria com opcao "Todas categorias"
- [ ] Disponivel um seletor de status com opcao "Todos status"
- [ ] Os filtros funcionam de forma combinada (AND)
- [ ] O contador de resultados atualiza em tempo real
- [ ] Se nenhum resultado for encontrado, mensagem informativa e exibida

---

## US04 - Visualizar Detalhes de uma Ocorrencia

**Como** usuario do sistema,
**Eu quero** ver os detalhes completos de uma ocorrencia,
**Para que** eu tenha todas as informacoes disponiveis.

### Criterios de Aceite

- [ ] Exibe titulo, descricao completa, categoria, status, local e data/hora do registro
- [ ] Exibe badges coloridos para categoria e status
- [ ] Possui botao "Voltar" para retornar a listagem
- [ ] Possui opcao de alterar status
- [ ] Possui opcao de remover a ocorrencia

---

## US05 - Alterar Status de uma Ocorrencia

**Como** usuario do sistema,
**Eu quero** alterar o status de uma ocorrencia,
**Para que** eu possa acompanharm a evolucao do atendimento.

### Criterios de Aceite

- [ ] Status disponiveis: Aberta, Em Analise, Resolvida
- [ ] Botao do status atual fica destacado e desabilitado
- [ ] Ao clicar em outro status, a mudanca e aplicada imediatamente
- [ ] O badge de status e atualizado na tela sem recarregar

---

## US06 - Remover uma Ocorrencia

**Como** usuario do sistema,
**Eu quero** remover uma ocorrencia que nao e mais necessaria,
**Para que** a lista fique organizada e relevante.

### Criterios de Aceite

- [ ] Botao "Remover Ocorrencia" disponivel na pagina de detalhe
- [ ] Ao clicar, uma confirmacao e exibida antes de remover
- [ ] Se confirmado, a ocorrencia e removida permanentemente
- [ ] Se cancelado, nenhuma acao e tomada
- [ ] Apos remocao, o usuario e redirecionado para a listagem
