"use client";
import { useState } from "react";
import { Button } from "./ui";
const opts = ["Add to SI U scheduler", "Add to Google Calendar", "Add to Apple Calendar"];
export function RsvpButton({ title, when, label = "Attend" }: { title: string; when: string; label?: string }) {
  const [open, setOpen] = useState(false); const [done, setDone] = useState(false);
  const [sel, setSel] = useState<string[]>([opts[0]]);
  const toggle = (o: string) => setSel(s => s.includes(o) ? s.filter(x => x !== o) : [...s, o]);
  if (done) return <span className="rounded-lg bg-brand/10 px-4 py-2 text-sm text-brand">✓ Attending</span>;
  return (<>
    <Button onClick={() => setOpen(true)}>{label}</Button>
    {open && <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" role="dialog" aria-modal>
      <div className="w-full max-w-sm space-y-3 rounded-2xl bg-white p-6">
        <div className="flex justify-between"><h2 className="font-semibold">Schedule this session</h2><button onClick={() => setOpen(false)} aria-label="Close">✕</button></div>
        <div className="rounded-lg bg-page p-3 text-sm"><b>{title}</b><br />{when}</div>
        {opts.map(o => <label key={o} className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 text-sm ${sel.includes(o) ? "border-brand" : "border-border"}`}>{o}<input type="checkbox" checked={sel.includes(o)} onChange={() => toggle(o)} /></label>)}
        <Button className="w-full" onClick={() => { setDone(true); setOpen(false); /* TODO Phase 2: POST /rsvp + calendar export */ }}>Attend</Button>
        <button className="w-full text-sm text-ink/60" onClick={() => setOpen(false)}>Maybe later</button>
      </div></div>}
  </>);
}
