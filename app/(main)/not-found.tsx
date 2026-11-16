import Link from "next/link";
export default function NotFound() {
  return (<div className="grid place-items-center py-24 text-center"><div><h1 className="text-3xl font-bold text-brand-deep">Page not found</h1>
    <p className="mt-2 text-sm text-ink/70">This page doesn’t exist or isn’t available.</p><Link href="/" className="mt-4 inline-block rounded-lg bg-brand-deep px-4 py-2 text-sm text-white">Back to Home</Link></div></div>);
}
