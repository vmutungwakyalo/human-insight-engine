import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { TIERS, getPattern } from "@/lib/codex";
import { PageTitle } from "@/components/SiteHeader";
import { ChatPanel } from "@/components/ChatPanel";

export const Route = createFileRoute("/path")({
  head: () => ({
    meta: [
      { title: "The Path — Curriculum of human nature | STRATAGEM" },
      {
        name: "description",
        content:
          "An eighteen-tier human nature curriculum spanning self, cognition, emotion, personality, development, groups, institutions, culture, power, influence, negotiation, and ethics.",
      },
      { property: "og:title", content: "The Path — STRATAGEM" },
      {
        property: "og:description",
        content:
          "A comprehensive curriculum from self-knowledge to ethics, culture, and human nature.",
      },
    ],
  }),
  component: PathPage,
});

function PathPage() {
  const [done, setDone] = useState<string[]>([]);
  useEffect(() => {
    setDone(JSON.parse(localStorage.getItem("stratagem-done") ?? "[]"));
  }, []);
  const toggle = (k: string) => {
    const n = done.includes(k) ? done.filter((x) => x !== k) : [...done, k];
    setDone(n);
    localStorage.setItem("stratagem-done", JSON.stringify(n));
  };
  const total = TIERS.reduce((a, t) => a + t.lessons.length, 0);
  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <PageTitle kicker="Pillar II" title="The Path">
        Work through the lessons in order. Each one includes an objective, explanation, practice
        exercise, and review question. Mark lessons complete and ask the tutor anything below.{" "}
        <span className="text-primary">
          {done.length}/{total} complete.
        </span>
      </PageTitle>
      <p className="mb-10 max-w-3xl text-sm text-muted-foreground">
        Lesson readings are starting points, not proof that every sentence is established. Research
        findings, reviews, professional guidance, practical frameworks, and philosophical works have
        different evidentiary roles; check the source and context before applying a claim.
      </p>
      <div className="space-y-12">
        {TIERS.map((t) => (
          <section key={t.n} className="grid gap-6 md:grid-cols-[12rem_1fr]">
            <div>
              <p className="font-serif text-5xl text-primary">{t.n}</p>
              <h2 className="text-2xl">{t.title}</h2>
              <p className="text-sm text-muted-foreground">{t.question}</p>
            </div>
            <div className="space-y-4">
              {t.lessons.map((l) => {
                const k = `${t.n}:${l.title}`;
                return (
                  <article key={k} className="rounded-lg border border-border bg-card p-5">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-xl">{l.title}</h3>
                      <button
                        onClick={() => toggle(k)}
                        className={`shrink-0 rounded-full border px-3 py-1 text-xs ${done.includes(k) ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground"}`}
                      >
                        {done.includes(k) ? "Complete" : "Mark done"}
                      </button>
                    </div>
                    <p className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">
                      Learning goal
                    </p>
                    <p className="mt-1 text-sm">{l.objective}</p>
                    <p className="mt-2">{l.body}</p>
                    <div className="mt-4 grid gap-4 border-t border-border pt-4 md:grid-cols-2">
                      <div>
                        <h4 className="text-xs uppercase tracking-widest text-primary">Practice</h4>
                        <p className="mt-1 text-sm">{l.practice}</p>
                      </div>
                      <div>
                        <h4 className="text-xs uppercase tracking-widest text-primary">
                          Check your understanding
                        </h4>
                        <p className="mt-1 text-sm">{l.checkpoint}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {l.patterns.map((s) => (
                        <Link
                          key={s}
                          to="/codex/$slug"
                          params={{ slug: s }}
                          className="text-sm text-primary underline-offset-4 hover:underline"
                        >
                          {getPattern(s)?.name}
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 border-t border-border pt-3">
                      <h4 className="text-xs uppercase tracking-widest text-muted-foreground">
                        Lesson readings
                      </h4>
                      <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                        {l.sources.map((source) => (
                          <li key={source}>{source}</li>
                        ))}
                      </ul>
                      {l.webSources && (
                        <ul className="mt-2 space-y-1 text-xs">
                          {l.webSources.map((source) => (
                            <li key={source.url}>
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-primary underline-offset-4 hover:underline"
                              >
                                {source.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <div className="mt-4 border-t border-border pt-3">
                      <h4 className="text-xs uppercase tracking-widest text-muted-foreground">
                        Sources for linked Codex patterns
                      </h4>
                      <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                        {[...new Set(l.patterns.flatMap((s) => getPattern(s)?.sources ?? []))].map(
                          (source) => (
                            <li key={source}>{source}</li>
                          ),
                        )}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
      <section className="mt-20 max-w-3xl">
        <h2 className="mb-4 text-3xl">Ask the tutor</h2>
        <ChatPanel
          mode="tutor"
          placeholder="e.g. Explain loss aversion with a workplace example"
          intro="Ask for explanations, examples, reading lists or a quiz on any tier."
        />
      </section>
    </div>
  );
}
