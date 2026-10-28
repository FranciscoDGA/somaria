"use client";

import type { ComponentType } from "react";
import { ComprarVsAlugar } from "./ComprarVsAlugar";
import { FinanciamentoVsVista } from "./FinanciamentoVsVista";
import { HoraTrabalho } from "./HoraTrabalho";
import { JurosCompostos } from "./JurosCompostos";
import { PrazoFinanciamento } from "./PrazoFinanciamento";
import { ReservaEmergencia } from "./ReservaEmergencia";
import { RotativoCartao } from "./RotativoCartao";

type CalculatorProps = { defaults?: Record<string, number> };

const registry: Record<string, ComponentType<CalculatorProps>> = {
  "financiamento-vs-vista": FinanciamentoVsVista,
  "juros-compostos": JurosCompostos,
  "rotativo-cartao": RotativoCartao,
  "reserva-emergencia": ReservaEmergencia,
  "hora-trabalho": HoraTrabalho,
  "comprar-vs-alugar": ComprarVsAlugar,
  "prazo-financiamento": PrazoFinanciamento,
};

export function Calculadora({
  type,
  defaults,
}: {
  type: string;
  defaults?: Record<string, number>;
}) {
  const Component = registry[type];
  if (!Component) return null;

  return (
    <div id={type} className="scroll-mt-24">
      <Component defaults={defaults} />
    </div>
  );
}
