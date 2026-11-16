import { Card, Chip, Button, ProgramTag, Avatar } from "@/shared/components/ui";
import { sessions, replays } from "@/shared/data/mock";
import { RsvpButton } from "@/shared/components/RsvpModal";
export function StreamsView() {
  const [hero, ...rest] = sessions;
  return (<div className="space-y-5">
    <div className="flex gap-2 overflow-x-auto"><Chip active>All</Chip><Chip>Grow3dge</Chip><Chip>SI Her</Chip><Chip>Well-Being</Chip><Chip>Explorer</Chip><Chip>Following</Chip></div>
    <div className="bg-card-deep rounded-2xl p-8 text-white"><span className="rounded bg-red-500 px-2 py-0.5 text-xs">LIVE NOW</span>
      <h2 className="mt-3 text-3xl font-bold">{hero.title}</h2><p>{hero.host} · zuza.siher.eth</p><div className="mt-4 inline-block rounded-lg bg-white px-4 py-2 text-brand-deep">▶ Watch now</div><p className="mt-3 text-xs">{hero.attending} watching</p></div>
    <Card><h3 className="font-semibold">Your connections are watching</h3><div className="mt-3 flex gap-4">{["Sandy M.", "Rina P.", "Maya C.", "James O."].map(n => <div key={n} className="text-center text-xs"><Avatar name={n} size={48} /><p>{n}</p></div>)}</div></Card>
    <h3 className="font-semibold">Starting soon</h3>
    {rest.map(s => <Card key={s.id} className="flex items-center justify-between"><div><b>{s.title}</b><p className="text-xs">{s.host} · {s.attending} attending</p><ProgramTag program={s.program} /></div><RsvpButton title={s.title} when="Today · 10:00 PM" /></Card>)}
    <h3 className="font-semibold">Popular replays</h3>
    <div className="grid gap-3 md:grid-cols-3">{replays.map(r => <Card key={r.t}><ProgramTag program={r.p} /><p className="font-medium">{r.t}</p><p className="font-mono text-xs">{r.d}</p></Card>)}</div></div>);
}
