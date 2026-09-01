import type { Repo } from "@/data/repos";

function Shape({ kind, hue, aura }: { kind: Repo["kind"]; hue: string; aura: string }) {
  const c = { color: hue } as const;
  switch (kind) {
    case "tree":
      return (
        <svg viewBox="0 0 100 120" className="h-full w-full animate-sway origin-bottom" style={c}>
          <path d="M46 118 Q50 92 48 68 L54 68 Q54 94 56 118 Z" fill="var(--moss)" />
          <path d="M50 70 Q40 66 32 76" stroke="var(--moss)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M51 62 Q62 60 68 72" stroke="var(--moss)" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <g className="animate-pulse-glow">
            <circle cx="50" cy="40" r="29" fill="currentColor" opacity="0.92" />
            <circle cx="27" cy="55" r="16" fill={aura} opacity="0.7" />
            <circle cx="73" cy="52" r="18" fill="currentColor" opacity="0.8" />
            <circle cx="58" cy="26" r="13" fill={aura} opacity="0.55" />
          </g>
          <circle cx="38" cy="34" r="2.6" fill="var(--bloom-gold)" className="animate-twinkle" />
          <circle cx="63" cy="46" r="2" fill="var(--bloom-rose)" className="animate-twinkle" style={{ animationDelay: "1s" }} />
          <circle cx="50" cy="18" r="1.8" fill="var(--bloom-gold)" className="animate-twinkle" style={{ animationDelay: "2s" }} />
        </svg>
      );
    case "mushroom":
      return (
        <svg viewBox="0 0 100 120" className="h-full w-full animate-bob" style={c}>
          <rect x="43" y="64" width="15" height="52" rx="7.5" fill="oklch(0.95 0.02 80)" opacity="0.92" />
          <rect x="20" y="86" width="10" height="30" rx="5" fill="oklch(0.95 0.02 80)" opacity="0.8" />
          <path d="M10 66 Q50 12 90 66 Q50 78 10 66 Z" fill="currentColor" className="animate-pulse-glow" />
          <path d="M6 90 Q25 62 44 90 Q25 98 6 90 Z" fill={aura} opacity="0.85" />
          <circle cx="34" cy="50" r="6" fill="oklch(0.99 0.02 90)" opacity="0.8" />
          <circle cx="58" cy="42" r="4.5" fill="oklch(0.99 0.02 90)" opacity="0.8" />
          <circle cx="70" cy="58" r="5" fill="oklch(0.99 0.02 90)" opacity="0.8" />
          <circle cx="22" cy="80" r="3" fill="oklch(0.99 0.02 90)" opacity="0.7" />
        </svg>
      );
    case "crystal":
      return (
        <svg viewBox="0 0 100 120" className="h-full w-full animate-bob" style={c}>
          <ellipse cx="50" cy="112" rx="30" ry="7" fill={aura} opacity="0.25" className="animate-halo" />
          <g className="animate-pulse-glow">
            <path d="M50 6 L76 54 L50 112 L24 54 Z" fill="currentColor" opacity="0.85" />
            <path d="M50 6 L50 112 L24 54 Z" fill={aura} opacity="0.5" />
            <path d="M50 6 L76 54 L50 60 Z" fill="oklch(1 0 0)" opacity="0.22" />
          </g>
          <path d="M16 100 L28 64 L38 110 Z" fill={aura} opacity="0.6" />
          <path d="M84 102 L73 70 L62 112 Z" fill="currentColor" opacity="0.55" />
          <circle cx="50" cy="52" r="2.4" fill="oklch(1 0 0)" className="animate-twinkle" />
        </svg>
      );
    case "creature":
      return (
        <svg viewBox="0 0 100 120" className="h-full w-full animate-bob" style={c}>
          <ellipse cx="50" cy="113" rx="26" ry="6" fill="oklch(0.2 0.05 290)" opacity="0.45" />
          <g className="animate-pulse-glow">
            <ellipse cx="50" cy="74" rx="30" ry="27" fill="currentColor" />
            <path d="M26 52 L19 24 L43 41 Z" fill={aura} />
            <path d="M74 52 L81 24 L57 41 Z" fill={aura} />
            <ellipse cx="50" cy="84" rx="17" ry="13" fill="oklch(1 0 0)" opacity="0.22" />
          </g>
          <circle cx="40" cy="70" r="4.8" fill="oklch(0.24 0.05 292)" />
          <circle cx="60" cy="70" r="4.8" fill="oklch(0.24 0.05 292)" />
          <circle cx="41.6" cy="68.4" r="1.6" fill="oklch(1 0 0)" />
          <circle cx="61.6" cy="68.4" r="1.6" fill="oklch(1 0 0)" />
          <circle cx="30" cy="80" r="4" fill="var(--bloom-rose)" opacity="0.5" />
          <circle cx="70" cy="80" r="4" fill="var(--bloom-rose)" opacity="0.5" />
          <path d="M44 86 Q50 92 56 86" stroke="oklch(0.24 0.05 292)" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      );
    case "tower":
      return (
        <svg viewBox="0 0 100 120" className="h-full w-full" style={c}>
          <path d="M62 34 L99 16 L99 54 Z" fill="var(--bloom-gold)" opacity="0.18" className="animate-shimmer" />
          <path d="M36 116 L40 42 L60 42 L64 116 Z" fill="oklch(0.95 0.015 85)" opacity="0.92" />
          <path d="M38 88 L62 88" stroke={aura} strokeWidth="5" />
          <path d="M37.5 70 L62.5 70" stroke="currentColor" strokeWidth="5" />
          <path d="M39 56 L61 56" stroke={aura} strokeWidth="4" />
          <g className="animate-pulse-glow">
            <rect x="38" y="24" width="24" height="19" rx="5" fill="currentColor" />
            <path d="M50 6 L68 26 L32 26 Z" fill={aura} />
          </g>
          <circle cx="50" cy="33" r="4" fill="oklch(1 0.02 95)" className="animate-twinkle" />
        </svg>
      );
    case "lantern":
    default:
      return (
        <svg viewBox="0 0 100 120" className="h-full w-full animate-bob" style={c}>
          <path d="M50 0 Q54 18 50 32" stroke="var(--moss)" strokeWidth="3" fill="none" />
          <g className="animate-pulse-glow">
            <path d="M50 32 Q86 62 50 108 Q14 62 50 32 Z" fill="currentColor" opacity="0.9" />
            <path d="M50 32 Q68 60 50 108 Q46 62 50 32 Z" fill={aura} opacity="0.55" />
            <circle cx="50" cy="70" r="11" fill="oklch(0.99 0.04 95)" opacity="0.92" />
          </g>
          <circle cx="22" cy="92" r="2.6" fill={aura} className="animate-twinkle" />
          <circle cx="80" cy="78" r="3" fill="currentColor" className="animate-twinkle" style={{ animationDelay: "1.4s" }} />
          <circle cx="66" cy="104" r="2" fill={aura} className="animate-twinkle" style={{ animationDelay: "2.2s" }} />
        </svg>
      );
  }
}

interface Props {
  repo: Repo;
  index: number;
  active: boolean;
  dimmed: boolean;
  parallax: { x: number; y: number };
  onSelect: (repo: Repo) => void;
}

export function GardenObject({ repo, index, active, dimmed, parallax, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={() => onSelect(repo)}
      aria-label={`Open ${repo.name}`}
      aria-pressed={active}
      className="group absolute -translate-x-1/2 -translate-y-1/2 animate-sprout rounded-3xl outline-none transition-[opacity,filter] duration-500 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
      style={{
        left: `${repo.x}%`,
        top: `${repo.y}%`,
        width: `clamp(76px, ${13 * repo.scale}vw, ${150 * repo.scale}px)`,
        animationDelay: `${index * 140}ms`,
        opacity: dimmed ? 0.42 : 1,
        filter: dimmed ? "saturate(0.6) blur(1px)" : undefined,
        zIndex: active ? 25 : 10 + Math.round(repo.depth * 8),
      }}
    >
      <div
        className="transition-transform duration-700 ease-out"
        style={{ transform: `translate3d(${parallax.x * repo.depth * 16}px, ${parallax.y * repo.depth * 12}px, 0)` }}
      >
        <div className="relative aspect-[5/6] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-3 group-hover:scale-110 group-active:scale-95 group-active:duration-150">
          <span
            aria-hidden
            className="absolute inset-[-18%] rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70"
            style={{ background: `radial-gradient(circle, ${repo.hue} 0%, transparent 68%)`, opacity: active ? 0.8 : undefined }}
          />
          <span
            aria-hidden
            className="absolute inset-x-1 bottom-1 h-5 rounded-[50%] opacity-45 blur-md transition-all duration-500 group-hover:h-7 group-hover:opacity-80"
            style={{ background: repo.aura }}
          />
          <Shape kind={repo.kind} hue={repo.hue} aura={repo.aura} />
        </div>
      </div>

      <span
        className={`mx-auto mt-2 block w-max max-w-[150px] truncate rounded-full border border-border px-3 py-1 text-[11px] font-bold tracking-wide backdrop-blur transition-all duration-300 sm:text-xs ${
          active
            ? "bg-primary text-primary-foreground opacity-100"
            : "translate-y-1 bg-card/80 text-foreground/90 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
        }`}
      >
        {repo.title}
      </span>
    </button>
  );
}
