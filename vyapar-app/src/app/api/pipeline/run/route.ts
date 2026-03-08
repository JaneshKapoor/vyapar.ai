import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { parseIntent } from "@/lib/pipeline/parse-intent";
import { scrapeAmazon } from "@/lib/pipeline/scrape-amazon";
import { scrapeWebIntel } from "@/lib/pipeline/scrape-web";
import { runDeepAnalysis } from "@/lib/pipeline/analyze";
import { generateWebsite } from "@/lib/pipeline/generate-website";
import { generateMockup } from "@/lib/pipeline/generate-mockup";
import { generatePdfReport } from "@/lib/pipeline/generate-pdf";
import { scrapeUrl } from "@/lib/firecrawl";
import { uploadToS3 } from "@/lib/s3";

async function updateStatus(projectId: string, status: string, errorMessage?: string) {
    if (errorMessage) {
        await query(
            "UPDATE projects SET status = $1, error_message = $2, updated_at = NOW() WHERE id = $3",
            [status, errorMessage, projectId]
        );
    } else {
        await query(
            "UPDATE projects SET status = $1, updated_at = NOW() WHERE id = $2",
            [status, projectId]
        );
    }
}

export async function POST(request: Request) {
    const { project_id } = await request.json();

    if (!project_id) {
        return NextResponse.json({ error: "project_id is required" }, { status: 400 });
    }

    // Run pipeline in background (don't await in response)
    runPipeline(project_id).catch((err) => {
        console.error("Pipeline failed:", err);
    });

    return NextResponse.json({ status: "started" });
}

async function runPipeline(projectId: string) {
    try {
        // Get project details
        const projects = await query("SELECT * FROM projects WHERE id = $1", [projectId]);
        if (projects.length === 0) throw new Error("Project not found");

        const project = projects[0];
        const productQuery = project.product_query as string;
        const websiteUrl = project.website_url as string | null;

        // Step 1: Parse Intent
        await updateStatus(projectId, "scraping");
        const intent = await parseIntent(productQuery);

        // Step 2: Scrape Amazon
        let amazonData = "";
        try {
            amazonData = await scrapeAmazon(intent.keywords);
        } catch (err) {
            console.error("Amazon scrape error (continuing):", err);
        }

        // Step 3: Scrape Web for Market Intel
        let webData = "";
        try {
            webData = await scrapeWebIntel(intent.product_category, intent.target_market);
        } catch (err) {
            console.error("Web scrape error (continuing):", err);
        }

        // Step 4: Scrape User's Website (optional)
        let websiteData: string | null = null;
        if (websiteUrl) {
            try {
                websiteData = await scrapeUrl(websiteUrl);
            } catch (err) {
                console.error("Website scrape error (continuing):", err);
            }
        }

        // Step 5: Deep AI Analysis
        await updateStatus(projectId, "analyzing");
        const analysis = await runDeepAnalysis(productQuery, amazonData, webData, websiteData);

        // Store analysis results
        await query(
            `INSERT INTO analysis_results 
       (project_id, market_overview, competitor_analysis, pricing_strategy, feature_recommendations,
        target_segments, inventory_planning, revenue_projections, brand_strategy, campaign_ideas, 
        component_costs, launch_readiness_score) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
            [
                projectId,
                JSON.stringify(analysis.market_overview),
                JSON.stringify(analysis.competitor_analysis),
                JSON.stringify(analysis.pricing_strategy),
                JSON.stringify(analysis.feature_recommendations),
                JSON.stringify(analysis.target_segments),
                JSON.stringify(analysis.inventory_planning),
                JSON.stringify(analysis.revenue_projections),
                JSON.stringify(analysis.brand_strategy),
                JSON.stringify(analysis.campaign_ideas),
                JSON.stringify(analysis.component_costs),
                analysis.launch_readiness_score || 70,
            ]
        );

        // Step 6: Generate Brand Website
        await updateStatus(projectId, "generating");
        if (analysis.brand_strategy) {
            try {
                const html = await generateWebsite(
                    intent.product_name,
                    productQuery,
                    analysis.brand_strategy
                );

                // Try S3 upload, fallback to storing in DB
                let websiteAssetUrl = "#";
                try {
                    websiteAssetUrl = await uploadToS3(
                        `projects/${projectId}/website.html`,
                        html,
                        "text/html"
                    );
                } catch {
                    // Store HTML directly in assets without S3
                    websiteAssetUrl = `data:text/html;base64,${Buffer.from(html).toString("base64")}`;
                }

                await query(
                    "INSERT INTO generated_assets (project_id, asset_type, s3_url) VALUES ($1, $2, $3)",
                    [projectId, "website_html", websiteAssetUrl]
                );
            } catch (err) {
                console.error("Website generation error:", err);
            }
        }

        // Step 7: Generate Product Mockup
        try {
            const mockupUrl = await generateMockup(
                intent.product_category,
                analysis.brand_strategy?.brand_names?.[0]?.name || intent.product_name,
                analysis.brand_strategy?.color_palette?.map(c => c.hex) || ["#FF9900"]
            );

            if (mockupUrl) {
                await query(
                    "INSERT INTO generated_assets (project_id, asset_type, s3_url) VALUES ($1, $2, $3)",
                    [projectId, "product_mockup", mockupUrl]
                );
            }
        } catch (err) {
            console.error("Mockup generation error:", err);
        }

        // Step 8: Generate PDF Report
        try {
            const pdfBuffer = await generatePdfReport(
                project.name as string,
                analysis
            );

            let pdfUrl = "#";
            try {
                pdfUrl = await uploadToS3(
                    `projects/${projectId}/report.txt`,
                    pdfBuffer,
                    "text/plain"
                );
            } catch {
                pdfUrl = `data:text/plain;base64,${pdfBuffer.toString("base64")}`;
            }

            await query(
                "INSERT INTO generated_assets (project_id, asset_type, s3_url) VALUES ($1, $2, $3)",
                [projectId, "pdf_report", pdfUrl]
            );
        } catch (err) {
            console.error("PDF generation error:", err);
        }

        // Step 9: Mark Complete
        await updateStatus(projectId, "complete");
    } catch (error) {
        console.error("Pipeline error:", error);
        await updateStatus(
            projectId,
            "error",
            error instanceof Error ? error.message : "Unknown error occurred"
        );
    }
}
