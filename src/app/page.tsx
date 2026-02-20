"use client";

import { useState, useCallback, useRef } from "react";
import TeacherInputForm from "@/components/TeacherInputForm";
import TeacherPlanView from "@/components/TeacherPlanView";
import StudentPacketView from "@/components/StudentPacketView";
import FeedbackBar from "@/components/FeedbackBar";
import GenerationProgress from "@/components/GenerationProgress";
import { TeacherInput, GenerationOutput } from "@/types";

type AppState = "input" | "generating" | "result" | "error";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("input");
  const [output, setOutput] = useState<GenerationOutput | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"plan" | "packet">("plan");
  const [tokenCount, setTokenCount] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  const handleGenerate = useCallback(async (input: TeacherInput) => {
    setAppState("generating");
    setTokenCount(0);
    setErrorMessage("");

    abortRef.current = new AbortController();

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
        signal: abortRef.current.signal,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Generation failed");
      }

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let rawText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (!data) continue;

          try {
            const parsed = JSON.parse(data);
            if (parsed.type === "delta") {
              rawText += parsed.text;
              setTokenCount((c) => c + (parsed.text?.split(/\s+/).length || 0));
            } else if (parsed.type === "done") {
              try {
                const jsonMatch = rawText.match(/\{[\s\S]*\}/);
                if (!jsonMatch) throw new Error("No JSON found in response");
                const genData = JSON.parse(jsonMatch[0]);
                const fullOutput: GenerationOutput = {
                  teacherPlan: genData.teacherPlan,
                  studentPacket: genData.studentPacket,
                  generatedAt: new Date().toISOString(),
                  inputSummary: input,
                };
                setOutput(fullOutput);
                setAppState("result");
                setActiveTab("plan");
              } catch {
                throw new Error(
                  "Could not parse generated output. The model may have returned malformed JSON. Please try again."
                );
              }
            } else if (parsed.type === "error") {
              throw new Error(parsed.message);
            }
          } catch {
            // Skip malformed SSE lines
          }
        }
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        setAppState("input");
        return;
      }
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setErrorMessage(msg);
      setAppState("error");
    }
  }, []);

  const handleReset = () => {
    abortRef.current?.abort();
    setOutput(null);
    setAppState("input");
    setTokenCount(0);
    setErrorMessage("");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-black text-slate-900 tracking-tight">LEVER</span>
            <span className="text-xs text-slate-400 hidden sm:block">
              Lesson &amp; Materials Generator
            </span>
          </div>
          <div className="flex items-center gap-3">
            {appState === "generating" && (
              <button
                onClick={handleReset}
                className="text-xs text-slate-400 hover:text-slate-700"
              >
                Cancel
              </button>
            )}
            {(appState === "result" || appState === "error") && (
              <button
                onClick={handleReset}
                className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg px-3 py-1.5 transition-colors"
              >
                ← New Lesson
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {appState === "input" && (
          <TeacherInputForm onSubmit={handleGenerate} isGenerating={false} />
        )}

        {appState === "generating" && (
          <GenerationProgress tokenCount={tokenCount} />
        )}

        {appState === "error" && (
          <div className="max-w-xl mx-auto text-center py-20">
            <div className="text-4xl mb-4">⚡</div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              Generation Failed
            </h2>
            <p className="text-slate-500 text-sm mb-6">{errorMessage}</p>
            <button
              onClick={handleReset}
              className="bg-slate-900 text-white rounded-xl px-6 py-3 text-sm font-semibold hover:bg-slate-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {appState === "result" && output && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black text-slate-900">
                  {output.teacherPlan.standardOrTopic}
                </h1>
                <p className="text-sm text-slate-400 mt-0.5">
                  {output.teacherPlan.discipline} · {output.teacherPlan.gradeBand} ·{" "}
                  {output.teacherPlan.timeframe}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Generated</span>
                <span>{new Date(output.generatedAt).toLocaleTimeString()}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main content */}
              <div className="lg:col-span-2">
                <div className="flex gap-1 mb-6">
                  <button
                    onClick={() => setActiveTab("plan")}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      activeTab === "plan"
                        ? "bg-slate-900 text-white"
                        : "bg-white text-slate-500 hover:text-slate-800 border border-slate-100"
                    }`}
                  >
                    Teacher Plan
                  </button>
                  <button
                    onClick={() => setActiveTab("packet")}
                    className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      activeTab === "packet"
                        ? "bg-slate-900 text-white"
                        : "bg-white text-slate-500 hover:text-slate-800 border border-slate-100"
                    }`}
                  >
                    Student Packet
                  </button>
                </div>

                {activeTab === "plan" && (
                  <TeacherPlanView plan={output.teacherPlan} />
                )}
                {activeTab === "packet" && (
                  <StudentPacketView packet={output.studentPacket} />
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                <FeedbackBar output={output} />

                <div className="bg-white border border-slate-100 rounded-2xl p-5">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                    Input Used
                  </p>
                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Grade</span>
                      <span className="font-medium">{output.inputSummary.gradeBand}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Timeframe</span>
                      <span className="font-medium">{output.inputSummary.timeframe}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Readiness</span>
                      <span className="font-medium capitalize">
                        {output.inputSummary.readiness}
                      </span>
                    </div>
                    {output.inputSummary.constraints && (
                      <div>
                        <span className="text-slate-400">Constraints: </span>
                        <span className="font-medium">
                          {output.inputSummary.constraints}
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={handleReset}
                    className="mt-4 w-full text-xs text-slate-400 hover:text-slate-700 border border-slate-100 rounded-lg px-3 py-2 hover:border-slate-200 transition-colors"
                  >
                    Generate New Lesson
                  </button>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-5">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                    LEVER Framework
                  </p>
                  <div className="space-y-2">
                    {[
                      {
                        letter: "L",
                        name: "Leverage",
                        desc: "High-impact variables",
                        color: "text-violet-600",
                      },
                      {
                        letter: "E",
                        name: "Environment",
                        desc: "Context shapes behavior",
                        color: "text-sky-600",
                      },
                      {
                        letter: "V",
                        name: "Velocity",
                        desc: "Short feedback loops",
                        color: "text-emerald-600",
                      },
                      {
                        letter: "E",
                        name: "Execution",
                        desc: "Output as learning tech",
                        color: "text-amber-600",
                      },
                      {
                        letter: "R",
                        name: "Repetition",
                        desc: "Learning compounds",
                        color: "text-rose-600",
                      },
                    ].map((phase, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className={`font-black text-sm w-4 ${phase.color}`}>
                          {phase.letter}
                        </span>
                        <div>
                          <span className="text-xs font-semibold text-slate-700">
                            {phase.name}
                          </span>
                          <span className="text-xs text-slate-400"> — {phase.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
