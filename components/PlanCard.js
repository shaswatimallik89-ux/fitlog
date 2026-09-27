import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star, CheckCircle2, X, Circle } from "lucide-react";

export default function PlanCard({
  workout,
  variant,
  done = false,
  onMarkDone,
  onRemove,
}) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center ${
        done ? "opacity-60" : ""
      }`}
    >
      <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-md bg-card-secondary sm:h-16 sm:w-24">
        {workout.image ? (
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="120px"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="flex-1">
        <h3 className="font-display text-base font-bold uppercase tracking-wide text-text">
          {workout.name}
        </h3>
        <p className="text-xs text-muted">{workout.equipment}</p>
        <div className="mt-1.5 flex items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            {workout.calories} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <Link
          href={`/workout/${workout.id}`}
          className="rounded-md border border-border px-3 py-2 text-xs font-bold uppercase tracking-wide text-text transition-colors hover:border-accent hover:text-accent"
        >
          View Details
        </Link>

        {variant === "plan" && (
          <button
            type="button"
            onClick={onMarkDone}
            disabled={done}
            aria-label={done ? "Workout completed" : "Mark as done"}
            className="flex items-center gap-1.5 rounded-md bg-accent px-3 py-2 text-xs font-bold uppercase tracking-wide text-background transition-transform enabled:hover:scale-105 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {done ? (
              <CheckCircle2 className="h-3.5 w-3.5" />
            ) : (
              <Circle className="h-3.5 w-3.5" />
            )}
            <span className="hidden sm:inline">
              {done ? "Done" : "Mark as Done"}
            </span>
          </button>
        )}

        <button
          type="button"
          onClick={onRemove}
          aria-label={
            variant === "plan"
              ? `Remove ${workout.name} from today's plan`
              : `Remove ${workout.name} from saved`
          }
          className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-accent hover:text-accent"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
