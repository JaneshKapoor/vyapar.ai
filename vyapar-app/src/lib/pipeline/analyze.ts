import { chatCompletion, MODELS } from "../openrouter";
import type { AnalysisResults } from "@/types";

export async function runDeepAnalysis(
    productQuery: string,
    amazonData: string,
    webData: string,
    websiteData: string | null
): Promise<Partial<AnalysisResults>> {
    const prompt = `You are an expert business analyst and brand consultant specializing in the Indian e-commerce market, particularly Amazon India.

PRODUCT IDEA: "${productQuery}"

AMAZON COMPETITOR DATA:
${amazonData.slice(0, 8000)}

WEB MARKET RESEARCH:
${webData.slice(0, 8000)}

${websiteData ? `EXISTING WEBSITE DATA:\n${websiteData.slice(0, 3000)}` : ""}

Analyze this data comprehensively and return a SINGLE valid JSON object (no markdown, no code blocks, no explanation) with these exact keys:

{
  "market_overview": {
    "should_launch": true/false,
    "confidence_score": 75,
    "market_size_india": "₹X,XXX Cr",
    "market_size_global": "$XX Bn",
    "competition_level": "Low|Medium|High|Saturated",
    "summary": "2-3 sentence overview",
    "trends": ["trend1", "trend2", "trend3"],
    "market_trend_data": [{"month": "Jan", "value": 100}, {"month": "Feb", "value": 120}...]
  },
  "competitor_analysis": {
    "competitors": [
      {"brand_name": "Brand", "price_range": "₹X-₹Y", "avg_rating": 4.2, "review_count": 1500, "key_features": ["f1","f2"]}
    ],
    "summary": "Competitor landscape summary"
  },
  "pricing_strategy": {
    "ideal_range": {"min": 999, "max": 2999},
    "budget_tier": {"min": 499, "max": 999},
    "mid_tier": {"min": 999, "max": 2999},
    "premium_tier": {"min": 2999, "max": 7999},
    "positioning_statement": "One-liner positioning",
    "usp_suggestions": ["USP1", "USP2", "USP3"]
  },
  "feature_recommendations": {
    "recommended": [{"feature": "Feature name", "reason": "Why include"}],
    "avoid": [{"feature": "Feature name", "reason": "Why avoid"}]
  },
  "target_segments": {
    "primary_age": "18-30",
    "secondary_age": "30-45",
    "psychographic_profile": "Description of target psychographics",
    "platform_breakdown": [{"platform": "Instagram", "percentage": 35}],
    "personas": [
      {"name": "Persona Name", "age": 25, "bio": "Short bio", "buying_motivation": "Why they buy", "lifestyle": "Lifestyle description"}
    ]
  },
  "inventory_planning": {
    "recommended_first_batch": 500,
    "break_even_units": 200,
    "break_even_months": 3,
    "minimum_budget": "₹3,00,000"
  },
  "revenue_projections": {
    "month_1": 50000,
    "month_3": 200000,
    "month_6": 500000,
    "month_12": 1500000,
    "chart_data": [
      {"month": "Month 1", "revenue": 50000, "profit": 10000},
      {"month": "Month 3", "revenue": 200000, "profit": 60000},
      {"month": "Month 6", "revenue": 500000, "profit": 175000},
      {"month": "Month 12", "revenue": 1500000, "profit": 525000}
    ]
  },
  "brand_strategy": {
    "brand_names": [{"name": "BrandName", "rationale": "Why this name"}],
    "color_palette": [{"hex": "#FF5722", "name": "Energy Orange", "usage": "Primary CTA"}],
    "typography": "Recommended fonts and usage",
    "brand_voice": "Description of brand voice",
    "taglines": ["Tagline 1", "Tagline 2", "Tagline 3"],
    "logo_concept": "Description of logo concept"
  },
  "campaign_ideas": {
    "campaigns": [
      {"name": "Campaign Name", "platform": "Instagram", "format": "Reels", "hook": "Hook text", "estimated_reach": "50K-100K"}
    ],
    "influencer_tier": "micro",
    "ppc_keywords": ["keyword1", "keyword2"],
    "seasonal_timing": "Best time to launch"
  },
  "component_costs": {
    "items": [{"component": "Component", "cost_inr": 150, "supplier_type": "Alibaba/Domestic"}],
    "total_per_unit": 450,
    "margin_at_recommended_price": 65
  },
  "launch_readiness_score": 78
}

Ensure all monetary values are in INR. Generate 5-8 competitors, 6-8 recommended features, 3-4 avoid features, 3-5 campaigns, and 3 personas. Make the data realistic and specific.`;

    try {
        const response = await chatCompletion(MODELS.DEEP, [
            { role: "user", content: prompt },
        ], { temperature: 0.5, max_tokens: 8000 });

        const cleaned = response.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
        const parsed = JSON.parse(cleaned);

        return {
            market_overview: parsed.market_overview,
            competitor_analysis: parsed.competitor_analysis,
            pricing_strategy: parsed.pricing_strategy,
            feature_recommendations: parsed.feature_recommendations,
            target_segments: parsed.target_segments,
            inventory_planning: parsed.inventory_planning,
            revenue_projections: parsed.revenue_projections,
            brand_strategy: parsed.brand_strategy,
            campaign_ideas: parsed.campaign_ideas,
            component_costs: parsed.component_costs,
            launch_readiness_score: parsed.launch_readiness_score ?? 70,
        };
    } catch (error) {
        console.error("Deep analysis error:", error);
        throw new Error("Failed to run AI analysis");
    }
}
