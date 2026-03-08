import { chatCompletion, MODELS } from "../openrouter";
import type { BrandStrategy } from "@/types";

export async function generateWebsite(
    productName: string,
    productQuery: string,
    brandStrategy: BrandStrategy
): Promise<string> {
    const colors = brandStrategy.color_palette?.map(c => c.hex).join(", ") || "#FF9900, #0a0e1a";
    const tagline = brandStrategy.taglines?.[0] || "Quality You Can Trust";
    const brandName = brandStrategy.brand_names?.[0]?.name || productName;

    const prompt = `Generate a complete, modern, responsive single-page HTML landing page for a product brand.

BRAND: ${brandName}
PRODUCT: ${productQuery}
TAGLINE: ${tagline}
BRAND COLORS: ${colors}
BRAND VOICE: ${brandStrategy.brand_voice || "Professional and confident"}

Requirements:
- Complete standalone HTML with embedded CSS and JS
- Modern dark theme design with vibrant accents using the brand colors
- Hero section with gradient background and CTA
- Features section (create 4-6 realistic features)
- Social proof / stats section
- CTA section
- Footer
- Use Google Fonts (Inter)
- Smooth scroll and hover animations
- Mobile responsive
- No external dependencies except Google Fonts

Return ONLY the complete HTML code, nothing else. No markdown, no code blocks.`;

    try {
        const response = await chatCompletion(MODELS.DEEP, [
            { role: "user", content: prompt },
        ], { temperature: 0.7, max_tokens: 8000 });

        // Clean up response
        let html = response;
        if (html.startsWith("```html")) {
            html = html.replace(/^```html\n?/, "").replace(/\n?```$/, "");
        }
        if (html.startsWith("```")) {
            html = html.replace(/^```\n?/, "").replace(/\n?```$/, "");
        }

        return html;
    } catch (error) {
        console.error("Website generation error:", error);
        return getPlaceholderWebsite(brandName, tagline);
    }
}

function getPlaceholderWebsite(brandName: string, tagline: string): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${brandName}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', sans-serif; background: #0a0e1a; color: #f0f4f8; }
    .hero { min-height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; background: linear-gradient(135deg, #0a0e1a, #1a2235); padding: 2rem; }
    h1 { font-size: 3rem; margin-bottom: 1rem; background: linear-gradient(135deg, #FF9900, #00d4ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    p { color: #8892a4; font-size: 1.2rem; margin-bottom: 2rem; }
    .btn { background: linear-gradient(135deg, #FF9900, #e68a00); color: white; padding: 1rem 2rem; border: none; border-radius: 0.5rem; font-size: 1.1rem; cursor: pointer; font-weight: 600; }
  </style>
</head>
<body>
  <div class="hero">
    <div>
      <h1>${brandName}</h1>
      <p>${tagline}</p>
      <button class="btn">Learn More</button>
    </div>
  </div>
</body>
</html>`;
}
