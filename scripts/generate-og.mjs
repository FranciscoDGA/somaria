import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const W = 1200;
const H = 630;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4ADE80" stop-opacity="0.20"/>
      <stop offset="60%" stop-color="#166534" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#0B0F0D" stop-opacity="0"/>
    </linearGradient>
    <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
      <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#243129" stroke-width="1" opacity="0.5"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="#0B0F0D"/>
  <rect width="${W}" height="${H}" fill="url(#grid)" opacity="0.55"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <circle cx="76" cy="72" r="20" fill="none" stroke="#4ADE80" stroke-width="4"/>
  <text x="76" y="78" text-anchor="middle" fill="#4ADE80" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="14" font-weight="700">R$</text>
  <text x="108" y="80" fill="#E9EFEA" font-family="Segoe UI, Inter, sans-serif" font-size="30" font-weight="800" letter-spacing="-1.5">sobraria</text>

  <text x="76" y="205" fill="#4ADE80" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="13" font-weight="700" letter-spacing="3">A MATEMÁTICA DA DECISÃO</text>

  <text x="76" y="290" fill="#E9EFEA" font-family="Segoe UI, Inter, sans-serif" font-size="62" font-weight="800" letter-spacing="-3">Toda decisão financeira</text>
  <text x="76" y="356" fill="#E9EFEA" font-family="Segoe UI, Inter, sans-serif" font-size="62" font-weight="800" letter-spacing="-3">tem uma conta por trás.</text>

  <text x="76" y="418" fill="#9FB0A5" font-family="Segoe UI, Inter, sans-serif" font-size="22">Veredito, conta passo a passo e calculadora para testar com os seus números.</text>

  <rect x="76" y="470" width="300" height="82" rx="14" fill="#101613" stroke="#166534"/>
  <text x="100" y="500" fill="#9FB0A5" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="11" font-weight="700" letter-spacing="1.5">EXEMPLO DE VEREDITO</text>
  <text x="100" y="536" fill="#4ADE80" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="30" font-weight="700">R$ 4.772</text>

  <rect x="404" y="470" width="300" height="82" rx="14" fill="#101613" stroke="#243129"/>
  <text x="428" y="500" fill="#9FB0A5" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="11" font-weight="700" letter-spacing="1.5">CALCULADORAS</text>
  <text x="428" y="536" fill="#E9EFEA" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="30" font-weight="700">6 grátis</text>

  <rect x="732" y="470" width="392" height="82" rx="14" fill="#101613" stroke="#243129"/>
  <text x="756" y="500" fill="#9FB0A5" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="11" font-weight="700" letter-spacing="1.5">SEM ACHISMO</text>
  <text x="756" y="536" fill="#E9EFEA" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="30" font-weight="700">0 opinião</text>

  <text x="1124" y="590" text-anchor="end" fill="#9FB0A5" font-family="ui-monospace, Menlo, Consolas, monospace" font-size="13" letter-spacing="1">sobraria.com.br</text>
</svg>`;

const target = path.join(process.cwd(), "public", "og.png");
await sharp(Buffer.from(svg)).png().toFile(target);
console.log("gerado:", path.relative(process.cwd(), target));
