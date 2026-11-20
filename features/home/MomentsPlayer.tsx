"use client";
import { useState } from "react";
import Image from "next/image";
import { RsvpButton } from "@/shared/components/RsvpModal";
import { Avatar } from "@/shared/components/ui";

const moments = [
  { tag: "Well-Being", author: "Nina John", handle: "@Nina.Siu", role: "Emerging Tech Adoption Leader", caption: "2-minute breath reset between meetings. Try it.", hashtags: "#wellbeing  #breath", image: "/assets/image1945.png", session: "Breathwork for Focus", sessionDate: "22", likes: 24, commentCount: 6, comments: [{ n: "Lola Kim", t: "This is exactly what I needed today!" }, { n: "Marc Lee", t: "Where can I get the slides from the session?" }] },
  { tag: "Grow3dge", author: "Sandy Martinez", handle: "@Sandy.Siu", role: "Web3 Sales", caption: "One question that unlocks every B2B discovery call.", hashtags: "#sales  #web3", image: "/assets/image1946.png", session: "How to Sell B2B in Web3", sessionDate: "24", likes: 98, commentCount: 0, comments: [] },
];
export function MomentsPlayer() {
  const [i, setI] = useState(0); const [commentsOpen, setCommentsOpen] = useState(false);
  const [liked, setLiked] = useState<number[]>([]); const [saved, setSaved] = useState<number[]>([]);
  const m = moments[i]; const flip = (a: number[], set: (x: number[]) => void) => set(a.includes(i) ? a.filter(x => x !== i) : [...a, i]);
  return (<div className="mx-auto flex w-full max-w-[720px] items-start justify-center gap-4">
    <div className="relative w-full max-w-[328px] shrink-0">
      <div className="relative h-[504px] overflow-hidden rounded-[14px] bg-slate-900 text-white shadow-lg">
        <Image src={m.image} alt={`${m.author} sharing a moment`} fill sizes="(max-width: 640px) 100vw, 328px" className="object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/5" />
        <span className="absolute left-3 top-3 rounded bg-[#74833b]/85 px-2.5 py-1 text-xs">{m.tag}</span>
        <div className="absolute right-3 top-[35%] flex flex-col items-center gap-2 drop-shadow">
          <button type="button" aria-label="Like" onClick={() => flip(liked, setLiked)} className="flex flex-col items-center gap-1 text-xs">
            <Image src="/assets/icons/Group2147232344.png" alt="" width={32} height={32} className="h-8 w-8 object-contain" />
            {m.likes + (liked.includes(i) ? 1 : 0)}
          </button>
          <button type="button" aria-label="Comments" onClick={() => setCommentsOpen(open => !open)} className="flex flex-col items-center gap-1 text-xs">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-600/60">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M5 5h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7l-4 3v-3H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" /></svg>
            </span>
            {m.commentCount}
          </button>
          <button type="button" aria-label="Share" className="grid h-8 w-8 place-items-center rounded-full bg-slate-600/60">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m17 2 4 4-4 4M3 11V9a3 3 0 0 1 3-3h15m-4 16-4-4 4-4m4-3v2a3 3 0 0 1-3 3H3" /></svg>
          </button>
          <button type="button" aria-label="Save" onClick={() => flip(saved, setSaved)} className="grid h-8 w-8 place-items-center rounded-full bg-slate-600/60">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill={saved.includes(i) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M6 4h12v17l-6-4-6 4V4Z" /></svg>
          </button>
          <button type="button" aria-label="More moment options" className="grid h-8 w-8 place-items-center rounded-full bg-slate-600/60">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><circle cx="5" cy="12" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="19" cy="12" r="1.5" /></svg>
          </button>
        </div>
        <div className="absolute inset-x-0 bottom-0 space-y-1.5 bg-gradient-to-t from-black/80 via-black/25 to-transparent px-3 pb-3 pt-20">
          <div className="flex items-center gap-2">
            <Avatar name={m.author} size={38} shape="rounded" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5"><b className="text-xs">{m.author}</b><span className="text-xs text-white/75">{m.handle}</span><button type="button" className="rounded-full border border-white/60 px-2 py-0.5 text-xs">Connect</button></div>
              <p className="text-xs text-white/80">{m.role}</p>
            </div>
          </div>
          <p className="text-xs leading-4">{m.caption}</p>
          <p className="text-xs text-white/75">{m.hashtags}</p>
        </div>
      </div>
      <div className="absolute -right-8 top-1/2 flex -translate-y-1/2 flex-col gap-2">
        <button type="button" aria-label="Previous moment" disabled={i === 0} onClick={() => setI(i - 1)} className="grid h-6 w-6 place-items-center rounded-full bg-white text-explorer shadow disabled:opacity-50">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><path d="m6 14 6-6 6 6" /></svg>
        </button>
        <button type="button" aria-label="Next moment" disabled={i === moments.length - 1} onClick={() => setI(i + 1)} className="grid h-6 w-6 place-items-center rounded-full bg-white text-explorer shadow disabled:opacity-50">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><path d="m6 10 6 6 6-6" /></svg>
        </button>
      </div>
      <div className="mt-2.5 flex items-center gap-2 rounded-xl bg-white p-2.5 text-ink shadow-sm">
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-[#5043ae] text-center text-white">
          <span className="text-xs leading-3">April</span><b className="text-xs leading-3">{m.sessionDate}</b>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-ink/60">Next Session by {m.author}</p>
          <b className="block truncate text-xs text-brand-deep">{m.session}</b>
        </div>
        <RsvpButton title={m.session} when={`April ${m.sessionDate}`} label="• Attend →" density="compact" />
      </div>
    </div>
    {commentsOpen && <aside className="hidden w-64 space-y-4 rounded-2xl border border-border bg-white p-4 md:block">
      <div className="flex items-center justify-between"><b>Comments</b><span className="text-xs text-ink/50">{m.commentCount}</span></div>
      <div className="space-y-4">{m.comments.map(c => <p key={c.t} className="text-sm leading-5"><b>{c.n}</b><br /><span className="text-ink/70">{c.t}</span></p>)}</div>
      <input aria-label="Add a comment" placeholder="Add a comment…" className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
    </aside>}
  </div>);
}
