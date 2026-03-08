import OpenAI from "openai";

export function getOpenRouterClient() {
    return new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: process.env.OPENROUTER_API_KEY || "",
        defaultHeaders: {
            "HTTP-Referer": "https://vyapar.ai",
            "X-Title": "Vyapar.AI",
        },
    });
}

export const MODELS = {
    DEEP: "anthropic/claude-opus-4",
    FAST: "anthropic/claude-3-haiku",
    IMAGE: "black-forest-labs/flux-schnell",
};

export async function chatCompletion(
    model: string,
    messages: OpenAI.Chat.ChatCompletionMessageParam[],
    options?: { temperature?: number; max_tokens?: number }
) {
    const client = getOpenRouterClient();
    const response = await client.chat.completions.create({
        model,
        messages,
        temperature: options?.temperature ?? 0.7,
        max_tokens: options?.max_tokens ?? 4096,
    });
    return response.choices[0]?.message?.content || "";
}

export async function generateImage(prompt: string): Promise<string | null> {
    try {
        const client = getOpenRouterClient();
        const response = await client.images.generate({
            model: MODELS.IMAGE,
            prompt,
            n: 1,
            size: "1024x1024",
        });
        return response.data?.[0]?.url || null;
    } catch (error) {
        console.error("Image generation failed:", error);
        return null;
    }
}
