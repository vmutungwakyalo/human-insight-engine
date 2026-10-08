import { createFileRoute, Link } from "@tanstack/react-router";
import { PATTERNS, TIERS } from "@/lib/codex";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "STRATAGEM — AI tutor for human nature, psychology & power" },
      {
        name: "description",
        content:
          "Study human behaviour across psychology, development, relationships, culture, power and ethics, with AI-supported reflection.",
      },
      { property: "og:title", content: "STRATAGEM — AI tutor for human nature" },
      {
        property: "og:description",
        content:
          "A broad, evidence-aware curriculum and AI-supported reflection on real situations.",
      },
    ],
  }),
  component: Home,
});

const PILLARS = [
  {
    to: "/path",
    t: "The Path",
    d: "Eighteen tiers across the self, cognition, lifespan development, groups, institutions, culture, power, and ethics.",
  },
  {
    to: "/codex",
    t: "The Codex",
    d: `${PATTERNS.length} dense patterns: signature, mechanism, counters, sources.`,
  },
  {
    to: "/counsel",
    t: "The Counsel",
    d: "Separate observations from interpretations and consider possible explanations and options.",
  },
  {
    to: "/drill",
    t: "Drill Room",
    d: "Practise boundaries, communication, negotiation, and safe responses in 31 guided scenarios.",
  },
  {
    to: "/mirror",
    t: "The Mirror",
    d: "Reflect on your own responses, boundaries, and decision habits.",
  },
] as const;

function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-xs uppercase tracking-[0.3em] text-primary">A practitioner's instrument</p>
      <h1 className="mt-4 max-w-4xl text-5xl leading-tight md:text-7xl">
        Understand people. Starting with yourself.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Explore how people think, feel, decide, relate, and respond to power through a structured
        curriculum and a growing Codex informed by psychology, social science, history, and
        philosophy—with attention to evidence, context, and uncertainty.
      </p>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Learn concepts, reflect on real situations without treating patterns as proof, and practise
        clear, safe responses in guided scenarios.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          to="/counsel"
          className="rounded-md bg-primary px-5 py-3 font-medium text-primary-foreground hover:opacity-90"
        >
          Describe a situation
        </Link>
        <Link to="/path" className="rounded-md border border-border px-5 py-3 hover:bg-secondary">
          Begin the Path
        </Link>
      </div>

      <div className="mt-24 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
        {PILLARS.map((p) => (
          <Link key={p.to} to={p.to} className="bg-background p-8 transition-colors hover:bg-card">
            <h2 className="text-2xl text-primary">{p.t}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
          </Link>
        ))}
        <div className="bg-background p-8">
          <h2 className="text-2xl">{TIERS.length} tiers</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            AI suggestions are not verified findings or professional advice. If you are in danger,
            contact local emergency services or a trusted support organization.
          </p>
        </div>
      </div>
    </div>
  );
}
