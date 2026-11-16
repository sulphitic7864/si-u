import Link from "next/link";
import { profileSessions } from "@/shared/data/mock";
import { ProfileActions, GuideNudge } from "./ProfileActions";
import { Card, Avatar, Button } from "@/shared/components/ui";
import type { Viewer } from "./types";
const tabs = ["overview", "sessions", "posts", "about"] as const;
export function ProfileView({ handle, tab, viewer = "owner" }: { handle: string; tab: string; viewer?: Viewer }) {
  const t = (tabs as readonly string[]).includes(tab) ? tab : "overview";
  return (<div className="space-y-4">
    <Card className="overflow-hidden p-0"><div className="h-40 bg-gradient-to-b from-slate-400 to-brand-deep" />
      <div className="p-5"><div className="-mt-14 flex items-end justify-between"><Avatar name={handle} size={80} /><ProfileActions viewer={viewer} /></div>
        <h1 className="mt-2 text-2xl font-bold">Kara Howard <span className="text-sm font-normal text-brand">@{handle}</span> <span className="rounded border px-1 font-mono text-[10px]">GUIDE</span></h1>
        <p className="text-sm">Emerging Tech Adoption Leader · Web3 Connector</p>
        <p className="mt-3 text-sm text-ink/70">San Francisco, CA · si3.space · 41 connections</p></div></Card>
    <div className="grid gap-4 md:grid-cols-2">
      <Card><p className="font-mono text-[10px] tracking-widest">SESSION RECORD</p><p className="mt-2 text-3xl font-bold">18 <span className="ml-4">24</span></p><p className="text-xs">Led · Attended — 6 POAPs · 2 certs</p></Card>
      <div className="bg-card-deep rounded-2xl p-5 text-white"><p className="font-mono text-[10px] tracking-widest">{viewer === "owner" ? "YOUR NEXT SESSION" : "NEXT SESSION"}</p><b>Leading Without Losing Yourself</b><p className="mb-2 text-sm">Thu 14 Aug · 42 attending</p>{viewer === "owner" && <Button variant="ghost">Manage</Button>}</div></div>
      {viewer === "owner" && <GuideNudge />}
    <nav className="flex gap-2 rounded-2xl bg-white p-2">{tabs.map(x =>
      <Link key={x} href={`?tab=${x}`} className={`rounded-lg px-4 py-2 text-sm capitalize ${t === x ? "bg-brand-deep text-white" : ""}`}>{x}</Link>)}</nav>
    {t === "sessions" || t === "overview" ? <Card><h2 className="font-semibold">Sessions</h2><p className="text-xs">18 led · 24 attended</p>
      {profileSessions.slice(0, t === "overview" ? 2 : 9).map(x => <div key={x.title} className="flex items-center justify-between border-t border-border py-3"><div><b>{x.title}</b> <span className="rounded border px-1 font-mono text-[10px]">{x.role}</span><p className="font-mono text-xs text-ink/60">{x.meta}</p></div><span className="text-xs text-brand">POAP earned</span></div>)}</Card>
    : t === "about" ? <Card><h2 className="font-semibold">About</h2><p className="mt-2 text-sm">I work on getting emerging tech into the hands of people who’ve been left out of it.</p><div className="mt-3 flex flex-wrap gap-2">{["Integrity","Clarity","Consistency","Growth","Accountability"].map(v => <span key={v} className="rounded-full border border-border px-3 py-1 text-xs">{v}</span>)}</div>
      <h3 className="mt-5 font-semibold">Work &amp; Contributions</h3><p className="mt-2 text-sm"><b>Founder</b> · SI3 · 2023 — Present</p><p className="text-sm"><b>Core Contributor</b> · Grow3dge DAO · 2022 — Present</p></Card>
    : <Card><h2 className="font-semibold">Posts</h2><p className="mt-2 text-sm">Just wrapped the new onboarding redesign for SI·U. Progressive disclosure beats front-loading every time.</p><p className="mt-2 text-xs">Support 24 · Insightful 46 · Connect 18</p></Card>}
  </div>);
}
