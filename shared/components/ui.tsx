import Image from "next/image";
import { programColor, Program } from "@/shared/data/mock";
export const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) =>
  <section className={`rounded-2xl border border-border bg-surface p-5 ${className}`}>{children}</section>;
export const Avatar = ({ name, size = 40, shape = "circle", src }: { name: string; size?: number; shape?: "circle" | "rounded"; src?: string }) =>
  <span style={{ width: size, height: size }} className={`relative grid shrink-0 place-items-center overflow-hidden ${shape === "circle" ? "rounded-full" : "rounded-xl"} ${src ? "bg-white" : "bg-gradient-to-br from-brand to-siher font-semibold text-white"}`}>
    {src ? <Image src={src} alt={name} fill sizes={`${size}px`} className="object-cover" /> : name[0]}
  </span>;
export const Button = ({ children, variant = "primary", density = "default", className = "", ...p }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost"; density?: "default" | "compact" }) =>
  <button {...p} className={`rounded-lg font-medium ${density === "compact" ? "px-3 py-1 text-[10px]" : "px-4 py-2 text-sm"} ${variant === "primary" ? "bg-brand-deep text-white" : "border border-border bg-white text-brand"} ${className}`}>{children}</button>;
export const Chip = ({ children, active }: { children: React.ReactNode; active?: boolean }) =>
  <span className={`rounded-full border px-3 py-1 text-sm ${active ? "border-brand-deep bg-brand-deep text-white" : "border-border bg-white"}`}>{children}</span>;
export const ProgramTag = ({ program }: { program: Program }) =>
  <span className={`font-mono text-[10px] uppercase tracking-wider ${programColor[program]}`}>{program}</span>;
export const PageHeader = ({ title, sub }: { title: string; sub?: string }) =>
  <header className="mb-5"><h1 className="text-xl font-semibold text-brand-deep">{title}</h1>{sub && <p className="text-sm text-ink/70">{sub}</p>}</header>;
