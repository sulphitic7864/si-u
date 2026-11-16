import { Card, Chip, Button, ProgramTag } from "@/shared/components/ui";
import { learnToday, replays, summaries } from "@/shared/data/mock";
import { RsvpButton } from "@/shared/components/RsvpModal";
export function LearnView() {
  return (<div className="space-y-5">
    <div className="flex gap-2 overflow-x-auto"><Chip active>All</Chip><Chip>Explorer</Chip><Chip>Grow3dge</Chip><Chip>Well-Being</Chip><Chip>SI Her</Chip></div>
    <div className="bg-card-deep rounded-2xl p-6 text-white"><p className="font-mono text-[10px] tracking-widest">PICK UP WHERE YOU LEFT OFF</p>
      <b className="text-lg">Advanced Community Management: Scaling Trust</b><div className="my-2 h-1.5 rounded bg-white/20"><div className="h-full w-[70%] rounded bg-white" /></div><p className="text-xs">14 min left · 70%</p></div>
    <h3 className="font-mono text-xs tracking-widest">TODAY · WED 15 JAN</h3>
    {learnToday.map(s => <Card key={s.title} className="flex items-center justify-between"><div><p className="font-mono text-xs">{s.time}</p><b>{s.title}</b><p className="text-xs"><ProgramTag program={s.program} /> · {s.host} · {s.n} attending</p></div>
      {s.state === "live" ? <Button>Join now</Button> : s.state === "attending" ? <span className="text-sm text-brand">✓ Attending</span> : <RsvpButton title={s.title} when={s.time} />}</Card>)}
    <h3 className="font-mono text-xs tracking-widest">REPLAYS</h3>
    <div className="grid gap-4 md:grid-cols-3">{replays.map(r => <Card key={r.t}><ProgramTag program={r.p} /><b className="block">{r.t}</b><div className="mt-3"><Button variant="ghost">Watch replay</Button></div></Card>)}</div>
    <h3 className="font-mono text-xs tracking-widest">SUMMARIES</h3>
    <div className="grid gap-4 md:grid-cols-2">{summaries.map(s => <Card key={s.t}><ProgramTag program={s.p} /><b className="block">{s.t}</b><ul className="my-2 list-disc pl-5 text-sm">{s.pts.map(p => <li key={p}>{p}</li>)}</ul><Button variant="ghost">Read summary</Button></Card>)}</div></div>);
}
