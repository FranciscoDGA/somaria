import Link from "next/link";
import { calculators, site } from "@/lib/site";
import { copy } from "@/lib/copy";
import { Logo } from "./Logo";
import { ManageCookies } from "./ManageCookies";
import { ArrowUpRight } from "./Icons";

const exploreLinks = [
  { label: "Vale a pena?", href: "/vale-a-pena" },
  { label: "Blog", href: "/blog" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
  { label: "Newsletter", href: "/newsletter" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg-0">
      <div className="container-page py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-ink-2">{copy.footer.tagline}</p>
            <p className="mt-4 text-xs leading-relaxed text-ink-2/75">
              {copy.footer.newsletterText}
            </p>
            <Link
              href="/newsletter"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-green transition-opacity hover:opacity-80"
            >
              {copy.newsletter.title}
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <FooterColumn title={copy.footer.exploreTitle} links={exploreLinks} />

          <FooterColumn
            title={copy.footer.calculatorsTitle}
            links={calculators.slice(0, 5).map((calculator) => ({
              label: calculator.short,
              href: `/calculadoras#${calculator.type}`,
            }))}
          />

          <div>
            <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink-2/75">
              {copy.footer.legalTitle}
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="/politica-de-privacidade"
                  className="text-xs text-ink-2 transition-colors hover:text-green"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-de-cookies"
                  className="text-xs text-ink-2 transition-colors hover:text-green"
                >
                  Política de Cookies
                </Link>
              </li>
              <li>
                <ManageCookies />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="max-w-3xl text-[10px] leading-relaxed text-ink-2/75">
            {copy.footer.disclaimer}
          </p>
          <div className="mt-4 flex flex-col gap-2 text-[10px] text-ink-2/75 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {site.name}. {copy.footer.rights}
            </p>
            <p className="font-mono uppercase tracking-wider">{copy.footer.madeWith}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <div>
      <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ink-2/75">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-xs text-ink-2 transition-colors hover:text-green"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
