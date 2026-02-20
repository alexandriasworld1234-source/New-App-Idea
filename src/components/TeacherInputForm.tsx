"use client";

import { useState, useEffect } from "react";
import { TeacherInput, GradeBand, Timeframe, ReadinessLevel, ArtifactType, SavedTemplate } from "@/types";
import { getPreferences, savePreferences } from "@/lib/preferences";

interface Props {
  onSubmit: (input: TeacherInput) => void;
  isGenerating: boolean;
}

const GRADE_BANDS: GradeBand[] = ["K-2", "3-5", "6-8", "9-12", "Higher Ed"];
const TIMEFRAMES: Timeframe[] = ["1 class", "1 week", "2 weeks", "3 weeks"];
const READINESS_LEVELS: { value: ReadinessLevel; label: string }[] = [
  { value: "novice", label: "Novice — building foundational understanding" },
  { value: "mixed", label: "Mixed — varied readiness in the room" },
  { value: "advanced", label: "Advanced — ready for complexity and transfer" },
];
const ARTIFACT_TYPES: { value: ArtifactType; label: string }[] = [
  { value: "", label: "Let LEVER recommend" },
  { value: "model output + interpretation", label: "Model Output + Interpretation" },
  { value: "decision brief", label: "Decision Brief" },
  { value: "design spec", label: "Design Specification" },
  { value: "experiment plan", label: "Experiment Plan" },
  { value: "systems leverage analysis", label: "Systems Leverage Analysis" },
  { value: "implementation plan", label: "Implementation Plan" },
  { value: "open", label: "Open — student choice within parameters" },
];

export default function TeacherInputForm({ onSubmit, isGenerating }: Props) {
  const [input, setInput] = useState<TeacherInput>({
    gradeBand: "6-8",
    topic: "",
    timeframe: "1 week",
    readiness: "mixed",
    constraints: "",
    artifactType: "",
    discipline: "",
  });
  const [savedTemplates, setSavedTemplates] = useState<SavedTemplate[]>([]);
  const [showTemplates, setShowTemplates] = useState(false);

  // Load preferences on mount
  useEffect(() => {
    const prefs = getPreferences();
    setInput((prev) => ({
      ...prev,
      gradeBand: prefs.savedDefaultGradeBand,
      timeframe: prefs.savedDefaultTimeframe,
      readiness: prefs.savedDefaultReadinessLevel,
      constraints: prefs.savedConstraints,
    }));
    setSavedTemplates(prefs.savedTemplates);
  }, []);

  const handleChange = <K extends keyof TeacherInput>(
    key: K,
    value: TeacherInput[K]
  ) => {
    setInput((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Auto-save defaults
    savePreferences({
      savedDefaultGradeBand: input.gradeBand,
      savedDefaultTimeframe: input.timeframe,
      savedDefaultReadinessLevel: input.readiness,
      savedConstraints: input.constraints,
    });
    onSubmit(input);
  };

  const loadTemplate = (template: SavedTemplate) => {
    setInput(template.input);
    setShowTemplates(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="text-3xl font-black tracking-tight text-slate-900">LEVER</span>
          <span className="text-xs font-semibold bg-slate-900 text-white px-2 py-0.5 rounded-full uppercase tracking-widest">
            Lesson Generator
          </span>
        </div>
        <p className="text-slate-500 text-sm max-w-md mx-auto">
          One prompt in → complete teacher plan + student materials packet. Powered by the LEVER learning framework.
        </p>
      </div>

      {/* Template bar */}
      {savedTemplates.length > 0 && (
        <div className="mb-4 flex justify-end">
          <button
            type="button"
            onClick={() => setShowTemplates(!showTemplates)}
            className="text-xs text-slate-500 hover:text-slate-800 underline"
          >
            {showTemplates ? "Hide saved templates" : `My templates (${savedTemplates.length})`}
          </button>
        </div>
      )}
      {showTemplates && (
        <div className="mb-6 bg-slate-50 border border-slate-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Saved Templates</p>
          <div className="space-y-2">
            {savedTemplates.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => loadTemplate(t)}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="font-medium text-sm text-slate-800">{t.name}</div>
                <div className="text-xs text-slate-400">
                  {t.input.gradeBand} · {t.input.discipline || "General"} · {t.input.timeframe}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Topic */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Topic or Standard
          </label>
          <textarea
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all bg-white placeholder:text-slate-300"
            rows={2}
            placeholder="e.g. 'Systems of equations' · 'The Civil Rights Movement' · 'Photosynthesis and cellular respiration' · 'CCSS.ELA-LITERACY.RI.8.8'"
            value={input.topic}
            onChange={(e) => handleChange("topic", e.target.value)}
          />
          <p className="text-xs text-slate-400 mt-1">Optional — LEVER will infer if left blank</p>
        </div>

        {/* Discipline */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Discipline / Subject Area
          </label>
          <input
            type="text"
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all bg-white placeholder:text-slate-300"
            placeholder="e.g. Math, ELA, Science, Social Studies, Art, Interdisciplinary..."
            value={input.discipline}
            onChange={(e) => handleChange("discipline", e.target.value)}
          />
        </div>

        {/* Grade Band + Timeframe row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Grade Band
            </label>
            <select
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
              value={input.gradeBand}
              onChange={(e) => handleChange("gradeBand", e.target.value as GradeBand)}
            >
              {GRADE_BANDS.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">
              Timeframe
            </label>
            <select
              className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
              value={input.timeframe}
              onChange={(e) => handleChange("timeframe", e.target.value as Timeframe)}
            >
              {TIMEFRAMES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Readiness */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Student Readiness
          </label>
          <div className="space-y-2">
            {READINESS_LEVELS.map(({ value, label }) => (
              <label
                key={value}
                className={`flex items-start gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                  input.readiness === value
                    ? "border-slate-900 bg-slate-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <input
                  type="radio"
                  name="readiness"
                  value={value}
                  checked={input.readiness === value}
                  onChange={() => handleChange("readiness", value)}
                  className="mt-0.5"
                />
                <span className="text-sm text-slate-700">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Constraints */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Classroom Constraints
          </label>
          <input
            type="text"
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all bg-white placeholder:text-slate-300"
            placeholder="e.g. 'No devices' · '45-min periods' · 'ELL students' · 'Limited materials'"
            value={input.constraints}
            onChange={(e) => handleChange("constraints", e.target.value)}
          />
        </div>

        {/* Artifact Type */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Desired Artifact
          </label>
          <select
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900 bg-white"
            value={input.artifactType}
            onChange={(e) => handleChange("artifactType", e.target.value as ArtifactType)}
          >
            {ARTIFACT_TYPES.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isGenerating}
          className="w-full bg-slate-900 text-white rounded-xl px-6 py-4 font-semibold text-sm tracking-wide hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generating with LEVER...
            </>
          ) : (
            <>
              <span>Generate Lesson + Materials</span>
              <span className="opacity-60">→</span>
            </>
          )}
        </button>

        {isGenerating && (
          <p className="text-center text-xs text-slate-400">
            LEVER is thinking deeply — this generates a full week of instruction and complete student materials
          </p>
        )}
      </form>
    </div>
  );
}
