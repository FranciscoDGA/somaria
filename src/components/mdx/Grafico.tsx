import { formatBRL, formatBRL0, formatNumber, formatPercent } from "@/lib/format";

type Cor = "green" | "amber" | "red" | "ink";

export type GraficoItem = {
  label: string;
  value: number;
  color?: Cor;
  note?: string;
};

type GraficoProps = {
  titulo: string;
  subtitulo?: string;
  dados: GraficoItem[];
  max?: number;
  formato?: "brl" | "brl2" | "num" | "meses" | "percent";
  referencia?: { valor: number; rotulo: string; cor?: Cor };
  legenda?: string;
};

const barClass: Record<Cor, string> = {
  green: "bg-green/90",
  amber: "bg-amber/90",
  red: "bg-red/90",
  ink: "bg-ink-2/80",
};

const textClass: Record<Cor, string> = {
  green: "text-green",
  amber: "text-amber",
  red: "text-red",
  ink: "text-ink-2",
};

function formatValue(value: number, formato: GraficoProps["formato"]): string {
  switch (formato) {
    case "brl2":
      return formatBRL(value);
    case "num":
      return formatNumber(value);
    case "meses":
      return `${formatNumber(value)} ${value === 1 ? "mês" : "meses"}`;
    case "percent":
      return formatPercent(value);
    default:
      return formatBRL0(value);
  }
}

export function Grafico({
  titulo,
  subtitulo,
  dados,
  max,
  formato = "brl",
  referencia,
  legenda,
}: GraficoProps) {
  const maior = Math.max(...dados.map((item) => item.value), referencia?.valor ?? 0, 1);
  const escala = max ?? maior * 1.1;
  const resumo =
    dados.map((item) => `${item.label}: ${formatValue(item.value, formato)}`).join("; ") +
    (referencia ? `. Referência: ${referencia.rotulo}` : "");

  return (
    <figure className="my-8 rounded-card border border-line bg-bg-1/40 p-5 sm:p-6">
      <figcaption>
        <h3 className="font-display text-base font-bold leading-snug text-ink sm:text-lg">
          {titulo}
        </h3>
        {subtitulo && (
          <p className="mt-1.5 text-xs leading-relaxed text-ink-2">{subtitulo}</p>
        )}
      </figcaption>

      <div className="mt-8" role="img" aria-label={resumo}>
        <div className="relative h-52 sm:h-60">
          <div className="absolute inset-0 flex items-end gap-3 sm:gap-6">
            {dados.map((item) => {
              const cor = item.color ?? "green";
              const altura = Math.max(2, (item.value / escala) * 100);
              return (
                <div
                  key={item.label}
                  className="flex h-full flex-1 flex-col items-center justify-end"
                >
                  <span className={`mb-2 font-mono text-[10px] font-bold ${textClass[cor]}`}>
                    {formatValue(item.value, formato)}
                  </span>
                  <div
                    className={`w-full max-w-[64px] rounded-t-md ${barClass[cor]}`}
                    style={{ height: `${altura}%` }}
                  />
                </div>
              );
            })}
          </div>

          {referencia && (
            <div
              className="absolute inset-x-0 z-10 border-t border-dashed border-ink-2/40"
              style={{ bottom: `${Math.min(100, (referencia.valor / escala) * 100)}%` }}
            />
          )}
        </div>

        <div className="mt-3 flex gap-3 sm:gap-6">
          {dados.map((item) => (
            <div key={item.label} className="flex-1 text-center">
              <p className="text-[10px] leading-tight text-ink-2">{item.label}</p>
              {item.note && (
                <p className="mt-1 text-[9px] leading-tight text-ink-2/75">{item.note}</p>
              )}
            </div>
          ))}
        </div>

        {referencia && (
          <p className="mt-3 flex items-center justify-center gap-2 text-[10px] text-ink-2">
            <span
              aria-hidden="true"
              className="inline-block w-6 border-t border-dashed border-ink-2/60"
            />
            {referencia.rotulo}
          </p>
        )}
      </div>

      {legenda && (
        <p className="mt-4 border-t border-line pt-3 text-[10px] leading-relaxed text-ink-2/75">
          {legenda}
        </p>
      )}
    </figure>
  );
}
