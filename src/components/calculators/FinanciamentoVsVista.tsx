"use client";

import { useMemo, useState } from "react";
import { copy } from "@/lib/copy";
import { formatBRL, formatPercent, payment } from "@/lib/format";
import { CalcNote, CalcShell, NumberField, ResultPanel, Stat } from "./CalcUI";

type Props = { defaults?: Record<string, number> };

export function FinanciamentoVsVista({ defaults }: Props) {
  const t = copy.calculators.financiamento;
  const [price, setPrice] = useState(defaults?.price ?? 100000);
  const [discount, setDiscount] = useState(defaults?.discount ?? 5);
  const [entry, setEntry] = useState(defaults?.entry ?? 20);
  const [rate, setRate] = useState(defaults?.rate ?? 1.49);
  const [installments, setInstallments] = useState(defaults?.installments ?? 48);
  const [yieldRate, setYieldRate] = useState(defaults?.yield ?? 0.75);

  const result = useMemo(() => {
    const months = Math.max(1, Math.round(installments));
    const monthlyRate = Math.max(0, rate) / 100;
    const cashPrice = price * (1 - Math.min(100, Math.max(0, discount)) / 100);
    const entryValue = price * (Math.min(100, Math.max(0, entry)) / 100);
    const financed = Math.max(0, price - entryValue);
    const installment = payment(financed, monthlyRate, months);
    const totalFinanced = entryValue + installment * months;
    const interest = totalFinanced - price;
    const investBase = Math.max(0, cashPrice - entryValue);
    const investGain = investBase * (Math.pow(1 + Math.max(0, yieldRate) / 100, months) - 1);
    const diff = totalFinanced - cashPrice - investGain;
    const breakEven =
      investBase > 0 && totalFinanced > cashPrice
        ? Math.pow(1 + (totalFinanced - cashPrice) / investBase, 1 / months) - 1
        : 0;

    return {
      months,
      cashPrice,
      financed,
      installment,
      totalFinanced,
      interest,
      investGain,
      diff,
      breakEven,
      valid: price > 0 && financed > 0,
    };
  }, [price, discount, entry, rate, installments, yieldRate]);

  return (
    <CalcShell title={t.title} subtitle={t.subtitle} footer={t.hint}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <NumberField label={t.price} value={price} onChange={setPrice} prefix="R$" />
        <NumberField label={t.discount} value={discount} onChange={setDiscount} suffix="%" max={100} />
        <NumberField label={t.entry} value={entry} onChange={setEntry} suffix="%" max={100} />
        <NumberField label={t.rate} value={rate} onChange={setRate} suffix="% a.m." max={100} />
        <NumberField
          label={t.installments}
          value={installments}
          onChange={setInstallments}
          suffix="x"
          min={1}
          max={600}
        />
        <NumberField
          label={t.yield}
          value={yieldRate}
          onChange={setYieldRate}
          suffix="% a.m."
          max={100}
        />
      </div>

      <div className="mt-6">
        {result.valid ? (
          <ResultPanel
            label={result.diff >= 0 ? t.betterCash : t.betterFinancing}
            value={formatBRL(Math.abs(result.diff))}
            tone={result.diff >= 0 ? "green" : "amber"}
          >
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              <Stat label={t.payment} value={formatBRL(result.installment)} />
              <Stat label={t.totalFinanced} value={formatBRL(result.totalFinanced)} />
              <Stat label={t.interest} value={formatBRL(result.interest)} tone="amber" />
              <Stat label={t.investGain} value={formatBRL(result.investGain)} tone="green" />
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-ink-2">
              <span>
                {t.breakEven}:{" "}
                <strong className="font-mono text-green">
                  {formatPercent(result.breakEven * 100)}
                </strong>{" "}
                ao mês
              </span>
              <span>
                {t.financed}: <strong className="font-mono text-ink">{formatBRL(result.financed)}</strong>
              </span>
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
