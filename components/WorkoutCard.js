import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";

export default function WorkoutCard({ workout }) {
  const { id, name, image, category, equipment, duration, calories, rating } =
    workout;

  return (
    <Link
      href={`/workout/${id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-accent/60"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-card-secondary">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-wrap gap-1.5">
          {category.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded bg-accent/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-base font-bold uppercase leading-tight tracking-wide text-text">
          {name}
        </h3>

        <p className="text-xs text-muted">{equipment}</p>

        <div className="mt-auto flex items-center gap-4 pt-2 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            {duration} min
          </span>
          <span className="flex items-center gap-1">
            <Flame className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            {calories} kcal
          </span>
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            {rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
