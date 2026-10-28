"use client";

import { useEffect, useRef, useState } from "react";

import { copy } from "@/lib/copy";
import { CONSENT_EVENT, readConsent } from "@/lib/consent";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdSlotProps = {
  className?: string;
  label?: string;
  /** ID do bloco de anúncio no painel do AdSense. */
  slot?: string;
};

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";
const ADSENSE_SLOT = process.env.NEXT_PUBLIC_ADSENSE_SLOT ?? "";

export function AdSlot({ className = "", label, slot }: AdSlotProps) {
  const adSlot = slot ?? ADSENSE_SLOT;
  const [consented, setConsented] = useState(false);
  const insRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    function sync() {
      setConsented(readConsent() === "accepted");
    }

    sync();
    window.addEventListener("storage", sync);
    window.addEventListener(CONSENT_EVENT, sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(CONSENT_EVENT, sync);
    };
  }, []);

  const showAd = Boolean(ADSENSE_CLIENT && adSlot && consented);

  useEffect(() => {
    if (!showAd) return;

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch {
      // O script pode estar bloqueado pelo navegador ou por um bloqueador de anúncios.
    }
  }, [showAd]);

  return (
    <aside aria-label={copy.article.adLabel} className={`my-10 ${className}`}>
      <p className="mb-2 text-center font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-ink-2/75">
        {label ?? copy.article.adLabel}
      </p>

      {showAd ? (
        <ins
          ref={insRef}
          className="adsbygoogle block min-h-[104px]"
          style={{ display: "block" }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={adSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        <div className="flex min-h-[104px] items-center justify-center rounded-card border border-dashed border-line bg-bg-1/30 px-6 py-8 text-center">
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-ink-2/75">
              espaço publicitário
            </p>
            <p className="mt-1 text-[11px] text-ink-2/75">
              {ADSENSE_CLIENT && adSlot && !consented
                ? copy.article.adConsentNote
                : copy.article.adNote}
            </p>
          </div>
        </div>
      )}
    </aside>
  );
}
