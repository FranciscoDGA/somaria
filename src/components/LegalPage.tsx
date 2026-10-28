import { Breadcrumbs } from "@/components/Breadcrumbs";

export function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40" />
        <div className="container-page relative py-12 sm:py-14">
          <Breadcrumbs items={[{ label: title }]} />
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-3 max-w-3xl text-balance text-3xl font-extrabold tracking-[-0.04em] text-ink sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-2/75">
            {updated}
          </p>
        </div>
      </section>

      <section className="container-page py-10 sm:py-12">
        <div className="mx-auto max-w-prose">
          <p className="text-base leading-relaxed text-ink">{intro}</p>
          <div className="article-prose mt-6">{children}</div>
        </div>
      </section>
    </>
  );
}
