"use client";
import { useState, type ReactNode } from "react";
import { Card, Button, ProgramTag } from "@/shared/components/ui";
import { learnToday, learnTomorrow, replays, summaries, type LearnSession, type Program } from "@/shared/data/mock";
import { addCalendarDays, formatShortDate } from "@/shared/utils/date";
import { RsvpButton } from "@/shared/components/RsvpModal";

const programs: Array<Program | "All"> = ["All", "Explorer", "Grow3dge", "Well-Being", "Si Her"];
const replayGradients = [
  "from-[#6528ae] via-[#3e1a79] to-[#2d195d]",
  "from-[#5cc1c6] via-[#357d9a] to-[#244b82]",
  "from-[#b7a0da] via-[#6e6094] to-[#39316d]",
];
const summaryTimes = ["2 MIN READ", "3 MIN READ", "3 MIN READ"];

function SessionCard({ session }: { session: LearnSession }) {
  const gradient = session.program === "Si Her"
    ? "from-[#ef4fa2] to-[#58238c]"
    : session.program === "Explorer"
      ? "from-[#7b83cc] to-[#302781]"
      : session.program === "Well-Being"
        ? "from-[#4bb9bd] to-[#236d94]"
        : "from-[#7753dc] to-[#341b79]";

  return (
    <article className={`flex min-h-[264px] flex-col justify-between rounded-xl border bg-white p-4 sm:min-h-0 sm:flex-row sm:items-center sm:p-3 ${session.state === "live" ? "border-[#f4c2cf]" : "border-border"}`}>
      <div className="flex items-center gap-3">
        <div className="hidden w-[68px] shrink-0 flex-col justify-center sm:flex">
          <p className="font-mono text-xs font-medium">{session.time}</p>
          <p className="mt-1 text-xs text-ink/55">{session.duration}</p>
        </div>
        <div aria-hidden="true" className={`hidden h-[58px] w-[68px] shrink-0 rounded-lg bg-gradient-to-br ${gradient} sm:block`} />
        <div className="min-w-0 flex-1">
          <p className="mb-6 text-xs text-ink/60 sm:hidden sm:mb-1">{session.time} <span className="px-1">·</span> {session.duration}</p>
          <h3 className="text-base font-semibold leading-5 sm:text-sm">{session.title}</h3>
          <p className="mt-3 text-base leading-6 text-ink/65 sm:mt-1 sm:text-xs sm:leading-4">{session.description}</p>
          <p className="mt-2 flex flex-wrap items-center gap-1 text-xs sm:mt-1.5">
            {session.state === "live" && <span className="rounded-full bg-rose-100 px-2 py-0.5 font-semibold tracking-wide text-rose-600">● LIVE NOW</span>}
            <ProgramTag program={session.program} /><span className="text-ink/40">·</span><span className="text-ink/60">{session.host}</span>
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/70 pt-3 sm:ml-0 sm:mt-0 sm:w-auto sm:justify-end sm:border-0 sm:pt-0">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex -space-x-2" aria-hidden="true">
            <span className="h-7 w-7 rounded-full border-2 border-white bg-[#6b48c7] sm:h-5 sm:w-5" />
            <span className="h-7 w-7 rounded-full border-2 border-white bg-[#ce52a8] sm:h-5 sm:w-5" />
            <span className="h-7 w-7 rounded-full border-2 border-white bg-[#49b6bd] sm:h-5 sm:w-5" />
          </div>
          <span className="whitespace-nowrap font-mono text-xs text-ink/55">{session.n} attending</span>
        </div>
        {session.state === "live"
          ? <Button className="inline-flex h-[52px] w-[140px] shrink-0 items-center justify-center !bg-[#252278] text-sm sm:h-auto sm:w-auto sm:px-4 sm:py-2 sm:text-xs">Join now</Button>
          : session.state === "attending"
            ? <span className="shrink-0 rounded-lg border border-brand/20 bg-brand/5 px-3 py-2 text-xs font-medium text-brand">✓ Attending</span>
            : <RsvpButton title={session.title} when={`${session.time} · ${session.duration}`} />}
      </div>
    </article>
  );
}

function DateDivider({ children }: { children: ReactNode }) {
  return <div className="flex items-center gap-3"><h2 className="whitespace-nowrap font-mono text-xs tracking-[0.12em] text-ink/75 sm:uppercase">{children}</h2><span className="h-px flex-1 bg-border" /></div>;
}

function SectionHeading({ title, action }: { title: string; action?: string }) {
  return <div className="mb-3 flex items-center justify-between"><h2 className="font-mono text-xs font-semibold tracking-[0.16em] text-ink/65">{title}</h2>{action && <button type="button" className="text-xs text-brand">{action}</button>}</div>;
}

export function LearnView() {
  const [selectedProgram, setSelectedProgram] = useState<Program | "All">("All");
  const today = new Date();
  const tomorrow = addCalendarDays(today, 1);
  const visibleToday = learnToday.filter(session => selectedProgram === "All" || session.program === selectedProgram);
  const visibleTomorrow = learnTomorrow.filter(session => selectedProgram === "All" || session.program === selectedProgram);

  return (
    <div className="space-y-10 pt-6 sm:space-y-5 sm:pt-0">
      <header className="space-y-1">
        <h1 className="text-xl font-semibold text-brand-deep">Learn</h1>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
          <p className="max-w-2xl text-sm text-ink/65">Sessions led by people in your programs — live, on replay, or summarised in three minutes.</p>
          <p className="shrink-0 whitespace-nowrap font-mono text-xs text-ink/55">6 sessions coming up</p>
        </div>
      </header>

      <div className="-mx-4 overflow-x-auto px-4 pb-1 scrollbar-hide sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0">
        <div className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
          {programs.map(program => (
            <button key={program} type="button" onClick={() => setSelectedProgram(program)} aria-pressed={selectedProgram === program}
              className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-colors sm:px-4 sm:py-2 sm:text-sm ${selectedProgram === program ? "border-brand-deep bg-brand-deep text-white" : "border-border bg-white text-ink/65 hover:border-brand/40"}`}>
              {program === "Si Her" ? "SI Her" : program}
            </button>
          ))}
        </div>
      </div>

      <section className="bg-card-deep rounded-2xl p-5 text-white sm:p-5">
        <div className="flex min-h-[242px] flex-col gap-4 sm:grid sm:min-h-0 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div>
            <p className="font-mono text-xs tracking-[0.16em]">PICK UP WHERE YOU LEFT OFF</p>
            <h2 className="mt-1 max-w-[270px] text-lg font-semibold leading-6 sm:max-w-none sm:text-base">Advanced Community Management: Scaling Trust</h2>
            <p className="mt-3 font-mono text-xs text-white/80 sm:mt-1 sm:hidden">14 min left</p>
            <div className="mt-6 flex items-center gap-2 sm:mt-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/25"><div className="h-full w-[70%] rounded-full bg-white" /></div>
              <span className="font-mono text-xs">70%</span>
            </div>
            <p className="mt-1 hidden font-mono text-xs text-white/80 sm:block">14 min left</p>
          </div>
          <Button variant="ghost" className="mt-auto flex w-full items-center justify-center gap-2 border-0 !bg-white !text-brand-deep py-4 text-sm sm:mt-0 sm:w-auto sm:min-w-[180px] sm:py-2 sm:text-sm">
            Continue watching
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><circle cx="10" cy="10" r="10" /><path d="m8 6 6 4-6 4V6Z" fill="white" /></svg>
          </Button>
        </div>
      </section>

      {visibleToday.length > 0 && <section className="space-y-4 sm:space-y-3">
        <DateDivider>Today · {formatShortDate(today)}</DateDivider>
        <div className="space-y-2.5 pt-3 sm:space-y-3 sm:pt-0">{visibleToday.map(session => <SessionCard key={session.title} session={session} />)}</div>
      </section>}

      {visibleTomorrow.length > 0 && <section className="space-y-4 sm:space-y-3">
        <DateDivider>Tomorrow · {formatShortDate(tomorrow)}</DateDivider>
        <div className="space-y-2.5 pt-3 sm:space-y-3 sm:pt-0">{visibleTomorrow.map(session => <SessionCard key={session.title} session={session} />)}</div>
      </section>}

      <section className="flex flex-wrap items-center justify-between gap-3 py-1">
        <div><h2 className="font-mono text-xs font-semibold tracking-[0.14em]">COMING UP IN YOUR PROGRAMS</h2><p className="mt-1 text-xs text-ink/50">2 more events</p></div>
        <Button variant="ghost" density="compact">Open full schedule →</Button>
      </section>

      <section>
        <SectionHeading title="REPLAYS" action="View all →" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {replays.map((replay, index) => (
            <Card key={replay.t} className="p-3">
              <div className={`relative flex aspect-[1.65] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${replayGradients[index % replayGradients.length]}`}>
                <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 font-mono text-xs uppercase text-brand-deep">{replay.p}</span>
                <button type="button" aria-label={`Play ${replay.t}`} className="grid h-9 w-9 place-items-center rounded-full bg-white text-brand-deep shadow">
                  <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path d="m6 3.8 9.2 5.3a1 1 0 0 1 0 1.8L6 16.2a1 1 0 0 1-1.5-.9V4.7a1 1 0 0 1 1.5-.9Z" /></svg>
                </button>
                <span className="absolute bottom-2 right-2 rounded bg-black/55 px-1.5 py-0.5 font-mono text-xs text-white">{replay.d}</span>
              </div>
              <h3 className="mt-2 text-xs font-semibold leading-4">{replay.t}</h3>
              <p className="mt-1 text-xs text-ink/55">24 watched · 8 comments</p>
              <Button variant="ghost" density="compact" className="mt-2 w-full">Watch replay</Button>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading title="SUMMARIES" action="View all →" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {summaries.map((summary, index) => (
            <Card key={summary.t} className="flex flex-col p-3">
              <div className="flex items-center justify-between gap-2">
                <ProgramTag program={summary.p} />
                <span className="font-mono text-xs text-ink/45">{summaryTimes[index]}</span>
              </div>
              <h3 className="mt-2 text-xs font-semibold leading-4">{summary.t}</h3>
              <ul className="my-2 flex-1 space-y-1 text-xs leading-4 text-ink/65">{summary.pts.map(point => <li key={point}>• {point}</li>)}</ul>
              <Button variant="ghost" density="compact" className="w-full">Read summary</Button>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
