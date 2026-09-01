export type GardenKind = "tree" | "mushroom" | "crystal" | "creature" | "tower" | "lantern";

export interface Repo {
  id: string;
  name: string;
  description: string;
  tech: string[];
  stars: number;
  url: string;
  kind: GardenKind;
  story: string;
  /** position on the garden field, in percent */
  x: number;
  y: number;
  hue: string;
}

export const MOCK_REPOS: Repo[] = [
  {
    id: "1",
    name: "aurora-ui",
    description: "A component library that shimmers with motion-first primitives and accessible defaults.",
    tech: ["React", "TypeScript", "Tailwind"],
    stars: 428,
    url: "https://github.com/octocat/aurora-ui",
    kind: "tree",
    story:
      "The eldest of the garden. Its bark is written in props and its leaves unfold as buttons whenever a designer walks past. Every autumn it drops a new minor version, and the ground below glitters with deprecated APIs.",
    x: 18,
    y: 46,
    hue: "var(--bloom-mint)",
  },
  {
    id: "2",
    name: "quill-notes",
    description: "Offline-first markdown notebook with sync, backlinks and a spooky-fast search index.",
    tech: ["Svelte", "IndexedDB", "Rust"],
    stars: 1203,
    url: "https://github.com/octocat/quill-notes",
    kind: "mushroom",
    story:
      "A cluster of thought-caps that hum when you have an idea at 2am. Pick one and it whispers back a note you forgot you wrote three winters ago.",
    x: 36,
    y: 66,
    hue: "var(--bloom-rose)",
  },
  {
    id: "3",
    name: "tidepool-db",
    description: "A tiny embedded key-value store with MVCC snapshots and zero dependencies.",
    tech: ["Rust", "WASM"],
    stars: 89,
    url: "https://github.com/octocat/tidepool-db",
    kind: "crystal",
    story:
      "Grown from a single commit dropped into still water. Inside its facets, every write is preserved forever — hold it to the moon and you can read last Tuesday.",
    x: 55,
    y: 40,
    hue: "var(--bloom-sky)",
  },
  {
    id: "4",
    name: "pixel-pet",
    description: "A desktop companion that reacts to your build status and celebrates green pipelines.",
    tech: ["Electron", "Canvas", "TypeScript"],
    stars: 2340,
    url: "https://github.com/octocat/pixel-pet",
    kind: "creature",
    story:
      "The friendliest resident. It naps on failing tests and does a small triumphant hop whenever CI turns green. Feeds exclusively on merged pull requests.",
    x: 72,
    y: 62,
    hue: "var(--bloom-gold)",
  },
  {
    id: "5",
    name: "beacon-deploy",
    description: "Zero-config edge deployments with instant rollbacks and preview links per branch.",
    tech: ["Go", "Docker", "Cloudflare"],
    stars: 675,
    url: "https://github.com/octocat/beacon-deploy",
    kind: "tower",
    story:
      "A lighthouse built from YAML bricks. Its lamp sweeps across the garden every deploy, and lost branches follow the beam safely back to main.",
    x: 86,
    y: 38,
    hue: "var(--bloom-violet)",
  },
  {
    id: "6",
    name: "lumen-charts",
    description: "Declarative charts that animate between datasets without a single layout shift.",
    tech: ["D3", "React", "SVG"],
    stars: 312,
    url: "https://github.com/octocat/lumen-charts",
    kind: "lantern",
    story:
      "Hung from a low branch by someone who hated bar charts. Shake it gently and the numbers rearrange themselves into whatever truth you were looking for.",
    x: 46,
    y: 24,
    hue: "var(--bloom-gold)",
  },
];
