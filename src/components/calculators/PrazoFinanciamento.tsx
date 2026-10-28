"use client";

import { useMemo, useState } from "react";

import { copy } from "@/lib/copy";
import { formatBRL, formatNumber, futureValue, monthlyRateFromAnnual, payment } from "@/lib/format";
import { CalcNote, CalcShell, NumberField, ResultPanel, Stat } from "./CalcUI";

type Props = { defaults?: Record<string, number> };

export function PrazoFinanciamento({ defaults }: Props) {
  const t = copy.calculators.prazo;
  const [amount, setAmount] = useState(defaults?.amount ?? 400000);
  const [rate, setRate] = useState(defaults?.rate ?? 10.5);
  const [yearsA, setYearsA] = useState(defaults?.yearsA ?? 20);
  const [yearsB, setYearsB] = useState(defaults?.yearsB ?? 30);
  const [yieldRate, setYieldRate] = useState(defaults?.yield ?? 0.75);

  const result = useMemo(() => {
    const monthlyRate = monthlyRateFromAnnual(rate);
    const shortYears = Math.min(yearsA, yearsB);
    const longYears = Math.max(yearsA, yearsB);
    const shortMonths = Math.max(1, Math.round(shortYears * 12));
    const longMonths = Math.max(1, Math.round(longYears * 12));
    const principal = Math.max(0, amount);

    const shortPayment = payment(principal, monthlyRate, shortMonths);
    const longPayment = payment(principal, monthlyRate, longMonths);
    const shortTotal = shortPayment * shortMonths;
    const longTotal = longPayment * longMonths;
    const shortInterest = shortTotal - principal;
    const longInterest = longTotal - principal;
    const extraInterest = longInterest - shortInterest;

    const investmentRate = Math.max(0, yieldRate) / 100;
    const freedMonths = longMonths - shortMonths;
    const shortInvested = futureValue(0, shortPayment, investmentRate, freedMonths);
    const difference = Math.max(0, shortPayment - longPayment);
    const longInvested = futureValue(0, difference, investmentRate, longMonths);
    const advantageShort = shortInvested - longInvested;

    return {
      shortYears,
      longYears,
      shortPayment,
      longPayment,
      shortTotal,
      longTotal,
      shortInterest,
      longInterest,
      extraInterest,
      shortInvested,
      longInvested,
      advantageShort,
      valid: principal > 0,
    };
  }, [amount, rate, yearsA, yearsB, yieldRate]);

  return (
    <CalcShell title={t.title} subtitle={t.subtitle} footer={t.hint}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <NumberField label={t.amount} value={amount} onChange={setAmount} prefix="R$" min={1} />
        <NumberField label={t.rate} value={rate} onChange={setRate} suffix="% a.a." max={100} />
        <NumberField label={t.yield} value={yieldRate} onChange={setYieldRate} suffix="% a.m." max={100} />
        <NumberField label={t.yearsA} value={yearsA} onChange={setYearsA} suffix="anos" min={1} max={40} />
        <NumberField label={t.yearsB} value={yearsB} onChange={setYearsB} suffix="anos" min={1} max={40} />
      </div>

      <div className="mt-6">
        {result.valid ? (
          <ResultPanel
            label={t.verdict.replace("{years}", formatNumber(result.shortYears))}
            value={formatBRL(Math.abs(result.advantageShort))}
            tone={result.advantageShort >= 0 ? "green" : "amber"}
          >
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              <Stat
                label={`${t.payment} ${formatNumber(result.shortYears)} anos`}
                value={formatBRL(result.shortPayment)}
              />
              <Stat
                label={`${t.payment} ${formatNumber(result.longYears)} anos`}
                value={formatBRL(result.longPayment)}
                tone="amber"
              />
              <Stat
                label={t.extraInterest}
                value={formatBRL(result.extraInterest)}
                tone="amber"
              />
              <Stat
                label={t.freedInvestment}
                value={formatBRL(result.shortInvested)}
                tone="green"
              />
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-ink-2">
              {t.note.replace("{short}", formatNumber(result.shortYears)).replace(
                "{long}",
                formatNumber(result.longYears),
              )}
            </p>
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
