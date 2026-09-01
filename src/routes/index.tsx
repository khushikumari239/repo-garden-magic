import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Landing } from "@/components/garden/Landing";
import { GardenScene } from "@/components/garden/GardenScene";
import { GardenGuide } from "@/components/garden/GardenGuide";
import { MOCK_REPOS, type Repo } from "@/data/repos";

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
    ],
  }),
  component: Index,
});

function Index() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const plant = (name: string) => {
    if (!name) {
      setError("Whisper a username to the soil first.");
      return;
    }
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (name.toLowerCase() === "error") {
        setError("The garden gate is stuck. Try again in a moment.");
        return;
      }
      setUsername(name);
      setRepos(name.toLowerCase() === "empty" ? [] : MOCK_REPOS);
    }, 1600);
  };

  return (
    <>
      {repos === null ? (
        <Landing loading={loading} error={error} onPlant={plant} />
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
