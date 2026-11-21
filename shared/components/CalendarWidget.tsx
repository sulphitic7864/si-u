"use client";
import { useState } from "react";
import { sessions } from "@/shared/data/mock";
import { addCalendarDays as addDays } from "@/shared/utils/date";
import { Button } from "./ui";
import { RsvpButton } from "./RsvpModal";

const weekdays = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];
const programs = ["All", "Grow3dge", "Well-Being", "Explorer", "Si Her"] as const;
type ProgramFilter = typeof programs[number];

function startOfWeek(date: Date) {
  return addDays(date, -date.getDay());
}

function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function isSameDay(first: Date, second: Date) {
  return dateKey(first) === dateKey(second);
}

function ordinal(day: number) {
  const remainder = day % 100;
  if (remainder >= 11 && remainder <= 13) return `${day}th`;
  switch (day % 10) {
    case 1: return `${day}st`;
    case 2: return `${day}nd`;
    case 3: return `${day}rd`;
    default: return `${day}th`;
  }
}

function formatSelectedDate(date: Date, today: Date) {
  if (isSameDay(date, today)) return `Today, ${ordinal(date.getDate())} ${date.toLocaleDateString("en-US", { month: "long", year: "numeric" })}`;
  return date.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

function sessionDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function sessionWhen(date: string, time: string) {
  const parsed = sessionDate(date);
  return `${parsed.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })} · ${time}`;
}

function monthDays(date: Date) {
  const first = new Date(date.getFullYear(), date.getMonth(), 1);
  const dayCount = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const count = Math.ceil((first.getDay() + dayCount) / 7) * 7;
  return Array.from({ length: count }, (_, index) => addDays(startOfWeek(first), index));
}

function CalendarControls({ onPrevious, onNext, previousLabel, nextLabel }: {
  onPrevious: () => void;
  onNext: () => void;
  previousLabel: string;
  nextLabel: string;
}) {
  return <div className="flex items-center gap-1 text-explorer">
    <button type="button" aria-label={previousLabel} onClick={onPrevious} className="grid h-6 w-6 place-items-center rounded hover:bg-page">
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m15 18-6-6 6-6" /></svg>
    </button>
    <button type="button" aria-label={nextLabel} onClick={onNext} className="grid h-6 w-6 place-items-center rounded hover:bg-page">
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m9 18 6-6-6-6" /></svg>
    </button>
  </div>;
}

export function CalendarWidget() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [month, setMonth] = useState(() => new Date());
  const [expanded, setExpanded] = useState(false);
  const [program, setProgram] = useState<ProgramFilter>("All");
  const week = Array.from({ length: 7 }, (_, index) => addDays(startOfWeek(selectedDate), index));
  const weekEvents = sessions.filter(session => {
    const date = sessionDate(session.date);
    return date >= week[0] && date <= week[6];
  });
  const monthCalendarDays = monthDays(month);
  const modalEvents = weekEvents.filter(session => program === "All" || session.program === program);
  const liveCount = weekEvents.filter(session => session.live).length;

  const selectDate = (date: Date) => {
    setSelectedDate(date);
    setMonth(date);
  };
  const changeWeek = (amount: number) => setSelectedDate(date => addDays(date, amount * 7));
  const changeMonth = (amount: number) => setMonth(date => new Date(date.getFullYear(), date.getMonth() + amount, 1));

  return (<>
    <div className="overflow-hidden rounded-2xl border border-border bg-white">
      <div className="p-3">
        <div className="mb-3 flex items-center justify-between gap-1">
          <h2 className="whitespace-nowrap text-xs font-semibold">{formatSelectedDate(selectedDate, today)}</h2>
          <div className="flex items-center gap-1">
            <button type="button" aria-label="Expand calendar" onClick={() => { setMonth(selectedDate); setExpanded(true); }} className="grid h-6 w-6 place-items-center rounded text-explorer hover:bg-page">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M14 4h6v6M20 4l-7 7M10 20H4v-6M4 20l7-7" /></svg>
            </button>
            <CalendarControls onPrevious={() => changeWeek(-1)} onNext={() => changeWeek(1)} previousLabel="Previous week" nextLabel="Next week" />
          </div>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center">
          {weekdays.map(day => <span key={day} className="py-1 text-xs text-ink/50">{day}</span>)}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1 text-center">
          {week.map(date => {
            const selected = isSameDay(selectedDate, date);
            const hasSessions = sessions.some(session => session.date === dateKey(date));
            const muted = date.getMonth() !== selectedDate.getMonth();
            return <button key={dateKey(date)} type="button" aria-label={date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })} aria-pressed={selected} onClick={() => selectDate(date)}
              className={`flex h-8 flex-col items-center justify-center rounded-md text-xs ${selected ? "bg-brand-deep font-semibold text-white" : muted ? "text-ink/35" : "text-ink/75 hover:bg-page"}`}>
              <span>{date.getDate()}</span>
              <span aria-hidden="true" className={`h-1 w-1 rounded-full ${hasSessions ? selected ? "bg-white" : "bg-brand" : "bg-transparent"}`} />
            </button>;
          })}
        </div>
      </div>
      <div className="border-t border-border px-3">
        {weekEvents.length ? weekEvents.map((session, index) => <div key={session.id} className={`relative flex items-center gap-2.5 py-3 ${index > 0 ? "border-t border-border/70" : ""}`}>
          <span className={`absolute inset-y-3 left-0 w-1 rounded-full ${session.live ? "bg-rose-500" : "bg-fuchsia-300"}`} />
          <div className="min-w-0 flex-1 pl-2">
            <p className="truncate text-xs font-medium">{session.title}</p>
            <p className="mt-1 flex items-center gap-1.5 whitespace-nowrap text-xs text-ink/60">
              {session.live ? <span className="rounded bg-rose-500 px-1.5 py-0.5 font-semibold text-white">LIVE</span> : <span>{session.time}</span>}
              <span>·</span><span className="truncate">{session.host}</span>
            </p>
          </div>
          {session.live
            ? <Button density="compact">Watch</Button>
            : <RsvpButton title={session.title} when={sessionWhen(session.date, session.time)} density="compact" />}
        </div>) : <p className="py-4 text-center text-xs text-ink/55">No sessions this week</p>}
        <button type="button" onClick={() => { setMonth(selectedDate); setExpanded(true); }} className="w-full pb-3 pt-1 text-xs text-brand">Load more...</button>
      </div>
    </div>

    {expanded && <div className="fixed inset-0 z-40 grid place-items-center bg-black/40 p-4" role="dialog" aria-modal="true" aria-label="Expanded calendar">
      <div className="relative grid w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-xl md:grid-cols-[230px_1fr]">
        <section className="border-b border-border p-4 md:border-b-0 md:border-r">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold">{month.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</h2>
            <CalendarControls onPrevious={() => changeMonth(-1)} onNext={() => changeMonth(1)} previousLabel="Previous month" nextLabel="Next month" />
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {weekdays.map(day => <span key={day} className="py-1 text-xs text-ink/50">{day}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-1 text-center">
            {monthCalendarDays.map(date => {
              const selected = isSameDay(selectedDate, date);
              const inMonth = date.getMonth() === month.getMonth();
              const hasSessions = sessions.some(session => session.date === dateKey(date));
              return <button key={dateKey(date)} type="button" aria-pressed={selected} onClick={() => selectDate(date)}
                className={`flex h-7 flex-col items-center justify-center rounded-md text-xs ${selected ? "bg-brand-deep font-semibold text-white" : inMonth ? "text-ink/75 hover:bg-page" : "text-ink/30"}`}>
                <span>{date.getDate()}</span>
                <span aria-hidden="true" className={`h-1 w-1 rounded-full ${hasSessions ? selected ? "bg-white" : "bg-brand" : "bg-transparent"}`} />
              </button>;
            })}
          </div>
          <div className="mt-5 flex flex-wrap gap-1.5 border-t border-border pt-4">
            {programs.map(item => <button key={item} type="button" aria-pressed={program === item} onClick={() => setProgram(item)}
              className={`rounded-full border px-2.5 py-1 text-xs ${program === item ? "border-brand-deep bg-brand-deep text-white" : "border-border text-ink/65"}`}>{item}</button>)}
          </div>
        </section>
        <section className="min-w-0 p-4 sm:p-6">
          <button type="button" onClick={() => setExpanded(false)} aria-label="Close calendar" className="absolute right-3 top-3 text-lg leading-none text-ink/55 hover:text-ink">×</button>
          <h2 className="mb-4 flex items-center gap-2 pr-7 text-sm font-semibold">
            {isSameDay(selectedDate, today) ? `Today, ${selectedDate.toLocaleDateString("en-US", { month: "long" })} ${ordinal(selectedDate.getDate())}` : selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
            <span className="rounded bg-rose-50 px-1.5 py-0.5 text-xs font-semibold text-rose-500">{liveCount} LIVE</span>
          </h2>
          <div className="space-y-2">
            {modalEvents.length ? modalEvents.map(session => <article key={session.id} className="flex items-center gap-3 rounded-lg border border-border/70 p-3">
              <span className={`h-9 w-1 shrink-0 rounded-full ${session.live ? "bg-rose-500" : "bg-brand/70"}`} />
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-xs font-medium">{session.title}</h3>
                <p className="mt-1 truncate text-xs text-ink/55">
                  {session.live ? "Live now" : sessionWhen(session.date, session.time)} <span className="px-1">·</span> {session.host}
                  {session.live && <span> <span className="px-1">·</span> {session.attending} Watching</span>}
                </p>
              </div>
              <span className="hidden rounded-full bg-brand/5 px-2 py-1 text-xs text-brand sm:inline">{session.program}</span>
              {session.live
                ? <Button className="px-4 py-2 text-xs" style={{ backgroundColor: "#e84d4d" }}>Watch</Button>
                : <RsvpButton title={session.title} when={sessionWhen(session.date, session.time)} label="Attend" />}
            </article>) : <p className="rounded-lg border border-border p-6 text-center text-sm text-ink/55">No sessions scheduled for this week.</p>}
          </div>
        </section>
      </div>
    </div>}
  </>);
}
