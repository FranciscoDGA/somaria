import { copy } from "@/lib/copy";

export function AnnouncementBar() {
  return (
    <div className="border-b border-green-deep/40 bg-green-deep/15">
      <div className="container-page flex min-h-9 items-center justify-center gap-3 py-2 text-center font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-ink-2 sm:text-[10px] sm:tracking-[0.2em]">
        <span className="text-green" aria-hidden="true">
          ✦
        </span>
        <span className="text-ink">{copy.announcement.left}</span>
        <span className="hidden text-green sm:inline" aria-hidden="true">
          ✦
        </span>
        <span className="hidden sm:inline">{copy.announcement.right}</span>
      </div>
    </div>
  );
}
