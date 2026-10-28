import Image from "next/image";
import Link from "next/link";

import { NewsletterForm } from "@/components/NewsletterForm";
import { ArrowRight, ArrowUpRight, Calculator, Clock, Quote } from "@/components/Icons";
import { copy } from "@/lib/copy";
import { formatDateShort } from "@/lib/format";
import { getBlogPosts, getValeArticles } from "@/lib/content";
import { calculators, site } from "@/lib/site";

export default function HomePage() {
  const vales = getValeArticles();
  const posts = getBlogPosts();
  const featured = vales.slice(0, 3);
  const latestPosts = posts.slice(0, 3);
  const hero = copy.home.heroCard;

  return (
    <>
      {/* Hero */}
      <section id="topo" className="relative overflow-hidden border-b border-line">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-50" />
        <div aria-hidden="true" className="hero-glow absolute inset-0" />
        <div className="container-page relative py-14 sm:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <p className="eyebrow flex items-center gap-2">
                <span aria-hidden="true" className="text-green">
                  ✦
                </span>
                {copy.home.eyebrow}
              </p>
              <h1 className="mt-4 text-balance text-[2.7rem] font-extrabold leading-[0.96] tracking-[-0.045em] text-ink sm:text-6xl lg:text-[4.35rem]">
                Seu dinheiro merece{" "}
                <span className="text-green">boas decisões.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-2 sm:text-lg">
                {copy.home.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/blog" className="btn btn-primary">
                  {copy.home.primaryCta}
                  <ArrowUpRight size={16} />
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

            {/* Cartão de simulação */}
            <div className="relative mx-auto w-full max-w-md lg:mx-0">
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-[28px] border border-green/10"
              />

              <div className="relative overflow-hidden rounded-card border border-green-deep/70 bg-bg-1 shadow-glow">
                <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-green">
                    {hero.tag}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-ink-2/75">
                    <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden="true" />
                    10 anos
                  </span>
                </div>

                <div className="p-5 sm:p-6">
                  <p className="font-display text-lg font-bold leading-snug text-ink">
                    {hero.title}
                  </p>
                  <p className="mt-5 font-mono text-4xl font-bold leading-none tracking-[-0.04em] text-green sm:text-5xl">
                    {hero.value}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-ink-2">{hero.label}</p>

                  <div className="mt-6 space-y-3">
                    {hero.bars.map((bar) => (
                      <div key={bar.label}>
                        <div className="mb-1 flex items-center justify-between text-[10px]">
                          <span className="text-ink-2/75">{bar.label}</span>
                          <span className="font-mono font-bold text-ink">{bar.value}</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-bg-2">
                          <div
                            className={`h-full rounded-full ${bar.color}`}
                            style={{ width: bar.width }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-ink-2/75">
                      {hero.hint}
                    </span>
                    <Link
                      href="/calculadoras#juros-compostos"
                      className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-green transition-opacity hover:opacity-80"
                    >
                      Abrir calculadora
                      <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="absolute -right-3 -top-5 hidden rounded-full border border-green/30 bg-bg-0/95 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-green shadow-glow backdrop-blur sm:block">
                {hero.floatingTop}
              </div>
              <div className="absolute -bottom-5 -left-3 hidden rounded-full border border-line bg-bg-0/95 px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-wider text-ink shadow-glow backdrop-blur sm:block">
                {hero.floatingBottom}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Entenda · Calcule · Decida */}
      <section aria-labelledby="metodo" className="border-b border-line bg-bg-1/30">
        <div className="container-page">
          <h2 id="metodo" className="sr-only">
            {copy.home.steps.title}
          </h2>
          <ol className="grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
            {copy.home.steps.items.map((step) => (
              <li key={step.number} className="group flex gap-5 px-0 py-7 md:px-7">
                <span className="font-mono text-[11px] font-bold tracking-[0.12em] text-green">
                  {step.number}
                </span>
                <div>
                  <h3 className="font-display text-xl font-extrabold text-ink">{step.title}</h3>
                  <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-ink-2">
                    {step.text}
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  className="ml-auto mt-1 hidden shrink-0 text-ink-2/40 transition-colors group-hover:text-green lg:block"
                />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Vale a pena mesmo? */}
      <section className="section container-page">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{copy.home.latest.eyebrow}</p>
            <h2 className="mt-2 text-balance text-3xl font-extrabold text-ink sm:text-4xl lg:text-[2.6rem]">
              {copy.home.latest.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">
              {copy.home.latest.description}
            </p>
          </div>
          <Link
            href="/vale-a-pena"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-ink-2 transition-colors hover:text-green"
          >
            {copy.home.latest.link}
            <ArrowUpRight
              size={16}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((article, index) => (
            <article
              key={article.slug}
              className="group relative flex flex-col overflow-hidden rounded-card border border-line bg-bg-1 transition-colors duration-200 hover:border-green/40"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-bg-2">
                {article.image ? (
                  <Image
                    src={article.image}
                    alt={article.imageAlt ?? `Foto do artigo ${article.title}`}
                    width={1200}
                    height={675}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center p-6 text-center font-mono text-[10px] text-ink-2/75">
                    {article.title}
                  </div>
                )}
                <span className="absolute left-3 top-3 rounded-full border border-line/80 bg-bg-0/85 px-2.5 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-ink backdrop-blur">
                  {article.category}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider text-ink-2/75">
                  <span className="text-green">0{index + 1}</span>
                  <span className="h-px w-4 bg-line" aria-hidden="true" />
                  <span className="flex items-center gap-1.5">
                    <Clock size={11} />
                    {article.readingTime} min
                  </span>
                </div>

                <h3 className="mt-3 text-balance font-display text-[1.15rem] font-bold leading-snug text-ink transition-colors group-hover:text-green">
                  <Link href={`/vale-a-pena/${article.slug}`} className="focus-visible:outline-none">
                    <span className="absolute inset-0 z-10" aria-hidden="true" />
                    {article.title}
                  </Link>
                </h3>

                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-2/75">
                  {article.description}
                </p>

                <div className="mt-auto flex items-end justify-between gap-3 border-t border-line pt-4">
                  <div>
                    <p className="font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-ink-2/75">
                      Veredito
                    </p>
                    <p className="mt-1 font-mono text-base font-bold leading-none text-green">
                      {article.veredito?.valor ?? formatDateShort(article.date)}
                    </p>
                  </div>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-2 transition-colors group-hover:border-green/40 group-hover:text-green">
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Calculadoras */}
      <section className="border-y border-line bg-bg-1/30">
        <div className="container-page section">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">{copy.home.calculators.eyebrow}</p>
              <h2 className="mt-2 text-balance text-3xl font-extrabold text-ink sm:text-4xl lg:text-[2.6rem]">
                {copy.home.calculators.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">
                {copy.home.calculators.description}
              </p>
            </div>
            <Link
              href="/calculadoras"
              className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-ink-2 transition-colors hover:text-green"
            >
              {copy.home.calculators.link}
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {calculators.slice(0, 4).map((calculator, index) => (
              <Link
                key={calculator.type}
                href={`/calculadoras#${calculator.type}`}
                className="group flex items-start gap-5 rounded-card border border-line bg-bg-0/40 p-6 transition-colors duration-200 hover:border-green/40 hover:bg-bg-2/40"
              >
                <span className="font-mono text-[11px] font-bold tracking-[0.12em] text-green">
                  0{index + 1}
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold leading-snug text-ink transition-colors group-hover:text-green">
                    {calculator.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-2/75">
                    {calculator.description}
                  </p>
                </div>
                <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-ink-2 transition-colors group-hover:border-green/40 group-hover:text-green">
                  <ArrowUpRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="section container-page">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">{copy.home.blog.eyebrow}</p>
            <h2 className="mt-2 text-balance text-3xl font-extrabold text-ink sm:text-4xl lg:text-[2.6rem]">
              {copy.home.blog.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-2">
              {copy.home.blog.description}
            </p>
          </div>
          <Link
            href="/blog"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-ink-2 transition-colors hover:text-green"
          >
            {copy.home.blog.link}
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <figure className="relative flex flex-col justify-between overflow-hidden rounded-card border border-line bg-bg-1 p-7 sm:p-10">
            <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-30" />
            <Quote size={28} className="relative text-green/60" />
            <blockquote className="relative mt-8 max-w-lg font-display text-2xl font-bold leading-tight tracking-[-0.03em] text-ink sm:text-3xl">
              {copy.home.blog.quote}
            </blockquote>
            <figcaption className="relative mt-8 flex items-center gap-3 border-t border-line pt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-2/75">
              <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden="true" />
              {copy.home.blog.quoteSource}
            </figcaption>
          </figure>

          <div className="rounded-card border border-line bg-bg-1 p-7 sm:p-8">
            <h3 className="text-balance font-display text-xl font-extrabold leading-snug text-ink sm:text-2xl">
              {copy.home.blog.cardTitle}
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-ink-2">{copy.home.blog.cardText}</p>

            <ul className="mt-6 divide-y divide-line/70 border-y border-line/70">
              {latestPosts.map((post, index) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex items-start gap-4 py-4 transition-colors"
                  >
                    <span className="mt-0.5 font-mono text-[10px] font-bold tracking-[0.1em] text-green">
                      0{index + 1}
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-semibold leading-snug text-ink transition-colors group-hover:text-green">
                        {post.title}
                      </span>
                      <span className="mt-1 block font-mono text-[9px] uppercase tracking-wider text-ink-2/75">
                        {post.readingTime} min de leitura
                      </span>
                    </span>
                    <ArrowUpRight
                      size={15}
                      className="mt-0.5 shrink-0 text-ink-2/60 transition-colors group-hover:text-green"
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/blog"
              className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-green transition-opacity hover:opacity-80"
            >
              {copy.home.blog.cardCta}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative overflow-hidden border-t border-line">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40" />
        <div aria-hidden="true" className="hero-glow absolute inset-0" />
        <div className="container-page relative py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">{copy.home.cta.eyebrow}</p>
            <h2 className="mt-3 text-balance text-3xl font-extrabold leading-[1.02] tracking-[-0.04em] text-ink sm:text-5xl lg:text-[3.4rem]">
              {copy.home.cta.title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ink-2 sm:text-base">
              {copy.home.cta.text}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/blog" className="btn btn-primary">
                {copy.home.cta.primary}
                <ArrowUpRight size={16} />
              </Link>
              <Link href="/calculadoras" className="btn btn-ghost">
                <Calculator size={16} />
                {copy.home.cta.secondary}
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 border-t border-line pt-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-green">
                {copy.home.newsletter.eyebrow}
              </p>
              <h3 className="mt-2 font-display text-xl font-extrabold text-ink">
                {copy.home.newsletter.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-2">
                {copy.home.newsletter.text}
              </p>
            </div>
            <NewsletterForm source="home" variant="compact" />
          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 sm:flex-row">
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-2/75">
              {site.domain} · conteúdo educacional, não recomendação de investimento
            </p>
            <a
              href="#topo"
              className="group inline-flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-ink-2 transition-colors hover:text-green"
            >
              {copy.home.cta.backToTop}
              <ArrowUpRight
                size={13}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
