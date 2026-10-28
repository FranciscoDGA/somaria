import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Calculadora } from "@/components/calculators/Calculadora";
import { JsonLd } from "@/components/JsonLd";
import { ArrowRight, Calculator } from "@/components/Icons";
import { copy } from "@/lib/copy";
import { calculators, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Calculadoras financeiras gratuitas",
  description:
    "Simule financiamento x à vista, juros compostos, rotativo do cartão, reserva de emergência, horas de trabalho e comprar x alugar. Sem cadastro.",
  alternates: { canonical: "/calculadoras" },
  openGraph: {
    title: "Calculadoras — Sobraria",
    description:
      "As mesmas contas dos artigos, abertas para você trocar os números. Sem cadastro e sem pegadinha.",
    url: `${site.url}/calculadoras`,
  },
};

export default function CalculadorasPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Calculadoras financeiras",
    description:
      "Calculadoras gratuitas para decisões de financiamento, dívida, reserva e moradia.",
    url: `${site.url}/calculadoras`,
    inLanguage: "pt-BR",
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: calculators.length,
      itemListElement: calculators.map((calculator, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: calculator.title,
        url: `${site.url}/calculadoras#${calculator.type}`,
      })),
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40" />
        <div aria-hidden="true" className="hero-glow absolute inset-0" />
        <div className="container-page relative py-14 sm:py-16">
          <Breadcrumbs items={[{ label: "Calculadoras" }]} />
          <p className="eyebrow">{copy.calculatorsPage.eyebrow}</p>
          <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-[-0.04em] text-ink sm:text-5xl lg:text-6xl">
            {copy.calculatorsPage.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-2">
            {copy.calculatorsPage.subtitle}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {calculators.map((calculator) => (
              <a
                key={calculator.type}
                href={`#${calculator.type}`}
                className="group flex items-center justify-between gap-3 rounded-field border border-line bg-bg-1/50 px-4 py-3 transition-colors hover:border-green/40"
              >
                <span className="flex items-center gap-2.5 text-xs font-semibold text-ink">
                  <Calculator size={14} className="text-green" />
                  {calculator.short}
                </span>
                <ArrowRight
                  size={14}
                  className="text-ink-2/75 transition-transform group-hover:translate-x-0.5 group-hover:text-green"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <p className="max-w-3xl rounded-card border border-amber/20 bg-amber/[0.03] px-5 py-4 text-xs leading-relaxed text-ink-2">
          <strong className="font-semibold text-amber">Como ler os resultados.</strong>{" "}
          {copy.calculatorsPage.note} As calculadoras não acessam seus dados, não pedem cadastro e
          rodam inteiramente no seu navegador.
        </p>

        <div className="mt-12 space-y-16">
          {calculators.map((calculator, index) => (
            <div key={calculator.type}>
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-green">
                    Calculadora {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                    {calculator.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-2">
                    {calculator.description}
                  </p>
                </div>
                <Link
                  href="/vale-a-pena"
                  className="shrink-0 text-xs font-semibold text-green hover:opacity-80"
                >
                  Ver artigos com contas
                </Link>
              </div>
              <Calculadora type={calculator.type} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
