export const site = {
  name: "Sobraria",
  wordmark: "sobraria",
  domain: "sobraria.com.br",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://sobraria.com.br").replace(/\/$/, ""),
  title: "Sobraria — a matemática da decisão",
  description:
    "Finanças pessoais em números: cada decisão com veredito, conta passo a passo e calculadora para testar com os seus números.",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contato@sobraria.com.br",
  locale: "pt_BR",
  twitter: "@sobraria",
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "",
  newsletterEndpoint: process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT ?? "",
  contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "",
} as const;

export const categories = ["Carro", "Casa", "Dívidas", "Dia a Dia", "Benefícios"] as const;
export type Categoria = (typeof categories)[number];

export const categoryInfo: Record<Categoria, { description: string }> = {
  Carro: {
    description: "Financiamento, à vista, depreciação e o custo real de trocar de carro.",
  },
  Casa: {
    description: "Comprar, alugar, consórcio e financiamento imobiliário sem romantismo.",
  },
  Dívidas: {
    description: "Cartão, rotativo, empréstimo e o preço de adiar a decisão.",
  },
  "Dia a Dia": {
    description: "Parcelar, assinar, comprar no impulso: as contas pequenas que somam.",
  },
  Benefícios: {
    description: "Reserva, FGTS, seguro-desemprego e as proteções que cabem no orçamento.",
  },
};

export type CalculatorType =
  | "financiamento-vs-vista"
  | "juros-compostos"
  | "rotativo-cartao"
  | "reserva-emergencia"
  | "hora-trabalho"
  | "comprar-vs-alugar"
  | "prazo-financiamento";

export const calculators: Array<{
  type: CalculatorType;
  title: string;
  short: string;
  description: string;
}> = [
  {
    type: "financiamento-vs-vista",
    title: "Parcelar ou pagar à vista?",
    short: "Financiamento x à vista",
    description:
      "Compare a parcela, os juros e o rendimento do dinheiro para saber qual opção deixa mais no bolso.",
  },
  {
    type: "juros-compostos",
    title: "Juros compostos",
    short: "Juros compostos",
    description:
      "Veja quanto um aporte inicial e contribuições mensais viram ao longo do tempo, com juros sobre juros.",
  },
  {
    type: "rotativo-cartao",
    title: "Rotativo do cartão",
    short: "Rotativo do cartão",
    description:
      "Descubra quanto custa pagar o mínimo da fatura e em quanto tempo a dívida realmente termina.",
  },
  {
    type: "reserva-emergencia",
    title: "Reserva de emergência",
    short: "Reserva de emergência",
    description:
      "Calcule o colchão ideal a partir do seu custo essencial e veja quanto guardar por mês para chegar lá.",
  },
  {
    type: "hora-trabalho",
    title: "Quanto custa em horas de trabalho?",
    short: "Horas de trabalho",
    description:
      "Transforme o preço de qualquer compra no tempo de vida que você precisa trabalhar para pagá-la.",
  },
  {
    type: "comprar-vs-alugar",
    title: "Comprar ou alugar?",
    short: "Comprar x alugar",
    description:
      "Coloque entrada, parcela, aluguel, valorização e rendimento no mesmo cenário e compare patrimônio.",
  },
  {
    type: "prazo-financiamento",
    title: "20 ou 30 anos de financiamento?",
    short: "Prazo do financiamento",
    description:
      "Compare a parcela e os juros de dois prazos e veja o que acontece se você investir a diferença.",
  },
];

export const calculatorByType = Object.fromEntries(
  calculators.map((calculator) => [calculator.type, calculator]),
) as Record<CalculatorType, (typeof calculators)[number]>;

export const socialLinks = {
  instagram: "https://instagram.com/sobraria",
  linkedin: "https://linkedin.com/company/sobraria",
} as const;
