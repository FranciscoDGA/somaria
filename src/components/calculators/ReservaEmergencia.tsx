"use client";

import { useMemo, useState } from "react";
import { copy } from "@/lib/copy";
import { formatBRL, formatNumber } from "@/lib/format";
import { CalcNote, CalcShell, NumberField, ResultPanel, Stat } from "./CalcUI";

type Props = { defaults?: Record<string, number> };

export function ReservaEmergencia({ defaults }: Props) {
  const t = copy.calculators.reserva;
  const [costs, setCosts] = useState(defaults?.costs ?? 5200);
  const [months, setMonths] = useState(defaults?.months ?? 6);
  const [yieldRate, setYieldRate] = useState(defaults?.yield ?? 0.75);

  const result = useMemo(() => {
    const target = Math.max(0, costs) * Math.max(1, months);
    const i = Math.max(0, yieldRate) / 100;
    const monthly12 = i > 0 ? (target * i) / (Math.pow(1 + i, 12) - 1) : target / 12;
    return { target, monthly12 };
  }, [costs, months, yieldRate]);

  return (
    <CalcShell title={t.title} subtitle={t.subtitle} footer={t.hint}>
      <div className="grid gap-4 sm:grid-cols-3">
        <NumberField label={t.costs} value={costs} onChange={setCosts} prefix="R$" />
        <NumberField label={t.months} value={months} onChange={setMonths} suffix="meses" min={1} max={36} />
        <NumberField label={t.yield} value={yieldRate} onChange={setYieldRate} suffix="% a.m." max={100} />
      </div>

      <div className="mt-6">
        <ResultPanel label={t.target} value={formatBRL(result.target)}>
          <div className="grid grid-cols-2 gap-2.5">
            <Stat label={t.perMonth} value={formatBRL(result.monthly12)} tone="green" />
            <Stat label={t.coverage} value={`${formatNumber(months)} meses`} />
          </div>
        </ResultPanel>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {[3, 6, 9, 12].map((option) => (
          <div
            key={option}
            className={`rounded-field border px-2 py-2.5 text-center ${
              option === months ? "border-green/50 bg-green/[0.06]" : "border-line/70 bg-bg-1/40"
            }`}
          >
            <p className="font-mono text-[9px] uppercase tracking-wider text-ink-2/75">
              {option} meses
            </p>
            <p className={`mt-1 font-mono text-[11px] font-bold ${option === months ? "text-green" : "text-ink-2"}`}>
              {formatBRL(costs * option)}
            </p>
          </div>
        ))}
      </div>

      <CalcNote>{copy.calculators.common.note}</CalcNote>
    </CalcShell>
  );
}
