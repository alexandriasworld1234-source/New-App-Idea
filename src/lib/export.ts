import { GenerationOutput } from "@/types";

/**
 * Export the teacher plan as a plain-text document string.
 * Triggers a browser download.
 */
export function exportTeacherPlanText(output: GenerationOutput): void {
  const { teacherPlan: p, inputSummary } = output;

  const lines: string[] = [
    `LEVER LESSON PLAN`,
    `=================`,
    `Topic: ${p.standardOrTopic}`,
    `Discipline: ${p.discipline}`,
    `Grade Band: ${p.gradeBand}`,
    `Timeframe: ${p.timeframe}`,
    `Generated: ${new Date(output.generatedAt).toLocaleString()}`,
    ``,
    `━━━ CONCEPT UNPACKING ━━━`,
    ``,
    `Core Concepts:`,
    ...p.unpacking.coreConcepts.map((c) => `  • ${c}`),
    ``,
    `Common Misconceptions:`,
    ...p.unpacking.misconceptions.map((m) => `  • ${m}`),
    ``,
    `Prerequisite Knowledge:`,
    ...p.unpacking.prerequisiteKnowledge.map((k) => `  • ${k}`),
    ``,
    `Transfer Targets:`,
    ...p.unpacking.transferTargets.map((t) => `  • ${t}`),
    ``,
    `Success Evidence:`,
    ...p.unpacking.successEvidence.map((s) => `  • ${s}`),
    ``,
    `━━━ LEVER LEARNING ARC ━━━`,
    ``,
  ];

  for (const phase of p.leverArc) {
    lines.push(`[ ${phase.phase.toUpperCase()} ]  — ${phase.timeEstimate}`);
    lines.push(phase.description);
    lines.push(`  Teacher Moves:`);
    phase.teacherMoves.forEach((m) => lines.push(`    → ${m}`));
    lines.push(`  Students: ${phase.studentActivity}`);
    if (phase.protocols.length) {
      lines.push(`  Protocols: ${phase.protocols.join(", ")}`);
    }
    lines.push(``);
  }

  lines.push(
    `━━━ WEEK 1 MINIMUM VIABLE LEARNING EXPERIENCE ━━━`,
    ``,
    p.week1MVLE,
    ``
  );

  lines.push(`━━━ FACILITATION MOVES ━━━`, ``);
  lines.push(`Generative Questions:`);
  p.facilitationMoves.questions.forEach((q) => lines.push(`  Q: ${q}`));
  lines.push(``, `Talk Moves:`);
  p.facilitationMoves.talkMoves.forEach((m) => lines.push(`  • ${m}`));
  lines.push(``, `Mini-Conference Prompts:`);
  p.facilitationMoves.miniConferencePrompts.forEach((m) =>
    lines.push(`  • ${m}`)
  );
  lines.push(``, `Small Group Prompts:`);
  p.facilitationMoves.smallGroupPrompts.forEach((m) => lines.push(`  • ${m}`));

  lines.push(``, `━━━ DIFFERENTIATION ━━━`, ``);
  lines.push(`Novice Supports:`);
  p.differentiation.novice.forEach((d) => lines.push(`  • ${d}`));
  lines.push(``, `Intermediate:`);
  p.differentiation.intermediate.forEach((d) => lines.push(`  • ${d}`));
  lines.push(``, `Advanced:`);
  p.differentiation.advanced.forEach((d) => lines.push(`  • ${d}`));

  if (p.microLessons.length) {
    lines.push(``, `━━━ MICRO-LESSONS ━━━`, ``);
    p.microLessons.forEach((ml, i) => {
      lines.push(
        `Micro-Lesson ${i + 1} (${ml.duration}): ${ml.targetMisconception}`
      );
      lines.push(`Approach: ${ml.approach}`);
      ml.steps.forEach((s) => lines.push(`  ${i + 1}.${s}`));
      lines.push(``);
    });
  }

  downloadText(
    lines.join("\n"),
    `LEVER_Teacher_Plan_${sanitizeFilename(p.standardOrTopic)}.txt`
  );
}

/**
 * Export the student packet as a text document.
 */
export function exportStudentPacketText(output: GenerationOutput): void {
  const { studentPacket: sp, teacherPlan: p } = output;
  const lines: string[] = [
    `STUDENT MATERIALS PACKET`,
    `========================`,
    `Topic: ${p.standardOrTopic}`,
    ``,
  ];

  // Quick Readers
  lines.push(`━━━ QUICK READERS ━━━`, ``);
  for (const reader of sp.quickReaders) {
    lines.push(
      `[ LEVEL ${reader.level} — ${reader.levelLabel.toUpperCase()} ]`
    );
    lines.push(reader.title);
    lines.push(`─`.repeat(50));
    lines.push(reader.body);
    lines.push(``);
    if (reader.vocabularySupports.length) {
      lines.push(`Key Vocabulary:`);
      reader.vocabularySupports.forEach((v) =>
        lines.push(`  ${v.term}: ${v.definition}`)
      );
      lines.push(``);
    }
    lines.push(`Thinking Prompts:`);
    reader.comprehensionPrompts.forEach((cp) => lines.push(`  → ${cp}`));
    lines.push(``, `${"─".repeat(60)}`, ``);
  }

  // Research Pack
  lines.push(`━━━ RESEARCH PACK ━━━`, ``);
  lines.push(`Keyword Searches:`);
  sp.researchPack.keywordSearches.forEach((k) => lines.push(`  • "${k}"`));
  lines.push(``, `Source Type Guidance:`);
  sp.researchPack.sourceTypeGuidance.forEach((g) => lines.push(`  • ${g}`));
  lines.push(``, `Credibility Checklist:`);
  sp.researchPack.credibilityChecklist.forEach((c) => lines.push(`  ☐ ${c}`));
  lines.push(``, `NOTE-CATCHER TEMPLATE:`);
  lines.push(sp.researchPack.noteCatcherTemplate);
  lines.push(``, `SYNTHESIS ORGANIZER:`);
  lines.push(sp.researchPack.synthesisOrganizer);
  lines.push(``);

  // Thinking Tools
  lines.push(`━━━ THINKING & JOURNALING TOOLS ━━━`, ``);
  for (const tool of sp.thinkingTools) {
    lines.push(`[ ${tool.name.toUpperCase()} ]`);
    lines.push(tool.instructions);
    lines.push(``);
    lines.push(tool.template);
    lines.push(``, `${"─".repeat(60)}`, ``);
  }

  // Writing Tasks
  lines.push(`━━━ WRITING INTEGRATION ━━━`, ``);
  for (const task of sp.writingTasks) {
    lines.push(`[ ${task.label.toUpperCase()} ]`);
    lines.push(`Prompt: ${task.prompt}`);
    lines.push(``, `Scaffold:`);
    lines.push(task.scaffold);
    lines.push(``, `Quality Criteria:`);
    task.criteriaForQuality.forEach((c) => lines.push(`  • ${c}`));
    lines.push(``, `${"─".repeat(60)}`, ``);
  }

  // Activity Protocols
  lines.push(`━━━ ACTIVITY PROTOCOLS ━━━`, ``);
  for (const proto of sp.activityProtocols) {
    lines.push(`[ ${proto.name.toUpperCase()} ] — ${proto.tradition}`);
    lines.push(`Purpose: ${proto.purpose}`);
    lines.push(`Time: ${proto.timeframe}`);
    lines.push(`Materials: ${proto.materials.join(", ")}`);
    lines.push(`Steps:`);
    proto.steps.forEach((s, i) => lines.push(`  ${i + 1}. ${s}`));
    lines.push(``);
  }

  // Artifact Plan
  lines.push(`━━━ ARTIFACT PLAN ━━━`, ``);
  lines.push(`Recommended: ${sp.artifactPlan.recommendedArtifact}`);
  lines.push(``, `Rationale: ${sp.artifactPlan.rationale}`);
  lines.push(``, `Specifications:`);
  sp.artifactPlan.specifications.forEach((s) => lines.push(`  • ${s}`));
  lines.push(``, `Evidence Requirements:`);
  sp.artifactPlan.evidenceRequirements.forEach((e) =>
    lines.push(`  • ${e}`)
  );
  lines.push(``, `Assessment Focus: ${sp.artifactPlan.assessmentFocus}`);

  downloadText(
    lines.join("\n"),
    `LEVER_Student_Packet_${sanitizeFilename(p.standardOrTopic)}.txt`
  );
}

/**
 * Export full JSON output for backup/template use.
 */
export function exportFullJSON(output: GenerationOutput): void {
  const json = JSON.stringify(output, null, 2);
  downloadText(
    json,
    `LEVER_Full_${sanitizeFilename(output.teacherPlan.standardOrTopic)}.json`
  );
}

function downloadText(content: string, filename: string): void {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function sanitizeFilename(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .replace(/\s+/g, "_")
    .slice(0, 50);
}
