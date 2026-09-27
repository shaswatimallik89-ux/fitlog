import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
      <div className="grid grid-cols-1 items-center gap-8 rounded-2xl border border-border bg-card px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-4 text-center lg:text-left">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Workout Library
          </span>
          <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-wide text-text sm:text-5xl">
            Train With Intent.
            <br />
            Log Every Set.
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            href="#library"
            className="mt-2 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-bold uppercase tracking-wide text-background transition-transform hover:scale-105"
          >
            Browse Workouts
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mx-auto w-full max-w-xs lg:max-w-sm">
          <Image
            src="/hero.png"
            alt="Anatomical illustration of a lifter on a gym machine"
            width={334}
            height={334}
            priority
            className="mx-auto h-auto w-full object-contain"
          />
        </div>
      </div>
    </section>
  );
}
