"use client";
import { useState } from "react";
import { sessions } from "@/shared/data/mock";
import { Button } from "./ui";
import { RsvpButton } from "./RsvpModal";

const weekdays = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
const week = [
  { key: "mar-29", day: 29, muted: true },
  { key: "mar-30", day: 30, muted: true },
  { key: "mar-31", day: 31, muted: true },
  { key: "apr-1", day: 1, muted: false },
  { key: "apr-2", day: 2, muted: false },
  { key: "apr-3", day: 3, muted: false },
  { key: "apr-4", day: 4, muted: false },
];

export function CalendarWidget() {
  const [selectedDay, setSelectedDay] = useState(1);
  return (<div className="overflow-hidden rounded-2xl border border-border bg-white">
    <div className="p-3">
      <div className="mb-3 flex items-center justify-between gap-1">
        <h2 className="whitespace-nowrap text-xs font-semibold">Today, 1st April 2026</h2>
        <div className="flex items-center gap-1 text-explorer">
          <button type="button" aria-label="Expand calendar" className="grid h-6 w-6 place-items-center">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7" /></svg>
          </button>
          <button type="button" aria-label="Previous day" className="grid h-6 w-6 place-items-center">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <button type="button" aria-label="Next day" className="grid h-6 w-6 place-items-center">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {weekdays.map(day => <span key={day} className="py-1 text-[9px] text-ink/50">{day}</span>)}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1 text-center">
        {week.map(({ key, day, muted }) => {
          const selected = selectedDay === day;
          const hasSessions = [1, 2, 3].includes(day);
          return <button key={key} type="button" aria-pressed={selected} onClick={() => setSelectedDay(day)}
            className={`flex h-8 flex-col items-center justify-center rounded-md text-[10px] ${selected ? "bg-brand-deep font-semibold text-white" : muted ? "text-ink/35" : "text-ink/75 hover:bg-page"}`}>
            <span>{day}</span>
            <span className="h-2 text-[9px] leading-[8px]">{hasSessions ? selected ? "!" : "•" : ""}</span>
          </button>;
        })}
      </div>
    </div>
    <div className="border-t border-border px-3">
      {sessions.map((session, index) => <div key={session.id} className={`relative flex items-center gap-2.5 py-3 ${index > 0 ? "border-t border-border/70" : ""}`}>
        <span className={`absolute inset-y-3 left-0 w-1 rounded-full ${session.live ? "bg-rose-500" : "bg-fuchsia-300"}`} />
        <div className="min-w-0 flex-1 pl-2">
          <p className="truncate text-[10px] font-medium">{session.title}</p>
          <p className="mt-1 flex items-center gap-1.5 whitespace-nowrap text-[9px] text-ink/60">
            {session.live
              ? <span className="rounded bg-rose-500 px-1.5 py-0.5 font-semibold text-white">LIVE</span>
              : <span>10:00 PM</span>}
            <span>·</span><span className="truncate">{session.host}</span>
          </p>
        </div>
        {session.live
          ? <Button density="compact">Watch</Button>
          : <RsvpButton title={session.title} when="Wed 1 Apr · 10:00 PM" density="compact" />}
      </div>)}
      <button type="button" className="w-full pb-3 pt-1 text-xs text-brand">Load more...</button>
    </div>
  </div>);
}
