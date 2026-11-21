import Image from "next/image";
import Link from "next/link";
import { posts, profileSessions } from "@/shared/data/mock";
import { ProfileActions, GuideNudge } from "./ProfileActions";
import { Card, Button } from "@/shared/components/ui";
import { PostCard } from "@/shared/components/PostCard";
import { formatShortDate } from "@/shared/utils/date";
import type { Viewer } from "./types";

const tabs = [
  { id: "posts", label: "Posts", count: "32" },
  { id: "sessions", label: "Sessions", count: "24" },
  { id: "media", label: "Media", count: undefined },
] as const;

export function ProfileView({ handle, tab, viewer = "owner" }: { handle: string; tab: string; viewer?: Viewer }) {
  const activeTab = tab === "sessions" || tab === "media" ? tab : "posts";
  const mediaPosts = posts.filter(post => post.media);

  return (
    <div className="w-full space-y-4">
      <Card className="!overflow-hidden !p-0">
        <div className="relative h-[170px] bg-gradient-to-b from-[#9999ad] via-[#716482] to-[#32145f]">
          {viewer === "owner" && <button type="button" className="absolute bottom-3 right-4 rounded-md bg-black/50 px-3 py-1.5 text-xs text-white">Edit cover</button>}
        </div>
        <div className="px-5 pb-6">
          <div className="relative z-10 -mt-12 flex items-end justify-between gap-3">
            <div className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl border-4 border-white bg-[#f2b1b2] text-3xl font-semibold text-[#4c2146]">K</div>
            <ProfileActions viewer={viewer} />
          </div>
          <h1 className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-2xl font-bold leading-tight">
            Kara Howard
            <span className="text-sm font-normal text-brand">@{handle}</span>
            <span className="rounded border border-brand/40 px-1.5 py-0.5 font-mono text-xs font-medium text-brand">GUIDE</span>
          </h1>
          <p className="mt-5 text-xs text-ink/60">Emerging Tech Adoption Leader · Web3 Connector</p>
          <p className="mt-3 max-w-3xl text-sm leading-5 text-ink/80">
            Crafting thoughtful digital experiences that feel alive. Passionate about human-centered design, interaction systems, and the spaces where technology meets meaning.
          </p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-ink/65">
            <a href="https://si3.space" className="text-brand">si3.space</a><span>Self-Employed</span>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-y-3 border-t border-border/70 pt-3 text-xs sm:grid-cols-4 sm:gap-y-0">
            {[["24", "Sessions"], ["41", "Connections"], ["6", "POAPs"], ["32", "Posts"]].map(([value, label]) => (
              <div key={label} className="flex min-w-0 flex-col items-center gap-0.5 sm:flex-row sm:gap-1.5">
                <b className="text-sm">{value}</b>
                <span className="text-center text-ink/60">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <section className="flex items-center justify-between gap-4 rounded-2xl bg-[#35166e] px-5 py-[19px] text-white">
        <div className="min-w-0">
          <p className="font-mono text-xs tracking-[0.16em] text-white/75">{viewer === "owner" ? "YOUR NEXT SESSION" : "NEXT SESSION"}</p>
          <b className="block truncate text-sm">Leading Without Losing Yourself</b>
          <p className="text-xs text-white/75">{formatShortDate(new Date())} · 6:00 PM PT · 42 attending</p>
        </div>
        {viewer === "owner" && <Button variant="ghost" className="shrink-0 border-0">Manage session</Button>}
      </section>

      {viewer === "owner" && <GuideNudge />}

      <Card className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold">About</h2>
          {viewer === "owner" && <button type="button" className="text-xs text-brand">Edit</button>}
        </div>
        <p className="text-xs leading-5 text-ink/80">
          I&apos;m Kara — I work on getting emerging tech into the hands of people who&apos;ve been left out of it. Most of what I do sits between community building and product: running sessions, connecting people who should know each other, and tuning what happens in a room into something that lasts.
        </p>
        <p className="mb-2 mt-3 font-mono text-xs tracking-[0.14em] text-ink/50">VALUES</p>
        <div className="flex flex-wrap gap-2">
          {["Integrity", "Clarity", "Consistency", "Growth", "Accountability"].map(value => (
            <span key={value} className="rounded-full border border-brand/30 px-3 py-1 text-xs text-brand">{value}</span>
          ))}
        </div>
      </Card>

      <Card className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold">Work &amp; Contributions</h2>
          {viewer === "owner" && <button type="button" className="text-xs text-brand">Edit</button>}
        </div>
        <div className="space-y-3">
          <div className="flex gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border bg-page text-xs font-semibold text-brand">SI3</span>
            <div className="min-w-0">
              <p className="text-xs font-semibold">Founder <span className="ml-1 rounded-full border border-brand/30 px-2 py-0.5 font-mono text-xs font-normal text-brand">EMPLOYMENT</span></p>
              <p className="mt-1 text-xs text-ink/60">SI3 · 2023 — Present</p>
              <p className="mt-1 text-xs leading-4 text-ink/65">Building learning and connection infrastructure for women and non-binary people entering Web3.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border bg-page text-xs font-semibold text-brand">G3</span>
            <div className="min-w-0">
              <p className="text-xs font-semibold">Core Contributor <span className="ml-1 rounded-full border border-brand/30 px-2 py-0.5 font-mono text-xs font-normal text-brand">CONTRIBUTION</span></p>
              <p className="mt-1 text-xs text-ink/60">Grow3dge DAO · 2022 — Present</p>
              <p className="mt-1 text-xs leading-4 text-ink/65">Curriculum design and session hosting across three cohorts.</p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between gap-3 rounded-xl border border-dashed border-brand/30 px-3 py-2.5">
          <div>
            <p className="text-xs font-semibold">Fill this in from LinkedIn</p>
            <p className="mt-0.5 text-xs text-ink/60">On LinkedIn: your profile &gt; More &gt; Save to PDF. Then upload it here.</p>
          </div>
          {viewer === "owner" && <Button variant="ghost" density="compact" className="shrink-0">Upload PDF</Button>}
        </div>
      </Card>

      <Card className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <div><h2 className="text-sm font-semibold">Sessions</h2><p className="text-xs text-ink/60">18 led · 24 attended</p></div>
          <Link href="?tab=sessions" className="text-xs text-brand">View all</Link>
        </div>
        <div className="mb-3 flex items-center gap-3 rounded-xl border border-border bg-page/70 px-3 py-2">
          <div className="flex -space-x-1.5" aria-hidden="true">
            {Array.from({ length: 6 }, (_, index) => <span key={index} className="h-5 w-5 rounded-full border-2 border-white bg-gradient-to-br from-[#d59bf4] to-[#b84ab9]" />)}
          </div>
          <div><p className="text-xs font-semibold">6 POAPs · 2 certifications</p><p className="text-xs text-ink/60">Attendance badges, minted to you when a session ends.</p></div>
        </div>
        {(activeTab === "sessions" ? profileSessions : profileSessions.slice(0, 2)).map(session => (
          <div key={session.title} className="flex items-center justify-between gap-3 border-t border-border/70 py-2.5">
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold">{session.title} <span className="rounded-full border border-brand/30 px-1.5 py-0.5 font-mono text-xs font-normal text-brand">{session.role}</span></p>
              <p className="mt-1 text-xs text-ink/60">{session.meta}</p>
            </div>
            <span className="shrink-0 text-xs text-brand">POAP earned</span>
          </div>
        ))}
      </Card>

      <nav aria-label="Profile content" className="flex items-center gap-1 rounded-2xl border border-border bg-surface p-2">
        {tabs.map(({ id, label, count }) => (
          <Link key={id} href={`?tab=${id}`} className={`rounded-lg px-3 py-1.5 text-xs ${activeTab === id ? "bg-page text-brand-deep" : "text-ink/65"}`}>
            {label}{count && <span className="ml-1.5 rounded-full bg-page px-1.5 py-0.5 text-xs">{count}</span>}
          </Link>
        ))}
      </nav>

      {activeTab === "posts" && posts.slice(0, 1).map(post => <PostCard key={post.id} {...post} />)}
      {activeTab === "sessions" && <Card><h2 className="text-sm font-semibold">All sessions</h2><p className="mt-2 text-xs text-ink/60">You&apos;ve led 18 sessions and attended 24.</p></Card>}
      {activeTab === "media" && (
        <Card className="grid grid-cols-2 gap-3 p-3">
          {mediaPosts.map(post => <div key={post.id} className="relative aspect-square overflow-hidden rounded-xl"><Image src="/assets/image1946.png" alt="Profile post" fill sizes="(max-width: 640px) 50vw, 400px" className="object-cover" /></div>)}
        </Card>
      )}
    </div>
  );
}
