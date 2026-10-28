import Link from "next/link";

import { ArrowRight, Search } from "@/components/Icons";
import { copy } from "@/lib/copy";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40" />
      <div aria-hidden="true" className="hero-glow absolute inset-0" />
      <div className="container-page relative py-20 text-center">
        <p className="font-mono text-7xl font-bold tracking-[-0.06em] text-green sm:text-9xl">404</p>
        <p className="eyebrow mt-4">{copy.notFound.eyebrow}</p>
        <h1 className="mx-auto mt-3 max-w-xl text-balance text-3xl font-extrabold tracking-[-0.04em] text-ink sm:text-4xl">
          {copy.notFound.title}
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-2">
          {copy.notFound.text}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/vale-a-pena" className="btn btn-primary">
            <Search size={16} />
            {copy.notFound.primary}
          </Link>
          <Link href="/" className="btn btn-ghost">
            {copy.notFound.secondary}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
