"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, BookOpen, Presentation, ArrowRight, Sparkles } from "lucide-react";

const previewCards = [
  {
    icon: BookOpen,
    title: "Teacher Planning Guide",
    description:
      "Standards-aligned facilitation guide with inquiry sequence, discussion prompts, and differentiation strategies",
  },
  {
    icon: FileText,
    title: "Standards Alignment Map",
    description:
      "Cross-walked to your country\u2019s national curriculum framework with evidence-based pedagogical connections",
  },
  {
    icon: Presentation,
    title: "Student Materials Pack",
    description:
      "Engaging slides, activity sheets, rubrics, and reflection prompts ready for classroom use",
  },
];

function AnimatedCheck() {
  return (
    <motion.svg viewBox="0 0 24 24" className="h-3 w-3">
      <motion.path
        d="M5 13l4 4L19 7"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </motion.svg>
  );
}

export function DemoGenerator() {
  const [topic, setTopic] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  const handleGenerate = useCallback(() => {
    if (!topic.trim() || isGenerating) return;
    setIsGenerating(true);
    setShowPreview(false);
    setTypedText("");
    setCurrentStep(0);

    const fullText = `Generating inquiry unit for "${topic}"...`;
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
        setIsGenerating(false);
        setShowPreview(true);
      }
    }, 40);

    setTimeout(() => setCurrentStep(1), 800);
    setTimeout(() => setCurrentStep(2), 1600);
    setTimeout(() => setCurrentStep(3), 2400);
  }, [topic, isGenerating]);

  return (
    <>
      {/* Terminal chrome */}
      <div className="mb-4 flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <div className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto rounded-md bg-[#0f172a]/5 px-12 py-1">
          <span className="font-mono text-xs text-[#475569]/60">
            inquirygen.app/preview
          </span>
        </div>
        <div className="w-[52px]" />
      </div>

      {/* Input row */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Sparkles className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#475569]/40" />
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            placeholder="Enter a topic... e.g., Ocean Ecosystems"
            className="w-full rounded-lg border border-[#0f172a]/10 bg-[#0f172a]/[0.03] py-3 pr-4 pl-10 text-sm text-[#0f172a] placeholder:text-[#475569]/40 focus:border-[#10b981]/50 focus:outline-none focus:ring-2 focus:ring-[#10b981]/30"
          />
        </div>
        <button
          onClick={handleGenerate}
          disabled={isGenerating || !topic.trim()}
          className="btn-glow whitespace-nowrap rounded-lg bg-gradient-to-r from-[#10b981] to-[#059669] px-5 py-3 text-sm font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isGenerating ? "Generating..." : "Generate Preview"}
        </button>
      </div>

      {/* Typing output */}
      {(isGenerating || showPreview) && (
        <div className="terminal-scanline mt-4 rounded-lg border border-[#0f172a]/5 bg-[#0f172a]/[0.02] p-4">
          <p className="font-mono text-sm text-[#10b981]">
            {typedText}
            {isGenerating && <span className="animate-pulse">|</span>}
          </p>

          {isGenerating && (
            <>
              <div className="mt-3 flex gap-4 text-xs text-[#475569]/60">
                {["Analyzing topic", "Mapping standards", "Building materials"].map(
                  (step, i) => (
                    <span
                      key={step}
                      className={`flex items-center gap-1.5 transition-all duration-300 ${
                        currentStep > i ? "text-[#10b981]" : ""
                      }`}
                    >
                      <span
                        className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                          currentStep > i
                            ? "bg-[#10b981] text-white shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                            : "bg-[#0f172a]/10 text-[#475569]/60"
                        }`}
                      >
                        {currentStep > i ? <AnimatedCheck /> : i + 1}
                      </span>
                      {step}
                    </span>
                  ),
                )}
              </div>

              <div className="mt-3">
                <div className="h-1 overflow-hidden rounded-full bg-[#0f172a]/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#10b981] to-[#34d399]"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(currentStep / 3) * 100}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Preview cards */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mt-4"
          >
            <div className="grid gap-3">
              {previewCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15, duration: 0.4 }}
                  className="liquid-glass-subtle flex items-start gap-3 p-4"
                >
                  <div className="rounded-md bg-[#10b981]/10 p-2">
                    <card.icon className="h-4 w-4 text-[#10b981]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-[#0f172a]">{card.title}</h4>
                    <p className="mt-1 text-xs text-[#475569]">
                      {card.description} for &ldquo;{topic}&rdquo;
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 rounded-lg border border-[#10b981]/20 bg-[#10b981]/5 p-3 text-center">
              <p className="text-sm text-[#10b981]">
                Preview Mode &mdash; Subscribe to generate full lessons.
              </p>
              <a
                href="#pricing"
                className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[#0f172a] transition-colors hover:text-[#10b981]"
              >
                Subscribe to Generate Full Lessons{" "}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
