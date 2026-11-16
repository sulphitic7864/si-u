import { ReactNode } from "react";
export const ProgressBar = ({ value, tone = "light" }: { value: number; tone?: "light" | "brand" }) =>
  <div className={`h-1.5 rounded ${tone === "light" ? "bg-white/20" : "bg-brand/15"}`}><div style={{ width: `${value}%` }} className={`h-full rounded ${tone === "light" ? "bg-white" : "bg-brand"}`} /></div>;
export const BadgesWidget = ({ done = 3, total = 5, next = "Grow3dge Incubator" }: { done?: number; total?: number; next?: string }) =>
  <div className="bg-card-deep rounded-2xl p-4 text-white"><p className="text-sm">Your Earned Badges</p>
    <div className="my-3 flex -space-x-2">{[0, 1, 2].map(i => <span key={i} className="h-8 w-8 rounded-full border-2 border-white/60 bg-white/20" />)}</div>
    <p className="mb-1 text-xs">Progress to next badge · {done} / {total} sessions</p><ProgressBar value={(done / total) * 100} />
    <p className="mt-3 rounded-lg bg-white/10 p-2 text-xs">🔒 Next: {next}</p></div>;
export const SessionRow = ({ title, meta, action }: { title: string; meta: string; action: ReactNode }) =>
  <div className="flex items-center justify-between gap-3 text-sm"><div><b>{title}</b><br /><span className="text-xs text-ink/60">{meta}</span></div>{action}</div>;
