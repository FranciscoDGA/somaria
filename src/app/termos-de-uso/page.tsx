import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Condições de uso do site Sobraria, incluindo conteúdo educacional, propriedade intelectual, calculadoras e limitação de responsabilidade.",
  alternates: { canonical: "/termos-de-uso" },
};

export default function TermosPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Termos de Uso"
      updated="Última atualização: 27 de outubro de 2026"
      intro="Ao acessar a Sobraria, você concorda com estes termos. Eles existem para deixar claro o que o site oferece, o que não oferece e como o conteúdo pode ser usado."
    >
      <h2>1. Aceitação</h2>
      <p>
        O uso de sobraria.com.br e de seus conteúdos implica aceitação destes Termos e da{" "}
        <Link href="/politica-de-privacidade">Política de Privacidade</Link>. Se você não concorda,
        basta não usar o site.
      </p>

      <h2>2. Natureza do conteúdo</h2>
      <p>
        A Sobraria publica conteúdo educacional e ilustrativo sobre finanças pessoais. Os artigos,
        calculadoras e simulações não constituem consultoria financeira, recomendação de
        investimento, análise de valores mobiliários, assessoria jurídica ou contábil.
      </p>
      <p>
        Taxas, tributos, regras e condições de mercado mudam com frequência. Antes de tomar uma
        decisão, confirme as informações na fonte oficial e, se necessário, procure um profissional
        habilitado.
      </p>

      <h2>3. Calculadoras e resultados</h2>
      <p>
        As calculadoras rodam no seu navegador e usam as premissas que você informa. Os resultados
        são estimativas matemáticas, não ofertas de crédito nem garantia de rentabilidade. Podem
        existir diferenças em relação ao seu banco por causa de IOF, tarifas, seguros, arredondamentos
        e critérios contratuais.
      </p>

      <h2>4. Uso permitido</h2>
      <ul>
        <li>Ler, imprimir e compartilhar links dos artigos para uso pessoal.</li>
        <li>Citar trechos curtos com atribuição e link para a página original.</li>
        <li>Usar as calculadoras para fins pessoais e educacionais.</li>
      </ul>
      <p>
        Não é permitido copiar artigos inteiros, republicar conteúdo em outros sites, usar o material
        para treinar modelos comerciais sem autorização, remover marcas ou explorar o site de forma
        automatizada que prejudique o serviço.
      </p>

      <h2>5. Propriedade intelectual</h2>
      <p>
        Textos, ilustrações, marca, layout e código são protegidos por direitos autorais e pertencem
        à Sobraria ou a seus licenciantes. O nome “Sobraria”, o símbolo com “R$” e a identidade
        visual não podem ser usados sem autorização escrita.
      </p>

      <h2>6. Links externos</h2>
      <p>
        O site cita fontes oficiais e, eventualmente, outros veículos. Não controlamos esses sites e
        não respondemos por conteúdo, políticas ou práticas de terceiros. A citação não implica
        endosso.
      </p>

      <h2>7. Publicidade</h2>
      <p>
        O site pode exibir anúncios de terceiros. A presença de um anúncio não significa recomendação.
        Não nos responsabilizamos por produtos ou serviços anunciados, mas nos comprometemos a não
        aceitar publicidade que viole leis brasileiras ou que se disfarce de conteúdo editorial.
      </p>

      <h2>8. Disponibilidade</h2>
      <p>
        Buscamos manter o site no ar e correto, mas não garantimos disponibilidade ininterrupta,
        ausência de erros ou adequação a um propósito específico. Podemos alterar, suspender ou
        remover páginas sem aviso prévio.
      </p>

      <h2>9. Limitação de responsabilidade</h2>
      <p>
        Na máxima extensão permitida pela lei, a Sobraria não responde por perdas financeiras,
        danos indiretos ou decisões tomadas com base no conteúdo. O leitor é responsável por
        verificar as condições aplicáveis ao seu caso.
      </p>

      <h2>10. Alterações</h2>
      <p>
        Podemos atualizar estes termos a qualquer momento. A data no topo indica a última revisão.
        O uso contínuo após a atualização representa concordância com a nova versão.
      </p>

      <h2>11. Legislação e foro</h2>
      <p>
        Estes termos são regidos pelas leis brasileiras. Eventuais controvérsias serão resolvidas no
        foro da comarca do domicílio do usuário, quando aplicável a legislação consumerista.
      </p>

      <h2>12. Contato</h2>
      <p>
        Dúvidas sobre estes termos: <a href={`mailto:${site.email}`}>{site.email}</a> ou pela{" "}
        <Link href="/contato">página de contato</Link>.
      </p>
    </LegalPage>
  );
}
