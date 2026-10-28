import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/LegalPage";
import { copy } from "@/lib/copy";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a Sobraria coleta, usa e protege dados pessoais, incluindo cookies, Google AdSense, analytics e os direitos previstos na LGPD.",
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function PrivacidadePage() {
  return (
    <LegalPage
      eyebrow={copy.legal.privacy.eyebrow}
      title={copy.legal.privacy.title}
      updated={copy.legal.privacy.updated}
      intro="Esta política explica, em português claro, quais dados a Sobraria coleta, por que coleta, com quem compartilha e como você pode exercer os seus direitos. Ela vale para o site sobraria.com.br e para a newsletter A Conta da Semana."
    >
      <h2>1. Quem é o controlador</h2>
      <p>
        O controlador dos dados é a <strong>Sobraria</strong>, site editorial de finanças pessoais
        sediado no Brasil. Contato para qualquer assunto de privacidade:{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>. Não temos loja, não vendemos produtos e
        não exigimos cadastro para ler artigos ou usar as calculadoras.
      </p>

      <h2>2. Quais dados coletamos</h2>
      <ul>
        <li>
          <strong>Newsletter:</strong> endereço de e-mail e a origem da inscrição (por exemplo, a
          página em que você assinou). Se você informar um nome, ele também é armazenado.
        </li>
        <li>
          <strong>Contato:</strong> nome, e-mail, assunto e o conteúdo da mensagem que você enviar.
        </li>
        <li>
          <strong>Navegação:</strong> dados técnicos agregados, como páginas visitadas, tipo de
          dispositivo, navegador e país. Não usamos esses dados para identificar você
          individualmente.
        </li>
        <li>
          <strong>Cookies e tecnologias similares:</strong> pequenos arquivos armazenados no seu
          navegador, conforme a sua escolha no banner de consentimento.
        </li>
      </ul>
      <p>
        As calculadoras rodam inteiramente no seu navegador. Os valores que você digita não são
        enviados, armazenados ou associados a você.
      </p>

      <h2>3. Para que usamos os dados</h2>
      <ul>
        <li>Enviar a newsletter semanal que você pediu para receber.</li>
        <li>Responder mensagens, dúvidas, correções e propostas de parceria.</li>
        <li>Entender, de forma agregada, quais conteúdos são úteis e melhorar o site.</li>
        <li>Exibir anúncios que mantenham o site gratuito, quando você consente.</li>
        <li>Cumprir obrigações legais e prevenir abuso, spam e fraude.</li>
      </ul>

      <h2>4. Bases legais (LGPD)</h2>
      <p>
        Tratamos dados com base no <strong>consentimento</strong> (newsletter, cookies de
        publicidade e analytics), na <strong>execução de contrato</strong> (entrega do conteúdo
        assinado), no <strong>legítimo interesse</strong> (segurança, melhoria editorial e
        resposta a contatos) e no <strong>cumprimento de obrigação legal</strong>, quando aplicável.
        Você pode retirar o consentimento a qualquer momento, sem prejuízo do uso anterior.
      </p>

      <h2>5. Cookies e publicidade</h2>
      <p>
        Usamos três categorias de cookies: <strong>essenciais</strong> (necessários para o site
        funcionar e para lembrar a sua escolha de consentimento), <strong>de medição</strong>{" "}
        (audiência agregada) e <strong>de publicidade</strong> (somente após o seu aceite).
      </p>
      <p>
        O site pode exibir anúncios do <strong>Google AdSense</strong>. O Google e seus parceiros
        podem usar cookies, incluindo o cookie DoubleClick, para veicular anúncios com base em
        visitas anteriores a este e a outros sites. Quando você recusa os cookies de publicidade,
        o script do AdSense não é carregado.
      </p>
      <p>
        Você pode desativar a publicidade personalizada nas{" "}
        <a
          href="https://adssettings.google.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Configurações de anúncios do Google
        </a>{" "}
        ou consultar as{" "}
        <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
          práticas de privacidade dos parceiros do Google
        </a>
        . Nos EUA, o opt-out setorial também está disponível em{" "}
        <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
          aboutads.info
        </a>
        . Para detalhes sobre categorias e gerenciamento, veja a{" "}
        <Link href="/politica-de-cookies">Política de Cookies</Link>.
      </p>

      <h2>6. Analytics</h2>
      <p>
        Podemos usar o Vercel Analytics para medir audiência de forma agregada, sem cookies de
        rastreamento individual e sem perfilamento comportamental. Também podemos usar métricas
        internas de desempenho para corrigir páginas lentas e erros.
      </p>

      <h2>7. Compartilhamento</h2>
      <p>
        Não vendemos, alugamos ou trocamos dados pessoais. Compartilhamos apenas o necessário com
        prestadores que nos ajudam a operar o site: hospedagem (Vercel), provedor de e-mail da
        newsletter, ferramentas de analytics e o Google, para exibição de anúncios quando
        consentida. Esses prestadores tratam os dados conforme contratos e políticas próprias.
      </p>
      <p>
        Podemos divulgar informações se formos legalmente obrigados, para proteger direitos ou em
        caso de reorganização societária — sempre com aviso nesta página.
      </p>

      <h2>8. Transferência internacional</h2>
      <p>
        Alguns prestadores estão sediados fora do Brasil, principalmente nos Estados Unidos. Nesses
        casos, buscamos garantias contratuais adequadas e limitamos o tratamento ao necessário para
        a finalidade informada, conforme os artigos 33 e seguintes da LGPD.
      </p>

      <h2>9. Por quanto tempo guardamos</h2>
      <ul>
        <li>E-mail da newsletter: enquanto a inscrição estiver ativa, ou até você pedir exclusão.</li>
        <li>Mensagens de contato: até 24 meses, para histórico de correções e atendimento.</li>
        <li>Dados de navegação agregados: conforme a retenção do provedor de analytics.</li>
        <li>Registros de consentimento: pelo prazo necessário para comprovar a sua escolha.</li>
      </ul>

      <h2>10. Seus direitos</h2>
      <p>
        Você pode pedir confirmação de tratamento, acesso, correção, anonimização, portabilidade,
        eliminação, informação sobre compartilhamento e revogação do consentimento. Basta escrever
        para <a href={`mailto:${site.email}`}>{site.email}</a> com o assunto “Privacidade”. Respondemos
        em até 15 dias, podendo pedir uma confirmação de identidade para proteger os seus dados.
      </p>
      <p>
        Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD), pelo site{" "}
        <a href="https://www.gov.br/anpd/" target="_blank" rel="noopener noreferrer">
          gov.br/anpd
        </a>
        .
      </p>

      <h2>11. Segurança</h2>
      <p>
        Adotamos medidas técnicas e organizacionais razoáveis: conexão HTTPS, acesso restrito às
        ferramentas, senhas fortes e revisão periódica de acessos. Nenhum sistema é infalível; se
        ocorrer um incidente relevante, comunicaremos os titulares e a ANPD conforme a lei.
      </p>

      <h2>12. Crianças e adolescentes</h2>
      <p>
        O site é destinado a maiores de 18 anos e não coleta intencionalmente dados de crianças ou
        adolescentes. Se identificarmos esse tipo de dado, ele será eliminado.
      </p>

      <h2>13. Alterações desta política</h2>
      <p>
        Podemos atualizar esta política para refletir mudanças no site, na lei ou nos serviços
        usados. A data no topo indica a última revisão. Mudanças relevantes serão destacadas na
        newsletter e nesta página.
      </p>

      <h2>14. Contato</h2>
      <p>
        Dúvidas sobre privacidade: <a href={`mailto:${site.email}`}>{site.email}</a>. Para outros
        assuntos, use a <Link href="/contato">página de contato</Link>.
      </p>
    </LegalPage>
  );
}
