"use client";
import { useState } from "react";
import { RsvpButton } from "@/shared/components/RsvpModal";
import { Avatar } from "@/shared/components/ui";

const moments = [
  { tag: "Well-Being", author: "Nina John", role: "Breathwork Guide", caption: "2-minute breath reset between meetings. Try it. #wellbeing #breath", session: "Breathwork for Focus", likes: 214, comments: [{ n: "Lola Kim", t: "This is exactly what I needed today!" }, { n: "Marc Lee", t: "Where can I get the slides from the session?" }] },
  { tag: "Grow3dge", author: "Sandy Martinez", role: "Web3 Sales", caption: "One question that unlocks every B2B discovery call. #sales #web3", session: "How to Sell B2B in Web3", likes: 98, comments: [] },
];
export function MomentsPlayer() {
  const [i, setI] = useState(0); const [open, setOpen] = useState(true);
  const [liked, setLiked] = useState<number[]>([]); const [saved, setSaved] = useState<number[]>([]);
  const m = moments[i]; const flip = (a: number[], set: (x: number[]) => void) => set(a.includes(i) ? a.filter(x => x !== i) : [...a, i]);
  return (<div className="mx-auto flex max-w-[720px] items-start justify-center gap-4">
    <div className="w-full max-w-[360px] shrink-0">
      <div className="relative h-[560px] overflow-hidden rounded-2xl bg-gradient-to-b from-sky-200 via-lime-100 to-emerald-900 text-white shadow-lg">
        <svg aria-hidden="true" viewBox="0 0 360 560" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
          <defs><linearGradient id="moment-sky" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#b6dfcf" /><stop offset=".58" stopColor="#77a971" /><stop offset="1" stopColor="#234b38" /></linearGradient></defs>
          <rect width="360" height="560" fill="url(#moment-sky)" />
          <circle cx="285" cy="96" r="44" fill="#fff3c4" opacity=".8" />
          <path d="M0 260q80-65 160 0t200-8v308H0Z" fill="#849d58" />
          <path d="M0 340q90-55 180 0t180-12v232H0Z" fill="#516b3d" />
          <path d="M40 488h280l-24 16H64Z" fill="#d5ba82" opacity=".9" />
          <g fill="none" stroke="#1b2420" strokeLinecap="round" strokeLinejoin="round" strokeWidth="17">
            <path d="M184 171 169 111 145 77" />
            <path d="M183 174 247 195" />
            <path d="m184 170-17 84" />
            <path d="m170 249-60 61-61 8" />
            <path d="m170 249 63 65 75 4" />
          </g>
          <circle cx="188" cy="146" r="16" fill="#1b2420" />
        </svg>
        <span className="absolute left-3 top-3 rounded-full bg-black/35 px-3 py-1 text-xs">{m.tag}</span>
        <div className="absolute right-3 top-1/3 flex flex-col gap-4 text-center text-xs drop-shadow">
          <button aria-label="Like" onClick={() => flip(liked, setLiked)}><span className="text-xl">{liked.includes(i) ? "♥" : "♡"}</span><br />{m.likes + (liked.includes(i) ? 1 : 0)}</button>
          <button aria-label="Comments" onClick={() => setOpen(o => !o)}><span className="text-xl">▢</span><br />{m.comments.length}</button>
          <button aria-label="Share" className="text-xl">↗</button>
          <button aria-label="Save" onClick={() => flip(saved, setSaved)} className="text-xl">{saved.includes(i) ? "▣" : "♧"}</button>
          <button aria-label="Previous moment" disabled={i === 0} onClick={() => setI(i - 1)}>▲</button>
          <button aria-label="Next moment" disabled={i === moments.length - 1} onClick={() => setI(i + 1)}>▼</button>
        </div>
        <div className="absolute inset-x-0 bottom-0 space-y-2 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 pt-20">
          <div className="flex items-center gap-2"><Avatar name={m.author} size={32} shape="rounded" /><div className="text-sm"><b>{m.author}</b><p className="text-xs opacity-80">{m.role}</p></div></div>
          <p className="text-sm leading-5">{m.caption}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl border border-border bg-white p-3 text-ink shadow-sm">
        <div className="min-w-0 text-sm"><span className="text-xs text-ink/60">Next session</span><br /><b className="line-clamp-1">{m.session}</b></div>
        <RsvpButton title={m.session} when="Next week" />
      </div>
    </div>
    {open && <aside className="hidden w-64 space-y-4 rounded-2xl border border-border bg-white p-4 md:block">
      <div className="flex items-center justify-between"><b>Comments</b><span className="text-xs text-ink/50">{m.comments.length}</span></div>
      <div className="space-y-4">{m.comments.map(c => <p key={c.t} className="text-sm leading-5"><b>{c.n}</b><br /><span className="text-ink/70">{c.t}</span></p>)}</div>
      <input aria-label="Add a comment" placeholder="Add a comment…" className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
    </aside>}
  </div>);
}
