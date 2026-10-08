import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { listDbPatterns } from "@/lib/patterns.functions";
import { DOMAINS, PATTERNS, searchPatterns } from "@/lib/codex";
import { PageTitle } from "@/components/SiteHeader";

export const Route = createFileRoute("/codex/")({
  head: () => ({
    meta: [
      { title: "The Codex — Patterns of human behaviour | STRATAGEM" },
      {
        name: "description",
        content:
          "A library of psychology, influence, power and manipulation patterns with mechanisms, counters and sources.",
      },
      { property: "og:title", content: "The Codex — STRATAGEM" },
      {
        property: "og:description",
        content: "Dense pattern entries: signature, mechanism, counters, sources.",
      },
    ],
  }),
  component: Codex,
});

function Codex() {
  const [q, setQ] = useState("");
  const [d, setD] = useState<string | null>(null);
  const {
    data: extra = [],
    error,
    isError,
  } = useQuery({
    queryKey: ["db-patterns"],
    queryFn: () => listDbPatterns(),
  });
  const all = [...PATTERNS, ...extra.filter((e) => !PATTERNS.some((p) => p.slug === e.slug))];
  const list = searchPatterns(q, all, d);
  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <PageTitle kicker="Pillar I" title="The Codex">
        Every pattern: its signature, its mechanism, where it appears, and how to counter it.
      </PageTitle>
      <p className="mt-4 max-w-3xl text-sm text-muted-foreground">
        This is a growing, curated reference—not an exhaustive catalogue of human behaviour or a
        diagnostic tool. Research constructs, practical frameworks, and observational patterns are
        not interchangeable evidence; entries describe possibilities, not proof of a person's
        motives or character.
      </p>
      {isError && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          Database-managed patterns could not be loaded:{" "}
          {error instanceof Error ? error.message : "an unexpected error occurred"}
        </p>
      )}
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search patterns…"
        aria-label="Search Codex patterns"
        className="w-full max-w-md rounded-md border border-input bg-card px-4 py-2 outline-none focus:border-primary"
      />
      {q.trim() && (
        <p className="mt-2 text-xs text-muted-foreground">
          Results include matches in mechanisms, examples, sources, context, and related concepts.
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        {[null, ...DOMAINS].map((x) => (
          <button
            type="button"
            key={x ?? "all"}
            onClick={() => setD(x)}
            className={`rounded-full border px-3 py-1 text-xs ${d === x ? "border-primary text-primary" : "border-border text-muted-foreground"}`}
          >
            {x ?? "All"}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {list.map(({ pattern: p, match }) => (
          <Link
            key={p.slug}
            to="/codex/$slug"
            params={{ slug: p.slug }}
            className="rounded-lg border border-border bg-card p-5 hover:border-primary"
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{p.domain}</p>
            <h2 className="mt-1 text-xl text-primary">{p.name}</h2>
            <p className="mt-2 text-sm">{p.signature}</p>
            {match && <p className="mt-3 text-xs text-muted-foreground">Matched: {match}</p>}
          </Link>
        ))}
      </div>
      {list.length === 0 && (
        <p className="mt-8 text-sm text-muted-foreground">
          No patterns match this search. Try a broader concept or remove the domain filter.
        </p>
      )}
    </div>
  );
}
