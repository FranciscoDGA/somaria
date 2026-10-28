import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { NewsletterBlock } from "@/components/NewsletterBlock";
import { Check } from "@/components/Icons";
import { copy } from "@/lib/copy";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre a Sobraria",
  description:
    "Quem escreve, como as contas são feitas e por que a Sobraria não vende recomendação de investimento. Método, princípios e transparência.",
  alternates: { canonical: "/sobre" },
};

const process = [
  {
    number: "01",
    title: "Escolha da pergunta",
    text: "Partimos de dúvidas reais de busca e de leitores. A pergunta precisa ter uma decisão concreta e um número no fim — “vale a pena?” em vez de “o que é?”.",
  },
  {
    number: "02",
    title: "Premissas verificáveis",
    text: "Taxas, prazos e tributos vêm de fontes oficiais ou de simuladores de instituições financeiras. Cada premissa fica escrita no artigo, com link.",
  },
  {
    number: "03",
    title: "Conta reproduzível",
    text: "A matemática é aberta passo a passo e replicada em uma calculadora. Você pode discordar de uma premissa e refazer a conta com os seus números.",
  },
  {
    number: "04",
    title: "Revisão e atualização",
    text: "Todo artigo passa por revisão de clareza e checagem de números. Quando uma regra muda, o texto é atualizado e a data de modificação é registrada.",
  },
];

export default function SobrePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Sobre a Sobraria",
    url: `${site.url}/sobre`,
    inLanguage: "pt-BR",
    mainEntity: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      email: site.email,
      description: site.description,
      foundingDate: "2026",
      knowsAbout: [
        "finanças pessoais",
        "juros compostos",
        "financiamento imobiliário",
        "orçamento familiar",
        "dívidas",
      ],
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40" />
        <div aria-hidden="true" className="hero-glow absolute inset-0" />
        <div className="container-page relative py-14 sm:py-16">
          <Breadcrumbs items={[{ label: "Sobre" }]} />
          <p className="eyebrow">{copy.about.eyebrow}</p>
          <h1 className="mt-3 max-w-3xl text-balance text-4xl font-extrabold tracking-[-0.04em] text-ink sm:text-5xl lg:text-6xl">
            {copy.about.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-2 sm:text-lg">
            {copy.about.intro}
          </p>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink">
              {copy.about.methodTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">{copy.about.methodText}</p>

            <div className="mt-8 space-y-4">
              {process.map((step) => (
                <div key={step.number} className="rounded-card border border-line bg-bg-1/40 p-5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[10px] font-bold tracking-[0.12em] text-green">
                      {step.number}
                    </span>
                    <h3 className="font-display text-base font-bold text-ink">{step.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{step.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-card border border-green-deep/60 bg-verdict-green p-6">
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-green">
                {copy.about.principlesTitle}
              </p>
              <ul className="mt-4 space-y-4">
                {copy.about.principles.map((principle) => (
                  <li key={principle.title}>
                    <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                      <Check size={14} className="text-green" />
                      {principle.title}
                    </p>
                    <p className="mt-1 pl-6 text-xs leading-relaxed text-ink-2">
                      {principle.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-card border border-line bg-bg-1/40 p-6">
              <h2 className="font-display text-base font-bold text-ink">{copy.about.whoTitle}</h2>
              <p className="mt-2 text-xs leading-relaxed text-ink-2">{copy.about.whoText}</p>
              <Link
                href="/politica-editorial"
                className="mt-3 inline-block text-xs font-semibold text-green hover:opacity-80"
              >
                Política editorial completa
              </Link>
            </div>

            <div className="rounded-card border border-line bg-bg-1/40 p-6">
              <h2 className="font-display text-base font-bold text-ink">
                {copy.about.disclosureTitle}
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-ink-2">
                {copy.about.disclosureText}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 rounded-card border border-line bg-bg-1/40 p-6 sm:grid-cols-3 sm:p-8">
          <div>
            <p className="font-mono text-2xl font-bold text-green">0</p>
            <p className="mt-1 text-xs text-ink-2">produtos recomendados por comissão</p>
          </div>
          <div>
            <p className="font-mono text-2xl font-bold text-green">100%</p>
            <p className="mt-1 text-xs text-ink-2">das premissas escritas no artigo</p>
          </div>
          <div>
            <p className="font-mono text-2xl font-bold text-green">3 dias</p>
            <p className="mt-1 text-xs text-ink-2">para responder correções e dúvidas</p>
          </div>
        </div>
      </section>

      <section className="container-page pb-20">
        <NewsletterBlock source="sobre" />
      </section>
    </>
  );
}
