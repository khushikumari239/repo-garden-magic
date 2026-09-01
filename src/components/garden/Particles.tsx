const SEEDS = Array.from({ length: 26 }, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
  return {
    left: r(1) * 100,
    delay: r(2) * 14,
    duration: 11 + r(3) * 10,
    size: 2 + r(4) * 5,
    bottom: r(5) * 40,
  };
});

export function Particles({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {SEEDS.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-accent/70 animate-rise"
          style={{
            left: `${s.left}%`,
            bottom: `${s.bottom}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            boxShadow: "0 0 10px currentColor",
          }}
        />
      ))}
    </div>
  );
}

export function Clouds() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2 overflow-hidden">
      {[
        { top: "8%", scale: 1, delay: "0s", opacity: 0.16 },
        { top: "22%", scale: 1.6, delay: "-9s", opacity: 0.1 },
        { top: "38%", scale: 0.8, delay: "-17s", opacity: 0.13 },
      ].map((c, i) => (
        <svg
          key={i}
          viewBox="0 0 200 60"
          className="absolute w-72 animate-drift text-foreground"
          style={{ top: c.top, left: `${i * 30 + 5}%`, transform: `scale(${c.scale})`, animationDelay: c.delay, opacity: c.opacity }}
        >
          <ellipse cx="60" cy="40" rx="55" ry="20" fill="currentColor" />
          <ellipse cx="100" cy="30" rx="42" ry="26" fill="currentColor" />
          <ellipse cx="140" cy="42" rx="45" ry="17" fill="currentColor" />
        </svg>
      ))}
    </div>
  );
}
