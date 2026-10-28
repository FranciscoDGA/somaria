import type { ComponentType } from "react";

import CarroVsVista from "@content/vale-a-pena/financiar-carro-ou-pagar-a-vista.mdx";
import Consorcio from "@content/vale-a-pena/consorcio-ou-financiamento-imobiliario.mdx";
import Parcelar from "@content/vale-a-pena/vale-a-pena-parcelar-sem-juros.mdx";
import Reserva from "@content/vale-a-pena/reserva-de-emergencia-quanto-guardar.mdx";
import Rotativo from "@content/vale-a-pena/rotativo-do-cartao-quanto-custa-pagar-o-minimo.mdx";
import ComprarAlugar from "@content/vale-a-pena/comprar-ou-alugar-imovel.mdx";
import TrocarCarro from "@content/vale-a-pena/vale-a-pena-trocar-de-carro.mdx";
import Decimo from "@content/vale-a-pena/decimo-salario-quitar-divida-ou-investir.mdx";
import Fgts from "@content/vale-a-pena/fgts-amortizar-ou-deixar-rendendo.mdx";
import Assinaturas from "@content/vale-a-pena/assinaturas-custo-real.mdx";
import Reforma from "@content/vale-a-pena/reforma-a-vista-parcelada-ou-credito.mdx";
import Prazo from "@content/vale-a-pena/financiamento-20-ou-30-anos.mdx";

import Orcamento from "@content/blog/orcamento-que-funciona.mdx";
import Cdi from "@content/blog/cdi-selic-poupanca.mdx";
import Cafezinho from "@content/blog/custo-de-oportunidade-cafezinho.mdx";

export const mdxRegistry: Record<string, ComponentType> = {
  "financiar-carro-ou-pagar-a-vista": CarroVsVista,
  "consorcio-ou-financiamento-imobiliario": Consorcio,
  "vale-a-pena-parcelar-sem-juros": Parcelar,
  "reserva-de-emergencia-quanto-guardar": Reserva,
  "rotativo-do-cartao-quanto-custa-pagar-o-minimo": Rotativo,
  "comprar-ou-alugar-imovel": ComprarAlugar,
  "vale-a-pena-trocar-de-carro": TrocarCarro,
  "decimo-salario-quitar-divida-ou-investir": Decimo,
  "fgts-amortizar-ou-deixar-rendendo": Fgts,
  "assinaturas-custo-real": Assinaturas,
  "reforma-a-vista-parcelada-ou-credito": Reforma,
  "financiamento-20-ou-30-anos": Prazo,
  "orcamento-que-funciona": Orcamento,
  "cdi-selic-poupanca": Cdi,
  "custo-de-oportunidade-cafezinho": Cafezinho,
};

export function getMdxComponent(slug: string): ComponentType | undefined {
  return mdxRegistry[slug];
}
