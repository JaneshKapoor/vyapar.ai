import { generateImage as generateAIImage } from "../openrouter";

export async function generateMockup(
    productCategory: string,
    brandName: string,
    brandColors: string[]
): Promise<string | null> {
    const colorStr = brandColors.join(", ");
    const prompt = `Professional product mockup photo of a ${productCategory} by brand "${brandName}". 
Modern, sleek design with brand colors (${colorStr}). 
Studio lighting, clean white/dark gradient background. 
High-end product photography style, 4K quality, photorealistic.
The product should look premium and market-ready.`;

    try {
        const imageUrl = await generateAIImage(prompt);
        return imageUrl;
    } catch (error) {
        console.error("Mockup generation error:", error);
        return null;
    }
}
