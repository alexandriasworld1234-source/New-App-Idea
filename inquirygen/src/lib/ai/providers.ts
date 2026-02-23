import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

// Primary text generation: Claude
export const textModel = anthropic("claude-sonnet-4-5-20250514");
export const textModelPremium = anthropic("claude-opus-4-20250514");
export const textModelFast = anthropic("claude-haiku-4-5-20251001");

// OpenRouter fallback
const openrouter = createOpenAICompatible({
  name: "openrouter",
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY!,
});
export const textModelFallback = openrouter.chatModel(
  "anthropic/claude-sonnet-4.5"
);

// Image generation via OpenRouter (Gemini 2.5 Flash Image)
export const imageModelId = "google/gemini-2.5-flash-image";

// Direct Gemini for text if needed
export const geminiModel = google("gemini-2.5-flash-preview-04-17");
