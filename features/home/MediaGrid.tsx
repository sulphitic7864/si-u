import Image from "next/image";

const tones = ["from-orange-300 via-rose-400 to-amber-700", "from-slate-800 via-slate-950 to-black", "from-fuchsia-500 via-purple-700 to-indigo-900", "from-sky-400 via-blue-700 to-slate-950", "from-emerald-400 via-teal-700 to-green-950"];
export function MediaGrid({ count, variant = "gallery" }: { count: number; variant?: "landscape" | "gallery" }) {
  if (variant === "landscape") {
    return (<div className="relative mt-4 h-64 overflow-hidden rounded-xl sm:h-72">
      <Image src="/assets/image1946.png" alt="Speaker presenting at a conference" fill sizes="(min-width: 1280px) 780px, 100vw" className="object-cover" />
    </div>);
  }
  const shown = Math.min(count, 4); const extra = count - shown;
  const cols = shown === 1 ? "grid-cols-1" : "grid-cols-2";
  return (<div className={`mt-4 grid gap-1 overflow-hidden rounded-xl ${cols}`}>
    {Array.from({ length: shown }, (_, i) => <div key={i} className={`relative h-40 overflow-hidden bg-gradient-to-br ${tones[i % 5]} ${shown === 1 ? "h-72" : ""} ${shown === 3 && i === 0 ? "row-span-2 h-full" : ""}`}>
      <span className="absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-white/10" />
      <span className="absolute -right-8 -top-10 h-32 w-32 rounded-full border-[18px] border-white/10" />
      {extra > 0 && i === 3 && <span className="absolute inset-0 grid place-items-center bg-black/50 text-lg font-semibold text-white">{extra}+ more</span>}</div>)}</div>);
}
