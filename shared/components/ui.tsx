import { programColor, Program } from "@/shared/data/mock";
export const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) =>
  <section className={`rounded-2xl border border-border bg-surface p-5 ${className}`}>{children}</section>;
export const Avatar = ({ name, size = 40 }: { name: string; size?: number }) =>
  <span style={{ width: size, height: size }} className="grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-siher font-semibold text-white">{name[0]}</span>;
export const Button = ({ children, variant = "primary", ...p }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" }) =>
  <button {...p} className={`rounded-lg px-4 py-2 text-sm font-medium ${variant === "primary" ? "bg-brand-deep text-white" : "border border-border bg-white text-brand"}`}>{children}</button>;
export const Chip = ({ children, active }: { children: React.ReactNode; active?: boolean }) =>
  <span className={`rounded-full border px-3 py-1 text-sm ${active ? "border-brand-deep bg-brand-deep text-white" : "border-border bg-white"}`}>{children}</span>;
export const ProgramTag = ({ program }: { program: Program }) =>
  <span className={`font-mono text-[10px] uppercase tracking-wider ${programColor[program]}`}>{program}</span>;
export const PageHeader = ({ title, sub }: { title: string; sub?: string }) =>
  <header className="mb-5"><h1 className="text-3xl font-bold text-brand-deep">{title}</h1>{sub && <p className="text-sm text-ink/70">{sub}</p>}</header>;
