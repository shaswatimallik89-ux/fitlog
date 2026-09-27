"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const FitLogContext = createContext(null);

const STORAGE_KEY = "fitlog-state-v1";
const PLAN_LIMIT = 5;

function loadInitialState() {
  if (typeof window === "undefined") {
    return { plan: [], saved: [], done: [] };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { plan: [], saved: [], done: [] };
    const parsed = JSON.parse(raw);
    return {
      plan: Array.isArray(parsed.plan) ? parsed.plan : [],
      saved: Array.isArray(parsed.saved) ? parsed.saved : [],
      done: Array.isArray(parsed.done) ? parsed.done : [],
    };
  } catch {
    return { plan: [], saved: [], done: [] };
  }
}

export function FitLogProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [done, setDone] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState(null);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const initial = loadInitialState();
    setPlan(initial.plan);
    setSaved(initial.saved);
    setDone(initial.done);
    setHydrated(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ plan, saved, done })
      );
    } catch {
    }
  }, [plan, saved, done, hydrated]);

  const showToast = useCallback((message) => {
    setToast({ message, id: Date.now() });
  }, []);

  const isInPlan = useCallback(
    (id) => plan.some((w) => String(w.id) === String(id)),
    [plan]
  );

  const isSaved = useCallback(
    (id) => saved.some((w) => String(w.id) === String(id)),
    [saved]
  );

  const isDone = useCallback(
    (id) => done.includes(String(id)),
    [done]
  );

  const isPlanFull = plan.length >= PLAN_LIMIT;

  const addToPlan = useCallback(
    (workout) => {
      if (!workout?.id) return;
      setPlan((prev) => {
        if (prev.some((w) => String(w.id) === String(workout.id))) {
          return prev;
        }
        if (prev.length >= PLAN_LIMIT) {
          return prev;
        }
        return [...prev, workout];
      });
    },
    []
  );

  const removeFromPlan = useCallback((id) => {
    setPlan((prev) => prev.filter((w) => String(w.id) !== String(id)));
  }, []);

  const saveWorkout = useCallback((workout) => {
    if (!workout?.id) return;
    setSaved((prev) => {
      if (prev.some((w) => String(w.id) === String(workout.id))) {
        return prev;
      }
      return [...prev, workout];
    });
  }, []);

  const removeSaved = useCallback((id) => {
    setSaved((prev) => prev.filter((w) => String(w.id) !== String(id)));
  }, []);

  const markAsDone = useCallback((id) => {
    setDone((prev) =>
      prev.includes(String(id)) ? prev : [...prev, String(id)]
    );
  }, []);

  const value = useMemo(
    () => ({
      plan,
      saved,
      done,
      hydrated,
      isPlanFull,
      planLimit: PLAN_LIMIT,
      addToPlan,
      removeFromPlan,
      saveWorkout,
      removeSaved,
      markAsDone,
      isInPlan,
      isSaved,
      isDone,
      toast,
      showToast,
      clearToast: () => setToast(null),
    }),
    [
      plan,
      saved,
      done,
      hydrated,
      isPlanFull,
      addToPlan,
      removeFromPlan,
      saveWorkout,
      removeSaved,
      markAsDone,
      isInPlan,
      isSaved,
      isDone,
      toast,
      showToast,
    ]
  );

  return (
    <FitLogContext.Provider value={value}>{children}</FitLogContext.Provider>
  );
}

export function useFitLog() {
  const ctx = useContext(FitLogContext);
  if (!ctx) {
    throw new Error("useFitLog must be used within a FitLogProvider");
  }
  return ctx;
}
