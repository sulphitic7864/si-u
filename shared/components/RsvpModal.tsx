"use client";
import { useState } from "react";
import { Button } from "./ui";
const opts = [
  { title: "Add to SI U scheduler", description: "You’ll receive a reminder + earn attendance points", icon: "calendar" },
  { title: "Add to Google Calendar", description: "Export directly to your Google account", icon: "google" },
  { title: "Add to Apple Calendar", description: "Export directly to your Apple account", icon: "apple" },
] as const;
export function RsvpButton({ title, when, label = "Attend", density = "default" }: { title: string; when: string; label?: string; density?: "default" | "compact" }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sel, setSel] = useState<string[]>([opts[0].title, opts[1].title]);
  const toggle = (o: string) => setSel(s => s.includes(o) ? s.filter(x => x !== o) : [...s, o]);
  return (<>
    {done
      ? <span className={`rounded-lg bg-brand/10 text-brand ${density === "compact" ? "px-3 py-1 text-[10px]" : "px-4 py-2 text-sm"}`}>✓ Attending</span>
      : <Button density={density} onClick={() => setOpen(true)}>{label}</Button>}
    {open && <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4" role="dialog" aria-modal="true" aria-labelledby="schedule-session-title">
      <div className="w-full max-w-sm rounded-xl bg-white p-4 shadow-xl sm:p-5">
        <div className="mb-1 flex items-center justify-between">
          <h2 id="schedule-session-title" className="text-sm font-semibold">Schedule this session</h2>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="text-lg leading-none text-ink/55 hover:text-ink">×</button>
        </div>
        <p className="mb-3 text-[10px] leading-4 text-ink/55">Attending saves it to your SI U scheduler and lets you export to your personal calendar.</p>
        <div className="mb-3 flex gap-2 rounded-lg bg-[#f5f2fa] p-3">
          <span className="w-1 shrink-0 rounded-full bg-brand-deep" />
          <span className="min-w-0">
            <b className="block truncate text-xs font-medium">{title}</b>
            <span className="mt-1 block text-[10px] text-ink/55">{when} · Grow3dge</span>
          </span>
        </div>
        <div className="space-y-1.5 border-t border-border pt-2">
          {opts.map(option => {
            const checked = sel.includes(option.title);
            return <label key={option.title} className={`flex cursor-pointer items-center gap-2 rounded-lg border p-2 text-xs ${checked ? "border-brand" : "border-border"}`}>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-[#f4f3f7]">
                {option.icon === "calendar" && <span aria-hidden="true" className="text-lg">🗓️</span>}
                {option.icon === "google" && <span aria-hidden="true" className="text-lg font-bold text-[#4285F4]">G</span>}
                {option.icon === "apple" && <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-current text-ink/70"><path d="M12.1 8.4c-.9 0-2.1-1-3.5-1-1.9 0-3.8 1.6-3.8 4.5 0 1.8.7 3.8 1.6 5.1.8 1.1 1.4 1.8 2.4 1.8.8 0 1.3-.5 2.3-.5s1.5.5 2.4.5c1 0 1.7-.8 2.4-1.9.6-.9.9-1.4 1.3-2.4-2.4-.9-2.7-3.8-.1-4.9-.9-1.1-2.1-1.2-2.6-1.2-.9-.1-1.7.1-2.4.1Z" /><path d="M14.3 5.7c.8-.7 1.3-1.7 1.2-2.7-.9.1-1.8.6-2.4 1.3-.6.7-1.1 1.7-1 2.6.9.1 1.7-.4 2.2-1.2Z" /></svg>}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium">{option.title}</span>
                <span className="mt-0.5 block text-[9px] leading-3 text-ink/50">{option.description}</span>
              </span>
              <input type="checkbox" className="peer sr-only" checked={checked} onChange={() => toggle(option.title)} />
              <span aria-hidden="true" className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border ${checked ? "border-brand" : "border-border"}`}>
                {checked && <span className="h-2 w-2 rounded-full bg-brand" />}
              </span>
            </label>;
          })}
        </div>
        <Button className="mt-3 w-full" onClick={() => { setOpen(false); setDone(true); setSuccess(true); }}>Attend</Button>
        <button type="button" className="mt-2 w-full text-xs text-ink/55" onClick={() => setOpen(false)}>Maybe later</button>
      </div>
    </div>}
    {success && <div className="fixed inset-0 z-[60] grid place-items-center bg-black/40 p-4" role="dialog" aria-modal="true" aria-labelledby="attending-title">
      <div className="w-full max-w-xs rounded-xl bg-white p-5 text-center shadow-xl">
        <svg aria-hidden="true" viewBox="0 0 48 48" className="mx-auto mb-2 h-12 w-12">
          <path fill="#10b981" d="m24 2 5 4 7-1 2 7 6 4-2 7 2 7-6 4-2 7-7-1-5 4-5-4-7 1-2-7-6-4 2-7-2-7 6-4 2-7 7 1 5-4Z" />
          <path d="m16 24 5 5 11-12" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
        </svg>
        <h2 id="attending-title" className="text-sm font-semibold">You’re Attending!</h2>
        <p className="mt-2 text-[10px] leading-4 text-ink/55">Session added to your SI U scheduler.<br />Invite sent to your connected calendar.</p>
        <Button className="mt-4 w-full" onClick={() => setSuccess(false)}>Done</Button>
      </div>
    </div>}
  </>);
}
