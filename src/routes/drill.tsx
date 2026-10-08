import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PERSONAS } from "@/lib/codex";
import { PageTitle } from "@/components/SiteHeader";
import { ChatPanel } from "@/components/ChatPanel";

export const Route = createFileRoute("/drill")({
  head: () => ({
    meta: [
      { title: "Drill Room — Practise human skills | STRATAGEM" },
      {
        name: "description",
        content:
          "Practise boundaries, communication, verification, negotiation, and defensive responses in guided scenarios.",
      },
      { property: "og:title", content: "Drill Room — STRATAGEM" },
      {
        property: "og:description",
        content: "Guided roleplay to practise clear, safe, and evidence-aware responses.",
      },
    ],
  }),
  component: Drill,
});

function Drill() {
  const [id, setId] = useState(PERSONAS[0]!.id);
  const p = PERSONAS.find((x) => x.id === id)!;
  return (
    <div className="mx-auto max-w-4xl px-6 py-14">
      <PageTitle kicker="Pillar V" title="The Drill Room">
        Practise boundaries, communication, verification, negotiation, and responding to pressure.
        Choose a scenario, then type <code className="text-primary">/debrief</code> when you want
        feedback. Scenarios are practice prompts, not diagnoses or proof of anyone&apos;s motives.
      </PageTitle>
      <div className="mb-8 flex flex-wrap gap-2">
        {PERSONAS.map((x) => (
          <button
            key={x.id}
            onClick={() => setId(x.id)}
            className={`rounded-md border px-4 py-2 text-sm ${x.id === id ? "border-primary text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}
          >
            {x.name}
          </button>
        ))}
      </div>
      <p className="mb-6 rounded-md border border-border bg-card p-4 text-sm">
        <span className="text-primary">Scenario: </span>
        {p.brief}
      </p>
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <section>
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground">Situation</h2>
          <p className="mt-1 text-sm">{p.scene}</p>
        </section>
        <section>
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground">
            Practice focus
          </h2>
          <ul className="mt-1 flex flex-wrap gap-2">
            {p.focus.map((item) => (
              <li key={item} className="rounded-sm border border-border px-2 py-1 text-xs">
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground">Your goal</h2>
          <p className="mt-1 text-sm">{p.objective}</p>
        </section>
        <section>
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground">Difficulty</h2>
          <p className="mt-1 text-sm">{p.level}</p>
        </section>
      </div>
      <ChatPanel key={id} mode={`drill:${id}`} placeholder="Your reply…" />
    </div>
  );
}
