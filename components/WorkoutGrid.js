"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getWorkouts } from "@/lib/api";
import WorkoutCard from "@/components/WorkoutCard";
import SortDropdown from "@/components/SortDropdown";
import Loading from "@/components/Loading";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";

export default function WorkoutGrid() {
  const [workouts, setWorkouts] = useState([]);
  const [status, setStatus] = useState("loading");
  const [sortBy, setSortBy] = useState("duration");

  const load = useCallback(() => {
    setStatus("loading");
    getWorkouts()
      .then((data) => {
        setWorkouts(data);
        setStatus("success");
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, [load]);

  const sorted = useMemo(() => {
    const copy = [...workouts];
    copy.sort((a, b) => {
      if (sortBy === "duration") return a.duration - b.duration;
      if (sortBy === "calories") return a.calories - b.calories;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
    return copy;
  }, [workouts, sortBy]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-end">
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      {status === "loading" && <Loading />}

      {status === "error" && (
        <ErrorState message="Unable to load workouts." onRetry={load} />
      )}

      {status === "success" && sorted.length === 0 && (
        <EmptyState
          title="No workouts yet"
          message="The library is empty right now. Check back soon."
        />
      )}

      {status === "success" && sorted.length > 0 && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sorted.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </div>
  );
}
