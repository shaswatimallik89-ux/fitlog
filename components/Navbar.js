"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFitLog } from "@/context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();

  const navLink = (href, label) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        className={`text-sm font-semibold uppercase tracking-wide transition-colors ${
          active ? "text-accent" : "text-muted hover:text-text"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={24} height={24} />
          <span className="font-display text-lg font-bold uppercase tracking-wide text-text">
            FitLog
          </span>
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          {navLink("/", "Workout")}
          {navLink("/my-plan", "My Plan")}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-background transition-transform hover:scale-105"
            aria-label={`Plan: ${plan.length} workouts`}
          >
            Plan
            <span className="rounded-full bg-background/20 px-1.5 py-0.5 text-[11px] leading-none">
              {plan.length}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full border border-border bg-transparent px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-text transition-colors hover:border-accent"
            aria-label={`Saved: ${saved.length} workouts`}
          >
            Saved
            <span className="rounded-full bg-card-secondary px-1.5 py-0.5 text-[11px] leading-none text-muted">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>

      <nav className="flex items-center gap-6 border-t border-border px-4 py-2 sm:hidden">
        {navLink("/", "Workout")}
        {navLink("/my-plan", "My Plan")}
      </nav>
    </header>
  );
}
