const tones = ["from-orange-300 via-rose-400 to-amber-700", "from-slate-800 via-slate-950 to-black", "from-fuchsia-500 via-purple-700 to-indigo-900", "from-sky-400 via-blue-700 to-slate-950", "from-emerald-400 via-teal-700 to-green-950"];
export function MediaGrid({ count, variant = "gallery" }: { count: number; variant?: "landscape" | "gallery" }) {
  if (variant === "landscape") {
    return (<div role="img" aria-label="Illustrated mountain landscape" className="relative mt-4 h-64 overflow-hidden rounded-xl bg-gradient-to-b from-sky-200 via-cyan-100 to-amber-100 sm:h-72">
      <svg aria-hidden="true" viewBox="0 0 1200 480" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="mountain-sky" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#9fe3ed" /><stop offset="1" stopColor="#f8d7a1" /></linearGradient>
          <linearGradient id="mountain-front" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#3c858a" /><stop offset="1" stopColor="#153b4d" /></linearGradient>
        </defs>
        <rect width="1200" height="480" fill="url(#mountain-sky)" />
        <circle cx="900" cy="112" r="52" fill="#fff5c7" opacity=".8" />
        <path d="M0 340 190 190l135 120 190-205 205 233 145-170 335 192v120H0Z" fill="#8bbbc1" />
        <path d="m0 376 210-130 144 115 205-220 226 240 155-155 260 155v99H0Z" fill="#557f89" />
        <path d="m0 435 236-176 122 95 205-189 202 225 157-128 278 148v70H0Z" fill="url(#mountain-front)" />
        <path d="m420 310 123-145 76 81-43-13-34 25-35-9-33 41Z" fill="#eef6ee" opacity=".9" />
        <path d="M0 405q180-40 340 20t300 0 300-5 260 15v45H0Z" fill="#244d4e" opacity=".75" />
      </svg>
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
