import type { ReactNode } from "react";

export function Num({ children }: { children: ReactNode }) {
  return <span className="num">{children}</span>;
}
