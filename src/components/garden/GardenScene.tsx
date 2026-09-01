import { useState } from "react";
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

  return (
    <section className="relative min-h-screen overflow-hidden sky-bg">
      <Clouds />
      <Particles />

      <header className="relative z-30 flex flex-wrap items-center justify-between gap-3 px-5 py-5 sm:px-8">
        <button
          onClick={onReset}
          className="flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-semibold transition-colors hover:bg-secondary"
        >
          <ArrowLeft className="size-4" /> Replant
        </button>
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground font-bold">@{username}</span>'s garden ·{" "}
          {repos.length} growing things
        </p>
      </header>

      {repos.length === 0 ? (
        <EmptyGarden onReset={onReset} />
      ) : (
        <div className="relative mx-auto h-[62vh] min-h-[420px] w-full max-w-6xl sm:h-[70vh]">
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            <path
              d="M8 96 C 26 82, 30 62, 48 58 S 74 52, 92 30"
              fill="none"
              stroke="oklch(0.85 0.05 90 / 0.18)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeDasharray="5 4"
            />
            <path
              d="M20 98 C 38 88, 56 88, 74 72"
              fill="none"
              stroke="oklch(0.85 0.05 90 / 0.1)"
              strokeWidth="1.6"
              strokeDasharray="3 5"
            />
          </svg>

          {repos.map((repo, i) => (
            <GardenObject
              key={repo.id}
              repo={repo}
              index={i}
              active={selected?.id === repo.id}
              onSelect={setSelected}
            />
          ))}
        </div>
      )}

      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 ground-bg [clip-path:ellipse(120%_100%_at_50%_100%)]" />

      <DetailPanel repo={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function EmptyGarden({ onReset }: { onReset: () => void }) {
  return (
    <div className="relative z-10 mx-auto flex min-h-[50vh] max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
      <Sprout className="size-12 text-accent animate-bob" />
      <h2 className="text-2xl">This soil is still bare</h2>
      <p className="text-sm text-muted-foreground">
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
