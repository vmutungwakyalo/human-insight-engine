import { createFileRoute } from "@tanstack/react-router";
import { PageTitle } from "@/components/SiteHeader";
import { ChatPanel } from "@/components/ChatPanel";

export const Route = createFileRoute("/counsel")({
  head: () => ({
    meta: [
      { title: "The Counsel — Reflect on a real situation | STRATAGEM" },
      {
        name: "description",
        content:
          "Describe a situation and consider possible explanations, evidence, alternatives, and safety-aware options.",
      },
      { property: "og:title", content: "The Counsel — STRATAGEM" },
      {
        property: "og:description",
        content:
          "Structured reflection on a situation, with uncertainty and alternative explanations.",
      },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <PageTitle kicker="Pillar III" title="The Counsel">
        Describe a real situation. The Counsel can help separate observations from interpretations
        and consider possible explanations and options. Its suggestions are not verified findings,
        diagnoses, or professional advice. If you are in immediate danger, contact local emergency
        services or a trusted support organization; do not rely on an AI chat for safety planning.
      </PageTitle>
      <ChatPanel
        mode="counsel"
        placeholder="What is happening? Who is involved, what did they do, how did you respond?"
        intro="Example: “A teammate has missed two deadlines, which delayed my work. I’m not sure whether they’re overloaded or we misunderstood the handoff. How can I raise it clearly?”"
      />
    </div>
  ),
});
