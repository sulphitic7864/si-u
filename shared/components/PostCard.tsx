"use client";
import { ReactNode, useState } from "react";
import { Avatar, Card } from "./ui";
import { Program } from "@/shared/data/mock";
type R = Record<string, number>;
const iconClass = "h-5 w-5";
const iconProps = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, className: iconClass };
const reactionIcons: Record<string, ReactNode> = {
  Support: <svg {...iconProps}><circle cx="12" cy="12" r="4" /><path d="M12 2v3m0 14v3M4.93 4.93l2.12 2.12m9.9 9.9 2.12 2.12M2 12h3m14 0h3M4.93 19.07l2.12-2.12m9.9-9.9 2.12-2.12" /></svg>,
  Insightful: <svg {...iconProps}><path d="M20 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3l3 3 3-3h7a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" /></svg>,
  Connect: <svg {...iconProps}><path d="m17 2 4 4-4 4" /><path d="M3 11V9a3 3 0 0 1 3-3h15" /><path d="m7 22-4-4 4-4" /><path d="M21 13v2a3 3 0 0 1-3 3H3" /></svg>,
};
export function EngagementBar({ reactions }: { reactions: R }) {
  const [mine, setMine] = useState<string | null>(null);
  return (<div className="mt-4 flex items-center gap-6 border-t border-border/70 pt-3 text-sm text-ink/60">{Object.entries(reactions).map(([k, v]) =>
    <button key={k} aria-label={`${k} post`} onClick={() => setMine(mine === k ? null : k)} className={`inline-flex items-center gap-2 transition-colors hover:text-brand ${mine === k ? "text-brand" : ""}`}>
      <span aria-hidden="true" className="leading-none">{k === "Support" ? <svg {...iconProps}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" /></svg> : reactionIcons[k] ?? "♡"}</span><span>{v + (mine === k ? 1 : 0)}</span>
    </button>)}</div>);
}
export function PostCard({ author, avatar, tag, meta, body, reactions, children }: { author: string; avatar?: string; tag?: Program; meta: string; body: string; reactions: R; children?: ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const canExpand = body.length > 180;
  const postBody = body.endsWith("…") ? body.slice(0, -1) : body;
  return (<Card className="p-4 sm:p-5"><div className="flex items-center gap-3"><Avatar name={author} size={44} shape="rounded" src={avatar} /><div className="min-w-0 flex-1">
    <div className="flex flex-wrap items-center gap-2"><b className="text-[15px]">{author}</b>{tag && <span className="rounded-md bg-brand/10 px-2 py-1 text-xs font-medium text-brand-deep">{tag}</span>}</div>
    <p className="text-xs text-ink/60">{meta}</p></div><button aria-label={`More options for ${author}'s post`} className="self-start px-2 text-xl leading-none text-ink/45">⋮</button></div>
    <p className={`mt-3 text-[15px] leading-6 ${canExpand && !expanded ? "line-clamp-3" : ""}`}>{postBody}</p>
    {canExpand && <button type="button" aria-expanded={expanded} onClick={() => setExpanded(value => !value)} className="mt-1 text-xs font-medium text-brand">{expanded ? "See less" : "See more"}</button>}
    {children}<EngagementBar reactions={reactions} /></Card>);
}
