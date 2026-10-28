import fs from "node:fs";
import path from "node:path";

const q = (value) => JSON.stringify(value);

function yamlList(items) {
  return items.map((item) => `  - ${q(item)}`).join("\n");
}

function yamlSources(items) {
  return items
    .map((item) => `  - label: ${q(item.label)}\n    href: ${q(item.href)}`)
    .join("\n");
}

const entries = [
  {
    file: "content/vale-a-pena/financiar-carro-ou-pagar-a-vista.mdx",
    image: "/images/vale-a-pena/carro-hero.svg",
    fontes: [
      {
        label: "Banco Central do Brasil — taxas de juros por modalidade",
        href: "https://www.bcb.gov.br/estatisticas/txjuros",
      },
      {
        label: "Fundação Instituto de Pesquisas Econômicas — Tabela FIPE",
        href: "https://veiculos.fipe.org.br/",
      },
      {
        label: "Procon-SP — Custo Efetivo Total (CET) nas operações de crédito",
        href: "https://www.procon.sp.gov.br/",
      },
    ],
    acoes: [
      "Peça por escrito o CET e o valor total a prazo antes de assinar qualquer contrato.",
      "Negocie o desconto à vista: 5% já viram R$ 5 mil em um carro de R$ 100 mil.",
      "Escolha o menor prazo que a parcela suporta e simule a quitação antecipada.",
      "Some seguro, IPVA, manutenção e depreciação ao custo mensal — a parcela não é o custo do carro.",
    ],
    figures: [
      {
        before: "### 2. O CET não é a taxa de vitrine",
        html: `<Figura
  src="/images/vale-a-pena/carro-juros.svg"
  alt="Gráfico de barras comparando preço à vista, juros do financiamento e ganho do investimento"
  legenda="Os juros do financiamento e o ganho do investimento quase se anulam. O que sobra é a depreciação — e ela não aparece na parcela."
/>`,
      },
      {
        before: "## Quando financiar faz sentido",
        html: `<Figura
  src="/images/vale-a-pena/carro-decisao.svg"
  alt="Três cenários de decisão entre pagar à vista, financiar ou dar entrada maior"
  legenda="O veredito muda com a taxa, o desconto e o prazo. Use a calculadora para o seu cenário."
/>`,
      },
    ],
  },
  {
    file: "content/vale-a-pena/consorcio-ou-financiamento-imobiliario.mdx",
    image: "/images/vale-a-pena/consorcio-hero.svg",
    fontes: [
      {
        label: "ABAC — Associação Brasileira de Administradoras de Consórcios",
        href: "https://www.abac.org.br/",
      },
      {
        label: "Banco Central do Brasil — taxas de financiamento imobiliário",
        href: "https://www.bcb.gov.br/estatisticas/txjuros",
      },
      {
        label: "Caixa Econômica Federal — regras do FGTS na moradia",
        href: "https://www.caixa.gov.br/beneficios-trabalhador/fgts/",
      },
    ],
    acoes: [
      "Peça à administradora o histórico de contemplações e o número de cotas ativas do grupo.",
      "Some taxa de administração, fundo de reserva e correção anual para achar o custo total.",
      "Coloque o aluguel da espera na conta: ele pode consumir boa parte da economia.",
      "Só entre no consórcio com dinheiro que não será necessário nos próximos anos.",
    ],
    figures: [
      {
        before: "## O risco que o consórcio esconde",
        html: `<Figura
  src="/images/vale-a-pena/consorcio-custo.svg"
  alt="Gráfico comparando custo do financiamento, do consórcio e do aluguel durante a espera"
  legenda="O consórcio tem taxa menor, mas a espera tem preço. O aluguel entra na conta e reduz a economia."
/>`,
      },
      {
        before: "## Lado a lado",
        html: `<Figura
  src="/images/vale-a-pena/consorcio-decisao.svg"
  alt="Quadro comparativo com três caminhos: financiamento, consórcio e alugar e investir"
  legenda="A pergunta decisiva não é o custo no papel, é o seu calendário: quando você precisa das chaves?"
/>`,
      },
    ],
  },
  {
    file: "content/vale-a-pena/vale-a-pena-parcelar-sem-juros.mdx",
    image: "/images/vale-a-pena/parcelar-hero.svg",
    fontes: [
      {
        label: "Banco Central do Brasil — Calculadora do cidadão",
        href: "https://www.bcb.gov.br/calculadora",
      },
      {
        label: "Idec — direitos do consumidor em compras parceladas",
        href: "https://idec.org.br/",
      },
      {
        label: "Receita Federal — tributação de renda fixa",
        href: "https://www.gov.br/receitafederal/",
      },
    ],
    acoes: [
      "Peça sempre os dois preços: à vista e parcelado. Sem isso, não existe comparação.",
      "Converta o desconto em taxa mensal equivalente antes de decidir.",
      "Só parcele se o dinheiro ficar investido — e automatize o pagamento das parcelas.",
      "Some todas as parcelas já comprometidas antes de assumir uma nova.",
    ],
    figures: [
      {
        before: "## O que “sem juros” esconde",
        html: `<Figura
  src="/images/vale-a-pena/parcelar-desconto.svg"
  alt="Gráfico comparando o saldo final de quem paga à vista e de quem parcela em 10 vezes"
  legenda="A diferença é pequena no cenário base: R$ 32,19. Mas ela existe — e cresce com o valor da compra."
/>`,
      },
      {
        before: "## Teste com os seus números",
        html: `<Figura
  src="/images/vale-a-pena/parcelar-decisao.svg"
  alt="Três cenários de decisão sobre parcelar ou pagar à vista"
  legenda="O “sem juros” não é o critério. O desconto à vista e a disciplina de investir são."
/>`,
      },
    ],
    extra: {
      before: "## Teste com os seus números",
      text: `## O erro de olhar só a parcela

A parcela é a parte visível da compra. O erro clássico é comparar “R$ 300 por mês” com o salário, concluir que cabe e não olhar para o total. Em 10 meses, são R$ 3.000; em 24, R$ 7.200. Quando você soma três compras parceladas, a fatura vira uma segunda renda — e o orçamento não foi feito para ela.

Há também o efeito no limite do cartão. Cada compra parcelada ocupa limite até a última parcela. Se você usa 70% do limite em parcelamentos longos, sobra pouco espaço para o imprevisto — e o imprevisto, quando chega, vai para o rotativo. Parcelar sem mapa é uma forma silenciosa de reduzir a sua margem de segurança.

Por isso, a pergunta certa não é “quantas vezes posso dividir?”, mas “quanto isso compromete dos próximos meses?”. Se a resposta passar de 10% da renda líquida, a compra precisa esperar ou ser repensada.

## O que fazer na loja

Peça o preço à vista mesmo quando a etiqueta só mostra o parcelado. Muitas lojas dão desconto de 5% a 10% para pagamento imediato, e esse desconto costuma ser maior que o rendimento do dinheiro no prazo. Se o vendedor disser que “não tem desconto”, pergunte se há diferença no PIX ou no débito.

Depois, faça a conta em 30 segundos: divida o desconto pelo preço à vista e compare com o rendimento líquido mensal. Um desconto de 5% em 10 meses equivale a 0,94% ao mês; em 24 meses, a cerca de 0,39%. O prazo longo dilui o desconto e favorece o parcelamento — desde que o dinheiro fique investido.

Por fim, registre a compra no orçamento do mês em que a parcela vence, não no mês da compra. É assim que você enxerga o comprometimento real e evita a surpresa da fatura.`,
    },
  },
  {
    file: "content/vale-a-pena/reserva-de-emergencia-quanto-guardar.mdx",
    image: "/images/vale-a-pena/reserva-hero.svg",
    fontes: [
      {
        label: "Banco Central do Brasil — taxa Selic e juros básicos",
        href: "https://www.bcb.gov.br/controleinflacao/taxaselic",
      },
      {
        label: "Tesouro Direto — Tesouro Selic",
        href: "https://www.tesourodireto.com.br/",
      },
      {
        label: "Fundo Garantidor de Créditos — cobertura do FGC",
        href: "https://www.fgc.org.br/",
      },
    ],
    acoes: [
      "Calcule o custo essencial somando moradia, comida, transporte, saúde e dívidas obrigatórias.",
      "Escolha um produto líquido e seguro: Tesouro Selic ou CDB de liquidez diária de banco sólido.",
      "Automatize o aporte no dia do salário e aumente junto com o reajuste.",
      "Revise o valor da reserva uma vez por ano e a cada mudança de renda ou despesa fixa.",
    ],
    figures: [
      {
        before: "## O que é (e o que não é) emergência",
        html: `<Figura
  src="/images/vale-a-pena/reserva-meses.svg"
  alt="Gráfico com o aporte mensal necessário para chegar a R$ 31.200 em 12, 24 e 36 meses"
  legenda="O prazo muda o esforço: quanto mais tempo, menor o aporte mensal necessário para chegar ao mesmo valor."
/>`,
      },
      {
        before: "## A ordem certa",
        html: `<Figura
  src="/images/vale-a-pena/reserva-decisao.svg"
  alt="Quadro com o tamanho da reserva para CLT, renda variável e PJ"
  legenda="O tamanho certo depende do contrato de trabalho e da rede de apoio, não de uma regra universal."
/>`,
      },
    ],
  },
  {
    file: "content/vale-a-pena/rotativo-do-cartao-quanto-custa-pagar-o-minimo.mdx",
    image: "/images/vale-a-pena/rotativo-hero.svg",
    fontes: [
      {
        label: "Lei 14.690/2023 — limite de juros e encargos do rotativo",
        href: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2023/lei/l14690.htm",
      },
      {
        label: "Banco Central do Brasil — taxas de cartão de crédito",
        href: "https://www.bcb.gov.br/estatisticas/txjuros",
      },
      {
        label: "Consumidor.gov.br — renegociação de dívidas",
        href: "https://www.consumidor.gov.br/",
      },
    ],
    acoes: [
      "Pare de usar o cartão hoje: cada nova compra reinicia o ciclo do rotativo.",
      "Some a dívida total, incluindo parcelados e limites, antes de negociar.",
      "Peça ao banco o parcelamento da fatura e compare o CET com um empréstimo pessoal.",
      "Reduza ou cancele o limite que você não usa para não voltar à dívida.",
    ],
    figures: [
      {
        before: "## As três saídas",
        html: `<Figura
  src="/images/vale-a-pena/rotativo-minimo.svg"
  alt="Gráfico com o tempo para quitar R$ 5.000 pagando o mínimo, com e sem teto, e pagando R$ 1.000 por mês"
  legenda="O mínimo mantém a dívida viva. Com o teto legal, o prazo cai de 123 para 31 meses — ainda são quase três anos."
/>`,
      },
      {
        before: "## Lado a lado",
        html: `<Figura
  src="/images/vale-a-pena/rotativo-saidas.svg"
  alt="Quadro com três saídas para a dívida do cartão: pagar mais, trocar a dívida e renegociar"
  legenda="O objetivo é trocar a dívida cara por uma mais barata — e não voltar ao cartão depois."
/>`,
      },
    ],
    extra: {
      before: "## As três saídas",
      text: `## Por que o mínimo não reduz a dívida

O pagamento mínimo é calculado como um percentual da fatura, normalmente entre 15% e 20%. Parece um alívio, mas ele é desenhado para manter a dívida viva. No primeiro mês do exemplo, você paga R$ 750 e R$ 625 viram juros: só R$ 125 abatem o principal. No mês seguinte, os juros são calculados sobre R$ 4.875, e a fatura continua alta.

É uma armadilha matemática, não moral. Quem paga o mínimo está financiando o consumo do mês passado a uma das taxas mais altas do mundo. O teto legal de 100% limita o tamanho do rombo, mas não muda a lógica: enquanto o principal não cai, os juros continuam.

A saída começa com um número desconfortável: o total da dívida, não a parcela. Some fatura atual, parcelados, empréstimos e limites usados. Depois, compare o custo total de cada caminho — mínimo, parcelamento da fatura, empréstimo pessoal, portabilidade — e escolha o menor CET que caiba no orçamento.

## O que fazer nos primeiros 7 dias

1. Cancele compras recorrentes no cartão e retire o cartão das carteiras digitais.
2. Ligue para o banco antes do vencimento e peça o parcelamento da fatura.
3. Peça por escrito o CET, o valor total e o número de parcelas.
4. Se a taxa do parcelamento for alta, simule um empréstimo pessoal em outro banco.
5. Depois de quitar, mantenha o limite baixo e pague a fatura integralmente por seis meses.

O rotativo não se resolve com força de vontade; resolve-se com fluxo de caixa e uma dívida mais barata. A parte difícil é aceitar que o caminho mais confortável — pagar o mínimo — é o mais caro.`,
    },
  },
  {
    file: "content/vale-a-pena/comprar-ou-alugar-imovel.mdx",
    image: "/images/vale-a-pena/alugar-hero.svg",
    fontes: [
      {
        label: "Banco Central do Brasil — taxas de financiamento imobiliário",
        href: "https://www.bcb.gov.br/estatisticas/txjuros",
      },
      {
        label: "FipeZap — índice de preços de aluguel e venda",
        href: "https://www.fipe.org.br/",
      },
      {
        label: "IBGE — Pesquisa Nacional por Amostra de Domicílios",
        href: "https://www.ibge.gov.br/",
      },
    ],
    acoes: [
      "Calcule a relação aluguel/preço: abaixo de 0,44% ao mês, alugar tende a ganhar.",
      "Defina o horizonte: abaixo de 5 anos, custos de compra e venda pesam contra comprar.",
      "Automatize o investimento da diferença no mesmo dia do salário.",
      "Inclua manutenção (cerca de 1% ao ano) e custos de venda (cerca de 6%) na conta do comprador.",
    ],
    figures: [
      {
        before: "## Teste com os seus números",
        html: `<Figura
  src="/images/vale-a-pena/alugar-patrimonio.svg"
  alt="Gráfico com o patrimônio de quem aluga e investe em quatro cenários de aluguel, comparado ao patrimônio de quem compra"
  legenda="A linha tracejada é o patrimônio do comprador. O ponto de virada está em R$ 2.707 de aluguel."
/>`,
      },
      {
        before: "## Três perguntas antes de decidir",
        html: `<Figura
  src="/images/vale-a-pena/alugar-decisao.svg"
  alt="Quadro com três perguntas antes de decidir entre comprar e alugar: tempo, disciplina e prêmio"
  legenda="A conta não captura tudo. Tempo, disciplina e o valor da estabilidade mudam o veredito."
/>`,
      },
    ],
  },
  {
    file: "content/blog/orcamento-que-funciona.mdx",
    image: "/images/blog/orcamento-hero.svg",
    fontes: [
      {
        label: "IBGE — Pesquisa de Orçamentos Familiares",
        href: "https://www.ibge.gov.br/estatisticas/sociais/trabalho/9050-pesquisa-de-orcamentos-familiares.html",
      },
      {
        label: "Banco Central do Brasil — Calculadora do cidadão",
        href: "https://www.bcb.gov.br/calculadora",
      },
      {
        label: "Idec — orçamento familiar e consumo consciente",
        href: "https://idec.org.br/",
      },
    ],
    acoes: [
      "Mapeie um mês real com extratos e faturas, sem usar o “mês ideal”.",
      "Separe três blocos: essenciais, estilo de vida e objetivos.",
      "Automatize o aporte dos objetivos no dia do salário.",
      "Reserve 15 minutos por semana para revisar saldos e próximas faturas.",
    ],
    figures: [
      {
        before: "## O método em cinco passos",
        html: `<Figura
  src="/images/blog/orcamento-50-30-20.svg"
  alt="Gráfico de barras com o destino de R$ 6.000 dividido entre essenciais, estilo de vida e objetivos"
  legenda="Três blocos, não trinta categorias. O orçamento precisa caber na vida para ser seguido."
/>`,
      },
    ],
    extra: {
      before: "## Três contas, não vinte",
      text: `## O orçamento de quem tem renda variável

Quem recebe comissão, freela ou renda por projeto não pode montar o orçamento com base no melhor mês. A referência deve ser a média dos últimos seis a doze meses, com uma reserva para os meses fracos. Se a renda varia muito, use o menor valor recorrente como base e trate o excedente como bônus: parte para objetivos, parte para reforçar a reserva.

Uma regra prática é separar três patamares. O **piso** cobre os essenciais e deve caber no pior mês previsível. O **meio** inclui estilo de vida e aportes regulares. O **teto** só entra quando a renda supera a média — e não vira compromisso fixo. Assim, um mês ruim não destrói o plano nem obriga a recorrer ao cartão.

Para quem é PJ, o cuidado é maior: o faturamento não é salário. Separe impostos, pró-labore, reserva e custos do negócio antes de calcular o que sobra para a vida pessoal. O orçamento doméstico começa depois dessa separação.

## Como revisar sem culpa

A revisão semanal não é para julgar gastos; é para corrigir a rota antes que o mês termine. Olhe três números: saldo da conta de gastos, total das próximas faturas e quanto já foi para os objetivos. Se a conta de gastos estourou, ajuste a categoria vizinha — não cancele o aporte.

Uma vez por mês, compare o previsto com o realizado em cada bloco. Se os essenciais passaram de 70% da renda por dois meses seguidos, o problema é estrutural: moradia, transporte ou dívida. Aí a solução não é cortar café; é renegociar contrato, mudar de bairro ou atacar a dívida.

O orçamento que funciona é o que sobrevive a um mês ruim. Se o seu só funciona no papel, simplifique.`,
    },
  },
  {
    file: "content/blog/cdi-selic-poupanca.mdx",
    image: "/images/blog/cdi-hero.svg",
    fontes: [
      {
        label: "Banco Central do Brasil — taxa Selic",
        href: "https://www.bcb.gov.br/controleinflacao/taxaselic",
      },
      {
        label: "Tesouro Direto — Tesouro Selic",
        href: "https://www.tesourodireto.com.br/",
      },
      {
        label: "Receita Federal — imposto de renda em renda fixa",
        href: "https://www.gov.br/receitafederal/",
      },
    ],
    acoes: [
      "Compare sempre o rendimento líquido, não o bruto divulgado pelo banco.",
      "Para a reserva, priorize liquidez D+0 ou D+1 e risco baixo.",
      "Confira a cobertura do FGC antes de escolher um CDB de banco pequeno.",
      "Evite produtos com carência para dinheiro que pode ser necessário.",
    ],
    figures: [
      {
        before: "## O que olhar antes de escolher",
        html: `<Figura
  src="/images/blog/cdi-rendimento.svg"
  alt="Gráfico comparando o valor líquido de R$ 10 mil em poupança, CDI e LCI em 12 meses"
  legenda="O rendimento bruto engana. O que importa é o valor líquido, depois do imposto."
/>`,
      },
    ],
    extra: {
      before: "## O erro de comparar bruto com líquido",
      text: `## Como comparar na prática

Suponha que você tenha R$ 10 mil para a reserva e três opções: poupança, CDB de 100% do CDI com liquidez diária e LCI de 90% do CDI com carência de 90 dias. A poupança rende 0,5% ao mês mais TR; o CDB rende perto do CDI, com IR regressivo; a LCI é isenta, mas fica presa por três meses.

Para a reserva, a LCI perde não por rentabilidade, mas por liquidez. Se o imprevisto acontecer no mês 2, o dinheiro não estará disponível. O CDB de liquidez diária pode render menos no papel, mas cumpre a função. A comparação correta é sempre dentro do objetivo: reserva, viagem de 2 anos ou aposentadoria têm prazos e riscos diferentes.

Outro erro é olhar só a taxa. Um CDB de 110% do CDI de um banco pequeno pode parecer melhor que um Tesouro Selic de 100%, mas o prêmio é a remuneração do risco de crédito. O FGC cobre até R$ 250 mil por CPF e instituição, com condições — e o resgate pode não ser imediato em caso de intervenção. Para valores acima do limite, diversifique.

Por fim, lembre-se do IR: a alíquota cai com o tempo. Um CDB de 361 a 720 dias paga 17,5%; acima de 720 dias, 15%. Se você resgata em 3 meses, paga 22,5% e o rendimento líquido encolhe. Para prazos curtos, a diferença entre produtos pode desaparecer.

## O que fazer com R$ 10 mil hoje

1. Mantenha de 3 a 6 meses de custo essencial em liquidez diária.
2. Compare o líquido de cada opção no mesmo prazo.
3. Não persiga 0,2% a mais trocando segurança por risco de crédito.
4. Revise a cada mudança da Selic — mas não fique trocando de produto toda semana.

A melhor aplicação é a que cumpre o objetivo com o menor risco desnecessário. Rentabilidade sem liquidez não serve para emergência.`,
    },
  },
  {
    file: "content/blog/custo-de-oportunidade-cafezinho.mdx",
    image: "/images/blog/cafe-hero.svg",
    fontes: [
      {
        label: "Banco Central do Brasil — Calculadora do cidadão",
        href: "https://www.bcb.gov.br/calculadora",
      },
      {
        label: "IBGE — inflação e poder de compra",
        href: "https://www.ibge.gov.br/",
      },
      {
        label: "Tesouro Direto — simulação de investimentos",
        href: "https://www.tesourodireto.com.br/",
      },
    ],
    acoes: [
      "Escolha um gasto recorrente e calcule o custo anual, não o diário.",
      "Decida se ele traz valor proporcional ao preço; se não, corte sem culpa.",
      "Se cortar, automatize o aporte no mesmo dia para o dinheiro não evaporar.",
      "Revise a decisão em 90 dias — o objetivo é consciência, não ascetismo.",
    ],
    figures: [
      {
        before: "## O que é custo de oportunidade",
        html: `<Figura
  src="/images/blog/cafe-tempo.svg"
  alt="Gráfico com o montante de R$ 110 por mês investidos por 10, 20 e 30 anos"
  legenda="Os mesmos R$ 110 por mês, em prazos diferentes. A constância importa mais que o valor."
/>`,
      },
    ],
    extra: {
      before: "## O café não é o ponto",
      text: `## O erro de comparar com o salário de hoje

A conta do cafezinho fica distorcida quando comparamos R$ 5 com o salário atual e concluímos que “não faz diferença”. Faz diferença no longo prazo, mas não porque R$ 5 sejam muito: porque são repetidos. O erro oposto também é comum — achar que cortar um café resolve um orçamento estruturalmente apertado. Não resolve.

O custo de oportunidade não é uma ferramenta de culpa; é uma ferramenta de prioridade. Se o gasto traz valor, ele é consumo legítimo. Se é automático, é dinheiro que sai sem decisão. A pergunta útil é: “se eu não tivesse esse gasto, o que faria com o dinheiro?”. Se a resposta for “nada”, o corte não muda a sua vida — só reduz o prazer.

Há também o custo de oportunidade do tempo. Passar duas horas comparando preços para economizar R$ 20 pode valer menos que usar esse tempo para descansar ou aprender algo que aumente a renda. A conta financeira não é a única conta.

## Como transformar consciência em patrimônio

Escolha um gasto recorrente que você não valoriza e transforme-o em aporte automático. Não tente cortar cinco coisas de uma vez; comece por uma. R$ 110 por mês parecem pouco, mas a constância faz o trabalho: em 10 anos, são R$ 21 mil; em 30, R$ 201 mil nominais.

Se o gasto traz valor, mantenha e assuma a escolha. O objetivo não é viver como monge; é saber por que você gasta. A diferença entre um orçamento consciente e um orçamento punitivo é a mesma entre escolher e se privar.

Uma última camada: o custo de oportunidade do dinheiro parado. Deixar R$ 10 mil na poupança por 10 anos também tem custo — a diferença para um título líquido. O cafezinho chama atenção, mas as decisões grandes costumam mover mais patrimônio. Use a conta para as duas.`,
    },
  },
];

for (const entry of entries) {
  let raw = fs.readFileSync(entry.file, "utf8");
  const close = raw.indexOf("\n---\n");
  if (close === -1) throw new Error(`frontmatter não encontrado: ${entry.file}`);

  let front = raw.slice(0, close);
  let body = raw.slice(close + 5);

  if (!/^image:/m.test(front)) {
    front += `\nimage: ${q(entry.image)}`;
  }
  if (!/^fontes:/m.test(front)) {
    front += `\nfontes:\n${yamlSources(entry.fontes)}`;
  }
  if (!/^acoes:/m.test(front)) {
    front += `\nacoes:\n${yamlList(entry.acoes)}`;
  }

  for (const figure of entry.figures ?? []) {
    if (body.includes(figure.before)) {
      body = body.replace(figure.before, `${figure.html}\n\n${figure.before}`);
    } else {
      console.warn("âncora não encontrada:", entry.file, figure.before);
    }
  }

  if (entry.extra && body.includes(entry.extra.before)) {
    body = body.replace(entry.extra.before, `${entry.extra.text}\n\n${entry.extra.before}`);
  }

  raw = `${front}\n---\n${body}`;
  fs.writeFileSync(entry.file, raw, "utf8");
  console.log("atualizado:", entry.file);
}
