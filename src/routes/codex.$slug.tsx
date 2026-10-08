import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPattern, getPatternKnowledge } from "@/lib/codex";
import { getDbPattern } from "@/lib/patterns.functions";

export const Route = createFileRoute("/codex/$slug")({
  loader: async ({ params }) => {
    const p = getPattern(params.slug) ?? (await getDbPattern({ data: { slug: params.slug } }));
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => {
    if (!loaderData)
      return { meta: [{ title: "Pattern not found" }, { name: "robots", content: "noindex" }] };
    const t = `${loaderData.name} — The Codex | STRATAGEM`;
    return {
      meta: [
        { title: t },
        { name: "description", content: loaderData.signature },
        { property: "og:title", content: t },
        { property: "og:description", content: loaderData.signature },
      ],
    };
  },
  errorComponent: () => <div className="p-16 text-center">Could not load this pattern.</div>,
  notFoundComponent: () => (
    <div className="p-16 text-center">
      Pattern not found.{" "}
      <Link to="/codex" className="text-primary">
        Back to the Codex
      </Link>
    </div>
  ),
  component: PatternPage,
});

function Row({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-2 border-t border-border py-4 md:grid-cols-[10rem_1fr]">
      <dt className="text-xs uppercase tracking-widest text-primary">{k}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function KnowledgeList({ items }: { items: string[] }) {
  if (!items.length) return <span className="text-muted-foreground">Not specified.</span>;
  return (
    <ul className="list-disc space-y-1 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function PatternPage() {
  const p = Route.useLoaderData();
  const knowledge = getPatternKnowledge(p);
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <Link to="/codex" className="text-sm text-muted-foreground hover:text-primary">
        ← The Codex
      </Link>
      <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">{p.domain}</p>
      <h1 className="mt-1 text-5xl">{p.name}</h1>
      <p className="mt-4 rounded-md border border-border bg-card p-4 text-sm text-muted-foreground">
        Treat this entry as a prompt for careful inquiry, not a diagnosis or proof of anyone's
        motives. Its source list is a set of reading leads and may not directly support every
        sentence; research findings, theory, practical frameworks, and observation have different
        evidentiary weight.
      </p>
      <dl className="mt-8">
        <Row k="Signature">{p.signature}</Row>
        <Row k="Mechanism">{p.mechanism}</Row>
        <Row k="Where seen">{p.seen}</Row>
        <Row k="Counters">
          <ul className="list-disc space-y-1 pl-5">
            {p.counters.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </Row>
        <Row k="Sources">
          <ul className="space-y-1 text-muted-foreground">
            {p.sources.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-muted-foreground">
            Reading leads only; they have not necessarily been checked against each claim below.
          </p>
        </Row>
        <Row k="Evidence appraisal">
          <div className="space-y-3">
            <p>
              <span className="font-medium">Appraisal:</span>{" "}
              {knowledge.status.replaceAll("-", " ")}{" "}
              <span className="text-muted-foreground">
                · Type: {knowledge.epistemicKind.replaceAll("-", " ")}
              </span>
            </p>
            {knowledge.status === "not-appraised" && (
              <p className="text-sm text-muted-foreground">
                This entry has not had its individual claims appraised or mapped to supporting
                sources. Its source list is not a quality rating.
              </p>
            )}
            {knowledge.uncertainty && (
              <p className="text-sm">
                <span className="font-medium">Uncertainty: </span>
                {knowledge.uncertainty}
              </p>
            )}
            <div>
              <h3 className="mb-1 font-medium">Claims and evidence mapping</h3>
              {knowledge.claims.length ? (
                <ul className="space-y-3">
                  {knowledge.claims.map((claim) => (
                    <li key={claim.claim} className="rounded-md border border-border p-3">
                      <p>{claim.claim}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {claim.status.replaceAll("-", " ")}
                        {claim.evidenceKinds.length > 0 &&
                          ` · ${claim.evidenceKinds.map((kind) => kind.replaceAll("-", " ")).join(", ")}`}
                      </p>
                      <p className="mt-2 text-sm">{claim.context}</p>
                      {claim.uncertainty && (
                        <p className="mt-2 text-sm">
                          <span className="font-medium">Uncertainty: </span>
                          {claim.uncertainty}
                        </p>
                      )}
                      {claim.sourceReferences.length > 0 && (
                        <p className="mt-2 text-sm">
                          Source references: {claim.sourceReferences.join("; ")}
                        </p>
                      )}
                      {claim.limitations.length > 0 && (
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Limitations: </span>
                          {claim.limitations.join(" ")}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No claim-level evidence mapping is available.
                </p>
              )}
            </div>
            <div>
              <h3 className="mb-1 font-medium">Context</h3>
              <KnowledgeList items={knowledge.context} />
              {knowledge.contextFactors && (
                <ul className="mt-2 space-y-1 text-sm">
                  {Object.entries(knowledge.contextFactors).map(
                    ([factor, items]) =>
                      items &&
                      items.length > 0 && (
                        <li key={factor}>
                          <span className="font-medium">
                            {factor.replace(/([A-Z])/g, " $1").toLowerCase()}:{" "}
                          </span>
                          {items.join("; ")}
                        </li>
                      ),
                  )}
                </ul>
              )}
            </div>
            <div>
              <h3 className="mb-1 font-medium">Alternative explanations</h3>
              <KnowledgeList items={knowledge.alternativeExplanations} />
            </div>
            <div>
              <h3 className="mb-1 font-medium">Ethical considerations</h3>
              <KnowledgeList items={knowledge.ethicalConsiderations} />
            </div>
            <p className="text-xs text-muted-foreground">
              Levels of analysis:{" "}
              {knowledge.levelsOfAnalysis.length
                ? knowledge.levelsOfAnalysis.map((level) => level.replaceAll("-", " ")).join(", ")
                : "not specified"}
            </p>
          </div>
        </Row>
        <Row k="Related">
          <div className="flex flex-wrap gap-2">
            {p.related.map((r) => {
              const rp = getPattern(r);
              return rp ? (
                <Link
                  key={r}
                  to="/codex/$slug"
                  params={{ slug: r }}
                  className="rounded-full border border-border px-3 py-1 text-sm hover:border-primary"
                >
                  {rp.name}
                </Link>
              ) : null;
            })}
          </div>
        </Row>
      </dl>
      <Link
        to="/counsel"
        className="mt-10 inline-block rounded-md bg-primary px-5 py-3 text-primary-foreground"
      >
        Think this might be relevant? Reflect with the Counsel
      </Link>
    </div>
  );
}
