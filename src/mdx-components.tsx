import type { MDXComponents } from "mdx/types";

import { AvisoNumeros } from "@/components/mdx/AvisoNumeros";
import { Calculadora } from "@/components/calculators/Calculadora";
import { Cenarios } from "@/components/mdx/Cenarios";
import { Faq } from "@/components/mdx/Faq";
import { Figura } from "@/components/mdx/Figura";
import { Grafico } from "@/components/mdx/Grafico";
import { Num } from "@/components/mdx/Num";
import { TabelaCompara } from "@/components/mdx/TabelaCompara";
import { Veredito } from "@/components/mdx/Veredito";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Veredito,
    Calculadora,
    TabelaCompara,
    Faq,
    AvisoNumeros,
    Figura,
    Grafico,
    Cenarios,
    Num,
    ...components,
  };
}
