import { notFound } from "next/navigation";
import { getWorkout } from "@/lib/api";
import WorkoutDetails from "@/components/WorkoutDetails";
import ErrorState from "@/components/ErrorState";

export default async function WorkoutDetailPage({ params }) {
  const { id } = await params;

  let workout = null;
  let failed = false;

  try {
    workout = await getWorkout(id);
  } catch {
    failed = true;
  }

  if (failed) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <ErrorState message="Unable to load this workout right now." />
      </div>
    );
  }

  if (!workout) {
    notFound();
  }

  return <WorkoutDetails workout={workout} />;
}
