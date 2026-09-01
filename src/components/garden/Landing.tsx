import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Clouds, Particles } from "./Particles";

interface Props {
  loading: boolean;
  error: string | null;
  onPlant: (username: string) => void;
}

export function Landing({ loading, error, onPlant }: Props) {
  const [value, setValue] = useState("");

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden sky-bg px-6 py-20 text-center">
      <Clouds />
      <Particles />

      <div className="relative z-10 max-w-2xl animate-fade-up">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          <Sparkles className="size-3.5" /> Repo Garden
        </p>
        <h1 className="text-glow text-5xl leading-[1.05] sm:text-7xl">Grow your code garden</h1>
        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
          Every repository you've ever pushed becomes a glowing plant, a curious creature, or a
          little tower of light. Type a name and watch the soil wake up.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onPlant(value.trim());
          }}
          className="mx-auto mt-9 flex w-full max-w-md flex-col gap-3 sm:flex-row"
        >
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="github username"
            aria-label="GitHub username"
            className="min-w-0 flex-1 rounded-full border border-border bg-card/60 px-5 py-3.5 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105 disabled:opacity-60 disabled:hover:scale-100"
          >
            {loading ? "Planting…" : "Plant my repos"}
          </button>
        </form>

        {error && (
          <p role="alert" className="mt-4 text-sm font-semibold text-destructive">
            {error}
          </p>
        )}

        {loading && <LoadingSprouts />}
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-44 ground-bg [clip-path:ellipse(130%_100%_at_50%_100%)]" />
    </main>
  );
}

function LoadingSprouts() {
  return (
    <div className="mt-10 flex items-end justify-center gap-3" aria-live="polite">
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="block w-3 rounded-full bg-accent animate-bob"
          style={{ height: 16 + i * 8, animationDelay: `${i * 140}ms`, boxShadow: "0 0 14px currentColor" }}
        />
      ))}
      <span className="sr-only">Growing your garden…</span>
    </div>
  );
}
