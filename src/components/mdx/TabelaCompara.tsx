type TabelaComparaProps = {
  titulo?: string;
  colunas: string[];
  linhas: Array<Array<string | number>>;
  destaque?: number;
  legenda?: string;
};

export function TabelaCompara({
  titulo,
  colunas,
  linhas,
  destaque,
  legenda,
}: TabelaComparaProps) {
  return (
    <div className="my-8 overflow-hidden rounded-card border border-line bg-bg-1/40">
      {titulo && (
        <div className="border-b border-line px-5 py-4">
          <h3 className="font-display text-base font-bold text-ink">{titulo}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <thead>
            <tr>
              {colunas.map((coluna, index) => (
                <th
                  key={`${coluna}-${index}`}
                  scope="col"
                  className={`border-b border-line px-4 py-3 font-mono text-[9px] font-bold uppercase tracking-[0.12em] ${
                    index === destaque ? "bg-green/[0.04] text-green" : "text-ink-2/75"
                  }`}
                >
                  {coluna}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {linhas.map((linha, rowIndex) => (
              <tr key={rowIndex} className="border-b border-line/60 last:border-0">
                {linha.map((celula, cellIndex) => {
                  if (cellIndex === 0) {
                    return (
                      <th
                        key={cellIndex}
                        scope="row"
                        className="px-4 py-3 text-left text-xs font-medium text-ink-2"
                      >
                        {celula}
                      </th>
                    );
                  }
                  return (
                    <td
                      key={cellIndex}
                      className={`px-4 py-3 text-xs ${
                        cellIndex === destaque
                          ? "bg-green/[0.04] font-mono font-semibold text-ink"
                          : "text-ink-2"
                      }`}
                    >
                      {celula}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {legenda && (
        <p className="border-t border-line px-5 py-3 text-[10px] leading-relaxed text-ink-2/75">
          {legenda}
        </p>
      )}
    </div>
  );
}
