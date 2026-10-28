import type { Metadata } from "next";

import { ArchiveSearch } from "@/components/ArchiveSearch";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { copy } from "@/lib/copy";
import { getValeArticles } from "@/lib/content";
import { categories, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Vale a pena? Decisões de dinheiro com a conta aberta",
  description:
    "Financiar ou pagar à vista, comprar ou alugar, consórcio ou financiamento: cada decisão com veredito, conta passo a passo e calculadora.",
  alternates: { canonical: "/vale-a-pena" },
  openGraph: {
    title: "Vale a pena? — Sobraria",
    description:
      "Perguntas de dinheiro respondidas com conta, não com opinião. Busque por assunto ou navegue por categoria.",
    url: `${site.url}/vale-a-pena`,
  },
};

export default async function ValeAPenaPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const params = await searchParams;
  const articles = getValeArticles();
  const initialCategory =
    params.categoria && categories.includes(params.categoria as (typeof categories)[number])
      ? params.categoria
      : "";

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Vale a pena?",
    description:
      "Arquivo de decisões financeiras respondidas com matemática, premissas abertas e calculadoras.",
    url: `${site.url}/vale-a-pena`,
    inLanguage: "pt-BR",
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: article.title,
        url: `${site.url}/vale-a-pena/${article.slug}`,
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
          <Breadcrumbs items={[{ label: "Vale a pena?" }]} />
          <p className="eyebrow">{copy.archive.eyebrow}</p>
          <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-[-0.04em] text-ink sm:text-5xl lg:text-6xl">
            {copy.archive.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-2">
            {copy.archive.subtitle}
          </p>
        </div>
      </section>

      <section className="container-page py-10 sm:py-12">
        <ArchiveSearch articles={articles} initialCategory={initialCategory} />
      </section>
    </>
  );
}
