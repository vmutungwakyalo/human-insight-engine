export type Pattern = {
  slug: string;
  name: string;
  domain: string;
  signature: string;
  mechanism: string;
  seen: string;
  counters: string[];
  sources: string[];
  related: string[];
  knowledge?: PatternKnowledge | null;
};

export type EpistemicKind =
  | "empirical-claim"
  | "research-construct"
  | "theoretical-model"
  | "practical-framework"
  | "popular-label"
  | "personal-observation"
  | "philosophical-argument"
  | "unclassified";

export type EvidenceStatus =
  "established" | "context-dependent" | "emerging" | "contested" | "unsupported" | "not-appraised";

export type EvidenceKind =
  | "primary-study"
  | "systematic-review"
  | "meta-analysis"
  | "theoretical-paper"
  | "authoritative-guidance"
  | "academic-book"
  | "practical-literature"
  | "historical-primary-work"
  | "personal-observation"
  | "unknown";

export type ClaimEvidence = {
  claim: string;
  status: EvidenceStatus;
  evidenceKinds: EvidenceKind[];
  sourceReferences: string[];
  context: string;
  uncertainty?: string;
  limitations: string[];
};

export type ContextFactors = Partial<
  Record<
    "ageAndDevelopment" | "cultureAndPopulation" | "individualDifferences" | "situation",
    string[]
  >
>;

export type PatternKnowledge = {
  epistemicKind: EpistemicKind;
  status: EvidenceStatus;
  uncertainty?: string;
  claims: ClaimEvidence[];
  context: string[];
  contextFactors?: ContextFactors;
  alternativeExplanations: string[];
  ethicalConsiderations: string[];
  levelsOfAnalysis: (
    | "individual"
    | "interpersonal"
    | "group"
    | "organizational"
    | "institutional"
    | "cultural-social"
    | "philosophical"
  )[];
};

export type HniDomain = {
  code: string;
  title: string;
  status: "Foundation present" | "Limited" | "Major gap";
  summary: string;
  topics: string[];
  connections: string[];
};

export const HNI_DOMAINS: HniDomain[] = [
  {
    code: "A",
    title: "Self & Individual Mind",
    status: "Limited",
    summary:
      "Self-knowledge is treated as an integrated architecture of identity, agency, attention, beliefs, values, goals, habits, and self-regulation rather than a bundle of isolated traits.",
    topics: [
      "self-concept",
      "identity",
      "agency",
      "attention",
      "perception",
      "introspection",
      "beliefs",
      "values",
      "goals",
      "habits",
      "preferences",
      "self-regulation",
      "metacognition",
    ],
    connections: ["B", "C", "D", "E", "Q", "R"],
  },
  {
    code: "B",
    title: "Cognition & Reasoning",
    status: "Foundation present",
    summary:
      "Cognition is connected to memory, learning, attention, judgment, uncertainty, probabilistic thinking, biases, and mental models rather than treated as a list of separate tricks.",
    topics: [
      "memory",
      "learning",
      "attention",
      "perception",
      "reasoning",
      "judgment",
      "heuristics",
      "biases",
      "decision-making",
      "uncertainty",
      "probabilistic thinking",
      "motivated reasoning",
      "cognitive dissonance",
      "mental models",
    ],
    connections: ["A", "C", "L", "J", "M"],
  },
  {
    code: "C",
    title: "Emotion & Motivation",
    status: "Limited",
    summary:
      "Affective experience and motivation are understood as dynamic forces shaping decisions, behaviour, goal pursuit, regulation, and resilience rather than isolated feelings.",
    topics: [
      "emotion",
      "affect",
      "motivation",
      "reward",
      "goals",
      "frustration",
      "fear",
      "anger",
      "attachment-related processes",
      "regulation",
      "emotional appraisal",
      "approach",
      "avoidance",
    ],
    connections: ["A", "B", "E", "G", "L", "K"],
  },
  {
    code: "D",
    title: "Personality & Individual Differences",
    status: "Limited",
    summary:
      "Personality is represented through evidence-aware trait models, temperament, interpersonal styles, and developmental context, while avoiding unsupported popular labels disguised as scientific constructs.",
    topics: [
      "personality traits",
      "temperament",
      "individual differences",
      "behavioral tendencies",
      "interpersonal styles",
      "trait models",
      "personality development",
      "measurement limitations",
    ],
    connections: ["A", "C", "E", "F", "G", "H"],
  },
  {
    code: "E",
    title: "Human Development",
    status: "Limited",
    summary:
      "Developmental findings are contextualized by age, family, peers, and life stage rather than generalized across infancy, childhood, adolescence, adulthood, and aging without qualification.",
    topics: [
      "infancy",
      "childhood",
      "adolescence",
      "adulthood",
      "aging",
      "attachment development",
      "socialization",
      "learning",
      "family influence",
      "peer influence",
      "developmental transitions",
      "identity development",
    ],
    connections: ["A", "C", "D", "G", "O"],
  },
  {
    code: "F",
    title: "Social Psychology",
    status: "Limited",
    summary:
      "Social behaviour is studied through perception, attribution, conformity, obedience, identity, comparison, trust, norms, cooperation, and collective patterns linked to larger systems of influence and culture.",
    topics: [
      "social perception",
      "attribution",
      "conformity",
      "obedience",
      "social identity",
      "social comparison",
      "reputation",
      "cooperation",
      "competition",
      "reciprocity",
      "trust",
      "group influence",
      "norms",
      "persuasion",
      "collective behavior",
    ],
    connections: ["B", "G", "H", "I", "J", "M", "O"],
  },
  {
    code: "G",
    title: "Relationships",
    status: "Limited",
    summary:
      "Relationships are treated developmentally and contextually, covering trust, attachment, boundaries, conflict, communication, repair, maintenance, and dissolution without reducing them to simplistic rules.",
    topics: [
      "friendship",
      "family",
      "romantic relationships",
      "trust",
      "communication",
      "attachment",
      "intimacy",
      "conflict",
      "dependence",
      "boundaries",
      "betrayal",
      "reconciliation",
      "cooperation",
      "relationship maintenance",
      "relationship dissolution",
    ],
    connections: ["C", "E", "F", "H", "K", "P"],
  },
  {
    code: "H",
    title: "Communication",
    status: "Limited",
    summary:
      "Communication is taught as context-dependent evidence, not a reliable window into hidden internal states; verbal, nonverbal, listening, questioning, framing, disagreement, repair, and negotiation communication are all examined carefully.",
    topics: [
      "verbal communication",
      "nonverbal communication",
      "listening",
      "questioning",
      "framing",
      "ambiguity",
      "rhetoric",
      "argumentation",
      "persuasion",
      "disagreement",
      "feedback",
      "repair",
      "negotiation communication",
    ],
    connections: ["F", "G", "I", "P", "Q"],
  },
  {
    code: "I",
    title: "Power & Hierarchy",
    status: "Foundation present",
    summary:
      "Power is distinguished by source and mechanism: authority, hierarchy, expertise, legitimacy, status, resource control, information asymmetry, coalition power, and dependency all operate differently.",
    topics: [
      "authority",
      "status",
      "prestige",
      "dominance",
      "hierarchy",
      "resource control",
      "information asymmetry",
      "institutional power",
      "expertise",
      "legitimacy",
      "social capital",
      "network power",
      "reputation",
      "coalition power",
      "bargaining power",
      "dependency",
    ],
    connections: ["F", "H", "J", "N", "O", "P"],
  },
  {
    code: "J",
    title: "Influence & Persuasion",
    status: "Foundation present",
    summary:
      "Influence is separated from coercion and ordinary persuasion, with attention to compliance, beliefs, trust, messaging, and ethical limits on persuasion attempts.",
    topics: [
      "persuasion",
      "influence",
      "compliance",
      "ethics of influence",
      "social proof",
      "authority",
      "liking",
      "scarcity",
      "framing",
      "trust and credibility",
      "resistance",
    ],
    connections: ["B", "F", "H", "I", "K", "Q"],
  },
  {
    code: "K",
    title: "Manipulation, Coercion & Defense",
    status: "Foundation present",
    summary:
      "The domain studies manipulation, coercive control, exploitation, deception, and defensive practices while distinguishing harmful social engineering from ordinary interpersonal influence.",
    topics: [
      "manipulation",
      "coercion",
      "deception",
      "exploitation",
      "coercive control",
      "defensive responses",
      "safety",
      "boundaries",
      "protection",
      "resilience",
    ],
    connections: ["C", "G", "J", "I", "Q"],
  },
  {
    code: "L",
    title: "Decision-Making & Behavioural Economics",
    status: "Limited",
    summary:
      "Decision-making is mapped across risk, incentives, bounded rationality, uncertainty, time preference, framing, and social preferences, linking behavioral findings to practical choices.",
    topics: [
      "risk",
      "decision-making",
      "behavioral economics",
      "utility",
      "uncertainty",
      "bounded rationality",
      "incentives",
      "intertemporal choice",
      "social preferences",
      "heuristics",
      "framing",
    ],
    connections: ["B", "C", "F", "J", "P"],
  },
  {
    code: "M",
    title: "Groups & Collective Behaviour",
    status: "Limited",
    summary:
      "Group processes are understood as interactions among identity, norms, network structure, polarization, collective action, crowds, conflict, and leadership rather than just social pressure in the moment.",
    topics: [
      "group identity",
      "norms",
      "leadership",
      "polarization",
      "crowds",
      "collective action",
      "networks",
      "group conflict",
      "coordination",
      "social contagion",
    ],
    connections: ["F", "I", "N", "O", "P"],
  },
  {
    code: "N",
    title: "Organizations & Institutions",
    status: "Limited",
    summary:
      "Institutional life is analysed in terms of hierarchy, bureaucracy, organization culture, incentives, power, information flow, politics, and coordination across groups and systems.",
    topics: [
      "organizations",
      "institutions",
      "bureaucracy",
      "culture",
      "incentives",
      "politics",
      "information flow",
      "coordination",
      "institutional decision-making",
      "hierarchy",
    ],
    connections: ["I", "M", "O", "P", "Q"],
  },
  {
    code: "O",
    title: "Culture & Society",
    status: "Limited",
    summary:
      "Culture and society are studied as systems of shared meaning, socialization, power, class structure, collective beliefs, and context-sensitive variation in human behaviour.",
    topics: [
      "culture",
      "society",
      "socialization",
      "class",
      "social structure",
      "collective beliefs",
      "values",
      "norms",
      "cultural variation",
      "context",
      "population differences",
    ],
    connections: ["E", "F", "M", "N", "Q", "R"],
  },
  {
    code: "P",
    title: "Negotiation & Conflict",
    status: "Limited",
    summary:
      "Negotiation is framed around interests, bargaining power, escalation, de-escalation, mediation, compromise, repair, and conflict dynamics rather than isolated tactics alone.",
    topics: [
      "negotiation",
      "conflict",
      "interests",
      "bargaining",
      "escalation",
      "de-escalation",
      "mediation",
      "compromise",
      "repair",
      "reconciliation",
    ],
    connections: ["G", "H", "I", "K", "L", "M"],
  },
  {
    code: "Q",
    title: "Ethics & Human Conduct",
    status: "Limited",
    summary:
      "Ethical reasoning covers consent, autonomy, fairness, harm, responsibility, dignity, justice, and moral reflection in human behaviour and decision-making.",
    topics: [
      "ethics",
      "autonomy",
      "consent",
      "fairness",
      "harm",
      "responsibility",
      "justice",
      "dignity",
      "moral reasoning",
      "virtue",
      "values",
    ],
    connections: ["A", "C", "H", "J", "K", "N", "R"],
  },
  {
    code: "R",
    title: "Philosophy of Human Nature",
    status: "Limited",
    summary:
      "This domain distinguishes empirical evidence from philosophical arguments about selfhood, agency, free will, meaning, morality, flourishing, and the interpretation of human nature.",
    topics: [
      "free will",
      "agency",
      "meaning",
      "morality",
      "flourishing",
      "selfhood",
      "human nature",
      "empirical evidence",
      "philosophical argument",
      "interpretation",
    ],
    connections: ["A", "B", "O", "Q"],
  },
];

export const DOMAINS = [
  "Self-Knowledge",
  "Cognition & Bias",
  "Reading Others",
  "Personality & Individual Differences",
  "Human Development",
  "Emotion & Motivation",
  "Social Psychology",
  "Relationships",
  "Power",
  "Organizations",
  "Influence",
  "Ethics & Influence",
  "Decision-Making & Power",
  "Manipulation",
  "Attachment",
  "Communication",
  "Culture & Ethics",
  "Negotiation",
  "Social Engineering",
  "Information Warfare",
] as const;

export type CodexSearchResult = {
  pattern: Pattern;
  match: string;
  score: number;
};

type SearchConcept = {
  name: string;
  terms: string[];
  slugs: string[];
};

const SEARCH_CONCEPTS: SearchConcept[] = [
  {
    name: "coercive control and constrained agency",
    terms: [
      "coercive control",
      "abuse",
      "isolation",
      "dependency",
      "dependence",
      "safety",
      "agency",
      "coercion",
    ],
    slugs: [
      "isolation",
      "trauma-bonding",
      "gaslighting",
      "institutional-legal-economic-levers",
      "double-bind",
      "learned-helplessness",
    ],
  },
  {
    name: "observation and interpretation",
    terms: [
      "body language",
      "nonverbal",
      "gesture",
      "facial expression",
      "silence",
      "eye contact",
      "mind reading",
      "hidden motive",
      "deception cues",
    ],
    slugs: [
      "nonverbal-cue-context",
      "thin-slice-judgments",
      "correspondence-bias",
      "active-listening",
    ],
  },
  {
    name: "social influence and group pressure",
    terms: ["conformity", "social proof", "group pressure", "norms", "belonging", "crowd"],
    slugs: [
      "social-proof",
      "normative-and-informational-influence",
      "group-polarization",
      "pluralistic-ignorance",
      "ingroup-favoritism",
      "ostracism-silent-treatment",
    ],
  },
  {
    name: "decision pressure and uncertainty",
    terms: ["decision", "uncertainty", "urgency", "risk", "choice", "evidence", "bias"],
    slugs: [
      "loss-aversion",
      "sunk-cost",
      "scarcity",
      "overconfidence-effect",
      "planning-fallacy",
      "confirmation-bias",
    ],
  },
  {
    name: "relationship attachment and repair",
    terms: ["attachment", "relationship", "trust", "repair", "betrayal", "intimacy"],
    slugs: [
      "attachment-orientations",
      "trauma-bonding",
      "demand-withdraw-pattern",
      "self-disclosure-reciprocity",
      "emotional-flooding",
    ],
  },
  {
    name: "power and authority",
    terms: ["power", "authority", "status", "hierarchy", "institution", "gatekeeper"],
    slugs: [
      "authority",
      "institutional-legal-economic-levers",
      "organizational-silence",
      "psychological-safety",
      "batna",
    ],
  },
];

function normalizeSearchText(value: string) {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, " ");
}

export function searchPatterns(
  query: string,
  patterns: Pattern[],
  domain?: string | null,
): CodexSearchResult[] {
  const normalizedQuery = normalizeSearchText(query.trim());
  const terms = normalizedQuery.split(/\s+/).filter((term) => term.length > 1);
  const selectedConcepts = SEARCH_CONCEPTS.filter((concept) =>
    concept.terms.some((term) => {
      const normalizedTerm = normalizeSearchText(term);
      return normalizedTerm.includes(" ")
        ? normalizedQuery.includes(normalizedTerm)
        : terms.includes(normalizedTerm);
    }),
  );

  const results = patterns
    .filter(
      (pattern) =>
        !domain ||
        pattern.domain === domain ||
        (domain === "Human Development" && pattern.domain === "Development"),
    )
    .map((pattern) => {
      if (!normalizedQuery) return { pattern, match: "", score: 0 };
      const fields = [
        { name: "name", text: pattern.name, weight: 8 },
        { name: "definition", text: pattern.signature, weight: 6 },
        { name: "mechanism", text: pattern.mechanism, weight: 4 },
        { name: "examples", text: pattern.seen, weight: 3 },
        { name: "domain", text: pattern.domain, weight: 4 },
        { name: "defensive responses", text: pattern.counters.join(" "), weight: 2 },
        { name: "sources", text: pattern.sources.join(" "), weight: 2 },
        {
          name: "claim",
          text: pattern.knowledge?.claims.map((claim) => claim.claim).join(" ") ?? "",
          weight: 4,
        },
        { name: "context", text: pattern.knowledge?.context.join(" ") ?? "", weight: 2 },
        {
          name: "context factors",
          text: Object.values(pattern.knowledge?.contextFactors ?? {})
            .flat()
            .join(" "),
          weight: 2,
        },
        { name: "uncertainty", text: pattern.knowledge?.uncertainty ?? "", weight: 2 },
        {
          name: "alternative explanations",
          text: pattern.knowledge?.alternativeExplanations.join(" ") ?? "",
          weight: 2,
        },
      ];
      let score = 0;
      const matchedFields: string[] = [];
      for (const field of fields) {
        const text = normalizeSearchText(field.text);
        const matchedTerms = terms.filter((term) => text.includes(term));
        if (matchedTerms.length) {
          score += matchedTerms.length * field.weight;
          matchedFields.push(field.name);
        }
      }
      const semanticMatches = selectedConcepts.filter((concept) =>
        concept.slugs.includes(pattern.slug),
      );
      score += semanticMatches.length * 5;
      if (semanticMatches.length) matchedFields.push(...semanticMatches.map((item) => item.name));
      return { pattern, match: [...new Set(matchedFields)].join(", "), score };
    })
    .filter((result) => !normalizedQuery || result.score > 0);
  return normalizedQuery
    ? results.sort((a, b) => b.score - a.score || a.pattern.name.localeCompare(b.pattern.name))
    : results;
}

export function getPatternKnowledge(pattern: Pattern): PatternKnowledge {
  return (
    pattern.knowledge ?? {
      epistemicKind: "unclassified",
      status: "not-appraised",
      claims: [],
      context: [],
      alternativeExplanations: [],
      ethicalConsiderations: [],
      levelsOfAnalysis: [],
    }
  );
}

export const PATTERNS: Pattern[] = [
  {
    slug: "intermittent-reinforcement",
    name: "Intermittent Reinforcement",
    domain: "Manipulation",
    signature: "A behaviour is followed by a reward on an unpredictable schedule.",
    mechanism:
      "Intermittent reinforcement can maintain behaviour, but its effects depend on the schedule, context, prior learning, and available alternatives. Laboratory reinforcement findings do not by themselves explain attachment or establish deliberate manipulation in a relationship.",
    seen: "Variable reward schedules in learning tasks and gambling products; inconsistent attention in relationships is an analogy, not proof that conditioning explains the bond.",
    counters: [
      "Describe the observed sequence without assuming a deliberate schedule",
      "Consider other explanations and the wider relationship context",
      "If the relationship feels unsafe, seek trusted or specialist support before confronting",
    ],
    sources: ["B. F. Skinner — Schedules of Reinforcement", "Patrick Carnes — The Betrayal Bond"],
    related: ["trauma-bonding", "love-bombing", "learned-helplessness"],
    knowledge: {
      epistemicKind: "research-construct",
      status: "not-appraised",
      claims: [],
      context: [
        "Learning effects depend on the schedule, task, prior experience, and available alternatives.",
        "Applying laboratory reinforcement concepts to relationships is an analogy that needs separate evidence.",
      ],
      contextFactors: {
        individualDifferences: ["Prior learning and available alternatives may vary."],
        situation: ["Task, reinforcement schedule, and setting affect applicability."],
      },
      alternativeExplanations: [
        "Inconsistent contact may reflect changing circumstances, communication expectations, or unrelated constraints.",
        "A person's continued involvement may reflect practical, social, financial, or safety constraints rather than reinforcement alone.",
      ],
      ethicalConsiderations: [
        "Do not use this concept to diagnose another person or infer deliberate strategy from inconsistency alone.",
        "For potentially abusive situations, prioritize privacy and specialist safety support over confrontation.",
      ],
      levelsOfAnalysis: ["individual", "interpersonal", "organizational"],
    },
  },
  {
    slug: "trauma-bonding",
    name: "Trauma Bonding",
    domain: "Attachment",
    signature:
      "A term used in some clinical and practitioner literature for attachment in an abusive or coercive relationship.",
    mechanism:
      "The term is not a diagnosis and its boundaries and mechanisms are not uniformly defined. Threat, dependence, isolation, unequal power, practical constraints, and periods of relief may contribute to difficulty leaving; no single mechanism should be assumed from outside.",
    seen: "Some discussions of abusive or coercive relationships. Use concrete behaviour and safety conditions rather than applying the label as an explanation.",
    counters: [
      "Document events only if doing so is safe and private",
      "Consider practical barriers, support options, and the person's own account",
      "Seek specialist support for safety planning; avoid confrontation that could increase danger",
    ],
    sources: ["Patrick Carnes — The Betrayal Bond", "Judith Herman — Trauma and Recovery"],
    related: ["intermittent-reinforcement", "isolation", "gaslighting"],
    knowledge: {
      epistemicKind: "popular-label",
      status: "not-appraised",
      claims: [],
      context: [
        "The term's definition and proposed mechanisms vary across clinical and practitioner literature.",
        "Interpretation depends on the person's account, relationship history, available resources, and safety context.",
      ],
      contextFactors: {
        individualDifferences: ["Personal history and the person's own account matter."],
        situation: [
          "Resources, dependency, coercion, privacy, and safety conditions may shape options.",
        ],
      },
      alternativeExplanations: [
        "Difficulty leaving can involve housing, finances, caregiving, immigration status, social pressure, fear, or limited safe options.",
        "A close or ambivalent bond by itself does not establish abuse or a trauma bond.",
      ],
      ethicalConsiderations: [
        "Do not apply this label as a diagnosis or use it to pressure someone to leave.",
        "Any documentation or safety planning should account for privacy and the possibility of monitoring.",
      ],
      levelsOfAnalysis: ["individual", "interpersonal", "institutional"],
    },
  },
  {
    slug: "gaslighting",
    name: "Gaslighting",
    domain: "Manipulation",
    signature:
      "A term often used for a repeated pattern of denying or distorting events in ways that may undermine another person's confidence in their perceptions; disagreement or different memories alone do not establish it.",
    mechanism:
      "Repeated denial, distortion, or intimidation can make reality-testing harder, particularly where power is unequal. Definitions vary, and an observer cannot infer intent or effect from one disagreement.",
    seen: "Some accounts of coercive relationships, abusive management, and institutional denial; assess the specific pattern and context.",
    counters: [
      "If safe and private, distinguish contemporaneous records from later interpretations",
      "Seek a trusted perspective without treating any one account as automatically conclusive",
      "If there is a safety risk, prioritize confidential specialist support over confrontation",
    ],
    sources: ["Robin Stern — The Gaslight Effect", "George K. Simon — In Sheep's Clothing"],
    related: ["isolation", "trauma-bonding", "moving-goalposts"],
    knowledge: {
      epistemicKind: "popular-label",
      status: "not-appraised",
      claims: [],
      context: [
        "Definitions of gaslighting vary across clinical, scholarly, and popular writing.",
        "Assess repeated behaviours, power, effects, and context rather than treating the label as a finding about intent.",
      ],
      contextFactors: {
        situation: ["Power differences, repetition, and consequences affect interpretation."],
      },
      alternativeExplanations: [
        "A single disagreement may involve ordinary memory error, different perspectives, incomplete information, or misunderstanding.",
        "Repeated harmful effects do not by themselves establish a person's conscious strategy.",
      ],
      ethicalConsiderations: [
        "Do not diagnose or accuse someone based solely on a checklist or one conflicting recollection.",
        "Documentation and third-party consultation should be private and safe in coercive situations.",
      ],
      levelsOfAnalysis: ["individual", "interpersonal", "organizational", "institutional"],
    },
  },
  {
    slug: "love-bombing",
    name: "Love Bombing",
    domain: "Manipulation",
    signature:
      "A popular term for unusually intense early affection, attention, or future-talk; intensity alone does not establish coercion or predict later abuse.",
    mechanism:
      "Some coercive or high-pressure contexts use intense attention to accelerate trust or commitment, but motives and outcomes cannot be inferred from intensity alone.",
    seen: "The term appears in discussions of some relationships, recruitment, and high-pressure sales; examine specific requests, boundaries, and subsequent behaviour.",
    counters: [
      "Take the time you need before making commitments or sharing sensitive information",
      "Notice whether boundaries and a slower pace are respected without retaliation",
      "Consider the whole pattern over time rather than intensity as proof of intent",
    ],
    sources: ["Steven Hassan — Combating Cult Mind Control", "Robert Lifton — Thought Reform"],
    related: ["intermittent-reinforcement", "reciprocity", "isolation"],
    knowledge: {
      epistemicKind: "popular-label",
      status: "not-appraised",
      claims: [],
      context: [
        "The term is used inconsistently and does not function as a diagnosis or validated measure.",
        "Early relationship enthusiasm varies across people and cultures; assess consent, pressure, and boundary responses.",
      ],
      contextFactors: {
        cultureAndPopulation: [
          "Expressions of affection and expectations vary across people and cultures.",
        ],
        situation: [
          "Consent, requests, boundaries, and responses over time matter more than intensity alone.",
        ],
      },
      alternativeExplanations: [
        "High affection or future-oriented talk may reflect enthusiasm, communication style, or differing expectations.",
        "A later change in behaviour does not prove that early affection was deliberately strategic.",
      ],
      ethicalConsiderations: [
        "Do not use the label to pathologize affection or make a conclusion about hidden motives.",
        "Support autonomy and safety; avoid pressuring someone to test another person's reaction.",
      ],
      levelsOfAnalysis: ["individual", "interpersonal", "group"],
    },
  },
  {
    slug: "isolation",
    name: "Isolation",
    domain: "Manipulation",
    signature: "Gradual reduction of your outside contacts, framed as closeness or loyalty.",
    mechanism:
      "Removes independent reality checks and alternative sources of support, increasing dependency.",
    seen: "Coercive control, cults, some high-demand organisations.",
    counters: [
      "Where safe, preserve access to trusted people and independent support",
      "Notice whether limits on contact are mutual, freely chosen, or enforced through pressure",
      "If contact is monitored or constrained, seek confidential specialist advice before changing routines",
    ],
    sources: ["Evan Stark — Coercive Control", "Steven Hassan — The BITE Model"],
    related: ["gaslighting", "trauma-bonding"],
  },
  {
    slug: "reciprocity",
    name: "Reciprocity Pressure",
    domain: "Influence",
    signature: "An unrequested gift or favour followed by a request.",
    mechanism:
      "Reciprocity is a common social norm, but its strength and meaning vary across people and contexts. A gift does not create an obligation to accept a request.",
    seen: "Free samples, charity mailers, favours from colleagues before asks.",
    counters: [
      "Redefine the gift as a sales tactic, which removes the debt",
      "Accept graciously, decide separately",
    ],
    sources: ["Robert Cialdini — Influence", "Marcel Mauss — The Gift"],
    related: ["commitment-consistency", "love-bombing"],
  },
  {
    slug: "commitment-consistency",
    name: "Commitment & Consistency",
    domain: "Influence",
    signature: "A small yes used to extract a larger yes.",
    mechanism:
      "People align future behaviour with prior public commitments to preserve a consistent self-image.",
    seen: "Foot-in-the-door sales, escalating demands, sunk-cost projects.",
    counters: [
      "Ask: knowing what I know now, would I agree from scratch?",
      "Separate identity from past decisions",
    ],
    sources: ["Robert Cialdini — Influence", "Leon Festinger — A Theory of Cognitive Dissonance"],
    related: ["reciprocity", "sunk-cost", "moving-goalposts"],
  },
  {
    slug: "social-proof",
    name: "Social Proof",
    domain: "Influence",
    signature: "Everyone else is doing it — especially people like you.",
    mechanism: "Under uncertainty, others' behaviour is used as evidence of correct behaviour.",
    seen: "Reviews, queues, trends, bystander inaction, conformity experiments.",
    counters: [
      "Ask whether the crowd has better information than you",
      "Look for manufactured signals",
    ],
    sources: ["Robert Cialdini — Influence", "Solomon Asch — Conformity Experiments"],
    related: ["authority", "commitment-consistency"],
  },
  {
    slug: "authority",
    name: "Authority Deference",
    domain: "Power",
    signature: "Compliance triggered by titles, uniforms or confident expertise.",
    mechanism:
      "Authority cues can influence judgments and compliance, but responses vary with context, legitimacy, perceived expertise, and the costs of refusal. Classic laboratory studies do not show that people invariably obey or that a title proves expertise.",
    seen: "Milgram experiments, medical settings, scam calls impersonating officials.",
    counters: [
      "Ask: is this person actually an expert on this specific question?",
      "Verify through an independent channel",
    ],
    sources: ["Stanley Milgram — Obedience to Authority", "Robert Cialdini — Influence"],
    related: ["social-proof", "scarcity"],
    knowledge: {
      epistemicKind: "research-construct",
      status: "not-appraised",
      claims: [],
      context: [
        "Responses to authority depend on perceived legitimacy, expertise, setting, available alternatives, and consequences of refusal.",
        "Laboratory studies should not be treated as direct predictions of every real-world institutional interaction.",
      ],
      contextFactors: {
        cultureAndPopulation: ["Norms and institutions differ across populations and settings."],
        situation: ["Legitimacy, expertise, alternatives, and refusal costs shape responses."],
      },
      alternativeExplanations: [
        "Compliance may reflect relevant expertise, agreement, coordination needs, or practical constraints rather than deference alone.",
        "Questioning may be limited by unequal access, retaliation risk, or uncertainty about the process.",
      ],
      ethicalConsiderations: [
        "Verify credentials and claims independently when stakes are high.",
        "Do not infer a person's motives or competence from status cues alone.",
      ],
      levelsOfAnalysis: ["individual", "interpersonal", "organizational", "institutional"],
    },
  },
  {
    slug: "scarcity",
    name: "Scarcity & Urgency",
    domain: "Influence",
    signature: "Limited time, limited quantity, act now.",
    mechanism:
      "Loss aversion and reactance make threatened options feel more valuable; urgency suppresses deliberation.",
    seen: "Sales countdowns, exploding offers, romantic ultimatums.",
    counters: [
      "Treat artificial deadlines as a signal to slow down",
      "Decide what it is worth before seeing the clock",
    ],
    sources: ["Robert Cialdini — Influence", "Daniel Kahneman — Thinking, Fast and Slow"],
    related: ["loss-aversion", "authority"],
  },
  {
    slug: "loss-aversion",
    name: "Loss Aversion",
    domain: "Cognition & Bias",
    signature:
      "A potential loss can influence choice differently from an equivalent potential gain.",
    mechanism:
      "Prospect theory models reference-dependent value and loss aversion, but the size of the effect is not a universal fixed ratio. Estimates vary with task, stakes, reference point, and method.",
    seen: "Negotiations, insurance, staying in bad jobs or relationships.",
    counters: ["Reframe the same choice as a gain and see if your answer changes"],
    sources: ["Kahneman & Tversky — Prospect Theory", "Daniel Kahneman — Thinking, Fast and Slow"],
    related: ["sunk-cost", "scarcity"],
    knowledge: {
      epistemicKind: "research-construct",
      status: "not-appraised",
      claims: [],
      context: [
        "The magnitude of loss-aversion estimates varies with task design, reference point, stakes, and method.",
        "A decision that appears loss-averse may also reflect uncertainty, switching costs, or a rational difference in expected outcomes.",
      ],
      contextFactors: {
        individualDifferences: ["Goals and reference points differ between people and decisions."],
        situation: [
          "Task, stakes, reference point, and available information affect applicability.",
        ],
      },
      alternativeExplanations: [
        "A person may retain an option because of uncertainty, transaction costs, obligations, or missing information.",
        "Choices may reflect different goals or reference points rather than a stable bias.",
      ],
      ethicalConsiderations: [
        "Do not present a single numerical ratio as a universal law.",
        "Use the concept to inspect framing, not to dismiss a person's stated reasons.",
      ],
      levelsOfAnalysis: ["individual", "interpersonal", "organizational"],
    },
  },
  {
    slug: "sunk-cost",
    name: "Sunk-Cost Fallacy",
    domain: "Cognition & Bias",
    signature: "Continuing because of what you already spent, not what you will gain.",
    mechanism:
      "Past investment is emotionally counted in future decisions, driven by loss aversion and self-justification.",
    seen: "Failing projects, long bad relationships, wars of attrition.",
    counters: ["Ask only: from today, is the next unit of investment worth it?"],
    sources: [
      "Arkes & Blumer — The Psychology of Sunk Cost",
      "Carol Tavris — Mistakes Were Made (But Not by Me)",
    ],
    related: ["loss-aversion", "commitment-consistency"],
  },
  {
    slug: "projection",
    name: "Projection",
    domain: "Self-Knowledge",
    signature: "Strong reactions to traits in others that you disown in yourself.",
    mechanism:
      "Unacceptable impulses are attributed outward to protect self-image — Jung's 'shadow'.",
    seen: "Accusations that mirror the accuser, irrational dislike of certain people.",
    counters: [
      "When a reaction is disproportionate, ask what it says about you",
      "Journal recurring triggers",
    ],
    sources: ["C. G. Jung — Aion", "Anna Freud — The Ego and the Mechanisms of Defence"],
    related: ["self-serving-bias"],
  },
  {
    slug: "self-serving-bias",
    name: "Self-Serving Bias",
    domain: "Self-Knowledge",
    signature: "Success is mine; failure is circumstance.",
    mechanism: "Protects self-esteem by attributing outcomes asymmetrically.",
    seen: "Performance reviews, arguments, post-mortems.",
    counters: ["Write the version of events where you share responsibility"],
    sources: ["Carol Tavris — Mistakes Were Made (But Not by Me)"],
    related: ["projection"],
  },
  {
    slug: "moving-goalposts",
    name: "Moving the Goalposts",
    domain: "Power",
    signature: "Every time you meet the standard, the standard changes.",
    mechanism: "Keeps the target striving for approval that is never granted, maintaining control.",
    seen: "Demanding bosses, narcissistic parents, endless negotiations.",
    counters: [
      "Get criteria in writing before you start",
      "Stop auditioning; state what you will deliver",
    ],
    sources: ["George K. Simon — In Sheep's Clothing", "Robert Greene — The 48 Laws of Power"],
    related: ["gaslighting", "commitment-consistency"],
  },
  {
    slug: "mirroring",
    name: "Tactical Mirroring",
    domain: "Negotiation",
    signature: "Repeating the last few words someone said, as a question.",
    mechanism: "Signals attention and invites elaboration; people fill silence with information.",
    seen: "Hostage negotiation, interviewing, sales discovery.",
    counters: [
      "When you notice it, give less, not more",
      "Use it yourself to learn before committing",
    ],
    sources: ["Chris Voss — Never Split the Difference"],
    related: ["batna"],
  },
  {
    slug: "batna",
    name: "BATNA",
    domain: "Negotiation",
    signature: "Your power is your best alternative if this deal fails.",
    mechanism:
      "Leverage comes from the ability to walk away; a weak alternative produces weak terms.",
    seen: "Salary talks, contracts, relationships with high exit cost.",
    counters: ["Improve your alternative before negotiating", "Never reveal a weak BATNA"],
    sources: ["Fisher & Ury — Getting to Yes"],
    related: ["mirroring", "scarcity"],
  },
  {
    slug: "learned-helplessness",
    name: "Learned Helplessness",
    domain: "Attachment",
    signature: "Giving up trying because past efforts never changed anything.",
    mechanism:
      "Repeated uncontrollable outcomes teach that action is futile, persisting even after control returns.",
    seen: "Long-term abuse, oppressive workplaces, chronic failure environments.",
    counters: [
      "Engineer small, controllable wins",
      "Test the current environment instead of the remembered one",
    ],
    sources: ["Martin Seligman — Learned Optimism", "Viktor Frankl — Man's Search for Meaning"],
    related: ["intermittent-reinforcement", "trauma-bonding"],
  },
  {
    slug: "emotional-breadcrumbing",
    name: "Emotional Breadcrumbing",
    domain: "Manipulation",
    signature:
      "Small doses of attention, vague promises and intermittent contact keep you orbiting without commitment.",
    mechanism:
      "The target receives enough reinforcement to remain invested but not enough clarity to establish a stable boundary. The resulting uncertainty preserves the manipulator's control.",
    seen: "Flirtation with no follow-through, erratic texting, future-faking, hot-and-cold attention patterns.",
    counters: [
      "Ask for clarity and time-bound commitments",
      "Track whether their behaviour matches their words over time",
      "Stop rewarding vague attention with emotional labour",
    ],
    sources: [
      "Unpublished practitioner observation; not an independently verified scientific claim",
      "B. F. Skinner — schedules of reinforcement; related to intermittent reward loops",
    ],
    related: ["intermittent-reinforcement", "love-bombing", "attention-looming"],
  },
  {
    slug: "rescue-fantasy",
    name: "Rescue Fantasy",
    domain: "Manipulation",
    signature:
      "A person appears only in crisis, then disappears once you are stable enough to think clearly.",
    mechanism:
      "Crisis creates a role with immediate relevance; once the target no longer needs rescuing, the relationship loses its dramatic purpose and the manipulator exits.",
    seen: "Crisis-only helpers, rescue-oriented partnerships, dramatic support followed by emotional withdrawal.",
    counters: [
      "Notice whether support is consistent in ordinary times, not only during emergencies",
      "Refuse to become a role instead of a person",
      "Measure their reliability when you are calm and not in need",
    ],
    sources: ["Unpublished practitioner observation; not an independently verified clinical model"],
    related: ["love-bombing", "trauma-bonding", "emotional-flooding"],
  },
  {
    slug: "rapid-mirroring-agreement",
    name: "Rapid Mirroring & Fast Agreement",
    domain: "Social Engineering",
    signature:
      "You are quickly matched in taste, values and emotional tone so the bond feels instantly aligned.",
    mechanism:
      "Fast interpersonal matching creates a sense of recognition and trust before deeper evidence is available. It can make consent feel easier and scrutiny weaker.",
    seen: "Instant rapport, intense 'you and me' energy, people who praise your interests immediately and heavily.",
    counters: [
      "Slow down and check whether the match is real or simply efficient",
      "Ask for the same level of candour about flaws and disagreements",
      "Let alignment be built over time, not forced upfront",
    ],
    sources: [
      "Chris Voss — Never Split the Difference",
      "Unpublished practitioner observation; this is a practical pattern, not a standalone scientific conclusion",
    ],
    related: ["mirroring", "charm-offensive", "conditional-affection"],
  },
  {
    slug: "cognitive-sensory-overload",
    name: "Cognitive & Sensory Overload",
    domain: "Information Warfare",
    signature:
      "Too much information, emotion, novelty, noise or sensory stimulation reduces autonomy and judgment.",
    mechanism:
      "When the brain is overloaded, it defaults to shortcuts: compliance, confusion, imitation, and reduced deliberation. This creates room for pressure, suggestion and framing.",
    seen: "Rapid-fire questioning, music, flashing lights, scented environments, novelty loops, pressure-filled decision moments.",
    counters: [
      "Request a pause and a concrete question set",
      "Reduce the number of decisions and sensory inputs in the room",
      "Write what is being asked before answering",
    ],
    sources: [
      "Daniel Kahneman — Thinking, Fast and Slow",
      "N. W. Schachter & J. E. Singer — emotional arousal and cognition research",
      "Unpublished practitioner observation; field pattern rather than a single peer-reviewed label",
    ],
    related: ["loss-aversion", "authority", "emotional-flooding"],
  },
  {
    slug: "charm-offensive",
    name: "Charm Offensive",
    domain: "Manipulation",
    signature:
      "Flattery, warmth and intense friendliness are deployed before the real ask or before you are tested.",
    mechanism:
      "Liking bias and reciprocity make people more likely to comply with someone who feels agreeable and generous. The real purpose is often to lower resistance, not to build genuine connection.",
    seen: "Overfriendly sales, social climbing, love-bombing, sudden campaign-style warmth.",
    counters: [
      "Ask what the person actually offers without the performance",
      "Watch for inconsistency between warmth and behaviour under stress",
      "Do not confuse charisma with trustworthy process",
    ],
    sources: [
      "Robert Cialdini — Influence",
      "Unpublished practitioner observation; especially in social dynamics where warmth is used strategically",
    ],
    related: ["reciprocity", "love-bombing", "rapid-mirroring-agreement"],
  },
  {
    slug: "strategic-pauses-and-silence",
    name: "Strategic Pauses & Silence",
    domain: "Manipulation",
    signature:
      "The other person creates discomfort with silence, delay or 'you have to wait' pressure.",
    mechanism:
      "Silence raises uncertainty, fills the mind with speculation and can drive the target to make a concession just to break the tension. Delay also increases urgency and emotional reactivity.",
    seen: "Negotiation dead air, repeated 'we need to think about it', dramatic pauses, keeping someone on hold.",
    counters: [
      "State your boundary: 'I will answer once I have time to think'",
      "Do not fill silence with concessions",
      "Use time to examine what is actually being demanded",
    ],
    sources: [
      "Chris Voss — Never Split the Difference",
      "Unpublished practitioner observation; practical pattern rather than a single formal theory",
    ],
    related: ["mirroring", "attention-looming", "double-bind"],
  },
  {
    slug: "naming-pattern",
    name: "Naming Pattern / Spotlight Effect",
    domain: "Manipulation",
    signature:
      "A person makes you feel uniquely seen, special or chosen to reduce your critical distance.",
    mechanism:
      "By framing you as exceptional, the manipulator leverages identity, vanity and attachment. Once you feel selected, you become more willing to overlook inconsistency.",
    seen: "Special treatment, targeted praise, midnight 'you are different' moments, grooming into dependence.",
    counters: [
      "Ask whether the praise is specific, accurate and consistent over time",
      "Separate being 'seen' from being 'chosen' without evidence",
      "Notice whether the attention comes with accountability or only adoration",
    ],
    sources: [
      "Unpublished practitioner observation; this is a pattern named from lived experience, not a single formal theory",
    ],
    related: ["charm-offensive", "love-bombing", "conditional-affection"],
  },
  {
    slug: "conditional-affection",
    name: "Conditional & Performative Affection",
    domain: "Manipulation",
    signature:
      "Affection is granted as a reward for obedience, compliance or emotional labour, not as a stable relationship condition.",
    mechanism:
      "The person controls the emotional economy: warmth flows only when you behave as they want. This makes the target chase approval and become more compliant.",
    seen: "Rewarded compliance, insults after boundaries, sudden kindness when you serve the dynamic.",
    counters: [
      "Treat warmth as evidence only when it is stable, not contingent",
      "Do not negotiate your boundaries for affection",
      "Notice whether love is offered or used as leverage",
    ],
    sources: [
      "Unpublished practitioner observation; not a single canonical clinical label",
      "Patrick Carnes — The Betrayal Bond",
    ],
    related: ["love-bombing", "guilt-tripping", "reward-punishment-cycle"],
  },
  {
    slug: "hybrid-cascade-campaign",
    name: "Hybrid Cascade / Multi-Modal Campaign",
    domain: "Social Engineering",
    signature:
      "Pressure moves across messages, settings and channels at once: text, voice, image, intimacy, fear and urgency combined.",
    mechanism:
      "When the same target is hit through multiple channels, the experience becomes harder to assess and easier to emotionally override. The target is kept in a moving, multidimensional state.",
    seen: "Texts plus calls plus social media plus in-person pressure; emotionally layered group dynamics.",
    counters: [
      "Separate the channels and review each message on its own",
      "Pause if several channels are firing at once",
      "Reduce the campaign into single facts before responding",
    ],
    sources: [
      "Unpublished practitioner observation; practical pattern rather than a single named discipline",
      "Social engineering / scam literature across behavioural psychology and security operations",
    ],
    related: ["cognitive-sensory-overload", "subliminal-messaging", "deepfake-coercion"],
  },
  {
    slug: "drug-induction",
    name: "Drug Induction / Chemical Conditioning",
    domain: "Manipulation",
    signature:
      "A person manipulates the chemistry of arousal, reward, attention or disinhibition to alter judgment and compliance.",
    mechanism:
      "Substances and stimulants can change salience, risk tolerance, emotional intensity and memory formation, making persuasion easier and boundaries weaker.",
    seen: "Coercive use of substances, intoxication to reduce resistance, stimulants to amplify attachment or risk-taking.",
    counters: [
      "Do not make decisions while chemically altered or while someone is controlling access to substances",
      "Separate any consent given under intoxication from sober consent",
      "Create a deliberate delay before acting on high-stakes decisions",
    ],
    sources: [
      "National Institute on Drug Abuse — drug effects on the brain and behaviour",
      "Berridge & Robinson — incentive salience and dopaminergic learning",
    ],
    related: ["attention-looming", "emotional-flooding", "cognitive-sensory-overload"],
  },
  {
    slug: "spiritual-archetypal-manipulation",
    name: "Spiritual & Archetypal Manipulation",
    domain: "Manipulation",
    signature:
      "Identity is re-framed through destiny, soul-matches, ritual, or moral superiority to make obedience feel sacred.",
    mechanism:
      "When a person makes their role feel cosmically meaningful, the target becomes less likely to question instructions or emotional demands. Meaning is used as a coercive lever.",
    seen: "Cult recruitment, destiny narratives, spiritual authority, intimate symbol systems.",
    counters: [
      "Separate spiritual meaning from behavioural accountability",
      "Check whether the authority can be questioned without punishment",
      "Ask for practical evidence, not symbolic validation alone",
    ],
    sources: [
      "Steven Hassan — Combating Cult Mind Control",
      "Robert Lifton — Thought Reform and the Psychology of Totalism",
      "Unpublished practitioner observation; not a standalone theory settled by one source",
    ],
    related: ["naming-pattern", "conditional-affection", "gatekeeping"],
  },
  {
    slug: "linguistic-microtechniques",
    name: "Linguistic & Conversational Microtechniques",
    domain: "Information Warfare",
    signature:
      "Embedded commands, leading questions, loaded language and identity diffusion are used to shape thought and compliance.",
    mechanism:
      "Language is not neutral. Leading formulations, suggestion, identity labels and covert imperatives can quietly prime a decision before it is consciously considered.",
    seen: "Loaded questions, presuppositions, guilt-heavy phrasing, coded scripts, repeated narratives that flatten alternative viewpoints.",
    counters: [
      "Separate the actual fact from the frame",
      "Ask open-ended fact questions and avoid loaded wording",
      "Keep a written record of key statements before responding",
    ],
    sources: [
      "Jacques Rancière / discourse analysis broadly",
      "Unpublished practitioner observation; a field pattern rather than a single formal doctrine",
    ],
    related: ["double-bind", "cognitive-sensory-overload", "reputation-laundering"],
  },
  {
    slug: "proxemics-and-touch-pressure",
    name: "Proxemics, Touch & Encroachment Pressure",
    domain: "Manipulation",
    signature:
      "Close physical presence, breaching personal space, or touch is used to shift power and reduce resistance.",
    mechanism:
      "Humans experience intrusions of space and touch as status signals; the body can be made to feel smaller, more exposed and less autonomous. Coercive proximity reduces independent thinking.",
    seen: "Crowding, looming over someone, repeated touch, intimidation through body position.",
    counters: [
      "Create physical distance before engaging on substance",
      "Name the behaviour and set a boundary directly",
      "Do not negotiate your safety under intimidation",
    ],
    sources: [
      "Edward Hall — The Hidden Dimension",
      "Unpublished practitioner observation; especially in social power dynamics",
    ],
    related: ["authority", "double-bind", "ostracism-silent-treatment"],
  },
  {
    slug: "institutional-legal-economic-levers",
    name: "Institutional, Legal & Economic Levers",
    domain: "Social Engineering",
    signature:
      "Authority is staged through uniforms, credentials, law, money and ritual so the message feels impossible to resist.",
    mechanism:
      "By embedding pressure into institutions and resources, the manipulator changes the cost of dissent. A person can be pressured to comply without direct coercion in the moment.",
    seen: "Legal intimidation, credential gating, financial dependence, status-signalling uniforms, costly process barriers.",
    counters: [
      "Separate emotional pressure from actual legal or logistical facts",
      "Verify authority and process through independent channels",
      "Reduce dependence where the structure itself is coercive",
    ],
    sources: [
      "Stanley Milgram — Obedience to Authority",
      "Unpublished practitioner observation; especially around institutional pressure and social signalling",
    ],
    related: ["authority", "gatekeeping", "reputation-laundering"],
  },
  {
    slug: "double-bind",
    name: "Double Bind",
    domain: "Manipulation",
    signature:
      "Two bad options are presented as if there is no neutral path, forcing a response that serves the manipulator.",
    mechanism:
      "The target is trapped between mutually unacceptable options, making a 'choice' impossible while still allowing the manipulator to claim the outcome was voluntary.",
    seen: "'Either you are with me or you are against me', work situations with impossible choices, relational coercion.",
    counters: [
      "Name the trap and reframe the options",
      "Introduce a third option or a delay before deciding",
      "Do not accept the false binary as real",
    ],
    sources: [
      "Gregory Bateson — double bind theory",
      "Unpublished practitioner observation; practical pattern seen in social and institutional contexts",
    ],
    related: ["commitment-consistency", "strategic-pauses-and-silence", "guilt-tripping"],
  },
  {
    slug: "ostracism-silent-treatment",
    name: "Ostracism & Silent Treatment",
    domain: "Manipulation",
    signature:
      "Side-talk, whispering, exclusion and cold silence are used to hold power and enforce compliance without direct confrontation.",
    mechanism:
      "Humans evolved to fear social exclusion. By controlling belonging, the manipulator turns silence and omission into a form of punishment and surveillance.",
    seen: "Low-tone whispering, exclusion from events, the chilly treatment, social punishment in groups.",
    counters: [
      "Notice whether your inclusion is conditional",
      "Do not read exclusion as a personal failure when it is a group tactic",
      "Build independent support outside the social loop",
    ],
    sources: [
      "John Bowlby — attachment and rejection",
      "Unpublished practitioner observation; especially in group dynamics and social control",
    ],
    related: ["isolation", "gatekeeping", "favoritism-divide-rule"],
  },
  {
    slug: "favoritism-divide-rule",
    name: "Favouritism & Divide-and-Rule",
    domain: "Manipulation",
    signature:
      "Selective rewards create competition, suspicion and loyalty to the person distributing the favours.",
    mechanism:
      "When a leader or group grants unequal access, the target compares themselves to peers and begins to compete rather than coordinate. This reduces collective resistance.",
    seen: "Selective promotions, unequal trust, gossip, strategic praise among peers, family hierarchies.",
    counters: [
      "Document actual criteria instead of narratives about merit",
      "Create solidarity with others who are being treated similarly",
      "Refuse to accept emotional competition as normal",
    ],
    sources: [
      "George K. Simon — In Sheep's Clothing",
      "Unpublished practitioner observation; common in social and organisational power structures",
    ],
    related: ["authority", "ostracism-silent-treatment", "isolation"],
  },
  {
    slug: "guilt-tripping",
    name: "Guilt Tripping",
    domain: "Manipulation",
    signature: "Your refusal or boundary is reframed as selfishness, betrayal or abandonment.",
    mechanism:
      "Shame and obligation are used to override self-respect. The target is made to feel responsible for another person's distress instead of their own choices.",
    seen: "Family guilt, emotional blackmail, boundary-policing, self-pity as leverage.",
    counters: [
      "Separate your boundary from their emotion",
      "Refuse to carry someone else's emotional repair as a permanent role",
      "Use the word 'no' without excessive explanation",
    ],
    sources: [
      "George K. Simon — In Sheep's Clothing",
      "Unpublished practitioner observation; common in relational coercion",
    ],
    related: ["conditional-affection", "double-bind", "learned-helplessness"],
  },
  {
    slug: "emotional-flooding",
    name: "Emotional Flooding & Instant Drama",
    domain: "Manipulation",
    signature:
      "A person creates a sudden burst of fear, shame, urgency or chaos to short-circuit calm thinking.",
    mechanism:
      "High arousal makes executive control weaker. Once the target is flooded, the manipulator can push for compliance while the target is dysregulated.",
    seen: "Explosive accusations, public scenes, sudden escalations, crisis narratives used to force decisions.",
    counters: [
      "Pause the conversation and return to facts later",
      "Do not argue under high arousal; postpone the issue",
      "Notice whether the drama is being used to erase context",
    ],
    sources: [
      "Daniel Goleman — emotional intelligence literature",
      "Unpublished practitioner observation; a practical pattern in conflict and coercive dynamics",
    ],
    related: ["cognitive-sensory-overload", "guilt-tripping", "double-bind"],
  },
  {
    slug: "subliminal-messaging",
    name: "Subliminal Messaging",
    domain: "Information Warfare",
    signature:
      "Influence is placed beneath conscious awareness through text, images, sound, repetition or symbolic cues.",
    mechanism:
      "The target does not consciously register the message, yet the brain still encodes it. Repetition and context shape perception before choice is made.",
    seen: "Image overlays, embedded slogans, repeated signifiers, sound design, subtle narrative framing in media and persuasion.",
    counters: [
      "Look at the content without the surrounding frame",
      "Notice repetition for what it is: pressure, not evidence",
      "Question any message that cannot be defended in plain language",
    ],
    sources: [
      "Psychology of persuasion and media framing literature",
      "Unpublished practitioner observation; not a single universally accepted formal model of all media effects",
    ],
    related: ["hybrid-cascade-campaign", "linguistic-microtechniques", "deepfake-coercion"],
  },
  {
    slug: "deepfake-coercion",
    name: "Deepfake Audio & Video Coercion",
    domain: "Information Warfare",
    signature:
      "Synthetic voice, image and video are used to impersonate, frame or terrorise a target.",
    mechanism:
      "When authenticity is hard to verify, trust collapses and fear escalates. A fabricated scene can trigger emotional conviction before any fact-check is undertaken.",
    seen: "Fraudulent voice calls, doctored clips, humiliating or threatening videos, AI-generated authority impersonation.",
    counters: [
      "Verify through a separate channel before acting on a clip or call",
      "Do not treat any single media artifact as conclusive proof",
      "Check source, metadata and independent corroboration",
    ],
    sources: [
      "NIST / AI risk and synthetic media literature",
      "Unpublished practitioner observation; a practical risk pattern in the age of generative AI",
    ],
    related: ["generative-ai-social-engineering", "subliminal-messaging", "reputation-laundering"],
  },
  {
    slug: "generative-ai-social-engineering",
    name: "Generative AI Social Engineering",
    domain: "Information Warfare",
    signature:
      "AI is used to micro-target, personalize and scale persuasion at a level the target cannot easily distinguish from genuine attention.",
    mechanism:
      "Generative systems can create emotional appeals, mimic close relationships, tailor messages and simulate authority at mass scale. The manipulation becomes highly personalised and harder to verify.",
    seen: "Mass-personalized scams, AI-crafted emotional messages, fake personal histories, tailored grooming scripts.",
    counters: [
      "Treat personalized emotional intensity as a signal to verify, not to trust",
      "Ask for a traceable, practical basis before acting on unusual requests",
      "Use independent channels and offline confirmation",
    ],
    sources: [
      "AI security and social-engineering literature",
      "Unpublished practitioner observation; this reflects a live operational risk not a single canonical theory",
    ],
    related: ["deepfake-coercion", "hybrid-cascade-campaign", "linguistic-microtechniques"],
  },
  {
    slug: "gatekeeping",
    name: "Gatekeeping & Credential Control",
    domain: "Social Engineering",
    signature:
      "Access, support and recognition are controlled by those who define the rules of entry.",
    mechanism:
      "By deciding who qualifies, who is allowed to speak and who is 'in' or 'out', gatekeepers shape influence and opportunity. Compliance becomes the price of access.",
    seen: "Credentialism, selective mentorship, social status barriers, access control to communities or opportunities.",
    counters: [
      "Track whether criteria are applied consistently or selectively",
      "Look for evidence beyond formal credentials",
      "Build independent access wherever the gate is arbitrary",
    ],
    sources: [
      "Unpublished practitioner observation; a social-order mechanism observed in institutions and communities",
    ],
    related: ["authority", "institutional-legal-economic-levers", "ostracism-silent-treatment"],
  },
  {
    slug: "reputation-laundering",
    name: "Reputation Laundering & PR Shells",
    domain: "Information Warfare",
    signature: "Damage is hidden beneath carefully managed narratives, branding and image repair.",
    mechanism:
      "When a social actor controls the story, they can convert coercive or ethically compromised behaviour into legitimacy. Ongoing narrative management masks the underlying pattern.",
    seen: "PR campaigns, strategic apologies, narrative laundering, selective visibility and curated optics.",
    counters: [
      "Separate action from branded language",
      "Look for repeated behaviour rather than just a polished public account",
      "Track what the person does when they are not being managed",
    ],
    sources: [
      "Public relations and reputation management literature",
      "Unpublished practitioner observation; a practical pattern in power and media relations",
    ],
    related: ["gatekeeping", "naming-pattern", "charm-offensive"],
  },
  {
    slug: "attention-looming",
    name: "Attention Looming",
    domain: "Manipulation",
    signature:
      "A person induces stress, tension and a sense of looming judgement while keeping the mood light enough to disarm your suspicion.",
    mechanism:
      "Humans are more susceptible to suggestion when attention is split between threat and social ease. The result is a breathless, uneasy compliance under the cover of wit or charm.",
    seen: "Joking intensifiers, stress-building banter, sudden tonal shifts from playful to serious, moral pressure decorated as humour.",
    counters: [
      "Notice whether the joke is a shield for escalation",
      "Separate the tone from the content and ask for a direct statement",
      "Do not surrender clarity to someone else's rhythm of tension",
    ],
    sources: [
      "Unpublished practitioner observation; this is a practical tactic, not a single formal theory",
    ],
    related: ["strategic-pauses-and-silence", "emotional-flooding", "charm-offensive"],
  },
  {
    slug: "backwards-law-persuasion",
    name: "Backwards-Law Persuasion",
    domain: "Manipulation",
    signature:
      "The manipulator tells you to resist the obvious, distrust your instincts and follow a counterintuitive path that serves them.",
    mechanism:
      "By making 'common sense' feel suspicious, the manipulator shifts the person into compliance by making ordinary caution and self-trust look like foolishness.",
    seen: "'Trust the process', 'you are too rational', 'your instincts are manipulation', moral inversion in persuasion.",
    counters: [
      "Ask whether the advice is being defended more by intensity than by evidence",
      "Keep your own standards and reality checks in place",
      "Do not confuse discomfort with truth",
    ],
    sources: ["Unpublished practitioner observation; not a widely canonised formal doctrine"],
    related: ["linguistic-microtechniques", "gaslighting", "double-bind"],
  },
  {
    slug: "reverse-psychology",
    name: "Reverse Psychology",
    domain: "Manipulation",
    signature:
      "A person encourages the opposite of what they actually want, assuming the target will resist and therefore choose the desired option.",
    mechanism:
      "Reverse psychology relies on reactance: when choice is framed as threatened or constrained, people often feel a stronger pull to restore freedom by doing the thing they were told not to do. The tactic only works when the target is motivated by autonomy, identity, and the sense that their choice is being controlled.",
    seen: "'Don't do this', 'I dare you to ignore me', 'just prove me wrong', coercive challenge framing, forbidden-choice baiting.",
    counters: [
      "Notice whether the pressure is being framed as a dare, challenge, or threat to freedom",
      "Ask whether the advice is empowering autonomy or merely creating a harder push",
      "Separate the target's emotional reaction from the underlying evidence and the actual goal",
    ],
    sources: [
      "Brehm, J. W. — A Theory of Psychological Reactance",
      "Steindl et al. (2015) — Understanding psychological reactance",
      "Unpublished practitioner observation; a practical application of reactance dynamics, not a single universal doctrine",
    ],
    related: ["psychological-reactance", "backwards-law-persuasion", "commitment-consistency"],
    knowledge: {
      epistemicKind: "research-construct",
      status: "context-dependent",
      claims: [],
      context: [
        "The pattern is most relevant when autonomy is salient and the target values choice, control, or identity.",
        "It is not a standalone explanation for all persuasion; reactance varies with the person, the threat to freedom, and the social context.",
      ],
      contextFactors: {
        ageAndDevelopment: ["Adolescents and people with high autonomy needs may respond more strongly."],
        individualDifferences: ["Sensitivity to control, independence, and status can change the effect."],
        situation: ["High-pressure framing, challenge, and explicit prohibition tend to increase reactance."]
      },
      alternativeExplanations: [
        "The person may simply be testing limits, expressing frustration, or using a social challenge rather than intentionally invoking reactance.",
        "A person's compliance may also reflect identity, conformity, or social reward rather than direct reverse-psychology effects.",
      ],
      ethicalConsiderations: [
        "Do not treat reverse psychology as a harmless or reliable tool; it can escalate control dynamics and manipulation.",
        "Use direct, transparent communication whenever possible and avoid exploiting autonomy threats.",
      ],
      levelsOfAnalysis: ["individual", "interpersonal", "group"],
    },
  },
  {
    slug: "illusion-of-choice",
    name: "The Illusion of Choice",
    domain: "Manipulation",
    signature:
      "A person presents a constrained decision as though it were broad and freely chosen.",
    mechanism:
      "By framing the options in a way that hides the real constraints, the actor makes compliance feel voluntary and self-directed. Choice is psychologically satisfying even when the decision space was already narrowed by pressure, authority, or context.",
    seen: "'You can choose either A or B' while one option is clearly the preferred outcome, curated menus, public narratives that disguise coercive constraints.",
    counters: [
      "Ask what alternatives were excluded and why",
      "Separate the feeling of freedom from the actual decision architecture",
      "Look past the framing to the incentives, constraints, and hidden costs",
    ],
    sources: ["Behavioral economics and autonomy literature", "Unpublished practitioner observation"],
    related: ["reverse-psychology", "strategic-ambiguity", "baiting"],
  },
  {
    slug: "false-binary-disruption",
    name: "False-Binary Disruption",
    domain: "Manipulation",
    signature:
      "A person reframes a complex issue as a forced binary and then introduces a destabilising implication that undermines the target's agency.",
    mechanism:
      "False binaries reduce tolerance for ambiguity and push people into a simplified judgment. Once the choice is reduced to 'either/or,' the manipulator can cast dissent as irrational or morally compromised.",
    seen: "'You are either with us or against us', moral absolutes, false dichotomies in conflict, debates, or political framing.",
    counters: [
      "Ask what important dimensions are being omitted",
      "Look for third options, gradations, or distinctions that the binary hides",
      "Do not accept a forced binary without testing the assumptions behind it",
    ],
    sources: ["Social psychology on categorisation and false dichotomies", "Unpublished practitioner observation"],
    related: ["illusion-of-choice", "antithesis", "appeal-to-neutrality"],
  },
  {
    slug: "strategic-ambiguity",
    name: "Strategic Ambiguity",
    domain: "Communication",
    signature:
      "A speaker deliberately leaves a message vague enough to absorb multiple interpretations while preventing clear accountability.",
    mechanism:
      "Ambiguity creates room for plausible deniability. The target remains uncertain, and the speaker maintains flexibility, moral cover, or indirect influence without committing to a direct claim.",
    seen: "Evasive promises, vague apologetic language, legalistic wording, coded political phrasing, and messages that sound meaningful but avoid clear action.",
    counters: [
      "Ask for specifics, deadlines, and measurable commitments",
      "Separate rhetorical flexibility from genuine clarity",
      "Notice when ambiguity is used to avoid responsibility rather than to preserve nuance",
    ],
    sources: ["Rhetoric and communication theory", "Unpublished practitioner observation"],
    related: ["equivocation", "omission-and-selective-disclosure", "implication-and-insinuation"],
  },
  {
    slug: "poison-metaphor",
    name: "The Poison Metaphor",
    domain: "Manipulation",
    signature:
      "A person frames an idea, person, or action as toxic, poisonous, or corrupting to induce revulsion without evidence.",
    mechanism:
      "Metaphorical contamination turns a controversy into a moral hazard; the target is pushed to reject or condemn without careful analysis. The metaphor can function as emotion-laden shorthand that suppresses nuance.",
    seen: "Calling a policy 'poison', an idea 'toxic', a group 'contaminated', or a disagreement 'corrupting'.",
    counters: [
      "Translate the metaphor back into concrete claims and effects",
      "Ask whether the label is doing analytical work or only emotive work",
      "Separate moral condemnation from evidence-based assessment",
    ],
    sources: ["Language and framing literature", "Unpublished practitioner observation"],
    related: ["euphemism-and-dysphemism", "narrative-persuasion", "out-group-derogation"],
  },
  {
    slug: "intellectual-signaling",
    name: "Intellectual Signaling",
    domain: "Social Psychology",
    signature:
      "A person displays sophistication, complexity, or insider status to create status and credibility without necessarily increasing the quality of the argument.",
    mechanism:
      "Signal-heavy language communicates status and exclusion. The audience may respond to the social display of intelligence rather than to the actual validity or evidential support of the point.",
    seen: "Technical jargon, jargon-heavy posturing, insider references, and elite-appeal framing used to dominate rather than clarify.",
    counters: [
      "Identify whether the substance supports the claim or the status display is carrying it",
      "Ask for plain-language restatement and an evidence trail",
      "Notice whether complexity is obscuring rather than clarifying",
    ],
    sources: ["Status signaling and social cognition literature", "Unpublished practitioner observation"],
    related: ["name-dropping", "prestige-signaling", "appeal-to-neutrality"],
  },
  {
    slug: "minimization",
    name: "Minimization",
    domain: "Manipulation",
    signature:
      "A person downplays the seriousness, impact, or relevance of an issue to reduce urgency or accountability.",
    mechanism:
      "Minimization can quiet concern and lower resistance by reframing a problem as minor, exaggerated, or not worth attention. The technique works because people often defer to the person assigning the emotional scale.",
    seen: "'It's not a big deal', 'you're overreacting', 'it was harmless', 'it doesn't matter' in response to clear harms or signs of distress.",
    counters: [
      "Ask whether the lowered stakes are being asserted or evidenced",
      "Check whether the minimizer is avoiding accountability rather than clarifying impact",
      "Separate the language of dismissal from the actual facts and consequences",
    ],
    sources: ["Psychology of denial and rationalisation literature", "Unpublished practitioner observation"],
    related: ["catastrophizing", "emotional-blackmail", "stonewalling"],
  },
  {
    slug: "horn-effect",
    name: "Horn Effect",
    domain: "Social Psychology",
    signature:
      "A single negative impression causes a person to attribute additional negative qualities or motives to someone.",
    mechanism:
      "Once a target is tagged as undesirable or untrustworthy, subsequent evidence is interpreted through that frame. The negative impression becomes a halo of suspicion rather than an isolated fact.",
    seen: "A single lie, failure, or flaw is used to label a person untrustworthy altogether, or an entire group is judged by one bad example.",
    counters: [
      "Separate the initial negative signal from the broader interpretation",
      "Look for evidence beyond the first impression or the single anecdote",
      "Do not convert one bad example into a total verdict without context",
    ],
    sources: ["Social perception and impression formation literature", "Unpublished practitioner observation"],
    related: ["straw-manning", "out-group-derogation", "baiting"],
  },
  {
    slug: "priming",
    name: "Priming",
    domain: "Cognition & Bias",
    signature:
      "Exposure to a cue or idea shapes the interpretation of later information without the target explicitly noticing the influence.",
    mechanism:
      "Earlier stimuli can increase the accessibility of certain ideas, emotions, or frames. This does not mean the person is being controlled, but it means context can quietly bias perception and choice.",
    seen: "Repeated words, images, themes, or environment cues that make a later message feel more relevant, urgent, or familiar.",
    counters: [
      "Notice the framing environment before evaluating the content itself",
      "Check whether the message is persuasive because of evidence or because of the surrounding cue",
      "Create an alternative frame before deciding what the message means",
    ],
    sources: ["Cognitive psychology and priming literature", "Unpublished practitioner observation"],
    related: ["narrative-persuasion", "presupposition", "rhetorical-questions"],
  },
  {
    slug: "catastrophizing",
    name: "Catastrophizing",
    domain: "Cognition & Bias",
    signature:
      "A person treats a small or uncertain problem as if it guarantees a devastating outcome.",
    mechanism:
      "The mind amplifies the worst plausible interpretation and treats it as the likely outcome. This can intensify fear, urgency, and compliance because the apparent risk feels uncontrollable.",
    seen: "'If I say no, everything falls apart', 'this will ruin everything', 'we are doomed if this happens'.",
    counters: [
      "State the actual risk, likelihood, and consequences explicitly",
      "Separate the feared outcome from the likely one",
      "Ask what evidence supports the catastrophic interpretation and what evidence does not",
    ],
    sources: ["Cognitive distortion and anxiety literature", "Unpublished practitioner observation"],
    related: ["minimization", "fear-based-framing", "emotional-blackmail"],
  },
  {
    slug: "foot-in-the-door-technique",
    name: "Foot-in-the-Door Technique",
    domain: "Persuasion",
    signature:
      "A small initial request makes a larger request easier to accept later.",
    mechanism:
      "People often want to remain consistent with earlier choices, especially when the initial request has already been accepted. The small step creates a sense of identity or commitment that makes subsequent compliance feel more natural.",
    seen: "A minor concession is requested before a larger ask, used in sales, campaigns, and interpersonal pressure.",
    counters: [
      "Decide in advance what your threshold for agreement is",
      "Refuse to treat a small yes as a commitment to a larger one",
      "Notice when the initial request is creating a compliance trap",
    ],
    sources: ["Compliance and persuasion literature", "Unpublished practitioner observation"],
    related: ["door-in-the-face-technique", "commitment-consistency", "low-ball-technique"],
  },
  {
    slug: "door-in-the-face-technique",
    name: "Door-in-the-Face Technique",
    domain: "Persuasion",
    signature:
      "A large request is made first, then reduced to a smaller request that seems more reasonable by comparison.",
    mechanism:
      "The larger ask can make the later smaller one feel like a concession or moral win. The target may feel more generous or less defensive after rejecting the initial extreme demand.",
    seen: "Big ask followed by a softer ask, common in negotiation, fundraising, and pressure campaigns.",
    counters: [
      "Consider the initial request as a tactic, not a genuine standard",
      "Do not let a later smaller ask feel like a moral obligation because of the first ask",
      "Negotiate on the merits rather than the contrast effect",
    ],
    sources: ["Compliance and persuasion literature", "Unpublished practitioner observation"],
    related: ["foot-in-the-door-technique", "low-ball-technique", "commitment-consistency"],
  },
  {
    slug: "low-ball-technique",
    name: "Low-Ball Technique",
    domain: "Persuasion",
    signature:
      "A person secures agreement to a good deal, then introduces later costs, constraints, or obligations that were not part of the original commitment.",
    mechanism:
      "Once the target has invested in the decision, they are more likely to continue, even after new costs emerge. The technique exploits commitment and sunk-cost reasoning.",
    seen: "Sales tactics that lock in an initial agreement before hidden costs or conditions appear.",
    counters: [
      "Ask for the full cost, constraints, and obligations before agreeing",
      "Do not treat an early agreement as final without a clear completion checklist",
      "Pause before deciding when new costs appear after initial acceptance",
    ],
    sources: ["Compliance and persuasion literature", "Unpublished practitioner observation"],
    related: ["foot-in-the-door-technique", "door-in-the-face-technique", "sunk-cost"],
  },
  {
    slug: "mere-exposure-effect",
    name: "Mere-Exposure Effect",
    domain: "Cognition & Bias",
    signature:
      "Repeated exposure to a stimulus increases liking for it, even when the exposure itself is not meaningful or persuasive.",
    mechanism:
      "Familiarity reduces uncertainty and can create a preference for what feels safe or known. Repetition can be a subtle persuasion tool, especially when the message is repeated without critical evaluation.",
    seen: "Repeated branding, slogans, social media repetition, political messaging, and background repetition of a claim.",
    counters: [
      "Ask whether the positive feeling comes from evidence or familiarity alone",
      "Pause and evaluate a claim before it has become emotionally familiar",
      "Do not confuse repeated exposure with truth or quality",
    ],
    sources: ["Learning and attitude formation literature", "Unpublished practitioner observation"],
    related: ["priming", "narrative-persuasion", "repetition"],
  },
  {
    slug: "narrative-persuasion",
    name: "Narrative Persuasion",
    domain: "Communication",
    signature:
      "A compelling story shapes belief and motivation by making abstract issues emotional, concrete, and memorable.",
    mechanism:
      "Narratives can bypass analytical resistance byembedding emotional context, identity, and moral meaning. A persuasive story often works through transport, memory, and identification rather than through formal evidence alone.",
    seen: "Hero-villain framing, personal testimonials, emotionally curated stories, mobilising narratives in activism and propaganda.",
    counters: [
      "Separate the emotional impact of the story from the underlying evidence",
      "Check whether the story is a valid exemplar or merely an emotionally loaded anecdote",
      "Ask what broader data or counterexample is being omitted",
    ],
    sources: ["Narrative psychology and persuasion literature", "Unpublished practitioner observation"],
    related: ["priming", "euphemism-and-dysphemism", "naming-pattern"],
  },
  {
    slug: "inoculation",
    name: "Inoculation",
    domain: "Communication",
    signature:
      "A person prepares the target to resist persuasion by exposing them to weak counter-arguments before stronger ones appear.",
    mechanism:
      "Inoculation works by building mental antibodies against later manipulation: if the target already has a refutation in mind, a later message is easier to resist or evaluate critically.",
    seen: "Pre-bunking, challenge-based education, myth-busting, and a deliberate warning about persuasive techniques before they are used.",
    counters: [
      "Use the technique to strengthen critical reflection rather than entrench defensiveness",
      "Teach people to examine the structure of arguments, not only the speaker's reputation",
      "Balance resistance with curiosity so that counter-arguments do not become dogma",
    ],
    sources: ["Inoculation theory and persuasion research", "Unpublished practitioner observation"],
    related: ["false-binary-disruption", "rhetorical-questions", "appeal-to-neutrality"],
  },
  {
    slug: "implication-and-insinuation",
    name: "Implication & Insinuation",
    domain: "Communication",
    signature:
      "A speaker communicates an idea indirectly, leaving the listener to infer meaning, suspicion, or guilt without the speaker outright stating it.",
    mechanism:
      "Indirect messaging allows the speaker to achieve persuasive or damaging effects while preserving deniability. The target must infer the accusation, which can feel more intimate and harder to challenge.",
    seen: "Veiled accusations, coded insinuations, guilt-laden hints, and 'you know what I mean' communication.",
    counters: [
      "Ask the speaker to state the claim directly and explicitly",
      "Separate insinuation from evidence",
      "Do not accept hidden meaning as a substitute for clear facts",
    ],
    sources: ["Rhetoric and interpersonal communication literature", "Unpublished practitioner observation"],
    related: ["presupposition", "stonewalling", "strategic-ambiguity"],
  },
  {
    slug: "presupposition",
    name: "Presupposition",
    domain: "Communication",
    signature:
      "A statement is framed so that an unspoken assumption is treated as if it is already true.",
    mechanism:
      "Presuppositions can quietly move the audience toward a conclusion by embedding background assumptions inside an otherwise neutral sentence. This makes disagreement feel like fighting the wording rather than the idea itself.",
    seen: "'When are you going to admit you're wrong?', 'As you know, this is a failed policy', 'You still can't trust them.'",
    counters: [
      "Identify the hidden assumption before replying to the surface claim",
      "Ask whether the presupposition is itself supported or merely assumed",
      "Separate the question from the assumption that makes it persuasive",
    ],
    sources: ["Linguistics and discourse analysis literature", "Unpublished practitioner observation"],
    related: ["rhetorical-questions", "implication-and-insinuation", "priming"],
  },
  {
    slug: "rhetorical-questions",
    name: "Rhetorical Questions",
    domain: "Communication",
    signature:
      "A question is asked in a way that suggests the answer is obvious or predetermined, steering the audience without genuine inquiry.",
    mechanism:
      "The question creates a conversational frame where the audience is invited to supply a preferred answer. This can win emotional assent and moral closure without allowing any actual debate or evidence review.",
    seen: "'Who could object to that?', 'What reasonable person would agree?', 'If not now, when?'",
    counters: [
      "Treat the question as an argument, not as genuine curiosity",
      "Ask what answer would actually be allowed if the audience answered honestly",
      "Examine the assumptions embedded in the question itself",
    ],
    sources: ["Rhetoric and persuasion literature", "Unpublished practitioner observation"],
    related: ["presupposition", "antithesis", "inoculation"],
  },
  {
    slug: "antithesis",
    name: "Antithesis",
    domain: "Communication",
    signature:
      "A speaker contrasts two opposing positions to make one sound morally or intellectually superior by default.",
    mechanism:
      "Antithesis simplifies complexity into a stark moral contrast. The target is invited to choose the more acceptable side without examining nuance, trade-offs, or shared ground.",
    seen: "'Reason or emotion', 'order or chaos', 'truth or ideology' as emotionally charged public framing.",
    counters: [
      "Look for the omitted middle ground and trade-offs",
      "Ask whether the contrast is actually a false binary or a real distinction",
      "Test whether the speaker is using contrast as a shortcut to persuasion",
    ],
    sources: ["Rhetoric and framing literature", "Unpublished practitioner observation"],
    related: ["false-binary-disruption", "paradox", "rhetorical-questions"],
  },
  {
    slug: "paradox",
    name: "Paradox",
    domain: "Communication",
    signature:
      "A statement appears to contain mutually contradictory ideas that are then used to create a sense of depth, authority, or intellectual superiority.",
    mechanism:
      "Paradox grabs attention by seeming impossibly smart or profound, but it can also hide weak reasoning behind complexity. It functions as a performance of insight, not necessarily as a valid argument.",
    seen: "'The only way to be free is to submit to the process', 'we must destroy the system to save it' in a rhetorical context.",
    counters: [
      "Translate the paradox into plain terms and test its actual logic",
      "Ask whether the paradox hides an unexamined assumption",
      "Do not treat mysterious complexity as proof of wisdom",
    ],
    sources: ["Philosophy and rhetoric literature", "Unpublished practitioner observation"],
    related: ["antithesis", "backwards-law-persuasion", "strategic-ambiguity"],
  },
  {
    slug: "euphemism-and-dysphemism",
    name: "Euphemism & Dysphemism",
    domain: "Language & Framing",
    signature:
      "A person uses softened or harsh language to shape emotional reactions and moral judgments without openly naming the underlying reality.",
    mechanism:
      "Euphemisms make harmful or coercive actions sound acceptable, while dysphemisms make ordinary actions sound repulsive. Both rely on emotional framing rather than precise description.",
    seen: "'Collateral damage' versus 'mass killing', 'restructuring' versus 'downsizing', 'ethically flexible' versus 'corrupt'.",
    counters: [
      "Translate the phrase into neutral, concrete terms",
      "Ask what actual behaviour or consequence is being hidden or embellished",
      "Notice whether the wording is controlling your moral response before you have the facts",
    ],
    sources: ["Language, ethics, and framing literature", "Unpublished practitioner observation"],
    related: ["poison-metaphor", "narrative-persuasion", "omission-and-selective-disclosure"],
  },
  {
    slug: "omission-and-selective-disclosure",
    name: "Omission & Selective Disclosure",
    domain: "Manipulation",
    signature:
      "A person controls the story by leaving out decisive facts, context, or contradictions while presenting a partial account as complete.",
    mechanism:
      "Selective disclosure can be more persuasive than direct falsehood because the audience is left with a neat but incomplete picture. People often evaluate the tone and structure of the account rather than noticing what was excluded.",
    seen: "Strategic silence, cherry-picking evidence, partial summaries, and framing a narrative around convenient facts while excluding a decisive counterexample.",
    counters: [
      "Ask what information is missing and what the speaker is avoiding",
      "Seek independent sources and time-ordered facts",
      "Do not accept a partial account as a complete one",
    ],
    sources: ["Decision and evidence quality literature", "Unpublished practitioner observation"],
    related: ["strategic-ambiguity", "euphemism-and-dysphemism", "baiting"],
  },
  {
    slug: "steel-manning-and-straw-manning",
    name: "Steel-Manning & Straw-Manning",
    domain: "Argumentation",
    signature:
      "A person either strengthens an opponent's argument to make it easier to defeat or weakens it into a caricature to win the exchange.",
    mechanism:
      "The technique shifts debate away from the actual issue. Straw-manning reduces complexity into a ridiculous version; steel-manning can feel impressive but may still distract from the strongest honest version of the claim.",
    seen: "Reducing a complicated argument to an absurd simplification, or over-idealising an opposing case before attacking it.",
    counters: [
      "Separate the actual arguments from the rhetorical framing of them",
      "Test both the strongest and weakest formulations of the case",
      "Do not let rhetorical performance replace actual evidence or reasoning",
    ],
    sources: ["Argumentation theory and debate literature", "Unpublished practitioner observation"],
    related: ["horn-effect", "antithesis", "equivocation"],
  },
  {
    slug: "equivocation",
    name: "Equivocation",
    domain: "Communication",
    signature:
      "A speaker uses a word or phrase with more than one meaning to make a claim sound more stable than it is.",
    mechanism:
      "The ambiguity shifts between definitions to preserve plausible deniability while staying emotionally persuasive. The audience is encouraged to move between meanings without noticing the slide.",
    seen: "Using 'fair', 'neutral', 'security', or 'freedom' in ways that shift between moral and practical meanings.",
    counters: [
      "Ask for the precise definition of each key term",
      "Pin the speaker to a specific meaning before evaluating the claim",
      "Do not allow slides between meanings to hide the actual conclusion",
    ],
    sources: ["Logic and rhetoric literature", "Unpublished practitioner observation"],
    related: ["strategic-ambiguity", "appeal-to-neutrality", "definitional-dodge"],
  },
  {
    slug: "appeal-to-neutrality",
    name: "The Appeal to Neutrality",
    domain: "Manipulation",
    signature:
      "A person treats a perspective as objective or neutral merely because it is emotionally detached, familiar, or institutionally sanctioned.",
    mechanism:
      "Neutrality is made to function like evidence; the audience is encouraged to trust the frame without testing the assumptions behind it. The result is a false sense that the view is unmotivated or apolitical.",
    seen: "'We are just being objective', 'this is not political', 'we're above partisanship' when a value-laden frame is being defended.",
    counters: [
      "Ask what assumptions or interests are being hidden behind the claim to neutrality",
      "Notice whether neutrality is being used as a shield rather than as a method",
      "Look for power, incentives, and framing before accepting the label of objectivity",
    ],
    sources: ["Critical theory, media studies, and epistemology literature", "Unpublished practitioner observation"],
    related: ["intellectual-signaling", "equivocation", "inoculation"],
  },
  {
    slug: "out-group-derogation",
    name: "Out-Group Derogation",
    domain: "Social Psychology",
    signature:
      "A group is devalued, stereotyped, or demonised to strengthen the in-group or to neutralise moral concern about harmful behaviour.",
    mechanism:
      "By constructing a target out-group as dangerous, lazy, corrupt, or unworthy, the speaker lowers the bar for hostility or exclusion. The target can be portrayed as less fully human, which clears the way for coercive action.",
    seen: "Stereotyping, scapegoating, dehumanising rhetoric, and identity-based contempt in conflict, politics, and institutions.",
    counters: [
      "Ask whether the devaluation is based on evidence or group-level prejudice",
      "Separate fact-based criticism from identity-based contempt",
      "Check whether the rhetoric is being used to justify exclusion or hostility",
    ],
    sources: ["Intergroup relations and social identity literature", "Unpublished practitioner observation"],
    related: ["triangulation", "scapegoating", "darvo"],
  },
  {
    slug: "counter-signaling",
    name: "Counter-Signaling",
    domain: "Social Psychology",
    signature:
      "A person makes a performative display of dissent or independence to signal authenticity, superiority, or distance from the mainstream.",
    mechanism:
      "Counter-signaling focuses attention on the speaker's difference rather than the actual content of the claim. The signal can create status because it implies courage, intelligence, or 'not being fooled'.",
    seen: "Acting as if one is above trends, refusing obvious consensus, or performing contrarianism to seem insightful rather than accurate.",
    counters: [
      "Ask whether the contrary stance is supported by evidence or merely by the performance of independence",
      "Separate independence from correctness",
      "Do not confuse novelty with insight",
    ],
    sources: ["Status-signaling, identity, and social psychology literature", "Unpublished practitioner observation"],
    related: ["intellectual-signaling", "prestige-signaling", "name-dropping"],
  },
  {
    slug: "triangulation",
    name: "Triangulation",
    domain: "Manipulation",
    signature:
      "A person draws in a third party or a distant audience to create confusion, enforce loyalty, and amplify pressure without direct confrontation.",
    mechanism:
      "The triangulation pattern turns a direct disagreement into a relational contest. The target is pulled into defending themselves to an authority or outside observer, often while the manipulator keeps the moral narrative on their side.",
    seen: "'Ask your friends what they think', 'everyone else agrees', 'I'm only telling the truth to the right person' in conflict.",
    counters: [
      "Separate the relational tactic from the underlying evidence",
      "Ask for direct, private, and concrete discussion rather than audience-based pressure",
      "Do not let a third-party frame substitute for a clear fact-check",
    ],
    sources: ["Family systems and interpersonal conflict literature", "Unpublished practitioner observation"],
    related: ["scapegoating", "darvo", "stonewalling"],
  },
  {
    slug: "scapegoating",
    name: "Scapegoating",
    domain: "Manipulation",
    signature:
      "A person redirects blame or hostility toward a convenient target to protect the speaker or the in-group from accountability.",
    mechanism:
      "When a shared problem or failure is uncomfortable, the speaker can assign the burden to a person or group that is easier to target. The scapegoat becomes the emotional container for a larger conflict or crisis.",
    seen: "Blaming a minority, a subordinate, or a designated outsider for internal problems or failure.",
    counters: [
      "Trace the causal chain rather than accepting the assigned blame",
      "Look for whether the target is being used as a container for another problem",
      "Do not confuse convenient blame with evidence or accountability",
    ],
    sources: ["Intergroup conflict and social psychology literature", "Unpublished practitioner observation"],
    related: ["out-group-derogation", "darvo", "triangulation"],
  },
  {
    slug: "darvo",
    name: "DARVO",
    domain: "Manipulation",
    signature:
      "A person denies the behaviour, attacks the accuser, and reverses the victim and offender roles when confronted with evidence or criticism.",
    mechanism:
      "DARVO disrupts accountability by reframing criticism itself as an attack. The target is pushed into defending their character while the manipulator deflects responsibility and gains moral cover.",
    seen: "'You are lying', 'you are the abusive one', 'you are making it up', 'what about your own behaviour?' in response to direct evidence.",
    counters: [
      "Keep attention on the specific behaviour and evidence rather than on character attacks",
      "Separate the emotional escalation from the factual question",
      "Document clear facts and boundaries without becoming trapped in the frame of the accusation",
    ],
    sources: ["Domestic abuse and coercive-control literature", "Unpublished practitioner observation"],
    related: ["triangulation", "stonewalling", "emotional-blackmail"],
  },
  {
    slug: "baiting",
    name: "Baiting",
    domain: "Manipulation",
    signature:
      "A person deliberately provokes a reaction, such as anger, shame, or fear, in order to gain leverage or to frame the target as the problem.",
    mechanism:
      "Baiting creates a reaction that can be used against the target. The manipulator often appears calm or self-righteous while the target is drawn into a losing emotional response.",
    seen: "Deliberate insults, provocative comparisons, loaded questions, and moral traps designed to trigger a defensive response.",
    counters: [
      "Notice when a message is structured to provoke rather than communicate",
      "Pause before responding to bait so the manipulator does not win on your emotions",
      "Respond to the substance, not the inflammatory frame",
    ],
    sources: ["Interpersonal manipulation literature", "Unpublished practitioner observation"],
    related: ["baited-response", "horn-effect", "emotional-blackmail"],
  },
  {
    slug: "emotional-blackmail",
    name: "Emotional Blackmail",
    domain: "Manipulation",
    signature:
      "A person uses guilt, fear, obligation, or a threat to manipulate another person's decisions and moral boundaries.",
    mechanism:
      "The manipulator turns a relationship or social obligation into a debt that must be repaid through compliance. The target feels guilty or afraid to refuse, even when the demand is unfair or unsustainable.",
    seen: "'If you loved me, you'd do this', 'I'll be devastated if you say no', 'If you don't, you'll hurt everyone'",
    counters: [
      "Separate the emotional pressure from the actual merits of the request",
      "Ask what the person will do if you do not comply and whether that is a genuine consequence or a threat",
      "Protect boundaries and seek support when guilt is being used as leverage",
    ],
    sources: ["Coercive relationship literature", "Unpublished practitioner observation"],
    related: ["guilt-tripping", "catastrophizing", "darvo"],
  },
  {
    slug: "name-dropping",
    name: "Name-Dropping",
    domain: "Status & Prestige",
    signature:
      "A person references influential, prestigious, or high-status connections to suggest credibility or access without making a substantive case.",
    mechanism:
      "The social meaning of the reference is often more persuasive than the actual content. The target may infer trust or authority from association without checking whether the connection is relevant or true.",
    seen: "Mentioning elite friends, famous names, insider circles, or respected institutions as a shortcut to credibility.",
    counters: [
      "Ask whether the named connection is relevant to the actual argument",
      "Verify the relationship and evidence rather than accepting the prestige signal",
      "Separate reputation from reasoning",
    ],
    sources: ["Status signaling and social prestige research", "Unpublished practitioner observation"],
    related: ["prestige-signaling", "intellectual-signaling", "counter-signaling"],
  },
  {
    slug: "prestige-signaling",
    name: "Prestige Signaling",
    domain: "Status & Prestige",
    signature:
      "A person uses prestigious references, badges, or associations to make a claim seem more credible than it is.",
    mechanism:
      "Status cues can dominate reasoning because humans are sensitive to social proof, affiliation, and expensive signals. This can make an argument feel more trustworthy even when its actual evidence is weak or missing.",
    seen: "Association with elite institutions, high-status networks, famous names, or rare credentials used to imply correctness or access.",
    counters: [
      "Treat the signal as a cue for verification, not as proof of truth",
      "Check the evidence independently of the status frame",
      "Do not confuse access or prestige with analysis or accuracy",
    ],
    sources: ["Status signaling and social trust literature", "Unpublished practitioner observation"],
    related: ["name-dropping", "intellectual-signaling", "counter-signaling"],
  },
  {
    slug: "conscientious-objection",
    name: "Conscientious Objection",
    domain: "Ethics",
    signature:
      "A person refuses to participate in a demand on grounds of conscience, principle, or moral objection.",
    mechanism:
      "Conscientious objection is an ethical stance that refuses participation based on values, not simply preference. It can be morally serious, but it can also be used rhetorically when a person wants to avoid accountability under the guise of principle.",
    seen: "Refusal to participate in harmful or coercive activity, or invoking conscience to avoid responsibility or criticism.",
    counters: [
      "Differentiate principled refusal from performative self-exemption",
      "Ask what values or harms are actually guiding the objection",
      "Examine whether the objection is specific, consistent, and proportionate",
    ],
    sources: ["Ethics, political philosophy, and civil-disobedience literature", "Unpublished practitioner observation"],
    related: ["deontological-reasoning", "pragmatism", "stonewalling"],
  },
  {
    slug: "deontological-reasoning",
    name: "Deontological Reasoning",
    domain: "Ethics",
    signature:
      "A person evaluates actions by duty, principle, or moral rules rather than by outcomes alone.",
    mechanism:
      "This form of reasoning emphasises duties, rights, and rules. It can provide a stable moral standard, but it can also be used to hide practical trade-offs or to make a position seem superior by moral purity rather than by consequences.",
    seen: "Arguments framed as 'it is wrong regardless of outcome', 'this violates a duty', or 'some actions are intrinsically unacceptable'.",
    counters: [
      "Ask what the duty is, why it applies, and whether it is being used to avoid practical scrutiny",
      "Separate moral rules from contextual trade-offs",
      "Examine whether the principle is applied consistently or selectively",
    ],
    sources: ["Ethics and moral philosophy literature", "Unpublished practitioner observation"],
    related: ["conscientious-objection", "pragmatism", "appeal-to-neutrality"],
  },
  {
    slug: "pragmatism",
    name: "Pragmatism",
    domain: "Ethics",
    signature:
      "A person judges actions by their practical consequences, usefulness, and realistic outcomes rather than by pure rules or ideals.",
    mechanism:
      "Pragmatism is useful for trade-offs and practical decision-making, but it can also become a dismissal of principle or a way of treating moral values as negotiable under the banner of realism.",
    seen: "'What's the practical outcome?', 'We have to be realistic', 'The best plan is the one that works.'",
    counters: [
      "Ask what values are being traded off in the name of practicality",
      "Distinguish sound practical judgment from moral abdication",
      "Check whether the 'realism' claim is just a way to avoid confronting a principle",
    ],
    sources: ["Pragmatic philosophy and decision theory literature", "Unpublished practitioner observation"],
    related: ["deontological-reasoning", "conscientious-objection", "stonewalling"],
  },
  {
    slug: "stonewalling",
    name: "Stonewalling",
    domain: "Manipulation",
    signature:
      "A person refuses to engage, answer, clarify, or engage in reciprocal communication to create confusion, fatigue, or control.",
    mechanism:
      "Stonewalling can stall accountability, increase emotional exhaustion, and protect the speaker from direct scrutiny. It makes the target do all the work while the speaker avoids responsibility or clarity.",
    seen: "Silent refusal, non-answers, repetitive deflection, dead-end communication, and an unwillingness to engage in actual problem-solving.",
    counters: [
      "Ask for concrete, time-bounded responses rather than general refusals",
      "Separate refusal to engage from good boundary-setting",
      "Do not keep chasing a person who is using silence as a tactic rather than a genuine limit",
    ],
    sources: ["Conflict communication and coercive dynamics literature", "Unpublished practitioner observation"],
    related: ["triangulation", "darvo", "implication-and-insinuation"],
  },
  {
    slug: "classical-conditioning",
    name: "Classical Conditioning & Pavlovian Association",
    domain: "Cognition & Bias",
    signature:
      "A neutral cue becomes behaviourally loaded by being paired with a stimulus that already triggers a strong response.",
    mechanism:
      "Through repeated pairing, the brain learns to associate a signal with an expected outcome. Once the association is learned, the cue can trigger anticipation, emotion or compliance even without the original stimulus being present.",
    seen: "Conditioned emotional responses, people who trigger anxiety through smell, tone, ritual, environment, or repeated symbolic patterns.",
    counters: [
      "Ask whether the reaction is a learned association rather than a present fact",
      "Break the pairing deliberately by separating the cue from the trigger",
      "Track the stimulus and your reaction to see if the link is automatic",
    ],
    sources: [
      "Pavlov, I. P. (1927). Conditioned reflexes: An investigation of the physiological activity of the cerebral cortex (G. V. Anrep, Trans.). Oxford University Press.",
      "Unpublished practitioner observation; practical pattern in emotional conditioning, social dynamics and repeated situational triggers",
    ],
    related: ["placebo-effect", "cognitive-sensory-overload", "hybrid-cascade-campaign"],
  },
  {
    slug: "placebo-effect",
    name: "Placebo Effect & Outcome Suggestion",
    domain: "Cognition & Bias",
    signature:
      "Belief in a pattern or promise can influence experience, expectation and interpretation of outcomes.",
    mechanism:
      "Expectations shape perception, physiology and behaviour; if the environment is loaded with symbolic assurance, the target may act as if the promise is already true.",
    seen: "Self-fulfilling outcomes, confidence traps, ritualised certainty, performance shaped by belief in a narrative.",
    counters: [
      "Separate expectation from evidence",
      "Use independent testing rather than emotional certainty",
      "Record what happened before and after the belief was activated",
    ],
    sources: [
      "Robert Ader & Nicholas Cohen — psychoneuroimmunology and expectancy effects",
      "Unpublished practitioner observation; especially in high-emotion belief systems",
    ],
    related: ["spiritual-archetypal-manipulation", "attention-looming", "commitment-consistency"],
  },
  {
    slug: "availability-heuristic",
    name: "Availability Heuristic",
    domain: "Cognition & Bias",
    signature:
      "Events that are easier to recall can feel more common or likely than events that are harder to bring to mind.",
    mechanism:
      "Ease of retrieval can serve as a rough cue for frequency or probability. Recent, vivid, emotional, or repeatedly reported examples may therefore dominate judgment even when they are not representative.",
    seen: "Estimating risk from a recent headline, judging a group from a memorable encounter, or treating an easily recalled explanation as the most probable one.",
    counters: [
      "Look for base rates and denominator information before relying on vivid examples",
      "Search deliberately for less memorable counterexamples",
      "Separate how easy an example is to recall from how often it actually occurs",
    ],
    sources: [
      "Tversky, A., & Kahneman, D. (1973). Availability: A heuristic for judging frequency and probability. Cognitive Psychology, 5(2), 207–232.",
      "Schwarz, N., et al. (1991). Ease of retrieval as information: Another look at the availability heuristic. Journal of Personality and Social Psychology, 61(2), 195–202.",
    ],
    related: ["loss-aversion", "scarcity", "social-proof"],
  },
  {
    slug: "correspondence-bias",
    name: "Correspondence Bias",
    domain: "Reading Others",
    signature:
      "An observer overweights a person's disposition and underweights situational constraints when explaining their behaviour.",
    mechanism:
      "When behaviour is salient, the actor's apparent traits can dominate explanation while contextual pressures receive less attention. This is a tendency, not a universal error; careful observers can account for situational information.",
    seen: "Calling someone lazy after seeing a missed deadline without checking workload, resources, conflicting priorities, or authority constraints.",
    counters: [
      "Describe the action first, then list plausible situational constraints",
      "Ask what information would distinguish a stable tendency from a one-off response",
      "Apply the same situational generosity to others that you would want applied to yourself",
    ],
    sources: [
      "Ross, L. (1977). The intuitive psychologist and his shortcomings: Distortions in the attribution process. Advances in Experimental Social Psychology, 10, 173–220.",
      "Gilbert, D. T., & Malone, P. S. (1995). The correspondence bias. Psychological Bulletin, 117(1), 21–38.",
    ],
    related: ["self-serving-bias", "projection", "social-comparison", "thin-slice-judgments"],
  },
  {
    slug: "thin-slice-judgments",
    name: "Thin-Slice Judgments",
    domain: "Reading Others",
    signature:
      "Brief observations can sometimes support useful judgments, but their accuracy depends on the target, setting, and outcome being judged.",
    mechanism:
      "People form impressions from limited samples of behaviour. Some research finds above-chance accuracy for particular judgments from short observations, but accuracy is not universal and does not establish access to hidden motives, character, or future behaviour.",
    seen: "Forming an impression from a short interaction, interview, or video clip and then treating it as a complete account of someone's personality.",
    counters: [
      "Specify exactly what you think the brief observation supports—and what it cannot establish",
      "Seek repeated observations across situations before making consequential judgments",
      "Consider base rates, context, and alternative explanations rather than confidence alone",
    ],
    sources: [
      "Ambady, N., & Rosenthal, R. (1992). Thin slices of expressive behavior as predictors of interpersonal consequences: A meta-analysis. Psychological Bulletin, 111(2), 256–274.",
      "Funder, D. C. (1995). On the accuracy of personality judgment: A realistic approach. Psychological Review, 102(4), 652–670.",
    ],
    related: ["correspondence-bias", "nonverbal-cue-context", "social-comparison"],
  },
  {
    slug: "nonverbal-cue-context",
    name: "Nonverbal Cues Need Context",
    domain: "Reading Others",
    signature:
      "A gesture, facial movement, pause, or change in eye contact rarely has one fixed meaning independent of person and situation.",
    mechanism:
      "Nonverbal behaviour can communicate affect and interactional information, but interpretation depends on context, individual differences, culture, and combinations of cues. Isolated signals do not reliably reveal deception, attraction, or private intent.",
    seen: "Treating crossed arms, gaze aversion, fidgeting, or a pause as a definitive sign of lying, hostility, or disinterest.",
    counters: [
      "Describe the observable behaviour before assigning meaning to it",
      "Compare with the person's behaviour in similar contexts, not a generic body-language rule",
      "Ask a clear, non-accusatory question and weigh the answer alongside other evidence",
    ],
    sources: [
      "Hall, J. A., Horgan, T. G., & Murphy, N. A. (2019). Nonverbal communication. Annual Review of Psychology, 70, 271–294.",
      "Bond, C. F., Jr., & DePaulo, B. M. (2006). Accuracy of deception judgments. Personality and Social Psychology Review, 10(3), 214–234.",
    ],
    related: ["thin-slice-judgments", "correspondence-bias", "linguistic-microtechniques"],
    knowledge: {
      epistemicKind: "research-construct",
      status: "not-appraised",
      claims: [],
      context: [
        "Nonverbal behaviour varies with culture, individual differences, disability, neurotype, relationship, and situation.",
        "A cue's interpretation is affected by how it was observed and by what happened before and after it.",
      ],
      contextFactors: {
        cultureAndPopulation: ["Norms and cue expression vary across cultures and populations."],
        individualDifferences: [
          "Disability, neurotype, habit, and personal baseline can change observable behaviour.",
        ],
        situation: ["Relationship, setting, preceding events, and observation conditions matter."],
      },
      alternativeExplanations: [
        "A pause, gaze shift, posture, or facial movement may reflect attention, fatigue, habit, sensory needs, culture, discomfort, or many other causes.",
        "The same internal state can be expressed differently, and the same cue can occur in different states.",
      ],
      ethicalConsiderations: [
        "Never treat an isolated gesture or expression as proof of deception, attraction, intent, or diagnosis.",
        "Prefer respectful clarification and corroborating evidence over surveillance or coercive testing.",
      ],
      levelsOfAnalysis: ["individual", "interpersonal", "cultural-social"],
    },
  },
  {
    slug: "emotion-recognition-context",
    name: "Emotion Recognition Across Contexts",
    domain: "Reading Others",
    signature:
      "Inferring another person's emotion from expression is a probabilistic judgment shaped by context, culture, and the observer.",
    mechanism:
      "Facial and vocal expressions provide information, but the same observable signal can occur in different emotional states, and the same emotion can be expressed differently. Group-level patterns do not guarantee accurate interpretation of an individual.",
    seen: "Assuming a facial expression proves a specific feeling, or reading a person from a single still image without considering what happened before or after.",
    counters: [
      "Treat an emotion label as a hypothesis, not a fact",
      "Use the person's words, circumstances, and behaviour over time to check an impression",
      "Allow the person to correct your interpretation without arguing them into a label",
    ],
    sources: [
      "Barrett, L. F., et al. (2019). Emotional expressions reconsidered: Challenges to inferring emotion from human facial movements. Psychological Science in the Public Interest, 20(1), 1–68.",
      "Elfenbein, H. A., & Ambady, N. (2002). On the universality and cultural specificity of emotion recognition: A meta-analysis. Psychological Bulletin, 128(2), 203–235.",
    ],
    related: ["nonverbal-cue-context", "thin-slice-judgments", "cognitive-reappraisal"],
  },
  {
    slug: "planning-fallacy",
    name: "Planning Fallacy",
    domain: "Cognition & Bias",
    signature:
      "People may underestimate the time, costs, or risks of their own plans, even when similar past projects ran late.",
    mechanism:
      "Forecasts often focus on the intended steps of the current plan and underweight delays, interruptions, and the distribution of outcomes in comparable cases. The effect is not inevitable and varies across tasks and conditions.",
    seen: "Repeatedly estimating that a project, move, application, or personal goal will take less time than comparable past efforts.",
    counters: [
      "Use an outside view: compare with several similar completed tasks",
      "Record estimates and actual outcomes to calibrate future forecasts",
      "List dependencies, likely interruptions, and a realistic range rather than one optimistic date",
    ],
    sources: [
      "Buehler, R., Griffin, D., & Ross, M. (1994). Exploring the planning fallacy: Why people underestimate their task completion times. Journal of Personality and Social Psychology, 67(3), 366–381.",
      "Kahneman, D., & Tversky, A. (1979). Intuitive prediction: Biases and corrective procedures. In S. Makridakis & S. C. Wheelwright (Eds.), Studies in the Management Sciences, 12, 313–327.",
    ],
    related: ["sunk-cost", "loss-aversion", "availability-heuristic"],
  },
  {
    slug: "cognitive-dissonance",
    name: "Cognitive Dissonance",
    domain: "Cognition & Bias",
    signature:
      "Inconsistency among beliefs, actions, or commitments can motivate people to change an attitude, justify an action, or avoid conflicting information.",
    mechanism:
      "Dissonance theory explains several possible responses to inconsistency; it does not mean every disagreement causes distress or that attitude change is the only outcome. Stakes, choice, commitment, and context affect how people respond.",
    seen: "Defending a costly choice after new evidence appears, or revising a belief after noticing that one's actions conflict with it.",
    counters: [
      "Ask what evidence would change your view before investing further",
      "Separate the quality of a past decision from the identity you attach to it",
      "Consider whether your explanation predicts future evidence or only protects a prior choice",
    ],
    sources: [
      "Festinger, L. (1957). A Theory of Cognitive Dissonance. Stanford University Press.",
      "Harmon-Jones, E., & Mills, J. (Eds.). (2019). Cognitive Dissonance: Reexamining a Pivotal Theory in Psychology, 2nd edition. American Psychological Association.",
    ],
    related: ["commitment-consistency", "sunk-cost", "self-serving-bias"],
  },
  {
    slug: "psychological-reactance",
    name: "Psychological Reactance",
    domain: "Influence",
    signature:
      "A perceived threat to freedom can increase motivation to restore that freedom, sometimes by resisting or rejecting the pressured option.",
    mechanism:
      "Reactance theory describes a motivational response to threatened choice. Its intensity and expression depend on the person, the importance of the freedom, and the context; disagreement alone is not proof of reactance.",
    seen: "A demand framed as 'you have no choice' producing resistance, or a person restoring autonomy by choosing an option they otherwise would not prefer.",
    counters: [
      "Offer meaningful options and explain constraints transparently",
      "Distinguish a genuine safety limit from unnecessary control",
      "When pressured, pause and identify which part of the decision is still yours",
    ],
    sources: [
      "Brehm, J. W. (1966). A Theory of Psychological Reactance. Academic Press.",
      "Steindl, C., et al. (2015). Understanding psychological reactance: New developments and findings. Zeitschrift für Psychologie, 223(4), 205–214.",
    ],
    related: ["scarcity", "authority", "commitment-consistency"],
  },
  {
    slug: "ingroup-favoritism",
    name: "In-Group Favoritism",
    domain: "Social Psychology",
    signature:
      "People may evaluate or allocate outcomes more favourably to those they see as part of their own group.",
    mechanism:
      "Group categorization can organize identity and comparison, sometimes producing preferential treatment even when group boundaries are minimal. Effects vary by setting and do not imply that every group member acts with conscious prejudice.",
    seen: "Unequal trust, credit, hiring, or resource allocation between insiders and outsiders with similar evidence or performance.",
    counters: [
      "Use explicit, consistent criteria for decisions affecting group members",
      "Check whether the same behaviour is interpreted differently depending on who performs it",
      "Seek perspectives from people outside the group before drawing conclusions",
    ],
    sources: [
      "Tajfel, H., et al. (1971). Social categorization and intergroup behaviour. European Journal of Social Psychology, 1(2), 149–178.",
      "Hewstone, M., Rubin, M., & Willis, H. (2002). Intergroup bias. Annual Review of Psychology, 53, 575–604.",
    ],
    related: ["social-proof", "authority", "favoritism-divide-rule"],
  },
  {
    slug: "pluralistic-ignorance",
    name: "Pluralistic Ignorance",
    domain: "Social Psychology",
    signature:
      "People may privately reject a norm while mistakenly believing that most others accept it.",
    mechanism:
      "When people infer private attitudes from others' public behaviour, silence or conformity can be misread as genuine agreement. This can sustain a norm that few individuals personally endorse.",
    seen: "A group privately expressing doubts in one-to-one conversations while no one raises them in the meeting.",
    counters: [
      "Create low-risk ways to express disagreement or uncertainty",
      "Ask for private estimates before a public discussion",
      "Do not treat silence as evidence of agreement without checking",
    ],
    sources: [
      "Miller, D. T., & McFarland, C. (1991). When social comparison goes awry: The case of pluralistic ignorance. In J. Suls & T. A. Wills (Eds.), Social Comparison: Contemporary Theory and Research, 287–313.",
      "Prentice, D. A., & Miller, D. T. (1993). Pluralistic ignorance and alcohol use on campus: Some consequences of misperceiving the social norm. Journal of Personality and Social Psychology, 64(2), 243–256.",
    ],
    related: ["social-proof", "authority", "ostracism-silent-treatment"],
  },
  {
    slug: "bystander-effect",
    name: "Bystander Effect",
    domain: "Social Psychology",
    signature:
      "In some emergencies, the presence of other witnesses can reduce any one person's likelihood of intervening or delay action.",
    mechanism:
      "Diffusion of responsibility and uncertainty about how others interpret an event can inhibit intervention. Later research finds that effects vary by situation, including whether danger is clear and whether help requires coordination.",
    seen: "Witnesses looking to one another for cues while an urgent situation remains unaddressed.",
    counters: [
      "Name a specific person and give a concrete, feasible task",
      "If you are a witness, assess immediate safety and contact appropriate emergency support",
      "Avoid assuming that a crowd has already acted or that someone else is responsible",
    ],
    sources: [
      "Darley, J. M., & Latané, B. (1968). Bystander intervention in emergencies: Diffusion of responsibility. Journal of Personality and Social Psychology, 8(4, Pt. 1), 377–383.",
      "Fischer, P., et al. (2011). The bystander-effect: A meta-analytic review on bystander intervention in dangerous and non-dangerous emergencies. Psychological Bulletin, 137(4), 517–537.",
    ],
    related: ["pluralistic-ignorance", "social-proof", "authority"],
  },
  {
    slug: "social-comparison",
    name: "Social Comparison",
    domain: "Self-Knowledge",
    signature:
      "People use comparisons with others to evaluate abilities, opinions, and social standing, especially when objective standards are unclear.",
    mechanism:
      "Comparison targets and contexts can shape self-evaluation, motivation, and emotion. Upward comparisons can inspire or discourage; downward comparisons can reassure or distort. The outcome is not fixed.",
    seen: "Judging personal progress by a peer's curated successes or recalibrating standards after joining a new group.",
    counters: [
      "Compare against your own prior baseline or a relevant objective criterion",
      "Ask whether the comparison target is similar and whether you have comparable information",
      "Notice when a comparison informs a goal versus merely lowering or inflating self-worth",
    ],
    sources: [
      "Festinger, L. (1954). A theory of social comparison processes. Human Relations, 7(2), 117–140.",
      "Suls, J., Martin, R., & Wheeler, L. (2002). Social comparison: Why, with whom, and with what effect? Current Directions in Psychological Science, 11(5), 159–163.",
    ],
    related: ["self-serving-bias", "social-proof", "correspondence-bias"],
  },
  {
    slug: "moral-licensing",
    name: "Moral Licensing",
    domain: "Ethics & Influence",
    signature:
      "After an action that supports a positive moral self-image, a person may feel more permitted to act in a way that conflicts with that image.",
    mechanism:
      "Some studies find that prior moral credentials can affect later choices, but effects depend on context and are not universal. This is a research construct, not a reliable way to infer another person's motives.",
    seen: "Treating a past good deed as a reason not to scrutinize a later decision, or invoking a moral identity to deflect a specific concern.",
    counters: [
      "Evaluate the current action on its own evidence and consequences",
      "Apply the same standards before and after receiving praise or recognition",
      "Avoid diagnosing motive from one inconsistent choice",
    ],
    sources: [
      "Monin, B., & Miller, D. T. (2001). Moral credentials and the expression of prejudice. Journal of Personality and Social Psychology, 81(1), 33–43.",
      "Blanken, I., van de Ven, N., & Zeelenberg, M. (2015). A meta-analytic review of moral licensing. Personality and Social Psychology Bulletin, 41(4), 540–558.",
    ],
    related: ["self-serving-bias", "commitment-consistency", "authority"],
  },
  {
    slug: "status-quo-bias",
    name: "Status Quo Bias",
    domain: "Decision-Making & Power",
    signature:
      "People may favour an existing arrangement over a change, even when alternatives could better serve their goals.",
    mechanism:
      "Inertia, switching costs, loss aversion, and the framing of defaults can each contribute to maintaining the current state. The bias is not proof that the status quo is irrational; existing arrangements may have real benefits or constraints.",
    seen: "Keeping a subscription, policy, role, or routine mainly because changing it feels effortful or risky.",
    counters: [
      "Compare the current option with alternatives as if choosing today",
      "Separate genuine switching costs from familiarity and default effects",
      "Review defaults periodically, especially when circumstances have changed",
    ],
    sources: [
      "Samuelson, W., & Zeckhauser, R. (1988). Status quo bias in decision making. Journal of Risk and Uncertainty, 1, 7–59.",
      "Kahneman, D., Knetsch, J. L., & Thaler, R. H. (1991). Anomalies: The endowment effect, loss aversion, and status quo bias. Journal of Economic Perspectives, 5(1), 193–206.",
    ],
    related: ["loss-aversion", "sunk-cost", "authority"],
  },
  {
    slug: "cognitive-reappraisal",
    name: "Cognitive Reappraisal",
    domain: "Emotion & Motivation",
    signature:
      "Changing how a situation is interpreted can alter its emotional impact, without changing the underlying facts.",
    mechanism:
      "Reappraisal is one emotion-regulation strategy studied in experimental and everyday contexts. Its usefulness depends on the situation, the available information, and the person's needs; it should not be used to minimize genuine harm or suppress justified action.",
    seen: "Considering a less threatening explanation for an ambiguous delay while still checking facts and maintaining appropriate boundaries.",
    counters: [
      "Distinguish a plausible alternative interpretation from an excuse unsupported by evidence",
      "Use reappraisal to widen options, not to deny harm or force positivity",
      "When facts are unclear, gather information before committing to a story",
    ],
    sources: [
      "Gross, J. J. (1998). The emerging field of emotion regulation: An integrative review. Review of General Psychology, 2(3), 271–299.",
      "Webb, T. L., Miles, E., & Sheeran, P. (2012). Dealing with feeling: A meta-analysis of the effectiveness of strategies derived from the process model of emotion regulation. Psychological Bulletin, 138(4), 775–808.",
    ],
    related: ["emotional-flooding", "placebo-effect", "cognitive-dissonance"],
  },
  {
    slug: "confirmation-bias",
    name: "Confirmation Bias",
    domain: "Cognition & Bias",
    signature:
      "People tend to seek, interpret, and remember information in ways that can favour an existing belief.",
    mechanism:
      "Prior beliefs guide attention and evaluation, but people do not invariably ignore counterevidence. The strength and direction of the effect depend on the task, motivation, and information environment.",
    seen: "Searching for evidence that supports a suspicion while treating contrary evidence as an exception without applying the same standard to both.",
    counters: [
      "Write down what evidence would count against your belief before searching",
      "Look for disconfirming evidence using the same quality threshold as confirming evidence",
      "Ask another person to make the strongest case against your current view",
    ],
    sources: [
      "Nickerson, R. S. (1998). Confirmation bias: A ubiquitous phenomenon in many guises. Review of General Psychology, 2(2), 175–220.",
      "Lord, C. G., Ross, L., & Lepper, M. R. (1979). Biased assimilation and attitude polarization: The effects of prior theories on subsequently considered evidence. Journal of Personality and Social Psychology, 37(11), 2098–2109.",
    ],
    related: ["cognitive-dissonance", "availability-heuristic", "self-serving-bias"],
  },
  {
    slug: "anchoring-effect",
    name: "Anchoring Effect",
    domain: "Cognition & Bias",
    signature:
      "An initial number or reference point can influence later estimates, even when it is arbitrary or only partly relevant.",
    mechanism:
      "Judgments can remain shifted toward an initial value after adjustment. Anchoring effects vary across tasks and may be reduced by expertise, relevant knowledge, and deliberate consideration of alternatives.",
    seen: "A first price, salary offer, deadline, or estimate disproportionately shaping later proposals.",
    counters: [
      "Generate an independent estimate before seeing or responding to an anchor",
      "Use relevant reference classes and objective ranges",
      "Ask how the first number was produced and whether it is informative",
    ],
    sources: [
      "Tversky, A., & Kahneman, D. (1974). Judgment under uncertainty: Heuristics and biases. Science, 185(4157), 1124–1131.",
      "Furnham, A., & Boo, H. C. (2011). A literature review of the anchoring effect. The Journal of Socio-Economics, 40(1), 35–42.",
    ],
    related: ["batna", "scarcity", "planning-fallacy"],
  },
  {
    slug: "hindsight-bias",
    name: "Hindsight Bias",
    domain: "Cognition & Bias",
    signature:
      "After learning an outcome, people may remember it as more predictable than it seemed beforehand.",
    mechanism:
      "Knowledge of what happened can reshape memory and interpretation of earlier evidence. This makes it harder to evaluate past decisions fairly or learn from forecasts.",
    seen: "Saying “I knew that would happen” after an event, despite having made no clear prediction beforehand.",
    counters: [
      "Record forecasts, confidence, and reasons before outcomes are known",
      "Separate what was knowable then from what is obvious now",
      "Review both accurate and inaccurate predictions, not only memorable successes",
    ],
    sources: [
      "Fischhoff, B. (1975). Hindsight is not equal to foresight: The effect of outcome knowledge on judgment under uncertainty. Journal of Experimental Psychology: Human Perception and Performance, 1(3), 288–299.",
      "Roese, N. J., & Vohs, K. D. (2012). Hindsight bias. Perspectives on Psychological Science, 7(5), 411–426.",
    ],
    related: ["availability-heuristic", "planning-fallacy", "self-serving-bias"],
  },
  {
    slug: "overconfidence-effect",
    name: "Overconfidence",
    domain: "Cognition & Bias",
    signature:
      "Confidence in a judgment can exceed its accuracy, especially when feedback is weak or uncertainty is hard to see.",
    mechanism:
      "Overconfidence includes distinct phenomena such as overestimation, overplacement, and overprecision. It varies with task and expertise; confidence is not inherently misplaced, but it should be calibrated against outcomes.",
    seen: "Narrow forecasts stated with high certainty despite limited evidence, or assuming one's skill is above average without a relevant comparison.",
    counters: [
      "State a range and confidence level, then compare forecasts with outcomes",
      "Use base rates and independent review for high-stakes judgments",
      "Distinguish expertise in one domain from expertise in another",
    ],
    sources: [
      "Moore, D. A., & Healy, P. J. (2008). The trouble with overconfidence. Psychological Review, 115(2), 502–517.",
      "Lichtenstein, S., Fischhoff, B., & Phillips, L. D. (1982). Calibration of probabilities: The state of the art to 1980. In D. Kahneman, P. Slovic, & A. Tversky (Eds.), Judgment under Uncertainty: Heuristics and Biases, 306–334.",
    ],
    related: ["planning-fallacy", "hindsight-bias", "availability-heuristic"],
  },
  {
    slug: "halo-effect",
    name: "Halo Effect",
    domain: "Reading Others",
    signature:
      "A salient positive or negative impression can spill over into judgments about unrelated qualities.",
    mechanism:
      "Global impressions can influence how specific attributes are rated, particularly when evidence is ambiguous or the evaluator lacks independent criteria. This does not mean every favorable impression is inaccurate.",
    seen: "Assuming that a confident, attractive, or prestigious person is also competent, honest, or kind without evaluating those qualities separately.",
    counters: [
      "Rate each relevant quality using its own evidence and criteria",
      "Seek work samples or repeated behaviour rather than reputation alone",
      "Ask whether the same evidence would persuade you if the person seemed less impressive",
    ],
    sources: [
      "Thorndike, E. L. (1920). A constant error in psychological ratings. Journal of Applied Psychology, 4(1), 25–29.",
      "Nisbett, R. E., & Wilson, T. D. (1977). The halo effect: Evidence for unconscious alteration of judgments. Journal of Personality and Social Psychology, 35(4), 250–256.",
    ],
    related: ["correspondence-bias", "authority", "thin-slice-judgments"],
  },
  {
    slug: "affect-heuristic",
    name: "Affect Heuristic",
    domain: "Emotion & Motivation",
    signature:
      "A positive or negative feeling toward an option can influence judgments of its risks and benefits.",
    mechanism:
      "Affect can provide useful information, but it can also substitute for a more deliberate assessment when people judge complex risks or benefits. Feeling is one input, not a complete measurement.",
    seen: "Seeing a liked activity as safer or more beneficial, or a disliked group as more dangerous, without checking comparative evidence.",
    counters: [
      "Assess benefits and risks separately before combining them",
      "Check whether your feeling is based on relevant experience or on familiarity and presentation",
      "Use outside data for consequential risk estimates",
    ],
    sources: [
      "Slovic, P., Finucane, M. L., Peters, E., & MacGregor, D. G. (2007). The affect heuristic. European Journal of Operational Research, 177(3), 1333–1352.",
      "Finucane, M. L., et al. (2000). The affect heuristic in judgments of risks and benefits. Journal of Behavioral Decision Making, 13(1), 1–17.",
    ],
    related: ["cognitive-reappraisal", "availability-heuristic", "placebo-effect"],
  },
  {
    slug: "emotional-contagion",
    name: "Emotional Contagion",
    domain: "Emotion & Motivation",
    signature:
      "People's emotions can converge during interaction through cues such as expression, voice, attention, and shared interpretation.",
    mechanism:
      "Emotional convergence is influenced by social connection, context, and individual differences. It is not evidence that one person deliberately caused another's emotional state.",
    seen: "A tense meeting becoming more agitated as participants mirror urgency, or a calm and supportive interaction lowering group tension.",
    counters: [
      "Notice your own state before attributing it to another person's intent",
      "Slow the pace and regulate the interaction when escalation is unhelpful",
      "Consider shared circumstances that could affect everyone present",
    ],
    sources: [
      "Hatfield, E., Cacioppo, J. T., & Rapson, R. L. (1993). Emotional Contagion. Cambridge University Press.",
      "Barsade, S. G. (2002). The ripple effect: Emotional contagion and its influence on group behavior. Administrative Science Quarterly, 47(4), 644–675.",
    ],
    related: ["emotional-flooding", "affect-heuristic", "group-polarization"],
  },
  {
    slug: "group-polarization",
    name: "Group Polarization",
    domain: "Social Psychology",
    signature:
      "Discussion among like-minded people can sometimes shift a group's average position toward a more extreme version of its initial leaning.",
    mechanism:
      "Persuasive arguments and social comparison can both contribute. Polarization is conditional, not an inevitable result of group discussion, and groups can also moderate or diversify views.",
    seen: "A team becoming more risk-tolerant or more cautious after discussing mainly one-sided arguments.",
    counters: [
      "Invite credible counterarguments before consensus forms",
      "Record initial individual judgments before group discussion",
      "Distinguish new evidence from pressure to signal group loyalty",
    ],
    sources: [
      "Myers, D. G., & Lamm, H. (1976). The group polarization phenomenon. Psychological Bulletin, 83(4), 602–627.",
      "Isenberg, D. J. (1986). Group polarization: A critical review and meta-analysis. Journal of Personality and Social Psychology, 50(6), 1141–1151.",
    ],
    related: ["social-proof", "pluralistic-ignorance", "ingroup-favoritism"],
  },
  {
    slug: "normative-and-informational-influence",
    name: "Normative and Informational Influence",
    domain: "Social Psychology",
    signature:
      "People may align with others either to gain acceptance or because they believe others provide useful information.",
    mechanism:
      "The same public agreement can arise from different processes: desire for belonging, uncertainty, or both. Observed conformity alone does not reveal a person's private belief.",
    seen: "Agreeing with a group to avoid social cost, or following a group because its members appear to know more about an uncertain situation.",
    counters: [
      "Ask privately what people think before public positions are established",
      "Clarify whether the group has relevant information or only social influence",
      "Make dissent safe and distinguish disagreement from disloyalty",
    ],
    sources: [
      "Deutsch, M., & Gerard, H. B. (1955). A study of normative and informational social influences upon individual judgment. Journal of Abnormal and Social Psychology, 51(3), 629–636.",
      "Cialdini, R. B., & Goldstein, N. J. (2004). Social influence: Compliance and conformity. Annual Review of Psychology, 55, 591–621.",
    ],
    related: ["social-proof", "pluralistic-ignorance", "group-polarization"],
  },
  {
    slug: "demand-withdraw-pattern",
    name: "Demand–Withdraw Pattern",
    domain: "Relationships",
    signature:
      "One person presses for change or discussion while the other avoids, disengages, or shuts down; each response can intensify the other.",
    mechanism:
      "Research links this interaction pattern to relationship distress, but who demands or withdraws can vary with topic, power, and context. It is a description of an interaction, not a diagnosis or proof of bad intent.",
    seen: "Repeated cycles of pressing for an answer and retreating from the conversation, with both people feeling unheard or controlled.",
    counters: [
      "Name the cycle as a shared interaction rather than assigning a fixed role",
      "Agree on a time to resume the conversation if either person needs a pause",
      "Clarify one concrete issue and one request at a time, while preserving safety and boundaries",
    ],
    sources: [
      "Christensen, A., & Heavey, C. L. (1990). Gender and social structure in the demand/withdraw pattern of marital conflict. Journal of Personality and Social Psychology, 59(1), 73–81.",
      "Schrodt, P., Witt, P. L., & Shimkowski, J. R. (2014). A meta-analytical review of the demand/withdraw pattern of interaction and its associations with individual, relational, and communicative outcomes. Communication Monographs, 81(1), 28–58.",
    ],
    related: ["mirroring", "emotional-flooding", "double-bind"],
  },
  {
    slug: "self-disclosure-reciprocity",
    name: "Self-Disclosure and Reciprocity",
    domain: "Communication",
    signature:
      "Personal disclosure can invite reciprocal disclosure and increase perceived closeness, depending on timing, trust, and context.",
    mechanism:
      "Disclosure and liking are associated in both directions: sharing may foster closeness, and existing liking may make sharing more likely. Disclosure is not a reliable commitment test and should remain voluntary.",
    seen: "A conversation deepening as people exchange personal information, or someone feeling pressured to reveal more because another person disclosed first.",
    counters: [
      "Share at a pace that feels freely chosen rather than owed",
      "Respect privacy and do not treat disclosure as consent to further access",
      "Assess trust through consistent, respectful behaviour over time",
    ],
    sources: [
      "Collins, N. L., & Miller, L. C. (1994). Self-disclosure and liking: A meta-analytic review. Psychological Bulletin, 116(3), 457–475.",
      "Laurenceau, J.-P., Barrett, L. F., & Pietromonaco, P. R. (1998). Intimacy as an interpersonal process: The importance of self-disclosure, partner disclosure, and perceived partner responsiveness. Journal of Personality and Social Psychology, 74(5), 1238–1251.",
    ],
    related: ["reciprocity", "mirroring", "rapid-mirroring-agreement"],
  },
  {
    slug: "psychological-safety",
    name: "Psychological Safety",
    domain: "Organizations",
    signature:
      "A shared belief that interpersonal risks—such as asking questions or admitting mistakes—can be taken without undue punishment.",
    mechanism:
      "Psychological safety concerns perceived consequences of speaking up in a team, not comfort at all times or freedom from accountability. Research connects it with learning behaviours, while context and leadership practices matter.",
    seen: "Team members raising concerns early when they expect fair treatment, or hiding errors when they anticipate humiliation or retaliation.",
    counters: [
      "Respond to questions and bad news with curiosity before assigning blame",
      "Set clear standards while separating honest error reporting from misconduct",
      "Track whose voices are missing and what happens after dissent",
    ],
    sources: [
      "Edmondson, A. (1999). Psychological safety and learning behavior in work teams. Administrative Science Quarterly, 44(2), 350–383.",
      "Frazier, M. L., et al. (2017). Psychological safety: A meta-analytic review and extension. Personnel Psychology, 70(1), 113–165.",
    ],
    related: ["authority", "ostracism-silent-treatment", "pluralistic-ignorance"],
  },
  {
    slug: "organizational-silence",
    name: "Organizational Silence",
    domain: "Organizations",
    signature:
      "Employees may withhold concerns, ideas, or information they believe could be costly to express.",
    mechanism:
      "Silence can result from fear, futility, norms, or strategic choice; it should not be assumed to reflect agreement. Organizational structures and leaders influence whether speaking up feels worthwhile and safe.",
    seen: "Repeated concerns discussed privately but omitted from formal reviews, risk reports, or meetings.",
    counters: [
      "Provide multiple confidential and non-retaliatory reporting channels",
      "Show what action followed previous feedback, including reasons when no change is made",
      "Do not infer consensus from the absence of objections",
    ],
    sources: [
      "Morrison, E. W., & Milliken, F. J. (2000). Organizational silence: A barrier to change and development in a pluralistic world. Academy of Management Review, 25(4), 706–725.",
      "Detert, J. R., & Edmondson, A. C. (2011). Implicit voice theories: Taken-for-granted rules of self-censorship at work. Academy of Management Journal, 54(3), 461–488.",
    ],
    related: ["psychological-safety", "authority", "pluralistic-ignorance"],
  },
  {
    slug: "power-dependence",
    name: "Power–Dependence Relations",
    domain: "Power",
    signature:
      "A person's power in a relationship can increase when another person depends on resources or outcomes they control.",
    mechanism:
      "Power-dependence theory frames power as relational and tied to dependence, alternatives, and valued resources. It does not mean every unequal relationship is abusive or that power is the only influence on behaviour.",
    seen: "A worker, tenant, caregiver, or partner having fewer realistic alternatives because another person controls an important resource.",
    counters: [
      "Map each party's dependencies, alternatives, and constraints",
      "Identify realistic ways to increase options, support, or independent access",
      "Distinguish formal authority from the resources and dependencies that sustain it",
    ],
    sources: [
      "Emerson, R. M. (1962). Power-dependence relations. American Sociological Review, 27(1), 31–41.",
      "Cook, K. S., & Emerson, R. M. (1978). Power, equity and commitment in exchange networks. American Sociological Review, 43(5), 721–739.",
    ],
    related: ["batna", "authority", "institutional-legal-economic-levers"],
  },
  {
    slug: "reactive-devaluation",
    name: "Reactive Devaluation",
    domain: "Negotiation",
    signature:
      "A proposal may be judged less favourably because it came from an opposing or distrusted source.",
    mechanism:
      "Source identity and conflict can affect perceived value of an offer. This is a possible judgment bias, not evidence that the offer is good or that rejecting it is irrational.",
    seen: "Dismissing a workable proposal mainly because it was suggested by an opponent, or accepting weak terms from a trusted ally without equivalent scrutiny.",
    counters: [
      "Evaluate the proposal against pre-agreed criteria without naming its source",
      "Separate the merits of the terms from trust in the person offering them",
      "Use an independent reviewer for high-stakes proposals",
    ],
    sources: [
      "Ross, L. (1995). Reactive devaluation in negotiation and conflict resolution. In K. J. Arrow et al. (Eds.), Barriers to Conflict Resolution, 26–42.",
      "Maoz, I., & Ross, L. (2002). The dialectic of victim and victimizer: Israeli-Jewish and Palestinian accounts of their conflict. Political Psychology, 23(1), 115–139.",
    ],
    related: ["batna", "anchoring-effect", "ingroup-favoritism"],
  },
  {
    slug: "fixed-pie-bias",
    name: "Fixed-Pie Bias",
    domain: "Negotiation",
    signature:
      "Negotiators may assume their interests are opposed across the board and miss opportunities for mutually beneficial trade-offs.",
    mechanism:
      "Different priorities, forecasts, and risk preferences can create integrative options, but not every conflict has a mutually beneficial solution. Joint problem-solving does not remove real competition or unequal power.",
    seen: "Negotiators fighting over one visible issue while overlooking differences in timing, certainty, implementation, or what each side values most.",
    counters: [
      "Ask questions about priorities and constraints before arguing positions",
      "Generate multiple packages and compare them against each party's alternatives",
      "Keep claims about shared gains honest and verify that each party can freely decline",
    ],
    sources: [
      "Thompson, L., & Hastie, R. (1990). Social perception in negotiation. Organizational Behavior and Human Decision Processes, 47(1), 98–123.",
      "Fisher, R., Ury, W., & Patton, B. (2011). Getting to Yes: Negotiating Agreement Without Giving In, 3rd edition. Penguin.",
    ],
    related: ["batna", "reactive-devaluation", "mirroring"],
  },
  {
    slug: "social-learning",
    name: "Social Learning and Modeling",
    domain: "Human Development",
    signature:
      "People can learn behaviours, expectations, and strategies by observing others and the consequences those behaviours receive.",
    mechanism:
      "Observational learning can occur without immediate direct reinforcement, though attention, memory, motivation, and opportunity affect whether modeled behaviour is adopted. Seeing an action does not guarantee imitation.",
    seen: "A child, new employee, or group member adopting an observed routine after seeing who receives approval or consequences.",
    counters: [
      "Notice which behaviours are modeled and rewarded in the environment",
      "Provide safe opportunities to practise alternatives, not just verbal instructions",
      "Avoid assuming that exposure alone explains a person's behaviour or history",
    ],
    sources: [
      "Bandura, A., Ross, D., & Ross, S. A. (1961). Transmission of aggression through imitation of aggressive models. Journal of Abnormal and Social Psychology, 63(3), 575–582.",
      "Bandura, A. (1977). Social Learning Theory. Prentice Hall.",
    ],
    related: ["classical-conditioning", "social-proof", "authority"],
  },
  {
    slug: "cultural-tightness-looseness",
    name: "Cultural Tightness and Looseness",
    domain: "Culture & Ethics",
    signature:
      "Cultures and groups differ in the strength of social norms and the tolerance of deviations from them.",
    mechanism:
      "Tightness–looseness is a comparative framework studied across societies and organizations. It describes broad norm patterns, not every individual's beliefs, and should not be used to rank cultures as inherently better or worse.",
    seen: "Different consequences for the same norm violation across workplaces, communities, or national settings.",
    counters: [
      "Ask which specific norm is at stake and who enforces it",
      "Avoid treating a group-level tendency as a prediction about an individual",
      "Consider historical, ecological, and institutional context before comparing settings",
    ],
    sources: [
      "Gelfand, M. J., et al. (2011). Differences between tight and loose cultures: A 33-nation study. Science, 332(6033), 1100–1104.",
      "Gelfand, M. J., et al. (2021). The relationship between cultural tightness–looseness and COVID-19 cases and deaths: A global analysis. The Lancet Planetary Health, 5(3), e135–e144.",
    ],
    related: ["social-proof", "normative-and-informational-influence", "ingroup-favoritism"],
  },
  {
    slug: "self-complexity",
    name: "Self-Complexity",
    domain: "Self-Knowledge",
    signature:
      "People represent themselves through multiple roles and attributes, and these self-aspects can be more or less distinct.",
    mechanism:
      "Self-complexity theory proposes that the organization of self-knowledge may affect responses to events. Findings are context-dependent and do not imply that maximizing the number of roles is always beneficial.",
    seen: "A setback in one role feeling like a total verdict on the self, or different life roles providing distinct sources of meaning and support.",
    counters: [
      "Describe the specific role or domain affected before generalizing to your whole identity",
      "Maintain meaningful activities and relationships without using busyness to avoid problems",
      "Treat self-reflection measures as prompts, not clinical assessments",
    ],
    sources: [
      "Linville, P. W. (1987). Self-complexity as a cognitive buffer against stress-related illness and depression. Journal of Personality and Social Psychology, 52(4), 663–676.",
      "Rafaeli-Mor, E., & Steinberg, J. (2002). Self-complexity and well-being: A review and research synthesis. Personality and Social Psychology Review, 6(1), 31–58.",
    ],
    related: ["social-comparison", "self-serving-bias", "cognitive-reappraisal"],
  },
  {
    slug: "person-situation-interaction",
    name: "Person–Situation Interaction",
    domain: "Personality & Individual Differences",
    signature:
      "Behaviour reflects both individual tendencies and the situation; the same person can act differently across contexts.",
    mechanism:
      "Personality research examines relatively stable individual differences without treating traits as guarantees. Situations vary in how strongly they constrain behaviour, and individual dispositions can interact with those demands.",
    seen: "Treating one action as a permanent trait, or assuming that a trait predicts the same behaviour regardless of role, stress, incentives, or social setting.",
    counters: [
      "Look for patterns across multiple situations and time points",
      "Record both the behaviour and the context in which it occurred",
      "Use trait language probabilistically and avoid inferring a diagnosis from anecdotes",
    ],
    sources: [
      "Mischel, W. (1968). Personality and Assessment. Wiley.",
      "Fleeson, W. (2001). Toward a structure- and process-integrated view of personality: Traits as density distributions of states. Journal of Personality and Social Psychology, 80(6), 1011–1027.",
    ],
    related: ["correspondence-bias", "thin-slice-judgments", "self-complexity"],
  },
  {
    slug: "self-handicapping",
    name: "Self-Handicapping",
    domain: "Self-Knowledge",
    signature:
      "People may create or claim obstacles before a performance so that failure has an external explanation and success remains creditable.",
    mechanism:
      "Self-handicapping can protect self-worth under evaluative threat, while also undermining performance and learning. It is a research construct and should not be inferred from one missed deadline or difficulty.",
    seen: "Avoiding preparation and later attributing a poor result to lack of time, while treating success despite the obstacle as proof of ability.",
    counters: [
      "Notice whether the obstacle is chosen, unavoidable, or simply being reported after the fact",
      "Reduce performance stakes enough to allow honest effort and useful feedback",
      "Focus on controllable preparation rather than defending identity",
    ],
    sources: [
      "Jones, E. E., & Berglas, S. (1978). Control of attributions about the self through self-handicapping strategies: The appeal of alcohol and the role of underachievement. Personality and Social Psychology Bulletin, 4(2), 200–206.",
      "Hirt, E. R., et al. (2003). The role of self-handicapping in the self-regulation of performance. In M. R. Leary & J. P. Tangney (Eds.), Handbook of Self and Identity.",
    ],
    related: ["self-serving-bias", "planning-fallacy", "overconfidence-effect"],
  },
  {
    slug: "attachment-orientations",
    name: "Adult Attachment Orientations",
    domain: "Attachment",
    signature:
      "People vary in attachment-related expectations and strategies for seeking closeness and security; these are dimensions, not fixed types.",
    mechanism:
      "Adult attachment research commonly studies anxiety and avoidance dimensions in relationships. Scores and observed strategies vary by measure, partner, and context; they are not diagnoses and do not establish a person's motives.",
    seen: "Noticing recurring differences in comfort with closeness, reassurance, and support-seeking while resisting simplistic labels such as 'always avoidant' or 'always anxious'.",
    counters: [
      "Describe specific behaviours and contexts instead of assigning a fixed attachment label",
      "Consider both partners' actions and the relationship conditions",
      "Use validated measures only for their intended purpose and with appropriate interpretation",
    ],
    sources: [
      "Brennan, K. A., Clark, C. L., & Shaver, P. R. (1998). Self-report measurement of adult attachment: An integrative overview. In J. A. Simpson & W. S. Rholes (Eds.), Attachment Theory and Close Relationships, 46–76.",
      "Fraley, R. C., Waller, N. G., & Brennan, K. A. (2000). An item response theory analysis of self-report measures of adult attachment. Journal of Personality and Social Psychology, 78(2), 350–365.",
    ],
    related: ["demand-withdraw-pattern", "self-disclosure-reciprocity", "trauma-bonding"],
  },
  {
    slug: "expressive-suppression",
    name: "Expressive Suppression",
    domain: "Emotion & Motivation",
    signature:
      "A person may inhibit the outward expression of emotion without necessarily changing the underlying emotional experience.",
    mechanism:
      "Expressive suppression is one emotion-regulation strategy. Its effects depend on context, culture, goals, and timing; concealing expression can sometimes be useful for immediate safety or professionalism, but it is not the same as resolving an emotion.",
    seen: "Maintaining a neutral expression during a tense conversation while still experiencing distress internally.",
    counters: [
      "Distinguish managing expression from understanding or addressing the emotion",
      "Choose regulation strategies that fit the situation and your safety",
      "Avoid treating a neutral face as evidence that someone feels nothing",
    ],
    sources: [
      "Gross, J. J., & Levenson, R. W. (1993). Emotional suppression: Physiology, self-report, and expressive behavior. Journal of Personality and Social Psychology, 64(6), 970–986.",
      "Gross, J. J., & John, O. P. (2003). Individual differences in two emotion regulation processes: Implications for affect, relationships, and well-being. Journal of Personality and Social Psychology, 85(2), 348–362.",
    ],
    related: ["cognitive-reappraisal", "emotional-contagion", "nonverbal-cue-context"],
  },
  {
    slug: "implementation-intentions",
    name: "Implementation Intentions",
    domain: "Self-Knowledge",
    signature:
      "A specific if–then plan can link a recognizable situation to a chosen action, helping bridge intention and behaviour.",
    mechanism:
      "Implementation intentions make a cue and response explicit. Meta-analytic research finds benefits for goal attainment across settings, though plans cannot remove structural barriers or guarantee results.",
    seen: "Planning, “If I finish lunch, then I will spend 20 minutes on the report,” rather than relying on a general intention to work later.",
    counters: [
      "Choose a specific cue that is likely to occur and a feasible action",
      "Plan for common obstacles and revise if the environment changes",
      "Do not frame structural limits or health needs as failures of willpower",
    ],
    sources: [
      "Gollwitzer, P. M. (1999). Implementation intentions: Strong effects of simple plans. American Psychologist, 54(7), 493–503.",
      "Gollwitzer, P. M., & Sheeran, P. (2006). Implementation intentions and goal achievement: A meta-analysis of effects and processes. Advances in Experimental Social Psychology, 38, 69–119.",
    ],
    related: ["planning-fallacy", "self-handicapping", "classical-conditioning"],
  },
  {
    slug: "active-listening",
    name: "Active Listening and Reflective Checking",
    domain: "Communication",
    signature:
      "A listener can improve shared understanding by attending, paraphrasing, and checking whether their interpretation is accurate.",
    mechanism:
      "Reflective listening can signal attention and surface misunderstandings, but it does not guarantee agreement, empathy, or truth. It should not be used as a tactic to pressure disclosure or steer someone toward a preferred answer.",
    seen: "Paraphrasing a concern and inviting correction before offering advice or responding to a disagreement.",
    counters: [
      "Ask whether your paraphrase is accurate and accept correction",
      "Do not confuse understanding a view with endorsing it",
      "Respect a person's choice not to discuss private information",
    ],
    sources: [
      "Weger, H., Jr., et al. (2014). The relative effectiveness of active listening in initial interactions. International Journal of Listening, 28(1), 13–31.",
      "Rogers, C. R., & Farson, R. E. (1957). Active Listening. Industrial Relations Center, University of Chicago.",
    ],
    related: ["mirroring", "self-disclosure-reciprocity", "demand-withdraw-pattern"],
  },
  {
    slug: "procedural-justice",
    name: "Procedural Justice",
    domain: "Organizations",
    signature:
      "People's judgments of fairness depend not only on outcomes but also on how decisions are made and explained.",
    mechanism:
      "Procedural justice research examines features such as voice, consistency, neutrality, respect, and trustworthy explanations. Fair process does not guarantee a favourable outcome or make an unjust policy acceptable.",
    seen: "A decision being better accepted when affected people have a meaningful opportunity to be heard and criteria are applied consistently.",
    counters: [
      "Make decision criteria visible and apply them consistently",
      "Give affected people a genuine opportunity to provide relevant information",
      "Explain decisions and provide review or appeal routes where appropriate",
    ],
    sources: [
      "Thibaut, J., & Walker, L. (1975). Procedural Justice: A Psychological Analysis. Lawrence Erlbaum Associates.",
      "Colquitt, J. A. (2001). On the dimensionality of organizational justice: A construct validation of a measure. Journal of Applied Psychology, 86(3), 386–400.",
    ],
    related: ["authority", "psychological-safety", "organizational-silence"],
  },
  {
    slug: "attachment",
    name: "Attachment System",
    domain: "Attachment",
    signature:
      "Attachment describes a behavioural system for seeking proximity and security with significant others, especially under threat.",
    mechanism:
      "Attachment theory offers a developmental and relational framework supported by a substantial research tradition. It does not mean that every relationship behaviour is attachment-driven, nor does a brief observation identify a person's attachment pattern.",
    seen: "A child seeking a familiar caregiver under stress, or an adult seeking support and reassurance during uncertainty.",
    counters: [
      "Describe the specific behaviour and relationship context instead of assigning a fixed type",
      "Consider safety, history, culture, and current circumstances",
      "Use attachment theory to generate questions, not to diagnose someone from afar",
    ],
    sources: [
      "Bowlby, J. (1969). Attachment and Loss, Volume 1: Attachment. Basic Books.",
      "Ainsworth, M. D. S., et al. (1978). Patterns of Attachment: A Psychological Study of the Strange Situation. Lawrence Erlbaum Associates.",
    ],
    related: ["attachment-orientations", "demand-withdraw-pattern", "trauma-bonding"],
  },
  {
    slug: "reward-punishment-cycle",
    name: "Reinforcement and Punishment",
    domain: "Emotion & Motivation",
    signature:
      "Consequences can change the future likelihood of behaviour; reinforcement increases behaviour and punishment decreases it.",
    mechanism:
      "In behavioural science, reinforcement and punishment are defined by their effect on future behaviour, not by whether an outcome feels pleasant or harsh. Effects depend on timing, consistency, learning history, and context; the terms should not be used as moral labels.",
    seen: "A response becoming more frequent after it reliably produces an outcome, or less frequent after a consequence that functions as punishment.",
    counters: [
      "Track what behaviour changes over time rather than assuming a consequence has a predictable effect",
      "Distinguish adding a consequence from removing one when identifying reinforcement or punishment",
      "Use humane, proportionate approaches and avoid coercive or harmful behavior-control tactics",
    ],
    sources: [
      "Skinner, B. F. (1953). Science and Human Behavior. Macmillan.",
      "Ferster, C. B., & Skinner, B. F. (1957). Schedules of Reinforcement. Appleton-Century-Crofts.",
    ],
    related: ["classical-conditioning", "intermittent-reinforcement", "learned-helplessness"],
  },
  {
    slug: "responsibility",
    name: "Responsibility Attribution",
    domain: "Ethics & Influence",
    signature:
      "Judgments about who is responsible for an outcome depend on how people interpret agency, knowledge, control, and circumstances.",
    mechanism:
      "Responsibility attribution is shaped by causal beliefs and moral standards. The same outcome can be judged differently depending on what an actor knew, could control, intended, and was constrained by; no single cue settles responsibility.",
    seen: "Evaluating an error by considering the person's role, available information, authority, constraints, and foreseeable consequences rather than outcome alone.",
    counters: [
      "Separate causal contribution, intent, foreseeability, and moral responsibility",
      "Consider what the person knew and what realistic alternatives were available",
      "Apply consistent standards across people and outcomes",
    ],
    sources: [
      "Heider, F. (1958). The Psychology of Interpersonal Relations. Wiley.",
      "Shaver, K. G. (1985). The Attribution of Blame: Causality, Responsibility, and Blameworthiness. Springer-Verlag.",
    ],
    related: ["correspondence-bias", "bystander-effect", "procedural-justice"],
  },
  {
    slug: "lifespan-development",
    name: "Lifespan Development",
    domain: "Human Development",
    signature:
      "Development continues across the lifespan, involving gains, losses, and changing capacities rather than a single universal path.",
    mechanism:
      "Lifespan-developmental research considers biological, psychological, and social change across age and context. Trajectories vary between people and domains, so age alone does not determine an individual's abilities, needs, or likely behaviour.",
    seen: "A person adapting their goals, skills, identity, or relationships across transitions such as entering work, caregiving, retirement, or aging.",
    counters: [
      "Distinguish age-related averages from an individual's history and current context",
      "Consider both continuity and change across multiple life domains",
      "Avoid treating a developmental stage model as a fixed timetable for everyone",
    ],
    sources: [
      "Baltes, P. B. (1987). Theoretical propositions of life-span developmental psychology: On the dynamics between growth and decline. Developmental Psychology, 23(5), 611–626.",
      "Lerner, R. M. (Ed.). (2006). Handbook of Child Psychology, Volume 1: Theoretical Models of Human Development, 6th edition. Wiley.",
    ],
    related: ["social-learning", "attachment", "self-complexity"],
  },
  {
    slug: "developmental-cascade",
    name: "Developmental Cascades",
    domain: "Human Development",
    signature:
      "Changes in one area of development can influence later experiences and outcomes in other areas over time.",
    mechanism:
      "Developmental-cascade models examine how processes across domains and time may reinforce or redirect one another. They are research frameworks, not claims that one early event inevitably determines a person's future.",
    seen: "How early language, peer relationships, school experiences, or emotion regulation can interact with later opportunities and challenges.",
    counters: [
      "Look for multiple influences and feedback loops rather than a single root cause",
      "Treat early experiences as influential but not destiny",
      "Track timing, context, protective factors, and later opportunities for change",
    ],
    sources: [
      "Masten, A. S., & Cicchetti, D. (2010). Developmental cascades. Development and Psychopathology, 22(3), 491–495.",
      "Dodge, K. A., Greenberg, M. T., & Malone, P. S. (2008). Testing an idealized dynamic cascade model of the development of serious violence in adolescence. Child Development, 79(6), 1907–1927.",
    ],
    related: ["lifespan-development", "social-learning", "attachment"],
  },
];

export const getPattern = (slug: string) => PATTERNS.find((p) => p.slug === slug);

export type Tier = {
  n: string;
  title: string;
  question: string;
  lessons: {
    title: string;
    objective: string;
    body: string;
    practice: string;
    checkpoint: string;
    patterns: string[];
    sources: string[];
    webSources?: { label: string; url: string }[];
  }[];
};

export const TIERS: Tier[] = [
  {
    n: "I",
    title: "Self & Individual Mind",
    question: "What is my self-concept, attention, and agency in this moment?",
    lessons: [
      {
        title: "Separate self-story from evidence",
        objective:
          "Notice how identity, memory, and self-protective narratives shape interpretation.",
        body: "Self-knowledge begins by distinguishing what you directly observed from what your mind has already interpreted. Identity is not a static label; it is a pattern of beliefs, values, habits, and goals that shifts under stress, comparison, and social pressure. Keep multiple explanations open until the evidence fits the story.",
        practice:
          "Write down one recent event in three columns: observed facts, your interpretation, and the alternative explanation you did not choose. Then identify which part of the story feels most self-protective.",
        checkpoint: "What evidence would cause you to revise your current self-story?",
        patterns: ["projection", "self-serving-bias", "social-comparison", "self-complexity"],
        sources: [
          "[Research review] Wilson & Dunn (2004), “Self-knowledge: Its limits, value, and potential for improvement,” Annual Review of Psychology.",
          "[Academic book] Dunning (2005), “Self-Insight: Roadblocks and Detours on the Path to Knowing Thyself.”",
        ],
      },
      {
        title: "Attention, habits, and agency",
        objective: "See how repeated patterns and attention traps shape your choices.",
        body: "Attention is not neutral. Where your focus goes, your salience system follows. Habits, routines, and intentional default settings become the architecture of agency. A person can feel 'driven' by reaction while being only partially aware of the loop that produced it.",
        practice:
          "Pick one recurring behavioural pattern—checking, reacting, avoiding, overexplaining—and map the cue, the trigger, the feeling, and the action that usually follows.",
        checkpoint:
          "Which small change in your environment or routine would give you more deliberate control?",
        patterns: ["classical-conditioning", "self-serving-bias"],
        sources: [
          "[Primary research] Lally et al. (2010), “How are habits formed: Modelling habit formation in the real world,” European Journal of Social Psychology.",
          "[Research review] Gollwitzer (1999), “Implementation intentions: Strong effects of simple plans,” American Psychologist.",
        ],
      },
    ],
  },
  {
    n: "II",
    title: "Cognition & Reasoning",
    question: "How do memory, bias, and logic interact when I decide?",
    lessons: [
      {
        title: "Fast thinking, slow thinking, and uncertainty",
        objective: "Use intuition wisely without mistaking speed for truth.",
        body: "Human reasoning is shaped by fast and slow systems, each with trade-offs. Fast thinking is efficient but vulnerable to cues, assumptions, and emotion. Slow thinking helps, but it is still constrained by incomplete information, existing models, and ego-protective narratives. The key is not to ban intuition, but to add a verification step when stakes rise.",
        practice:
          "Choose a current decision and write down your first instinct, your best evidence, one alternative, and the fact you most need to verify before acting.",
        checkpoint: "What makes this decision uncertain enough to justify a pause?",
        patterns: [
          "loss-aversion",
          "scarcity",
          "sunk-cost",
          "availability-heuristic",
          "planning-fallacy",
          "anchoring-effect",
          "hindsight-bias",
          "overconfidence-effect",
        ],
        sources: [
          "[Research review] Evans & Stanovich (2013), “Dual-process theories of higher cognition: Advancing the debate,” Perspectives on Psychological Science.",
          "[Academic book] Gigerenzer (2008), “Rationality for Mortals: How People Cope with Uncertainty.”",
          "[Popular science—interpretive synthesis; read alongside replication-aware research] Ariely (2008), “Predictably Irrational.”",
        ],
      },
      {
        title: "Reason under pressure and motivated belief",
        objective: "Recognize when desire, fear, or identity is steering reasoning.",
        body: "Motivated reasoning occurs when the mind works harder to defend a conclusion than to test it. This may take the form of selective attention, narrative completion, or byzantine explanations for why someone must be wrong. A good decision process separates the evidence from the emotional stake attached to it.",
        practice:
          "Review a recent disagreement and list the strongest evidence for your current view, the strongest evidence against it, and what you are protecting by holding this conclusion.",
        checkpoint:
          "Which part of your reasoning would still survive if you cared less about being right?",
        patterns: [
          "sunk-cost",
          "confirmation-bias",
          "self-serving-bias",
          "cognitive-dissonance",
          "correspondence-bias",
        ],
        sources: [
          "[Research review] Kunda (1990), “The case for motivated reasoning,” Psychological Bulletin.",
          "[Research review] Nickerson (1998), “Confirmation bias: A ubiquitous phenomenon in many guises,” Review of General Psychology.",
        ],
      },
    ],
  },
  {
    n: "III",
    title: "Emotion & Motivation",
    question: "What am I feeling, what is it driving, and what is it not proving?",
    lessons: [
      {
        title: "Emotion as signal, not verdict",
        objective: "Understand how affect shapes salience, meaning, and action.",
        body: "Emotions are not irrational noise; they are attention systems that orient the body toward threat, reward, belonging, danger, or status. They can be informative, but without context they are not proof of the facts. A strong emotional reaction is a cue to investigate the situation rather than a direct reading of the hidden motives of others.",
        practice:
          "Record one emotionally hot interaction. What was the immediate emotion, what triggered it, what action followed, and what information might calm or clarify the situation?",
        checkpoint: "What would make you less likely to act from emotion alone?",
        patterns: [
          "emotional-flooding",
          "cognitive-sensory-overload",
          "placebo-effect",
          "cognitive-reappraisal",
          "affect-heuristic",
          "emotional-contagion",
          "expressive-suppression",
        ],
        sources: [
          "[Research review] Gross (1998), “The emerging field of emotion regulation: An integrative review,” Review of General Psychology.",
          "[Academic book] Gross (Ed.) (2014), “Handbook of Emotion Regulation,” 2nd edition.",
        ],
      },
      {
        title: "Approach, avoidance, reward, and regulation",
        objective: "Link motivation to behaviour and self-regulation.",
        body: "Humans often move toward rewards, relief, belonging, novelty, appreciation, and control, and away from threat, humiliation, uncertainty, and low status. Motivation is therefore shaped by both internal needs and the environment. Regulation means noticing the trade-off rather than treating a craving or urge as the final authority.",
        practice:
          "Map a decision into three layers: the reward you want, the threat you are avoiding, and the regulator you would need to make a better choice.",
        checkpoint: "What are you chasing, and what are you trying not to feel?",
        patterns: ["intermittent-reinforcement", "attention-looming", "reward-punishment-cycle"],
        sources: [
          "[Research review] Ryan & Deci (2000), “Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being,” American Psychologist.",
          "[Academic book] Carver & Scheier (1998), “On the Self-Regulation of Behavior.”",
        ],
      },
    ],
  },
  {
    n: "IV",
    title: "Personality & Individual Differences",
    question: "What is trait evidence, and what is just a label?",
    lessons: [
      {
        title: "Traits, temperament, and the limits of measurement",
        objective:
          "Build a more evidence-aware view of personality without turning labels into certainty.",
        body: "Personality research examines stable patterns in thought, emotion, behaviour, and social style. These patterns are real, but they are probabilistic and context-sensitive rather than fixed destiny. Temperament and trait models can help explain patterns of response, but they are not precise diagnoses of motive or character.",
        practice:
          "Choose a trait domain such as conscientiousness, sociability, reactivity, or self-control. Reflect on where it shows up in your life and where context changes the pattern.",
        checkpoint:
          "What in your behaviour is stable, and what depends on stress, safety, or relationship context?",
        patterns: ["self-serving-bias", "classical-conditioning", "person-situation-interaction"],
        sources: [
          "[Research review] Roberts, Walton, & Viechtbauer (2006), “Patterns of mean-level change in personality traits across the life course,” Psychological Bulletin.",
          "[Academic chapter] John, Naumann, & Soto (2008), “Paradigm shift to the integrative Big Five trait taxonomy,” Handbook of Personality.",
        ],
      },
      {
        title: "Interpersonal styles without pseudo-science",
        objective: "Distinguish verified constructs from popular personality branding.",
        body: "Many people use informal labels such as 'toxic', 'narcissistic', or 'high-functioning' as shorthand for patterns they find difficult. Those labels can be useful in ordinary conversation, but they are not equivalent to validated trait models or clinical diagnoses. A careful approach treats behavioural patterns as evidence to be assessed, not a hidden essence that explains everything.",
        practice:
          "Take one interpersonal pattern you dislike in another person and rewrite it as specific, observable behaviour, context, and evidence rather than as a character verdict.",
        checkpoint: "Are you describing a pattern or inferring a private identity?",
        patterns: ["projection", "love-bombing"],
        sources: [
          "[Research review] Soto (2019), “How replicable are links between personality traits and consequential life outcomes? The life outcomes of personality replication project,” Psychological Science.",
          "[Professional standards] American Psychological Association, “Ethical Principles of Psychologists and Code of Conduct” (for limits on assessment and claims).",
        ],
      },
    ],
  },
  {
    n: "V",
    title: "Human Development",
    question: "How do age, relationships, and context shape development?",
    lessons: [
      {
        title: "Development across life stages",
        objective: "Understand why developmental findings are stage-specific and context-bound.",
        body: "Human beings develop across infancy, childhood, adolescence, adulthood, and aging, with each period shaping cognition, attachment, identity, and social functioning differently. A finding from one age range cannot be assumed to apply to another without qualification. Development is shaped by friendships, family, institutions, trauma exposure, and cultural expectations.",
        practice:
          "Pick one developmental transition—puberty, school entry, entering work, becoming a caregiver, late adulthood—and describe what changes in identity, belonging, or responsibility.",
        checkpoint:
          "What age-appropriate evidence would you need before applying a developmental claim beyond its original context?",
        patterns: [
          "attachment",
          "trauma-bonding",
          "social-learning",
          "lifespan-development",
          "developmental-cascade",
        ],
        sources: [
          "[Research article] Baltes (1987), “Theoretical propositions of life-span developmental psychology: On the dynamics between growth and decline,” Developmental Psychology, 23(5), 611–626.",
          "[Academic book] Bowlby (1969), “Attachment and Loss, Volume 1: Attachment.”",
          "[Clinical synthesis] van der Kolk (2014), “The Body Keeps the Score” (influential clinical perspective; individual claims should be checked against current reviews).",
        ],
        webSources: [
          {
            label: "CDC — Developmental Milestones",
            url: "https://www.cdc.gov/act-early/milestones/index.html",
          },
        ],
      },
      {
        title: "Attachment, socialization, and identity",
        objective: "Link attachment patterns to family, peers, and social learning.",
        body: "Children and adolescents do not only learn information; they learn what counts as safe, important, or possible. Attachment, socialization, and peer systems shape trust, self-worth, regulation, and social expectations. Developmental findings must be interpreted alongside history, culture, and the specific relationship system in which they emerged.",
        practice:
          "Map one core belief you hold about love, respect, or safety to the relationship context where it likely formed, and identify what would change your understanding today.",
        checkpoint:
          "Which part of this belief is evidence-based, and which part is a learned pattern?",
        patterns: ["trauma-bonding", "learned-helplessness", "love-bombing", "social-learning"],
        sources: [
          "[Primary research] Ainsworth et al. (1978), “Patterns of Attachment: A Psychological Study of the Strange Situation.”",
          "[Academic handbook] Grusec & Hastings (Eds.) (2007), “Handbook of Socialization: Theory and Research.”",
        ],
        webSources: [
          {
            label: "Harvard Center on the Developing Child",
            url: "https://developingchild.harvard.edu/",
          },
        ],
      },
    ],
  },
  {
    n: "VI",
    title: "Social Psychology & Groups",
    question: "How do identity, groups, and social pressure shape behaviour?",
    lessons: [
      {
        title: "Attribution, conformity, and group identity",
        objective: "Understand how people interpret others and align with groups.",
        body: "People often explain behaviour through dispositional stories even when situations are driving it. Conformity, status, and social identity influence how we decide what is normal, desirable, or safe. Group membership can increase belonging but also reduce independent judgment when the cost of dissent feels high.",
        practice:
          "Identify a group setting where you felt pressure. List what you observed, the social norm you inferred, and the reason you may have discounted your own doubts.",
        checkpoint: "When does social belonging become a substitute for evidence?",
        patterns: [
          "social-proof",
          "authority",
          "commitment-consistency",
          "correspondence-bias",
          "ingroup-favoritism",
          "normative-and-informational-influence",
          "group-polarization",
        ],
        sources: [
          "[Primary research] Asch (1955), “Opinions and social pressure,” Scientific American.",
          "[Research review] Cialdini & Goldstein (2004), “Social influence: Compliance and conformity,” Annual Review of Psychology.",
        ],
      },
      {
        title: "Norms, cooperation, and collective action",
        objective: "See how crowds, norms, and coordination alter individual choice.",
        body: "Group dynamics are not simply the sum of independent minds. Norms, expectations, imitation, and incentives shape who speaks, who stays silent, and how decisions are made under collective pressure. Cooperation and competition can both raise performance, but they can also intensify exclusion, conformity, or polarization when trust is weak.",
        practice:
          "Describe a team or social setting where the norm was stronger than the evidence. What was being rewarded, and what was being punished?",
        checkpoint: "What would a dissenting voice need in order to speak safely?",
        patterns: [
          "social-proof",
          "ostracism-silent-treatment",
          "double-bind",
          "pluralistic-ignorance",
          "bystander-effect",
          "psychological-safety",
          "organizational-silence",
        ],
        sources: [
          "[Academic chapter] Tajfel & Turner (1979), “An integrative theory of intergroup conflict,” The Social Psychology of Intergroup Relations.",
          "[Research review] Cialdini & Goldstein (2004), “Social influence: Compliance and conformity,” Annual Review of Psychology.",
        ],
      },
    ],
  },
  {
    n: "VII",
    title: "Relationships & Attachment",
    question: "What creates trust, safety, conflict, and repair in human bonds?",
    lessons: [
      {
        title: "Trust, attachment, and boundaries",
        objective:
          "Distinguish secure connection from dependency, control, and chronic uncertainty.",
        body: "Relationships are built on trust, responsiveness, and mutual recognition, but they can also become tangled with dependence, fear, guilt, and inconsistent reward. Attachment theory helps explain why some people crave reassurance, avoid conflict, or become hypervigilant, but it does not reduce every relationship to a script.",
        practice:
          "Write down one relationship where you feel a lot of emotional pull. Then map the patterns of reassurance, conflict, and safety that make you feel tied to it.",
        checkpoint:
          "What makes the relationship more secure, and what makes it more destabilizing?",
        patterns: [
          "trauma-bonding",
          "intermittent-reinforcement",
          "love-bombing",
          "demand-withdraw-pattern",
          "attachment-orientations",
        ],
        sources: [
          "[Academic book] Mikulincer & Shaver (2016), “Attachment in Adulthood: Structure, Dynamics, and Change,” 2nd edition.",
          "[Primary research] Collins & Feeney (2000), “A safe haven: An attachment theory perspective on support seeking and caregiving in intimate relationships,” Journal of Personality and Social Psychology.",
          "[Popular clinical framework—evidence base is debated] Levine (1997), “Waking the Tiger: Healing Trauma.”",
        ],
      },
      {
        title: "Repair, betrayal, and relationship maintenance",
        objective: "Build a practical framework for conflict and reconciliation.",
        body: "Healthy relationships require repair, not just chemistry or intensity. Conflict can be productive when the parties are honest, specific, and accountable. Betrayal, dependence, and coercive control are different from ordinary friction; they usually require clear boundaries, outside support, and sometimes disengagement.",
        practice:
          "Take a disagreement you had recently and identify what was communicated clearly, what was left implicit, what was avoided, and what would need to be said to repair trust.",
        checkpoint:
          "Are you trying to resolve a misunderstanding, repair a rupture, or leave a pattern that is no longer safe?",
        patterns: [
          "gaslighting",
          "double-bind",
          "isolation",
          "demand-withdraw-pattern",
          "self-disclosure-reciprocity",
        ],
        sources: [
          "[Academic book] Gottman & Silver (1999), “The Seven Principles for Making Marriage Work” (practical synthesis; not a substitute for safety assessment).",
          "[Professional guidance] World Health Organization (2013), “Responding to Intimate Partner Violence and Sexual Violence Against Women: WHO Clinical and Policy Guidelines.”",
        ],
      },
    ],
  },
  {
    n: "VIII",
    title: "Communication, Framing & Conflict",
    question: "How do words, silence, and framing shape what people hear and believe?",
    lessons: [
      {
        title: "Listening, questioning, and honest clarification",
        objective: "Use communication to understand, not to pressure.",
        body: "Communication is not just information transfer; it is a social activity shaped by tone, timing, silence, ambiguity, and power. Listening well means checking understanding before deciding that you have the meaning. A good question does not force a confession; it preserves clarity and choice.",
        practice:
          "In a low-stakes conversation, paraphrase what you heard, ask for correction, and then accept that correction without turning it into a debate about your interpretation.",
        checkpoint: "Did your question leave room for disagreement without punishment?",
        patterns: [
          "mirroring",
          "strategic-pauses-and-silence",
          "linguistic-microtechniques",
          "self-disclosure-reciprocity",
          "active-listening",
          "strategic-ambiguity",
          "presupposition",
          "rhetorical-questions",
          "implication-and-insinuation",
          "equivocation",
          "omission-and-selective-disclosure",
        ],
        sources: [
          "[Academic chapter] Clark & Brennan (1991), “Grounding in communication,” Perspectives on Socially Shared Cognition.",
          "[Academic book] Grice (1989), “Studies in the Way of Words.”",
        ],
      },
      {
        title: "Rhetoric, disagreement, and repair",
        objective: "Recognize how framing and loaded language affect agreement and conflict.",
        body: "Framing shapes the story before the facts are fully examined. Argument is not just about being right; it is about the standards, definitions, and stakes used to judge the issue. Disagreement can become productive when people separate claims from motives, ask clarifying questions, and repair harm without turning every tension into a verdict.",
        practice:
          "Choose a recent disagreement and rewrite it in neutral terms: claim, evidence, uncertainty, desired outcome, and repair needed. Compare the neutral version with your original narrative.",
        checkpoint: "What did the framing add to the conflict, and what did it hide?",
        patterns: [
          "double-bind",
          "linguistic-microtechniques",
          "reciprocity",
          "false-binary-disruption",
          "antithesis",
          "paradox",
          "euphemism-and-dysphemism",
          "poison-metaphor",
          "inoculation",
          "narrative-persuasion",
          "steel-manning-and-straw-manning",
        ],
        sources: [
          "[Academic book] Walton & Krabbe (1995), “Commitment in Dialogue: Basic Concepts of Interpersonal Reasoning.”",
          "[Academic book] Fisher, Ury, & Patton (2011), “Getting to Yes: Negotiating Agreement Without Giving In,” 3rd edition.",
        ],
      },
    ],
  },
  {
    n: "IX",
    title: "Power, Hierarchy & Institutions",
    question: "Who can make decisions, who depends on whom, and how is legitimacy built?",
    lessons: [
      {
        title: "Authority, status, and dependency",
        objective: "Map how power operates beyond overt force.",
        body: "Power is not one thing. It can come from roles, expertise, resources, access, social capital, reputation, or the ability to impose costs. Status and hierarchy matter because they shape who gets heard, who is believed, and how much risk a person bears when they dissent. Dependency can be financial, emotional, informational, or social.",
        practice:
          "Map a power relationship in your life: what each person can do, what each person depends on, and what constraints are invisible until you look carefully.",
        checkpoint:
          "Which form of dependency most limits your choices, and what realistic option would reduce it?",
        patterns: [
          "authority",
          "batna",
          "institutional-legal-economic-levers",
          "status-quo-bias",
          "power-dependence",
          "psychological-safety",
          "organizational-silence",
          "procedural-justice",
          "intellectual-signaling",
          "counter-signaling",
          "name-dropping",
          "prestige-signaling",
          "appeal-to-neutrality",
        ],
        sources: [
          "[Foundational research] French & Raven (1959), “The bases of social power,” Studies in Social Power.",
          "[Research review] Magee & Galinsky (2008), “Social hierarchy: The self-reinforcing nature of power and status,” Academy of Management Annals.",
          "[Historical primary work] Machiavelli (1532), “The Prince.”",
          "[Practical literature—not empirical research] Greene (1998), “The 48 Laws of Power.”",
        ],
      },
      {
        title: "Institutional power and social capital",
        objective: "See how institutions shape behaviour and compliance.",
        body: "Institutions do not merely execute rules; they create scripts of legitimacy, risk, and acceptable behaviour. People can be socially pressured, economically tethered, or morally burdened without overt coercion. Institutions magnify the effects of authority, expertise, reputation, and scarcity when they are not scrutinized.",
        practice:
          "Review a school, workplace, or service relationship and list the hidden levers: access, money, paperwork, procedure, legitimacy, and informal norms.",
        checkpoint: "Which of these levers is real power rather than simple procedure?",
        patterns: ["authority", "social-proof", "institutional-legal-economic-levers"],
        sources: [
          "[Academic book] Weber (1978), “Economy and Society: An Outline of Interpretive Sociology.”",
          "[Academic chapter] Bourdieu (1986), “The forms of capital,” Handbook of Theory and Research for the Sociology of Education.",
        ],
      },
    ],
  },
  {
    n: "X",
    title: "Influence, Persuasion & Manipulation",
    question: "How do persuasion, pressure, and coercion differ?",
    lessons: [
      {
        title: "Persuasion, compliance, and informed choice",
        objective:
          "Differentiate influence that respects autonomy from pressure that overwhelms it.",
        body: "Persuasion can be ethical when it is transparent, proportionate, and allows a real choice. Compliance cues such as reciprocity, commitment, social proof, scarcity, or authority are not inherently unethical, but their presence raises the need for scrutiny. A person should be able to refuse without penalty, intimidation, or a hidden cost.",
        practice:
          "Take a request or sales pitch and identify the mechanisms used, the actual information being offered, and the cost of saying no.",
        checkpoint: "Would this request still be reasonable if the pressure cue were removed?",
        patterns: [
          "reciprocity",
          "commitment-consistency",
          "social-proof",
          "scarcity",
          "psychological-reactance",
          "reverse-psychology",
          "illusion-of-choice",
          "foot-in-the-door-technique",
          "door-in-the-face-technique",
          "low-ball-technique",
          "mere-exposure-effect",
          "narrative-persuasion",
          "inoculation",
        ],
        sources: [
          "[Research review] Cialdini & Goldstein (2004), “Social influence: Compliance and conformity,” Annual Review of Psychology.",
          "[Academic book] Cialdini (2021), “Influence: The Psychology of Persuasion,” new and expanded edition (practical synthesis informed by research).",
          "[Academic textbook] Aronson & Aronson (2023), “The Social Animal,” 12th edition.",
        ],
      },
      {
        title: "Manipulation, coercion, and protective responses",
        objective:
          "Recognize repeated patterns of control before they harden into a self-reinforcing system.",
        body: "Manipulation and coercion often build gradually through isolation, denial, unpredictability, guilt, pressure, and surveillance. They become more dangerous when the target starts to doubt their own memory and judgment. Safety planning is not paranoia; it is rational risk management within a pattern of control.",
        practice:
          "Write a timeline of the most important incidents, what they did, what emotional state they produced, and what support or exit option existed at each point.",
        checkpoint:
          "What specific behaviour would you need to see to treat the pattern as a clear threat rather than a misunderstanding?",
        patterns: [
          "gaslighting",
          "isolation",
          "intermittent-reinforcement",
          "trauma-bonding",
          "reverse-psychology",
          "illusion-of-choice",
          "false-binary-disruption",
          "strategic-ambiguity",
          "poison-metaphor",
          "minimization",
          "horn-effect",
          "baiting",
          "emotional-blackmail",
          "triangulation",
          "scapegoating",
          "darvo",
          "stonewalling",
          "out-group-derogation",
          "appeal-to-neutrality",
        ],
        sources: [
          "[Academic book] Stark (2007), “Coercive Control: How Men Entrap Women in Personal Life.”",
          "[Clinical book] Herman (1992), “Trauma and Recovery: The Aftermath of Violence—from Domestic Abuse to Political Terror.”",
          "[Historical and case-based scholarship] Lifton (1961), “Thought Reform and the Psychology of Totalism.”",
          "[Forensic and clinical literature—not a diagnostic guide] Hare (1999), “Without Conscience: The Disturbing World of the Psychopaths Among Us.”",
          "[Forensic and organizational literature—not a diagnostic guide] Babiak & Hare (2006), “Snakes in Suits: When Psychopaths Go to Work.”",
          "[Practical literature—not a validated assessment] Simon (1996), “In Sheep’s Clothing: Understanding and Dealing with Manipulative People.”",
        ],
        webSources: [
          {
            label:
              "WHO — Clinical and policy guidelines on responding to intimate partner and sexual violence",
            url: "https://www.who.int/publications/i/item/9789241548595",
          },
          {
            label: "CDC — About intimate partner violence",
            url: "https://www.cdc.gov/intimate-partner-violence/about/index.html",
          },
          {
            label: "National Institute of Mental Health — Post-traumatic stress disorder",
            url: "https://www.nimh.nih.gov/health/topics/post-traumatic-stress-disorder-ptsd",
          },
        ],
      },
    ],
  },
  {
    n: "XI",
    title: "Negotiation, Conflict & Resolution",
    question: "How do interests, leverage, and repair shape outcomes?",
    lessons: [
      {
        title: "Interests, BATNA, and fair bargaining",
        objective: "Turn conflict into a structured negotiation rather than a test of dominance.",
        body: "Negotiation becomes more effective when it focuses on interests, constraints, and options rather than fixed positions. A useful alternative and a clear minimum matter because they reduce desperation and keep a person from accepting bad terms. Fair bargaining is not about dominating; it is about making the trade-offs clear and honest.",
        practice:
          "Prepare for a real or hypothetical negotiation by listing your preferred outcome, your minimum acceptable result, your best alternative, and the information you still need.",
        checkpoint: "What would make you say yes, and what would make you say no?",
        patterns: ["batna", "authority", "scarcity", "anchoring-effect", "reactive-devaluation"],
        sources: [
          "[Academic book] Fisher, Ury, & Patton (2011), “Getting to Yes: Negotiating Agreement Without Giving In,” 3rd edition.",
          "[Academic book] Raiffa (1982), “The Art and Science of Negotiation.”",
          "[Practical literature] Voss & Raz (2016), “Never Split the Difference: Negotiating As If Your Life Depended On It.”",
        ],
      },
      {
        title: "De-escalation, repair, and reconciliation",
        objective: "Return conflict to clarity, accountability, and humane decision-making.",
        body: "De-escalation is not surrender. It is a process of reducing emotional temperature, clarifying core issues, and creating a path that preserves dignity and safety. Repair may involve apologies, changed behaviour, documentation, boundaries, or disengagement. It is not the same as staying in a pattern of harm.",
        practice:
          "Draft a short, calm message that names the issue, states what you need to understand, and identifies one concrete action or boundary that could improve the situation.",
        checkpoint:
          "What part of the message protects your clarity without escalating the conflict?",
        patterns: ["mirroring", "double-bind", "moving-goalposts", "fixed-pie-bias"],
        sources: [
          "[Academic book] Fisher, Ury, & Patton (2011), “Getting to Yes: Negotiating Agreement Without Giving In,” 3rd edition.",
          "[Professional guidance] World Health Organization (2013), “Responding to Intimate Partner Violence and Sexual Violence Against Women: WHO Clinical and Policy Guidelines.”",
        ],
      },
    ],
  },
  {
    n: "XII",
    title: "Culture, Ethics & Philosophy of Human Nature",
    question: "What do we owe each other, and how do ideas about human nature guide action?",
    lessons: [
      {
        title: "Culture, values, and social meaning",
        objective:
          "Recognize that ethical norms and acceptable behaviour are shaped by culture and institutions.",
        body: "People are not shaped only by personal psychology. Culture, religion, law, education, class, and institutions all define what counts as normal, moral, or respectable. The same behaviour can be treated as healthy in one context and destructive in another, which is why careful interpretation requires culture and context rather than universal labels.",
        practice:
          "Compare one behaviour you view as 'normal' with a different culture or setting where the same behaviour would be treated very differently. What social meaning changed?",
        checkpoint:
          "What assumptions in your own culture are easiest to mistake for universal truth?",
        patterns: [
          "social-proof",
          "authority",
          "commitment-consistency",
          "cultural-tightness-looseness",
        ],
        sources: [
          "[Research review] Markus & Kitayama (1991), “Culture and the self: Implications for cognition, emotion, and motivation,” Psychological Review.",
          "[Academic book] Henrich (2020), “The WEIRDest People in the World: How the West Became Psychologically Peculiar and Particularly Prosperous.”",
          "[Historical primary work in depth psychology—not contemporary empirical evidence] Jung (1951), “Aion: Researches into the Phenomenology of the Self.”",
        ],
      },
      {
        title: "Ethics, responsibility, and flourishing",
        objective: "Distinguish moral reasoning from mere instinct, strategy, or social status.",
        body: "Ethical reasoning asks questions about autonomy, consent, harm, fairness, responsibility, and dignity. It is not simply a matter of pleasing the group or asserting power. A mature approach to human nature balances empirical findings with philosophical questions about agency, meaning, and the conditions under which people can flourish.",
        practice:
          "Reflect on one real decision that involved power or conflict. Ask: who had agency, what harm or benefit was at stake, what was consent-like, and what would be fair not just effective?",
        checkpoint:
          "What would a fair, humane answer look like if you removed status and tactical advantage from the equation?",
        patterns: ["authority", "responsibility", "batna", "moral-licensing"],
        sources: [
          "[Philosophical primary work] Rawls (1971), “A Theory of Justice.”",
          "[Philosophical primary work] Aristotle, “Nicomachean Ethics.”",
          "[Academic book] Nussbaum (2011), “Creating Capabilities: The Human Development Approach.”",
          "[Existential and clinical literature] Frankl (1946), “Man’s Search for Meaning.”",
          "[Cultural and psychoanalytic theory—not a settled empirical account] Becker (1973), “The Denial of Death.”",
        ],
        webSources: [
          {
            label:
              "American Psychological Association — Ethical Principles of Psychologists and Code of Conduct",
            url: "https://www.apa.org/ethics/code",
          },
        ],
      },
    ],
  },
  {
    n: "XIII",
    title: "Personality & Individual Differences",
    question: "Which tendencies are stable, which are situational, and how do we know?",
    lessons: [
      {
        title: "Traits, temperament, and the person–situation relation",
        objective:
          "Use trait frameworks to describe probabilistic tendencies without treating them as fixed scripts.",
        body: "Personality research studies patterns that show some stability while also varying across situations and time. Trait models summarize individual differences; they do not explain every action, reveal hidden motives, or determine a person's future. Temperament, learning history, current goals, role demands, culture, and material conditions can all matter. A useful interpretation asks how a tendency changes across settings rather than treating one event as a complete personality profile.",
        practice:
          "Choose one behaviour observed repeatedly. Record at least three contexts in which it occurs or does not occur, the person's role and incentives in each, and what additional observation would distinguish a trait explanation from a situational one.",
        checkpoint:
          "What repeated evidence would justify describing a tendency, and what would still remain unknown?",
        patterns: ["person-situation-interaction", "thin-slice-judgments"],
        sources: [
          "[Research review] Funder (2001), Personality.",
          "[Primary research] Fleeson (2001), “Toward a structure- and process-integrated view of personality: Traits as density distributions of states,” Journal of Personality and Social Psychology.",
          "[Research review] Roberts, Walton, & Viechtbauer (2006), “Patterns of mean-level change in personality traits across the life course,” Psychological Bulletin.",
        ],
      },
      {
        title: "Personality measurement and responsible interpretation",
        objective:
          "Understand what a personality measure can and cannot support, including limits of informal labels.",
        body: "A measure is useful only for a defined purpose and population, with evidence about reliability, validity, and interpretation. Self-report can be affected by wording, context, self-knowledge, and incentives; observer ratings have their own blind spots. Popular typologies and clinical labels are not interchangeable with dimensional research models. Do not diagnose or assign a stable identity to someone from anecdotes, a quiz, or a single conflict.",
        practice:
          "Evaluate a personality quiz or claim: identify its construct, intended population, evidence for reliability and validity, and the conclusions it explicitly cannot support.",
        checkpoint:
          "What evidence would be required before using this result to make a consequential decision?",
        patterns: ["person-situation-interaction", "self-complexity"],
        sources: [
          "[Research review] John, Naumann, & Soto (2008), “Paradigm shift to the integrative Big Five trait taxonomy,” Handbook of Personality: Theory and Research.",
          "[Academic handbook] Boyle, Matthews, & Saklofske (Eds.) (2008), The SAGE Handbook of Personality Theory and Assessment.",
        ],
      },
    ],
  },
  {
    n: "XIV",
    title: "Human Development Across the Lifespan",
    question: "How do biology, relationships, opportunity, and time shape development?",
    lessons: [
      {
        title: "Developmental pathways, transitions, and plasticity",
        objective:
          "Explain development as change across time without treating age stages as universal destinies.",
        body: "Development unfolds through interacting biological, psychological, relational, cultural, and structural processes. Age-linked trends can be useful, but timing and pathways vary, and development can include continuity, change, recovery, and new difficulty. Early experience matters without fixing an inevitable outcome. Interpret claims about infancy, childhood, adolescence, adulthood, and aging in light of the population studied and the evidence design.",
        practice:
          "Map a hypothetical developmental pathway with at least three influences, one protective factor, a later opportunity for change, and two points where the pathway could plausibly differ.",
        checkpoint:
          "Which parts of your explanation are supported by longitudinal evidence, and which are only plausible hypotheses?",
        patterns: ["social-learning", "attachment-orientations"],
        sources: [
          "[Academic handbook] Lerner (Ed.) (2006), Handbook of Child Psychology: Theoretical Models of Human Development.",
          "[Research review] Masten & Cicchetti (2010), “Developmental cascades,” Development and Psychopathology.",
          "[Professional research resource] National Academies (2019), The Promise of Adolescence: Realizing Opportunity for All Youth.",
        ],
        webSources: [
          {
            label: "Harvard Center on the Developing Child",
            url: "https://developingchild.harvard.edu/",
          },
          {
            label: "National Academies — The Promise of Adolescence",
            url: "https://nap.nationalacademies.org/catalog/25388/the-promise-of-adolescence-realizing-opportunity-for-all-youth",
          },
        ],
      },
      {
        title: "Attachment, socialization, and developmental context",
        objective:
          "Distinguish developmental theories from deterministic claims about family, peers, and later relationships.",
        body: "Caregiving, peers, schools, communities, and material conditions can shape development through many pathways. Attachment research offers concepts for studying proximity, security, and caregiving; it does not provide a simple label that predicts an adult's character or relationship outcome. A child's behaviour is not a diagnosis of parenting, and a later difficulty cannot be attributed to one early event without careful evidence. Attend to protective relationships and wider context as well as risk.",
        practice:
          "For a hypothetical developmental concern, list the child's age and setting, possible influences at home and outside it, strengths and protective factors, and what would require assessment by a qualified professional.",
        checkpoint:
          "How would you avoid turning an association between an early experience and a later outcome into a claim of certainty or blame?",
        patterns: ["attachment-orientations", "social-learning"],
        sources: [
          "[Academic handbook] Grusec & Hastings (Eds.) (2015), Handbook of Socialization: Theory and Research, 2nd edition.",
          "[Research review] Sroufe (2005), “Attachment and development: A prospective, longitudinal study from birth to adulthood,” Attachment & Human Development.",
          "[Professional guidance] World Health Organization (2018), Nurturing Care for Early Childhood Development.",
        ],
        webSources: [
          {
            label: "WHO — Nurturing Care for Early Childhood Development",
            url: "https://www.who.int/publications/i/item/9789241514064",
          },
        ],
      },
    ],
  },
  {
    n: "XV",
    title: "Groups, Networks & Collective Behaviour",
    question: "How do norms, networks, leadership, and coordination shape group outcomes?",
    lessons: [
      {
        title: "Group identity, norms, and polarization",
        objective:
          "Analyze how group membership and discussion can shape judgment without assuming uniform group effects.",
        body: "Groups can provide belonging, coordination, and shared knowledge while also creating pressures around conformity and dissent. Norms may be descriptive (what members do) or injunctive (what members approve). Group discussion can shift views under some conditions, but polarization is not an automatic result of every conversation. Consider who is present, whose voices are missing, how disagreement is handled, and whether participants share information or compete for status.",
        practice:
          "Analyze a group decision by separating the stated goal, descriptive and injunctive norms, who had influence, who disagreed, and what evidence was unavailable to the group.",
        checkpoint:
          "What observation would distinguish genuine consensus from silence, coordination failure, or fear of exclusion?",
        patterns: ["group-polarization", "pluralistic-ignorance", "ingroup-favoritism"],
        sources: [
          "[Research review] Turner (1991), Social Influence.",
          "[Research review] Isenberg (1986), “Group polarization: A critical review and meta-analysis,” Journal of Personality and Social Psychology.",
          "[Research review] Cialdini, Reno, & Kallgren (1990), “A focus theory of normative conduct,” Journal of Personality and Social Psychology.",
        ],
      },
      {
        title: "Networks, leadership, coordination, and collective action",
        objective:
          "Map how network positions, shared resources, and coordination problems affect collective outcomes.",
        body: "A group's outcome depends not only on individual attitudes but on ties, information flow, incentives, leadership, and the ability to coordinate. Network centrality can create access or brokerage, but it does not by itself establish actual influence or intent. Collective-action problems arise when individuals can benefit from a shared good without contributing; institutions, trust, communication, and credible arrangements can change those incentives. Crowd behaviour should be studied in context, not reduced to an assumption of irrationality.",
        practice:
          "Draw a small network for a team or community: mark who exchanges information, who connects otherwise separate groups, what resource is shared, and where coordination could fail.",
        checkpoint:
          "Which part of the outcome is better explained by network structure or incentives than by individual personality?",
        patterns: ["psychological-safety", "organizational-silence", "social-proof"],
        sources: [
          "[Academic book] Ostrom (1990), Governing the Commons: The Evolution of Institutions for Collective Action.",
          "[Academic book] Burt (1992), Structural Holes: The Social Structure of Competition.",
          "[Research review] van Knippenberg & Hogg (2003), “A social identity model of leadership effectiveness in organizations,” Research in Organizational Behavior.",
        ],
      },
    ],
  },
  {
    n: "XVI",
    title: "Organizations, Institutions & Power",
    question: "How do formal rules, incentives, information, and dependence shape behaviour?",
    lessons: [
      {
        title: "Organizations, bureaucracy, and institutional incentives",
        objective:
          "Explain organizational behaviour through rules, roles, incentives, and coordination as well as individual choices.",
        body: "Organizations distribute authority, responsibilities, information, and resources through formal rules and informal practices. Rules can support fairness and coordination, but can also create rigidity, goal displacement, or gaps between official policy and everyday behaviour. Incentives may produce unintended effects when measures become targets or when workers bear costs they cannot control. Avoid explaining an institutional outcome solely through the character of one person.",
        practice:
          "Choose a hypothetical service failure and map the stated goal, relevant rules, incentives, decision rights, information bottlenecks, and possible unintended consequences.",
        checkpoint:
          "What change to the system would make the desired behaviour easier without relying on a single person's goodwill?",
        patterns: ["organizational-silence", "psychological-safety", "authority"],
        sources: [
          "[Academic book] Simon (1947), Administrative Behavior.",
          "[Academic book] Merton (1957), Social Theory and Social Structure.",
          "[Research review] Kerr (1975), “On the folly of rewarding A, while hoping for B,” Academy of Management Journal.",
        ],
      },
      {
        title: "Status, dependence, information, and power",
        objective:
          "Distinguish sources of power and examine how they affect choices, voice, and exit options.",
        body: "Power can arise from control of valued resources, formal authority, expertise, network position, legitimacy, or another person's dependence. These sources are distinct and can change over time. A person who appears to agree may face constraints involving employment, housing, care, immigration status, or access to information. Analysis should describe observable constraints and available options rather than presume consent, motive, or a universal response to power.",
        practice:
          "For a hypothetical workplace or community decision, identify who controls which resources, who bears the costs of disagreement, what information is asymmetric, and what realistic alternatives each person has.",
        checkpoint:
          "How would your interpretation change if the person had a genuinely safe and affordable way to refuse or leave?",
        patterns: ["authority", "batna", "organizational-silence"],
        sources: [
          "[Research review] French & Raven (1959), “The bases of social power,” Studies in Social Power.",
          "[Academic book] Emerson (1962), “Power-dependence relations,” American Sociological Review.",
          "[Academic book] Pfeffer (1981), Power in Organizations.",
        ],
      },
    ],
  },
  {
    n: "XVII",
    title: "Culture, Inequality & Social Structure",
    question: "Which social conditions shape what appears normal, possible, or individual?",
    lessons: [
      {
        title: "Culture, meaning, and cross-cultural evidence",
        objective:
          "Interpret behaviour in cultural context and evaluate the limits of broad cultural comparisons.",
        body: "Culture shapes shared meanings, practices, institutions, and expectations; it is internally diverse and changes over time. Cross-cultural differences in a sample do not establish that every member of a society thinks alike or that a national average explains an individual. Research can be affected by translation, sampling, measurement equivalence, and the tendency to treat one population as a universal baseline. Look for within-group variation and the historical conditions behind a comparison.",
        practice:
          "Take one claim about a cultural difference and ask: which people were sampled, how was the construct measured across groups, what within-group variation exists, and what historical or institutional explanation is also plausible?",
        checkpoint:
          "What would make a cultural explanation more than a stereotype based on a group average?",
        patterns: ["cultural-tightness-looseness", "social-proof"],
        sources: [
          "[Research review] Heine & Buchtel (2009), “Personality: The universal and the culturally specific,” Annual Review of Psychology.",
          "[Research review] Henrich, Heine, & Norenzayan (2010), “The weirdest people in the world?,” Behavioral and Brain Sciences.",
          "[Research review] van de Vijver & Leung (1997), Methods and Data Analysis for Cross-Cultural Research.",
        ],
      },
      {
        title: "Class, inequality, and structural constraints",
        objective:
          "Recognize when resources, institutions, and social position constrain behaviour and opportunity.",
        body: "Income, education, occupation, housing, discrimination, legal status, health, and access to networks can shape the choices available to people. Structural explanations do not erase individual agency; they help identify the costs and opportunities within which agency operates. Avoid treating outcomes as direct evidence of ability, effort, or preference without asking how resources, rules, and unequal exposure to risk affected them.",
        practice:
          "Compare two people facing the same stated choice but with different resources, obligations, and risks. List which options are realistically available to each and what evidence would clarify the constraint.",
        checkpoint:
          "Which apparent preference might change if the person's resources, risks, or institutional options changed?",
        patterns: ["person-situation-interaction", "authority"],
        sources: [
          "[Academic book] Marmot (2004), The Status Syndrome: How Social Standing Affects Our Health and Longevity.",
          "[Research review] Kraus, Piff, Mendoza-Denton, Rheinschmidt, & Keltner (2012), “Social class, solipsism, and contextualism,” Psychological Review.",
          "[Academic book] Sen (1999), Development as Freedom.",
        ],
      },
    ],
  },
  {
    n: "XVIII",
    title: "Ethics, Moral Reasoning & Philosophy",
    question: "What should guide action when evidence, power, and values meet?",
    lessons: [
      {
        title: "Consent, autonomy, harm, and responsibility",
        objective:
          "Evaluate interpersonal choices using consent, agency, harm, fairness, and responsibility.",
        body: "Ethical reasoning is not identical to effectiveness, popularity, legality, or personal preference. Consent requires meaningful choice and relevant information, and power imbalances can affect the practical ability to refuse. Ethical analysis asks who may be harmed, who benefits, whose agency is constrained, what duties apply, and how uncertainty should affect action. In applied psychology, follow relevant professional codes and local law rather than treating this lesson as legal or clinical advice.",
        practice:
          "Assess a hypothetical influence attempt: identify the goal, information disclosed or withheld, pressure used, ability to refuse, foreseeable harms, and a less coercive alternative.",
        checkpoint:
          "Would the person still have a meaningful choice if they knew the relevant facts and could refuse without penalty?",
        patterns: ["moral-licensing", "authority", "reciprocity"],
        sources: [
          "[Professional code] American Psychological Association, Ethical Principles of Psychologists and Code of Conduct (2002, with amendments).",
          "[Philosophical primary work] Kant (1785), Groundwork of the Metaphysics of Morals.",
          "[Philosophical primary work] Mill (1861), Utilitarianism.",
          "[Philosophical primary work] Rawls (1971), A Theory of Justice.",
        ],
        webSources: [
          {
            label: "American Psychological Association — Ethical Principles of Psychologists",
            url: "https://www.apa.org/ethics/code",
          },
        ],
      },
      {
        title: "Empirical claims, philosophical arguments, and human flourishing",
        objective:
          "Separate claims testable by evidence from normative or metaphysical arguments about human nature.",
        body: "Empirical research can estimate patterns, compare explanations, and test predictions; it cannot by itself settle what is morally right, what makes a life meaningful, or whether people possess free will. Philosophical arguments clarify concepts and values but should not be presented as experimental findings. A careful account identifies which kind of claim is being made, what could count as support or counterevidence, and where reasonable disagreement remains. Flourishing may involve capabilities, relationships, meaning, and material conditions rather than a single universal score.",
        practice:
          "Take a statement about human nature and classify each part as descriptive, causal, normative, or metaphysical. For each, note what kind of evidence or argument could support or challenge it.",
        checkpoint:
          "Which part of the claim could an empirical study test, and which part requires an explicit value judgment?",
        patterns: ["self-complexity", "person-situation-interaction"],
        sources: [
          "[Philosophical primary work] Aristotle, Nicomachean Ethics.",
          "[Philosophical primary work] Frankfurt (1971), “Freedom of the will and the concept of a person,” The Journal of Philosophy.",
          "[Academic book] Nussbaum (2011), Creating Capabilities: The Human Development Approach.",
          "[Academic book] Sen (1999), Development as Freedom.",
        ],
      },
    ],
  },
];

export const PERSONAS = [
  {
    id: "guilt",
    name: "The Guilt-Tripper",
    brief:
      "A family member who makes you responsible for their feelings whenever you set a boundary.",
    scene:
      "You declined a request to change your plans. They bring up everything they have done for you and say you are abandoning them.",
    focus: ["Guilt framing", "reciprocity pressure", "holding a boundary"],
    objective:
      "Acknowledge their feelings without taking responsibility for managing them or reversing your decision automatically.",
    level: "Beginner",
  },
  {
    id: "gaslighter",
    name: "The Gaslighter",
    brief: "A partner who denies things you clearly remember and questions your sanity.",
    scene:
      "You raise a specific disagreement about what was said yesterday. They deny it and shift the conversation toward your memory and emotional state.",
    focus: ["Reality checking", "staying with observable facts", "avoiding escalation"],
    objective:
      "State what you remember, identify what is uncertain, and suggest a concrete way to resolve or pause the disagreement.",
    level: "Intermediate",
  },
  {
    id: "negotiator",
    name: "The Hard Bargainer",
    brief: "A buyer using anchoring, deadlines and silence to push your price down.",
    scene:
      "You are discussing a price. The buyer opens with a low offer, claims they need an answer today, and waits silently after you respond.",
    focus: ["Anchoring", "scarcity and urgency", "strategic silence"],
    objective:
      "Ask for time or information, explain your terms clearly, and avoid conceding just to relieve pressure.",
    level: "Intermediate",
  },
  {
    id: "recruiter",
    name: "The Charming Recruiter",
    brief: "A warm stranger love-bombing you into a 'community' that asks for more and more.",
    scene:
      "A new acquaintance praises your unique fit, promises a close-knit community, then asks for a quick commitment before you have reviewed the details.",
    focus: ["Charm and rapid mirroring", "love-bombing", "small-yes escalation"],
    objective:
      "Slow the pace, request concrete details, and distinguish warmth from evidence about the offer.",
    level: "Intermediate",
  },
  {
    id: "boss",
    name: "The Goalpost Mover",
    brief: "A manager who keeps changing what 'good enough' means.",
    scene:
      "After you complete an assignment using the agreed criteria, your manager introduces new requirements and says the original expectations were obvious.",
    focus: ["Moving goalposts", "authority pressure", "written criteria"],
    objective:
      "Ask for priorities and success criteria in writing without becoming defensive or agreeing to an impossible scope.",
    level: "Beginner",
  },
  {
    id: "hot-cold",
    name: "The Hot-and-Cold Partner",
    brief: "Someone whose intense attention alternates with unexplained withdrawal.",
    scene:
      "After several affectionate days and vague future plans, they disappear for a while, then return warmly without addressing the gap.",
    focus: ["Intermittent reinforcement", "breadcrumbing", "asking for consistency"],
    objective:
      "Describe the pattern and ask for the clarity or consistency you need without chasing reassurance.",
    level: "Intermediate",
  },
  {
    id: "excluder",
    name: "The Social Gatekeeper",
    brief:
      "A group member who uses inclusion, side conversations and selective access to shape compliance.",
    scene:
      "A group makes plans in front of you but shares key details privately. A member then implies you can be included if you stop raising a concern.",
    focus: ["Ostracism", "gatekeeping", "group pressure"],
    objective:
      "Ask for clear criteria and decide what you will do without pleading for approval or retaliating against the group.",
    level: "Advanced",
  },
  {
    id: "credentialist",
    name: "The Credential Gatekeeper",
    brief:
      "A decision-maker who invokes status and shifting qualifications to restrict access to an opportunity.",
    scene:
      "You ask how to qualify for an opportunity. The decision-maker cites authority, gives vague criteria, and suggests questioning the process will hurt your chances.",
    focus: ["Authority deference", "credential control", "independent verification"],
    objective:
      "Request specific criteria and a documented process, then identify a safe independent way to verify them.",
    level: "Advanced",
  },
  {
    id: "impersonator",
    name: "The Urgent Impersonator",
    brief:
      "A caller claims to be someone you know and pressures you to act before you can verify their identity.",
    scene:
      "You receive an unexpected urgent request involving money or account access. The caller uses familiar details and discourages you from contacting anyone else.",
    focus: ["Social engineering", "urgency", "out-of-band verification"],
    objective:
      "Avoid sharing sensitive information or acting on the request; verify the identity through a separate trusted channel.",
    level: "Beginner",
  },
  {
    id: "flooder",
    name: "The Emotional Flooder",
    brief:
      "A person who escalates a disagreement with sudden drama and rapid demands for an immediate answer.",
    scene:
      "A routine disagreement becomes a burst of accusations and urgent questions. They insist you settle everything now and treat a pause as proof you do not care.",
    focus: ["Emotional flooding", "loaded questions", "regaining decision space"],
    objective:
      "Name the need to pause, avoid debating every accusation at once, and offer a clear time to return to the issue.",
    level: "Advanced",
  },
  {
    id: "false-binary",
    name: "The False-Binary Tactician",
    brief: "A colleague presents two unacceptable choices as the only possible options.",
    scene:
      "A colleague says you must either support their proposal exactly as written or admit that you are trying to sabotage the team.",
    focus: ["Double bind", "loaded framing", "creating a third option"],
    objective:
      "Reject the false choice calmly, clarify the actual decision, and propose a reasonable alternative or pause.",
    level: "Intermediate",
  },
  {
    id: "divider",
    name: "The Divide-and-Rule Manager",
    brief:
      "A manager uses selective praise and private comparisons to make colleagues compete for approval.",
    scene:
      "Your manager praises a coworker as the only reliable person, then privately tells you that the coworker has been criticizing your work.",
    focus: ["Favoritism", "triangulation", "fact-checking without escalation"],
    objective:
      "Avoid retaliatory gossip, seek clear work criteria, and communicate directly where appropriate.",
    level: "Advanced",
  },
  {
    id: "image-manager",
    name: "The Image Manager",
    brief:
      "A public-facing leader responds to concerns with polished statements but little verifiable change.",
    scene:
      "After a concrete concern is raised, the leader emphasizes their values and public reputation, offers a carefully worded apology, and avoids answering what will change.",
    focus: ["Reputation management", "evidence versus presentation", "accountability"],
    objective:
      "Ask about the specific action, evidence of repair, and a timeline without assuming either guilt or sincerity.",
    level: "Advanced",
  },
  {
    id: "spiritual-authority",
    name: "The Spiritual Authority",
    brief: "A trusted guide frames disagreement as a failure of faith, loyalty or personal growth.",
    scene:
      "A community leader asks for a private commitment and says that hesitation means you are resisting your own growth. You are encouraged not to discuss the request with outsiders.",
    focus: ["Spiritual authority", "isolation pressure", "independent reflection"],
    objective:
      "Separate the belief system from the specific request, allow yourself time, and consult a trusted independent person if needed.",
    level: "Advanced",
  },
  {
    id: "loaded-framer",
    name: "The Loaded-Question Framer",
    brief:
      "A conversational partner embeds assumptions in questions and treats them as already proven.",
    scene:
      "In a meeting, someone asks when you will stop being difficult and support the plan, assuming both that you are difficult and that agreement is required.",
    focus: ["Presuppositions", "loaded language", "answering the underlying question"],
    objective:
      "Identify the assumption, restate the question neutrally, and answer only the part you can support with facts.",
    level: "Intermediate",
  },
  {
    id: "overloader",
    name: "The Information Overloader",
    brief:
      "A decision-maker floods a conversation with details and unfamiliar terms to rush a commitment.",
    scene:
      "During a short meeting, a representative rapidly lists benefits, exceptions and technical details, then asks you to agree before the offer expires.",
    focus: ["Cognitive overload", "urgency", "restoring decision space"],
    objective:
      "Pause the exchange, request the terms in writing, identify unanswered questions, and defer a decision until you can review them.",
    level: "Intermediate",
  },
  {
    id: "legal-intimidator",
    name: "The Legal Intimidator",
    brief:
      "Someone invokes legal consequences to silence a question before the facts or process are clear.",
    scene:
      "You raise a documented concern. The other person warns that discussing it could bring serious legal trouble and insists you respond immediately to their proposed resolution.",
    focus: ["Legal intimidation", "urgency", "independent advice and documentation"],
    objective:
      "Avoid arguing legal conclusions, preserve relevant records, request communication in writing, and seek qualified independent advice.",
    level: "Advanced",
  },
  {
    id: "boundary-friend",
    name: "The Boundary Conversation",
    brief:
      "A friend is disappointed when you cannot take on an extra commitment and asks you to reconsider.",
    scene:
      "A friend asks you to help with a recurring task this weekend. You have already said you are unavailable, and they reply that they were counting on you.",
    focus: ["Clear boundaries", "acknowledging feelings", "offering only realistic alternatives"],
    objective:
      "Respond with empathy and clarity, hold your decision without attacking or overexplaining, and offer another option only if you genuinely want to.",
    level: "Beginner",
  },
  {
    id: "workplace-feedback",
    name: "The Difficult Feedback Meeting",
    brief:
      "You receive critical work feedback and want to understand the evidence before responding.",
    scene:
      "Your manager says a recent report was not sufficiently clear but gives only one example. You feel defensive and worry the feedback may affect your review.",
    focus: ["Listening under stress", "asking for specific examples", "agreeing on next steps"],
    objective:
      "Ask for concrete examples and success criteria, distinguish feedback from assumptions, and agree on a practical follow-up without conceding points you do not understand.",
    level: "Beginner",
  },
  {
    id: "uncertain-claim",
    name: "The Unverified Claim",
    brief:
      "A colleague shares a compelling claim and asks you to pass it on before it has been checked.",
    scene:
      "In a group chat, a colleague shares an alarming post about a local event. Several people have forwarded it, but no reliable source is included.",
    focus: ["Source checking", "uncertainty", "slowing information spread"],
    objective:
      "Respond without shaming the sender, identify what is and is not verified, and suggest a reliable way to check before forwarding.",
    level: "Beginner",
  },
  {
    id: "collaborative-negotiation",
    name: "The Shared-Constraints Negotiation",
    brief: "Two colleagues have different priorities and need to agree on a workable project plan.",
    scene:
      "You need a project delivered by Friday. A colleague says the timeline is unrealistic because another team has not supplied key information. Both of you have limited capacity.",
    focus: ["Interests over positions", "constraints", "options and trade-offs"],
    objective:
      "Clarify each person's constraints, explore options and trade-offs, and agree on responsibilities and a review point without turning the disagreement into blame.",
    level: "Intermediate",
  },
  {
    id: "caregiving-request",
    name: "The Family Care Decision",
    brief: "A family member asks you to take on more caregiving than you can reliably provide.",
    scene:
      "A relative asks you to cover several evenings of care each week. Other family members assume you will agree, but your work and health make the schedule difficult.",
    focus: ["Capacity and boundaries", "shared responsibility", "practical support options"],
    objective:
      "State your actual capacity, ask others to share planning, and explore realistic support without promising care you cannot sustain.",
    level: "Intermediate",
  },
  {
    id: "digital-verification",
    name: "The Account-Security Request",
    brief:
      "A message that appears to come from a service provider asks you to act quickly on your account.",
    scene:
      "You receive a text about unusual account activity with a link and a deadline. The message looks plausible, but you were not expecting it.",
    focus: ["Out-of-band verification", "protecting credentials", "resisting urgency"],
    objective:
      "Do not use the supplied link or share passwords or codes. Explain a safe way to verify the alert through a known official channel.",
    level: "Beginner",
  },
  {
    id: "repair-misunderstanding",
    name: "Repair After a Misunderstanding",
    brief:
      "A conversation went badly, and both people want to clarify what happened before deciding how to move forward.",
    scene:
      "A friend says your comment in a group meeting embarrassed them. You meant it as a joke and feel misunderstood, but you want to hear their experience.",
    focus: ["Listening to impact", "clarifying without arguing intent", "specific repair"],
    objective:
      "Ask what landed badly, reflect back what you heard, acknowledge impact without pretending to know more than you do, and agree on one useful next step.",
    level: "Beginner",
  },
  {
    id: "group-dissent",
    name: "Raising a Concern in a Group",
    brief: "You have a concern about a group decision, but everyone else appears ready to move on.",
    scene:
      "During a planning meeting, the team quickly approves a timeline that depends on an unconfirmed assumption. You are unsure whether others noticed the risk.",
    focus: ["Respectful dissent", "checking assumptions", "inviting missing information"],
    objective:
      "State the specific uncertainty without attacking the decision-makers, ask whether the assumption has been verified, and suggest a proportionate contingency.",
    level: "Intermediate",
  },
  {
    id: "shared-credit",
    name: "Clarifying Shared Credit",
    brief: "A team presentation leaves unclear who contributed which parts of a project.",
    scene:
      "After a successful presentation, your manager praises a colleague for work you both completed. You want your contribution recognized without dismissing theirs.",
    focus: ["Specific evidence", "self-advocacy", "shared accountability"],
    objective:
      "Describe your contribution concretely, recognize others' work where appropriate, and ask how contributions will be represented in future reviews.",
    level: "Intermediate",
  },
  {
    id: "work-accommodation",
    name: "Requesting a Work Adjustment",
    brief: "You need to discuss a practical change that could help you do your work reliably.",
    scene:
      "A recurring schedule or workspace condition is making a task harder to complete. You want to request a change but are unsure what details to share or what alternatives might work.",
    focus: ["Clear requests", "privacy and boundaries", "collaborative options"],
    objective:
      "State the work-related barrier and the adjustment you are requesting, share only information you choose to disclose, and discuss feasible alternatives. For legal or formal accommodation questions, seek qualified local guidance.",
    level: "Intermediate",
  },
  {
    id: "housing-service-complaint",
    name: "Making a Housing or Service Complaint",
    brief: "You need to report a recurring practical problem and ask for a clear response.",
    scene:
      "A repair you reported has not been addressed, and the problem is affecting your use of the service or space. You have notes about dates but do not know the formal process.",
    focus: ["Factual documentation", "clear requests", "appropriate escalation"],
    objective:
      "Describe the issue and timeline factually, state the specific response you need, ask about the process and expected timing, and seek independent local advice if the issue is urgent or rights-related.",
    level: "Intermediate",
  },
  {
    id: "cross-cultural-misunderstanding",
    name: "A Cross-Cultural Misunderstanding",
    brief:
      "A difference in communication expectations creates uncertainty about how a conversation was meant.",
    scene:
      "A colleague gives a brief response that you read as dismissive. You know that people in your team have different communication styles and want to check before drawing a conclusion.",
    focus: ["Curiosity without stereotyping", "checking meaning", "contextual interpretation"],
    objective:
      "Describe the specific moment, ask an open and non-accusatory question about how it was intended, and avoid treating either person's background as a complete explanation.",
    level: "Beginner",
  },
  {
    id: "competing-priorities",
    name: "Balancing Competing Priorities",
    brief: "You and someone close to you want different things from a shared plan.",
    scene:
      "You and a friend are planning a trip. One person wants to keep costs low while the other values convenience and has less flexibility with time.",
    focus: ["Interests and constraints", "joint options", "mutual choice"],
    objective:
      "Identify what matters most to each of you, compare realistic options and costs, and agree on a plan both can freely accept or decline.",
    level: "Beginner",
  },
  {
    id: "unwanted-advice",
    name: "Responding to Unwanted Advice",
    brief: "Someone offers repeated advice when you would rather be heard or left to decide.",
    scene:
      "You tell a relative about a frustrating week. They immediately list solutions, and when you say you have tried some, they keep explaining what you should do.",
    focus: ["Naming the kind of support wanted", "clear requests", "respectful limits"],
    objective:
      "Acknowledge their intention if you wish, state whether you want listening or suggestions, and set a clear limit if the advice continues.",
    level: "Beginner",
  },
];
