import { TeacherPreferences, FeedbackEntry, SavedTemplate, TeacherInput } from "@/types";

const PREFS_KEY = "lever_teacher_prefs";

const DEFAULT_PREFS: TeacherPreferences = {
  savedTonePreference: "conversational",
  savedDefaultReadinessLevel: "mixed",
  savedDefaultGradeBand: "6-8",
  savedDefaultTimeframe: "1 week",
  savedFavoriteProtocols: [],
  savedConstraints: "",
  savedArtifactTypes: [],
  feedbackHistory: [],
  savedTemplates: [],
};

export function getPreferences(): TeacherPreferences {
  if (typeof window === "undefined") return DEFAULT_PREFS;
  try {
    const stored = localStorage.getItem(PREFS_KEY);
    if (!stored) return DEFAULT_PREFS;
    return { ...DEFAULT_PREFS, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function savePreferences(prefs: Partial<TeacherPreferences>): void {
  if (typeof window === "undefined") return;
  const current = getPreferences();
  const updated = { ...current, ...prefs };
  localStorage.setItem(PREFS_KEY, JSON.stringify(updated));
}

export function addFeedback(
  topic: string,
  rating: "thumbs-up" | "thumbs-down",
  tags: string[]
): void {
  const prefs = getPreferences();
  const entry: FeedbackEntry = {
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    topic,
    rating,
    tags,
  };
  prefs.feedbackHistory = [entry, ...prefs.feedbackHistory].slice(0, 50);
  savePreferences({ feedbackHistory: prefs.feedbackHistory });
}

export function saveTemplate(
  name: string,
  input: TeacherInput,
  notes: string
): SavedTemplate {
  const prefs = getPreferences();
  const template: SavedTemplate = {
    id: Date.now().toString(),
    name,
    timestamp: new Date().toISOString(),
    input,
    notes,
  };
  prefs.savedTemplates = [template, ...prefs.savedTemplates].slice(0, 20);
  savePreferences({ savedTemplates: prefs.savedTemplates });
  return template;
}

export function deleteTemplate(id: string): void {
  const prefs = getPreferences();
  prefs.savedTemplates = prefs.savedTemplates.filter((t) => t.id !== id);
  savePreferences({ savedTemplates: prefs.savedTemplates });
}
