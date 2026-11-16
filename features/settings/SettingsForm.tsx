"use client";
import { useState } from "react";
import { Button, Card } from "@/shared/components/ui";
type S = { publicProfile: boolean; location: string; attendance: boolean; searchable: boolean; dms: boolean };
const Toggle = ({ label, hint, on, set }: { label: string; hint: string; on: boolean; set: (v: boolean) => void }) =>
  <label className="flex items-center justify-between gap-4 border-t border-border py-3 first:border-0"><span><b className="text-sm">{label}</b><span className="block text-xs text-ink/60">{hint}</span></span>
    <input type="checkbox" role="switch" checked={on} onChange={e => set(e.target.checked)} className="h-5 w-9 accent-[var(--color-brand)]" /></label>;
export function SettingsForm({ role = "guide" as "guide" | "explorer" }) {
  // Defaults per role: Guide public, Explorer private.
  const [s, setS] = useState<S>({ publicProfile: role === "guide", location: "Connections only", attendance: true, searchable: true, dms: role === "guide" });
  const [saved, setSaved] = useState(false);
  const up = <K extends keyof S>(k: K, v: S[K]) => { setS(o => ({ ...o, [k]: v })); setSaved(false); };
  return (<div className="space-y-4">
    <Card><h2 className="mb-2 font-semibold">Privacy</h2>
      <Toggle label="Public profile" hint="Anyone can see your profile. Off: only people you share a session with." on={s.publicProfile} set={v => up("publicProfile", v)} />
      <Toggle label="Attendance history" hint="Show sessions you attended on your profile." on={s.attendance} set={v => up("attendance", v)} />
      <Toggle label="Searchable" hint="Appear in search results." on={s.searchable} set={v => up("searchable", v)} />
      <Toggle label="Direct messages" hint="Guide-level setting. Co-attendees can message you when on." on={s.dms} set={v => up("dms", v)} />
      <div className="border-t border-border py-3"><b className="text-sm">Location visibility</b><span className="block text-xs text-ink/60">City level at most.</span>
        <div className="mt-2 flex gap-2">{["Connections only", "Everyone", "Hidden"].map(x => <button key={x} onClick={() => up("location", x)} className={`rounded-full border px-3 py-1 text-sm ${s.location === x ? "border-brand-deep bg-brand-deep text-white" : "border-border"}`}>{x}</button>)}</div></div></Card>
    <Card><h2 className="mb-2 font-semibold">Identity</h2>
      <p className="text-sm">.siu handle: <b>kara.siu</b> <Button variant="ghost">Change</Button></p>
      <p className="mt-3 text-sm">Import from LinkedIn: save your profile as PDF, then <Button variant="ghost">Upload PDF</Button></p></Card>
    <div className="flex items-center gap-3"><Button onClick={() => setSaved(true) /* Phase 2: PATCH /me/settings */}>Save changes</Button>{saved && <span className="text-sm text-brand">Saved</span>}</div></div>);
}
