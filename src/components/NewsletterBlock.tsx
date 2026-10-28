import { copy } from "@/lib/copy";
import { Check } from "./Icons";
import { NewsletterForm } from "./NewsletterForm";

export function NewsletterBlock({ source = "site" }: { source?: string }) {
  return (
    <section className="relative overflow-hidden rounded-card border border-green-deep/60 bg-bg-1 p-6 sm:p-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid opacity-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-green/[0.06] blur-3xl"
      />
      <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="eyebrow">Newsletter</p>
          <h2 className="mt-3 text-balance text-2xl font-extrabold text-ink sm:text-3xl">
            {copy.newsletter.title}
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink-2">
            {copy.newsletter.subtitle}
          </p>
          <ul className="mt-5 space-y-2.5">
            {copy.newsletter.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2.5 text-xs text-ink-2">
                <Check size={14} className="mt-0.5 shrink-0 text-green" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-card border border-line bg-bg-0/50 p-5">
          <NewsletterForm source={source} variant="stacked" />
        </div>
      </div>
    </section>
  );
}
