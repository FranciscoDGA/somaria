import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { NewsletterForm } from "@/components/NewsletterForm";
import { Check } from "@/components/Icons";
import { copy } from "@/lib/copy";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Newsletter A Conta da Semana",
  description:
    "Uma decisão, uma conta e um veredito no seu e-mail toda quinta. Gratuito, curto e sem promessa de enriquecimento.",
  alternates: { canonical: "/newsletter" },
};

const sample = [
  { label: "A pergunta", value: "Vale trocar de carro agora ou esperar mais um ano?" },
  { label: "A conta", value: "Depreciação, juros da troca e o custo de manter o carro atual" },
  { label: "O veredito", value: "R$ 8.410 por ano — o número que decide" },
];

export default function NewsletterPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Newsletter A Conta da Semana",
    url: `${site.url}/newsletter`,
    inLanguage: "pt-BR",
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
  };

  return (
    <>
      <JsonLd data={schema} />
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40" />
        <div aria-hidden="true" className="hero-glow absolute inset-0" />
        <div className="container-page relative py-14 sm:py-16">
          <Breadcrumbs items={[{ label: "Newsletter" }]} />
          <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="eyebrow">Newsletter</p>
              <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-[-0.04em] text-ink sm:text-5xl lg:text-6xl">
                {copy.newsletter.title}
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-2">
                {copy.newsletter.subtitle}
              </p>

              <ul className="mt-7 space-y-3">
                {copy.newsletter.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5 text-sm text-ink-2">
                    <Check size={15} className="mt-0.5 shrink-0 text-green" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-card border border-green-deep/60 bg-bg-1 p-6 shadow-glow sm:p-7">
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-green">
                Assinar gratuitamente
              </p>
              <h2 className="mt-2 font-display text-xl font-extrabold text-ink">
                Uma conta por quinta.
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-ink-2">
                Sem sequência de e-mails de vendas. Sem “método secreto”. Só a conta.
              </p>
              <div className="mt-5">
                <NewsletterForm source="pagina-newsletter" variant="stacked" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink">
              O que chega no seu e-mail
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">
              Um formato fixo, para você ler em dois minutos e usar no mesmo dia. Sem texto
              patrocinado escondido: quando houver link de afiliado, ele é identificado.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-2">
              A frequência é semanal. Se uma semana não houver conta boa, não enviamos nada — e
              dizemos por quê. Você pode cancelar em um clique, sem formulário de retenção.
            </p>
            <Link
              href="/politica-de-privacidade"
              className="mt-5 inline-block text-xs font-semibold text-green hover:opacity-80"
            >
              Como tratamos seus dados
            </Link>
          </div>

          <div className="rounded-card border border-line bg-bg-1/40 p-6 sm:p-8">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-ink-2/75">
              Exemplo de edição
            </p>
            <div className="mt-5 space-y-4">
              {sample.map((item, index) => (
                <div key={item.label} className="flex gap-4">
                  <span className="font-mono text-[10px] font-bold text-green">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-2/75">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 border-t border-line pt-4 text-[11px] leading-relaxed text-ink-2/75">
              Exemplo ilustrativo. As edições reais trazem os números, as premissas e o link para a
              calculadora.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
