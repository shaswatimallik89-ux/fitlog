function MetricBlock({ label, value }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-1 rounded-lg border border-border bg-card px-4 py-4 sm:items-start">
      <span className="font-display text-3xl font-bold text-accent">
        {value}
      </span>
      <span className="text-xs font-bold uppercase tracking-wide text-muted">
        {label}
      </span>
    </div>
  );
}

export default function Metrics({ exercises, minutes, calories }) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4">
      <MetricBlock label="Exercises" value={exercises} />
      <MetricBlock label="Minutes" value={minutes} />
      <MetricBlock label="Calories" value={calories} />
    </div>
  );
}
