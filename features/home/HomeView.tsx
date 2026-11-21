"use client";
import { useState } from "react";
import { Feed } from "./Feed";
import { MomentsPlayer } from "./MomentsPlayer";
import { me } from "@/shared/data/mock";
export function HomeView() {
  const [tab, setTab] = useState<"feed" | "moments">("feed");
  return (<div className="font-geist">
    <div className="mb-5 flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="whitespace-nowrap text-xl font-semibold text-ink">Welcome back, <span className="text-brand">{me.handle}</span> <span aria-hidden="true">👋</span></h1>
        <div aria-label={`Connected identity ${me.handle}`} className="flex items-center gap-1.5 rounded-full bg-[#eeeaf8] px-2.5 py-1 text-xs font-medium text-brand-deep">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {me.handle}
        </div>
      </div>
      <div role="tablist" aria-label="Home view" className="flex items-center gap-1 self-start">
          <button role="tab" aria-selected={tab === "feed"} onClick={() => setTab("feed")} className={`inline-flex h-6 items-center justify-center rounded-full px-3 text-xs leading-none font-medium transition-colors ${tab === "feed" ? "bg-brand-deep text-white shadow-sm" : "text-ink/55 hover:bg-white"}`}>Feed</button>
          <button role="tab" aria-selected={tab === "moments"} onClick={() => setTab("moments")} className={`inline-flex h-6 items-center justify-center gap-1.5 rounded-full px-2 text-xs leading-none font-medium transition-colors ${tab === "moments" ? "bg-brand-deep text-white shadow-sm" : "text-ink/55 hover:bg-white"}`}>
            Moments{tab !== "moments" && <span className="rounded-full bg-brand/10 px-1.5 py-0.5 text-xs font-semibold text-brand">5 New</span>}
          </button>
      </div>
    </div>
    {tab === "feed" ? <Feed /> : <MomentsPlayer />}
  </div>);
}
