import { useCallback, useState } from "react";
import { ArrowLeft, Sprout } from "lucide-react";
import type { Repo } from "@/data/repos";
import { GardenObject } from "./GardenObject";
import { DetailPanel } from "./DetailPanel";
import { Clouds, Particles } from "./Particles";

interface Props {
  username: string;
  repos: Repo[];
  onReset: () => void;
}

export function GardenScene({ username, repos, onReset }: Props) {
  const [selected, setSelected] = useState<Repo | null>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setParallax({
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5,
    });
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden sky-bg">
      <Clouds />
      <Particles />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(65%_50%_at_50%_45%,transparent_35%,oklch(0.2_0.05_290/0.55)_100%)]" />

      <header className="relative z-30 mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-6 sm:px-8">
        <button
          onClick={onReset}
          className="flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-bold backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-secondary"
        >
          <ArrowLeft className="size-4" /> Replant
        </button>
        <div className="text-right">
          <p className="font-display text-lg leading-tight sm:text-xl">@{username}'s garden</p>
          <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {repos.length} growing things
          </p>
        </div>
      </header>

      {repos.length === 0 ? (
        <EmptyGarden onReset={onReset} />
      ) : (
        <div
          onMouseMove={handleMove}
          onMouseLeave={() => setParallax({ x: 0, y: 0 })}
          className="relative mx-auto h-[64vh] min-h-[440px] w-full max-w-6xl px-2 sm:h-[72vh]"
        >
          <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id="hill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.55 0.07 175 / 0.32)" />
                <stop offset="100%" stopColor="oklch(0.4 0.06 180 / 0.05)" />
              </linearGradient>
            </defs>
            <path d="M0 74 Q 22 58 44 70 T 100 60 L100 100 L0 100 Z" fill="url(#hill)" />
            <path d="M0 88 Q 30 76 58 86 T 100 80 L100 100 L0 100 Z" fill="oklch(0.5 0.07 172 / 0.22)" />
            <path
              d="M6 97 C 24 84, 28 64, 46 60 S 72 54, 92 34"
              fill="none"
              stroke="oklch(0.95 0.04 88 / 0.24)"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeDasharray="5 5"
              className="animate-shimmer"
            />
            <path
              d="M18 99 C 38 90, 56 90, 74 74"
              fill="none"
              stroke="oklch(0.95 0.04 88 / 0.13)"
              strokeWidth="1.6"
              strokeDasharray="2 6"
            />
            <path
              d="M40 24 C 48 34, 52 44, 54 46"
              fill="none"
              stroke="oklch(0.9 0.06 300 / 0.16)"
              strokeWidth="1.2"
              strokeDasharray="1 5"
            />
          </svg>

          {repos.map((repo, i) => (
            <GardenObject
              key={repo.id}
              repo={repo}
              index={i}
              active={selected?.id === repo.id}
              dimmed={!!selected && selected.id !== repo.id}
              parallax={parallax}
              onSelect={(r) => setSelected((prev) => (prev?.id === r.id ? null : r))}
            />
          ))}
        </div>
      )}

      <p className="relative z-10 pb-8 text-center text-xs tracking-wide text-muted-foreground">
        Wander the map · tap any glowing thing to hear its story
      </p>

      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 ground-bg opacity-90 [clip-path:ellipse(125%_100%_at_50%_100%)]" />

      <DetailPanel repo={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function EmptyGarden({ onReset }: { onReset: () => void }) {
  return (
    <div className="relative z-10 mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
      <Sprout className="size-12 animate-bob text-accent" />
      <h2 className="text-3xl">This soil is still bare</h2>
      <p className="text-sm leading-relaxed text-muted-foreground">
        No public repositories found. Plant a different gardener's name and watch something sprout.
      </p>
      <button
        onClick={onReset}
        className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:scale-105"
      >
        Try another name
      </button>
    </div>
  );
}
