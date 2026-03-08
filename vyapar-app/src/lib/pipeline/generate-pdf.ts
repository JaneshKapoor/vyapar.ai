// PDF Generation using server-side approach
// Uses a simple HTML-to-text PDF approach for server compatibility
import type { AnalysisResults } from "@/types";

export async function generatePdfReport(
    projectName: string,
    analysis: Partial<AnalysisResults>
): Promise<Buffer> {
    // Generate a comprehensive text report that can be served as downloadable content
    const report = buildReportContent(projectName, analysis);
    return Buffer.from(report, "utf-8");
}

function buildReportContent(
    projectName: string,
    analysis: Partial<AnalysisResults>
): string {
    const sections: string[] = [];

    sections.push(`VYAPAR.AI — PRODUCT ANALYSIS REPORT`);
    sections.push(`${"=".repeat(50)}`);
    sections.push(`Project: ${projectName}`);
    sections.push(`Generated: ${new Date().toLocaleDateString("en-IN")}`);
    sections.push(`Launch Readiness Score: ${analysis.launch_readiness_score || "N/A"}/100`);
    sections.push("");

    // Market Overview
    if (analysis.market_overview) {
        const m = analysis.market_overview;
        sections.push("1. MARKET OVERVIEW");
        sections.push("-".repeat(30));
        sections.push(`Verdict: ${m.should_launch ? "YES — Launch Recommended" : "NO — Not Recommended"}`);
        sections.push(`Confidence: ${m.confidence_score}%`);
        sections.push(`Market Size (India): ${m.market_size_india}`);
        sections.push(`Market Size (Global): ${m.market_size_global}`);
        sections.push(`Competition Level: ${m.competition_level}`);
        sections.push(`Summary: ${m.summary}`);
        sections.push(`Trends: ${m.trends?.join(", ")}`);
        sections.push("");
    }

    // Competitor Analysis
    if (analysis.competitor_analysis) {
        sections.push("2. COMPETITOR ANALYSIS");
        sections.push("-".repeat(30));
        sections.push(analysis.competitor_analysis.summary);
        analysis.competitor_analysis.competitors?.forEach((c, i) => {
            sections.push(`  ${i + 1}. ${c.brand_name} | ${c.price_range} | Rating: ${c.avg_rating} | Reviews: ${c.review_count}`);
            sections.push(`     Features: ${c.key_features?.join(", ")}`);
        });
        sections.push("");
    }

    // Pricing Strategy
    if (analysis.pricing_strategy) {
        const p = analysis.pricing_strategy;
        sections.push("3. PRICING STRATEGY");
        sections.push("-".repeat(30));
        sections.push(`Ideal Range: ₹${p.ideal_range?.min} - ₹${p.ideal_range?.max}`);
        sections.push(`Positioning: ${p.positioning_statement}`);
        sections.push(`USPs: ${p.usp_suggestions?.join(" | ")}`);
        sections.push("");
    }

    // Feature Recommendations
    if (analysis.feature_recommendations) {
        sections.push("4. FEATURE RECOMMENDATIONS");
        sections.push("-".repeat(30));
        sections.push("Recommended:");
        analysis.feature_recommendations.recommended?.forEach(f => {
            sections.push(`  ✓ ${f.feature}: ${f.reason}`);
        });
        sections.push("Avoid:");
        analysis.feature_recommendations.avoid?.forEach(f => {
            sections.push(`  ✗ ${f.feature}: ${f.reason}`);
        });
        sections.push("");
    }

    // Target Segments
    if (analysis.target_segments) {
        const t = analysis.target_segments;
        sections.push("5. TARGET AUDIENCE");
        sections.push("-".repeat(30));
        sections.push(`Primary Age: ${t.primary_age}`);
        sections.push(`Secondary Age: ${t.secondary_age}`);
        sections.push(`Psychographic: ${t.psychographic_profile}`);
        t.personas?.forEach(p => {
            sections.push(`  Persona: ${p.name} (${p.age}) — ${p.bio}`);
        });
        sections.push("");
    }

    // Revenue Projections
    if (analysis.revenue_projections) {
        const r = analysis.revenue_projections;
        sections.push("6. REVENUE PROJECTIONS");
        sections.push("-".repeat(30));
        sections.push(`Month 1: ₹${r.month_1?.toLocaleString("en-IN")}`);
        sections.push(`Month 3: ₹${r.month_3?.toLocaleString("en-IN")}`);
        sections.push(`Month 6: ₹${r.month_6?.toLocaleString("en-IN")}`);
        sections.push(`Month 12: ₹${r.month_12?.toLocaleString("en-IN")}`);
        sections.push("");
    }

    // Brand Strategy
    if (analysis.brand_strategy) {
        const b = analysis.brand_strategy;
        sections.push("7. BRAND IDENTITY");
        sections.push("-".repeat(30));
        b.brand_names?.forEach(n => {
            sections.push(`  Name: ${n.name} — ${n.rationale}`);
        });
        sections.push(`Typography: ${b.typography}`);
        sections.push(`Brand Voice: ${b.brand_voice}`);
        sections.push(`Taglines: ${b.taglines?.join(" | ")}`);
        sections.push(`Logo Concept: ${b.logo_concept}`);
        sections.push("");
    }

    // Campaign Ideas
    if (analysis.campaign_ideas) {
        sections.push("8. MARKETING & CAMPAIGNS");
        sections.push("-".repeat(30));
        analysis.campaign_ideas.campaigns?.forEach(c => {
            sections.push(`  ${c.name} (${c.platform}/${c.format}): ${c.hook}`);
        });
        sections.push(`Influencer Tier: ${analysis.campaign_ideas.influencer_tier}`);
        sections.push(`PPC Keywords: ${analysis.campaign_ideas.ppc_keywords?.join(", ")}`);
        sections.push("");
    }

    sections.push("=".repeat(50));
    sections.push("Report generated by Vyapar.AI — https://vyapar.ai");

    return sections.join("\n");
}
