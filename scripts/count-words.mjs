import fs from "node:fs";
import matter from "gray-matter";

for (const d of ["content/vale-a-pena", "content/blog"]) {
  for (const f of fs.readdirSync(d)) {
    const raw = fs.readFileSync(`${d}/${f}`, "utf8");
    const { data, content } = matter(raw);
    const words = content
      .replace(/<[^>]+>/g, " ")
      .replace(/[#*_`>{}\[\]()]/g, " ")
      .split(/\s+/)
      .filter(Boolean).length;
    console.log(
      f.padEnd(48),
      "words",
      String(words).padStart(4),
      "img",
      data.image ? "y" : "n",
      "fontes",
      (data.fontes || []).length,
      "acoes",
      (data.acoes || []).length,
      "faq",
      (data.faq || []).length,
      "v",
      data.veredito ? data.veredito.valor : "-",
    );
  }
}
