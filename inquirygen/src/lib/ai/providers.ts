import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

// Use OpenRouter for all AI — routes to Claude, Gemini, etc.
const openrouter = createOpenAICompatible({
  name: "openrouter",
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY!,
});

// Primary text generation via OpenRouter → Claude
export const textModel = openrouter.chatModel("anthropic/claude-sonnet-4-5");
export const textModelPremium = openrouter.chatModel("anthropic/claude-sonnet-4-5");
export const textModelFast = openrouter.chatModel("anthropic/claude-haiku-4-5");
export const textModelFallback = openrouter.chatModel("anthropic/claude-sonnet-4-5");

// Image generation via OpenRouter (Gemini 2.5 Flash Image)
export const imageModelId = "google/gemini-2.5-flash-image";

// Direct Gemini for text if needed
export const geminiModel = openrouter.chatModel("google/gemini-2.5-flash-preview-04-17");
