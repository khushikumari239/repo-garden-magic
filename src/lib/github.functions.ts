import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { GardenKind, Repo } from "@/data/repos";

const SLOTS: Array<Pick<Repo, "x" | "y" | "scale" | "depth">> = [
  { x: 15, y: 52, scale: 1.35, depth: 0.9 },
  { x: 33, y: 74, scale: 1.1, depth: 1 },
  { x: 54, y: 44, scale: 0.85, depth: 0.55 },
  { x: 71, y: 70, scale: 1.15, depth: 1 },
  { x: 87, y: 40, scale: 1, depth: 0.45 },
  { x: 44, y: 22, scale: 0.8, depth: 0.35 },
];

const KINDS: GardenKind[] = ["tree", "mushroom", "crystal", "creature", "tower", "lantern"];

const PALETTE: Array<{ hue: string; aura: string }> = [
  { hue: "var(--bloom-mint)", aura: "var(--bloom-sky)" },
  { hue: "var(--bloom-rose)", aura: "var(--bloom-peach)" },
  { hue: "var(--bloom-sky)", aura: "var(--bloom-mint)" },
  { hue: "var(--bloom-gold)", aura: "var(--bloom-peach)" },
  { hue: "var(--bloom-violet)", aura: "var(--bloom-sky)" },
  { hue: "var(--bloom-peach)", aura: "var(--bloom-gold)" },
];

const TITLE_PREFIX: Record<GardenKind, string[]> = {
  tree: ["The Elder", "The Whispering", "The Old"],
  mushroom: ["The Thoughtcap", "The Dusklight", "The Hush"],
  crystal: ["The Stillwater", "The Moonlit", "The Frozen"],
  creature: ["Bramble the", "Pip the", "Moss the"],
  tower: ["The Farlight", "The Beacon", "The Skyward"],
  lantern: ["The Hanging", "The Drifting", "The Amber"],
};

const TITLE_SUFFIX: Record<GardenKind, string[]> = {
  tree: ["Bloomtree", "Canopy", "Rootwood"],
  mushroom: ["Cluster", "Ring", "Grove"],
  crystal: ["Shard", "Geode", "Prism"],
  creature: ["Build Sprite", "Commit Fox", "Log Sprite"],
  tower: ["Tower", "Spire", "Lighthouse"],
  lantern: ["Lumen", "Lantern", "Glowlight"],
};

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function titleFor(kind: GardenKind, name: string) {
  const h = hash(name);
  const a = TITLE_PREFIX[kind]!;
  const b = TITLE_SUFFIX[kind]!;
  return `${a[h % a.length]} ${b[(h >>> 3) % b.length]}`;
}

function cleanReadme(md: string) {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`|-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function storyFor(kind: GardenKind, name: string, description: string, readme: string, stars: number) {
  const seed = readme ? readme.slice(0, 220) : description;
  const openers: Record<GardenKind, string> = {
    tree: `Rooted deep in the eastern soil, ${name} has grown taller with every commit.`,
    mushroom: `${name} sprouted overnight after a long debugging session, and never left.`,
    crystal: `${name} formed slowly in still water, one refactor at a time.`,
    creature: `${name} wanders the garden paths, napping on failing tests.`,
    tower: `${name} rises above the canopy, its lamp sweeping across every deploy.`,
    lantern: `${name} hangs from a low branch, glowing brighter whenever someone reads it.`,
  };
  const glow =
    stars > 500
      ? "Travellers say its light can be seen from three repositories away."
      : stars > 50
        ? "A steady handful of fireflies circle it most evenings."
        : "It glows softly, waiting patiently for its first admirers.";
  const whisper = seed ? ` If you lean close, it whispers: “${seed.slice(0, 180)}…”` : "";
  return `${openers[kind]} ${glow}${whisper}`;
}

interface GhRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
  archived: boolean;
  topics?: string[];
  pushed_at: string;
  languages_url: string;
}

async function gh(url: string, accept = "application/vnd.github+json") {
  return fetch(url, {
    headers: {
      Accept: accept,
      "User-Agent": "repo-garden",
    },
  });
}

export const fetchGarden = createServerFn({ method: "GET" })
  .inputValidator((data) =>
    z.object({ username: z.string().trim().min(1).max(39) }).parse(data),
  )
  .handler(async ({ data }): Promise<Repo[]> => {
    const username = data.username.replace(/^@/, "");

    const res = await gh(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated&type=owner`,
    );

    if (res.status === 404) throw new Error("NOT_FOUND");
    if (res.status === 403 || res.status === 429) throw new Error("RATE_LIMITED");
    if (!res.ok) throw new Error("API_ERROR");

    const all = (await res.json()) as GhRepo[];
    if (!Array.isArray(all)) throw new Error("API_ERROR");

    const scored = all
      .filter((r) => !r.fork && !r.archived)
      .map((r) => ({
        r,
        score:
          r.stargazers_count * 3 +
          r.forks_count * 2 +
          (r.description ? 6 : 0) +
          Math.max(0, 24 - (Date.now() - Date.parse(r.pushed_at)) / (1000 * 60 * 60 * 24 * 30)),
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((s) => s.r);

    if (scored.length === 0) return [];

    const enriched = await Promise.all(
      scored.map(async (r) => {
        const [langsRes, readmeRes] = await Promise.all([
          gh(r.languages_url).catch(() => null),
          gh(
            `https://api.github.com/repos/${encodeURIComponent(username)}/${encodeURIComponent(r.name)}/readme`,
            "application/vnd.github.raw",
          ).catch(() => null),
        ]);

        let tech: string[] = r.language ? [r.language] : [];
        if (langsRes?.ok) {
          const langs = (await langsRes.json()) as Record<string, number>;
          tech = Object.entries(langs)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 4)
            .map(([k]) => k);
        }
        if (tech.length === 0 && r.topics?.length) tech = r.topics.slice(0, 3);

        let readme = "";
        if (readmeRes?.ok) readme = cleanReadme(await readmeRes.text());

        return { repo: r, tech, readme };
      }),
    );

    return enriched.map(({ repo, tech, readme }, i) => {
      const kind = KINDS[i % KINDS.length]!;
      const slot = SLOTS[i % SLOTS.length]!;
      const palette = PALETTE[hash(repo.name) % PALETTE.length]!;
      const description =
        repo.description ??
        (readme ? `${readme.slice(0, 140)}…` : "A quiet little project with no description yet.");

      return {
        id: String(repo.id),
        name: repo.name,
        title: titleFor(kind, repo.name),
        description,
        tech,
        stars: repo.stargazers_count,
        url: repo.html_url,
        kind,
        story: storyFor(kind, repo.name, description, readme, repo.stargazers_count),
        ...slot,
        hue: palette.hue,
        aura: palette.aura,
      } satisfies Repo;
    });
  });
