/**
 * Baixa as fotografias editoriais do StockSnap (CC0) e grava em WebP 1200x675.
 * Rodar com: node scripts/fetch-photos.mjs
 *
 * As imagens são servidas localmente para evitar dependência de hotlink e
 * garantir o mesmo recorte em produção. O StockSnap não exige atribuição,
 * mas o site credita a fonte em cada figura.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const OUT = path.join(process.cwd(), "public", "images", "photos");

const photos = [
  {
    file: "vale-a-pena/carro-hero.webp",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/2A1RBTLS50.jpg",
    landing: "https://stocksnap.io/photo/bmw-car-2A1RBTLS50",
    alt: "Carro esportivo branco em uma rua movimentada",
  },
  {
    file: "vale-a-pena/carro-painel.webp",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/TFX66XBXTM.jpg",
    landing: "https://stocksnap.io/photo/car-dashboard-TFX66XBXTM",
    alt: "Painel de carro com veloc?metro e medidores em close",
  },
  {
    file: "vale-a-pena/consorcio-hero.webp",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/LJ515CPAKI.jpg",
    landing: "https://stocksnap.io/photo/house-home-LJ515CPAKI",
    alt: "Casa residencial com fachada clara e jardim",
  },
  {
    file: "vale-a-pena/consorcio-chaves.webp",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/Z1TKDI29FZ.jpg",
    landing: "https://stocksnap.io/photo/keys-door-Z1TKDI29FZ",
    alt: "Chaves inseridas na fechadura de uma porta",
  },
  {
    file: "vale-a-pena/parcelar-hero.webp",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/E1WZHWID6J.jpg",
    landing: "https://stocksnap.io/photo/window-shopping-E1WZHWID6J",
    alt: "Vitrine de loja observada por uma pessoa em uma rua",
  },
  {
    file: "vale-a-pena/parcelar-calculadora.webp",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/Y2GUBQIPXD.jpg",
    landing: "https://stocksnap.io/photo/calculator-numbers-Y2GUBQIPXD",
    alt: "Calculadora com números e teclas em close",
  },
  {
    file: "vale-a-pena/reserva-hero.webp",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/ZLEVSWFWZC.jpg",
    landing: "https://stocksnap.io/photo/piggy-bank-ZLEVSWFWZC",
    alt: "Cofrinho de porcelana com moedas ao redor",
  },
  {
    file: "vale-a-pena/reserva-contas.webp",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/RFVHCUGML3.jpg",
    landing: "https://stocksnap.io/photo/calculator-calendar-RFVHCUGML3",
    alt: "Calculadora sobre uma mesa com caderno e papéis",
  },
  {
    file: "vale-a-pena/rotativo-hero.webp",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/SDM03P88BO.jpg",
    landing: "https://stocksnap.io/photo/money-coins-SDM03P88BO",
    alt: "Moedas empilhadas sobre uma mesa escura",
  },
  {
    file: "vale-a-pena/rotativo-contas.webp",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/JY874BSKKC.jpg",
    landing: "https://stocksnap.io/photo/calculator-numbers-JY874BSKKC",
    alt: "Calculadora ao lado de l?pis e bloco de notas",
  },
  {
    file: "vale-a-pena/alugar-hero.webp",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/FYCMDNOLYU.jpg",
    landing: "https://stocksnap.io/photo/modern-apartment-FYCMDNOLYU",
    alt: "Quarto de casal com cabeceira iluminada e painel de desenho",
  },
  {
    file: "vale-a-pena/alugar-sala.webp",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/APBDJIC32G.jpg",
    landing: "https://stocksnap.io/photo/house-interior-APBDJIC32G",
    alt: "Cozinha ampla com bancada central e armários claros",
  },
  {
    file: "vale-a-pena/troca-hero.webp",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/MU29JB6MGN.jpg",
    landing: "https://stocksnap.io/photo/car-shifter-MU29JB6MGN",
    alt: "Alavanca de câmbio de carro em close",
  },
  {
    file: "vale-a-pena/troca-estrada.webp",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/OEP6DXZE7T.jpg",
    landing: "https://stocksnap.io/photo/cars-traffic-OEP6DXZE7T",
    alt: "Carros em trânsito em uma avenida movimentada",
  },
  {
    file: "vale-a-pena/decimo-hero.webp",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/206B1A2E4C.jpg",
    landing: "https://stocksnap.io/photo/present-gift-206B1A2E4C",
    alt: "Caixa de presente embrulhada com laço",
  },
  {
    file: "vale-a-pena/decimo-presente.webp",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/3DPEHG8EOI.jpg",
    landing: "https://stocksnap.io/photo/christmas-gifts-3DPEHG8EOI",
    alt: "Presentes de Natal embaixo de uma árvore iluminada",
  },
  {
    file: "vale-a-pena/fgts-hero.webp",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/QDDPZH3YSO.jpg",
    landing: "https://stocksnap.io/photo/building-construction-QDDPZH3YSO",
    alt: "Estrutura de um edifício em construção",
  },
  {
    file: "vale-a-pena/fgts-casa.webp",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/WDVIQZEXML.jpg",
    landing: "https://stocksnap.io/photo/house-interior-WDVIQZEXML",
    alt: "Interior de uma casa com móveis claros e luz natural",
  },
  {
    file: "vale-a-pena/assinaturas-hero.webp",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/BI0P6D3WL9.jpg",
    landing: "https://stocksnap.io/photo/living-room-BI0P6D3WL9",
    alt: "Sala de estar com sofás e poltronas amarelas",
  },
  {
    file: "vale-a-pena/assinaturas-musica.webp",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/WKV40ATLIY.jpg",
    landing: "https://stocksnap.io/photo/speaker-music-WKV40ATLIY",
    alt: "Caixa de som em ambiente com iluminação colorida",
  },
  {
    file: "vale-a-pena/reforma-hero.webp",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/KD30XPQR0A.jpg",
    landing: "https://stocksnap.io/photo/tools-workshop-KD30XPQR0A",
    alt: "Ferramentas de oficina organizadas sobre uma bancada",
  },
  {
    file: "vale-a-pena/reforma-obra.webp",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/MF4PFAS13H.jpg",
    landing: "https://stocksnap.io/photo/construction-renovation-MF4PFAS13H",
    alt: "Ambiente em reforma com madeira e ferramentas",
  },
  {
    file: "vale-a-pena/prazo-hero.webp",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/BNH9766JSL.jpg",
    landing: "https://stocksnap.io/photo/apartment-condo-BNH9766JSL",
    alt: "Edifício residencial de vários andares visto de baixo",
  },
  {
    file: "vale-a-pena/prazo-predio.webp",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/HNR1252GQ6.jpg",
    landing: "https://stocksnap.io/photo/building-apartment-HNR1252GQ6",
    alt: "Prédio de apartamentos visto de baixo",
  },
  {
    file: "blog/orcamento-hero.webp",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/DIHXDJ07WY.jpg",
    landing: "https://stocksnap.io/photo/laptop-work-DIHXDJ07WY",
    alt: "Notebook aberto com planilha e cafezinho ao lado",
  },
  {
    file: "blog/orcamento-mesa.webp",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/UP9J4EZYNJ.jpg",
    landing: "https://stocksnap.io/photo/office-work-UP9J4EZYNJ",
    alt: "Mesa de trabalho com papéis, caneta e computador",
  },
  {
    file: "blog/cdi-hero.webp",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/OLL4BSGLBE.jpg",
    landing: "https://stocksnap.io/photo/bank-finance-OLL4BSGLBE",
    alt: "Calculadora, óculos e moedas sobre uma mesa de madeira",
  },
  {
    file: "blog/cdi-moedas.webp",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/E5RETXVN7R.jpg",
    landing: "https://stocksnap.io/photo/money-coins-E5RETXVN7R",
    alt: "Moedas de diferentes tamanhos empilhadas",
  },
  {
    file: "blog/cafe-hero.webp",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/LIB0TB3A8K.jpg",
    landing: "https://stocksnap.io/photo/coffee-latte-LIB0TB3A8K",
    alt: "Xícara de café com leite vista de cima",
  },
  {
    file: "blog/cafe-cafe.webp",
    url: "https://cdn.stocksnap.io/img-thumbs/960w/8C35014CE3.jpg",
    landing: "https://stocksnap.io/photo/coffee-cafe-8C35014CE3",
    alt: "Xícara de café sobre uma mesa de cafeteria",
  },
];

fs.mkdirSync(OUT, { recursive: true });

for (const photo of photos) {
  const target = path.join(OUT, photo.file);
  fs.mkdirSync(path.dirname(target), { recursive: true });

  const response = await fetch(photo.url, {
    headers: { "User-Agent": "Sobraria/1.0 (contato@sobraria.com.br)" },
  });
  if (!response.ok) {
    throw new Error(`${photo.file}: HTTP ${response.status}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await sharp(buffer)
    .resize(1200, 675, { fit: "cover", position: "attention" })
    .webp({ quality: 82 })
    .toFile(target);

  console.log(`baixado: ${path.relative(process.cwd(), target)}`);
}

console.log(`\n${photos.length} fotos baixadas em public/images/photos.`);
