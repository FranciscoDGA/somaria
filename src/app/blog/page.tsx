import type { Metadata } from "next";

import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { NewsletterBlock } from "@/components/NewsletterBlock";
import { copy } from "@/lib/copy";
import { getBlogPosts } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog — finanças sem jargão",
  description:
    "Orçamento, hábitos, CDI, poupança e custo de oportunidade: o contexto que transforma número em decisão.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Sobraria",
    description: "Ensaios curtos sobre orçamento, hábitos e as escolhas que antecedem a conta.",
    url: `${site.url}/blog`,
  },
};

export default function BlogPage() {
  const posts = getBlogPosts();
  const [featured, ...rest] = posts;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog da Sobraria",
    description:
      "Ensaios sobre orçamento, hábitos e decisões financeiras do dia a dia, em português.",
    url: `${site.url}/blog`,
    inLanguage: "pt-BR",
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${site.url}/blog/${post.slug}`,
      datePublished: post.date,
      dateModified: post.updatedAt,
      author: { "@type": "Organization", name: "Redação Sobraria" },
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40" />
        <div aria-hidden="true" className="hero-glow absolute inset-0" />
        <div className="container-page relative py-14 sm:py-16">
          <Breadcrumbs items={[{ label: "Blog" }]} />
          <p className="eyebrow">{copy.blog.eyebrow}</p>
          <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-[-0.04em] text-ink sm:text-5xl lg:text-6xl">
            {copy.blog.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-2">
            {copy.blog.subtitle}
          </p>
        </div>
      </section>

      <section className="container-page py-12">
        {featured && (
          <div className="mb-10">
            <p className="mb-4 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-green">
              {copy.blog.featured}
            </p>
            <div className="max-w-2xl">
              <ArticleCard article={featured} showImage />
            </div>
          </div>
        )}

        <h2 className="font-display text-xl font-extrabold tracking-tight text-ink">
          {copy.blog.allPosts}
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <ArticleCard key={post.slug} article={post} showImage />
          ))}
        </div>
      </section>

      <section className="container-page pb-20">
        <NewsletterBlock source="blog" />
      </section>
    </>
  );
}
