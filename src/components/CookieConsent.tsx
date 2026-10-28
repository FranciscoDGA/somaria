"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { copy } from "@/lib/copy";
import { CONSENT_EVENT, CONSENT_STORAGE_KEY } from "@/lib/consent";

function loadAdsense() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  if (!client) return;
  if (document.querySelector('script[data-sobraria-adsense="true"]')) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
  script.crossOrigin = "anonymous";
  script.dataset.sobrariaAdsense = "true";
  document.head.appendChild(script);
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);

    if (stored === "accepted") loadAdsense();

    let timer: ReturnType<typeof setTimeout> | undefined;
    if (!stored) {
      timer = setTimeout(() => setVisible(true), 900);
    }

    function handleOpen() {
      setVisible(true);
    }

    window.addEventListener("sobraria:open-cookie-settings", handleOpen);

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("sobraria:open-cookie-settings", handleOpen);
    };
  }, []);

  function choose(value: "accepted" | "essential") {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
    setVisible(false);
    if (value === "accepted") loadAdsense();
    window.dispatchEvent(new Event(CONSENT_EVENT));
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={copy.cookies.title}
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto max-w-3xl animate-fade-up rounded-card border border-green-deep/70 bg-bg-1/95 p-5 shadow-glow backdrop-blur-xl sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-green/40 bg-green/10 font-mono text-[10px] font-bold text-green">
                R$
              </span>
              <h2 className="font-display text-base font-bold text-ink">{copy.cookies.title}</h2>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-ink-2">
              {copy.cookies.text}{" "}
              <Link
                href="/politica-de-cookies"
                className="text-green underline decoration-green/30 underline-offset-2 hover:decoration-green"
              >
                {copy.cookies.link}
              </Link>
              .
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => choose("essential")}
              className="btn btn-ghost btn-sm whitespace-nowrap"
            >
              {copy.cookies.reject}
            </button>
            <button
              type="button"
              onClick={() => choose("accepted")}
              className="btn btn-primary btn-sm whitespace-nowrap"
            >
              {copy.cookies.accept}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
