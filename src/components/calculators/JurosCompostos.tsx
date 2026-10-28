"use client";

import { useMemo, useState } from "react";
import { copy } from "@/lib/copy";
import { formatBRL, futureValue } from "@/lib/format";
import { CalcNote, CalcShell, NumberField, ResultPanel, Stat } from "./CalcUI";

type Props = { defaults?: Record<string, number> };

export function JurosCompostos({ defaults }: Props) {
  const t = copy.calculators.juros;
  const [initial, setInitial] = useState(defaults?.initial ?? 10000);
  const [monthly, setMonthly] = useState(defaults?.monthly ?? 500);
  const [rate, setRate] = useState(defaults?.rate ?? 0.8);
  const [months, setMonths] = useState(defaults?.months ?? 120);

  const result = useMemo(() => {
    const n = Math.max(1, Math.round(months));
    const i = Math.max(0, rate) / 100;
    const final = futureValue(Math.max(0, initial), Math.max(0, monthly), i, n);
    const invested = Math.max(0, initial) + Math.max(0, monthly) * n;
    return { final, invested, interest: final - invested, months: n };
  }, [initial, monthly, rate, months]);

  return (
    <CalcShell title={t.title} subtitle={t.subtitle} footer={t.hint}>
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField label={t.initial} value={initial} onChange={setInitial} prefix="R$" />
        <NumberField label={t.monthly} value={monthly} onChange={setMonthly} prefix="R$" />
        <NumberField label={t.rate} value={rate} onChange={setRate} suffix="% a.m." max={100} />
        <NumberField label={t.months} value={months} onChange={setMonths} suffix="meses" min={1} max={720} />
      </div>

      <div className="mt-6">
        <ResultPanel label={t.final} value={formatBRL(result.final)}>
          <div className="grid grid-cols-2 gap-2.5">
            <Stat label={t.invested} value={formatBRL(result.invested)} />
            <Stat label={t.interest} value={formatBRL(result.interest)} tone="green" />
          </div>
        </ResultPanel>
      </div>

      <CalcNote>{copy.calculators.common.note}</CalcNote>
    </CalcShell>
  );
}
