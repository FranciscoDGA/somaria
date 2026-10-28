import Image from "next/image";
import Link from "next/link";
import { formatDateShort } from "@/lib/format";
import type { ArticleMeta } from "@/lib/content";
import { ArrowUpRight, Clock } from "./Icons";

type ArticleCardProps = {
  article: ArticleMeta;
  showImage?: boolean;
  className?: string;
};

export function ArticleCard({ article, showImage = false, className = "" }: ArticleCardProps) {
  const href =
    article.collection === "vale-a-pena"
      ? `/vale-a-pena/${article.slug}`
      : `/blog/${article.slug}`;

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-bg-1 transition-colors duration-200 hover:border-green/40 hover:bg-bg-2/40 ${className}`}
    >
      {showImage && article.image && (
        <div className="relative aspect-[16/9] overflow-hidden border-b border-line bg-bg-2">
          <Image
            src={article.image}
            alt=""
            width={1200}
            height={675}
            sizes="(max-width: 768px) 100vw, 360px"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="chip">{article.category}</span>
          <span className="flex items-center gap-1.5 text-[10px] text-ink-2/75">
            <Clock size={12} />
            {article.readingTime} min
          </span>
        </div>

        <h3 className="mt-4 text-balance font-display text-[1.05rem] font-bold leading-snug text-ink transition-colors group-hover:text-green">
          <Link href={href} className="focus-visible:outline-none">
            <span className="absolute inset-0 z-10" aria-hidden="true" />
            {article.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-2/75">
          {article.description}
        </p>

        <div className="mt-auto pt-5">
          {article.veredito ? (
            <div className="flex items-end justify-between gap-3 border-t border-line pt-4">
              <div>
                <p className="font-mono text-[8px] font-bold uppercase tracking-[0.16em] text-ink-2/75">
                  Veredito
                </p>
                <p className="mt-1 font-mono text-lg font-bold leading-none text-green">
                  {article.veredito.valor}
                </p>
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-2 transition-colors group-hover:border-green/40 group-hover:text-green">
                <ArrowUpRight size={15} />
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between border-t border-line pt-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink-2/75">
                {formatDateShort(article.date)}
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-2 transition-colors group-hover:border-green/40 group-hover:text-green">
                <ArrowUpRight size={15} />
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
