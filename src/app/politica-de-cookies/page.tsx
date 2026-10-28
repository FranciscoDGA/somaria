import type { Metadata } from "next";
import Link from "next/link";

import { LegalPage } from "@/components/LegalPage";
import { ManageCookies } from "@/components/ManageCookies";
import { copy } from "@/lib/copy";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description:
    "Quais cookies a Sobraria usa, para que servem, como o Google AdSense se relaciona com eles e como você pode aceitar, recusar ou rever a sua escolha.",
  alternates: { canonical: "/politica-de-cookies" },
};

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow={copy.legal.cookies.eyebrow}
      title={copy.legal.cookies.title}
      updated={copy.legal.cookies.updated}
      intro="Cookies são arquivos pequenos que o seu navegador guarda quando você visita um site. Eles não são vírus e não executam programas. Nesta página, explicamos exatamente o que a Sobraria guarda e por quê."
    >
      <h2>1. Como escolhemos os cookies</h2>
      <p>
        O site funciona sem cookies de publicidade. Os cookies essenciais guardam apenas a sua
        decisão de consentimento e preferências básicas de navegação. Os cookies de medição e de
        publicidade só entram em ação depois que você clica em “Aceitar todos”. Se você escolher
        “Só o essencial”, o script do Google AdSense não é carregado.
      </p>
      <p>
        Você pode mudar de ideia a qualquer momento. Basta usar o botão abaixo ou o link
        “Gerenciar cookies” no rodapé.
      </p>
      <p>
        <ManageCookies />
      </p>

      <h2>2. Categorias que usamos</h2>
      <h3>Essenciais</h3>
      <ul>
        <li>
          <strong>sobraria-cookie-consent:</strong> guarda a sua escolha (“accepted” ou
          “essential”) no localStorage do navegador. Sem ele, o banner reaparece em toda visita.
          Não é enviado para servidores.
        </li>
      </ul>

      <h3>Medição</h3>
      <p>
        Podemos usar o Vercel Analytics para contar visitas e páginas mais lidas de forma agregada.
        A ferramenta não cria perfis individuais nem vende dados. Se você recusar os cookies, a
        medição pode continuar de forma anônima e agregada, sem identificar você.
      </p>

      <h3>Publicidade</h3>
      <p>
        Com o seu aceite, o Google AdSense pode definir cookies para exibir anúncios, limitar a
        frequência e medir o desempenho. O Google pode usar o cookie DoubleClick para personalizar
        anúncios com base em visitas anteriores a este e a outros sites.
      </p>
      <p>
        Parceiros do Google também podem usar cookies ou identificadores semelhantes. A lista de
        fornecedores certificados e as práticas de cada um estão em{" "}
        <a
          href="https://policies.google.com/technologies/partner-sites"
          target="_blank"
          rel="noopener noreferrer"
        >
          policies.google.com/technologies/partner-sites
        </a>
        .
      </p>

      <h2>3. Como desativar a personalização</h2>
      <ul>
        <li>
          <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer">
            Configurações de anúncios do Google
          </a>{" "}
          — desliga a personalização na sua conta Google.
        </li>
        <li>
          <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">
            aboutads.info
          </a>{" "}
          — opt-out setorial nos Estados Unidos.
        </li>
        <li>
          <a href="https://www.youronlinechoices.com/br/" target="_blank" rel="noopener noreferrer">
            Your Online Choices
          </a>{" "}
          — iniciativa europeia com controles por fornecedor.
        </li>
        <li>
          No navegador, você pode bloquear cookies de terceiros nas configurações de privacidade.
          Isso pode afetar o funcionamento de alguns sites, mas não impede a leitura dos nossos
          artigos.
        </li>
      </ul>

      <h2>4. Cookies de terceiros</h2>
      <p>
        Quando autorizados, os seguintes terceiros podem definir cookies: Google (AdSense,
        DoubleClick), Vercel (analytics e hospedagem) e o provedor de e-mail da newsletter, que
        atua apenas quando você clica em links de uma edição. Não controlamos diretamente os
        cookies desses terceiros; consulte as políticas deles para detalhes.
      </p>

      <h2>5. Prazo de retenção</h2>
      <p>
        O cookie de consentimento fica no seu navegador até você limpar os dados ou mudar a escolha.
        Cookies de publicidade costumam durar de alguns dias a 13 meses, conforme a configuração do
        fornecedor. Cookies de sessão expiram quando você fecha o navegador.
      </p>

      <h2>6. Se você não quiser cookies</h2>
      <p>
        Você pode navegar com “Só o essencial”, bloquear cookies de terceiros no navegador ou usar o
        modo de navegação privada. Nenhuma dessas escolhas impede o acesso ao conteúdo, às
        calculadoras ou à newsletter.
      </p>

      <h2>7. Mais informações</h2>
      <p>
        Para saber como tratamos dados pessoais, leia a{" "}
        <Link href="/politica-de-privacidade">Política de Privacidade</Link>. Dúvidas sobre cookies
        podem ser enviadas para <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
