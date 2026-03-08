import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import type { AnalysisResults } from "@/types";
import { jsPDF } from "jspdf";

// GET /api/projects/[id]/download-report — generates and returns a downloadable PDF report
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const rows = await query(
            `SELECT p.name, ar.* FROM projects p 
       JOIN analysis_results ar ON ar.project_id = p.id 
       WHERE p.id = $1`,
            [id]
        );

        if (rows.length === 0) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        const row = rows[0];
        const projectName = row.name as string;

        // Parse analysis from DB
        const analysis: Partial<AnalysisResults> = {
            market_overview: typeof row.market_overview === "string" ? JSON.parse(row.market_overview) : row.market_overview,
            competitor_analysis: typeof row.competitor_analysis === "string" ? JSON.parse(row.competitor_analysis) : row.competitor_analysis,
            pricing_strategy: typeof row.pricing_strategy === "string" ? JSON.parse(row.pricing_strategy) : row.pricing_strategy,
            feature_recommendations: typeof row.feature_recommendations === "string" ? JSON.parse(row.feature_recommendations) : row.feature_recommendations,
            target_segments: typeof row.target_segments === "string" ? JSON.parse(row.target_segments) : row.target_segments,
            inventory_planning: typeof row.inventory_planning === "string" ? JSON.parse(row.inventory_planning) : row.inventory_planning,
            revenue_projections: typeof row.revenue_projections === "string" ? JSON.parse(row.revenue_projections) : row.revenue_projections,
            brand_strategy: typeof row.brand_strategy === "string" ? JSON.parse(row.brand_strategy) : row.brand_strategy,
            campaign_ideas: typeof row.campaign_ideas === "string" ? JSON.parse(row.campaign_ideas) : row.campaign_ideas,
            component_costs: typeof row.component_costs === "string" ? JSON.parse(row.component_costs) : row.component_costs,
            launch_readiness_score: row.launch_readiness_score as number,
        };

        const pdfBuffer = generatePdf(projectName, analysis);

        return new Response(pdfBuffer, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="${projectName.replace(/[^a-zA-Z0-9 ]/g, '_')}_Vyapar_Report.pdf"`,
                "Content-Length": pdfBuffer.byteLength.toString(),
            },
        });
    } catch (error) {
        console.error("Report download error:", error);
        return NextResponse.json({ error: "Failed to generate report" }, { status: 500 });
    }
}

function generatePdf(projectName: string, analysis: Partial<AnalysisResults>): ArrayBuffer {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const maxWidth = pageWidth - margin * 2;
    let y = 20;

    const checkPage = (needed: number) => {
        if (y + needed > 280) {
            doc.addPage();
            y = 20;
        }
    };

    const addTitle = (text: string) => {
        checkPage(15);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(255, 153, 0); // Orange
        doc.text(text, margin, y);
        y += 8;
        doc.setDrawColor(255, 153, 0);
        doc.line(margin, y, pageWidth - margin, y);
        y += 6;
    };

    const addSubtitle = (text: string) => {
        checkPage(10);
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(50, 50, 50);
        doc.text(text, margin, y);
        y += 6;
    };

    const addText = (text: string, indent = 0) => {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(60, 60, 60);
        const lines = doc.splitTextToSize(text, maxWidth - indent);
        for (const line of lines) {
            checkPage(6);
            doc.text(line, margin + indent, y);
            y += 5;
        }
    };

    const addBullet = (text: string) => {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(60, 60, 60);
        const lines = doc.splitTextToSize(text, maxWidth - 8);
        for (let i = 0; i < lines.length; i++) {
            checkPage(6);
            if (i === 0) {
                doc.text("•", margin + 3, y);
            }
            doc.text(lines[i], margin + 8, y);
            y += 5;
        }
    };

    const addSpacer = (h = 5) => { y += h; };

    // === COVER HEADER ===
    doc.setFillColor(10, 14, 26);
    doc.rect(0, 0, pageWidth, 50, "F");
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 153, 0);
    doc.text("Vyapar.AI", margin, 22);
    doc.setFontSize(10);
    doc.setTextColor(180, 180, 180);
    doc.text("Product Intelligence Report", margin, 30);
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    const titleLines = doc.splitTextToSize(projectName, maxWidth);
    doc.text(titleLines, margin, 42);
    y = 58;

    doc.setFontSize(9);
    doc.setTextColor(130, 130, 130);
    doc.text(`Generated: ${new Date().toLocaleDateString("en-IN", { dateStyle: "long" })}`, margin, y);
    doc.text(`Launch Readiness Score: ${analysis.launch_readiness_score || "N/A"}/100`, pageWidth - margin - 60, y);
    y += 10;

    // === 1. MARKET OVERVIEW ===
    if (analysis.market_overview) {
        const m = analysis.market_overview;
        addTitle("1. Market Overview");
        addSubtitle(`Verdict: ${m.should_launch ? "YES — Launch Recommended" : "NO — Not Recommended"}`);
        addText(`Confidence: ${m.confidence_score}%`);
        addText(`Market Size (India): ${m.market_size_india} | Global: ${m.market_size_global}`);
        addText(`Competition Level: ${m.competition_level}`);
        addSpacer();
        addText(m.summary || "");
        addSpacer();
        if (m.trends?.length) {
            addSubtitle("Trends:");
            m.trends.forEach(t => addBullet(t));
        }
        addSpacer(8);
    }

    // === 2. COMPETITOR ANALYSIS ===
    if (analysis.competitor_analysis) {
        addTitle("2. Competitor Analysis");
        addText(analysis.competitor_analysis.summary);
        addSpacer();
        analysis.competitor_analysis.competitors?.forEach((c, i) => {
            addSubtitle(`${i + 1}. ${c.brand_name}`);
            addText(`Price: ${c.price_range} | Rating: ${c.avg_rating} ★ | Reviews: ${c.review_count?.toLocaleString()}`);
            if (c.key_features?.length) addText(`Features: ${c.key_features.join(", ")}`, 3);
            addSpacer(3);
        });
        addSpacer(5);
    }

    // === 3. PRICING STRATEGY ===
    if (analysis.pricing_strategy) {
        const p = analysis.pricing_strategy;
        addTitle("3. Pricing Strategy");
        addText(`Ideal Range: ₹${p.ideal_range?.min?.toLocaleString()} - ₹${p.ideal_range?.max?.toLocaleString()}`);
        addText(`Budget: ₹${p.budget_tier?.min?.toLocaleString()} - ₹${p.budget_tier?.max?.toLocaleString()}`);
        addText(`Premium: ₹${p.premium_tier?.min?.toLocaleString()} - ₹${p.premium_tier?.max?.toLocaleString()}`);
        addSpacer();
        addSubtitle("Positioning:");
        addText(p.positioning_statement || "");
        addSpacer();
        if (p.usp_suggestions?.length) {
            addSubtitle("Unique Selling Propositions:");
            p.usp_suggestions.forEach(u => addBullet(u));
        }
        addSpacer(8);
    }

    // === 4. FEATURE RECOMMENDATIONS ===
    if (analysis.feature_recommendations) {
        addTitle("4. Feature Recommendations");
        if (analysis.feature_recommendations.recommended?.length) {
            addSubtitle("Recommended:");
            analysis.feature_recommendations.recommended.forEach(f => {
                addBullet(`${f.feature}: ${f.reason}`);
            });
        }
        addSpacer();
        if (analysis.feature_recommendations.avoid?.length) {
            addSubtitle("Avoid:");
            analysis.feature_recommendations.avoid.forEach(f => {
                addBullet(`${f.feature}: ${f.reason}`);
            });
        }
        addSpacer(8);
    }

    // === 5. TARGET AUDIENCE ===
    if (analysis.target_segments) {
        const t = analysis.target_segments;
        addTitle("5. Target Audience");
        addText(`Primary Age: ${t.primary_age} | Secondary: ${t.secondary_age}`);
        addSpacer();
        addSubtitle("Psychographic Profile:");
        addText(t.psychographic_profile || "");
        addSpacer();
        if (t.personas?.length) {
            addSubtitle("Buyer Personas:");
            t.personas.forEach(p => {
                addBullet(`${p.name} (${p.age}): ${p.bio}`);
                addText(`Motivation: ${p.buying_motivation}`, 8);
                addSpacer(2);
            });
        }
        addSpacer(8);
    }

    // === 6. BILL OF MATERIALS ===
    if (analysis.component_costs) {
        const c = analysis.component_costs;
        addTitle("6. Bill of Materials (BOM)");
        c.items?.forEach(item => {
            addBullet(`${item.component}: ₹${item.cost_inr} (${item.supplier_type})`);
        });
        addSpacer();
        addSubtitle(`Total per Unit: ₹${c.total_per_unit} | Margin: ${c.margin_at_recommended_price}%`);
        addSpacer(8);
    }

    // === 7. INVENTORY PLANNING ===
    if (analysis.inventory_planning) {
        const inv = analysis.inventory_planning;
        addTitle("7. Inventory Planning");
        addText(`First Batch: ${inv.recommended_first_batch} units`);
        addText(`Break-even: ${inv.break_even_units} units (${inv.break_even_months} months)`);
        addText(`Minimum Budget: ${inv.minimum_budget}`);
        addSpacer(8);
    }

    // === 8. REVENUE PROJECTIONS ===
    if (analysis.revenue_projections) {
        const r = analysis.revenue_projections;
        addTitle("8. Revenue Projections");
        addText(`Month 1: ₹${r.month_1?.toLocaleString("en-IN")}`);
        addText(`Month 3: ₹${r.month_3?.toLocaleString("en-IN")}`);
        addText(`Month 6: ₹${r.month_6?.toLocaleString("en-IN")}`);
        addText(`Month 12: ₹${r.month_12?.toLocaleString("en-IN")}`);
        addSpacer(8);
    }

    // === 9. BRAND IDENTITY ===
    if (analysis.brand_strategy) {
        const b = analysis.brand_strategy;
        addTitle("9. Brand Identity");
        if (b.brand_names?.length) {
            addSubtitle("Suggested Names:");
            b.brand_names.forEach(n => addBullet(`${n.name} — ${n.rationale}`));
        }
        addSpacer();
        if (b.taglines?.length) {
            addSubtitle("Taglines:");
            b.taglines.forEach(t => addBullet(`"${t}"`));
        }
        addSpacer();
        if (b.typography) { addSubtitle("Typography:"); addText(b.typography); }
        if (b.brand_voice) { addSubtitle("Brand Voice:"); addText(b.brand_voice); }
        if (b.logo_concept) { addSubtitle("Logo Concept:"); addText(b.logo_concept); }
        addSpacer(8);
    }

    // === 10. MARKETING ===
    if (analysis.campaign_ideas) {
        addTitle("10. Marketing & Campaigns");
        analysis.campaign_ideas.campaigns?.forEach(c => {
            addSubtitle(`${c.name} (${c.platform} / ${c.format})`);
            addText(c.hook);
            addText(`Est. Reach: ${c.estimated_reach}`);
            addSpacer(3);
        });
        addText(`Influencer Tier: ${analysis.campaign_ideas.influencer_tier}`);
        addText(`Seasonal Timing: ${analysis.campaign_ideas.seasonal_timing}`);
        if (analysis.campaign_ideas.ppc_keywords?.length) {
            addSubtitle("PPC Keywords:");
            addText(analysis.campaign_ideas.ppc_keywords.join(", "));
        }
    }

    // Footer
    checkPage(20);
    addSpacer(10);
    doc.setDrawColor(255, 153, 0);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;
    doc.setFontSize(8);
    doc.setTextColor(130, 130, 130);
    doc.text("Report generated by Vyapar.AI — Powered by AWS", margin, y);
    doc.text("Sources: OpenRouter AI (Claude Opus), Amazon India (Firecrawl), Google (Serper)", margin, y + 4);

    return doc.output("arraybuffer");
}
