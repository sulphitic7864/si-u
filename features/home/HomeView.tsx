"use client";
import { useState } from "react";
import { Feed } from "./Feed";
import { MomentsPlayer } from "./MomentsPlayer";
export function HomeView() {
  const [tab, setTab] = useState<"feed" | "moments">("feed");
  return (<>
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <h1 className="text-xl font-semibold text-ink lg:text-2xl">Welcome back, <span className="text-brand">julienne.siu</span> <span aria-hidden="true">👋</span></h1>
      <div role="tablist" aria-label="Home view" className="flex items-center gap-1">
        <button role="tab" aria-selected={tab === "feed"} onClick={() => setTab("feed")} className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${tab === "feed" ? "bg-brand-deep text-white shadow-sm" : "text-ink/55 hover:bg-white"}`}>Feed</button>
        <button role="tab" aria-selected={tab === "moments"} onClick={() => setTab("moments")} className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${tab === "moments" ? "bg-brand-deep text-white shadow-sm" : "text-ink/55 hover:bg-white"}`}>
          <span aria-hidden="true">▶</span>Moments<span className="rounded-full bg-brand/10 px-2 py-0.5 text-[10px] font-semibold text-brand">5 New</span>
        </button>
      </div>
    </div>
    {tab === "feed" ? <Feed /> : <MomentsPlayer />}
  </>);
}
