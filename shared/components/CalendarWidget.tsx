"use client";
import { useState } from "react";
const days = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
export function CalendarWidget() {
  const [sel, setSel] = useState(1);
  const cells = [...Array(2).fill(0), ...Array.from({ length: 30 }, (_, i) => i + 1)]; // April 2026 starts Wednesday
  return (<div className="rounded-2xl border border-border p-3">
    <p className="mb-2 text-sm font-medium">April 2026</p>
    <div className="grid grid-cols-7 gap-1 text-center text-xs">{days.map(d => <span key={d} className="text-ink/50">{d}</span>)}
      {cells.map((d, i) => d ? <button key={i} onClick={() => setSel(d)} className={`rounded-lg py-1 ${sel === d ? "bg-brand-deep text-white" : ""}`}>{d}{[1, 2, 3].includes(d) && <i className="mx-auto block h-1 w-1 rounded-full bg-brand" />}</button> : <span key={i} />)}</div></div>);
}
