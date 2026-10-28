# Sobraria

**Finanças pessoais em números.** Cada decisão tem um veredito, uma conta passo a passo e uma calculadora para o leitor testar com os próprios dados.

Site: [sobraria.com.br](https://sobraria.com.br) · Repositório: [github.com/FranciscoDGA/somaria](https://github.com/FranciscoDGA/somaria)

---

## O que tem aqui

- **12 artigos “vale a pena?”** com veredito no topo, conta detalhada, tabela, FAQ, fontes, metodologia e plano de ação.
- **3 ensaios de blog** sobre orçamento, renda fixa e custo de oportunidade.
- **7 calculadoras** que rodam no navegador, sem cadastro e sem dependências externas.
- **30 fotografias reais (CC0, StockSnap)** em WebP 1200×675: capa e foto interna de cada artigo, com crédito e link para a origem.
- **Gráficos e quadros de decisão em HTML/CSS** (`Grafico` e `Cenarios`), sem SVG no conteúdo editorial.
- **SEO técnico**: metadata, Open Graph, Twitter Cards, JSON-LD (Article, FAQPage, WebSite, BreadcrumbList), sitemap, robots e páginas estáticas.
- **AdSense com consentimento**: o script só carrega depois do aceite e cada bloco é renderizado apenas quando cliente e slot estão configurados.
- **Newsletter e contato** com fallback gracioso quando os endpoints não estão definidos.
- **Dark mode fixo**, tipografia Bricolage Grotesque + Inter + JetBrains Mono e layout responsivo.

## Stack

| Camada | Tecnologia |
| --- | --- |
| Framework | Next.js 15 (App Router) |
| UI | React 19 + TypeScript |
| Estilo | Tailwind CSS 3.4 |
| Conteúdo | MDX + gray-matter + remark |
| Fontes | `next/font/google` |
| Analytics | Vercel Analytics (carregado após consentimento) |
| Imagens | Fotografias StockSnap (CC0) + `next/image` |
| Deploy | Vercel |

## Rodando localmente

Requisitos: **Node.js 20+** e npm.

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Para simular produção:

```bash
npm run build
npm run start
```

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e preencha o que for usar. Nenhuma variável é obrigatória para rodar o projeto: todos os recursos têm fallback.

| Variável | Para que serve | Sem ela |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pública em canonical, sitemap e Open Graph | Usa `https://sobraria.com.br` |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | ID do publisher (`ca-pub-...`) | Mostra apenas placeholders discretos |
| `NEXT_PUBLIC_ADSENSE_SLOT` | ID do bloco de anúncio no AdSense | Não renderiza `<ins>`; mantém placeholder |
| `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` | Endpoint `POST { email, source }` da newsletter | Formulário em modo demonstração |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | Endpoint `POST { name, email, message }` do contato | Abre o cliente de e-mail (`mailto`) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | E-mail público exibido no site | Usa `contato@sobraria.com.br` |

> Variáveis `NEXT_PUBLIC_*` são embutidas no bundle durante o build. Depois de alterá-las na Vercel, refaça o deploy.

## Estrutura do projeto

```text
content/
  vale-a-pena/          # 12 artigos com frontmatter e MDX
  blog/                 # 3 ensaios
public/
  images/photos/vale-a-pena/   # capas e fotos internas dos 12 artigos
  images/photos/blog/          # capas e fotos internas dos 3 ensaios
  og.png                # imagem Open Graph 1200x630
  icon.svg
scripts/
  fetch-photos.mjs      # baixa e recorta as 30 fotos em WebP
  check-links.mjs       # verifica links e assets do site em execução
  count-words.mjs       # conta palavras e valida metadados dos posts
src/
  app/                  # rotas do App Router
  components/           # UI, MDX e calculadoras
  content/registry.ts   # mapa slug -> componente MDX
  lib/                  # copy, conteúdo, formato, site, consentimento
```

### Rotas principais

| Rota | Conteúdo |
| --- | --- |
| `/` | Home com destaque, últimos vereditos, calculadoras e newsletter |
| `/vale-a-pena` | Arquivo com busca e filtro por categoria |
| `/vale-a-pena/[slug]` | Template completo de artigo |
| `/calculadoras` | As 7 calculadoras com âncoras |
| `/blog` e `/blog/[slug]` | Arquivo e posts do blog |
| `/sobre`, `/contato`, `/newsletter` | Institucional e captação |
| `/politica-editorial`, `/politica-de-privacidade`, `/politica-de-cookies`, `/termos-de-uso` | Transparência e conformidade |
| `/sitemap.xml`, `/robots.txt` | SEO técnico |

## Como adicionar um artigo

1. Crie um `.mdx` em `content/vale-a-pena/` ou `content/blog/`.
2. Preencha o frontmatter seguindo um artigo existente: `title`, `slug`, `description`, `category`, `date`, `updatedAt`, `calculator`, `keywords`, `veredito`, `conclusao`, `faq`, `image`, `imageCredit`, `imageCreditUrl`, `imageAlt`, `fontes` e `acoes`.
3. Importe o arquivo em `src/content/registry.ts` e adicione o slug ao mapa `mdxRegistry`.
4. Se o artigo usar uma foto nova, adicione o bloco correspondente em `scripts/fetch-photos.mjs` e rode:

```bash
node scripts/fetch-photos.mjs
```

5. Rode `npm run build` e `npm run lint`.

### Componentes disponíveis no MDX

| Componente | Uso |
| --- | --- |
| `<Veredito />` | Bloco de veredito no topo (normalmente renderizado pela página, não pelo MDX) |
| `<Calculadora type="..." />` | Insere uma calculadora pelo tipo |
| `<TabelaCompara />` | Tabela comparativa com coluna de destaque |
| `<Faq />` | Perguntas frequentes com `<details>` acessível |
| `<Figura />` | Fotografia com legenda, crédito e link para a origem |
| `<Grafico />` | Gráfico de barras em HTML/CSS, com valores e linha de referência |
| `<Cenarios />` | Quadro de decisão com até três caminhos |
| `<AvisoNumeros />` | Aviso de premissas e taxas ilustrativas |
| `<Num />` | Número em fonte mono |

## Calculadoras

Todas são client components, funcionam sem API e usam `Intl.NumberFormat("pt-BR")` para moeda, percentual e datas.

- Parcelar ou pagar à vista
- Juros compostos
- Rotativo do cartão (com teto legal de 100%)
- Reserva de emergência
- Custo em horas de trabalho
- Comprar ou alugar
- Financiamento em 20 ou 30 anos

Os resultados são ilustrativos e não substituem uma simulação bancária. Cada calculadora exibe as premissas e um aviso para conferir taxas e CET.

## AdSense e consentimento

O fluxo foi desenhado para não carregar publicidade antes do aceite:

1. O banner de cookies grava a escolha em `localStorage` (`sobraria-cookie-consent`).
2. O script do AdSense só é injetado quando a escolha é `accepted` e `NEXT_PUBLIC_ADSENSE_CLIENT` existe.
3. O `<AdSlot>` só renderiza `<ins class="adsbygoogle">` com cliente, slot e consentimento aceito.
4. Sem cliente ou slot, aparece um placeholder discreto — útil no desenvolvimento e durante a aprovação.
5. O visitante pode reabrir as preferências pelo link “Gerenciar cookies” no rodapé.

Para ativar:

```env
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-0000000000000000
NEXT_PUBLIC_ADSENSE_SLOT=1234567890
```

Depois do deploy, confirme no painel do AdSense se o site foi aprovado e se os blocos estão com o mesmo ID configurado.

## Deploy na Vercel

1. Suba o repositório para o GitHub.
2. Na Vercel, clique em **Add New → Project** e importe o repositório.
3. O framework é detectado como **Next.js**; não é preciso alterar o build command (`npm run build`).
4. Configure as variáveis de ambiente em **Settings → Environment Variables** (Production, Preview e Development).
5. Faça o deploy.
6. Em **Settings → Domains**, adicione `sobraria.com.br` e `www.sobraria.com.br`. Aponte o DNS conforme as instruções da Vercel.
7. Escolha um domínio canônico (com ou sem `www`) e redirecione o outro.

### Checklist pós-deploy

- [ ] `https://sobraria.com.br` abre com HTTPS e o domínio canônico correto.
- [ ] `/sitemap.xml` e `/robots.txt` respondem com o domínio de produção.
- [ ] O `NEXT_PUBLIC_SITE_URL` está igual ao domínio canônico.
- [ ] Google Search Console: propriedade verificada e sitemap enviado.
- [ ] Google Analytics/Vercel Analytics: dados chegando (só após consentimento).
- [ ] AdSense: site aprovado, `ads.txt` publicado (o AdSense fornece o conteúdo) e blocos configurados.
- [ ] Teste de rich results para Article e FAQPage no [Rich Results Test](https://search.google.com/test/rich-results).
- [ ] Open Graph conferido no [OpenGraph.xyz](https://www.opengraph.xyz/) ou no depurador do Facebook/LinkedIn.
- [ ] Lighthouse mobile acima de 90 em Performance, Acessibilidade, Best Practices e SEO.
- [ ] Formulários de newsletter e contato testados com os endpoints reais.
- [ ] Política de privacidade, cookies, editorial e termos revisados por responsável jurídico.

### `ads.txt`

Depois da aprovação no AdSense, publique `public/ads.txt` com a linha fornecida pelo Google:

```text
google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0
```

Troque `pub-0000000000000000` pelo seu ID de publisher.

## Scripts úteis

```bash
npm run dev           # desenvolvimento
npm run build         # build de produção
npm run start         # serve o build
npm run lint          # ESLint
npm run format        # Prettier
npm run format:check  # confere formatação

node scripts/fetch-photos.mjs      # baixa e recorta as fotos (StockSnap, CC0)
node scripts/count-words.mjs       # valida palavras e metadados
node scripts/check-links.mjs       # checa links/assets (requer servidor em :3000)
```

## Conteúdo e transparência

- Os artigos são educacionais e não constituem recomendação de investimento.
- Taxas, prazos e cenários são ilustrativos, com data e premissas visíveis.
- As fontes oficiais (Banco Central, Caixa, FIPE, Procon, Planalto) estão citadas em cada artigo.
- A publicidade não interfere no veredito editorial.
- A política editorial completa está em `/politica-editorial`.

## i18n

A interface está centralizada em `src/lib/copy.ts` e as rotas foram pensadas para uma futura versão em inglês (`/en/...`). A implementação de i18n **não** faz parte desta versão: o site é `pt-BR` e o `lang` do HTML é `pt-BR`.

## Licença

Conteúdo e código são de uso privado do projeto Sobraria. Consulte o responsável antes de reutilizar textos, ilustrações ou a identidade visual.
