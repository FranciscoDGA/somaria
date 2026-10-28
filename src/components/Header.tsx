"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { copy } from "@/lib/copy";
import { ArrowRight, Close, Menu } from "./Icons";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg-0/85 backdrop-blur-xl">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Navegação principal" className="hidden items-center gap-7 md:flex">
          {copy.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative text-[13px] font-medium transition-colors hover:text-ink ${
                isActive(item.href) ? "text-ink" : "text-ink-2"
              }`}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="absolute -bottom-[21px] left-0 h-px w-full bg-green" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/newsletter" className="btn btn-primary btn-sm">
            {copy.header.cta}
            <ArrowRight size={14} />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? copy.header.closeMenu : copy.header.openMenu}
          className="flex h-10 w-10 items-center justify-center rounded-field border border-line text-ink transition-colors hover:border-green/50 hover:text-green md:hidden"
        >
          {open ? <Close size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-bg-0/98 md:hidden">
          <nav aria-label="Navegação mobile" className="container-page flex flex-col py-3">
            {copy.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`border-b border-line/60 py-3.5 text-sm font-medium ${
                  isActive(item.href) ? "text-green" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/newsletter" className="btn btn-primary mt-4 mb-2">
              {copy.header.cta}
              <ArrowRight size={15} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
