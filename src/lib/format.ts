const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const brl0 = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const brlCompact = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  notation: "compact",
  maximumFractionDigits: 1,
});

const decimal = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatBRL(value: number): string {
  if (!Number.isFinite(value)) return "R$ 0,00";
  return brl.format(value);
}

export function formatBRL0(value: number): string {
  if (!Number.isFinite(value)) return "R$ 0";
  return brl0.format(value);
}

export function formatBRLCompact(value: number): string {
  if (!Number.isFinite(value)) return "R$ 0";
  return brlCompact.format(value);
}

export function formatNumber(value: number): string {
  if (!Number.isFinite(value)) return "0";
  return decimal.format(value);
}

export function formatPercent(value: number, digits = 2): string {
  return `${new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value)}%`;
}

export function formatDate(iso: string): string {
  const date = new Date(`${iso}T12:00:00`);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function formatDateShort(iso: string): string {
  const date = new Date(`${iso}T12:00:00`);
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatHours(hours: number): string {
  if (!Number.isFinite(hours) || hours <= 0) return "0 h";
  const whole = Math.floor(hours);
  const minutes = Math.round((hours - whole) * 60);
  if (minutes === 60) return `${whole + 1} h`;
  if (whole === 0) return `${minutes} min`;
  return minutes > 0 ? `${whole} h ${minutes} min` : `${whole} h`;
}

export function parseNumber(input: string): number {
  const clean = input.replace(/[^\d,.-]/g, "").trim();
  if (!clean) return 0;

  if (clean.includes(",")) {
    return Number.parseFloat(clean.replace(/\./g, "").replace(",", ".")) || 0;
  }

  // "1.000" e "1.000.000" são milhares; "1.5" é decimal.
  if (/^\d{1,3}(\.\d{3})+$/.test(clean)) {
    return Number.parseFloat(clean.replace(/\./g, "")) || 0;
  }

  return Number.parseFloat(clean) || 0;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function monthlyRateFromAnnual(annualPercent: number): number {
  return Math.pow(1 + annualPercent / 100, 1 / 12) - 1;
}

export function payment(principal: number, monthlyRate: number, months: number): number {
  if (months <= 0) return 0;
  if (monthlyRate === 0) return principal / months;
  return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
}

export function futureValue(
  principal: number,
  monthlyContribution: number,
  monthlyRate: number,
  months: number,
): number {
  if (months <= 0) return principal;
  if (monthlyRate === 0) return principal + monthlyContribution * months;
  const growth = Math.pow(1 + monthlyRate, months);
  return principal * growth + monthlyContribution * ((growth - 1) / monthlyRate);
}

export function readingTimeFrom(content: string): number {
  const words = content
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_>`{}[\]()]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
