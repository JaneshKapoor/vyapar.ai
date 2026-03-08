import { chatCompletion, MODELS } from "../openrouter";
import type { ParsedIntent } from "@/types";

export async function parseIntent(productQuery: string): Promise<ParsedIntent> {
    const prompt = `You are a product analysis expert. Parse the following product idea and extract structured information.

Product idea: "${productQuery}"

Return ONLY a valid JSON object (no markdown, no code blocks) with these fields:
{
  "product_category": "the main product category (e.g., smartwatch, yoga mat, earbuds)",
  "target_market": "the target market (default to India if not specified)",
  "price_sensitivity": "budget | mid-range | premium (infer from the description)",
  "keywords": ["array", "of", "search", "keywords", "for", "amazon"],
  "product_name": "a clean product name for this idea"
}`;

    try {
        const response = await chatCompletion(MODELS.FAST, [
            { role: "user", content: prompt },
        ], { temperature: 0.3 });

        const cleaned = response.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        return JSON.parse(cleaned);
    } catch (error) {
        console.error("Parse intent error:", error);
        return {
            product_category: productQuery.split(" ").slice(0, 3).join(" "),
            target_market: "India",
            price_sensitivity: "mid-range",
            keywords: productQuery.split(" ").filter(w => w.length > 3),
            product_name: productQuery.slice(0, 50),
        };
    }
}
