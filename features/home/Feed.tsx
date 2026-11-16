import { PostCard } from "@/shared/components/PostCard";
import { RsvpButton } from "@/shared/components/RsvpModal";
import { Card } from "@/shared/components/ui";
import { SessionRow } from "@/shared/components/widgets";
import { MediaGrid } from "./MediaGrid";
import { posts, Program } from "@/shared/data/mock";
export function Feed() {
  const p = posts[0]; const base = { author: p.author, tag: p.tag as Program, meta: p.meta, reactions: p.reactions };
  return (<div className="space-y-4">
    <Card><input placeholder="What are you building, learning, or thinking about?" className="w-full rounded-xl border border-border px-4 py-2 text-sm" /></Card>
    <PostCard {...base} body={p.body}>
      <div className="mt-3 rounded-xl border border-border p-3"><SessionRow title="33 Grow3dge members earned their badges" meta="How to Sell B2B in Web3" action={<RsvpButton title="How to Sell B2B Web3" when="Thu Apr 2 · 10:00 PM" label="View Session" />} /></div></PostCard>
    <PostCard {...base} body="Gallery recap from the session."><MediaGrid count={5} /></PostCard>
    <PostCard {...base} body="Two quick shots."><MediaGrid count={2} /></PostCard></div>);
}
