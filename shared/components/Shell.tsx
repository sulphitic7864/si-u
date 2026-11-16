"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { me, sessions } from "@/shared/data/mock";
import { useState } from "react";
import { Avatar, Card, Button } from "./ui";
import { CalendarWidget } from "./CalendarWidget";
import { BadgesWidget, SessionRow } from "./widgets";
import { RsvpButton } from "./RsvpModal";

const nav = [["Home", "/"], ["Profile", "/kara.siu"], ["Connections", "/connections"], ["Streams", "/streams"], ["Learn", "/learn"]] as const;
const reserved = ["/connections", "/streams", "/learn"];
const isActive = (p: string, h: string) =>
  h === "/" ? p === "/" : h === "/kara.siu" ? p !== "/" && !reserved.some(r => p.startsWith(r)) : p.startsWith(h);

function Navbar() {
  const p = usePathname();
  return (
    <header className="bg-navbar sticky top-0 z-20 hidden h-16 items-center justify-between px-6 text-white lg:flex">
      <Link href="/" className="text-2xl font-black">SI U</Link>
      <nav className="flex gap-2">{nav.map(([l, h]) =>
        <Link key={h} href={h} className={`rounded-lg px-4 py-2 text-sm ${isActive(p, h) ? "bg-white/20" : "opacity-80"}`}>{l}</Link>)}</nav>
      <Avatar name={me.name} size={36} />
    </header>);
}
function Sidebar({ mobile = false }: { mobile?: boolean }) {
  return (
    <aside className={mobile ? "bg-sidebar flex h-full w-[300px] flex-col overflow-auto p-7 text-white" : "bg-sidebar hidden w-[338px] shrink-0 flex-col p-7 text-white lg:flex"}>
      <Avatar name={me.name} size={56} />
      <h2 className="mt-4 text-xl font-extrabold uppercase">{me.name}</h2>
      <p className="opacity-80">@{me.handle}</p><p className="text-sm opacity-80">{me.tagline}</p>
      <p className="mt-6 text-xs tracking-widest opacity-70">YOUR CONNECTIONS</p>
      <p className="mt-2 flex justify-between"><span>Members</span><span>{me.members.toLocaleString()}</span></p>
      <p className="flex justify-between"><span>Communities</span><span>{me.communities}</span></p>
      <p className="mt-6 text-xs tracking-widest opacity-70">EXPLORE</p>
      {["Communities", "Si Her Publisher", "Events"].map(x => <p key={x} className="py-2">{x}</p>)}
      <div className="mt-auto space-y-2 opacity-90"><p>Settings</p><p>Logout</p></div>
    </aside>);
}
function RightRail() {
  return (
    <aside className="hidden w-[400px] shrink-0 space-y-4 border-l border-border bg-white p-6 xl:block">
      <input placeholder="Search people, sessions, topics…" className="w-full rounded-xl border border-border px-4 py-2 text-sm" />
      <CalendarWidget /><p className="font-medium">Upcoming sessions</p>
      <Card className="space-y-3 p-3">{sessions.map(s =>
        <SessionRow key={s.id} title={s.title} meta={s.host} action={s.live ? <Button>Watch</Button> : <RsvpButton title={s.title} when="Thu Apr 2 · 10:00 PM" />} />)}</Card>
      <BadgesWidget />
    </aside>);
}
function MobileBar() {
  const [open, setOpen] = useState(false);
  return (<>
    <header className="bg-navbar sticky top-0 z-20 flex h-14 items-center justify-between px-4 text-white lg:hidden">
      <Link href="/" className="text-xl font-black">SI U</Link>
      <div className="flex gap-3"><button aria-label="Search">🔍</button><button aria-label="Menu" onClick={() => setOpen(true)}>☰</button></div></header>
    {open && <div className="fixed inset-0 z-40 flex lg:hidden" role="dialog" aria-modal>
      <Sidebar mobile /><button className="flex-1 bg-black/40" aria-label="Close menu" onClick={() => setOpen(false)} /></div>}
  </>);
}
function BottomTabBar() {
  const p = usePathname();
  const tabs = [nav[0], nav[2], nav[3], nav[4], nav[1]];
  return (
    <nav className="bg-navbar fixed inset-x-0 bottom-0 z-20 flex justify-around py-3 text-xs text-white lg:hidden">
      {tabs.map(([l, h]) => <Link key={l} href={h} className={isActive(p, h) ? "font-bold" : "opacity-70"}>{l}</Link>)}
    </nav>);
}
export default function Shell({ children }: { children: React.ReactNode }) {
  return (<div className="min-h-screen"><Navbar /><MobileBar />
    <div className="flex"><Sidebar /><main className="min-w-0 flex-1 p-4 pb-24 lg:p-8"><div className="mx-auto max-w-[859px]">{children}</div></main><RightRail /></div>
    <BottomTabBar /></div>);
}
