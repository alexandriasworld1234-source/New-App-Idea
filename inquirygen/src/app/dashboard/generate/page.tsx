"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ArrowLeft, Clock, BookOpen } from "lucide-react";

const INQUIRY_MODELS = [
  {
    value: "kath_murdoch",
    label: "Kath Murdoch Inquiry Cycle",
    origin: "IB / Australia",
    description:
      "Tuning In \u2192 Finding Out \u2192 Sorting Out \u2192 Going Further \u2192 Making Conclusions \u2192 Taking Action. A globally trusted cycle used across IB PYP schools.",
  },
  {
    value: "phenomenon_based",
    label: "Phenomenon-Based Learning",
    origin: "Finland / NGSS",
    description:
      "Anchored in real-world phenomena. Students observe, question, investigate, model, and explain \u2014 following the Finnish EDUFI and NGSS storyline approach.",
  },
  {
    value: "design_thinking",
    label: "Design Thinking / LAUNCH Cycle",
    origin: "Global / Stanford d.school",
    description:
      "Empathize \u2192 Define \u2192 Ideate \u2192 Prototype \u2192 Test. Students solve real problems through iterative human-centered design.",
  },
  {
    value: "five_e",
    label: "5E Instructional Model",
    origin: "BSCS / Global",
    description:
      "Engage \u2192 Explore \u2192 Explain \u2192 Elaborate \u2192 Evaluate. A research-based sequence used worldwide for structured science inquiry.",
  },
] as const;

const PROJECT_DURATIONS = [
  {
    code: "mini",
    label: "Mini-Inquiry",
    time: "1\u20132 days",
    description: "Focused, single-concept inquiry. One investigation cycle with quick reflection.",
  },
  {
    code: "short",
    label: "Short Project",
    time: "3\u20135 days",
    description: "Complete inquiry cycle with one investigation and structured reflection.",
  },
  {
    code: "standard",
    label: "Standard Unit",
    time: "1\u20132 weeks",
    description: "Full inquiry unit with multiple investigations, peer critique, and substantive assessment.",
  },
  {
    code: "extended",
    label: "Extended Project",
    time: "3\u20134 weeks",
    description: "Deep inquiry with multiple investigation cycles, iterative revision, and community connections.",
  },
  {
    code: "deep",
    label: "Deep Dive",
    time: "6\u20138 weeks",
    description: "Sustained inquiry across multiple disciplines with portfolio-based assessment.",
  },
] as const;

const SUBJECTS = [
  "Science",
  "Mathematics",
  "ELA / English",
  "Social Studies",
  "STEAM",
  "Health / PE",
  "Art",
  "Other",
];

const GRADE_LEVELS = [
  "K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12",
];

const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "CA", name: "Canada" },
  { code: "FI", name: "Finland" },
  { code: "NZ", name: "New Zealand" },
  { code: "SG", name: "Singapore" },
  { code: "IE", name: "Ireland" },
  { code: "DE", name: "Germany" },
  { code: "KE", name: "Kenya" },
  { code: "RW", name: "Rwanda" },
  { code: "MY", name: "Malaysia" },
  { code: "EE", name: "Estonia" },
  { code: "OTHER", name: "Other" },
];

const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho",
  "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
  "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York",
  "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
  "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
  "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
];

type FormData = {
  topic: string;
  subject: string;
  gradeLevel: string;
  country: string;
  state: string;
  inquiryModel: string;
  projectDuration: string;
  additionalContext: string;
};

export default function GeneratePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    topic: "",
    subject: "",
    gradeLevel: "",
    country: "",
    state: "",
    inquiryModel: "",
    projectDuration: "standard",
    additionalContext: "",
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.topic.trim().length >= 3 && formData.subject !== "";
      case 2:
        return formData.gradeLevel !== "" && formData.country !== "";
      case 3:
        return formData.inquiryModel !== "";
      case 4:
        return formData.projectDuration !== "";
      default:
        return true;
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const response = await fetch("/api/generate/unit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: formData.topic,
          gradeLevel: formData.gradeLevel,
          subject: formData.subject,
          country: formData.country,
          state: formData.state || undefined,
          inquiryModel: formData.inquiryModel,
          projectDuration: formData.projectDuration,
          standardsFramework: formData.country === "US" ? "ngss" : "custom",
          selectedStandards: [],
          additionalContext: formData.additionalContext || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Generation failed");
      }

      router.push(`/dashboard/units/${data.generationId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setIsGenerating(false);
    }
  };

  const totalSteps = 5;

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Generate a Unit</h1>
        <p className="mt-1 text-muted-foreground">
          Tell us what you want to teach and we will create a complete
          inquiry-based unit.
        </p>
      </div>

      {/* Progress steps */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
          <div key={s} className="flex items-center gap-2">
            <motion.div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                s === step
                  ? "bg-[#10b981] text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  : s < step
                    ? "bg-[#10b981]/20 text-[#10b981]"
                    : "bg-secondary text-muted-foreground"
              }`}
              animate={s === step ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {s}
            </motion.div>
            {s < totalSteps && (
              <div className="relative h-0.5 w-6 bg-border">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#10b981] to-[#34d399]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: s < step ? 1 : 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  style={{ transformOrigin: "left" }}
                />
              </div>
            )}
          </div>
        ))}
        <span className="ml-2 text-sm text-muted-foreground">
          {step === 1 && "Topic & Subject"}
          {step === 2 && "Grade & Location"}
          {step === 3 && "Inquiry Model"}
          {step === 4 && "Project Duration"}
          {step === 5 && "Review & Generate"}
        </span>
      </div>

      {/* Step 1: Topic & Subject */}
      {step === 1 && (
        <div className="space-y-6 rounded-xl border border-border bg-card p-6">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="topic">
              What topic do you want to teach?
            </label>
            <input
              id="topic"
              type="text"
              placeholder="e.g., Ecosystems and food webs, The water cycle, Fractions and decimals..."
              value={formData.topic}
              onChange={(e) => updateField("topic", e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Subject Area</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {SUBJECTS.map((subject) => (
                <button
                  key={subject}
                  onClick={() => updateField("subject", subject)}
                  className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                    formData.subject === subject
                      ? "border-[#10b981] bg-[#10b981]/10 text-[#10b981]"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Grade & Location */}
      {step === 2 && (
        <div className="space-y-6 rounded-xl border border-border bg-card p-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Grade Level</label>
            <div className="flex flex-wrap gap-2">
              {GRADE_LEVELS.map((grade) => (
                <button
                  key={grade}
                  onClick={() => updateField("gradeLevel", grade)}
                  className={`rounded-lg border px-4 py-2 text-sm transition-colors ${
                    formData.gradeLevel === grade
                      ? "border-[#10b981] bg-[#10b981]/10 text-[#10b981]"
                      : "border-border hover:bg-secondary"
                  }`}
                >
                  {grade === "K" ? "K" : `Grade ${grade}`}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="country">
              Country
            </label>
            <select
              id="country"
              value={formData.country}
              onChange={(e) => {
                updateField("country", e.target.value);
                updateField("state", "");
              }}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">Select your country</option>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          {formData.country === "US" && (
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="state">
                State
              </label>
              <select
                id="state"
                value={formData.state}
                onChange={(e) => updateField("state", e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">Select your state</option>
                {US_STATES.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Inquiry Model */}
      {step === 3 && (
        <div className="space-y-6 rounded-xl border border-border bg-card p-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <label className="text-sm font-medium">
                Choose an Inquiry Model
              </label>
            </div>
            <p className="text-sm text-muted-foreground">
              This determines the pedagogical framework for your unit. Each model draws from world-class inquiry traditions.
            </p>
          </div>
          <div className="space-y-3">
            {INQUIRY_MODELS.map((model) => (
              <button
                key={model.value}
                onClick={() => updateField("inquiryModel", model.value)}
                className={`w-full rounded-xl border p-4 text-left transition-all ${
                  formData.inquiryModel === model.value
                    ? "border-[#10b981] bg-[#10b981]/5 ring-1 ring-[#10b981] shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                    : "border-border hover:bg-secondary"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium">{model.label}</p>
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">
                    {model.origin}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {model.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4: Project Duration */}
      {step === 4 && (
        <div className="space-y-6 rounded-xl border border-border bg-card p-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <label className="text-sm font-medium">
                Project Duration
              </label>
            </div>
            <p className="text-sm text-muted-foreground">
              How long do you want this unit to run? This affects depth of inquiry, protocol complexity, and number of assessment checkpoints.
            </p>
          </div>
          <div className="space-y-3">
            {PROJECT_DURATIONS.map((duration) => (
              <button
                key={duration.code}
                onClick={() => updateField("projectDuration", duration.code)}
                className={`w-full rounded-xl border p-4 text-left transition-all ${
                  formData.projectDuration === duration.code
                    ? "border-[#10b981] bg-[#10b981]/5 ring-1 ring-[#10b981] shadow-[0_0_15px_rgba(16,185,129,0.1)]"
                    : "border-border hover:bg-secondary"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium">{duration.label}</p>
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {duration.time}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {duration.description}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 5: Review */}
      {step === 5 && (
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="font-semibold">Review Your Unit</h3>
            <dl className="mt-4 space-y-3">
              <div className="flex justify-between">
                <dt className="text-sm text-muted-foreground">Topic</dt>
                <dd className="text-sm font-medium">{formData.topic}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-muted-foreground">Subject</dt>
                <dd className="text-sm font-medium">{formData.subject}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-muted-foreground">Grade</dt>
                <dd className="text-sm font-medium">
                  {formData.gradeLevel === "K"
                    ? "Kindergarten"
                    : `Grade ${formData.gradeLevel}`}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-muted-foreground">Location</dt>
                <dd className="text-sm font-medium">
                  {COUNTRIES.find((c) => c.code === formData.country)?.name}
                  {formData.state ? `, ${formData.state}` : ""}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-muted-foreground">Inquiry Model</dt>
                <dd className="text-sm font-medium">
                  {
                    INQUIRY_MODELS.find(
                      (m) => m.value === formData.inquiryModel
                    )?.label
                  }
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-muted-foreground">Duration</dt>
                <dd className="text-sm font-medium">
                  {
                    PROJECT_DURATIONS.find(
                      (d) => d.code === formData.projectDuration
                    )?.label
                  }{" "}
                  <span className="text-muted-foreground">
                    ({
                      PROJECT_DURATIONS.find(
                        (d) => d.code === formData.projectDuration
                      )?.time
                    })
                  </span>
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <label
              className="text-sm font-medium"
              htmlFor="additionalContext"
            >
              Additional instructions (optional)
            </label>
            <p className="mt-1 text-sm text-muted-foreground">
              Any specific requirements, focus areas, or customizations?
            </p>
            <textarea
              id="additionalContext"
              rows={4}
              placeholder="e.g., Focus on local ecosystems in our region, include bilingual vocabulary, emphasize engineering design, connect to community issues..."
              value={formData.additionalContext}
              onChange={(e) =>
                updateField("additionalContext", e.target.value)
              }
              className="mt-3 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Estimated cost</p>
                <p className="text-xs text-muted-foreground">
                  ~39 credits for a full unit generation
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary">39 credits</p>
                <p className="text-xs text-muted-foreground">
                  Balance: 50 credits
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-destructive/50 bg-destructive/10 p-4">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {step < totalSteps ? (
          <button
            onClick={() => setStep((s) => Math.min(totalSteps, s + 1))}
            disabled={!canProceed()}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Generate Unit
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
