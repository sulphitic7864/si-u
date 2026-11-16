import { RsvpButton } from "@/shared/components/RsvpModal";
import { Card, Avatar, ProgramTag } from "@/shared/components/ui";
import { posts, Program } from "@/shared/data/mock";
export function Feed() {
  return (<div className="space-y-4">
    <Card><input placeholder="What are you building, learning, or thinking about?" className="w-full rounded-xl border border-border px-4 py-2 text-sm" /></Card>
    {posts.map(p => <Card key={p.id}>
      <div className="flex items-center gap-3"><Avatar name={p.author} /><div><b>{p.author}</b> <ProgramTag program={p.tag as Program} /><p className="text-xs text-ink/60">{p.meta}</p></div></div>
      <p className="mt-3">{p.body}</p>
      <div className="mt-3 flex items-center justify-between rounded-xl border border-border p-3 text-sm">33 Grow3dge members earned their badges from this session<RsvpButton title="How to Sell B2B Web3" when="Thu Apr 2 · 10:00 PM" label="View Session" /></div>
      <div className="mt-3 flex gap-4 text-sm">{Object.entries(p.reactions).map(([k, v]) => <span key={k}>{k} {v}</span>)}</div>
    </Card>)}</div>);
}
