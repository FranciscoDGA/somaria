"use client";

import { copy } from "@/lib/copy";

export function ManageCookies() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("sobraria:open-cookie-settings"))}
      className="text-left text-xs text-ink-2/75 transition-colors hover:text-green"
    >
      {copy.footer.manageCookies}
    </button>
  );
}
