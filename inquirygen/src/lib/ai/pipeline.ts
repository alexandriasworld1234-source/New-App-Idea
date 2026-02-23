import { generateObject } from "ai";
import { z } from "zod";
import { textModel, textModelFast } from "./providers";
import { buildSystemPrompt } from "./prompts/system";
import {
  UNIT_OVERVIEW_PROMPT,
  PRESENTATION_PROMPT,
  ACTIVITY_PACK_PROMPT,
  TEACHER_GUIDE_PROMPT,
} from "./prompts/unit-overview";
import { db } from "@/db";
import { generations, generationSteps, generatedDocuments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { calculateCostCents } from "../credits/calculator";

// ============================================================================
// Zod Schemas for structured AI output
// ============================================================================

const UnitOverviewSchema = z.object({
  title: z.string(),
  drivingQuestion: z.string(),
  unitSummary: z.string(),
  learningObjectives: z.array(z.string()),
  keyVocabulary: z.array(
    z.object({ term: z.string(), definition: z.string() })
  ),
  standardsAlignment: z.array(
    z.object({
      standardCode: z.string(),
      alignmentExplanation: z.string(),
    })
  ),
  timeline: z.array(
    z.object({
      phase: z.string(),
      duration: z.string(),
      activities: z.array(z.string()),
    })
  ),
  successCriteria: z.array(z.string()),
  prerequisiteKnowledge: z.array(z.string()),
  materialsNeeded: z.array(z.string()),
});

const PresentationSchema = z.object({
  slides: z.array(
    z.object({
      slideNumber: z.number(),
      title: z.string(),
      layout: z.enum([
        "title",
        "content",
        "two_column",
        "image_focus",
        "activity",
        "reflection",
      ]),
      content: z.object({
        mainText: z.string().optional(),
        bulletPoints: z.array(z.string()).optional(),
        activityInstructions: z.string().optional(),
        discussionPrompt: z.string().optional(),
        imageDescription: z.string().optional(),
      }),
      speakerNotes: z.string(),
      inquiryPhase: z.string(),
    })
  ),
});

const ActivityPackSchema = z.object({
  preAssessment: z.object({
    instructions: z.string(),
    questions: z.array(
      z.object({
        question: z.string(),
        responseType: z.enum(["open_response", "multiple_choice", "drawing"]),
        options: z.array(z.string()).optional(),
        lineCount: z.number().optional(),
      })
    ),
  }),
  rubric: z.object({
    skills: z.array(
      z.object({
        skillName: z.string(),
        levels: z.object({
          expert: z.string(),
          proficient: z.string(),
          developing: z.string(),
          beginning: z.string(),
        }),
      })
    ),
  }),
  activities: z.array(
    z.object({
      title: z.string(),
      inquiryPhase: z.string(),
      instructions: z.string(),
      tasks: z.array(
        z.object({
          prompt: z.string(),
          responseType: z.enum([
            "open_response",
            "table",
            "diagram",
            "multiple_choice",
          ]),
          lineCount: z.number().optional(),
        })
      ),
    })
  ),
  reflection: z.object({
    questions: z.array(z.string()),
  }),
  stemChallenge: z.object({
    title: z.string(),
    scenario: z.string(),
    constraints: z.array(z.string()),
    engineeringQuestions: z.array(z.string()),
    careerConnection: z.object({
      careers: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
          salaryRange: z.string(),
        })
      ),
    }),
  }),
});

const TeacherGuideSchema = z.object({
  standardsUnpacking: z.object({
    standards: z.array(
      z.object({
        code: z.string(),
        fullText: z.string(),
        studentFriendlyLanguage: z.string(),
        assessmentBoundary: z.string().optional(),
        clarificationStatement: z.string().optional(),
      })
    ),
  }),
  backgroundContent: z.object({
    overview: z.string(),
    keyConceptsForTeacher: z.array(
      z.object({ concept: z.string(), explanation: z.string() })
    ),
    commonMisconceptions: z.array(
      z.object({
        misconception: z.string(),
        correction: z.string(),
        teachingTip: z.string(),
      })
    ),
  }),
  facilitationGuide: z.array(
    z.object({
      slideNumber: z.number(),
      slideTitle: z.string(),
      inquiryPhase: z.string(),
      timeEstimate: z.string(),
      whatToSay: z.string(),
      whatToDo: z.string(),
      expectedStudentResponses: z.array(z.string()),
      probeQuestions: z.array(z.string()),
      transitionToNext: z.string(),
    })
  ),
  answerKey: z.array(
    z.object({
      activityTitle: z.string(),
      answers: z.array(
        z.object({
          question: z.string(),
          expectedResponse: z.string(),
          acceptableVariations: z.array(z.string()).optional(),
        })
      ),
    })
  ),
  differentiation: z.object({
    scaffolding: z.array(z.string()),
    extension: z.array(z.string()),
    ell: z.array(z.string()),
    specialEducation: z.array(z.string()),
  }),
  assessmentGuidance: z.object({
    formative: z.array(z.string()),
    summative: z.array(z.string()),
  }),
});

// ============================================================================
// Pipeline Input Type
// ============================================================================

export type GenerationInput = {
  generationId: number;
  topic: string;
  gradeLevel: string;
  subject: string;
  country: string;
  state?: string;
  inquiryModel: import("@/lib/inquiry-models").InquiryModelConfig;
  standards: Array<{ code: string; description: string }>;
  projectDuration: import("@/lib/inquiry-models").ProjectDuration;
  additionalContext?: string;
};

// ============================================================================
// Pipeline Step Runner
// ============================================================================

async function runStep<T>(
  generationId: number,
  stepName: string,
  systemPrompt: string,
  userPrompt: string,
  schema: z.ZodType<T>,
  modelId: string = "claude-sonnet-4-5-20250514"
): Promise<{ result: T; costCents: number }> {
  const startTime = Date.now();

  // Log step start
  const [step] = await db
    .insert(generationSteps)
    .values({
      generationId,
      stepName,
      aiProvider: "anthropic",
      aiModel: modelId,
      status: "running",
    })
    .returning();

  try {
    const { object, usage } = await generateObject({
      model: textModel,
      system: systemPrompt,
      prompt: userPrompt,
      schema,
    });

    const promptTokens = usage?.inputTokens ?? 0;
    const completionTokens = usage?.outputTokens ?? 0;
    const costCents = calculateCostCents(
      promptTokens,
      completionTokens,
      modelId
    );
    const durationMs = Date.now() - startTime;

    // Update step with results
    await db
      .update(generationSteps)
      .set({
        promptTokens,
        completionTokens,
        costCents,
        durationMs,
        status: "completed",
      })
      .where(eq(generationSteps.id, step.id));

    return { result: object, costCents };
  } catch (error) {
    const durationMs = Date.now() - startTime;
    await db
      .update(generationSteps)
      .set({
        durationMs,
        status: "failed",
        errorMessage:
          error instanceof Error ? error.message : "Unknown error",
      })
      .where(eq(generationSteps.id, step.id));

    throw error;
  }
}

// ============================================================================
// Main Pipeline
// ============================================================================

export async function runGenerationPipeline(
  input: GenerationInput
): Promise<{
  totalCostCents: number;
  documents: {
    unitOverview: z.infer<typeof UnitOverviewSchema>;
    presentation: z.infer<typeof PresentationSchema>;
    activityPack: z.infer<typeof ActivityPackSchema>;
    teacherGuide: z.infer<typeof TeacherGuideSchema>;
  };
}> {
  const systemPrompt = buildSystemPrompt({
    topic: input.topic,
    gradeLevel: input.gradeLevel,
    subject: input.subject,
    country: input.country,
    state: input.state,
    inquiryModel: input.inquiryModel,
    standards: input.standards,
    projectDuration: input.projectDuration,
    additionalContext: input.additionalContext,
  });
  let totalCostCents = 0;

  // Update generation status
  await db
    .update(generations)
    .set({ status: "generating", startedAt: new Date() })
    .where(eq(generations.id, input.generationId));

  try {
    // Step 1: Generate Unit Overview
    const { result: unitOverview, costCents: overviewCost } = await runStep(
      input.generationId,
      "unit_overview",
      systemPrompt,
      UNIT_OVERVIEW_PROMPT,
      UnitOverviewSchema
    );
    totalCostCents += overviewCost;

    // Steps 2-4: Generate documents in parallel
    const contextForDocs = `\n\n## Unit Overview (already generated - use for consistency)\nTitle: ${unitOverview.title}\nDriving Question: ${unitOverview.drivingQuestion}\nObjectives: ${unitOverview.learningObjectives.join("; ")}\nVocabulary: ${unitOverview.keyVocabulary.map((v) => v.term).join(", ")}`;

    const [presentationResult, activityPackResult, teacherGuideResult] =
      await Promise.all([
        runStep(
          input.generationId,
          "presentation",
          systemPrompt + contextForDocs,
          PRESENTATION_PROMPT,
          PresentationSchema
        ),
        runStep(
          input.generationId,
          "activity_pack",
          systemPrompt + contextForDocs,
          ACTIVITY_PACK_PROMPT,
          ActivityPackSchema
        ),
        runStep(
          input.generationId,
          "teacher_guide",
          systemPrompt + contextForDocs,
          TEACHER_GUIDE_PROMPT,
          TeacherGuideSchema
        ),
      ]);

    totalCostCents +=
      presentationResult.costCents +
      activityPackResult.costCents +
      teacherGuideResult.costCents;

    // Save all documents to database
    await db.insert(generatedDocuments).values([
      {
        generationId: input.generationId,
        documentType: "unit_overview",
        content: unitOverview,
      },
      {
        generationId: input.generationId,
        documentType: "presentation",
        content: presentationResult.result,
      },
      {
        generationId: input.generationId,
        documentType: "activity_pack",
        content: activityPackResult.result,
      },
      {
        generationId: input.generationId,
        documentType: "teacher_guide",
        content: teacherGuideResult.result,
      },
    ]);

    // Update generation as completed
    await db
      .update(generations)
      .set({
        status: "reviewing",
        completedAt: new Date(),
        totalApiCostCents: totalCostCents,
        totalCreditsCharged: totalCostCents, // 1 credit = 1 cent
        updatedAt: new Date(),
      })
      .where(eq(generations.id, input.generationId));

    return {
      totalCostCents,
      documents: {
        unitOverview,
        presentation: presentationResult.result,
        activityPack: activityPackResult.result,
        teacherGuide: teacherGuideResult.result,
      },
    };
  } catch (error) {
    // Mark generation as failed
    await db
      .update(generations)
      .set({ status: "failed", updatedAt: new Date() })
      .where(eq(generations.id, input.generationId));

    throw error;
  }
}
