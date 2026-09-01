import type { Repo } from "@/data/repos";

function Shape({ kind, hue }: { kind: Repo["kind"]; hue: string }) {
  const c = { color: hue } as const;
  switch (kind) {
    case "tree":
      return (
        <svg viewBox="0 0 100 120" className="h-full w-full animate-sway" style={c}>
          <path d="M48 118 L48 70 L52 70 L52 118 Z" fill="var(--moss)" />
          <path d="M50 66 L34 78" stroke="var(--moss)" strokeWidth="4" strokeLinecap="round" />
          <path d="M50 60 L66 74" stroke="var(--moss)" strokeWidth="4" strokeLinecap="round" />
          <g className="animate-pulse-glow">
            <circle cx="50" cy="42" r="30" fill="currentColor" opacity="0.9" />
            <circle cx="28" cy="56" r="17" fill="currentColor" opacity="0.75" />
            <circle cx="72" cy="55" r="19" fill="currentColor" opacity="0.8" />
          </g>
          <circle cx="40" cy="36" r="2.5" fill="var(--bloom-gold)" className="animate-twinkle" />
          <circle cx="62" cy="48" r="2" fill="var(--bloom-gold)" className="animate-twinkle" style={{ animationDelay: "1s" }} />
        </svg>
      );
    case "mushroom":
      return (
        <svg viewBox="0 0 100 120" className="h-full w-full animate-bob" style={c}>
          <rect x="42" y="66" width="16" height="50" rx="8" fill="oklch(0.9 0.03 90)" />
          <path d="M12 68 Q50 14 88 68 Z" fill="currentColor" className="animate-pulse-glow" />
          <circle cx="34" cy="54" r="6" fill="oklch(0.96 0.02 90)" opacity="0.85" />
          <circle cx="58" cy="44" r="4.5" fill="oklch(0.96 0.02 90)" opacity="0.85" />
          <circle cx="70" cy="60" r="5" fill="oklch(0.96 0.02 90)" opacity="0.85" />
          <ellipse cx="24" cy="104" rx="12" ry="16" fill="currentColor" opacity="0.55" />
        </svg>
      );
    case "crystal":
      return (
        <svg viewBox="0 0 100 120" className="h-full w-full animate-bob" style={c}>
          <g className="animate-pulse-glow">
            <path d="M50 8 L78 56 L50 112 L22 56 Z" fill="currentColor" opacity="0.85" />
            <path d="M50 8 L50 112 L22 56 Z" fill="currentColor" opacity="0.45" />
          </g>
          <path d="M18 96 L30 66 L40 110 Z" fill="currentColor" opacity="0.6" />
          <path d="M82 98 L72 70 L62 112 Z" fill="currentColor" opacity="0.6" />
        </svg>
      );
    case "creature":
      return (
        <svg viewBox="0 0 100 120" className="h-full w-full animate-bob" style={c}>
          <ellipse cx="50" cy="112" rx="26" ry="6" fill="oklch(0.15 0.04 260)" opacity="0.5" />
          <g className="animate-pulse-glow">
            <ellipse cx="50" cy="74" rx="30" ry="28" fill="currentColor" />
            <path d="M26 52 L20 26 L42 42 Z" fill="currentColor" />
            <path d="M74 52 L80 26 L58 42 Z" fill="currentColor" />
          </g>
          <circle cx="40" cy="72" r="4.5" fill="oklch(0.18 0.05 260)" />
          <circle cx="60" cy="72" r="4.5" fill="oklch(0.18 0.05 260)" />
          <path d="M44 86 Q50 92 56 86" stroke="oklch(0.18 0.05 260)" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "tower":
      return (
        <svg viewBox="0 0 100 120" className="h-full w-full" style={c}>
          <path d="M36 116 L40 44 L60 44 L64 116 Z" fill="oklch(0.9 0.02 90)" opacity="0.9" />
          <path d="M38 84 L62 84" stroke="currentColor" strokeWidth="5" />
          <path d="M37 66 L63 66" stroke="currentColor" strokeWidth="5" />
          <g className="animate-pulse-glow">
            <rect x="38" y="26" width="24" height="20" rx="5" fill="currentColor" />
            <path d="M50 10 L66 28 L34 28 Z" fill="currentColor" />
          </g>
          <path d="M62 36 L96 22 L96 50 Z" fill="var(--bloom-gold)" opacity="0.22" className="animate-twinkle" />
        </svg>
      );
    case "lantern":
    default:
      return (
        <svg viewBox="0 0 100 120" className="h-full w-full animate-bob" style={c}>
          <path d="M50 0 L50 34" stroke="var(--moss)" strokeWidth="3" />
          <g className="animate-pulse-glow">
            <path d="M50 34 Q84 62 50 106 Q16 62 50 34 Z" fill="currentColor" opacity="0.9" />
            <circle cx="50" cy="70" r="12" fill="oklch(0.98 0.04 95)" opacity="0.9" />
          </g>
          <circle cx="24" cy="94" r="2.5" fill="currentColor" className="animate-twinkle" />
          <circle cx="78" cy="80" r="3" fill="currentColor" className="animate-twinkle" style={{ animationDelay: "1.4s" }} />
        </svg>
      );
  }
}

interface Props {
  repo: Repo;
  index: number;
  active: boolean;
  onSelect: (repo: Repo) => void;
}

export function GardenObject({ repo, index, active, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={() => onSelect(repo)}
      aria-label={`Open ${repo.name}`}
      className="group absolute w-[22%] max-w-[150px] -translate-x-1/2 -translate-y-1/2 animate-fade-up outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-2xl sm:w-[16%]"
      style={{ left: `${repo.x}%`, top: `${repo.y}%`, animationDelay: `${index * 120}ms` }}
    >
      <div
        className="relative aspect-[5/6] transition-transform duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-110"
        style={{ filter: active ? "brightness(1.15)" : undefined }}
      >
        <div
          className="absolute inset-x-2 bottom-0 h-6 rounded-[50%] opacity-40 blur-md transition-opacity group-hover:opacity-80"
          style={{ background: repo.hue }}
        />
        <Shape kind={repo.kind} hue={repo.hue} />
      </div>
      <span className="mt-1 block truncate rounded-full bg-card/70 px-2 py-1 text-[11px] font-semibold text-foreground/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 sm:text-xs">
        {repo.name}
      </span>
    </button>
  );
}
