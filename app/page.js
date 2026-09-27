import Hero from "@/components/Hero";
import WorkoutGrid from "@/components/WorkoutGrid";

export default function HomePage() {
  return (
    <div className="pb-16">
      <Hero />

      <section id="library" className="mx-auto max-w-7xl px-4 pt-14 sm:px-6">
        <div className="mb-6">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide text-text sm:text-3xl">
            The Library
          </h2>
          <p className="mt-1 text-sm text-muted">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <WorkoutGrid />
      </section>
    </div>
  );
}
