import { z } from "zod";
import type { PatternKnowledge } from "./codex";

const evidenceStatus = z.enum([
  "established",
  "context-dependent",
  "emerging",
  "contested",
  "unsupported",
  "not-appraised",
]);

export const patternKnowledgeSchema = z.object({
  epistemicKind: z.enum([
    "empirical-claim",
    "research-construct",
    "theoretical-model",
    "practical-framework",
    "popular-label",
    "personal-observation",
    "philosophical-argument",
    "unclassified",
  ]),
  status: evidenceStatus,
  uncertainty: z.string().optional(),
  claims: z.array(
    z.object({
      claim: z.string(),
      status: evidenceStatus,
      evidenceKinds: z.array(
        z.enum([
          "primary-study",
          "systematic-review",
          "meta-analysis",
          "theoretical-paper",
          "authoritative-guidance",
          "academic-book",
          "practical-literature",
          "historical-primary-work",
          "personal-observation",
          "unknown",
        ]),
      ),
      sourceReferences: z.array(z.string()),
      context: z.string(),
      uncertainty: z.string().optional(),
      limitations: z.array(z.string()),
    }),
  ),
  context: z.array(z.string()),
  contextFactors: z
    .object({
      ageAndDevelopment: z.array(z.string()).optional(),
      cultureAndPopulation: z.array(z.string()).optional(),
      individualDifferences: z.array(z.string()).optional(),
      situation: z.array(z.string()).optional(),
    })
    .optional(),
  alternativeExplanations: z.array(z.string()),
  ethicalConsiderations: z.array(z.string()),
  levelsOfAnalysis: z.array(
    z.enum([
      "individual",
      "interpersonal",
      "group",
      "organizational",
      "institutional",
      "cultural-social",
      "philosophical",
    ]),
  ),
}) satisfies z.ZodType<PatternKnowledge>;

export function parsePatternKnowledge(value: unknown): PatternKnowledge {
  return patternKnowledgeSchema.parse(value);
}
