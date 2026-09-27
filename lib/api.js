const BASE_URL = "https://api.abcz.workers.dev/api/fitlog";

function normalizeWorkout(raw) {
  if (!raw || typeof raw !== "object") return null;

  const id = raw.id ?? raw._id ?? raw.workoutId ?? null;
  const name = raw.name ?? raw.title ?? "Untitled Workout";
  const image = raw.image ?? raw.img ?? raw.thumbnail ?? "";
  const category =
    raw.muscleGroups ?? raw.category ?? raw.categories ?? raw.tags ?? [];
  const equipment = raw.equipment ?? raw.gear ?? "Bodyweight";
  const difficulty = raw.difficulty ?? raw.level ?? "Beginner";
  const duration = Number(raw.duration ?? raw.time ?? 0);
  const calories = Number(raw.caloriesBurned ?? raw.calories ?? 0);
  const sets = raw.sets ?? null;
  const reps = raw.reps ?? null;
  const rating = Number(raw.rating ?? 0);
  const description = raw.description ?? raw.desc ?? "";
  const instructions = Array.isArray(raw.instructions)
    ? raw.instructions
    : Array.isArray(raw.steps)
    ? raw.steps
    : [];

  return {
    id,
    name,
    image,
    category: Array.isArray(category) ? category : [category].filter(Boolean),
    equipment,
    difficulty,
    duration,
    calories,
    sets,
    reps,
    rating,
    description,
    instructions,
  };
}

export async function getWorkouts() {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to load workouts (status ${res.status})`);
  }
  const data = await res.json();
  const list = Array.isArray(data) ? data : data?.workouts ?? data?.data ?? [];
  return list.map(normalizeWorkout).filter(Boolean);
}

export async function getWorkout(id) {
  if (!id) return null;
  const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Failed to load workout ${id} (status ${res.status})`);
  }
  const data = await res.json();
  const raw = Array.isArray(data) ? data[0] : data?.workout ?? data;
  return normalizeWorkout(raw);
}
