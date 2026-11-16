const tones = ["from-orange-400 to-amber-700", "from-slate-800 to-slate-950", "from-fuchsia-500 to-indigo-700", "from-sky-500 to-blue-900", "from-emerald-400 to-teal-800"];
/** 1 / 2 / 3 / 4+ layouts; real posts will pass image urls (placeholder gradients until assets exist). */
export function MediaGrid({ count }: { count: number }) {
  const shown = Math.min(count, 4); const extra = count - shown;
  const cols = shown === 1 ? "grid-cols-1" : "grid-cols-2";
  return (<div className={`mt-3 grid gap-1 overflow-hidden rounded-xl ${cols}`}>
    {Array.from({ length: shown }, (_, i) => <div key={i} className={`relative h-40 bg-gradient-to-br ${tones[i % 5]} ${shown === 1 ? "h-72" : ""} ${shown === 3 && i === 0 ? "row-span-2 h-full" : ""}`}>
      {extra > 0 && i === 3 && <span className="absolute inset-0 grid place-items-center bg-black/50 text-lg font-semibold text-white">{extra}+ more</span>}</div>)}</div>);
}
