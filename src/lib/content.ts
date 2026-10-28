import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { readingTimeFrom } from "./format";

export type FaqItem = { q: string; a: string };

export type Fonte = { label: string; href: string };

export type VereditoData = {
  valor: string;
  rotulo: string;
  conclusao: string;
};

export type Collection = "vale-a-pena" | "blog";

export type ArticleMeta = {
  title: string;
  slug: string;
  description: string;
  category: string;
  date: string;
  updatedAt: string;
  calculator?: string;
  faq: FaqItem[];
  veredito?: VereditoData;
  conclusao?: string;
  keywords?: string[];
  image?: string;
  imageCredit?: string;
  imageCreditUrl?: string;
  imageAlt?: string;
  fontes: Fonte[];
  acoes: string[];
  readingTime: number;
  wordCount: number;
  collection: Collection;
};

const CONTENT_ROOT = path.join(process.cwd(), "content");

function countWords(content: string): number {
  return content
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_`>{}\[\]()]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function readCollection(collection: Collection): ArticleMeta[] {
  const directory = path.join(CONTENT_ROOT, collection);
  if (!fs.existsSync(directory)) return [];

  return fs
    .readdirSync(directory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(directory, file), "utf8");
      const { data, content } = matter(raw);
      const slug = String(data.slug ?? file.replace(/\.mdx$/, ""));

      return {
        title: String(data.title ?? ""),
        slug,
        description: String(data.description ?? ""),
        category: String(data.category ?? ""),
        date: String(data.date ?? ""),
        updatedAt: String(data.updatedAt ?? data.date ?? ""),
        calculator: data.calculator ? String(data.calculator) : undefined,
        faq: Array.isArray(data.faq) ? (data.faq as FaqItem[]) : [],
        veredito: data.veredito as VereditoData | undefined,
        conclusao: data.conclusao ? String(data.conclusao) : undefined,
        keywords: Array.isArray(data.keywords) ? (data.keywords as string[]) : [],
        image: data.image ? String(data.image) : undefined,
        imageCredit: data.imageCredit ? String(data.imageCredit) : undefined,
        imageCreditUrl: data.imageCreditUrl ? String(data.imageCreditUrl) : undefined,
        imageAlt: data.imageAlt ? String(data.imageAlt) : undefined,
        fontes: Array.isArray(data.fontes) ? (data.fontes as Fonte[]) : [],
        acoes: Array.isArray(data.acoes) ? (data.acoes as string[]) : [],
        readingTime: readingTimeFrom(content),
        wordCount: countWords(content),
        collection,
      } satisfies ArticleMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getValeArticles(): ArticleMeta[] {
  return readCollection("vale-a-pena");
}

export function getBlogPosts(): ArticleMeta[] {
  return readCollection("blog");
}

export function getValeArticle(slug: string): ArticleMeta | undefined {
  return getValeArticles().find((article) => article.slug === slug);
}

export function getBlogPost(slug: string): ArticleMeta | undefined {
  return getBlogPosts().find((post) => post.slug === slug);
}

export function getRelatedArticles(article: ArticleMeta, limit = 3): ArticleMeta[] {
  const all = getValeArticles().filter((item) => item.slug !== article.slug);
  const sameCategory = all.filter((item) => item.category === article.category);
  const rest = all.filter((item) => item.category !== article.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

export function getAllContent(): ArticleMeta[] {
  return [...getValeArticles(), ...getBlogPosts()];
}
