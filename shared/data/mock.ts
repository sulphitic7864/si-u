export type Program = "Grow3dge" | "Si Her" | "Well-Being" | "Explorer";
export const programColor: Record<Program, string> = {
  Grow3dge: "text-grow3dge", "Si Her": "text-siher", "Well-Being": "text-wellbeing", Explorer: "text-explorer" };
export const me = { name: "Julienne Cho", handle: "julienne.siu", tagline: "Emerging Tech Adoption Leader | Web3 Connector", members: 1156, communities: 44 };
export const sessions = [
  { id: 1, title: "Leading Without Losing Yourself", host: "Zuza Zuber", program: "Si Her" as Program, live: true, attending: 33, date: "2026-04-01", time: "10:00 PM" },
  { id: 2, title: "How to Sell B2B in Web3", host: "Sandy Martinez", program: "Grow3dge" as Program, live: false, attending: 7, date: "2026-04-02", time: "10:00 PM" },
];
export const connectionStats = { total: 1140, guides: 48, explorers: 1092, online: 12, live: 3 };
export const connections = [
  { name: "Zuza Zuber", handle: "zuza.siu", role: "Leadership Coach · Founder, Si Her", program: "Si Her" as Program, guide: true, live: true, presence: "live", dms: true },
  { name: "Amber Cardera", handle: "amber.siu", role: "Product-Led Growth · Grow3dge", program: "Grow3dge" as Program, guide: false, live: true, presence: "live", dms: true },
  { name: "Kara Howard", handle: "kara.siu", role: "Founder, SI U · Grow3dge", program: "Grow3dge" as Program, guide: true, live: false, presence: "offline", dms: false },
  { name: "Mira Okonkwo", handle: "mira.siu", role: "Community Ops · MoonDAO", program: "Well-Being" as Program, guide: false, live: false, presence: "online", dms: true },
  { name: "Sandy Martinez", handle: "sandy.siu", role: "Web3 Sales · Grow3dge", program: "Grow3dge" as Program, guide: true, live: false, presence: "online", dms: true },
  { name: "Lila Hernandez", handle: "lila.siu", role: "Ecosystem Growth · Well-Being", program: "Well-Being" as Program, guide: false, live: false, presence: "offline", dms: true },
  { name: "Priya Raman", handle: "priya.siu", role: "Protocol Research · Grow3dge", program: "Grow3dge" as Program, guide: false, live: false, presence: "offline", dms: true },
  { name: "James Ko", handle: "jamesko.siu", role: "Product Lead · Stripe", program: "Grow3dge" as Program, guide: false, live: false, presence: "offline", dms: true },
];
export const posts: Array<{
  id: number;
  author: string;
  tag: Program;
  meta: string;
  body: string;
  reactions: Record<string, number>;
  media?: "landscape" | "gallery";
  mediaCount?: number;
  avatar?: string;
}> = [
  { id: 1, author: "Amber Cardera", tag: "Grow3dge", meta: "Product-Led Growth · Grow3dge · 2h ago", body: "Just wrapped “Mastering AI Automations” — what energy in the room. Huge gratitude to everyone who showed up. Your badges are live. ✨", reactions: { Support: 24, Insightful: 9, Connect: 2 }, avatar: "/assets/Rectangle4.png" },
  { id: 2, author: "Lila Hernandez", tag: "Si Her", meta: "Ecosystem Growth · Well-Being · 2h ago", body: "At a Web3 conference, we can draw inspiration from the majestic mountains that tower above us, reaching for the clouds. They symbolize the enduring guardianship of innovation in our digital landscape…", reactions: { Support: 18, Insightful: 7, Connect: 3 }, media: "landscape", avatar: "/assets/Group2147232031.png" },
];
export const requests = [
  { name: "Lena Nguyen", role: "Leadership Coach · Founder, Si Her", badge: "Guide", connections: "2 shared connections", age: "2d ago", online: true, note: "Your question about holding boundaries without going cold — I’ve been chewing on it since. Would love to keep that conversation going.", session: "Leading Without Losing Yourself" },
  { name: "Priya Raman", role: "Protocol Research", badge: "Explorer", connections: "No shared connections", age: "5d ago", online: false, note: "I was the one who asked the awkward question about token vesting at the end. Still thinking about your answer.", session: "Tokenomics 101" },
];
export const met = [
  { name: "Amber Cardera", role: "Product-Led Growth · Grow3dge", badge: "Explorer", activity: "attended", session: "Mastering AI Automations", day: "Tue", left: "5 days left", status: "away" },
  { name: "Zuza Zuber", role: "Leadership Coach · Si Her", badge: "Guide", activity: "led", session: "Leading Without Losing Yourself", day: "Tue", left: "2 days left", status: "offline" },
  { name: "Mira Okonkwo", role: "Community Ops · MoonDAO", badge: "Explorer", activity: "attended", session: "Focus Rituals for Deep Work", day: "Mon", left: "1 day left", status: "online" },
  { name: "Sandy Martinez", role: "Web3 Sales · Grow3dge", badge: "Guide", activity: "led", session: "Your First On-Chain Credential", day: "Mon", left: "1 day left", status: "offline" },
];
export const profileSessions = [
  { title: "Leading Without Losing Yourself", role: "LED", meta: "SI Her · 1 Apr 2026 · 128 attended" },
  { title: "How to Sell B2B in Web3", role: "ATTENDED", meta: "Grow3dge · 24 Mar 2026 · 64 attended" },
  { title: "Designing for Trust in Web3", role: "LED", meta: "Grow3dge · 12 Mar 2026 · 96 attended" },
];
export type LearnSession = {
  time: string;
  duration: string;
  title: string;
  description: string;
  host: string;
  program: Program;
  n: number;
  state: "live" | "attending" | "open";
};
export const learnToday: LearnSession[] = [
  { time: "10:00 AM", duration: "1 hr", title: "SI Her DAO in 2026", description: "How to foster collaboration, trust and well-being in fast-moving Web3 ecosystems.", host: "Zuza Zuber", program: "Si Her", n: 41, state: "live" },
  { time: "6:00 PM", duration: "45 min", title: "Your First On-Chain Credential", description: "Explore how on-chain credentials can make learning visible and portable.", host: "Sandy Martinez", program: "Explorer", n: 63, state: "attending" },
];
export const learnTomorrow: LearnSession[] = [
  { time: "09:00 AM", duration: "1 hr", title: "Focus Rituals for Deep Work", description: "Build rituals for focus, energy and sustainable creative work.", host: "Mira Okonkwo", program: "Well-Being", n: 12, state: "open" },
  { time: "10:00 AM", duration: "1 hr", title: "Community Engagement with MoonDAO", description: "Practical ways to welcome and support new contributors.", host: "Hana Howard", program: "Grow3dge", n: 18, state: "open" },
];
export const replays = [{ t: "DeFi Fundamentals: A Deep Dive", p: "Grow3dge" as Program, d: "45 min" }, { t: "Building Resilience in Bear Markets", p: "Well-Being" as Program, d: "45 min" }, { t: "The Future of DAO Governance", p: "Explorer" as Program, d: "50 min" }];
export const summaries = [
  { t: "Tokenomics 101: Value Capture", p: "Grow3dge" as Program, pts: ["Supply mechanics determine long-term value", "Utility must raise speculation for sustainable growth", "Vesting schedules shape community trust"] },
  { t: "Mental Health in High-Speed Environments", p: "Well-Being" as Program, pts: ["Burnout signals appear about 3 months before a crash", "Micro-breaks raise cognitive performance by 25%", "Digital boundaries are essential for remote work health"] },
  { t: "Cross-Chain Interoperability", p: "Explorer" as Program, pts: ["Bridges remain the biggest security vulnerability in DeFi", "Layer 2 rollups are solving the fragmentation issue", "User experience is the key barrier to mass adoption"] },
];
