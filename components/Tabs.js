"use client";

export default function Tabs({ tabs, active, onChange }) {
  return (
    <div
      role="tablist"
      className="inline-flex rounded-lg border border-border bg-card p-1"
    >
      {tabs.map((tab) => {
        const isActive = tab.value === active;
        return (
          <button
            key={tab.value}
            role="tab"
            type="button"
            aria-selected={isActive}
            onClick={() => onChange(tab.value)}
            className={`rounded-md px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
              isActive
                ? "bg-accent text-background"
                : "text-muted hover:text-text"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
