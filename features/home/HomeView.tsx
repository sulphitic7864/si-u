"use client";
import { useState } from "react";
import { Feed } from "./Feed";
import { MomentsPlayer } from "./MomentsPlayer";
export function HomeView() {
  const [tab, setTab] = useState<"feed" | "moments">("feed");
  return (<div className="font-geist">
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <h1 className="whitespace-nowrap text-xl font-semibold text-ink">Welcome back, <span className="text-brand">julienne.siu</span> <span aria-hidden="true">👋</span></h1>
      <div className="flex flex-wrap items-center justify-end gap-2">
        <div role="tablist" aria-label="Home view" className="flex items-center gap-1">
          <button role="tab" aria-selected={tab === "feed"} onClick={() => setTab("feed")} className={`inline-flex h-6 items-center justify-center rounded-full px-3 text-xs leading-none font-medium transition-colors ${tab === "feed" ? "bg-brand-deep text-white shadow-sm" : "text-ink/55 hover:bg-white"}`}>Feed</button>
          <button role="tab" aria-selected={tab === "moments"} onClick={() => setTab("moments")} className={`inline-flex h-6 items-center justify-center gap-1.5 rounded-full px-2 text-xs leading-none font-medium transition-colors ${tab === "moments" ? "bg-brand-deep text-white shadow-sm" : "text-ink/55 hover:bg-white"}`}>
            <svg aria-hidden="true" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3"><path d="M5 3.5a.75.75 0 0 1 1.14-.64l6 4a.75.75 0 0 1 0 1.28l-6 4A.75.75 0 0 1 5 11.5z" /></svg>
            Moments{tab !== "moments" && <span className="rounded-full bg-brand/10 px-1.5 py-0.5 text-[9px] font-semibold text-brand">5 New</span>}
          </button>
        </div>
        <div aria-label="Connected identity julienne.siher.eth" className="flex items-center gap-1.5 rounded-full bg-[#eeeaf8] px-2.5 py-1 text-[10px] font-medium text-brand-deep">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          julienne.siher.eth
        </div>
      </div>
    </div>
    {tab === "feed" ? <Feed /> : <MomentsPlayer />}
  </div>);
}
