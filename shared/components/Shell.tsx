"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { me } from "@/shared/data/mock";
import { useState } from "react";
import { Avatar } from "./ui";
import { CalendarWidget } from "./CalendarWidget";
import { BadgesWidget } from "./widgets";

const nav = [
  ["Home", "/", "home"],
  ["Profile", "/kara.siu", "profile"],
  ["Connections", "/connections", "connections"],
  ["Streams", "/streams", "streams"],
  ["Learn", "/learn", "learn"],
] as const;
const reserved = ["/connections", "/streams", "/learn", "/settings"];
const isActive = (p: string, h: string) =>
  h === "/" ? p === "/" : h === "/kara.siu" ? p !== "/" && !reserved.some(r => p.startsWith(r)) : p.startsWith(h);

function NavIcon({ name }: { name: (typeof nav)[number][2] }) {
  const paths = {
    home: <><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-6h6v6" /></>,
    profile: <><circle cx="12" cy="8" r="3.5" /><path d="M5 21a7 7 0 0 1 14 0" /></>,
    connections: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0M15 14a5.5 5.5 0 0 1 6.5 5" /></>,
    streams: <><circle cx="12" cy="12" r="2" /><path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7M5.5 5.5a9 9 0 0 0 0 13M18.5 5.5a9 9 0 0 1 0 13" /></>,
    learn: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 7h8M8 11h8M8 15h5" /></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">{paths[name]}</svg>;
}

function HeaderActionIcon({ name }: { name: "messages" | "notifications" }) {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    {name === "messages"
      ? <path d="M6 4.5h12a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4h-3l-3 3-3-3H6a4 4 0 0 1-4-4v-6a4 4 0 0 1 4-4Z" />
      : <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z" /><path d="M10 21h4" /><circle cx="12" cy="3" r="1" fill="currentColor" stroke="none" /></>}
  </svg>;
}

function Navbar() {
  const p = usePathname();
  return (
    <header className="bg-navbar sticky top-0 z-20 hidden h-[72px] items-center justify-between px-8 text-white lg:flex">
      <Link href="/" aria-label="SI U home" className="flex items-center">
        <Image src="/assets/Logo.png" alt="SI U" width={72} height={26} priority />
      </Link>
      <nav className="flex items-center gap-2">{nav.map(([label, href, icon]) =>
        <Link key={href} href={href} className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm transition-colors ${isActive(p, href) ? "bg-white/20" : "opacity-80 hover:bg-white/10"}`}>
          <NavIcon name={icon} />{label}
        </Link>)}</nav>
        <div className="flex items-center gap-2">
          <Link href="/connections" aria-label="Messages" className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 transition-colors hover:bg-white/20">
          <HeaderActionIcon name="messages" />
        </Link>
          <button type="button" aria-label="Notifications" className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 transition-colors hover:bg-white/20">
          <HeaderActionIcon name="notifications" />
        </button>
          <button type="button" aria-label="Account menu" className="overflow-hidden rounded-xl transition-colors hover:ring-2 hover:ring-white/40">
            <Avatar name={me.name} size={40} shape="rounded" src="/assets/Ava.png" />
        </button>
      </div>
    </header>);
}
function Sidebar({ mobile = false }: { mobile?: boolean }) {
  const sidebarClass = mobile
    ? "bg-sidebar flex h-full w-[290px] flex-col overflow-auto p-5 text-white"
    : "bg-sidebar hidden w-[290px] shrink-0 flex-col p-5 text-white lg:flex";
  return (
    <aside className={sidebarClass}>
      <div className="relative mb-7">
        <div className="relative h-[86px] overflow-hidden rounded-xl bg-[linear-gradient(125deg,#f49a49_0%,#ec78bb_36%,#873fe1_68%,#2d8be2_100%)]">
          <div className="absolute -bottom-12 left-[-10%] h-24 w-[120%] -rotate-6 rounded-[50%] bg-cyan-400/90" />
          <div className="absolute -bottom-16 left-[35%] h-28 w-[90%] rotate-6 rounded-[50%] bg-blue-700/70" />
        </div>
        <div className="absolute -bottom-5 left-3 rounded-xl border-2 border-white/80 bg-white/20 p-1">
          <Avatar name={me.name} size={44} shape="rounded" src="/assets/Ava.png" />
        </div>
      </div>
      <h2 className="text-lg font-extrabold uppercase leading-tight">{me.name}</h2>
      <p className="text-sm opacity-80">@{me.handle}</p>
      <p className="mt-2 text-sm leading-5 opacity-80">{me.tagline}</p>
      <button className="mt-4 flex w-full items-center justify-between rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-left text-xs">
        <span><span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-white" />Claim your .siu name</span><span>→</span>
      </button>

      <section className="mt-5 border-t border-white/15 pt-5">
        <h3 className="mb-2 text-[11px] font-semibold tracking-[0.16em] text-white/65">YOUR CONNECTIONS</h3>
        <Link href="/connections" className="flex items-center justify-between py-1.5 text-sm hover:text-white/80">
          <span>Members</span><span>{me.members.toLocaleString()} <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">+7</span></span>
        </Link>
        <Link href="/connections" className="flex items-center justify-between py-1.5 text-sm hover:text-white/80">
          <span>Communities</span><span>{me.communities} <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[10px]">+3</span></span>
        </Link>
        <p className="flex items-center justify-between py-1.5 text-sm text-white/45"><span>Companies</span><span>—</span></p>
      </section>

      <section className="mt-4 border-t border-white/15 pt-5">
        <h3 className="mb-2 text-[11px] font-semibold tracking-[0.16em] text-white/65">EXPLORE</h3>
        <Link href="/connections" className="block border-b border-white/10 py-2.5 text-sm">♧ &nbsp; Communities</Link>
        <Link href="/learn" className="block border-b border-white/10 py-2.5 text-sm">▤ &nbsp; Si Her Publisher</Link>
        <Link href="/streams" className="block py-2.5 text-sm">◷ &nbsp; Events</Link>
      </section>

      <div className="mt-auto space-y-3 border-t border-white/15 pt-5 text-sm text-white/80">
        <Link href="/settings" className="block">⚙ &nbsp; Settings</Link><button>↪ &nbsp; Logout</button>
      </div>
    </aside>);
}
function RightRail() {
  return (
    <aside className="hidden w-[290px] shrink-0 space-y-4 border-l border-border bg-white p-4 xl:block">
      <div className="-mx-4 -mt-4 mb-4 border-b border-border px-4 pb-4 pt-5">
        <p className="mb-2 text-xs text-ink/60">Looking for something?</p>
        <label className="flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-sm text-ink/55">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-4 w-4 shrink-0"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>
          <input aria-label="Search people, sessions, topics" placeholder="Search people, sessions, topics…" className="min-w-0 flex-1 outline-none" />
        </label>
      </div>
      <CalendarWidget />
      <BadgesWidget />
    </aside>);
}
function MobileBar() {
  const [open, setOpen] = useState(false);
  return (<>
    <header className="bg-navbar sticky top-0 z-20 flex h-14 items-center justify-between px-4 text-white lg:hidden">
      <Link href="/" aria-label="SI U home" className="flex items-center">
        <Image src="/assets/Logo.png" alt="SI U" width={70} height={25} priority />
      </Link>
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
      {tabs.map(([label, href, icon]) => <Link key={label} href={href} className={`flex flex-col items-center gap-1 ${isActive(p, href) ? "font-bold" : "opacity-70"}`}><NavIcon name={icon} />{label}</Link>)}
    </nav>);
}
export default function Shell({ children }: { children: React.ReactNode }) {
  return (<div className="min-h-screen"><Navbar /><MobileBar />
    <div className="flex min-h-[calc(100vh-5rem)]"><Sidebar /><main className="min-w-0 flex-1 bg-page p-4 pb-24 lg:p-8"><div className="mx-auto max-w-[859px]">{children}</div></main><RightRail /></div>
    <BottomTabBar /></div>);
}
