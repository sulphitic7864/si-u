import { StreamsView } from "@/features/streams/StreamsView";
import { liveNowStreams } from "@/shared/data/mock";
export default function Page() {
  return (
    <>
      <header className="mb-5">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-xl font-semibold text-brand-deep">Streams</h1>
          <span className="flex shrink-0 items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#db4d54]">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#e54b58]" />
            {liveNowStreams.length + 1} live right now
          </span>
        </div>
        <p className="text-sm text-ink/70">Live sessions and community broadcasts — watch with your people.</p>
      </header>
      <StreamsView />
    </>
  );
}
