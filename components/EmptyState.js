import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function EmptyState({
  title,
  message,
  ctaLabel,
  ctaHref,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border bg-card/40 px-6 py-16 text-center">
      <h3 className="font-display text-xl font-bold uppercase tracking-wide text-text">
        {title}
      </h3>
      <p className="max-w-sm text-sm text-muted">{message}</p>
      {ctaLabel && ctaHref ? (
        <Link
          href={ctaHref}
          className="mt-3 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-background transition-transform hover:scale-105"
        >
          {ctaLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  );
}
