type Tom = "green" | "amber" | "red" | "ink";

export type CenarioItem = {
  titulo: string;
  texto: string;
  rotulo?: string;
  tom?: Tom;
};

type CenariosProps = {
  titulo: string;
  subtitulo?: string;
  itens: CenarioItem[];
  legenda?: string;
};

const borda: Record<Tom, string> = {
  green: "border-green/30 bg-green/[0.04]",
  amber: "border-amber/30 bg-amber/[0.04]",
  red: "border-red/30 bg-red/[0.04]",
  ink: "border-line bg-bg-1/40",
};

const rotuloCor: Record<Tom, string> = {
  green: "text-green",
  amber: "text-amber",
  red: "text-red",
  ink: "text-ink-2",
};

export function Cenarios({ titulo, subtitulo, itens, legenda }: CenariosProps) {
  return (
    <figure className="my-8">
      <div className="rounded-card border border-line bg-bg-1/40 p-5 sm:p-6">
        <figcaption>
          <h3 className="font-display text-base font-bold leading-snug text-ink sm:text-lg">
            {titulo}
          </h3>
          {subtitulo && (
            <p className="mt-1.5 text-xs leading-relaxed text-ink-2">{subtitulo}</p>
          )}
        </figcaption>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {itens.map((item, index) => {
            const tom = item.tom ?? "ink";
            return (
              <div
                key={item.titulo}
                className={`rounded-field border p-4 ${borda[tom]}`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-ink-2/75">
                    Caminho {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.rotulo && (
                    <span
                      className={`font-mono text-[9px] font-bold uppercase tracking-[0.1em] ${rotuloCor[tom]}`}
                    >
                      {item.rotulo}
                    </span>
                  )}
                </div>
                <p className="mt-2.5 font-display text-sm font-bold leading-snug text-ink">
                  {item.titulo}
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-ink-2">
                  {item.texto}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {legenda && (
        <p className="mt-2.5 text-center text-[11px] leading-relaxed text-ink-2/75">
          {legenda}
        </p>
      )}
    </figure>
  );
}
