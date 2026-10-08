# STRATAGEM

STRATAGEM is the product implementation of **Human Nature Intelligence (HNI)**:
a planned multidisciplinary knowledge, learning, reasoning, research,
reflection, and practice system for understanding the self and human behaviour.
Its intended scope spans cognition, emotion, motivation, personality,
relationships, communication, social dynamics, groups, power, influence,
manipulation, decision-making, organizations, culture, ethics, human
development, and philosophy of human nature.

## Central product thesis

People do not only lack information. They also face fragmented knowledge,
inaccessible academic material, disconnected concepts, weak mental models,
overgeneralization, premature conclusions, and difficulty separating
observation from interpretation or applying theory to real situations.
Structured practice is often missing as well.

STRATAGEM therefore aims to do more than answer questions: it is being built
as a system for **human-behaviour reasoning** that connects knowledge,
supports careful interpretation, and helps people practise applying ideas.

## Mission

Make serious multidisciplinary knowledge about human nature and human
behaviour understandable, connected, searchable, evidence-grounded, and
practically useful while preserving context, uncertainty, individual
differences, and human agency.

## What STRATAGEM is not

STRATAGEM is not intended to be a generic chatbot wrapper, book-summary
website, online-course marketplace, personality-label generator, diagnosis
engine, lie detector, mind reader, surveillance or hidden psychological
profiling system, manipulation-for-hire system, therapy replacement, or an
uncritical "dark psychology" encyclopedia. It should not claim certainty about
another person's private motives.

> **Current build:** Initial MVP (pre-1.0). This is a development-stage
> description, not a formally published or tagged release.
>
> **Current scope:** This repository contains a working product prototype with
> an expanded curriculum, a curated Codex, local-model chat, situation
> analysis, self-reflection, scenario practice, account support, and saved
> conversations. It includes evidence-aware metadata and source material, but
> it is not yet comprehensive or systematically evidence-verified: many
> entries remain unappraised, and citations are not validated against
> individual claims.

## Demo video

[![Watch the STRATAGEM project walkthrough](https://img.youtube.com/vi/pmVLnmovs_0/hqdefault.jpg)](https://youtu.be/pmVLnmovs_0)

Prefer to download and watch offline? [Download the demo video](./stratagem-demo.mp4).

## What you can do

- **The Path (`/path`)** — read lessons arranged in eighteen tiers spanning
  self, cognition, emotion, personality, lifespan development, relationships,
  groups, organizations, culture, power, influence, negotiation, ethics, and
  philosophy; follow links to related Codex
  patterns, consult categorized lesson readings, ask the tutor questions, and
  mark lessons complete. Readings include research, academic books, professional
  guidance, practical literature, and historical or philosophical primary
  works. These categories describe source type, not equal evidentiary strength;
  practical and interpretive works are not presented as empirical proof.
  Completion is stored in the current browser.
- **The Codex (`/codex`)** — search and filter built-in and database-managed
  patterns. Pattern entries include a short signature, mechanism, examples,
  defensive counters, sources, and related patterns. Search also checks
  mechanisms, examples, references, contextual notes, and a small set of
  curated concept connections. Entries can expose structured claim/evidence
  metadata, contextual limits, and alternatives; unappraised entries are
  explicitly marked. Database-managed metadata is validated before saving.
  Open an entry at `/codex/<slug>`.
- **The Counsel (`/counsel`)** — describe a situation and ask the AI to
  separate reported observations from interpretations and consider possible
  explanations, alternatives, and safety-aware options.
- **The Mirror (`/mirror`)** — complete a private self-reflection questionnaire
  and view results by dimension. Answers are stored in the browser, not sent to
  the app database. This is a reflection aid, not a validated psychological
  assessment or diagnosis.
- **The Drill Room (`/drill`)** — practise responses in one of the available
  roleplay scenarios. Type `/debrief` to leave the roleplay and request
  feedback.
- **Accounts and conversation history (`/auth`)** — create an account or sign
  in with Supabase. Signed-in users can save and reopen tutor, Counsel, and
  Drill conversations.
- **Admin (`/admin`)** — admins can add, edit, and remove database-backed
  Codex patterns. Built-in patterns in source remain separate.

The home page is at `/`. Pages include descriptive metadata and are served by
TanStack Start.

The eighteen-tier curriculum and Codex draw on a wider range of scholarship
and literature than the built-in pattern list alone: primary studies, research
reviews, academic books and handbooks, professional guidance, and practical
or historical works. Citations are curated reading leads, not a claim that
every source has been independently re-verified or that every source type
provides the same kind of evidence. Popular frameworks and philosophical
arguments are kept distinct from empirical findings. The Codex is a growing,
curated reference rather than an exhaustive catalogue: human behaviour is too
broad and context-dependent for a finite list of entries to represent
completely.

## How it fits together

```text
Browser
  └─ React pages and components (TanStack Router / Start)
       ├─ Supabase Auth and database (accounts, roles, patterns, chat history)
       └─ POST /api/chat
            └─ Ollama OpenAI-compatible endpoint (local model by default)
```

### Main technologies

- React 19 and TypeScript
- TanStack Start and TanStack Router
- Vite 8
- Tailwind CSS 4 and Radix UI components
- Supabase Auth and PostgreSQL

### AI chat (current local setup)

The chat endpoint currently uses the AI SDK to stream responses from a local
Ollama model through Ollama's OpenAI-compatible API. This works when the app
server can reach Ollama on the same machine. A hosted AI service for a
publicly deployed app has not been set up; that is planned for a later release
stage.

### Data and persistence

The Supabase migration in
[`supabase/migrations/20260929091200_initial_schema.sql`](./supabase/migrations/20260929091200_initial_schema.sql)
creates:

| Table        | Purpose                                                              |
| ------------ | -------------------------------------------------------------------- |
| `profiles`   | User display names and account creation dates                        |
| `user_roles` | `admin` and `user` roles                                             |
| `patterns`   | Additional Codex patterns and nullable structured knowledge metadata |
| `threads`    | Conversation titles, modes, owners, and update times                 |
| `messages`   | Conversation messages stored as JSON                                 |

Row Level Security policies restrict profiles, roles, and conversations to
their owners, and restrict pattern changes to admins. Patterns can be read
without signing in. A database signup trigger creates each profile and role;
the **first account created in a database with this trigger** is assigned the
admin role, and subsequent accounts receive the user role. Review this policy
before using the project in a production environment.

The curriculum progress and Mirror questionnaire answers use browser
`localStorage`, so they do not currently sync across devices. Chat history is
stored in Supabase for signed-in users; guests can use chat but do not get saved
history.

## Requirements

- Node.js and npm (use a current Node.js LTS release)
- A Supabase project for sign-in, database-backed patterns, and saved chat
  history
- Ollama and a downloaded model for AI replies (the default is `qwen3:4b`)

## Run locally

### 1. Install dependencies

From the repository root:

```powershell
npm install
```

### 2. Configure Supabase

In the Supabase Dashboard, create or open a project. Find its project URL,
publishable API key, and service role key in the project API settings. Copy
`.env.example` to a root-level `.env.local` file (do not commit it), then
replace the placeholders:

```dotenv
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
```

Use the same project URL and publishable key in both places. The publishable
key is intended for client use. The service role key is required for trusted
server-side admin operations and bypasses row-level security. **Never put it in
a `VITE_` variable or expose it to browser code.**

Apply all pending database migrations to the same Supabase project. The usual
CLI workflow is:

```powershell
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

Install the Supabase CLI separately if it is not available on your machine.
Alternatively, an administrator can run the migration SQL once in that
project's Supabase SQL Editor, in timestamp order. The initial migration
creates objects that are not all idempotent; do not run it a second time if
its tables and trigger already exist. The subsequent
[`20261001090000_add_pattern_knowledge_metadata.sql`](./supabase/migrations/20261001090000_add_pattern_knowledge_metadata.sql)
migration adds nullable structured knowledge metadata to database-managed
patterns. The project reference in `supabase/config.toml` should match the
project you intend to use.

### 3. Set up local AI

Install and start [Ollama](https://ollama.com/download), then download the
default model:

```powershell
ollama pull qwen3:4b
```

The app expects Ollama's OpenAI-compatible API at
`http://127.0.0.1:11434/v1` by default. The `.env.example` includes optional
`OLLAMA_BASE_URL` and `OLLAMA_MODEL` settings if you need a different endpoint
or model.

```dotenv
OLLAMA_BASE_URL=http://127.0.0.1:11434/v1
OLLAMA_MODEL=qwen3:4b
```

The app server must be able to reach the Ollama endpoint. A local `127.0.0.1`
endpoint is suitable for development on the same machine; it is not a hosted
model endpoint for a separately deployed application.

### 4. Start the development server

```powershell
npm run dev
```

Open the local URL Vite prints in the terminal (commonly
`http://localhost:5173`). Keep Ollama running to use AI chat. Supabase must be
configured for authentication and database-backed features.

## Useful commands

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start the local development server   |
| `npm run build`     | Create a production build            |
| `npm run build:dev` | Build using the development mode     |
| `npm run preview`   | Preview the production build locally |
| `npm run lint`      | Run ESLint                           |
| `npm run format`    | Format files with Prettier           |

There is currently no test script defined in `package.json`.

## Project layout

```text
src/
  components/       Shared site header, chat panel, and UI components
  hooks/            Session and responsive-layout hooks
  integrations/
    supabase/       Supabase browser/server clients, auth, and generated types
  lib/
    ai.server.ts    Chat prompt construction and Ollama streaming
    codex.ts        Built-in curriculum, patterns, domains, search, and personas
    knowledge.ts    Runtime validation for structured evidence metadata
    patterns.functions.ts  Server functions for database patterns
  routes/
    index.tsx       Home page
    path.tsx        Curriculum and tutor
    codex.*.tsx     Pattern catalog and detail pages
    counsel.tsx     Situation-analysis chat
    mirror.tsx      Self-reflection questionnaire
    drill.tsx       Scenario practice
    auth.tsx        Sign-in and registration
    _authenticated/admin.tsx  Admin pattern management
    api/chat.ts     Streaming chat endpoint
supabase/
  config.toml
  migrations/       Database schema and access policies
```

## Safety, privacy, and current limitations

- AI chat uses the configured Ollama model. The current chat prompt asks it to
  teach defensively, avoid scripting coercion, acknowledge safety concerns, and
  structure Counsel and Drill responses. Counsel is instructed to distinguish
  reported observations from interpretations, offer alternatives, and avoid
  diagnosing or asserting hidden motives. These prompt instructions are not a
  substitute for a separately tested safety system.
- Counsel produces model-generated interpretations, not diagnoses or verified
  findings about another person's intent. Treat responses as possibilities to
  consider, not as established facts.
- Chat retrieves up to six matching built-in Codex entries from the latest
  user message to provide relevant context and reduce the prior all-pattern
  prompt. It does not retrieve database-managed entries or source documents,
  validate citations, or provide a comprehensive evidence graph.
- Structured Codex metadata supports claim-level evidence mapping, but most
  entries remain unappraised. Their source lists are reading leads, not proof
  that a source supports each sentence; existing citations have not all been
  independently verified.
- The database contains saved conversation content for signed-in users. Avoid
  entering sensitive information unless you are comfortable storing it in the
  configured Supabase project.
- The admin page relies on database roles and RLS. Protect access to the
  Supabase project and review the first-user-admin signup policy before opening
  registration broadly.
- The current repository does not yet include the full HNI knowledge/evidence
  graph, hybrid retrieval/RAG, citation validation, Observatory, research and
  comparison workspaces, benchmark/evaluation suite, or production deployment
  and recovery setup.

## Development direction

The current app provides an expanded eighteen-tier curriculum and selected
Codex entries across the intended domains. Dedicated tiers now address
personality, lifespan development, groups and networks, organizations and
institutions, culture and inequality, and ethics and philosophy. This is a
substantive expansion, not a claim of complete academic coverage: many areas
remain introductory, references are not yet mapped to individual claims, and
the curriculum has not been independently assessed for learning outcomes.

## Contact

For questions or enquiries about STRATAGEM, email
[contactvictork@duck.com](mailto:contactvictork@duck.com).
