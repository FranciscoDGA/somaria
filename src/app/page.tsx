import Image from "next/image";
import Link from "next/link";

import { ArticleCard } from "@/components/ArticleCard";
import { NewsletterBlock } from "@/components/NewsletterBlock";
import { SectionHeader } from "@/components/SectionHeader";
import { ArrowRight, ArrowUpRight, Calculator, Check, Clock } from "@/components/Icons";
import { copy } from "@/lib/copy";
import { formatDateShort } from "@/lib/format";
import { getBlogPosts, getValeArticles } from "@/lib/content";
import { calculators, categoryInfo, site } from "@/lib/site";

export default function HomePage() {
  const vales = getValeArticles();
  const posts = getBlogPosts();
  const featured = vales[0];
  const secondary = vales.slice(1, 4);
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
        <div aria-hidden="true" className="hero-glow absolute inset-0" />
        <div className="container-page relative py-16 sm:py-20 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <p className="eyebrow">{copy.home.eyebrow}</p>
              <h1 className="mt-4 text-balance text-[2.6rem] font-extrabold leading-[0.98] tracking-[-0.045em] text-ink sm:text-6xl lg:text-[4.2rem]">
                Quanto sobraria no fim do mês?
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-2 sm:text-lg">
                {copy.home.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/vale-a-pena" className="btn btn-primary">
                  {copy.home.primaryCta}
                  <ArrowRight size={16} />
                </Link>
                <Link href="/calculadoras" className="btn btn-ghost">
                  <Calculator size={16} />
                  {copy.home.secondaryCta}
                </Link>
              </div>

              <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6">
                {copy.home.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="font-mono text-2xl font-bold text-green">{stat.value}</dd>
                    <dd className="mt-1 text-[10px] uppercase leading-tight tracking-[0.1em] text-ink-2/75">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Cartão de veredito */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-[28px] border border-green/10"
              />
              <div className="relative overflow-hidden rounded-card border border-green-deep/70 bg-bg-1 shadow-glow">
                <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-green">
                    {copy.home.heroCard.tag}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-ink-2/75">
                    48x · 1,49% a.m.
                  </span>
                </div>
                <div className="p-5 sm:p-6">
                  <p className="font-display text-lg font-bold leading-snug text-ink">
                    {copy.home.heroCard.title}
                  </p>
                  <p className="mt-5 font-mono text-4xl font-bold leading-none tracking-[-0.04em] text-green sm:text-5xl">
                    {copy.home.heroCard.value}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-ink-2">
                    {copy.home.heroCard.label}
                  </p>

                  <div className="mt-6 space-y-3">
                    {[
                      { label: "Preço à vista", value: 95000, width: "66%", color: "bg-green" },
                      {
                        label: "Total financiado",
                        value: 132559,
                        width: "92%",
                        color: "bg-amber",
                      },
                      {
                        label: "Carro em 4 anos",
                        value: 65000,
                        width: "45%",
                        color: "bg-ink-2/30",
                      },
                    ].map((bar) => (
                      <div key={bar.label}>
                        <div className="mb-1 flex items-center justify-between text-[10px]">
                          <span className="text-ink-2/75">{bar.label}</span>
                          <span className="font-mono font-bold text-ink">
                            {new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                              maximumFractionDigits: 0,
                            }).format(bar.value)}
                          </span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-bg-2">
                          <div className={`h-full rounded-full ${bar.color}`} style={{ width: bar.width }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/vale-a-pena/financiar-carro-ou-pagar-a-vista"
                    className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-green transition-opacity hover:opacity-80"
                  >
                    {copy.home.heroCard.link}
                    <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Destaque */}
      {featured && (
        <section className="section container-page">
          <SectionHeader
            eyebrow="A conta da semana"
            title="Uma decisão, dissecada"
            description="O artigo em destaque desta semana — com premissas abertas e calculadora no fim."
            href="/vale-a-pena"
            linkLabel="Ver todas"
          />

          <article className="mt-10 grid overflow-hidden rounded-card border border-line bg-bg-1 lg:grid-cols-[1.1fr_0.9fr]">
            <Link
              href={`/vale-a-pena/${featured.slug}`}
              className="group relative block min-h-[260px] overflow-hidden border-b border-line bg-bg-2 lg:border-b-0 lg:border-r"
            >
              {featured.image ? (
                <Image
                  src={featured.image}
                  alt={featured.imageAlt ?? `Foto do artigo ${featured.title}`}
                  width={1200}
                  height={675}
                  priority
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              ) : (
                <div className="flex h-full min-h-[260px] items-center justify-center p-8 text-center font-mono text-xs text-ink-2/75">
                  {featured.title}
                </div>
              )}
            </Link>

            <div className="flex flex-col p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="chip">{featured.category}</span>
                <span className="flex items-center gap-1.5 text-[10px] text-ink-2/75">
                  <Clock size={12} />
                  {featured.readingTime} min
                </span>
              </div>
              <h3 className="mt-4 text-balance font-display text-2xl font-extrabold leading-tight text-ink sm:text-3xl">
                <Link href={`/vale-a-pena/${featured.slug}`} className="hover:text-green">
                  {featured.title}
                </Link>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">{featured.description}</p>

              {featured.veredito && (
                <div className="mt-6 rounded-field border border-green-deep/60 bg-verdict-green p-4">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-green">
                    Veredito
                  </p>
                  <p className="mt-1 font-mono text-2xl font-bold text-green">
                    {featured.veredito.valor}
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-ink-2">
                    {featured.veredito.rotulo}
                  </p>
                </div>
              )}

              <div className="mt-auto flex items-center justify-between gap-4 pt-6">
                <span className="font-mono text-[10px] uppercase tracking-wider text-ink-2/75">
                  {formatDateShort(featured.date)}
                </span>
                <Link
                  href={`/vale-a-pena/${featured.slug}`}
                  className="group inline-flex items-center gap-2 text-xs font-semibold text-green"
                >
                  Ler a conta
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
          </article>
        </section>
      )}

      {/* Últimos vereditos */}
      <section className="container-page pb-16 sm:pb-20">
        <SectionHeader
          eyebrow={copy.home.latest.eyebrow}
          title={copy.home.latest.title}
          href="/vale-a-pena"
          linkLabel={copy.home.latest.link}
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {secondary.map((article) => (
            <ArticleCard key={article.slug} article={article} showImage />
          ))}
        </div>
      </section>

      {/* Calculadoras */}
      <section className="border-y border-line bg-bg-1/30">
        <div className="container-page section">
          <SectionHeader
            eyebrow="Ferramentas"
            title="Troque os números. Veja a sua conta."
            description="As mesmas contas dos artigos, abertas para você testar com a sua realidade. Sem cadastro."
            href="/calculadoras"
            linkLabel="Abrir todas"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {calculators.map((calculator) => (
              <Link
                key={calculator.type}
                href={`/calculadoras#${calculator.type}`}
                className="card card-hover group flex flex-col p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-field border border-line bg-bg-2/60 text-green">
                    <Calculator size={16} />
                  </span>
                  <ArrowUpRight
                    size={16}
                    className="text-ink-2/75 transition-colors group-hover:text-green"
                  />
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-ink">{calculator.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-2/75">{calculator.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="container-page section">
        <SectionHeader
          eyebrow={copy.home.how.eyebrow}
          title={copy.home.how.title}
          description={copy.home.how.subtitle}
        />
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {copy.home.how.steps.map((step) => (
            <li key={step.number} className="card relative overflow-hidden p-6">
              <span className="font-mono text-[11px] font-bold tracking-[0.12em] text-green">
                {step.number}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-2">{step.text}</p>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-10 -right-8 h-24 w-24 rounded-full border border-green/10"
              />
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-4 rounded-card border border-line bg-bg-1/40 p-6 sm:grid-cols-2 lg:grid-cols-5">
          {Object.entries(categoryInfo).map(([category, info]) => (
            <Link
              key={category}
              href={`/vale-a-pena?categoria=${encodeURIComponent(category)}`}
              className="group"
            >
              <p className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-ink transition-colors group-hover:text-green">
                <Check size={11} className="text-green" />
                {category}
              </p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-ink-2/75">{info.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Blog */}
      <section className="border-t border-line">
        <div className="container-page section">
          <SectionHeader
            eyebrow={copy.blog.eyebrow}
            title="O que vem antes da conta"
            description="Orçamento, hábitos e custo de oportunidade: o contexto que faz o número virar decisão."
            href="/blog"
            linkLabel={copy.blog.allPosts}
          />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <ArticleCard key={post.slug} article={post} showImage />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page pb-20">
        <NewsletterBlock source="home" />
        <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-ink-2/75">
          {site.domain} · conteúdo educacional, não recomendação de investimento
        </p>
      </section>
    </>
  );
}
