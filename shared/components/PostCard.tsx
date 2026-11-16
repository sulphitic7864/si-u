"use client";
import { ReactNode, useState } from "react";
import { Avatar, Card } from "./ui";
import { Program } from "@/shared/data/mock";
type R = Record<string, number>;
const reactionIcons: Record<string, string> = { Support: "☼", Insightful: "▢", Connect: "⟳", Save: "♧" };
export function EngagementBar({ reactions }: { reactions: R }) {
  const [mine, setMine] = useState<string | null>(null);
  return (<div className="mt-4 flex items-center gap-6 border-t border-border/70 pt-3 text-sm text-ink/60">{Object.entries(reactions).map(([k, v]) =>
    <button key={k} aria-label={`${k} post`} onClick={() => setMine(mine === k ? null : k)} className={`inline-flex items-center gap-2 transition-colors hover:text-brand ${mine === k ? "text-brand" : ""}`}>
      <span aria-hidden="true" className="text-lg leading-none">{reactionIcons[k] ?? "♡"}</span><span>{v + (mine === k ? 1 : 0)}</span>
    </button>)}</div>);
}
export function PostCard({ author, tag, meta, body, reactions, children }: { author: string; tag?: Program; meta: string; body: string; reactions: R; children?: ReactNode }) {
  return (<Card className="p-4 sm:p-5"><div className="flex items-center gap-3"><Avatar name={author} size={44} shape="rounded" /><div className="min-w-0 flex-1">
    <div className="flex flex-wrap items-center gap-2"><b className="text-[15px]">{author}</b>{tag && <span className="rounded-md bg-brand/10 px-2 py-1 text-[10px] font-medium text-brand-deep">{tag}</span>}</div>
    <p className="text-xs text-ink/60">{meta}</p></div><button aria-label={`More options for ${author}'s post`} className="self-start px-2 text-xl leading-none text-ink/45">⋮</button></div>
    <p className="mt-3 text-[15px] leading-6">{body}</p>{children}<EngagementBar reactions={reactions} /></Card>);
}
