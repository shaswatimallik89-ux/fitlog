import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center justify-center gap-4 px-4 py-28 text-center sm:px-6">
      <span className="font-display text-7xl font-bold text-accent">404</span>
      <h1 className="font-display text-2xl font-bold uppercase tracking-wide text-text">
        Page Not Found
      </h1>
      <p className="text-sm text-muted">
        The workout or page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-background transition-transform hover:scale-105"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Workouts
      </Link>
    </div>
  );
}
