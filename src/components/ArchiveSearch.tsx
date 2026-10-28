"use client";

import { useMemo, useState } from "react";

import { ArticleCard } from "@/components/ArticleCard";
import { Search } from "@/components/Icons";
import { copy } from "@/lib/copy";
import type { ArticleMeta } from "@/lib/content";
import { categories } from "@/lib/site";

export function ArchiveSearch({
  articles,
  initialCategory = "",
}: {
  articles: ArticleMeta[];
  initialCategory?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);

  const filtered = useMemo(() => {
    const term = query
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    return articles.filter((article) => {
      if (category && article.category !== category) return false;
      if (!term) return true;

      const haystack = [article.title, article.description, article.category, ...(article.keywords ?? [])]
        .join(" ")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      return haystack.includes(term);
    });
  }, [articles, category, query]);

  const countLabel =
    filtered.length === 1
      ? `${filtered.length} ${copy.archive.resultSingular}`
      : `${filtered.length} ${copy.archive.resultPlural}`;

  return (
    <div>
      <div className="rounded-card border border-line bg-bg-1/40 p-4 sm:p-5">
        <label htmlFor="archive-search" className="label">
          {copy.archive.searchLabel}
        </label>
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-2/75"
          />
          <input
            id="archive-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.archive.searchPlaceholder}
            className="field pl-10"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">
          <button
            type="button"
            onClick={() => setCategory("")}
            aria-pressed={category === ""}
            className={`rounded-full border px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.12em] transition-colors ${
              category === ""
                ? "border-green bg-green text-bg-0"
                : "border-line text-ink-2 hover:border-green/40 hover:text-green"
            }`}
          >
            {copy.archive.all}
          </button>
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item === category ? "" : item)}
              aria-pressed={category === item}
              className={`rounded-full border px-3 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.12em] transition-colors ${
                category === item
                  ? "border-green bg-green text-bg-0"
                  : "border-line text-ink-2 hover:border-green/40 hover:text-green"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p aria-live="polite" className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-2/75">
          {countLabel}
        </p>
        {(query || category) && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("");
            }}
            className="text-[11px] font-semibold text-green transition-opacity hover:opacity-80"
          >
            {copy.archive.clear}
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <ArticleCard key={article.slug} article={article} showImage />
          ))}
        </div>
      ) : (
        <div className="mt-5 rounded-card border border-dashed border-line bg-bg-1/30 p-10 text-center">
          <p className="font-display text-lg font-bold text-ink">{copy.archive.noResults}</p>
          <p className="mt-2 text-sm text-ink-2">{copy.archive.noResultsHint}</p>
        </div>
      )}
    </div>
  );
}
