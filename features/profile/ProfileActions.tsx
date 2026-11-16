"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/shared/components/ui";
import { RsvpButton } from "@/shared/components/RsvpModal";

export type Viewer = "owner" | "co-attendee" | "non-attendee" | "guest";
export const viewers: Viewer[] = ["owner", "co-attendee", "non-attendee", "guest"];

/** Only co-attendees (shared >=1 completed session) may Connect or message. */
export function ProfileActions({ viewer }: { viewer: Viewer }) {
  const [sent, setSent] = useState(false);
  if (viewer === "owner") return <div className="flex gap-2"><Button variant="ghost">Edit profile</Button><Button variant="ghost" aria-label="More">···</Button></div>;
  if (viewer === "co-attendee") return (
    <div className="flex gap-2">
      {sent ? <span className="rounded-lg bg-brand/10 px-4 py-2 text-sm text-brand">Requested</span> : <Button onClick={() => setSent(true) /* Phase 2: POST connection, origin=same_session */}>Connect</Button>}
      <Button variant="ghost">Message</Button></div>);
  if (viewer === "guest") return <Link href="/signup?session=next" className="rounded-lg bg-brand-deep px-4 py-2 text-sm text-white">Attend</Link>;
  return <RsvpButton title="Leading Without Losing Yourself" when="Thu 14 Aug · 6:00 PM PT" />; // non-attendee: no Connect
}

export function GuideNudge() {
  const [shown, setShown] = useState(true);
  if (!shown) return null;
  return (<div className="flex items-center justify-between rounded-2xl border border-brand/30 bg-white p-4">
    <div><b>Two things left before you can apply as a Guide</b><p className="text-sm text-ink/70">Add your values and one contribution.</p></div>
    <div className="flex items-center gap-2"><Button variant="ghost">Complete profile</Button><button aria-label="Dismiss" onClick={() => setShown(false)}>✕</button></div></div>);
}
