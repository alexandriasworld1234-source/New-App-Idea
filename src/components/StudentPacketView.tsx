"use client";

import { useState } from "react";
import { StudentPacket, QuickReader, ThinkingTool, WritingTask, ActivityProtocol } from "@/types";

interface Props {
  packet: StudentPacket;
}

const TABS = [
  { id: "readers", label: "Quick Readers" },
  { id: "research", label: "Research Pack" },
  { id: "thinking", label: "Thinking Tools" },
  { id: "writing", label: "Writing" },
  { id: "protocols", label: "Protocols" },
  { id: "artifact", label: "Artifact Plan" },
] as const;

type TabId = (typeof TABS)[number]["id"];

const READER_COLORS: Record<string, string> = {
  A: "border-sky-200 bg-sky-50",
  B: "border-slate-200 bg-white",
  C: "border-violet-200 bg-violet-50",
};

const READER_BADGE: Record<string, string> = {
  A: "bg-sky-100 text-sky-700",
  B: "bg-slate-100 text-slate-700",
  C: "bg-violet-100 text-violet-700",
};

const TOOL_ICONS: Record<string, string> = {
  "sensemaking-map": "🗺",
  "hypothesis-builder": "🔬",
  "systems-map": "🔄",
  "evidence-log": "📋",
  "decision-log": "⚖️",
  reflection: "🪞",
  "goal-setting": "🎯",
};

function ReaderCard({ reader }: { reader: QuickReader }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-xl border p-5 ${READER_COLORS[reader.level]}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${READER_BADGE[reader.level]}`}>
            Level {reader.level} — {reader.levelLabel}
          </span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="text-xs text-slate-400 hover:text-slate-700"
        >
          {open ? "Collapse" : "Expand"}
        </button>
      </div>
      <h4 className="font-semibold text-slate-800 mb-2">{reader.title}</h4>
      {open && (
        <>
          <p className="text-sm text-slate-700 leading-relaxed mb-4 whitespace-pre-wrap">
            {reader.body}
          </p>
          {reader.vocabularySupports.length > 0 && (
            <div className="mb-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                Key Vocabulary
              </p>
              <div className="flex flex-wrap gap-2">
                {reader.vocabularySupports.map((v, i) => (
                  <div key={i} className="bg-white rounded-lg px-3 py-1.5 text-xs border border-slate-200">
                    <span className="font-semibold">{v.term}</span>
                    <span className="text-slate-400"> — </span>
                    <span className="text-slate-600">{v.definition}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Thinking Prompts
            </p>
            <ul className="space-y-1.5">
              {reader.comprehensionPrompts.map((p, i) => (
                <li key={i} className="text-sm bg-white/70 rounded-lg px-3 py-2 text-slate-700">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      {!open && (
        <p className="text-sm text-slate-500 line-clamp-2">{reader.body}</p>
      )}
    </div>
  );
}

function ThinkingToolCard({ tool }: { tool: ThinkingTool }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-5">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span>{TOOL_ICONS[tool.type] || "🧠"}</span>
          <span className="font-semibold text-sm text-slate-800">{tool.name}</span>
        </div>
        <button onClick={() => setOpen(!open)} className="text-xs text-slate-400 hover:text-slate-700">
          {open ? "Collapse" : "Open Tool"}
        </button>
      </div>
      <p className="text-xs text-slate-500 mb-2">{tool.instructions}</p>
      {open && (
        <div className="mt-3 bg-slate-50 rounded-lg p-4 font-mono text-xs text-slate-700 whitespace-pre-wrap leading-relaxed">
          {tool.template}
        </div>
      )}
    </div>
  );
}

function WritingCard({ task }: { task: WritingTask }) {
  const TYPE_COLORS: Record<string, string> = {
    "constructed-response": "bg-amber-50 border-amber-200",
    "argument-from-evidence": "bg-blue-50 border-blue-200",
    "explanatory": "bg-emerald-50 border-emerald-200",
    "narrative-reflection": "bg-pink-50 border-pink-200",
    "executive-memo": "bg-slate-50 border-slate-200",
  };
  const colorClass = TYPE_COLORS[task.type] || "bg-slate-50 border-slate-200";
  return (
    <div className={`rounded-xl border p-5 ${colorClass}`}>
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">{task.label}</p>
      <p className="text-sm font-medium text-slate-800 mb-3">{task.prompt}</p>
      <div className="bg-white/70 rounded-lg p-3 mb-3">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Scaffold</p>
        <p className="text-xs text-slate-600 whitespace-pre-wrap">{task.scaffold}</p>
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Quality Criteria</p>
        <ul className="space-y-0.5">
          {task.criteriaForQuality.map((c, i) => (
            <li key={i} className="text-xs flex gap-1.5">
              <span className="text-slate-300">✓</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ProtocolCard({ protocol }: { protocol: ActivityProtocol }) {
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold text-sm text-slate-800">{protocol.name}</p>
          <p className="text-xs text-slate-400">{protocol.tradition} · {protocol.timeframe}</p>
        </div>
      </div>
      <p className="text-xs text-slate-500 mb-3 italic">{protocol.purpose}</p>
      <div className="mb-3">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Steps</p>
        <ol className="space-y-1">
          {protocol.steps.map((s, i) => (
            <li key={i} className="text-xs flex gap-2">
              <span className="text-slate-400 font-mono w-4 flex-shrink-0">{i + 1}.</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </div>
      {protocol.materials.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {protocol.materials.map((m, i) => (
            <span key={i} className="text-xs bg-slate-100 rounded-full px-2 py-0.5">{m}</span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function StudentPacketView({ packet }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("readers");

  return (
    <div>
      {/* Tab Bar */}
      <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === tab.id
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-500 hover:bg-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "readers" && (
        <div className="space-y-4">
          <p className="text-xs text-slate-400 mb-4">
            Three reading levels on the same topic. Click "Expand" to read. All readings center student thinking — not just content recall.
          </p>
          {packet.quickReaders.map((r, i) => (
            <ReaderCard key={i} reader={r} />
          ))}
        </div>
      )}

      {activeTab === "research" && (
        <div className="space-y-5">
          <div className="bg-white border border-slate-100 rounded-xl p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Keyword Searches</p>
            <div className="flex flex-wrap gap-2">
              {packet.researchPack.keywordSearches.map((k, i) => (
                <span key={i} className="bg-slate-100 text-slate-700 text-xs rounded-lg px-3 py-1.5 font-mono">
                  "{k}"
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white border border-slate-100 rounded-xl p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Source Type Guidance</p>
            <ul className="space-y-1.5">
              {packet.researchPack.sourceTypeGuidance.map((g, i) => (
                <li key={i} className="text-sm flex gap-2">
                  <span className="text-slate-300">•</span>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-slate-100 rounded-xl p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Credibility Checklist</p>
            <ul className="space-y-1.5">
              {packet.researchPack.credibilityChecklist.map((c, i) => (
                <li key={i} className="text-sm flex gap-2">
                  <span className="text-slate-400">☐</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Note-Catcher Template</p>
            <pre className="text-xs text-slate-600 whitespace-pre-wrap font-mono leading-relaxed">
              {packet.researchPack.noteCatcherTemplate}
            </pre>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Synthesis Organizer</p>
            <pre className="text-xs text-slate-600 whitespace-pre-wrap font-mono leading-relaxed">
              {packet.researchPack.synthesisOrganizer}
            </pre>
          </div>
        </div>
      )}

      {activeTab === "thinking" && (
        <div className="space-y-4">
          <p className="text-xs text-slate-400 mb-2">
            Thinking tools, not worksheets. Each tool demands reasoning — not recall.
          </p>
          {packet.thinkingTools.map((t, i) => (
            <ThinkingToolCard key={i} tool={t} />
          ))}
        </div>
      )}

      {activeTab === "writing" && (
        <div className="space-y-4">
          {packet.writingTasks.map((t, i) => (
            <WritingCard key={i} task={t} />
          ))}
        </div>
      )}

      {activeTab === "protocols" && (
        <div className="space-y-4">
          {packet.activityProtocols.map((p, i) => (
            <ProtocolCard key={i} protocol={p} />
          ))}
        </div>
      )}

      {activeTab === "artifact" && (
        <div className="space-y-4">
          <div className="bg-slate-900 text-white rounded-xl p-5">
            <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Recommended Artifact</p>
            <h3 className="text-lg font-bold mb-2">{packet.artifactPlan.recommendedArtifact}</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{packet.artifactPlan.rationale}</p>
          </div>
          <div className="bg-white border border-slate-100 rounded-xl p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Specifications</p>
            <ul className="space-y-1.5">
              {packet.artifactPlan.specifications.map((s, i) => (
                <li key={i} className="text-sm flex gap-2">
                  <span className="text-slate-300 mt-0.5">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-slate-100 rounded-xl p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Evidence Requirements</p>
            <ul className="space-y-1.5">
              {packet.artifactPlan.evidenceRequirements.map((e, i) => (
                <li key={i} className="text-sm flex gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2">Assessment Focus</p>
            <p className="text-sm text-amber-900">{packet.artifactPlan.assessmentFocus}</p>
          </div>
        </div>
      )}
    </div>
  );
}
