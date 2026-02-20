"use client";

import { useEffect, useState } from "react";

const LEVER_PHASES = [
  { key: "L", label: "Leverage", color: "text-violet-600" },
  { key: "E", label: "Environment", color: "text-sky-600" },
  { key: "V", label: "Velocity", color: "text-emerald-600" },
  { key: "E2", label: "Execution", color: "text-amber-600" },
  { key: "R", label: "Repetition", color: "text-rose-600" },
];

const GENERATION_STAGES = [
  "Unpacking your topic into concepts, misconceptions, prerequisites...",
  "Mapping the LEVER learning arc (Leverage → Environment → Velocity → Execution → Repetition)...",
  "Designing Week 1 minimum viable learning experience...",
  "Generating facilitation moves, talk moves, and conference prompts...",
  "Building differentiation pathways (novice → intermediate → advanced)...",
  "Creating Quick Readers at 3 reading levels...",
  "Assembling research pack with note-catcher and synthesis organizer...",
  "Building thinking and journaling tools...",
  "Writing integrated writing tasks...",
  "Selecting and adapting activity protocols...",
  "Designing the artifact plan...",
  "Running quality guardrails (anti-deficit, anti-worksheet, bias check)...",
  "Finalizing your complete lesson and materials packet...",
];

interface Props {
  tokenCount?: number;
}

export default function GenerationProgress({ tokenCount }: Props) {
  const [stageIndex, setStageIndex] = useState(0);
  const [activeLever, setActiveLever] = useState(0);
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const stageTimer = setInterval(() => {
      setStageIndex((i) => (i + 1) % GENERATION_STAGES.length);
    }, 2800);
    const leverTimer = setInterval(() => {
      setActiveLever((i) => (i + 1) % LEVER_PHASES.length);
    }, 1200);
    const dotsTimer = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "." : d + "."));
    }, 500);
    return () => {
      clearInterval(stageTimer);
      clearInterval(leverTimer);
      clearInterval(dotsTimer);
    };
  }, []);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-8">
      {/* LEVER animated letters */}
      <div className="flex gap-4 mb-8">
        {LEVER_PHASES.map((phase, i) => (
          <div key={phase.key} className="flex flex-col items-center gap-1">
            <span
              className={`text-3xl font-black transition-all duration-500 ${
                i === activeLever
                  ? `${phase.color} scale-125`
                  : "text-slate-200 scale-100"
              }`}
            >
              {phase.key === "E2" ? "E" : phase.key}
            </span>
            <span
              className={`text-xs font-medium transition-all duration-300 ${
                i === activeLever ? phase.color : "text-slate-300"
              }`}
            >
              {phase.label}
            </span>
          </div>
        ))}
      </div>

      {/* Stage description */}
      <div className="max-w-md">
        <p className="text-slate-500 text-sm leading-relaxed min-h-[2.5rem] transition-all">
          {GENERATION_STAGES[stageIndex]}
        </p>
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-pulse"
                style={{ animationDelay: `${i * 200}ms` }}
              />
            ))}
          </div>
          <span className="text-xs text-slate-400">Generating with Claude Opus</span>
        </div>
        {tokenCount && tokenCount > 0 && (
          <p className="text-xs text-slate-300 mt-2">{tokenCount.toLocaleString()} tokens generated</p>
        )}
      </div>

      <div className="mt-10 text-xs text-slate-300 max-w-xs leading-relaxed">
        LEVER is thinking deeply — generating a complete week of instruction plus full student materials takes a moment.
      </div>
    </div>
  );
}
