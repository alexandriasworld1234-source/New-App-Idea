"use client";

import { useState } from "react";
import { GenerationOutput } from "@/types";
import { addFeedback, saveTemplate } from "@/lib/preferences";
import {
  exportTeacherPlanText,
  exportStudentPacketText,
  exportFullJSON,
} from "@/lib/export";

interface Props {
  output: GenerationOutput;
  onSaveTemplate?: () => void;
}

const FEEDBACK_TAGS = [
  "Too hard",
  "Too easy",
  "More student agency",
  "More structure",
  "More writing",
  "More discussion",
  "More modeling",
  "Less AI",
  "Different protocols",
];

export default function FeedbackBar({ output, onSaveTemplate }: Props) {
  const [feedbackGiven, setFeedbackGiven] = useState<"up" | "down" | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showTagPicker, setShowTagPicker] = useState(false);
  const [showSaveTemplate, setShowSaveTemplate] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [templateNotes, setTemplateNotes] = useState("");
  const [saved, setSaved] = useState(false);

  const handleFeedback = (rating: "up" | "down") => {
    setFeedbackGiven(rating);
    setShowTagPicker(true);
    addFeedback(
      output.teacherPlan.standardOrTopic,
      rating === "up" ? "thumbs-up" : "thumbs-down",
      selectedTags
    );
  };

  const handleTagToggle = (tag: string) => {
    const next = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(next);
    // Update the last feedback entry with tags
    addFeedback(
      output.teacherPlan.standardOrTopic,
      feedbackGiven === "up" ? "thumbs-up" : "thumbs-down",
      next
    );
  };

  const handleSaveTemplate = () => {
    if (!templateName.trim()) return;
    saveTemplate(templateName, output.inputSummary, templateNotes);
    setSaved(true);
    setShowSaveTemplate(false);
    onSaveTemplate?.();
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-4">
      {/* Export Row */}
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
          Export
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => exportTeacherPlanText(output)}
            className="flex items-center gap-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg px-3 py-2 transition-colors"
          >
            <span>📄</span>
            <span>Teacher Plan</span>
          </button>
          <button
            onClick={() => exportStudentPacketText(output)}
            className="flex items-center gap-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg px-3 py-2 transition-colors"
          >
            <span>📚</span>
            <span>Student Packet</span>
          </button>
          <button
            onClick={() => exportFullJSON(output)}
            className="flex items-center gap-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg px-3 py-2 transition-colors"
          >
            <span>💾</span>
            <span>Full JSON</span>
          </button>
        </div>
      </div>

      {/* Save as Template */}
      <div>
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
            Save as Template
          </p>
          {saved && (
            <span className="text-xs text-emerald-600 font-medium">✓ Saved!</span>
          )}
        </div>
        {!showSaveTemplate ? (
          <button
            onClick={() => setShowSaveTemplate(true)}
            className="mt-2 text-xs text-slate-500 hover:text-slate-800 underline"
          >
            I like this — save as template →
          </button>
        ) : (
          <div className="mt-2 space-y-2">
            <input
              type="text"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
              placeholder="Template name (e.g. 'Week 1 Systems Thinking 8th')"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
            />
            <input
              type="text"
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-slate-400 text-slate-500"
              placeholder="Notes (optional)"
              value={templateNotes}
              onChange={(e) => setTemplateNotes(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveTemplate}
                disabled={!templateName.trim()}
                className="text-xs bg-slate-900 text-white rounded-lg px-3 py-1.5 disabled:opacity-40"
              >
                Save
              </button>
              <button
                onClick={() => setShowSaveTemplate(false)}
                className="text-xs text-slate-400 hover:text-slate-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Feedback */}
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
          Feedback
        </p>
        {!feedbackGiven ? (
          <div className="flex gap-2">
            <button
              onClick={() => handleFeedback("up")}
              className="text-lg hover:scale-110 transition-transform"
              title="This worked well"
              aria-label="Thumbs up — this worked well"
            >
              👍
            </button>
            <button
              onClick={() => handleFeedback("down")}
              className="text-lg hover:scale-110 transition-transform"
              title="This needs adjustment"
              aria-label="Thumbs down — this needs adjustment"
            >
              👎
            </button>
          </div>
        ) : (
          <p className="text-xs text-slate-400">
            {feedbackGiven === "up" ? "👍 Glad it worked!" : "👎 Noted — LEVER will tune this."}
          </p>
        )}

        {showTagPicker && (
          <div className="mt-3">
            <p className="text-xs text-slate-400 mb-2">What would improve it? (optional)</p>
            <div className="flex flex-wrap gap-1.5">
              {FEEDBACK_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagToggle(tag)}
                  className={`text-xs rounded-full px-2.5 py-1 transition-colors ${
                    selectedTags.includes(tag)
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
