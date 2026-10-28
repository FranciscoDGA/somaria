import type { ReactNode } from "react";
import { AlertTriangle } from "../Icons";

export function AvisoNumeros({ children }: { children: ReactNode }) {
  return (
    <aside className="my-8 rounded-card border border-amber/25 bg-amber/[0.035] p-5">
      <div className="flex gap-3">
        <AlertTriangle size={18} className="mt-0.5 shrink-0 text-amber" />
        <div>
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-amber">
            Nota sobre os números
          </p>
          <div className="mt-1.5 text-xs leading-relaxed text-ink-2">{children}</div>
        </div>
      </div>
    </aside>
  );
}
