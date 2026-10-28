"use client";

import { useMemo, useState } from "react";
import { copy } from "@/lib/copy";
import { formatBRL, formatNumber, formatPercent } from "@/lib/format";
import { CalcNote, CalcShell, NumberField, ResultPanel, Stat } from "./CalcUI";

type Props = { defaults?: Record<string, number> };

function simulate(debt: number, ratePercent: number, minimumPercent: number, cap: boolean) {
  let balance = debt;
  let charges = 0;
  let total = 0;
  let months = 0;
  const rate = Math.max(0, ratePercent) / 100;
  const minimum = Math.min(100, Math.max(1, minimumPercent)) / 100;

  while (balance > 0.01 && months < 1200) {
    const allowed = cap ? Math.max(0, debt - charges) : Number.POSITIVE_INFINITY;
    const interest = Math.min(balance * rate, allowed);
    let payment = Math.max(50, balance * minimum);
    if (payment > balance + interest) payment = balance + interest;

    balance = balance + interest - payment;
    charges += interest;
    total += payment;
    months += 1;
  }

  return {
    months,
    total,
    interest: total - debt,
    paidOff: balance <= 0.01,
  };
}

export function RotativoCartao({ defaults }: Props) {
  const t = copy.calculators.rotativo;
  const [debt, setDebt] = useState(defaults?.debt ?? 5000);
  const [rate, setRate] = useState(defaults?.rate ?? 12.5);
  const [minimum, setMinimum] = useState(defaults?.minimum ?? 15);
  const [cap, setCap] = useState(true);

  const result = useMemo(
    () => simulate(Math.max(1, debt), rate, minimum, cap),
    [debt, rate, minimum, cap],
  );

  return (
    <CalcShell title={t.title} subtitle={t.subtitle} footer={t.capHint}>
      <div className="grid gap-4 sm:grid-cols-3">
        <NumberField label={t.debt} value={debt} onChange={setDebt} prefix="R$" min={1} />
        <NumberField label={t.rate} value={rate} onChange={setRate} suffix="% a.m." max={100} />
        <NumberField label={t.minimum} value={minimum} onChange={setMinimum} suffix="%" min={1} max={100} />
      </div>

      <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-field border border-line bg-bg-2/40 px-4 py-3">
        <input
          type="checkbox"
          checked={cap}
          onChange={(event) => setCap(event.target.checked)}
          className="mt-0.5 h-4 w-4 accent-[#4ADE80]"
        />
        <span>
          <span className="block text-xs font-semibold text-ink">{t.cap}</span>
          <span className="mt-0.5 block text-[10px] leading-relaxed text-ink-2/75">{t.capHint}</span>
        </span>
      </label>

      <div className="mt-6">
        {result.paidOff ? (
          <ResultPanel label={t.months} value={`${formatNumber(result.months)} meses`} tone={result.months > 24 ? "amber" : "green"}>
            <div className="grid grid-cols-2 gap-2.5">
              <Stat label={t.total} value={formatBRL(result.total)} />
              <Stat label={t.cost} value={formatBRL(result.interest)} tone="amber" />
            </div>
            <p className="mt-3 text-[11px] text-ink-2">
              {t.cost}:{" "}
              <strong className="font-mono text-amber">
                {formatPercent((result.interest / Math.max(1, debt)) * 100, 0)}
              </strong>{" "}
              {t.ofDebt}
            </p>
          </ResultPanel>
        ) : (
          <p className="rounded-card border border-red/30 bg-red/[0.04] p-5 text-xs text-red">
            Com esse pagamento mínimo, a dívida não termina em 100 anos. Aumente o valor pago.
          </p>
        )}
      </div>

      {result.months > 24 && result.paidOff && (
        <p className="mt-4 rounded-field border border-amber/25 bg-amber/[0.04] px-4 py-3 text-[11px] leading-relaxed text-amber/90">
          {t.warning}
        </p>
      )}

      <CalcNote>{copy.calculators.common.note}</CalcNote>
    </CalcShell>
  );
}
