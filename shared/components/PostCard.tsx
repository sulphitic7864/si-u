"use client";
import { ReactNode, useState } from "react";
import { Avatar, Card, ProgramTag } from "./ui";
import { Program } from "@/shared/data/mock";
type R = Record<string, number>;
export function EngagementBar({ reactions }: { reactions: R }) {
  const [mine, setMine] = useState<string | null>(null);
  return (<div className="mt-3 flex gap-2 text-sm">{Object.entries(reactions).map(([k, v]) =>
    <button key={k} onClick={() => setMine(mine === k ? null : k)} className={`rounded-full border px-3 py-1 ${mine === k ? "border-brand bg-brand/10 text-brand" : "border-border"}`}>{k} {v + (mine === k ? 1 : 0)}</button>)}</div>);
}
export function PostCard({ author, tag, meta, body, reactions, children }: { author: string; tag?: Program; meta: string; body: string; reactions: R; children?: ReactNode }) {
  return (<Card><div className="flex items-center gap-3"><Avatar name={author} /><div><b>{author}</b> {tag && <ProgramTag program={tag} />}<p className="text-xs text-ink/60">{meta}</p></div></div>
    <p className="mt-3">{body}</p>{children}<EngagementBar reactions={reactions} /></Card>);
}
