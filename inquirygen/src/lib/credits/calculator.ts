export type ModelPricing = {
  inputPricePerMillionTokens: number;
  outputPricePerMillionTokens: number;
  imageGenerationCostCents?: number;
};

// Current pricing as of Feb 2026
export const MODEL_PRICING: Record<string, ModelPricing> = {
  "claude-sonnet-4-5-20250514": {
    inputPricePerMillionTokens: 3,
    outputPricePerMillionTokens: 15,
  },
  "claude-opus-4-20250514": {
    inputPricePerMillionTokens: 15,
    outputPricePerMillionTokens: 75,
  },
  "claude-haiku-4-5-20251001": {
    inputPricePerMillionTokens: 0.8,
    outputPricePerMillionTokens: 4,
  },
  "google/gemini-2.5-flash-image": {
    inputPricePerMillionTokens: 0.15,
    outputPricePerMillionTokens: 0.6,
    imageGenerationCostCents: 3,
  },
};

export function calculateCostCents(
  inputTokens: number,
  outputTokens: number,
  modelId: string,
  imageCount: number = 0
): number {
  const pricing = MODEL_PRICING[modelId];
  if (!pricing) return 0;

  const textCost =
    (inputTokens / 1_000_000) * pricing.inputPricePerMillionTokens +
    (outputTokens / 1_000_000) * pricing.outputPricePerMillionTokens;

  const imageCost =
    imageCount * (pricing.imageGenerationCostCents ?? 0) / 100;

  // Convert dollars to cents and round up
  return Math.max(1, Math.ceil((textCost + imageCost) * 100));
}

export function costCentsToCredits(costCents: number): number {
  // 1 credit = 1 cent of API cost
  return Math.max(1, Math.ceil(costCents));
}

// Estimate credits for a full unit generation
export function estimateGenerationCredits(): number {
  // Approximate token usage per step:
  // Context + Unit Overview: ~2000 in, ~2500 out (Sonnet)
  // Presentation: ~4000 in, ~4000 out (Sonnet)
  // Activity Pack: ~4000 in, ~5000 out (Sonnet)
  // Teacher's Guide: ~5000 in, ~8000 out (Sonnet)
  // Quality Check: ~10000 in, ~1000 out (Haiku)
  // Images: ~5 images
  const estimates = [
    calculateCostCents(2000, 2500, "claude-sonnet-4-5-20250514"),
    calculateCostCents(4000, 4000, "claude-sonnet-4-5-20250514"),
    calculateCostCents(4000, 5000, "claude-sonnet-4-5-20250514"),
    calculateCostCents(5000, 8000, "claude-sonnet-4-5-20250514"),
    calculateCostCents(10000, 1000, "claude-haiku-4-5-20251001"),
    calculateCostCents(0, 0, "google/gemini-2.5-flash-image", 5),
  ];

  return estimates.reduce(
    (sum, cost) => sum + costCentsToCredits(cost),
    0
  );
}
