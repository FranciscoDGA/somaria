import Link from "next/link";

type LogoProps = {
  href?: string;
  className?: string;
  markOnly?: boolean;
};

export function Logo({ href = "/", className = "", markOnly = false }: LogoProps) {
  const content = (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="36"
        height="36"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <circle cx="20" cy="20" r="17.2" stroke="var(--green)" strokeWidth="3.5" />
        <text
          x="20"
          y="25.2"
          textAnchor="middle"
          fill="var(--green)"
          fontFamily="var(--font-mono), ui-monospace, monospace"
          fontSize="12.5"
          fontWeight="700"
          letterSpacing="-0.04em"
        >
          R$
        </text>
      </svg>
      {!markOnly && (
        <span className="font-display text-[1.45rem] font-extrabold lowercase leading-none tracking-[-0.045em] text-ink">
          sobraria
        </span>
      )}
    </span>
  );

  if (!href) return content;

  return (
    <Link href={href} aria-label="R$ sobraria — página inicial" className="inline-flex">
      {content}
    </Link>
  );
}
