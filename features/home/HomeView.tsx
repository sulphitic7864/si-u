"use client";
import { useState } from "react";
import { Feed } from "./Feed";
import { MomentsPlayer } from "./MomentsPlayer";
import { Chip } from "@/shared/components/ui";
export function HomeView() {
  const [tab, setTab] = useState<"feed" | "moments">("feed");
  return (<>
    <div className="mb-5 flex flex-wrap items-center gap-3"><h1 className="text-2xl font-bold text-brand-deep">Welcome back, julienne.siu 👋</h1>
      <button onClick={() => setTab("feed")}><Chip active={tab === "feed"}>Feed</Chip></button>
      <button onClick={() => setTab("moments")}><Chip active={tab === "moments"}>▶ Moments · 5 New</Chip></button></div>
    {tab === "feed" ? <Feed /> : <MomentsPlayer />}
  </>);
}
