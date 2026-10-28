import { copy } from "@/lib/copy";
import type { VereditoData } from "@/lib/content";
import { Check } from "../Icons";

export function Veredito({ valor, rotulo, conclusao }: VereditoData) {
  return (
    <section
      aria-labelledby="veredito"
      className="relative my-8 overflow-hidden rounded-card border border-green-deep bg-verdict-green p-6 sm:p-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full border border-green/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-10 h-48 w-48 rounded-full bg-green/[0.03] blur-2xl"
      />
      <div className="relative">
        <div className="flex items-center gap-2.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green text-bg-0">
            <Check size={14} />
          </span>
          <h2
            id="veredito"
            className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-green"
          >
            {copy.article.verdictTag}
          </h2>
        </div>

        <p className="mt-4 font-mono text-[2.6rem] font-bold leading-none tracking-[-0.04em] text-green sm:text-5xl">
          {valor}
        </p>
        <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-ink">{rotulo}</p>
        <p className="mt-4 max-w-3xl border-t border-green/10 pt-4 text-sm leading-relaxed text-ink-2">
          {conclusao}
        </p>
      </div>
    </section>
  );
}
