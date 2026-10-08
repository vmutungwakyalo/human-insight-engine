alter table public.patterns
  add column if not exists knowledge_metadata jsonb;
