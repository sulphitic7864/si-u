"use client";

import { useState, type Dispatch, type SetStateAction } from "react";
import Link from "next/link";
import { Avatar, Button, Card, Chip } from "@/shared/components/ui";
import { connectionStats, connections, met, requests, type Program } from "@/shared/data/mock";

type MessagingFilter = "Any" | "Can message" | "DMs off";
type Filters = { programs: Program[]; messaging: MessagingFilter };
type ConnectionTab = "received" | "sent";

const programs: Program[] = ["Grow3dge", "Si Her", "Well-Being", "Explorer"];
const sentInit = [
  { name: "Amber Cardera", note: "You mentioned rebuilding your activation email in the Q&A — would love to compare notes.", status: "Waiting" },
  { name: "Sandy Martinez", note: "Your point about pricing before product-market fit reframed the whole thing for me.", status: "Expires in 5 days" },
  { name: "Mira Okonkwo", note: "", status: "No response" },
];

function SearchIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-4 w-4"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></svg>;
}

function FilterIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M4 6h16M7 12h10m-7 6h4" /><circle cx="8" cy="6" r="1.5" fill="currentColor" /><circle cx="15" cy="12" r="1.5" fill="currentColor" /></svg>;
}

function ConnectionListSection({ query, segment, filters }: { query: string; segment: string; filters: Filters }) {
  const [sort, setSort] = useState<"Recently active" | "Name A–Z">("Recently active");
  const filtered = connections.filter(connection =>
    `${connection.name} ${connection.handle} ${connection.role}`.toLowerCase().includes(query.toLowerCase())
    && (segment === "All" || (segment === "Guides" ? connection.guide : segment === "Explorers" ? !connection.guide : connection.presence !== "offline"))
    && (!filters.programs.length || filters.programs.includes(connection.program))
    && (filters.messaging === "Any" || (filters.messaging === "Can message" ? connection.dms : !connection.dms)),
  );
  const sorted = [...filtered].sort((a, b) => sort === "Name A–Z" ? a.name.localeCompare(b.name) : 0);

  return (
    <section className="space-y-3">
      <div className="flex items-center gap-3">
        <h2 className="shrink-0 font-mono text-xs tracking-[0.16em] text-ink/70">YOUR CONNECTIONS</h2>
        <span className="h-px flex-1 bg-border" />
        <label className="flex shrink-0 items-center gap-1 text-sm font-medium text-[#625a91]">
          <span className="sr-only">Sort connections</span>
          <select aria-label="Sort connections" value={sort} onChange={event => setSort(event.target.value === "Name A–Z" ? "Name A–Z" : "Recently active")} className="appearance-none bg-transparent py-1 text-right text-xs font-medium text-[#625a91] outline-none sm:text-sm">
            <option>Recently active</option>
            <option>Name A–Z</option>
          </select>
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><path d="m3.5 6 4.5 4 4.5-4" /></svg>
        </label>
      </div>
      <Card className="divide-y divide-border p-0">
        {sorted.length ? sorted.map(connection => (
          <div key={connection.handle} className="flex items-center gap-3 px-3 py-3.5 sm:gap-4 sm:px-4 sm:py-3">
            <div className="relative">
              <Avatar name={connection.name} size={50} />
              {connection.presence !== "offline" && <span aria-label={connection.live ? "Live now" : "Online"} className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${connection.live ? "bg-[#e54b59]" : "bg-[#2eaf71]"}`} />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <b className="text-sm font-semibold sm:text-base">{connection.name}</b>
                <span className="font-mono text-xs text-[#8b83a8] sm:text-sm">@{connection.handle}</span>
                {connection.guide && <span className="rounded-full bg-[#fff0f8] px-2.5 py-1 text-[9px] font-semibold text-[#c33b82] sm:text-[10px]">● Guide</span>}
              </div>
              <p className="mt-0.5 truncate text-xs text-[#625a91] sm:text-sm">{connection.role}</p>
            </div>
            <div className="hidden shrink-0 items-center gap-4 sm:flex">
              {connection.live && <span className="rounded-full bg-[#fff0f0] px-3 py-1.5 text-xs font-medium text-[#db4d54]">● Live now</span>}
              {!connection.dms && <span className="flex items-center gap-1.5 text-xs text-[#8b83a8]"><svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" className="h-3.5 w-3.5"><rect x="3" y="7" width="10" height="7" rx="1" /><path d="M5 7V5a3 3 0 0 1 6 0v2" /></svg>DMs off</span>}
            </div>
            {connection.dms && <Button variant="ghost" className="shrink-0 !rounded-full !px-3 !py-1.5 text-xs sm:!px-4 sm:!py-2 sm:text-sm">Message</Button>}
            <button type="button" aria-label={`More options for ${connection.name}`} className="hidden h-8 w-5 shrink-0 place-items-center rounded-full text-ink/45 hover:bg-page sm:grid">
              <svg aria-hidden="true" viewBox="0 0 4 16" fill="currentColor" className="h-4 w-1"><circle cx="2" cy="2" r="1.5" /><circle cx="2" cy="8" r="1.5" /><circle cx="2" cy="14" r="1.5" /></svg>
            </button>
          </div>
        )) : <p className="p-6 text-center text-xs text-ink/55">No connections match these filters.</p>}
        <footer className="flex flex-wrap items-center justify-between gap-2 bg-[#fcfbfe] px-4 py-3.5">
          <p className="font-mono text-[10px] text-ink/45 sm:text-xs">Showing {sorted.length} of {connectionStats.total.toLocaleString()} <span className="px-1">·</span> sorted by {sort === "Recently active" ? "activity" : "name"}</p>
          <Button variant="ghost" className="!rounded-full !px-4 !py-2 text-xs sm:text-sm">Load 25 more</Button>
        </footer>
      </Card>
    </section>
  );
}

function RequestsSection({ tab, onTabChange }: { tab: ConnectionTab; onTabChange: (tab: ConnectionTab) => void }) {
  const [hidden, setHidden] = useState<string[]>([]);
  const [sentRows, setSentRows] = useState(sentInit);
  const visibleRequests = requests.filter(request => !hidden.includes(request.name));
  const receivedCount = visibleRequests.length;
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-3">
        <h2 className="shrink-0 font-mono text-xs tracking-[0.16em] text-ink/70">REQUESTS · {receivedCount}</h2>
        <span className="h-px flex-1 bg-border" />
        <div className="flex shrink-0 rounded-full bg-[#eeeaf7] p-1">
          {(["received", "sent"] as const).map(value => (
            <button key={value} type="button" onClick={() => onTabChange(value)} aria-pressed={tab === value}
              className={`rounded-full px-3 py-1.5 text-[10px] font-medium capitalize transition-colors sm:px-4 sm:text-sm ${tab === value ? "bg-white text-brand-deep shadow-sm" : "text-ink/60 hover:text-brand"}`}>
              {value} <span className="ml-1">{value === "received" ? receivedCount : sentRows.length}</span>
            </button>
          ))}
        </div>
      </div>

      {tab === "received" ? (
        <Card className="overflow-hidden p-0">
          {visibleRequests.map((request, index) => (
            <article key={request.name} className={`grid grid-cols-[44px_minmax(0,1fr)] gap-x-3 gap-y-2.5 px-3 py-4 sm:grid-cols-[56px_minmax(0,1fr)_auto] sm:gap-x-4 sm:px-4 sm:py-4 ${index > 0 ? "border-t border-border" : ""}`}>
              <div className="relative row-span-2 self-start">
                <Avatar name={request.name} size={54} />
                {request.online && <span aria-label="Online" className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#32b879]" />}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <b className="text-sm font-semibold sm:text-base">{request.name}</b>
                  <span className={`rounded-full px-2.5 py-1 text-[9px] font-semibold sm:text-[10px] ${request.badge === "Guide" ? "bg-[#fff0f8] text-[#c33b82]" : "bg-[#f0eef9] text-[#645b8e]"}`}>● {request.badge}</span>
                </div>
                <p className="mt-1 text-xs leading-5 text-ink/55 sm:text-sm">
                  {request.role}<span className="px-1.5">·</span>{request.connections}<span className="px-1.5">·</span>{request.age}
                </p>
              </div>
              <div className="col-start-2 flex items-center gap-2 sm:col-start-3 sm:row-span-2 sm:row-start-1 sm:items-start">
                <Button className="!rounded-full !px-4 !py-2 text-xs sm:!px-5 sm:!py-2.5 sm:text-sm" onClick={() => setHidden(current => [...current, request.name])}>Accept</Button>
                <Button variant="ghost" className="!rounded-full !px-4 !py-2 text-xs sm:!px-5 sm:!py-2.5 sm:text-sm" onClick={() => setHidden(current => [...current, request.name])}>Decline</Button>
              </div>
              <div className="col-span-2 col-start-1 sm:col-span-2 sm:col-start-2">
                <p className="border-l-[3px] border-brand bg-[#f8f6fb] px-3 py-2.5 text-xs leading-5 text-[#554c82] sm:px-3.5 sm:py-3 sm:text-sm sm:leading-6">“{request.note}”</p>
                <p className="mt-2 flex items-center gap-2 pl-0.5 text-xs font-medium text-brand">
                  <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-3.5 w-3.5 shrink-0"><path d="M2 3.5h12v9H2z" /><path d="M5 6h6M5 8.5h4" /></svg>
                  <span>You were both in <span className="font-semibold">{request.session}</span></span>
                </p>
              </div>
            </article>
          ))}
          {visibleRequests.length === 0 && (
            <div className="py-8 text-center">
              <b className="text-sm">You’re all caught up</b>
              <p className="mt-1 text-xs text-ink/55">New connection requests will appear here.</p>
            </div>
          )}
          <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-[#fcfbfe] px-4 py-3 text-xs">
            <p className="text-ink/55">Declining is silent — they’re never told.</p>
            <button type="button" className="font-semibold text-brand">See all 24 requests →</button>
          </footer>
        </Card>
      ) : <SentList rows={sentRows} setRows={setSentRows} />}
    </section>
  );
}

function PeopleMetSection() {
  const [requested, setRequested] = useState<string[]>([]);
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-3">
        <h2 className="shrink-0 font-mono text-xs tracking-[0.16em] text-ink/70">PEOPLE YOU MET THIS WEEK</h2>
        <span className="h-px flex-1 bg-border" />
        <button type="button" className="shrink-0 text-xs font-medium text-brand">See all 14 →</button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {met.map(person => {
          const isRequested = requested.includes(person.name);
          return (
            <Card key={person.name} className="p-3.5 sm:p-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar name={person.name} size={50} />
                  {person.status !== "offline" && <span aria-label={person.status === "online" ? "Online" : "Away"} className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${person.status === "online" ? "bg-[#2eaf71]" : "bg-[#e54b59]"}`} />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <b className="text-sm font-semibold sm:text-base">{person.name}</b>
                    <span className={`rounded-full px-2.5 py-1 text-[9px] font-semibold sm:text-[10px] ${person.badge === "Guide" ? "bg-[#fff0f8] text-[#c33b82]" : "bg-[#f0eef9] text-[#645b8e]"}`}>● {person.badge}</span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-[#625a91] sm:text-sm">{person.role}</p>
                </div>
              </div>
              <div className="my-3 border-t border-dashed border-border" />
              <p className="flex items-start gap-2 text-xs leading-5 text-[#625a91]">
                {person.activity === "attended"
                  ? <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" className="mt-1 h-3.5 w-3.5 shrink-0"><path d="M2 3.5h12v9H2z" /><path d="m7 6 3 2-3 2V6Z" /></svg>
                  : <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 h-3.5 w-3.5 shrink-0"><circle cx="8" cy="8" r="6" /><path d="M8 4.5V8l2.5 1.5" /></svg>}
                <span>{person.activity === "attended" ? "You both attended" : "She led"} <b className="font-semibold text-ink">{person.session}</b><span className="text-ink/45"> · {person.day}</span></span>
              </p>
              <div className="mt-3 flex items-center justify-between gap-2">
                <span className={`flex items-center gap-2 font-mono text-xs ${person.left.startsWith("1") || person.left.startsWith("2") ? "text-amber-700" : "text-ink/50"}`}>
                  <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" className="h-3.5 w-3.5"><circle cx="8" cy="8" r="6" /><path d="M8 4.5V8l2.5 1.5" /></svg>
                  {person.left}
                </span>
                <Button className="!rounded-full !px-4 !py-2 text-xs sm:!px-5 sm:!py-2 sm:text-sm" onClick={() => {
                  if (isRequested) return;
                  setRequested(current => [...current, person.name]);
                }}>{isRequested ? "Requested" : "Connect"}</Button>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export function ConnectionList() {
  const [q, setQ] = useState("");
  const [tab, setTab] = useState<ConnectionTab>("received");
  const [filterOpen, setFilterOpen] = useState(false);
  const [segment, setSegment] = useState("All");
  const [filters, setFilters] = useState<Filters>({ programs: [], messaging: "Any" });
  const activeFilters = filters.programs.length + (filters.messaging !== "Any" ? 1 : 0);
  const chips = [
    { value: "All", count: connectionStats.total },
    { value: "Guides", count: connectionStats.guides },
    { value: "Explorers", count: connectionStats.explorers },
    { value: "Online now", count: connectionStats.online },
  ];

  return (
    <div className="space-y-5">
      <div className="flex gap-2">
        <label className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-border bg-white px-4 py-3.5 text-ink/45 focus-within:border-brand/50">
          <SearchIcon />
          <input value={q} onChange={event => setQ(event.target.value)} aria-label="Search your connections by name, handle or role" placeholder="Search your connections by name, handle or role" className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink/40" />
        </label>
        <Button variant="ghost" onClick={() => setFilterOpen(true)} className="flex shrink-0 items-center gap-1.5 !rounded-full !px-4 !py-3.5 text-sm">
          <FilterIcon /> Filters{activeFilters > 0 && <span className="grid h-4 min-w-4 place-items-center rounded-full bg-brand-deep px-1 text-[9px] text-white">{activeFilters}</span>}
        </Button>
      </div>

      {filterOpen && <FilterDrawer value={filters} onApply={value => { setFilters(value); setFilterOpen(false); }} onClose={() => setFilterOpen(false)} />}

      <div className="flex flex-wrap gap-1.5">
        {chips.map(({ value, count }) => (
          <button key={value} type="button" onClick={() => setSegment(value)} aria-pressed={segment === value}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors sm:text-sm ${segment === value ? "border-brand-deep bg-brand-deep text-white" : "border-border bg-white text-[#625a91]"}`}>
            {value === "Online now" && <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#20a66b]" />}
            {value}
            <span className={`font-mono text-[11px] font-normal ${segment === value ? "text-white/70" : "text-[#8b83a8]"}`}>{count.toLocaleString()}</span>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2.5 rounded-2xl border border-border bg-white px-4 py-3 shadow-sm sm:gap-3">
        <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-[#e54b59]" />
        <div aria-hidden="true" className="flex shrink-0 items-center -space-x-2">
          <Avatar name="Zuza" size={30} />
          <Avatar name="Amber" size={30} />
          <Avatar name="Jordan" size={30} />
        </div>
        <p className="min-w-[55%] flex-1 text-xs text-ink sm:min-w-0 sm:text-sm">
          <span className="font-semibold">Zuza, Amber and 1 other</span> are streaming right now
        </p>
        <Link href="/streams" className="ml-auto inline-flex shrink-0 items-center gap-2 text-xs font-semibold text-brand hover:text-brand-deep sm:text-sm">
          Go to Streams
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5"><path d="M2.5 8h10M8.5 4l4 4-4 4" /></svg>
        </Link>
      </div>

      <RequestsSection tab={tab} onTabChange={setTab} />

      <PeopleMetSection />

      <ConnectionListSection query={q} segment={segment} filters={filters} />
    </div>
  );
}

function FilterDrawer({ value, onApply, onClose }: { value: Filters; onApply: (value: Filters) => void; onClose: () => void }) {
  const [draft, setDraft] = useState(value);
  const toggleProgram = (program: Program) => setDraft(current => ({
    ...current,
    programs: current.programs.includes(program) ? current.programs.filter(item => item !== program) : [...current.programs, program],
  }));
  const clear = () => setDraft({ programs: [], messaging: "Any" });

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#21183c]/35 p-0 sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-labelledby="connections-filter-title">
      <div className="max-h-[88vh] w-full max-w-[410px] space-y-5 overflow-y-auto rounded-t-2xl bg-white p-5 shadow-2xl sm:rounded-2xl sm:p-6">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 id="connections-filter-title" className="text-sm font-semibold">Filters</h2>
          <div className="flex items-center gap-3">
            <button type="button" onClick={clear} className="text-[10px] text-brand">Clear all</button>
            <button type="button" onClick={onClose} aria-label="Close filters" className="grid h-7 w-7 place-items-center rounded-full text-lg text-ink/50 hover:bg-page">×</button>
          </div>
        </div>
        <div>
          <p className="mb-2 font-mono text-[9px] font-semibold tracking-[0.14em] text-ink/55">PROGRAM</p>
          <div className="flex flex-wrap gap-1.5">{programs.map(program => (
            <button key={program} type="button" aria-pressed={draft.programs.includes(program)} onClick={() => toggleProgram(program)}>
              <Chip active={draft.programs.includes(program)}>{program}</Chip>
            </button>
          ))}</div>
        </div>
        <div>
          <p className="mb-2 font-mono text-[9px] font-semibold tracking-[0.14em] text-ink/55">MESSAGING</p>
          <div className="grid grid-cols-3 gap-1 rounded-xl bg-page p-1">
            {(["Any", "Can message", "DMs off"] as const).map(option => (
              <button key={option} type="button" aria-pressed={draft.messaging === option} onClick={() => setDraft(current => ({ ...current, messaging: option }))}
                className={`rounded-lg px-2 py-2 text-[9px] transition-colors ${draft.messaging === option ? "bg-white font-medium text-brand shadow-sm" : "text-ink/55"}`}>
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-[#f7f5fc] p-3 text-[9px] leading-4 text-ink/55">More filters, including sessions and how you met, will be available as additional connection history is added.</div>
        <div className="flex gap-2 border-t border-border pt-3">
          <Button variant="ghost" onClick={onClose} className="flex-1">Cancel</Button>
          <Button onClick={() => onApply(draft)} className="flex-1">Show {connections.filter(connection => (!draft.programs.length || draft.programs.includes(connection.program)) && (draft.messaging === "Any" || (draft.messaging === "Can message" ? connection.dms : !connection.dms))).length} people</Button>
        </div>
      </div>
    </div>
  );
}

function SentList({ rows, setRows }: { rows: typeof sentInit; setRows: Dispatch<SetStateAction<typeof sentInit>> }) {
  const [confirm, setConfirm] = useState<string | null>(null);
  const [undo, setUndo] = useState<typeof sentInit[number] | null>(null);

  if (!rows.length) return (
    <Card className="py-9 text-center">
      <div className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-[#f2edff] text-brand">✓</div>
      <b className="mt-2 block text-xs">No requests out yet</b>
      <p className="mx-auto mt-1 max-w-xs text-[10px] leading-4 text-ink/55">Connecting works best while the session is still fresh in both your heads.</p>
      <Button variant="ghost" density="compact" className="mt-3">See who you met</Button>
    </Card>
  );

  return (
    <div className="space-y-2.5">
      {undo && <p className="flex justify-between rounded-lg bg-[#f7f5fc] p-3 text-[10px]">Request to {undo.name} withdrawn.<button type="button" className="text-brand" onClick={() => { setRows([...rows, undo]); setUndo(null); }}>Undo</button></p>}
      {rows.map(row => (
        <Card key={row.name} className="p-3 sm:p-4">
          <div className="flex items-center gap-3">
            <Avatar name={row.name} size={34} />
            <div className="min-w-0 flex-1">
              <b className="text-xs font-semibold">{row.name}</b>
              <p className="text-[9px] text-ink/55">{row.status}</p>
            </div>
            {row.status === "No response"
              ? <Button density="compact">Send again</Button>
              : <Button variant="ghost" density="compact" onClick={() => setConfirm(row.name)}>Withdraw</Button>}
          </div>
          {row.note && <p className="ml-[46px] mt-2 rounded-lg bg-[#f7f5fc] px-3 py-2 text-[10px] leading-4 text-ink/70">“{row.note}”</p>}
          {confirm === row.name && <div className="ml-[46px] mt-2 rounded-lg border border-border p-3 text-[9px] leading-4 text-ink/70">
            <p>{row.name} is never told you sent this — or that you took it back. <b>You won’t be able to request again for 30 days.</b></p>
            <div className="mt-2 flex justify-end gap-2">
              <Button variant="ghost" density="compact" onClick={() => setConfirm(null)}>Keep it</Button>
              <Button density="compact" onClick={() => { setRows(rows.filter(item => item.name !== row.name)); setUndo(row); setConfirm(null); }}>Withdraw</Button>
            </div>
          </div>}
        </Card>
      ))}
      <p className="text-[9px] text-ink/45">You’ll only hear back if someone accepts. Requests expire after 30 days.</p>
    </div>
  );
}
