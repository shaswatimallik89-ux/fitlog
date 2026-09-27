"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";

export default function ErrorState({
  message = "Unable to load workouts.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card/40 px-6 py-16 text-center">
      <AlertTriangle className="h-8 w-8 text-accent" aria-hidden="true" />
      <p className="text-sm font-semibold text-text">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-xs font-bold uppercase tracking-wide text-text transition-colors hover:border-accent hover:text-accent"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Try again
        </button>
      ) : null}
    </div>
  );
}
