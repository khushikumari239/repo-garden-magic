import { Sparkles, Star, X } from "lucide-react";
import type { Repo } from "@/data/repos";

export function DetailPanel({ repo, onClose }: { repo: Repo | null; onClose: () => void }) {
  if (!repo) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-background/60 backdrop-blur-[2px] md:hidden"
        onClick={onClose}
        aria-hidden
      />
      <aside
        role="dialog"
        aria-label={`${repo.name} details`}
        className="glass-panel fixed inset-x-3 bottom-3 top-20 z-50 flex animate-panel-in flex-col gap-5 overflow-y-auto rounded-3xl p-6 md:inset-y-4 md:left-auto md:right-4 md:w-[400px]"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{repo.kind}</p>
            <h2 className="mt-1 text-2xl" style={{ color: repo.hue }}>
              {repo.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close details"
            className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <p className="text-sm leading-relaxed text-muted-foreground">{repo.description}</p>

        <div className="flex flex-wrap gap-2">
          {repo.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-semibold"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-secondary/40 p-4">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent">
            <Sparkles className="size-3.5" /> Garden lore
          </p>
          <p className="mt-2 text-sm italic leading-relaxed text-foreground/90">{repo.story}</p>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Star className="size-4 text-primary" /> {repo.stars.toLocaleString()}
          </span>
          <a
            href={repo.url}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-105"
          >
            View on GitHub
          </a>
        </div>
      </aside>
    </>
  );
}
