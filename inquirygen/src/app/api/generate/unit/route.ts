import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { generations } from "@/db/schema";
import { checkAndReserveCredits, reconcileCredits } from "@/lib/credits/guard";
import { estimateGenerationCredits } from "@/lib/credits/calculator";
import { ensureUser } from "@/lib/auth/ensure-user";
import {
  runGenerationPipeline,
  type GenerationInput,
} from "@/lib/ai/pipeline";
import { ALL_INQUIRY_MODELS, PROJECT_DURATIONS } from "@/lib/inquiry-models";
import { z } from "zod";

const GenerateRequestSchema = z.object({
  topic: z.string().min(3),
  gradeLevel: z.string(),
  subject: z.string(),
  country: z.string().length(2),
  state: z.string().optional(),
  inquiryModel: z.string(),
  projectDuration: z.string().default("standard"),
  standardsFramework: z.string(),
  selectedStandards: z
    .array(z.object({ code: z.string(), description: z.string() }))
    .optional()
    .default([]),
  additionalContext: z.string().optional(),
});

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Auto-create DB user from Clerk if not exists
  const dbUser = await ensureUser(userId);
  if (!dbUser) {
    return NextResponse.json({ error: "Could not resolve user" }, { status: 500 });
  }

  // Parse and validate request
  const body = await request.json();
  const parsed = GenerateRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Get inquiry model config
  const inquiryModel = ALL_INQUIRY_MODELS[data.inquiryModel];
  if (!inquiryModel) {
    return NextResponse.json(
      { error: "Invalid inquiry model" },
      { status: 400 }
    );
  }

  // Get project duration config
  const projectDuration = PROJECT_DURATIONS.find(
    (d) => d.code === data.projectDuration
  );
  if (!projectDuration) {
    return NextResponse.json(
      { error: "Invalid project duration" },
      { status: 400 }
    );
  }

  // Check and reserve credits
  const estimatedCredits = estimateGenerationCredits();
  const creditCheck = await checkAndReserveCredits(userId, estimatedCredits);

  if (!creditCheck.allowed) {
    return NextResponse.json(
      {
        error: "Insufficient credits",
        balance: creditCheck.balance,
        required: estimatedCredits,
      },
      { status: 402 }
    );
  }

  // Create generation record
  const [generation] = await db
    .insert(generations)
    .values({
      userId,
      topic: data.topic,
      gradeLevel: data.gradeLevel,
      subject: data.subject,
      inquiryModel: data.inquiryModel as any,
      country: data.country,
      state: data.state,
      standardsFramework: data.standardsFramework as any,
      selectedStandardIds: [],
      additionalContext: data.additionalContext,
      aiProvider: "openrouter",
      aiModel: "anthropic/claude-sonnet-4-5",
    })
    .returning();

  // Run the pipeline
  try {
    const pipelineInput: GenerationInput = {
      generationId: generation.id,
      topic: data.topic,
      gradeLevel: data.gradeLevel,
      subject: data.subject,
      country: data.country,
      state: data.state,
      inquiryModel,
      standards: data.selectedStandards,
      projectDuration,
      additionalContext: data.additionalContext,
    };

    const result = await runGenerationPipeline(pipelineInput);

    // Reconcile actual credits vs estimated
    const actualCredits = result.totalCostCents;
    await reconcileCredits(
      userId,
      estimatedCredits,
      actualCredits,
      generation.id,
      result.totalCostCents
    );

    return NextResponse.json({
      generationId: generation.id,
      status: "reviewing",
      totalCreditsCharged: actualCredits,
      documents: result.documents,
    });
  } catch (error) {
    // Refund all reserved credits on failure
    await reconcileCredits(
      userId,
      estimatedCredits,
      0,
      generation.id,
      0
    );

    console.error("Generation failed:", error);
    return NextResponse.json(
      {
        error: "Generation failed",
        message:
          error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
