const base = "http://localhost:3000";
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const pages = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].replace("https://sobraria.com.br", base));

const checked = new Map();
const broken = [];

async function check(url) {
  if (checked.has(url)) return checked.get(url);
  const res = await fetch(url, { redirect: "manual" });
  checked.set(url, res.status);
  if (res.status >= 400) broken.push([res.status, url]);
  return res.status;
}

const images = new Set();
const links = new Set();

for (const page of pages) {
  const res = await fetch(page);
  if (res.status !== 200) {
    broken.push([res.status, page]);
    continue;
  }
  const html = await res.text();
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const raw = m[1];
    if (!raw || raw.startsWith("#") || raw.startsWith("mailto:") || raw.startsWith("http")) continue;
    const url = new URL(raw, base).toString();
    if (raw.startsWith("/_next/image")) {
      const inner = new URL(url).searchParams.get("url");
      if (inner) images.add(new URL(inner, base).toString());
    } else if (/\.(svg|png|jpg|jpeg|webp|avif|ico|xml|txt|webmanifest)$/.test(raw)) {
      images.add(url);
    } else {
      links.add(url);
    }
  }
}

for (const url of images) await check(url);
for (const url of links) await check(url);

console.log("pages", pages.length, "links", links.size, "assets", images.size, "broken", broken.length);
for (const item of broken) console.log(item[0], item[1]);
