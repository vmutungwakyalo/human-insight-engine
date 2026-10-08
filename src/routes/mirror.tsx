import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageTitle } from "@/components/SiteHeader";

export const Route = createFileRoute("/mirror")({
  head: () => ({
    meta: [
      { title: "The Mirror — Guided self-reflection | STRATAGEM" },
      {
        name: "description",
        content:
          "A private, non-diagnostic reflection on boundaries, values, decision-making, relationships, stress, and social context.",
      },
      { property: "og:title", content: "The Mirror — STRATAGEM" },
      {
        property: "og:description",
        content:
          "A guided, non-diagnostic self-reflection with optional questions and private answers.",
      },
    ],
  }),
  component: Mirror,
});

const Q: { t: string; dim: string }[] = [
  {
    t: "I find it hard to say no when someone has done me a favour.",
    dim: "Influence susceptibility",
  },
  {
    t: "I make decisions faster when told an offer is ending soon.",
    dim: "Influence susceptibility",
  },
  { t: "I defer to confident people even when I doubt them.", dim: "Influence susceptibility" },
  {
    t: "I agree to a small request before checking whether I want the larger commitment it may lead to.",
    dim: "Influence susceptibility",
  },
  {
    t: "I feel more drawn to an offer when someone says it is scarce or almost over.",
    dim: "Influence susceptibility",
  },
  { t: "I apologise to keep the peace even when I did nothing wrong.", dim: "Weak boundaries" },
  { t: "I change my plans to avoid someone being upset with me.", dim: "Weak boundaries" },
  {
    t: "I feel responsible for fixing another person's disappointment when I say no.",
    dim: "Weak boundaries",
  },
  { t: "I avoid confrontation until I explode.", dim: "Conflict avoidance" },
  { t: "I replay arguments for days afterwards.", dim: "Conflict avoidance" },
  {
    t: "During a tense conversation, I find it difficult to pause and return to the issue later.",
    dim: "Conflict avoidance",
  },
  { t: "When someone pulls away, I work harder for their approval.", dim: "Attachment anxiety" },
  {
    t: "I doubt my memory when someone insists it happened differently.",
    dim: "Attachment anxiety",
  },
  {
    t: "An unpredictable message or burst of affection can keep me waiting and hoping for more.",
    dim: "Attachment anxiety",
  },
  {
    t: "I accept someone's confident version of events before checking what I remember or recorded.",
    dim: "Reality checking",
  },
  {
    t: "I sometimes mistake feeling specially chosen for having evidence that someone is trustworthy.",
    dim: "Reality checking",
  },
  {
    t: "I find it hard to separate what I directly observed from what I suspect it means.",
    dim: "Reality checking",
  },
  {
    t: "When information or questions come rapidly, I feel pushed to answer before I have thought them through.",
    dim: "Pressure and overload",
  },
  {
    t: "Noise, activity, urgency or strong emotion makes it harder for me to make a careful decision.",
    dim: "Pressure and overload",
  },
  {
    t: "I have agreed to something mainly to end an uncomfortable pause or tense moment.",
    dim: "Pressure and overload",
  },
  {
    t: "I change my view to avoid being excluded or treated differently by a group.",
    dim: "Social belonging",
  },
  {
    t: "I compare myself with someone who is receiving more praise, access or favour.",
    dim: "Social belonging",
  },
  {
    t: "Being ignored, left out or discussed in whispers makes me more likely to comply to regain acceptance.",
    dim: "Social belonging",
  },
  {
    t: "Titles, uniforms, credentials or confident presentation make me less likely to question a claim.",
    dim: "Authority and access",
  },
  {
    t: "I worry that questioning a gatekeeper could cost me an opportunity or access I need.",
    dim: "Authority and access",
  },
  {
    t: "I sometimes accept a demand because it is framed as a legal, institutional or financial requirement without verifying it.",
    dim: "Authority and access",
  },
  {
    t: "A convincing voice note, video or personalized message can feel like proof before I verify who sent it.",
    dim: "Information trust",
  },
  {
    t: "Repeated images, phrases or stories can shape my impression even when I have not checked their accuracy.",
    dim: "Information trust",
  },
  {
    t: "I have acted on an urgent online request before confirming it through a separate channel.",
    dim: "Information trust",
  },
  {
    t: "I notice more easily when another person is acting in a way I dislike than when I do something similar.",
    dim: "Self-awareness and bias",
  },
  {
    t: "When I feel strongly about a conflict, I find it difficult to consider evidence that challenges my first interpretation.",
    dim: "Self-awareness and bias",
  },
  {
    t: "When I feel overwhelmed, I respond before I can identify what I am feeling.",
    dim: "Emotional regulation",
  },
  {
    t: "After becoming upset, it takes me a long time to return to a calm enough state to think clearly.",
    dim: "Emotional regulation",
  },
  {
    t: "I accept an apology as enough even when the behaviour does not change.",
    dim: "Trust and repair",
  },
  {
    t: "I feel I must forgive or restore trust before I am ready.",
    dim: "Trust and repair",
  },
  {
    t: "I feel indebted for a gift or favour even when it was freely offered and no repayment was agreed.",
    dim: "Reciprocity and obligation",
  },
  {
    t: "I find it difficult to decline a request after I have already accepted a small favour from that person.",
    dim: "Reciprocity and obligation",
  },
  {
    t: "I go along with a group's choice before considering whether I agree with it myself.",
    dim: "Conformity and social proof",
  },
  {
    t: "I am more likely to believe a claim when many people repeat it, even if I have not checked the evidence.",
    dim: "Conformity and social proof",
  },
  {
    t: "I find it difficult to pause or leave a conversation when I do not want to decide immediately.",
    dim: "Autonomy and consent",
  },
  {
    t: "I feel locked into a decision even after I have changed my mind.",
    dim: "Autonomy and consent",
  },
  {
    t: "I share personal information online before checking who will receive it.",
    dim: "Privacy and digital safety",
  },
  {
    t: "I act on unusual requests involving money, accounts, or sensitive information without verifying them through a separate trusted channel.",
    dim: "Privacy and digital safety",
  },
  {
    t: "Dependence on someone's money, work, housing or access makes it harder for me to disagree with them.",
    dim: "Power and dependence",
  },
  {
    t: "I feel I lack practical alternatives or support if an important relationship or arrangement became unsafe.",
    dim: "Power and dependence",
  },
  {
    t: "I settle on an explanation before asking what evidence could prove it wrong.",
    dim: "Decision habits",
  },
  {
    t: "I continue with a choice mainly because I have already invested time, money, or effort.",
    dim: "Decision habits",
  },
  {
    t: "I make important choices without comparing realistic alternatives and their likely consequences.",
    dim: "Decision habits",
  },
  {
    t: "In a tense conversation, I assume I understood instead of checking what the other person meant.",
    dim: "Communication and repair",
  },
  {
    t: "I avoid naming a disagreement until frustration or resentment builds.",
    dim: "Communication and repair",
  },
  {
    t: "When someone tells me I caused harm, I focus first on defending my intention.",
    dim: "Communication and repair",
  },
  {
    t: "I rely on wanting to do something rather than making a specific plan for it.",
    dim: "Goals and habits",
  },
  {
    t: "When a routine is interrupted, I find it hard to restart it.",
    dim: "Goals and habits",
  },
  {
    t: "I take on commitments without checking whether I have enough time or energy.",
    dim: "Goals and habits",
  },
  {
    t: "I explain another person's behaviour by their personality before considering their situation or constraints.",
    dim: "Perspective and context",
  },
  {
    t: "I treat one person's behaviour as representative of everyone in a group they belong to.",
    dim: "Perspective and context",
  },
  {
    t: "I hold onto a first impression even after I receive relevant conflicting information.",
    dim: "Perspective and context",
  },
  {
    t: "I keep pursuing a goal even after my priorities or circumstances have changed.",
    dim: "Motivation and values",
  },
  {
    t: "I make choices based on what others expect before checking whether they fit my own priorities.",
    dim: "Motivation and values",
  },
  {
    t: "I find it uncomfortable to say “I don't know” when evidence is incomplete.",
    dim: "Uncertainty and learning",
  },
  {
    t: "I dismiss feedback before checking whether any part of it could be useful.",
    dim: "Uncertainty and learning",
  },
  {
    t: "I try to handle several demanding tasks at once and lose track of important details.",
    dim: "Attention and memory",
  },
  {
    t: "I treat a vivid or confident memory as exact even when the details matter.",
    dim: "Attention and memory",
  },
  {
    t: "I find it hard to ask for support until a problem has become urgent.",
    dim: "Social support and mutuality",
  },
  {
    t: "I offer help beyond my time or capacity because I feel unable to decline.",
    dim: "Social support and mutuality",
  },
  {
    t: "I expect others to follow standards that I sometimes excuse myself from following.",
    dim: "Fairness and responsibility",
  },
  {
    t: "When responsibilities are shared, I leave expectations unclear and later feel resentful.",
    dim: "Fairness and responsibility",
  },
  {
    t: "After a stressful period, I keep pushing without making room to recover.",
    dim: "Stress and recovery",
  },
  {
    t: "When stressed, I find it difficult to identify a small next step or support that could help.",
    dim: "Stress and recovery",
  },
  {
    t: "I assume my usual way of communicating is neutral or obvious to people from other backgrounds.",
    dim: "Culture and assumptions",
  },
  {
    t: "I judge an unfamiliar custom before trying to understand its context or meaning to others.",
    dim: "Culture and assumptions",
  },
];

const STUDY: Record<string, { slug: string; reflection: string }> = {
  "Influence susceptibility": {
    slug: "commitment-consistency",
    reflection: "Notice when urgency, authority, a favour, or a small first yes changes your pace.",
  },
  "Weak boundaries": {
    slug: "guilt-tripping",
    reflection: "A boundary can be valid even when another person dislikes it.",
  },
  "Conflict avoidance": {
    slug: "emotional-flooding",
    reflection:
      "Pausing a heated conversation can protect clarity without avoiding the issue forever.",
  },
  "Attachment anxiety": {
    slug: "intermittent-reinforcement",
    reflection: "Compare reliable care over time with intense but unpredictable attention.",
  },
  "Reality checking": {
    slug: "gaslighting",
    reflection: "Keep observations, interpretations and unanswered questions separate.",
  },
  "Pressure and overload": {
    slug: "cognitive-sensory-overload",
    reflection: "Slowing the pace and reducing inputs can restore room to choose.",
  },
  "Social belonging": {
    slug: "ostracism-silent-treatment",
    reflection:
      "Look for repeated patterns of exclusion or selective approval, not one ambiguous moment.",
  },
  "Authority and access": {
    slug: "institutional-legal-economic-levers",
    reflection: "Verify credentials, rules and consequences independently before acting.",
  },
  "Information trust": {
    slug: "deepfake-coercion",
    reflection: "Verify urgent or emotionally charged media through a separate trusted channel.",
  },
  "Self-awareness and bias": {
    slug: "self-serving-bias",
    reflection:
      "Compare your first account of a conflict with specific evidence and the other person's plausible perspective.",
  },
  "Emotional regulation": {
    slug: "emotional-flooding",
    reflection:
      "A pause, a change of setting, or a later return to the topic can help separate feeling from action.",
  },
  "Trust and repair": {
    slug: "trauma-bonding",
    reflection:
      "Trust is better assessed through accountability and consistent change than through apologies alone.",
  },
  "Reciprocity and obligation": {
    slug: "reciprocity",
    reflection: "A freely offered favour does not require you to accept a later request.",
  },
  "Conformity and social proof": {
    slug: "social-proof",
    reflection:
      "Popularity can describe what a group believes; it does not by itself establish that a claim is true.",
  },
  "Autonomy and consent": {
    slug: "double-bind",
    reflection:
      "Notice whether you can pause, refuse, change your mind, or propose another option without punishment.",
  },
  "Privacy and digital safety": {
    slug: "generative-ai-social-engineering",
    reflection:
      "Share less sensitive information and independently verify identity before acting on unusual digital requests.",
  },
  "Power and dependence": {
    slug: "institutional-legal-economic-levers",
    reflection:
      "Knowing your alternatives can make it easier to distinguish a free choice from one constrained by dependence.",
  },
  "Decision habits": {
    slug: "sunk-cost",
    reflection:
      "For consequential choices, write down alternatives, uncertainty, and what evidence could change your mind.",
  },
  "Communication and repair": {
    slug: "active-listening",
    reflection:
      "Clarifying what you heard and separating intent from impact can make repair more concrete.",
  },
  "Goals and habits": {
    slug: "implementation-intentions",
    reflection:
      "A small, specific plan tied to a cue can be easier to test than relying on motivation alone.",
  },
  "Perspective and context": {
    slug: "person-situation-interaction",
    reflection:
      "Compare behaviour across situations and consider constraints before settling on a character-based explanation.",
  },
  "Motivation and values": {
    slug: "implementation-intentions",
    reflection:
      "Check whether a goal still matters to you, what competes with it, and whether your next step fits your current circumstances.",
  },
  "Uncertainty and learning": {
    slug: "overconfidence-effect",
    reflection:
      "Treat confidence as something to calibrate: note what you know, what remains uncertain, and what evidence could update your view.",
  },
  "Attention and memory": {
    slug: "cognitive-sensory-overload",
    reflection:
      "Reduce competing demands when details matter, and distinguish confidence in a memory from independent confirmation.",
  },
  "Social support and mutuality": {
    slug: "self-disclosure-reciprocity",
    reflection:
      "Notice whether support can be requested and offered with respect for both people's limits and choice.",
  },
  "Fairness and responsibility": {
    slug: "moral-licensing",
    reflection:
      "Make expectations explicit and compare your actions with the standards you ask of others.",
  },
  "Stress and recovery": {
    slug: "cognitive-reappraisal",
    reflection:
      "Consider what helps you regain capacity; small restorative steps are not a substitute for professional support when needed.",
  },
  "Culture and assumptions": {
    slug: "cultural-tightness-looseness",
    reflection:
      "Ask whose norm is being treated as standard, and allow for variation within every culture and community.",
  },
};

const MIRROR_STORAGE_KEY = "stratagem-mirror-v2";
const LEGACY_MIRROR_STORAGE_KEY = "stratagem-mirror";
const LEGACY_REVERSED_QUESTION_INDEXES = new Set([34, 35, 39, 40, 41, 42, 44]);

function Mirror() {
  const [a, setA] = useState<number[]>(Array(Q.length).fill(0));
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const current = localStorage.getItem(MIRROR_STORAGE_KEY);
    const legacy = current ? null : localStorage.getItem(LEGACY_MIRROR_STORAGE_KEY);
    const s = current ?? legacy;
    if (s) {
      try {
        const saved = JSON.parse(s);
        if (Array.isArray(saved) && saved.length <= Q.length) {
          const migrated = Array.from({ length: Q.length }, (_, index) => {
            const value = saved[index];
            if (!Number.isInteger(value) || value < 1 || value > 4) return 0;
            return !current && LEGACY_REVERSED_QUESTION_INDEXES.has(index) ? 5 - value : value;
          });
          setA(migrated);
          setShown(migrated.some((value) => value > 0));
          if (!current) {
            localStorage.setItem(MIRROR_STORAGE_KEY, JSON.stringify(migrated));
            localStorage.removeItem(LEGACY_MIRROR_STORAGE_KEY);
          }
        } else {
          localStorage.removeItem(current ? MIRROR_STORAGE_KEY : LEGACY_MIRROR_STORAGE_KEY);
        }
      } catch {
        if (current) localStorage.removeItem(MIRROR_STORAGE_KEY);
      }
    }
  }, []);
  const answered = a.filter((value) => value > 0).length;
  const dims = Object.keys(STUDY).flatMap((d) => {
    const idx = Q.map((q, i) => (q.dim === d && a[i] > 0 ? i : -1)).filter((i) => i >= 0);
    if (!idx.length) return [];
    return {
      d,
      answered: idx.length,
      total: Q.filter((q) => q.dim === d).length,
      average: (idx.reduce((sum, i) => sum + a[i], 0) / idx.length).toFixed(1),
    };
  });
  const complete = answered === Q.length;
  return (
    <div className="mx-auto max-w-3xl px-6 py-14">
      <PageTitle kicker="Pillar IV" title="The Mirror">
        A private check-in on how you respond to pressure, relationships, decisions, and
        information. Answer only what feels relevant; you can skip any statement.
      </PageTitle>
      <div className="mb-6 rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
        This is not a validated psychological test or a measure of risk. Think about your recent
        experience, rather than one unusually good or difficult day. Answers stay in this browser
        unless you choose to share them.
      </div>
      <div className="sticky top-0 z-10 -mx-2 mb-6 rounded-lg border border-border bg-background/95 p-3 backdrop-blur">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span>
            {answered} of {Q.length} answered{complete ? " · Complete" : ""}
          </span>
          <span aria-hidden="true">{Math.round((answered / Q.length) * 100)}%</span>
        </div>
        <div
          className="mt-2 h-2 overflow-hidden rounded-full bg-secondary"
          role="progressbar"
          aria-label="Reflection progress"
          aria-valuemin={0}
          aria-valuemax={Q.length}
          aria-valuenow={answered}
        >
          <div
            className="h-full rounded-full bg-primary transition-[width]"
            style={{ width: `${(answered / Q.length) * 100}%` }}
          />
        </div>
      </div>
      <nav aria-label="Reflection areas" className="mb-8 flex flex-wrap gap-2">
        {Object.keys(STUDY).map((dimension) => (
          <a
            key={dimension}
            href={`#${dimension.replaceAll(" ", "-")}`}
            className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground hover:border-primary hover:text-primary"
          >
            {dimension}
          </a>
        ))}
      </nav>
      <p className="mb-4 text-xs text-muted-foreground">
        How often does each statement fit? 1 = Never · 2 = Rarely · 3 = Sometimes · 4 = Often
      </p>
      <div className="space-y-8">
        {Object.keys(STUDY).map((dimension) => {
          const questions = Q.map((question, index) => ({ question, index })).filter(
            ({ question }) => question.dim === dimension,
          );
          const dimensionAnswered = questions.filter(({ index }) => a[index] > 0).length;
          return (
            <section
              key={dimension}
              id={dimension.replaceAll(" ", "-")}
              className="scroll-mt-24 rounded-lg border border-border bg-card p-5"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <h2 className="text-xl">{dimension}</h2>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {dimensionAnswered}/{questions.length}
                </span>
              </div>
              <ol className="space-y-5">
                {questions.map(({ question, index }) => (
                  <li key={index} className="border-b border-border pb-4 last:border-0 last:pb-0">
                    <fieldset>
                      <legend className="text-sm">{question.t}</legend>
                      <div
                        role="group"
                        aria-label={`How often: ${question.t}`}
                        className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4"
                      >
                        {["Never", "Rarely", "Sometimes", "Often"].map((label, optionIndex) => {
                          const value = optionIndex + 1;
                          const selected = a[index] === value;
                          return (
                            <button
                              key={label}
                              type="button"
                              aria-pressed={selected}
                              onClick={() => {
                                const next = [...a];
                                next[index] = value;
                                setA(next);
                                setShown(false);
                                localStorage.setItem(MIRROR_STORAGE_KEY, JSON.stringify(next));
                              }}
                              className={`rounded-md border px-3 py-2 text-sm transition-colors ${
                                selected
                                  ? "border-primary bg-primary text-primary-foreground"
                                  : "border-border text-muted-foreground hover:border-primary"
                              }`}
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>
                  </li>
                ))}
              </ol>
            </section>
          );
        })}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          disabled={answered === 0}
          onClick={() => {
            setShown(true);
            localStorage.setItem(MIRROR_STORAGE_KEY, JSON.stringify(a));
          }}
          className="rounded-md bg-primary px-5 py-3 text-primary-foreground disabled:cursor-not-allowed disabled:opacity-40"
        >
          {shown ? "Update my reflection" : "See my reflection"}
        </button>
        {answered > 0 && (
          <button
            type="button"
            onClick={() => {
              setA(Array(Q.length).fill(0));
              setShown(false);
              localStorage.removeItem(MIRROR_STORAGE_KEY);
            }}
            className="rounded-md border border-border px-5 py-3 text-foreground"
          >
            Clear answers
          </button>
        )}
      </div>
      {shown && answered > 0 && (
        <section aria-live="polite" className="mt-10 space-y-5">
          <div>
            <h2 className="text-2xl">Your reflection</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Descriptive summaries of your answers—not scores to compare, thresholds, or a
              diagnosis. Unanswered items are left out.
            </p>
          </div>
          {dims.map(({ d, answered: dimensionAnswered, total, average }) => (
            <div key={d} className="rounded-lg border border-border bg-card p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-medium">{d}</h3>
                <span className="text-sm text-muted-foreground">
                  Average response: {average}/4 ({dimensionAnswered}/{total} answered)
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{STUDY[d]?.reflection}</p>
              <p className="mt-1 text-sm">
                Explore:{" "}
                <Link
                  to="/codex/$slug"
                  params={{ slug: STUDY[d]?.slug ?? "reciprocity" }}
                  className="text-primary"
                >
                  related Codex pattern
                </Link>
              </p>
            </div>
          ))}
          <p className="text-xs text-muted-foreground">
            These responses describe only what you chose to report. They are not risk predictions or
            evidence that another person is manipulating you. If an answer raises a concern, use
            your own context and seek trusted professional or specialist support when useful.
          </p>
        </section>
      )}
    </div>
  );
}
