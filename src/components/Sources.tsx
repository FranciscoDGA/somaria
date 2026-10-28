import Link from "next/link";
import type { Fonte } from "@/lib/content";
import { ArrowUpRight } from "./Icons";

export function Sources({ items }: { items: Fonte[] }) {
  if (!items.length) return null;

  return (
    <section className="mt-12 rounded-card border border-line bg-bg-1/40 p-5">
      <h2 className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-ink-2/75">
        Fontes e metodologia
      </h2>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-start gap-1.5 text-[11px] leading-relaxed text-ink-2 transition-colors hover:text-green"
            >
              {item.label}
              <ArrowUpRight size={12} className="mt-0.5 shrink-0" />
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4 border-t border-line pt-3 text-[10px] leading-relaxed text-ink-2/75">
        Os cálculos são reproduzíveis a partir das premissas descritas no artigo. Taxas e valores
        são ilustrativos; confira as condições vigentes no seu banco ou na fonte oficial. Conteúdo
        educacional, não recomendação de investimento.
      </p>
    </section>
  );
}
