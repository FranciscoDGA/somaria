import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { Mail } from "@/components/Icons";
import { copy } from "@/lib/copy";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a Redação Sobraria: dúvidas, correções, pautas e parcerias. Respondemos em até 3 dias úteis.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contato — Sobraria",
    url: `${site.url}/contato`,
    inLanguage: "pt-BR",
    mainEntity: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      email: site.email,
    },
  };

  return (
    <>
      <JsonLd data={schema} />
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40" />
        <div aria-hidden="true" className="hero-glow absolute inset-0" />
        <div className="container-page relative py-14 sm:py-16">
          <Breadcrumbs items={[{ label: "Contato" }]} />
          <p className="eyebrow">{copy.contact.eyebrow}</p>
          <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-[-0.04em] text-ink sm:text-5xl">
            {copy.contact.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-2">
            {copy.contact.subtitle}
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-card border border-line bg-bg-1/40 p-6 sm:p-8">
            <ContactForm />
          </div>

          <div className="space-y-5">
            <div className="rounded-card border border-line bg-bg-1/40 p-6">
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-green">
                {copy.contact.emailLabel}
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-green"
              >
                <Mail size={16} className="text-green" />
                {site.email}
              </a>
              <p className="mt-4 text-xs leading-relaxed text-ink-2">
                {copy.contact.responseTime}
              </p>
            </div>

            <div className="rounded-card border border-line bg-bg-1/40 p-6">
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-green">
                {copy.contact.pressLabel}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-ink-2">
                Para imprensa, propostas de parceria e correções de dados, use o mesmo e-mail com o
                assunto “Imprensa” ou “Correção”. Não aceitamos publieditorial disfarçado de
                análise.
              </p>
              <Link
                href="/politica-editorial"
                className="mt-3 inline-block text-xs font-semibold text-green hover:opacity-80"
              >
                Ler a política editorial
              </Link>
            </div>

            <div className="rounded-card border border-green-deep/50 bg-verdict-green p-6">
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-green">
                Antes de escrever
              </p>
              <p className="mt-3 text-xs leading-relaxed text-ink-2">
                Se a dúvida é sobre uma decisão específica, mande os números: valor, taxa, prazo e
                rendimento. A resposta fica mais útil — e pode virar um artigo.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
