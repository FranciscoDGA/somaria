import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política Editorial",
  description:
    "Como a Sobraria escolhe pautas, faz contas, usa fontes, corrige erros e separa publicidade de conteúdo. Nossos compromissos editoriais.",
  alternates: { canonical: "/politica-editorial" },
};

export default function PoliticaEditorialPage() {
  return (
    <LegalPage
      eyebrow="Transparência"
      title="Política Editorial"
      updated="Última atualização: 27 de outubro de 2026"
      intro="A Sobraria existe para responder perguntas de dinheiro com contas abertas, não com opinião. Esta página descreve como trabalhamos, o que fazemos quando erramos e como a publicidade se relaciona com o conteúdo."
    >
      <h2>1. Nossa missão</h2>
      <p>
        Transformar decisões financeiras do dia a dia em contas compreensíveis. Cada artigo parte de
        uma pergunta concreta — “financiar ou pagar à vista?”, “consórcio ou financiamento?” — e
        termina com um número, as premissas usadas e uma calculadora para o leitor testar a própria
        realidade.
      </p>
      <p>
        Não prometemos enriquecimento, não vendemos “métodos” e não tratamos finanças como moral.
        Nosso compromisso é com a clareza e com a reprodução da conta.
      </p>

      <h2>2. Como escolhemos as pautas</h2>
      <ul>
        <li>Dúvidas reais de busca, com intenção de decisão e volume relevante em português.</li>
        <li>Perguntas recebidas por e-mail ou nas redes, especialmente as que repetem.</li>
        <li>Temas em que uma conta muda a resposta — e não apenas repete consenso.</li>
        <li>Assuntos perenes, que continuam válidos por anos, com atualização periódica.</li>
      </ul>
      <p>
        Evitamos pautas de “10 dicas” genéricas, listas sem consequência prática e textos que
        apenas reescrevem o que já está nos primeiros resultados do Google.
      </p>

      <h2>3. Como as contas são feitas</h2>
      <p>
        Usamos premissas explícitas: valor, taxa, prazo, entrada, tributos e rendimento
        alternativo. As taxas vêm de fontes oficiais (Banco Central, IBGE, Caixa, Receita Federal),
        de simuladores de instituições financeiras ou de medidores públicos de mercado. Quando o
        número é ilustrativo, dizemos isso no artigo e na legenda da imagem.
      </p>
      <p>
        Os cálculos são feitos em planilha e replicados no código das calculadoras. Sempre que
        possível, o leitor consegue refazer o resultado com os próprios números. Se uma premissa
        mudar, o artigo é atualizado e a data de modificação é registrada.
      </p>

      <h2>4. Fontes e citações</h2>
      <p>
        Cada artigo traz um bloco “Fontes e metodologia” com links para as referências usadas. Não
        citamos estudos que não conseguimos verificar. Quando a fonte é uma norma, indicamos o
        órgão e o ano; quando é uma taxa de mercado, indicamos a data da coleta.
      </p>

      <h2>5. Uso de inteligência artificial</h2>
      <p>
        Podemos usar ferramentas de IA para apoiar pesquisa, revisão de clareza e organização de
        dados. A responsabilidade editorial é humana: uma pessoa revisa as premissas, confere os
        números e aprova a publicação. Nenhum artigo é publicado apenas por geração automática.
        Erros que passarem pela revisão são corrigidos assim que identificados.
      </p>

      <h2>6. Autoria e responsabilidade</h2>
      <p>
        Os textos são assinados pela <strong>Redação Sobraria</strong>, equipe de produto, dados e
        jornalismo de finanças. Não somos consultoria de valores mobiliários, não fazemos
        recomendação individual de investimento e não recebemos para recomendar produtos.
      </p>

      <h2>7. Publicidade e independência</h2>
      <p>
        O site pode exibir anúncios do Google AdSense e, no futuro, conteúdos patrocinados. A
        publicidade é sinalizada e nunca se disfarça de análise. Anunciantes não têm acesso ao texto
        antes da publicação, não escolhem o veredito e não podem pedir alteração de conclusão.
      </p>
      <p>
        Se houver link de afiliado, ele é identificado no próprio parágrafo. A comissão não altera o
        preço para o leitor nem o resultado da conta. Não recomendamos produto que não passaríamos
        para a nossa própria família.
      </p>

      <h2>8. Correções</h2>
      <p>
        Erros acontecem. Quando identificamos um erro de número, fonte ou interpretação, corrigimos
        o texto e registramos a data de atualização. Correções relevantes ganham uma nota no fim do
        artigo. Se você encontrar um problema, escreva para{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> com o link e o trecho — respondemos em até
        3 dias úteis.
      </p>

      <h2>9. Comentários e participação</h2>
      <p>
        Não mantemos comentários abertos no site. Dúvidas e discordâncias são bem-vindas por e-mail
        e podem virar perguntas frequentes ou novos artigos. Não publicamos mensagens com dados
        pessoais de terceiros, ameaças ou spam.
      </p>

      <h2>10. Limites do conteúdo</h2>
      <p>
        Nossos artigos são educacionais e ilustrativos. Taxas, tributos e regras mudam; confira
        sempre as condições vigentes no seu banco, corretora ou órgão público. Nada aqui substitui
        uma consultoria personalizada, especialmente em casos de dívida grave, sucessão ou
        planejamento tributário.
      </p>

      <h2>11. Fale com a redação</h2>
      <p>
        Para correções, pautas e parcerias, use a <Link href="/contato">página de contato</Link> ou
        escreva para <a href={`mailto:${site.email}`}>{site.email}</a>. Para saber como tratamos
        dados, veja a <Link href="/politica-de-privacidade">Política de Privacidade</Link>.
      </p>
    </LegalPage>
  );
}
