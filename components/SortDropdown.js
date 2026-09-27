"use client";

import { ChevronDown } from "lucide-react";

const OPTIONS = [
  { value: "duration", label: "Duration" },
  { value: "calories", label: "Calories" },
  { value: "rating", label: "Rating" },
];

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="relative inline-flex items-center">
      <label htmlFor="sort-by" className="sr-only">
        Sort By
      </label>
      <select
        id="sort-by"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-md border border-border bg-card-secondary py-2 pl-3 pr-9 text-xs font-bold uppercase tracking-wide text-text focus:border-accent"
      >
        {OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            Sort: {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-2.5 h-4 w-4 text-muted"
        aria-hidden="true"
      />
    </div>
  );
}
