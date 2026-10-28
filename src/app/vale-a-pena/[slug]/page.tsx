import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AdSlot } from "@/components/AdSlot";
import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { NewsletterBlock } from "@/components/NewsletterBlock";
import { Sources } from "@/components/Sources";
import { ArrowRight, Check, Clock } from "@/components/Icons";
import { Faq } from "@/components/mdx/Faq";
import { Veredito } from "@/components/mdx/Veredito";
import { copy } from "@/lib/copy";
import { getRelatedArticles, getValeArticle, getValeArticles } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { getMdxComponent } from "@/content/registry";
import { site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getValeArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getValeArticle(slug);

  if (!article) return { title: "Artigo não encontrado" };

  const image = article.image ?? "/og.png";

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: `/vale-a-pena/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      url: `${site.url}/vale-a-pena/${article.slug}`,
      publishedTime: article.date,
      modifiedTime: article.updatedAt,
      authors: ["Redação Sobraria"],
      images: [{ url: image, width: 1200, height: 675, alt: article.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [image],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getValeArticle(slug);
  const Content = getMdxComponent(slug);

  if (!article || !Content) notFound();

  const related = getRelatedArticles(article, 3);
  const url = `${site.url}/vale-a-pena/${article.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    inLanguage: "pt-BR",
    datePublished: article.date,
    dateModified: article.updatedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: [`${site.url}${article.image ?? "/og.png"}`],
    articleSection: article.category,
    keywords: article.keywords?.join(", "),
    wordCount: article.wordCount,
    author: {
      "@type": "Organization",
      name: "Redação Sobraria",
      url: `${site.url}/sobre`,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
      logo: { "@type": "ImageObject", url: `${site.url}/og.png` },
    },
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Vale a pena?",
        item: `${site.url}/vale-a-pena`,
      },
      { "@type": "ListItem", position: 3, name: article.title, item: url },
    ],
  };

  const faqSchema = article.faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: article.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }
    : null;

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])]} />

      <article>
        <header className="relative overflow-hidden border-b border-line">
          <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-30" />
          <div className="container-page relative pb-8 pt-8 sm:pb-10 sm:pt-10">
            <Breadcrumbs
              items={[
                { label: "Vale a pena?", href: "/vale-a-pena" },
                { label: article.title },
              ]}
            />

            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/vale-a-pena?categoria=${encodeURIComponent(article.category)}`}
                  className="chip hover:border-green/40 hover:text-green"
                >
                  {article.category}
                </Link>
                <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.1em] text-ink-2/75">
                  <Clock size={12} />
                  {article.readingTime} {copy.common.readTime}
                </span>
              </div>

              <h1 className="mt-5 text-balance text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.045em] text-ink sm:text-5xl lg:text-[3.4rem]">
                {article.title}
              </h1>

              <p className="mt-4 text-base leading-relaxed text-ink-2 sm:text-lg">
                {article.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-ink-2/75">
                <span>
                  {copy.common.by} ·{" "}
                  <Link href="/sobre" className="underline decoration-line underline-offset-2 hover:text-green">
                    como escrevemos
                  </Link>
                </span>
                <span>
                  {copy.common.published} {formatDate(article.date)}
                </span>
                <span>
                  {copy.common.updated} {formatDate(article.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="container-page py-8 sm:py-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
            <div className="min-w-0 max-w-prose">
              {article.image && (
                <figure className="mb-8">
                  <Image
                    src={article.image}
                    alt={article.imageAlt ?? `Foto de abertura do artigo: ${article.title}`}
                    width={1200}
                    height={675}
                    priority
                    sizes="(max-width: 1024px) 100vw, 760px"
                    className="w-full rounded-card border border-line bg-bg-1"
                  />
                  <figcaption className="mt-2.5 text-center text-[11px] leading-relaxed text-ink-2/75">
                    Foto:{" "}
                    {article.imageCreditUrl ? (
                      <a
                        href={article.imageCreditUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="underline decoration-line underline-offset-2 hover:text-green"
                      >
                        {article.imageCredit ?? "StockSnap (CC0)"}
                      </a>
                    ) : (
                      (article.imageCredit ?? "StockSnap (CC0)")
                    )}
                  </figcaption>
                </figure>
              )}

              {article.veredito && <Veredito {...article.veredito} />}

              <AdSlot />

              <div className="article-prose">
                <Content />
              </div>

              {article.acoes.length > 0 && (
                <section aria-labelledby="plano-de-acao" className="mt-12">
                  <h2
                    id="plano-de-acao"
                    className="font-display text-2xl font-extrabold tracking-tight text-ink"
                  >
                    Plano de ação
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">
                    O que fazer com essa conta, na ordem em que faz diferença.
                  </p>
                  <ol className="mt-5 space-y-3">
                    {article.acoes.map((acao, index) => (
                      <li
                        key={acao}
                        className="flex items-start gap-3 rounded-field border border-line bg-bg-1/50 p-4"
                      >
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-green/30 bg-green/[0.06] font-mono text-[10px] font-bold text-green">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="text-sm leading-relaxed text-ink-2">{acao}</p>
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {article.conclusao && (
                <section aria-labelledby="conclusao" className="mt-12 rounded-card border border-line bg-bg-1/40 p-6">
                  <h2
                    id="conclusao"
                    className="font-display text-xl font-extrabold tracking-tight text-ink"
                  >
                    {copy.article.conclusionTitle}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-2">{article.conclusao}</p>
                  <Link
                    href="/vale-a-pena"
                    className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-green"
                  >
                    {copy.article.backToArchive}
                    <ArrowRight size={14} />
                  </Link>
                </section>
              )}

              <AdSlot label="Publicidade" />

              {article.faq.length > 0 && (
                <section aria-labelledby="faq" className="mt-12">
                  <h2
                    id="faq"
                    className="font-display text-2xl font-extrabold tracking-tight text-ink"
                  >
                    {copy.article.faqTitle}
                  </h2>
                  <p className="mt-2 text-sm text-ink-2">
                    As dúvidas que aparecem depois da conta — respondidas sem rodeio.
                  </p>
                  <Faq items={article.faq} />
                </section>
              )}

              <Sources items={article.fontes} />
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-4">
                {article.veredito && (
                  <div className="rounded-card border border-green-deep/60 bg-verdict-green p-4">
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-green">
                      O veredito
                    </p>
                    <p className="mt-2 font-mono text-2xl font-bold leading-none text-green">
                      {article.veredito.valor}
                    </p>
                    <p className="mt-2 text-[11px] leading-relaxed text-ink-2">
                      {article.veredito.rotulo}
                    </p>
                  </div>
                )}

                <div className="rounded-card border border-line bg-bg-1/40 p-4">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-ink-2/75">
                    Neste artigo
                  </p>
                  <ul className="mt-3 space-y-2 text-[11px] text-ink-2/75">
                    <li className="flex items-center gap-2">
                      <Check size={11} className="text-green" />
                      Conta passo a passo
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={11} className="text-green" />
                      Premissas e fontes
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={11} className="text-green" />
                      Calculadora interativa
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={11} className="text-green" />
                      Plano de ação
                    </li>
                  </ul>
                </div>

                <div className="rounded-card border border-line bg-bg-1/40 p-4">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-ink-2/75">
                    Transparência
                  </p>
                  <p className="mt-2 text-[11px] leading-relaxed text-ink-2/75">
                    Conteúdo educacional, sem recomendação de investimento. Taxas ilustrativas,
                    conferidas nas fontes oficiais citadas.
                  </p>
                  <Link
                    href="/politica-editorial"
                    className="mt-3 inline-block text-[11px] font-semibold text-green"
                  >
                    Política editorial
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-line">
          <div className="container-page py-14">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink">
                {copy.article.relatedTitle}
              </h2>
              <Link
                href="/vale-a-pena"
                className="hidden items-center gap-1.5 text-xs font-semibold text-ink-2 hover:text-green sm:inline-flex"
              >
                Ver arquivo
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ArticleCard key={item.slug} article={item} showImage />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container-page pb-20">
        <NewsletterBlock source={`artigo:${article.slug}`} />
      </section>
    </>
  );
}
