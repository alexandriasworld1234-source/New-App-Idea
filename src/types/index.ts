// ─── Teacher Input Types ──────────────────────────────────────────────────────

export type GradeBand = "K-2" | "3-5" | "6-8" | "9-12" | "Higher Ed";
export type Timeframe = "1 class" | "1 week" | "2 weeks" | "3 weeks";
export type ReadinessLevel = "novice" | "mixed" | "advanced";
export type ArtifactType =
  | "model output + interpretation"
  | "decision brief"
  | "design spec"
  | "experiment plan"
  | "systems leverage analysis"
  | "implementation plan"
  | "open"
  | "";

export interface TeacherInput {
  gradeBand: GradeBand;
  topic: string;
  timeframe: Timeframe;
  readiness: ReadinessLevel;
  constraints: string;
  artifactType: ArtifactType;
  discipline: string;
}

// ─── LEVER Output Structure ───────────────────────────────────────────────────

export interface LEVERPhase {
  phase: "Leverage" | "Environment" | "Velocity" | "Execution" | "Repetition";
  description: string;
  teacherMoves: string[];
  studentActivity: string;
  timeEstimate: string;
  protocols: string[];
}

export interface ConceptUnpacking {
  coreConceptsELA?: string; // for cross-discipline label
  coreConcepts: string[];
  misconceptions: string[];
  prerequisiteKnowledge: string[];
  transferTargets: string[];
  successEvidence: string[];
}

export interface TeacherPlan {
  standardOrTopic: string;
  discipline: string;
  gradeBand: string;
  timeframe: string;
  unpacking: ConceptUnpacking;
  leverArc: LEVERPhase[];
  week1MVLE: string; // Minimum Viable Learning Experience
  facilitationMoves: {
    questions: string[];
    talkMoves: string[];
    miniConferencePrompts: string[];
    smallGroupPrompts: string[];
  };
  differentiation: {
    novice: string[];
    intermediate: string[];
    advanced: string[];
  };
  microLessons: MicroLesson[];
}

export interface MicroLesson {
  targetMisconception: string;
  duration: string;
  approach: string;
  steps: string[];
}

// ─── Student Materials ────────────────────────────────────────────────────────

export interface QuickReader {
  level: "A" | "B" | "C";
  levelLabel: string;
  title: string;
  body: string;
  vocabularySupports: { term: string; definition: string }[];
  comprehensionPrompts: string[];
}

export interface ResearchPack {
  keywordSearches: string[];
  sourceTypeGuidance: string[];
  credibilityChecklist: string[];
  noteCatcherTemplate: string;
  synthesisOrganizer: string;
}

export interface ThinkingTool {
  name: string;
  type:
    | "sensemaking-map"
    | "hypothesis-builder"
    | "systems-map"
    | "evidence-log"
    | "decision-log"
    | "reflection"
    | "goal-setting";
  instructions: string;
  template: string;
}

export interface WritingTask {
  type:
    | "constructed-response"
    | "argument-from-evidence"
    | "explanatory"
    | "narrative-reflection"
    | "executive-memo";
  label: string;
  prompt: string;
  scaffold: string;
  criteriaForQuality: string[];
}

export interface ActivityProtocol {
  name: string;
  tradition: string;
  purpose: string;
  steps: string[];
  timeframe: string;
  materials: string[];
}

export interface ArtifactPlan {
  recommendedArtifact: string;
  rationale: string;
  specifications: string[];
  evidenceRequirements: string[];
  assessmentFocus: string;
}

export interface StudentPacket {
  quickReaders: QuickReader[];
  researchPack: ResearchPack;
  thinkingTools: ThinkingTool[];
  writingTasks: WritingTask[];
  activityProtocols: ActivityProtocol[];
  artifactPlan: ArtifactPlan;
}

// ─── Full Generation Output ───────────────────────────────────────────────────

export interface GenerationOutput {
  teacherPlan: TeacherPlan;
  studentPacket: StudentPacket;
  generatedAt: string;
  inputSummary: TeacherInput;
}

// ─── Teacher Preferences (localStorage) ──────────────────────────────────────

export interface TeacherPreferences {
  savedTonePreference: "formal" | "conversational" | "terse";
  savedDefaultReadinessLevel: ReadinessLevel;
  savedDefaultGradeBand: GradeBand;
  savedDefaultTimeframe: Timeframe;
  savedFavoriteProtocols: string[];
  savedConstraints: string;
  savedArtifactTypes: ArtifactType[];
  feedbackHistory: FeedbackEntry[];
  savedTemplates: SavedTemplate[];
}

export interface FeedbackEntry {
  id: string;
  timestamp: string;
  topic: string;
  rating: "thumbs-up" | "thumbs-down";
  tags: string[];
}

export interface SavedTemplate {
  id: string;
  name: string;
  timestamp: string;
  input: TeacherInput;
  notes: string;
}
