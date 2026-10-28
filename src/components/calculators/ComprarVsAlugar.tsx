"use client";

import { useMemo, useState } from "react";
import { copy } from "@/lib/copy";
import { formatBRL, formatNumber, monthlyRateFromAnnual, payment } from "@/lib/format";
import { CalcNote, CalcShell, NumberField, ResultPanel, Stat } from "./CalcUI";

type Props = { defaults?: Record<string, number> };

export function ComprarVsAlugar({ defaults }: Props) {
  const t = copy.calculators.alugar;
  const [price, setPrice] = useState(defaults?.price ?? 500000);
  const [down, setDown] = useState(defaults?.down ?? 20);
  const [closing, setClosing] = useState(defaults?.closing ?? 5);
  const [rate, setRate] = useState(defaults?.rate ?? 10.5);
  const [term, setTerm] = useState(defaults?.term ?? 30);
  const [rent, setRent] = useState(defaults?.rent ?? 2200);
  const [appreciation, setAppreciation] = useState(defaults?.appreciation ?? 4);
  const [yieldAnnual, setYieldAnnual] = useState(defaults?.yield ?? 9.38);
  const [horizon, setHorizon] = useState(defaults?.horizon ?? 10);

  const result = useMemo(() => {
    const years = Math.max(1, Math.round(horizon));
    const months = years * 12;
    const loan = Math.max(0, price) * (1 - Math.min(100, Math.max(0, down)) / 100);
    const monthlyRate = monthlyRateFromAnnual(rate);
    const termMonths = Math.max(1, Math.round(term * 12));
    const installment = payment(loan, monthlyRate, termMonths);
    const growth = Math.pow(1 + monthlyRate, Math.min(months, termMonths));
    const balance =
      months >= termMonths ? 0 : Math.max(0, loan * growth - installment * ((growth - 1) / monthlyRate));
    const propertyValue = Math.max(0, price) * Math.pow(1 + appreciation / 100, years);
    const equity = propertyValue - balance;

    const investmentRate = monthlyRateFromAnnual(yieldAnnual);
    let portfolio = Math.max(0, price) * ((down + closing) / 100);
    let currentRent = Math.max(0, rent);

    for (let month = 1; month <= months; month += 1) {
      if (month > 1 && (month - 1) % 12 === 0) currentRent *= 1.04;
      const contribution = (month <= termMonths ? installment : 0) - currentRent;
      portfolio = portfolio * (1 + investmentRate) + contribution;
    }

    return {
      installment,
      equity,
      portfolio,
      difference: portfolio - equity,
      years,
      valid: price > 0 && loan > 0,
    };
  }, [price, down, closing, rate, term, rent, appreciation, yieldAnnual, horizon]);

  return (
    <CalcShell title={t.title} subtitle={t.subtitle} footer={t.note}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <NumberField label={t.price} value={price} onChange={setPrice} prefix="R$" min={1} />
        <NumberField label={t.down} value={down} onChange={setDown} suffix="%" max={100} />
        <NumberField label={t.closing} value={closing} onChange={setClosing} suffix="%" max={100} />
        <NumberField label={t.rate} value={rate} onChange={setRate} suffix="% a.a." max={100} />
        <NumberField label={t.term} value={term} onChange={setTerm} suffix="anos" min={1} max={40} />
        <NumberField label={t.rent} value={rent} onChange={setRent} prefix="R$" />
        <NumberField label={t.appreciation} value={appreciation} onChange={setAppreciation} suffix="% a.a." max={30} />
        <NumberField label={t.yield} value={yieldAnnual} onChange={setYieldAnnual} suffix="% a.a." max={50} />
        <NumberField label={t.horizon} value={horizon} onChange={setHorizon} suffix="anos" min={1} max={40} />
      </div>

      <div className="mt-6">
        {result.valid ? (
          <ResultPanel
            label={result.difference >= 0 ? t.betterRent : t.betterBuy}
            value={formatBRL(Math.abs(result.difference))}
            tone={result.difference >= 0 ? "green" : "amber"}
          >
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              <Stat label={t.buy} value={formatBRL(result.equity)} tone="amber" />
              <Stat label={t.rentPortfolio} value={formatBRL(result.portfolio)} tone="green" />
              <Stat label={t.payment} value={formatBRL(result.installment)} />
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-ink-2">
              Horizonte de {formatNumber(result.years)} anos. O aluguel é reajustado em 4% ao ano.{" "}
              {t.note}
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
