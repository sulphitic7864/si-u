"use client";
import { useState } from "react";
import { Card, Avatar, Button, Chip } from "@/shared/components/ui";
import { connections, requests, met } from "@/shared/data/mock";
export function ConnectionList() {
  const [q, setQ] = useState(""); const [tab, setTab] = useState<"received" | "sent">("received");
  const [f, setF] = useState(false); const [hidden, setHidden] = useState<string[]>([]);
  const list = connections.filter(c => (c.name + c.handle + c.role).toLowerCase().includes(q.toLowerCase()));
  return (<div className="space-y-5">
    <div className="flex gap-2"><input value={q} onChange={e => setQ(e.target.value)} placeholder="Search your connections by name, handle or role" className="flex-1 rounded-xl border border-border px-4 py-2 text-sm" /><Button variant="ghost" onClick={() => setF(true)}>Filters</Button></div>
    {f && <FilterDrawer onClose={() => setF(false)} />}
    <div className="flex gap-2"><Chip active>All 1,140</Chip><Chip>Guides 48</Chip><Chip>Explorers 1,092</Chip><Chip>Online now 12</Chip></div>
    <Card><div className="mb-3 flex justify-between"><h2 className="font-mono text-xs tracking-widest">REQUESTS · {requests.length}</h2>
      <div className="flex gap-1">{(["received", "sent"] as const).map(t => <button key={t} onClick={() => setTab(t)} className={`rounded-full px-3 py-1 text-xs capitalize ${tab === t ? "bg-brand-deep text-white" : ""}`}>{t}</button>)}</div></div>
      {tab === "received" ? requests.filter(r => !hidden.includes(r.name)).map(r => <div key={r.name} className="border-t border-border py-3">
        <div className="flex items-center gap-3"><Avatar name={r.name} /><div className="flex-1"><b>{r.name}</b><p className="text-xs">{r.role}</p></div>
          <Button>Accept</Button><Button variant="ghost" onClick={() => setHidden(h => [...h, r.name])}>Decline</Button></div>
        <p className="mt-2 rounded-lg bg-page p-3 text-sm">{r.note}</p><p className="mt-1 text-xs text-ink/60">You were both in {r.session}</p></div>)
        
        : <SentList />}
      <p className="mt-2 text-xs text-ink/50">Declining is silent — they’re never told.</p></Card>
    <h2 className="font-mono text-xs tracking-widest">PEOPLE YOU MET THIS WEEK</h2>
    <div className="grid gap-3 md:grid-cols-2">{met.map(m => <Card key={m.name}><div className="flex items-center gap-3"><Avatar name={m.name} /><b>{m.name}</b></div><p className="mt-2 text-xs">{m.ctx}</p>
      <div className="mt-2 flex justify-between text-xs text-amber-600">{m.left}<Button>Connect</Button></div></Card>)}</div>
    <Card className="divide-y divide-border p-0">{list.map(c => <div key={c.handle} className="flex items-center gap-3 p-4"><Avatar name={c.name} />
      <div className="flex-1"><b>{c.name}</b> <span className="text-xs text-ink/50">@{c.handle}</span><p className="text-xs">{c.role}</p></div>
      {c.live && <span className="text-xs text-red-500">Live now</span>}<Button variant="ghost">Message</Button></div>)}</Card></div>);
}

const pick = (title: string, items: string[]) => (<div><p className="mb-1 font-mono text-[10px] tracking-widest">{title}</p><div className="flex flex-wrap gap-2">{items.map(i => <label key={i} className="cursor-pointer rounded-full border border-border px-3 py-1 text-sm has-[:checked]:bg-brand-deep has-[:checked]:text-white"><input type="checkbox" className="sr-only" />{i}</label>)}</div></div>);
function FilterDrawer({ onClose }: { onClose: () => void }) {
  return (<div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 md:items-center" role="dialog" aria-modal>
    <div className="max-h-[85vh] w-full max-w-md space-y-5 overflow-auto rounded-t-2xl bg-white p-6 md:rounded-2xl">
      <div className="flex justify-between"><b>Filters</b><button onClick={onClose}>Clear all</button></div>
      {pick("SESSION", ["Tokenomics 101", "Leading Without Losing Yourself", "Mastering AI Automations"])}
      {pick("PROGRAM", ["Grow3dge", "SI Her", "Well-Being", "Explorer"])}
      {pick("HOW YOU MET", ["You were both in a session", "They led a session you attended", "Search or invite link"])}
      {pick("MESSAGING", ["Any", "Can message", "DMs off"])}
      {pick("CONNECTED", ["Any time", "Last 7 days", "Last 30 days", "Last 3 months"])}
      <div className="flex gap-2"><Button variant="ghost" onClick={onClose}>Cancel</Button><Button className="flex-1" onClick={onClose}>Show people</Button></div></div></div>);
}

const sentInit = [
  { name: "Amber Cardera", note: "You mentioned rebuilding your activation email in the Q&A — would love to compare notes.", status: "Waiting" },
  { name: "Sandy Martinez", note: "Your point about pricing before product-market fit reframed the whole thing for me.", status: "Expires in 5 days" },
  { name: "James Ko", note: "", status: "No response" },
];
function SentList() {
  const [rows, setRows] = useState(sentInit);
  const [confirm, setConfirm] = useState<string | null>(null);
  const [undo, setUndo] = useState<typeof sentInit[number] | null>(null);
  if (!rows.length) return (<div className="py-10 text-center"><b>No requests out yet</b>
    <p className="mx-auto mt-1 max-w-xs text-sm text-ink/60">Connecting works best while the session is still fresh in both your heads.</p><div className="mt-4"><Button>See who you met</Button></div></div>);
  return (<div>
    {undo && <p className="mb-2 flex justify-between rounded-lg bg-page p-3 text-sm">Request to {undo.name} withdrawn.<button className="text-brand" onClick={() => { setRows(r => [...r, undo]); setUndo(null); }}>Undo</button></p>}
    {rows.map(r => <div key={r.name} className="border-t border-border py-3"><div className="flex items-center gap-3"><Avatar name={r.name} />
      <div className="flex-1"><b>{r.name}</b><p className="text-xs text-ink/60">{r.status}</p></div>
      {r.status === "No response" ? <Button>Send again</Button> : <Button variant="ghost" onClick={() => setConfirm(r.name)}>Withdraw</Button>}</div>
      {r.note && <p className="mt-2 rounded-lg bg-page p-3 text-sm">{r.note}</p>}
      {confirm === r.name && <div className="mt-2 rounded-xl border border-border p-3 text-sm">{r.name} is never told you sent this — or that you took it back. <b>You won’t be able to request again for 30 days.</b>
        <div className="mt-2 flex gap-2"><Button variant="ghost" onClick={() => setConfirm(null)}>Keep it</Button><Button onClick={() => { setRows(x => x.filter(y => y.name !== r.name)); setUndo(r); setConfirm(null); }}>Withdraw</Button></div></div>}</div>)}
    <p className="mt-2 text-xs text-ink/50">You’ll only hear back if someone accepts. Requests expire after 30 days.</p></div>);
}
