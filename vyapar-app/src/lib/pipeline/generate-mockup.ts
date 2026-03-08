import { chatCompletion, MODELS } from "../openrouter";

export async function generateMockup(
    productCategory: string,
    brandName: string,
    brandColors: string[]
): Promise<string | null> {
    // Instead of image generation (which may not be available via OpenRouter), 
    // generate an SVG product mockup using AI
    const colorStr = brandColors.join(", ");
    try {
        const svgResponse = await chatCompletion(
            MODELS.FAST,
            [
                {
                    role: "system",
                    content: `You are a product mockup SVG designer. Generate a clean, professional SVG for product packaging/mockup. 
Return ONLY the SVG code, no markdown, no explanation. The SVG should be 400x400px.`
                },
                {
                    role: "user",
                    content: `Create a minimalist, premium SVG product mockup for a "${productCategory}" product by brand "${brandName}".
Use these brand colors: ${colorStr}. 
Include the brand name "${brandName}" on the product.
Make it look like a premium product thumbnail/package.
Return ONLY valid SVG code starting with <svg and ending with </svg>.`
                }
            ],
            { temperature: 0.8, max_tokens: 2048 }
        );

        // Extract SVG from response
        let svg = svgResponse.trim();
        const svgStart = svg.indexOf("<svg");
        const svgEnd = svg.lastIndexOf("</svg>");
        if (svgStart !== -1 && svgEnd !== -1) {
            svg = svg.substring(svgStart, svgEnd + 6);
        }

        if (!svg.startsWith("<svg")) {
            return null;
        }

        // Convert SVG to data URL
        const base64 = Buffer.from(svg).toString("base64");
        return `data:image/svg+xml;base64,${base64}`;
    } catch (error) {
        console.error("Mockup generation error:", error);
        return null;
    }
}
