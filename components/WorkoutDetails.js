"use client";

import Image from "next/image";
import { CalendarPlus, Bookmark, BookmarkCheck, CheckCircle2 } from "lucide-react";
import { useFitLog } from "@/context/FitLogContext";

function SpecRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-border py-2.5 last:border-b-0">
      <span className="text-xs font-bold uppercase tracking-wide text-muted">
        {label}
      </span>
      <span className="text-sm font-semibold text-text">{value}</span>
    </div>
  );
}

export default function WorkoutDetails({ workout }) {
  const {
    addToPlan,
    saveWorkout,
    isInPlan,
    isSaved,
    isPlanFull,
    planLimit,
    showToast,
  } = useFitLog();

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);

  const handleAddToPlan = () => {
    if (inPlan || isPlanFull) return;
    addToPlan(workout);
    showToast("Added to today's plan");
  };

  const handleSave = () => {
    if (saved) return;
    saveWorkout(workout);
    showToast("Saved for later");
  };

  const addLabel = inPlan
    ? "Already in today's plan"
    : isPlanFull
    ? `Plan full (${planLimit}/${planLimit})`
    : "Add to today's plan";

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-card-secondary">
          {workout.image ? (
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          ) : null}
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <div className="mb-2 flex flex-wrap gap-1.5">
              {workout.category.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-accent/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-display text-3xl font-bold uppercase leading-tight tracking-wide text-text sm:text-4xl">
              {workout.name}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {workout.description}
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card px-4">
            <SpecRow label="Equipment" value={workout.equipment} />
            <SpecRow label="Difficulty" value={workout.difficulty} />
            {workout.sets != null && (
              <SpecRow label="Sets" value={workout.sets} />
            )}
            {workout.reps != null && (
              <SpecRow label="Reps" value={workout.reps} />
            )}
            <SpecRow label="Duration" value={`${workout.duration} min`} />
            <SpecRow label="Calories" value={`${workout.calories} kcal`} />
            <SpecRow label="Rating" value={workout.rating} />
          </div>

          {workout.instructions.length > 0 && (
            <div>
              <h2 className="font-display text-lg font-bold uppercase tracking-wide text-text">
                Instructions
              </h2>
              <ol className="mt-3 flex flex-col gap-3">
                {workout.instructions.map((step, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-muted">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent">
                      {idx + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              type="button"
              onClick={handleAddToPlan}
              disabled={inPlan || isPlanFull}
              className="flex flex-1 items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-bold uppercase tracking-wide text-background transition-transform enabled:hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {inPlan ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <CalendarPlus className="h-4 w-4" />
              )}
              {addLabel}
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saved}
              className="flex flex-1 items-center justify-center gap-2 rounded-md border border-border px-5 py-3 text-sm font-bold uppercase tracking-wide text-text transition-colors enabled:hover:border-accent enabled:hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saved ? (
                <BookmarkCheck className="h-4 w-4" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
              {saved ? "Saved for later" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
