import type { FaqItem } from "@/lib/content";
import { Plus } from "../Icons";

export function Faq({ items }: { items: FaqItem[] }) {
  if (!items.length) return null;

  return (
    <div className="mt-6 divide-y divide-line overflow-hidden rounded-card border border-line bg-bg-1/40">
      {items.map((item, index) => (
        <details key={`${item.q}-${index}`} className="group px-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-semibold text-ink marker:hidden">
            <span>{item.q}</span>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line text-ink-2 transition-colors group-open:border-green/40 group-open:text-green">
              <Plus size={14} className="transition-transform duration-200 group-open:rotate-45" />
            </span>
          </summary>
          <p className="pb-5 pr-8 text-sm leading-relaxed text-ink-2">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
