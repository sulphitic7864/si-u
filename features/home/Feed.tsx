import Image from "next/image";
import { PostCard } from "@/shared/components/PostCard";
import { RsvpButton } from "@/shared/components/RsvpModal";
import { Avatar, Card } from "@/shared/components/ui";
import { MediaGrid } from "./MediaGrid";
import { posts } from "@/shared/data/mock";
export function Feed() {
  return (<div className="space-y-4">
    <Card className="p-3">
      <div className="flex items-center gap-3">
        <Avatar name="Julienne Cho" size={40} shape="rounded" src="/assets/Ava.png" />
        <input aria-label="Create a post" placeholder="Share an update…" className="min-w-0 flex-1 rounded-xl border border-border bg-page/50 px-4 py-3 text-sm placeholder:text-ink/45 focus:border-brand focus:outline-none" />
      </div>
    </Card>
    {posts.map(post => <PostCard key={post.id} author={post.author} avatar={post.avatar} tag={post.tag} meta={post.meta} body={post.body} reactions={post.reactions}>
      {post.id === 1
        ? <div className="mt-4 flex flex-col gap-3 rounded-xl border border-border bg-page/60 p-3 sm:flex-row sm:items-center">
          <div className="flex min-w-0 items-center gap-3 sm:flex-1">
            <div className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-lg bg-gradient-to-br from-brand-deep to-brand">
              <Image src="/assets/badge2.png" alt="Grow3dge badge" fill sizes="55px" className="scale-125 object-contain" />
            </div>
            <p className="min-w-0 flex-1 text-sm text-brand-deep">33 Grow3dge Members earned their badges from this session</p>
          </div>
          <RsvpButton title="How to Sell B2B in Web3" when="Thu Apr 2 · 10:00 PM" label="View Session" className="w-full sm:w-auto sm:shrink-0" />
        </div>
        : post.media && <MediaGrid count={post.mediaCount ?? 1} variant={post.media} />}
    </PostCard>)}
  </div>);
}
