import { useState } from "react";
import { Leaf, Send, X } from "lucide-react";

interface Msg {
  from: "guide" | "you";
  text: string;
}

const REPLIES = [
  "The glowing tree on the left is aurora-ui — the oldest root system in this garden.",
  "Try hovering a creature. They perk up when someone is watching.",
  "Every star a repo earns becomes one firefly. Some nights it's very bright here.",
  "Tidepool-db keeps every version it ever held. Nothing is truly deleted in the garden.",
  "If a plant looks dim, it simply hasn't been committed to in a while. Water it with a PR.",
];

export function GardenGuide() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "guide", text: "Hello, gardener. I'm Fern. Ask me about anything growing here." },
  ]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMsgs((m) => [...m, { from: "you", text }]);
    setTimeout(() => {
      setMsgs((m) => [...m, { from: "guide", text: REPLIES[m.length % REPLIES.length]! }]);
    }, 700);
  };

  return (
    <>
      {open && (
        <div className="glass-panel fixed bottom-24 left-4 z-50 flex h-[380px] w-[min(92vw,340px)] animate-panel-in flex-col rounded-3xl p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base">Garden Guide</h3>
            <button onClick={() => setOpen(false)} aria-label="Close guide" className="text-muted-foreground hover:text-foreground">
              <X className="size-4" />
            </button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto pr-1">
            {msgs.map((m, i) => (
              <p
                key={i}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  m.from === "guide"
                    ? "bg-secondary/70 text-foreground"
                    : "ml-auto bg-primary text-primary-foreground"
                }`}
              >
                {m.text}
              </p>
            ))}
          </div>
          <form onSubmit={send} className="mt-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Fern something…"
              className="min-w-0 flex-1 rounded-full border border-border bg-input/60 px-4 py-2 text-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
            />
            <button type="submit" aria-label="Send" className="rounded-full bg-accent p-2.5 text-accent-foreground">
              <Send className="size-4" />
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 left-4 z-50 flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-accent-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-105"
      >
        <Leaf className="size-4" /> Garden Guide
      </button>
    </>
  );
}
