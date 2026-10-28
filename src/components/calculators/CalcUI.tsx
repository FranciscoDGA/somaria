"use client";

import { useId, type ReactNode } from "react";
import { formatNumber, parseNumber } from "@/lib/format";
import { Calculator } from "../Icons";

export function CalcShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-card border border-line bg-bg-1">
      <div className="border-b border-line bg-bg-2/30 px-5 py-5 sm:px-6">
        <div className="flex items-center gap-2">
          <Calculator size={15} className="text-green" />
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-green">
            Calculadora
          </p>
        </div>
        <h3 className="mt-2 font-display text-xl font-extrabold tracking-tight text-ink sm:text-2xl">
          {title}
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-ink-2">{subtitle}</p>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
      {footer && (
        <div className="border-t border-line bg-bg-2/20 px-5 py-3 text-[10px] leading-relaxed text-ink-2/75 sm:px-6">
          {footer}
        </div>
      )}
    </section>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  hint,
  min = 0,
  max = 1000000000,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  suffix?: string;
  hint?: string;
  min?: number;
  max?: number;
}) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-[11px] text-ink-2/75">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="text"
          inputMode="decimal"
          defaultValue={formatNumber(value)}
          onChange={(event) => {
            const parsed = parseNumber(event.target.value);
            onChange(Math.min(max, Math.max(min, parsed)));
          }}
          onBlur={(event) => {
            event.target.value = formatNumber(parseNumber(event.target.value));
          }}
          className={`field ${prefix ? "pl-10" : ""} ${suffix ? "pr-12" : ""}`}
        />
        {suffix && (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-[10px] text-ink-2/75">
            {suffix}
          </span>
        )}
      </div>
      {hint && <p className="mt-1.5 text-[10px] leading-relaxed text-ink-2/75">{hint}</p>}
    </div>
  );
}

export function ResultPanel({
  label,
  value,
  tone = "green",
  children,
}: {
  label: string;
  value: string;
  tone?: "green" | "amber" | "red";
  children?: ReactNode;
}) {
  const color = tone === "green" ? "text-green" : tone === "amber" ? "text-amber" : "text-red";

  return (
    <div className="rounded-card border border-green-deep/60 bg-bg-2/55 p-5">
      <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-ink-2/75">
        {label}
      </p>
      <p className={`mt-2 font-mono text-3xl font-bold leading-none tracking-tight sm:text-4xl ${color}`}>
        {value}
      </p>
      {children && <div className="mt-4 border-t border-line/70 pt-4">{children}</div>}
    </div>
  );
}

export function Stat({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: string;
  tone?: "default" | "green" | "amber" | "red";
}) {
  const color =
    tone === "green"
      ? "text-green"
      : tone === "amber"
        ? "text-amber"
        : tone === "red"
          ? "text-red"
          : "text-ink";

  return (
    <div className="rounded-field border border-line/80 bg-bg-1/60 px-3.5 py-3">
      <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-ink-2/75">{label}</p>
      <p className={`mt-1 font-mono text-sm font-bold ${color}`}>{value}</p>
    </div>
  );
}

export function CalcNote({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-[10px] leading-relaxed text-ink-2/75">{children}</p>;
}
