import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { DOMAINS } from "@/lib/codex";
import { PageTitle } from "@/components/SiteHeader";
import { useSession } from "@/hooks/use-session";
import { patternKnowledgeSchema } from "@/lib/knowledge";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Manage Codex patterns | STRATAGEM" },
      { name: "description", content: "Add and edit patterns in the STRATAGEM Codex." },
      { property: "og:title", content: "Admin — STRATAGEM" },
      { property: "og:description", content: "Codex pattern management." },
    ],
  }),
  component: Admin,
});

type Row = {
  id?: string;
  slug: string;
  name: string;
  domain: string;
  signature: string;
  mechanism: string;
  seen: string;
  counters: string;
  sources: string;
  related: string;
  knowledgeMetadata: string;
};
const EMPTY: Row = {
  slug: "",
  name: "",
  domain: DOMAINS[0],
  signature: "",
  mechanism: "",
  seen: "",
  counters: "",
  sources: "",
  related: "",
  knowledgeMetadata: "",
};
const lines = (s: string) =>
  s
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);

function Admin() {
  const { isAdmin, ready } = useSession();
  const [rows, setRows] = useState<Row[]>([]);
  const [form, setForm] = useState<Row>(EMPTY);
  const [msg, setMsg] = useState<string | null>(null);

  const load = async () => {
    const { data, error } = await supabase.from("patterns").select("*").order("name");
    if (error) {
      setMsg(`Could not load patterns: ${error.message}`);
      return;
    }
    setRows(
      data.map((r) => {
        const { knowledge_metadata, ...pattern } = r;
        return {
          ...pattern,
          counters: r.counters.join("\n"),
          sources: r.sources.join("\n"),
          related: r.related.join("\n"),
          knowledgeMetadata: knowledge_metadata ? JSON.stringify(knowledge_metadata, null, 2) : "",
        };
      }),
    );
  };
  useEffect(() => {
    void load();
  }, []);

  if (!ready) return null;
  if (!isAdmin)
    return (
      <div className="p-16 text-center text-muted-foreground">
        Only admins can manage the Codex.
      </div>
    );

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    let knowledgeMetadata: Json | null = null;
    if (form.knowledgeMetadata.trim()) {
      let decoded: unknown;
      try {
        decoded = JSON.parse(form.knowledgeMetadata);
      } catch {
        setMsg("Knowledge metadata must be valid JSON.");
        return;
      }
      const parsed = patternKnowledgeSchema.safeParse(decoded);
      if (!parsed.success) {
        setMsg(
          `Knowledge metadata is invalid: ${parsed.error.issues[0]?.message ?? "check the schema"}`,
        );
        return;
      }
      knowledgeMetadata = parsed.data;
    }
    const slug =
      form.slug ||
      form.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    const payload = {
      slug,
      name: form.name,
      domain: form.domain,
      signature: form.signature,
      mechanism: form.mechanism,
      seen: form.seen,
      counters: lines(form.counters),
      sources: lines(form.sources),
      related: lines(form.related),
      knowledge_metadata: knowledgeMetadata,
    };
    const { error } = form.id
      ? await supabase.from("patterns").update(payload).eq("id", form.id)
      : await supabase.from("patterns").insert(payload);
    setMsg(error ? error.message : "Saved.");
    if (!error) {
      setForm(EMPTY);
      void load();
    }
  };
  const del = async (id: string) => {
    if (confirm("Delete this pattern?")) {
      const { error } = await supabase.from("patterns").delete().eq("id", id);
      setMsg(error ? `Could not delete pattern: ${error.message}` : "Deleted.");
      if (!error) void load();
    }
  };

  const f =
    "w-full rounded-md border border-input bg-card px-3 py-2 text-sm outline-none focus:border-primary";
  const set =
    (k: keyof Row) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm({ ...form, [k]: e.target.value });

  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-[1fr_20rem]">
      <div>
        <PageTitle kicker="Admin" title={form.id ? "Edit pattern" : "Add pattern"}>
          Patterns saved here appear in the Codex alongside the built-in ones.
        </PageTitle>
        <form onSubmit={save} className="space-y-3">
          <input
            required
            className={f}
            placeholder="Name"
            value={form.name}
            onChange={set("name")}
          />
          <input
            className={f}
            placeholder="Slug (auto from name)"
            value={form.slug}
            onChange={set("slug")}
          />
          <select className={f} value={form.domain} onChange={set("domain")}>
            {DOMAINS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
          <textarea
            required
            className={f}
            rows={2}
            placeholder="Signature"
            value={form.signature}
            onChange={set("signature")}
          />
          <textarea
            className={f}
            rows={3}
            placeholder="Mechanism"
            value={form.mechanism}
            onChange={set("mechanism")}
          />
          <textarea
            className={f}
            rows={2}
            placeholder="Where seen"
            value={form.seen}
            onChange={set("seen")}
          />
          <textarea
            className={f}
            rows={3}
            placeholder="Counters (one per line)"
            value={form.counters}
            onChange={set("counters")}
          />
          <textarea
            className={f}
            rows={2}
            placeholder="Sources (one per line)"
            value={form.sources}
            onChange={set("sources")}
          />
          <textarea
            className={f}
            rows={2}
            placeholder="Related slugs (one per line)"
            value={form.related}
            onChange={set("related")}
          />
          <label className="block text-sm text-muted-foreground">
            Structured knowledge metadata (JSON; blank means not appraised)
            <textarea
              className={`${f} mt-1 font-mono`}
              rows={12}
              placeholder='{"epistemicKind":"unclassified","status":"not-appraised","claims":[],"context":[],"alternativeExplanations":[],"ethicalConsiderations":[],"levelsOfAnalysis":[]}'
              value={form.knowledgeMetadata}
              onChange={set("knowledgeMetadata")}
            />
          </label>
          <div className="flex gap-2">
            <button className="rounded-md bg-primary px-5 py-2 text-primary-foreground">
              Save
            </button>
            {form.id && (
              <button
                type="button"
                onClick={() => setForm(EMPTY)}
                className="rounded-md border border-border px-5 py-2"
              >
                Cancel
              </button>
            )}
          </div>
          {msg && <p className="text-sm text-muted-foreground">{msg}</p>}
        </form>
      </div>
      <aside>
        <h2 className="mb-3 text-lg">Your patterns ({rows.length})</h2>
        <ul className="space-y-2">
          {rows.map((r) => (
            <li
              key={r.id}
              className="flex items-center justify-between gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm"
            >
              <button onClick={() => setForm(r)} className="truncate text-left hover:text-primary">
                {r.name}
              </button>
              <button onClick={() => del(r.id!)} className="text-xs text-destructive">
                Delete
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
