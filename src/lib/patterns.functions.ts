import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { Pattern } from "./codex";
import { parsePatternKnowledge } from "./knowledge";

function client() {
  return createClient<Database>(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_PUBLISHABLE_KEY"]!,
    {
      auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
    },
  );
}
const COLS =
  "slug,name,domain,signature,mechanism,seen,counters,sources,related,knowledge_metadata";

type DbPattern = Pick<
  Database["public"]["Tables"]["patterns"]["Row"],
  | "slug"
  | "name"
  | "domain"
  | "signature"
  | "mechanism"
  | "seen"
  | "counters"
  | "sources"
  | "related"
  | "knowledge_metadata"
>;

function toPattern(row: DbPattern): Pattern {
  const { knowledge_metadata, ...pattern } = row;
  return {
    ...pattern,
    knowledge: knowledge_metadata === null ? null : parsePatternKnowledge(knowledge_metadata),
  };
}

export const listDbPatterns = createServerFn({ method: "GET" }).handler(
  async (): Promise<Pattern[]> => {
    const { data, error } = await client().from("patterns").select(COLS).order("name");
    if (error) throw new Error(`Could not load Codex patterns: ${error.message}`);
    return (data ?? []).map(toPattern);
  },
);

export const getDbPattern = createServerFn({ method: "GET" })
  .validator((d: { slug: string }) => ({ slug: String(d.slug).slice(0, 120) }))
  .handler(async ({ data }): Promise<Pattern | null> => {
    const { data: row, error } = await client()
      .from("patterns")
      .select(COLS)
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(`Could not load Codex pattern: ${error.message}`);
    return row ? toPattern(row) : null;
  });
