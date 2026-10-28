"use client";

import { useMemo, useState } from "react";
import { copy } from "@/lib/copy";
import { formatBRL, formatHours, formatNumber, formatPercent } from "@/lib/format";
import { CalcNote, CalcShell, NumberField, ResultPanel, Stat } from "./CalcUI";

type Props = { defaults?: Record<string, number> };

export function HoraTrabalho({ defaults }: Props) {
  const t = copy.calculators.hora;
  const [price, setPrice] = useState(defaults?.price ?? 1200);
  const [salary, setSalary] = useState(defaults?.salary ?? 4000);
  const [hours, setHours] = useState(defaults?.hours ?? 44);

  const result = useMemo(() => {
    const weeklyHours = Math.max(1, hours);
    const monthlyHours = weeklyHours * 4.33;
    const hourly = Math.max(0, salary) / monthlyHours;
    const hoursCost = hourly > 0 ? Math.max(0, price) / hourly : 0;
    return {
      hourly,
      hoursCost,
      days: hoursCost / 8,
      share: salary > 0 ? (Math.max(0, price) / salary) * 100 : 0,
      valid: salary > 0 && price >= 0,
    };
  }, [price, salary, hours]);

  return (
    <CalcShell title={t.title} subtitle={t.subtitle} footer={t.hint}>
      <div className="grid gap-4 sm:grid-cols-3">
        <NumberField label={t.price} value={price} onChange={setPrice} prefix="R$" />
        <NumberField label={t.salary} value={salary} onChange={setSalary} prefix="R$" min={1} />
        <NumberField label={t.hours} value={hours} onChange={setHours} suffix="h/semana" min={1} max={168} />
      </div>

      <div className="mt-6">
        {result.valid ? (
          <ResultPanel label={t.hoursCost} value={formatHours(result.hoursCost)}>
            <div className="grid grid-cols-3 gap-2.5">
              <Stat label={t.hourly} value={formatBRL(result.hourly)} />
              <Stat label={t.daysCost} value={`${formatNumber(result.days)} dias`} />
              <Stat label={t.share} value={formatPercent(result.share, 0)} tone="amber" />
            </div>
          </ResultPanel>
        ) : (
          <p className="rounded-card border border-line bg-bg-2/40 p-5 text-xs text-ink-2">
            {copy.calculators.common.invalid}
          </p>
        )}
      </div>

      <CalcNote>{copy.calculators.common.note}</CalcNote>
    </CalcShell>
  );
}
