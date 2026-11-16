export type Program = "Grow3dge" | "Si Her" | "Well-Being" | "Explorer";
export const programColor: Record<Program, string> = {
  Grow3dge: "text-grow3dge", "Si Her": "text-siher", "Well-Being": "text-wellbeing", Explorer: "text-explorer" };
export const me = { name: "Julienne Cho", handle: "julienne.siu", tagline: "Emerging Tech Adoption Leader | Web3 Connector", members: 1156, communities: 44 };
export const sessions = [
  { id: 1, title: "Leading Without Losing Yourself", host: "Zuza Zuber", program: "Si Her" as Program, live: true, attending: 33 },
  { id: 2, title: "How to Sell B2B in Web3", host: "Sandy Martinez", program: "Grow3dge" as Program, live: false, attending: 7 },
];
export const connections = [
  { name: "Zuza Zuber", handle: "zuza.siu", role: "Leadership Coach · Founder, Si Her", live: true },
  { name: "Amber Cardera", handle: "amber.siu", role: "Product-Led Growth · Grow3dge", live: true },
  { name: "Mira Okonkwo", handle: "mira.siu", role: "Community Ops · MoonDAO", live: false },
];
export const posts = [
  { id: 1, author: "Amber Cardera", tag: "Grow3dge", meta: "Product-Led Growth · 2h ago", body: "Just wrapped “Mastering AI Automations” — what energy in the room. Huge gratitude to everyone who showed up. Your badges are live.", reactions: { Support: 24, Insightful: 9, Connect: 2 } },
];
export const requests = [
  { name: "Lena Nguyen", role: "Leadership Coach · Founder, Si Her", note: "Your question about holding boundaries without going cold — I’ve been chewing on it since.", session: "Leading Without Losing Yourself" },
  { name: "Priya Raman", role: "Protocol Research", note: "I was the one who asked the awkward question about token vesting at the end.", session: "Tokenomics 101" },
];
export const met = [
  { name: "Amber Cardera", ctx: "You both attended Mastering AI Automations", left: "5 days left" },
  { name: "Zuza Zuber", ctx: "She led Leading Without Losing Yourself", left: "2 days left" },
];
export const profileSessions = [
  { title: "Leading Without Losing Yourself", role: "LED", meta: "SI Her · 1 Apr 2026 · 128 attended" },
  { title: "How to Sell B2B in Web3", role: "ATTENDED", meta: "Grow3dge · 24 Mar 2026 · 64 attended" },
  { title: "Designing for Trust in Web3", role: "LED", meta: "Grow3dge · 12 Mar 2026 · 96 attended" },
];
export const learnToday = [
  { time: "10:00 AM", title: "SI Her DAO in 2026", host: "Zuza Zuber", program: "Si Her" as Program, n: 41, state: "live" },
  { time: "6:00 PM", title: "Your First On-Chain Credential", host: "Sandy Martinez", program: "Explorer" as Program, n: 63, state: "attending" },
  { time: "9:00 AM", title: "Focus Rituals for Deep Work", host: "Mira Okonkwo", program: "Well-Being" as Program, n: 12, state: "open" },
];
export const replays = [{ t: "DeFi Fundamentals: A Deep Dive", p: "Grow3dge" as Program, d: "45 min" }, { t: "Building Resilience in Bear Markets", p: "Well-Being" as Program, d: "45 min" }, { t: "The Future of DAO Governance", p: "Explorer" as Program, d: "50 min" }];
export const summaries = [{ t: "Tokenomics 101: Value Capture", p: "Grow3dge" as Program, pts: ["Supply mechanics determine long-term value", "Utility must raise speculation for sustainable growth"] }, { t: "Mental Health in High-Speed Environments", p: "Well-Being" as Program, pts: ["Burnout signals appear about 3 months before a crash", "Digital boundaries are essential for remote work health"] }];
