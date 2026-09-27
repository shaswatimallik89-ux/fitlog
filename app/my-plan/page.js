"use client";

import { useMemo, useState } from "react";
import { useFitLog } from "@/context/FitLogContext";
import Metrics from "@/components/Metrics";
import Tabs from "@/components/Tabs";
import PlanCard from "@/components/PlanCard";
import EmptyState from "@/components/EmptyState";
import Loading from "@/components/Loading";

const TABS = [
  { value: "plan", label: "Today's Plan" },
  { value: "saved", label: "Saved" },
];

export default function MyPlanPage() {
  const {
    plan,
    saved,
    hydrated,
    removeFromPlan,
    removeSaved,
    markAsDone,
    isDone,
    showToast,
  } = useFitLog();
  const [tab, setTab] = useState("plan");

  const metrics = useMemo(() => {
    const exercises = plan.length;
    const minutes = plan.reduce((sum, w) => sum + (w.duration || 0), 0);
    const calories = plan.reduce((sum, w) => sum + (w.calories || 0), 0);
    return { exercises, minutes, calories };
  }, [plan]);

  const handleRemoveFromPlan = (workout) => {
    removeFromPlan(workout.id);
    showToast("Removed from today's plan");
  };

  const handleRemoveSaved = (workout) => {
    removeSaved(workout.id);
    showToast("Removed from saved");
  };

  const handleMarkDone = (workout) => {
    markAsDone(workout.id);
    showToast("Workout marked as done");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-text">
          My Plan
        </h1>
        <p className="mt-1 text-sm text-muted">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      <div className="mb-8">
        <Metrics
          exercises={metrics.exercises}
          minutes={metrics.minutes}
          calories={metrics.calories}
        />
      </div>

      <div className="mb-6">
        <Tabs tabs={TABS} active={tab} onChange={setTab} />
      </div>

      {!hydrated ? (
        <Loading label="Loading workouts…" />
      ) : tab === "plan" ? (
        plan.length === 0 ? (
          <EmptyState
            title="Nothing Here Yet"
            message="Browse the library and add a lift to get today moving."
            ctaLabel="Go to workouts"
            ctaHref="/"
          />
        ) : (
          <div className="flex flex-col gap-3">
            {plan.map((workout) => (
              <PlanCard
                key={workout.id}
                workout={workout}
                variant="plan"
                done={isDone(workout.id)}
                onMarkDone={() => handleMarkDone(workout)}
                onRemove={() => handleRemoveFromPlan(workout)}
              />
            ))}
          </div>
        )
      ) : saved.length === 0 ? (
        <EmptyState
          title="No Saved Lifts"
          message="Save a workout for later and it'll show up here."
          ctaLabel="Go to workouts"
          ctaHref="/"
        />
      ) : (
        <div className="flex flex-col gap-3">
          {saved.map((workout) => (
            <PlanCard
              key={workout.id}
              workout={workout}
              variant="saved"
              onRemove={() => handleRemoveSaved(workout)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
