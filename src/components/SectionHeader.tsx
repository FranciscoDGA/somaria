import Link from "next/link";
import { ArrowRight } from "./Icons";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  href,
  linkLabel,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between ${className}`}>
      <div className="max-w-2xl">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="mt-2 text-balance text-2xl font-extrabold text-ink sm:text-3xl lg:text-[2.15rem]">
          {title}
        </h2>
        {description && <p className="mt-3 text-sm leading-relaxed text-ink-2">{description}</p>}
      </div>
      {href && linkLabel && (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-ink-2 transition-colors hover:text-green"
        >
          {linkLabel}
          <ArrowRight
            size={16}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      )}
    </div>
  );
}
