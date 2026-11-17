import Image from "next/image";
import { ReactNode } from "react";
export const ProgressBar = ({ value, tone = "light" }: { value: number; tone?: "light" | "brand" }) =>
  <div className={`h-1.5 rounded ${tone === "light" ? "bg-white/20" : "bg-brand/15"}`}><div style={{ width: `${value}%` }} className={`h-full rounded ${tone === "light" ? "bg-white" : "bg-brand"}`} /></div>;

const earnedBadges = [
  { name: "Earned badge 1", src: "/assets/badge1.png" },
  { name: "Earned badge 2", src: "/assets/badge2.png" },
  { name: "Earned badge 3", src: "/assets/badge3.png" },
] as const;

export const BadgesWidget = ({ done = 3, total = 5, next = "Grow3dge Incubator" }: { done?: number; total?: number; next?: string }) =>
  <div className="overflow-hidden rounded-2xl border border-border bg-white">
    <div className="bg-[linear-gradient(110deg,#6d2ac4_0%,#34156e_100%)] px-4 pb-2 pt-4 text-white">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-medium">Your Earned Badges</h3>
        <button type="button" className="text-xs text-white/60 transition-colors hover:text-white">View all</button>
      </div>
      <div role="group" aria-label="Earned badges" className="mt-2 flex -space-x-10">
        {earnedBadges.slice(0, Math.max(0, Math.min(done, earnedBadges.length))).map(badge =>
          <Image key={badge.name} src={badge.src} alt={badge.name} title={badge.name} width={72} height={72} className="h-[72px] w-[72px] shrink-0 object-contain" />)}
      </div>
    </div>
    <div className="p-3 text-ink">
      <div className="mb-1 flex items-center justify-between gap-2 text-xs">
        <span>Progress to next badge</span><span className="text-ink/60">{done} / {total} sessions</span>
      </div>
      <ProgressBar value={total > 0 ? Math.min((done / total) * 100, 100) : 0} tone="brand" />
      <div className="mt-3 flex items-center gap-2.5 rounded-2xl bg-[#f8f7fa] p-2.5">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#eee8fc] text-brand" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
            <rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>
        </span>
        <span className="min-w-0">
          <span className="block text-[10px] text-ink/60">Next Badge - {Math.max(total - done, 0)} sessions away</span>
          <span className="block truncate text-sm font-medium text-ink">{next}</span>
        </span>
      </div>
    </div>
  </div>;
export const SessionRow = ({ title, meta, action }: { title: string; meta: string; action: ReactNode }) =>
  <div className="flex items-center justify-between gap-3 text-sm"><div><b>{title}</b><br /><span className="text-xs text-ink/60">{meta}</span></div>{action}</div>;
