import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-6 sm:flex-row sm:justify-between sm:px-6">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="" width={18} height={18} aria-hidden="true" />
          <span className="font-display text-sm font-bold uppercase tracking-wide text-text">
            FitLog
          </span>
        </div>
        <p className="text-center text-xs text-muted">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
