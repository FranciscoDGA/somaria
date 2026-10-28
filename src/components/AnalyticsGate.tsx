import { Analytics } from "@vercel/analytics/next";

/**
 * Hook de analytics. O script só é injetado quando o build roda na Vercel
 * (env VERCEL definida automaticamente). Em localhost não há requisições.
 */
export function AnalyticsGate() {
  if (!process.env.VERCEL) return null;
  return <Analytics />;
}
