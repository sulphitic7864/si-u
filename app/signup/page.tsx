import Link from "next/link";
// Logged-out route: intentionally outside the (main) shell (no sidebar). Session is preselected via ?session=
export default async function Signup({ searchParams }: { searchParams: Promise<{ session?: string }> }) {
  const { session } = await searchParams;
  return (<main className="grid min-h-screen place-items-center bg-page p-4"><div className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-8">
    <h1 className="text-2xl font-black text-brand-deep">Join SI U</h1>
    {session && <p className="rounded-lg bg-page p-3 text-sm">You’re signing up to attend a session — we’ll save your spot.</p>}
    <input placeholder="Email" className="w-full rounded-lg border border-border px-3 py-2 text-sm" />
    <button className="w-full rounded-lg bg-brand-deep py-2 text-sm text-white">Continue</button>
    <p className="text-xs text-ink/60">Already a member? <Link href="/" className="text-brand">Log in</Link></p></div></main>);
}
