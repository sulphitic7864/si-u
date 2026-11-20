"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, Button, Card, ProgramTag } from "@/shared/components/ui";
import {
  liveNowStreams,
  sessions,
  streamReplays,
  streamWatchers,
  upcomingStreams,
  type Program,
} from "@/shared/data/mock";
import { RsvpButton } from "@/shared/components/RsvpModal";

const filters = ["All", "Grow3dge", "Si Her", "Well-Being", "Explorer", "Following"] as const;
type StreamFilter = (typeof filters)[number];
const upcomingProgramStyles: Record<Program, { badge: string; dot: string }> = {
  Grow3dge: { badge: "bg-[#f0eafa]", dot: "bg-[#7653c6]" },
  "Si Her": { badge: "bg-[#fce9f4]", dot: "bg-[#ca54a0]" },
  "Well-Being": { badge: "bg-[#e7f4f5]", dot: "bg-[#53aeb5]" },
  Explorer: { badge: "bg-[#efedf7]", dot: "bg-[#827aaf]" },
};

export function StreamsView() {
  const [filter, setFilter] = useState<StreamFilter>("All");
  const [showAllLive, setShowAllLive] = useState(false);
  const hero = sessions[0];
  const matchesFilter = (stream: { program: Program; following: boolean }) =>
    filter === "All" || (filter === "Following" ? stream.following : stream.program === filter);
  const filteredLiveStreams = liveNowStreams.filter(matchesFilter);
  const visibleLiveStreams = showAllLive ? filteredLiveStreams : filteredLiveStreams.slice(0, 3);
  const filteredUpcomingStreams = upcomingStreams.filter(matchesFilter);
  const filteredReplays = streamReplays.filter(matchesFilter);

  return (
    <div className="space-y-5">
      <div className="-mx-4 overflow-x-auto px-4 pb-1 scrollbar-hide sm:mx-0 sm:overflow-visible sm:px-0">
        <div className="flex w-max min-w-full gap-2 sm:w-auto sm:min-w-0">
          {filters.map(value => (
            <button key={value} type="button" aria-pressed={filter === value} onClick={() => {
              setFilter(value);
              setShowAllLive(false);
            }} className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:py-2 sm:text-sm ${filter === value ? "border-brand-deep bg-brand-deep text-white" : "border-border bg-white text-[#625a91] hover:border-brand/40"}`}>
              {value}
            </button>
          ))}
        </div>
      </div>

      <section id="featured-stream" className="relative flex min-h-[300px] flex-col justify-end overflow-hidden rounded-[26px] px-5 pb-6 pt-6 text-white sm:min-h-[390px] sm:px-12 sm:pb-11 sm:pt-24"
        style={{ background: "linear-gradient(112deg, #1a1244 0%, #34185f 43%, #913586 100%)" }}>
        <div aria-hidden="true" className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#e05baf]/25 to-transparent" />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e74b58] px-3 py-1.5 font-mono text-xs font-semibold tracking-wide">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-white" /> LIVE NOW
          </span>
          <h2 className="mt-5 max-w-2xl text-[30px] font-medium leading-tight sm:text-[38px]">{hero.title}</h2>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Avatar name={hero.host} size={38} src="/assets/icons/av.png" />
            <span className="text-sm font-semibold sm:text-base">{hero.host}</span>
            <span className="text-sm text-white/65 sm:text-base">zuza.siher.eth</span>
            <span className="rounded-full bg-white/15 px-3.5 py-1.5 font-mono text-xs font-semibold tracking-wide text-white">SI HER</span>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-5">
            <Button variant="ghost" className="flex items-center gap-3 !rounded-xl !border-0 !bg-white !px-6 !py-3 !text-sm !font-semibold !text-brand-deep sm:!text-base">
              <span aria-hidden="true" className="text-sm">▶</span> Watch now
            </Button>
            <div className="flex items-center gap-3 text-xs leading-4 text-white/90 sm:text-sm">
              <div aria-hidden="true" className="flex shrink-0 -space-x-2.5">
                {streamWatchers.slice(0, 3).map(watcher => (
                  <span key={watcher.name} className="rounded-full border-2 border-white/80">
                    <Avatar name={watcher.name} size={32} src={watcher.avatar} />
                  </span>
                ))}
                <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-white font-semibold text-brand-deep">+29</span>
              </div>
              <span className="max-w-[205px] sm:max-w-none sm:whitespace-nowrap">Sandy, Rina and 29 others are watching</span>
            </div>
          </div>
        </div>
      </section>

      <Card className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-ink sm:text-base">Your connections are watching</h2>
          <Link href="/connections" className="shrink-0 text-xs font-medium text-brand hover:text-brand-deep">See all →</Link>
        </div>
        <div className="mt-4 flex gap-4 overflow-x-auto px-1 pb-1 pt-2">
          {streamWatchers.map(watcher => (
            <Link key={watcher.name} href="/connections" className="flex w-14 shrink-0 flex-col items-center text-center">
              <span className="rounded-full ring-2 ring-[#e65a68] ring-offset-2 ring-offset-white">
                <Avatar name={watcher.name} size={36} src={watcher.avatar} />
              </span>
              <span className="mt-2 w-full truncate text-xs font-medium text-ink">{watcher.name}</span>
              <span className="mt-0.5 w-full truncate text-xs text-ink/50">{watcher.program}</span>
            </Link>
          ))}
        </div>
      </Card>

      <section className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#e74b58]" />
            <h2 className="text-base font-semibold text-ink sm:text-xl">Also live now</h2>
          </div>
          <span className="font-mono text-xs font-medium tracking-widest text-ink/60">
            {Math.min(3, filteredLiveStreams.length)} OF {filteredLiveStreams.length}
          </span>
        </div>
        {visibleLiveStreams.length ? (
          <div id="live-now-list" className="grid auto-cols-[76%] grid-flow-col gap-3 overflow-x-auto pb-1 sm:grid-cols-2 sm:grid-flow-row sm:overflow-visible lg:grid-cols-3">
            {visibleLiveStreams.map(stream => (
              <Card key={stream.title} className="!overflow-hidden !p-0">
                <div className="relative flex h-[172px] flex-col justify-between p-3 text-white" style={{ background: stream.gradient }}>
                  <div className="flex items-start justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e74b58] px-3 py-1 text-xs font-bold tracking-[0.16em]">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-white" /> LIVE
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#241747]/80 px-2.5 py-1 text-xs font-medium">
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
                        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      {stream.watching}
                    </span>
                  </div>
                  {stream.connectionsWatching.length > 0 && (
                    <div className="flex items-center gap-2 text-xs">
                      <div aria-hidden="true" className="flex -space-x-1.5">
                        {stream.connectionsWatching.map((initial, index) => (
                          <span key={`${initial}-${index}`} className="grid h-7 w-7 place-items-center rounded-full border border-white/80 bg-white/10 text-xs">
                            {initial}
                          </span>
                        ))}
                      </div>
                      <span>{stream.connectionsWatching.length} {stream.connectionsWatching.length === 1 ? "connection" : "connections"}</span>
                    </div>
                  )}
                </div>
                <div className="flex min-h-[204px] flex-col p-5">
                  <h3 className="line-clamp-2 min-h-12 text-lg font-semibold leading-6 text-ink sm:text-xl">{stream.title}</h3>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-sm font-semibold text-white" style={{ background: stream.gradient }}>
                      {stream.host[0]}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">{stream.host}</p>
                      <p className="truncate text-sm text-ink/55">{stream.handle}</p>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-4">
                    <ProgramTag program={stream.program} />
                    <button type="button" className="rounded-xl bg-brand-deep px-5 py-2 text-base font-semibold text-white">Watch</button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="py-6 text-center text-xs text-ink/55">No live streams match this filter.</Card>
        )}
        {filteredLiveStreams.length > 3 && (
          <button type="button" aria-expanded={showAllLive} aria-controls="live-now-list" onClick={() => setShowAllLive(value => !value)}
            className="w-full rounded-2xl border border-border bg-white py-4 text-base font-semibold text-brand hover:bg-[#faf8fe]">
            {showAllLive ? "Show fewer live streams" : `Show all ${filteredLiveStreams.length} live`}
            <span aria-hidden="true" className="ml-1">{showAllLive ? "⌃" : "⌄"}</span>
          </button>
        )}
      </section>

      <section>
        <div aria-label="Current time" className="flex items-center gap-4">
          <span aria-hidden="true" className="h-px flex-1 bg-[#d0ccd8]" />
          <span className="inline-flex items-center gap-2 rounded-full border border-[#f3c8ce] bg-[#fff0f2] px-4 py-2 font-mono text-xs font-semibold tracking-[0.16em] text-[#dc4655]">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#e74b58]" />
            NOW <span aria-hidden="true">·</span> 10:24 AM
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-[#d0ccd8]" />
        </div>
        <div className="mt-12 space-y-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-ink sm:text-2xl">Starting soon</h2>
            <Link href="/learn" className="shrink-0 text-sm font-semibold text-brand hover:text-brand-deep sm:text-base">Full schedule →</Link>
          </div>
          {filteredUpcomingStreams.length ? (
            <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white">
              {filteredUpcomingStreams.map(stream => (
                <article key={stream.title} className="grid grid-cols-[76px_8px_minmax(0,1fr)_auto] items-center gap-2 px-3 py-4 sm:grid-cols-[120px_10px_minmax(0,1fr)_auto_auto] sm:gap-4 sm:px-5">
                  <div>
                    <p className="font-mono text-sm font-semibold text-ink sm:text-lg">{stream.time}</p>
                    <p className="mt-1 font-mono text-xs text-ink/45 sm:text-sm">{stream.day}</p>
                  </div>
                  <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${upcomingProgramStyles[stream.program].dot}`} />
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-ink sm:text-xl">{stream.title}</h3>
                    <p className="mt-1 truncate text-xs text-ink/60 sm:text-base">{stream.host} · {stream.attending} attending</p>
                  </div>
                  <span className={`hidden rounded-full px-3 py-2 sm:inline-flex ${upcomingProgramStyles[stream.program].badge}`}>
                    <ProgramTag program={stream.program} />
                  </span>
                  <RsvpButton
                    title={stream.title}
                    when={`${stream.day} · ${stream.time}`}
                    label="Attend"
                    variant="ghost"
                    className="!rounded-xl !border-border !bg-white !px-3 !py-1.5 !text-sm !text-ink sm:!px-5 sm:!py-2.5 sm:!text-base"
                  />
                </article>
              ))}
            </div>
          ) : (
            <Card className="py-6 text-center text-xs text-ink/55">No upcoming streams match this filter.</Card>
          )}
        </div>
      </section>

      <section id="popular-replays" className="mx-auto max-w-[1016px] space-y-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-ink sm:text-2xl">Popular replays</h2>
          <Link href="/learn" className="shrink-0 text-sm font-semibold text-brand hover:text-brand-deep sm:text-base">See all replays →</Link>
        </div>
        {filteredReplays.length ? (
          <div className="grid auto-cols-[82%] grid-flow-col gap-6 overflow-x-auto pb-1 sm:grid-cols-2 sm:grid-flow-row sm:overflow-visible lg:grid-cols-4">
            {filteredReplays.map(replay => (
              <Card key={replay.title} className="!overflow-hidden !p-0">
                <div className="relative h-[150px] text-white" style={{ background: replay.gradient }}>
                  <span className="absolute bottom-4 right-3 rounded-xl bg-[#241747]/85 px-3 py-1 font-mono text-sm font-medium">{replay.duration}</span>
                </div>
                <div className="flex min-h-[125px] flex-col p-[18px]">
                  <h3 className="line-clamp-3 text-lg font-semibold leading-[26px] text-ink">{replay.title}</h3>
                  <p className="mt-auto line-clamp-2 pt-2 font-mono text-sm leading-5 text-ink/50">{replay.host} · {replay.watched} watched</p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="py-6 text-center text-xs text-ink/55">No replays match this filter.</Card>
        )}
      </section>
    </div>
  );
}
