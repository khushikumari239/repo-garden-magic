import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Landing } from "@/components/garden/Landing";
import { GardenScene } from "@/components/garden/GardenScene";
import { GardenGuide } from "@/components/garden/GardenGuide";
import { MOCK_REPOS, type Repo } from "@/data/repos";
import { fetchGarden } from "@/lib/github.functions";

const TITLE = "Repo Garden — Grow your code garden";
const DESC =
  "Turn any GitHub profile into a magical garden where every repository becomes a glowing plant, creature or tower of light.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const MESSAGES: Record<string, string> = {
  NOT_FOUND: "No gardener by that name lives on GitHub. Check the spelling and try again.",
  RATE_LIMITED: "The garden gate is crowded right now (GitHub rate limit). Try again in a few minutes.",
  API_ERROR: "GitHub didn't answer the knock. Try again in a moment.",
};

function Index() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const getGarden = useServerFn(fetchGarden);

  const plant = async (name: string) => {
    if (!name) {
      setError("Whisper a username to the soil first.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const result = await getGarden({ data: { username: name } });
      setUsername(name.replace(/^@/, ""));
      setRepos(result);
    } catch (e) {
      const raw = e instanceof Error ? e.message : "";
      const key = Object.keys(MESSAGES).find((k) => raw.includes(k));
      setError(key ? MESSAGES[key]! : "Something tangled in the roots. Try again, or wander the demo garden.");
    } finally {
      setLoading(false);
    }
  };

  const demo = () => {
    setError(null);
    setUsername("octocat");
    setRepos(MOCK_REPOS);
  };

  return (
    <>
      {repos === null ? (
        <Landing loading={loading} error={error} onPlant={plant} onDemo={demo} />
      ) : (
        <GardenScene
          username={username}
          repos={repos}
          onReset={() => {
            setRepos(null);
            setError(null);
          }}
        />
      )}
      <GardenGuide />
    </>
  );
}

