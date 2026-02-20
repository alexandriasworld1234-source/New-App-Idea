/**
 * LEVER Orchestration Kernel
 *
 * LEVER is fractal — it operates at unit / lesson / micro-activity scale:
 *   L – Leverage     (find high-impact variables and moves)
 *   E – Environment  (context shapes behavior and learning)
 *   V – Velocity     (movement creates clarity; short feedback loops)
 *   E – Execution    (output is a learning technology)
 *   R – Repetition   (learning compounds through reuse)
 */

import { TeacherInput } from "@/types";

// ─── Protocol Library ─────────────────────────────────────────────────────────

export const PROTOCOL_LIBRARY = [
  {
    name: "Socratic Seminar",
    tradition: "Discussion",
    purpose: "Develop interpretive, evidence-based dialogue",
  },
  {
    name: "Gallery Walk",
    tradition: "Inquiry",
    purpose: "Distributed sensemaking across shared artifacts",
  },
  {
    name: "Think-Pair-Share",
    tradition: "Discussion",
    purpose: "Low-stakes initial processing before public sharing",
  },
  {
    name: "Jigsaw",
    tradition: "Inquiry",
    purpose: "Distributed expertise with accountability for teaching peers",
  },
  {
    name: "Four Corners",
    tradition: "Discussion",
    purpose: "Surfacing positions and reasoning on complex questions",
  },
  {
    name: "Critique Protocol",
    tradition: "Studio/Design",
    purpose: "Warm and cool feedback on student work-in-progress",
  },
  {
    name: "Studio Documentation",
    tradition: "Reggio",
    purpose: "Making thinking visible through documentation as learning",
  },
  {
    name: "Independent Work Cycle",
    tradition: "Montessori",
    purpose: "Self-directed deep work with choice of activity",
  },
  {
    name: "Claim-Evidence-Reasoning",
    tradition: "Inquiry",
    purpose: "Structured argument from evidence",
  },
  {
    name: "Notice-Wonder",
    tradition: "Inquiry",
    purpose: "Open observation before hypothesis formation",
  },
  {
    name: "Hexagonal Thinking",
    tradition: "Systems",
    purpose: "Mapping connections across concepts",
  },
  {
    name: "Fishbowl Discussion",
    tradition: "Discussion",
    purpose: "Modeled dialogue with observer analysis",
  },
] as const;

// ─── Guardrails ───────────────────────────────────────────────────────────────

export const GUARDRAILS = `
QUALITY GUARDRAILS — enforce these in all generated content:

1. NO DEFICIT FRAMING. Never describe students by what they lack. Use asset-based language: "students building toward..." not "students who struggle with..."

2. NO WORKSHEETIFICATION. Thinking tools must be open-ended and demand reasoning, not fill-in-the-blank recall. If a student can complete it without thinking, it fails.

3. NO POSTER PROJECT VIBES. Avoid artifacts that are purely display/performance with no evidence of reasoning. Artifacts must demonstrate thinking, not just showcase.

4. NO FAKE PARTNERSHIPS. Do not recommend "partnering with a local organization" or "presenting to community members" unless the teacher provided this context. These are often undeliverable.

5. NO AI REPLACING STUDENT THINKING. AI tools suggested must be positioned as tools students operate to extend their thinking — never as substitutes for their analysis or writing.

6. BIAS AND COLONIALITY CHECK. For every reading and activity: ask whether the framing centers Western/colonial epistemologies without acknowledging other knowledge systems. Offer multiple framings when relevant.

7. EXPLICIT INSTRUCTION RULES. When mini-lessons appear: they must be ≤8 minutes, misconception-driven, and designed to rapidly release students to agency.

8. CONSTRUCTIVIST FIRST. Learning arcs must build from student inquiry and meaning-making. Direct instruction is a support tool, not the primary mode.
`;

// ─── System Prompt ────────────────────────────────────────────────────────────

export function buildSystemPrompt(): string {
  return `You are an expert learning scientist, liberatory pedagogy designer, and curriculum engineer. You operate the LEVER Lesson & Materials Generator — a teacher-only planning tool that produces complete instructional plans and student material packets from a single teacher prompt.

LEVER FRAMEWORK (fractal — applies at unit/lesson/micro-activity scale):
- L: LEVERAGE — identify the highest-impact variables: the core concept, the generative question, the key misconception to address first
- E: ENVIRONMENT — design the learning context so that conditions shape behavior: physical arrangement, materials, grouping, psychological safety, cognitive demand level
- V: VELOCITY — short feedback loops, frequent low-stakes output, iteration cycles that make thinking visible fast
- E: EXECUTION — treat student output as a learning technology: writing, building, presenting, diagramming, deciding ARE the learning
- R: REPETITION — compound learning through deliberate reuse of concepts, skills, and practices across different contexts

LEVER is the backbone. Within it, select protocols from: Reggio documentation, Montessori work cycles, competence-based design, design practice, inquiry routines.

${GUARDRAILS}

OUTPUT PHILOSOPHY:
- Teacher plans: readable, not dissertations. Bullet-dense. Actionable.
- Student materials: thinking tools, not worksheets. Open-ended. Demanding.
- Readings: substantive and compelling. Not simplified to the point of being dull.
- Research packs: teach research as epistemology, not just information retrieval.

SCOPE: You work across every discipline, every standards system, every topic. If no standard is given, proceed with the topic and infer the conceptual domain.

Always respond in valid JSON matching the exact schema provided. No markdown fencing around JSON.`;
}

// ─── User Prompt Builder ──────────────────────────────────────────────────────

export function buildGenerationPrompt(input: TeacherInput): string {
  const protocolOptions = PROTOCOL_LIBRARY.map(
    (p) => `"${p.name}" (${p.tradition})`
  ).join(", ");

  return `Generate a complete LEVER instructional plan and student materials packet for this teacher:

TEACHER INPUT:
- Grade Band: ${input.gradeBand}
- Topic/Standard: ${input.topic || "teacher has not specified — infer from discipline and grade band"}
- Discipline: ${input.discipline || "general/interdisciplinary"}
- Timeframe: ${input.timeframe}
- Student Readiness: ${input.readiness}
- Classroom Constraints: ${input.constraints || "none specified"}
- Desired Artifact Type: ${input.artifactType || "recommend the most appropriate type"}

AVAILABLE PROTOCOLS (select best-fit): ${protocolOptions}

Generate a complete JSON response matching this EXACT schema. All fields are required:

{
  "teacherPlan": {
    "standardOrTopic": "string — the topic/standard as interpreted",
    "discipline": "string",
    "gradeBand": "string",
    "timeframe": "string",
    "unpacking": {
      "coreConcepts": ["array of 3-6 core concepts students will engage"],
      "misconceptions": ["array of 3-5 common misconceptions to address"],
      "prerequisiteKnowledge": ["array of 2-4 prior knowledge assumptions"],
      "transferTargets": ["array of 2-3 contexts where this learning transfers"],
      "successEvidence": ["array of 3-4 what student success looks and sounds like"]
    },
    "leverArc": [
      {
        "phase": "Leverage",
        "description": "string — what the Leverage phase accomplishes here",
        "teacherMoves": ["array of 2-4 specific teacher moves"],
        "studentActivity": "string — what students do",
        "timeEstimate": "string",
        "protocols": ["array of 1-2 protocol names from the library"]
      },
      {
        "phase": "Environment",
        "description": "string",
        "teacherMoves": ["array"],
        "studentActivity": "string",
        "timeEstimate": "string",
        "protocols": ["array"]
      },
      {
        "phase": "Velocity",
        "description": "string",
        "teacherMoves": ["array"],
        "studentActivity": "string",
        "timeEstimate": "string",
        "protocols": ["array"]
      },
      {
        "phase": "Execution",
        "description": "string",
        "teacherMoves": ["array"],
        "studentActivity": "string",
        "timeEstimate": "string",
        "protocols": ["array"]
      },
      {
        "phase": "Repetition",
        "description": "string",
        "teacherMoves": ["array"],
        "studentActivity": "string",
        "timeEstimate": "string",
        "protocols": ["array"]
      }
    ],
    "week1MVLE": "string — a compelling description of the Week 1 minimum viable learning experience (3-5 sentences, must be substantive and strong)",
    "facilitationMoves": {
      "questions": ["array of 4-6 generative teacher questions for the unit"],
      "talkMoves": ["array of 3-5 talk moves (e.g. 'revoice', 'press for reasoning')"],
      "miniConferencePrompts": ["array of 3-4 prompts for individual student conferences"],
      "smallGroupPrompts": ["array of 3-4 prompts for small group check-ins"]
    },
    "differentiation": {
      "novice": ["array of 3-4 novice-specific supports"],
      "intermediate": ["array of 3-4 grade-level moves"],
      "advanced": ["array of 3-4 extension challenges"]
    },
    "microLessons": [
      {
        "targetMisconception": "string",
        "duration": "5-8 minutes",
        "approach": "string",
        "steps": ["array of 3-5 steps"]
      },
      {
        "targetMisconception": "string",
        "duration": "5-8 minutes",
        "approach": "string",
        "steps": ["array"]
      }
    ]
  },
  "studentPacket": {
    "quickReaders": [
      {
        "level": "A",
        "levelLabel": "Accessible",
        "title": "string",
        "body": "string — 200-300 words, accessible reading on the topic, asset-based framing, real content not watered-down",
        "vocabularySupports": [{"term": "string", "definition": "string"}],
        "comprehensionPrompts": ["array of 2-3 thinking-based prompts (not recall)"]
      },
      {
        "level": "B",
        "levelLabel": "Grade-Level",
        "title": "string",
        "body": "string — 350-450 words, grade-level reading",
        "vocabularySupports": [{"term": "string", "definition": "string"}],
        "comprehensionPrompts": ["array of 2-3 thinking-based prompts"]
      },
      {
        "level": "C",
        "levelLabel": "Stretch / Advanced",
        "title": "string",
        "body": "string — 450-600 words, stretch reading with complexity and nuance",
        "vocabularySupports": [{"term": "string", "definition": "string"}],
        "comprehensionPrompts": ["array of 3-4 thinking-based prompts with more depth"]
      }
    ],
    "researchPack": {
      "keywordSearches": ["array of 5-8 effective search strings"],
      "sourceTypeGuidance": ["array of 3-5 guidance statements on what source types to seek and why"],
      "credibilityChecklist": ["array of 5-7 credibility evaluation criteria"],
      "noteCatcherTemplate": "string — a text-based note-catcher template with headers and fill-in spaces",
      "synthesisOrganizer": "string — a text-based synthesis organizer template"
    },
    "thinkingTools": [
      {
        "name": "string",
        "type": "sensemaking-map",
        "instructions": "string",
        "template": "string — the tool itself as text with structure"
      },
      {
        "name": "string",
        "type": "hypothesis-builder",
        "instructions": "string",
        "template": "string"
      },
      {
        "name": "string",
        "type": "systems-map",
        "instructions": "string",
        "template": "string"
      },
      {
        "name": "string",
        "type": "evidence-log",
        "instructions": "string",
        "template": "string"
      },
      {
        "name": "string",
        "type": "reflection",
        "instructions": "string",
        "template": "string"
      }
    ],
    "writingTasks": [
      {
        "type": "constructed-response",
        "label": "string",
        "prompt": "string — specific, discipline-grounded writing prompt",
        "scaffold": "string — sentence starters or structural scaffold",
        "criteriaForQuality": ["array of 3-4 criteria"]
      },
      {
        "type": "argument-from-evidence",
        "label": "string",
        "prompt": "string",
        "scaffold": "string",
        "criteriaForQuality": ["array"]
      },
      {
        "type": "narrative-reflection",
        "label": "string",
        "prompt": "string",
        "scaffold": "string",
        "criteriaForQuality": ["array"]
      }
    ],
    "activityProtocols": [
      {
        "name": "string — from the protocol library",
        "tradition": "string",
        "purpose": "string — specific to this unit",
        "steps": ["array of 4-6 steps adapted for this topic"],
        "timeframe": "string",
        "materials": ["array"]
      },
      {
        "name": "string",
        "tradition": "string",
        "purpose": "string",
        "steps": ["array"],
        "timeframe": "string",
        "materials": ["array"]
      }
    ],
    "artifactPlan": {
      "recommendedArtifact": "string — name of the artifact",
      "rationale": "string — why this artifact is appropriate for this topic, grade, and timeframe",
      "specifications": ["array of 4-6 specification bullets"],
      "evidenceRequirements": ["array of 3-4 evidence requirements — what reasoning must be visible"],
      "assessmentFocus": "string — what the teacher looks for (reasoning process, not just product)"
    }
  }
}

CRITICAL: Return ONLY valid JSON. No markdown. No explanation outside the JSON. The entire response is the JSON object.`;
}
