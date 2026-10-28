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
import { ArrowRight, Clock } from "@/components/Icons";
import { Faq } from "@/components/mdx/Faq";
import { copy } from "@/lib/copy";
import { getBlogPost, getBlogPosts } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { getMdxComponent } from "@/content/registry";
import { site } from "@/lib/site";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) return { title: "Artigo não encontrado" };

  const image = post.image ?? "/og.png";

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${site.url}/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updatedAt,
      authors: ["Redação Sobraria"],
      images: [{ url: image, width: 1200, height: 675, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const Content = getMdxComponent(slug);

  if (!post || !Content) notFound();

  const related = getBlogPosts()
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  const url = `${site.url}/blog/${post.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    inLanguage: "pt-BR",
    datePublished: post.date,
    dateModified: post.updatedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: [`${site.url}${post.image ?? "/og.png"}`],
    articleSection: post.category,
    keywords: post.keywords?.join(", "),
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
      { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const faqSchema = post.faq.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      }
    : null;

  return (
    <>
      <JsonLd data={[schema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])]} />

      <article>
        <header className="relative overflow-hidden border-b border-line">
          <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-30" />
          <div className="container-page relative pb-8 pt-8 sm:pb-10 sm:pt-10">
            <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />

            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="chip">{post.category}</span>
                <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.1em] text-ink-2/75">
                  <Clock size={12} />
                  {post.readingTime} {copy.common.readTime}
                </span>
              </div>

              <h1 className="mt-5 text-balance text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.045em] text-ink sm:text-5xl lg:text-[3.4rem]">
                {post.title}
              </h1>

              <p className="mt-4 text-base leading-relaxed text-ink-2 sm:text-lg">
                {post.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-ink-2/75">
                <span>
                  {copy.common.by} ·{" "}
                  <Link href="/sobre" className="underline decoration-line underline-offset-2 hover:text-green">
                    como escrevemos
                  </Link>
                </span>
                <span>
                  {copy.common.published} {formatDate(post.date)}
                </span>
                <span>
                  {copy.common.updated} {formatDate(post.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="container-page py-8 sm:py-10">
          <div className="mx-auto max-w-prose">
            {post.image && (
              <figure className="mb-8">
                <Image
                  src={post.image}
                  alt={post.imageAlt ?? `Foto de abertura do artigo: ${post.title}`}
                  width={1200}
                  height={675}
                  priority
                  sizes="(max-width: 1024px) 100vw, 760px"
                  className="w-full rounded-card border border-line bg-bg-1"
                />
                <figcaption className="mt-2.5 text-center text-[11px] leading-relaxed text-ink-2/75">
                  Foto:{" "}
                  {post.imageCreditUrl ? (
                    <a
                      href={post.imageCreditUrl}
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="underline decoration-line underline-offset-2 hover:text-green"
                    >
                      {post.imageCredit ?? "StockSnap (CC0)"}
                    </a>
                  ) : (
                    (post.imageCredit ?? "StockSnap (CC0)")
                  )}
                </figcaption>
              </figure>
            )}

            <AdSlot />

            <div className="article-prose">
              <Content />
            </div>

            {post.acoes.length > 0 && (
              <section aria-labelledby="plano-de-acao" className="mt-12">
                <h2
                  id="plano-de-acao"
                  className="font-display text-2xl font-extrabold tracking-tight text-ink"
                >
                  Plano de ação
                </h2>
                <ol className="mt-5 space-y-3">
                  {post.acoes.map((acao, index) => (
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

            <AdSlot />

            {post.faq.length > 0 && (
              <section aria-labelledby="faq" className="mt-12">
                <h2
                  id="faq"
                  className="font-display text-2xl font-extrabold tracking-tight text-ink"
                >
                  {copy.article.faqTitle}
                </h2>
                <Faq items={post.faq} />
              </section>
            )}

            <Sources items={post.fontes} />

            <Link
              href="/blog"
              className="mt-8 inline-flex items-center gap-1.5 text-xs font-semibold text-green"
            >
              Voltar para o blog
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-line">
          <div className="container-page py-14">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-ink">
              Continue lendo
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ArticleCard key={item.slug} article={item} showImage />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="container-page pb-20">
        <NewsletterBlock source={`post:${post.slug}`} />
      </section>
    </>
  );
}
