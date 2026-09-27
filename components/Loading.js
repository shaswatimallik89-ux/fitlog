import { Loader2 } from "lucide-react";

export default function Loading({ label = "Loading workouts…" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
      <Loader2 className="h-8 w-8 animate-spin-slow text-accent" aria-hidden="true" />
      <p className="text-sm font-medium uppercase tracking-wide text-muted">
        {label}
      </p>
    </div>
  );
}
