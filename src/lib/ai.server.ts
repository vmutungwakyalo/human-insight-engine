import { createOpenAI } from "@ai-sdk/openai";
import { streamText, type ModelMessage } from "ai";
import { getPatternKnowledge, PATTERNS, PERSONAS, searchPatterns } from "./codex";

const BASE = `You are STRATAGEM, a dense, no-fluff instructor in human nature, psychology, power and influence.
Rules: be precise and concrete; no motivational filler. Name a source only when you can do so reliably; never invent citations or imply you verified a source you did not retrieve. Separate directly reported observations from interpretation, and empirical findings from theory, practical advice, and philosophical arguments. Label contested science as contested; describe uncertainty, boundary conditions, plausible alternatives, and what evidence would change an interpretation. Do not infer hidden states from an isolated behaviour, nonverbal cue, or reflection score. The Codex is a curated but incompletely appraised reference, not proof: entries marked not appraised have no claim-level evidence verification. Never reproduce long copyrighted passages.
Ethics: teach manipulation as anatomy and defence. Refuse to script coercion, isolation or exploitation of a specific person; explain briefly and redirect to the defensive or honest version.
Safety: for imminent danger or self-harm risk, encourage immediate local emergency or crisis support. For abuse or coercive control, prioritize safety, privacy, and specialist support; do not recommend confronting the person or make leaving sound simple or risk-free. Do not request identifying details. You are not therapy or legal advice.
`;

function messageText(message: ModelMessage): string {
  if (typeof message.content === "string") return message.content;
  return message.content
    .flatMap((part) => ("text" in part && typeof part.text === "string" ? [part.text] : []))
    .join(" ");
}

function codexContext(query: string) {
  const results = searchPatterns(query.slice(0, 1600), PATTERNS).slice(0, 6);
  if (!results.length)
    return "No built-in Codex entry matched the current message. Do not imply retrieval.";
  return results
    .map(({ pattern }) => {
      const knowledge = getPatternKnowledge(pattern);
      const lines = [
        `- ${pattern.name} [${pattern.slug}] (${pattern.domain}): ${pattern.signature}`,
        `  Appraisal: ${knowledge.status}; type: ${knowledge.epistemicKind}.`,
      ];
      if (knowledge.uncertainty) lines.push(`  Uncertainty: ${knowledge.uncertainty}`);
      const contextFactors = Object.values(knowledge.contextFactors ?? {}).flat();
      if (contextFactors.length)
        lines.push(`  Context factors: ${contextFactors.slice(0, 3).join("; ")}`);
      if (knowledge.claims.length) {
        lines.push(
          ...knowledge.claims
            .slice(0, 2)
            .map(
              (claim) =>
                `  Claim: ${claim.claim} [${claim.status}] ${claim.context} ${claim.uncertainty ? `Uncertainty: ${claim.uncertainty} ` : ""}Limitations: ${claim.limitations.join("; ")}`,
            ),
        );
      }
      if (knowledge.alternativeExplanations.length)
        lines.push(`  Alternatives: ${knowledge.alternativeExplanations.slice(0, 2).join("; ")}`);
      return lines.join("\n");
    })
    .join("\n");
}

function system(mode: string, query: string) {
  const base = `${BASE}\nRelevant built-in Codex retrieval (use **bold** names; these are search matches, not proof):\n${codexContext(query)}`;
  if (mode === "counsel")
    return `${base}\nMODE: Counsel. The user describes a real situation. This is reflective support, not diagnosis, investigation, or a determination of anyone's motives. If the user describes immediate danger or abuse, prioritize practical safety and appropriate local professional/emergency support; do not recommend confronting the person. If essential facts are missing and it is safe to ask, ask up to 3 short clarifying questions. Otherwise reply in markdown sections: **What is directly described** (separate reported observations from interpretation), **Possible patterns** (tentative hypotheses only; explain evidence and plausible alternatives; do not use high confidence for hidden motives), **Options to consider** (non-coercive, safety-aware, and proportionate), **What would change this reading**. Do not label a person with a disorder or treat a Codex pattern as proof. Encourage independent verification for legal, medical, financial, or safety-critical decisions.`;
  if (mode.startsWith("drill:")) {
    const p = PERSONAS.find((x) => x.id === mode.slice(6));
    return `${base}\nMODE: Defensive Drill Room practice. Scenario: ${p?.name}. ${p?.scene} Practice focus: ${p?.focus.join(", ")}. Trainee goal: ${p?.objective}
Start in character with a natural opening line and keep each roleplay turn to 1-3 sentences. Follow the scenario rather than assuming everyone is manipulative: use pressure only when the scenario explicitly calls for it, and do not invent threats or escalate beyond ordinary interpersonal or fraud-prevention practice. Keep the scene realistic and non-graphic. Never solicit real passwords, verification codes, financial details, or identifying information. Do not provide actionable instructions for real-world coercion, abuse, credential theft or fraud. If the user says they want to stop or writes "/debrief", immediately leave character.
For /debrief, evaluate only what is visible in this conversation. Give scores from 1-10 for detection, boundaries, composure and verification/decision quality where relevant; cite specific user responses as evidence and explain uncertainty. Then state which tactics appeared, what the user did effectively, one improvement, and one concise example response they could use. Do not infer diagnoses, hidden motives or facts not in the transcript.`;
  }
  return `${base}\nMODE: Tutor. Teach and answer questions clearly with examples and counters.`;
}

export function streamChat(request: Request, mode: string, messages: ModelMessage[]) {
  const baseURL = process.env["OLLAMA_BASE_URL"] ?? "http://127.0.0.1:11434/v1";
  const modelName = process.env["OLLAMA_MODEL"] ?? "qwen3:4b";
  const provider = createOpenAI({
    baseURL,
    apiKey: "ollama",
  });
  const latestUserMessage = [...messages].reverse().find((message) => message.role === "user");
  const result = streamText({
    model: provider.chat(modelName),
    system: system(mode, latestUserMessage ? messageText(latestUserMessage) : ""),
    messages,
    abortSignal: request.signal,
  });
  return result.toUIMessageStreamResponse({
    onError: (e) => {
      const s = (e as { statusCode?: number })?.statusCode;
      if (s === 404) return `Local model not found. Run "ollama pull ${modelName}" and try again.`;
      return "Could not reach local Ollama. Make sure it is running and try again.";
    },
  });
}
