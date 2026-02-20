"use client";

import { TeacherPlan, LEVERPhase } from "@/types";

interface Props {
  plan: TeacherPlan;
}

const LEVER_COLORS: Record<string, string> = {
  Leverage: "bg-violet-50 border-violet-200 text-violet-800",
  Environment: "bg-sky-50 border-sky-200 text-sky-800",
  Velocity: "bg-emerald-50 border-emerald-200 text-emerald-800",
  Execution: "bg-amber-50 border-amber-200 text-amber-800",
  Repetition: "bg-rose-50 border-rose-200 text-rose-800",
};

const LEVER_DOTS: Record<string, string> = {
  Leverage: "bg-violet-500",
  Environment: "bg-sky-500",
  Velocity: "bg-emerald-500",
  Execution: "bg-amber-500",
  Repetition: "bg-rose-500",
};

function PhaseCard({ phase }: { phase: LEVERPhase }) {
  const color = LEVER_COLORS[phase.phase] || "bg-slate-50 border-slate-200 text-slate-800";
  const dot = LEVER_DOTS[phase.phase] || "bg-slate-500";

  return (
    <div className={`rounded-xl border p-5 ${color}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${dot}`} />
          <span className="font-bold text-sm uppercase tracking-wider">{phase.phase}</span>
        </div>
        <span className="text-xs opacity-60">{phase.timeEstimate}</span>
      </div>
      <p className="text-sm mb-3 opacity-80">{phase.description}</p>
      <div className="mb-2">
        <p className="text-xs font-semibold uppercase tracking-wide opacity-60 mb-1">Teacher Moves</p>
        <ul className="space-y-0.5">
          {phase.teacherMoves.map((m, i) => (
            <li key={i} className="text-xs flex gap-1.5">
              <span className="opacity-40 mt-0.5">→</span>
              <span>{m}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-2">
        <p className="text-xs font-semibold uppercase tracking-wide opacity-60 mb-1">Students</p>
        <p className="text-xs">{phase.studentActivity}</p>
      </div>
      {phase.protocols.length > 0 && (
        <div className="flex gap-1.5 flex-wrap mt-3">
          {phase.protocols.map((p) => (
            <span key={p} className="text-xs bg-white/60 rounded-full px-2 py-0.5 font-medium">
              {p}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Pill({ text }: { text: string }) {
  return (
    <span className="inline-block bg-slate-100 text-slate-700 text-xs rounded-lg px-3 py-1.5 mr-2 mb-2">
      {text}
    </span>
  );
}

export default function TeacherPlanView({ plan }: Props) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-slate-900 text-white rounded-2xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-slate-400 text-xs uppercase tracking-widest mb-1">Teacher Plan</p>
            <h2 className="text-xl font-bold leading-tight mb-1">{plan.standardOrTopic}</h2>
            <div className="flex gap-3 text-sm text-slate-300 mt-2">
              <span>{plan.discipline}</span>
              <span>·</span>
              <span>{plan.gradeBand}</span>
              <span>·</span>
              <span>{plan.timeframe}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Concept Unpacking */}
      <Section title="Concept Unpacking">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-100 rounded-xl p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Core Concepts</p>
            <ul className="space-y-1">
              {plan.unpacking.coreConcepts.map((c, i) => (
                <li key={i} className="text-sm flex gap-2">
                  <span className="text-slate-300 mt-0.5">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-xl p-4">
            <p className="text-xs font-semibold text-red-500 uppercase tracking-wide mb-2">Common Misconceptions</p>
            <ul className="space-y-1">
              {plan.unpacking.misconceptions.map((m, i) => (
                <li key={i} className="text-sm flex gap-2">
                  <span className="text-red-300 mt-0.5">!</span>
                  <span className="text-red-800">{m}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-slate-100 rounded-xl p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Prerequisites</p>
            <ul className="space-y-1">
              {plan.unpacking.prerequisiteKnowledge.map((k, i) => (
                <li key={i} className="text-sm flex gap-2">
                  <span className="text-slate-300 mt-0.5">•</span>
                  <span>{k}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
            <p className="text-xs font-semibold text-emerald-600 uppercase tracking-wide mb-2">Success Evidence</p>
            <ul className="space-y-1">
              {plan.unpacking.successEvidence.map((s, i) => (
                <li key={i} className="text-sm flex gap-2">
                  <span className="text-emerald-400 mt-0.5">✓</span>
                  <span className="text-emerald-900">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {plan.unpacking.transferTargets.length > 0 && (
          <div className="mt-3">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Transfer Targets</p>
            <div>
              {plan.unpacking.transferTargets.map((t, i) => (
                <Pill key={i} text={t} />
              ))}
            </div>
          </div>
        )}
      </Section>

      {/* LEVER Arc */}
      <Section title="LEVER Learning Arc">
        <div className="space-y-3">
          {plan.leverArc.map((phase, i) => (
            <PhaseCard key={i} phase={phase} />
          ))}
        </div>
      </Section>

      {/* Week 1 MVLE */}
      <Section title="Week 1 — Minimum Viable Learning Experience">
        <div className="bg-slate-900 text-white rounded-xl p-5">
          <p className="text-sm leading-relaxed">{plan.week1MVLE}</p>
        </div>
      </Section>

      {/* Facilitation Moves */}
      <Section title="Facilitation Moves">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-100 rounded-xl p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Generative Questions</p>
            <ul className="space-y-2">
              {plan.facilitationMoves.questions.map((q, i) => (
                <li key={i} className="text-sm bg-slate-50 rounded-lg px-3 py-2 italic text-slate-700">
                  "{q}"
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <div className="bg-white border border-slate-100 rounded-xl p-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Talk Moves</p>
              <ul className="space-y-1">
                {plan.facilitationMoves.talkMoves.map((m, i) => (
                  <li key={i} className="text-sm flex gap-2">
                    <span className="text-slate-300">→</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-slate-100 rounded-xl p-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Conference Prompts</p>
              <ul className="space-y-1">
                {plan.facilitationMoves.miniConferencePrompts.map((m, i) => (
                  <li key={i} className="text-sm flex gap-2">
                    <span className="text-slate-300">→</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Differentiation */}
      <Section title="Differentiation">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-sky-50 border border-sky-100 rounded-xl p-4">
            <p className="text-xs font-bold text-sky-600 uppercase tracking-wide mb-2">Novice Supports</p>
            <ul className="space-y-1.5">
              {plan.differentiation.novice.map((d, i) => (
                <li key={i} className="text-xs text-sky-900">{d}</li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">Intermediate</p>
            <ul className="space-y-1.5">
              {plan.differentiation.intermediate.map((d, i) => (
                <li key={i} className="text-xs text-slate-700">{d}</li>
              ))}
            </ul>
          </div>
          <div className="bg-violet-50 border border-violet-100 rounded-xl p-4">
            <p className="text-xs font-bold text-violet-600 uppercase tracking-wide mb-2">Advanced</p>
            <ul className="space-y-1.5">
              {plan.differentiation.advanced.map((d, i) => (
                <li key={i} className="text-xs text-violet-900">{d}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Micro-Lessons */}
      {plan.microLessons.length > 0 && (
        <Section title="Micro-Lessons (for Misconceptions)">
          <div className="space-y-3">
            {plan.microLessons.map((ml, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-semibold text-red-700">↯ {ml.targetMisconception}</p>
                  <span className="text-xs text-slate-400 bg-slate-100 rounded-full px-2 py-0.5">{ml.duration}</span>
                </div>
                <p className="text-xs text-slate-500 mb-2">{ml.approach}</p>
                <ol className="space-y-1">
                  {ml.steps.map((s, j) => (
                    <li key={j} className="text-xs flex gap-2">
                      <span className="text-slate-400 font-mono w-4 flex-shrink-0">{j + 1}.</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
