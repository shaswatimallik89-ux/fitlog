"use client";

import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { useFitLog } from "@/context/FitLogContext";

export default function Toast() {
  const { toast, clearToast } = useFitLog();

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => clearToast(), 2400);
    return () => clearTimeout(timer);
  }, [toast, clearToast]);

  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-5 left-1/2 z-[100] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 animate-[fadeInUp_0.2s_ease-out]"
    >
      <div className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3 shadow-lg shadow-black/40">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-[var(--accent)]" />
        <p className="text-sm font-medium text-[var(--text)]">{toast.message}</p>
      </div>
    </div>
  );
}
