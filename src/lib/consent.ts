export const CONSENT_STORAGE_KEY = "sobraria-cookie-consent";

export const CONSENT_EVENT = "sobraria:consent-changed";

export type ConsentValue = "accepted" | "essential";

export function readConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return stored === "accepted" || stored === "essential" ? stored : null;
}
