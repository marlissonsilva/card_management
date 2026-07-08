# Card Management

Sistema de controle de compras no cartão de crédito.

## Problema a ser resolvido

Resolver o problema de quem divide o cartão com familiares/amigos e perde o controle
de "quem deve quanto" na fatura. O sistema centraliza as transações e calcula
automaticamente a parte de cada membro na fatura mensal.

### Contexto do problema

Várias pessoas fazem compras em um cartão só, e no fechamento da fatura dá um pouco
de trabalho para o titular lembrar o que cada um comprou e somar os valores para
cada comprador efetuar o pagamento da sua parte na fatura.

## Funcionalidades

- Cadastro do titular
- Registro de compra
  - A vista
  - Parcelada
  - Divisão por meses quando for parcelada (igual a do banco)
- Soma(por responsável da compra)
- Relatório
- Cobrança

### Detalhamento das funcionalidades

**Cadastro do titular:**

- Name (username)
- Email (email)
- Senha (password)
- Data de fechamento da fatura (invoice_closing)

**Registro de compra:**

- Valor (amount)
- Descrição (description)
- Responsável (member)
- Data da compra (date_purchase)
- Parcelamento - quantidade de vezes (installments)

**Soma:**

- O sistema deve isolar as compras com base na data de fechamento da fatura
(geralmente de 7 a 10 dias antes do vencimento).

- Exemplo: Fulano fez compras de R$ 100,00 e R$ 300,00 que caem na fatura atual.
O sistema soma (R$ 400,00) e exibe no painel do mês vigente.

- Parcelas devem ser projetadas para os meses futuros correspondentes.

**Relatório:**

- Ver informações que sejam pertinentes e poder ter todo o historico das compras
  que compoem cada fatura.

**Cobrança:**

- Ter um botão que gera um texto de cobrança
- Exemplo: "Fala [Membro], sua parte na fatura deste mês deu R$ [Valor].
As compras foram: [Descrição 1, Valor 1], [Descrição 2, Valor 2].
O vencimento é dia [Data]. Valeu!"
