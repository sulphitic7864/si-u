"use client";
import { useState } from "react";
import { RsvpButton } from "@/shared/components/RsvpModal";
import { Avatar } from "@/shared/components/ui";

const moments = [
  { tag: "Well-Being", author: "Nina John", role: "Breathwork Guide", caption: "2-minute breath reset between meetings. Try it. #wellbeing #breath", session: "Breathwork for Focus", likes: 214, comments: [{ n: "Lola Kim", t: "This is exactly what I needed today!" }, { n: "Marc Lee", t: "Where can I get the slides from the session?" }] },
  { tag: "Grow3dge", author: "Sandy Martinez", role: "Web3 Sales", caption: "One question that unlocks every B2B discovery call. #sales #web3", session: "How to Sell B2B in Web3", likes: 98, comments: [] },
];
export function MomentsPlayer() {
  const [i, setI] = useState(0); const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState<number[]>([]); const [saved, setSaved] = useState<number[]>([]);
  const m = moments[i]; const flip = (a: number[], set: (x: number[]) => void) => set(a.includes(i) ? a.filter(x => x !== i) : [...a, i]);
  return (<div className="mx-auto flex max-w-3xl gap-4">
    <div className="relative h-[600px] flex-1 overflow-hidden rounded-2xl bg-gradient-to-b from-lime-200 via-emerald-700 to-brand-deep text-white">
      <span className="absolute left-3 top-3 rounded bg-black/40 px-2 py-0.5 text-xs">{m.tag}</span>
      <div className="absolute right-3 top-1/3 flex flex-col gap-3 text-center text-xs">
        <button aria-label="Like" onClick={() => flip(liked, setLiked)}>{liked.includes(i) ? "💜" : "🤍"}<br />{m.likes + (liked.includes(i) ? 1 : 0)}</button>
        <button aria-label="Comments" onClick={() => setOpen(o => !o)}>💬<br />{m.comments.length}</button>
        <button aria-label="Share">↗</button>
        <button aria-label="Save" onClick={() => flip(saved, setSaved)}>{saved.includes(i) ? "🔖" : "📑"}</button>
        <button aria-label="Previous" disabled={i === 0} onClick={() => setI(i - 1)}>▲</button>
        <button aria-label="Next" disabled={i === moments.length - 1} onClick={() => setI(i + 1)}>▼</button></div>
      <div className="absolute inset-x-0 bottom-0 space-y-2 bg-gradient-to-t from-black/70 p-4">
        <div className="flex items-center gap-2"><Avatar name={m.author} size={32} /><div className="text-sm"><b>{m.author}</b><p className="text-xs opacity-80">{m.role}</p></div></div>
        <p className="text-sm">{m.caption}</p>
        <div className="flex items-center justify-between rounded-xl bg-white p-3 text-ink"><div className="text-sm"><span className="text-xs text-ink/60">Next session</span><br /><b>{m.session}</b></div>
          <RsvpButton title={m.session} when="Next week" /></div></div></div>
    {open && <aside className="hidden w-64 space-y-3 rounded-2xl border border-border bg-white p-4 md:block">
      <b>Comments · {m.comments.length}</b>
      {m.comments.map(c => <p key={c.t} className="text-sm"><b>{c.n}</b><br />{c.t}</p>)}
      <input placeholder="Add a comment…" className="w-full rounded-lg border border-border px-3 py-2 text-sm" /></aside>}
  </div>);
}
