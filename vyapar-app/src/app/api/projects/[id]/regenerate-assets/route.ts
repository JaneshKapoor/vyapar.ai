import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { generateWebsite } from "@/lib/pipeline/generate-website";
import { generateMockup } from "@/lib/pipeline/generate-mockup";
import { uploadToS3 } from "@/lib/s3";

// POST /api/projects/[id]/regenerate-assets — regenerate missing assets
export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: projectId } = await params;

    try {
        // Get project + analysis
        const projects = await query("SELECT * FROM projects WHERE id = $1", [projectId]);
        if (projects.length === 0) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        const project = projects[0];

        const analysisRows = await query("SELECT * FROM analysis_results WHERE project_id = $1", [projectId]);
        if (analysisRows.length === 0) {
            return NextResponse.json({ error: "No analysis results found" }, { status: 404 });
        }

        const ar = analysisRows[0];
        // Parse the brand_strategy JSON
        const brand_strategy = typeof ar.brand_strategy === "string"
            ? JSON.parse(ar.brand_strategy)
            : ar.brand_strategy;

        // Check existing assets
        const existingAssets = await query(
            "SELECT asset_type FROM generated_assets WHERE project_id = $1",
            [projectId]
        );
        const existingTypes = new Set(existingAssets.map(a => a.asset_type));

        const results: Record<string, string> = {};

        // Generate website if missing
        if (!existingTypes.has("website_html") && brand_strategy) {
            try {
                console.log(`[Regenerate] Generating website for ${projectId}...`);
                const html = await generateWebsite(
                    project.name as string,
                    project.product_query as string,
                    brand_strategy
                );

                let websiteUrl = "#";
                try {
                    websiteUrl = await uploadToS3(
                        `projects/${projectId}/website.html`,
                        html,
                        "text/html"
                    );
                } catch {
                    websiteUrl = `data:text/html;base64,${Buffer.from(html).toString("base64")}`;
                }

                await query(
                    "INSERT INTO generated_assets (project_id, asset_type, s3_url) VALUES ($1, $2, $3)",
                    [projectId, "website_html", websiteUrl]
                );
                results.website = "generated";
            } catch (err) {
                console.error("Website regeneration error:", err);
                results.website = `error: ${err instanceof Error ? err.message : "unknown"}`;
            }
        } else if (existingTypes.has("website_html")) {
            results.website = "already exists";
        }

        // Generate mockup if missing
        if (!existingTypes.has("product_mockup") && brand_strategy) {
            try {
                console.log(`[Regenerate] Generating mockup for ${projectId}...`);
                // Extract product category from the query
                const productQuery = project.product_query as string;
                const brandName = brand_strategy.brand_names?.[0]?.name || project.name;
                const brandColors = brand_strategy.color_palette?.map((c: { hex: string }) => c.hex) || ["#FF9900"];

                const mockupUrl = await generateMockup(productQuery, brandName, brandColors);

                if (mockupUrl) {
                    await query(
                        "INSERT INTO generated_assets (project_id, asset_type, s3_url) VALUES ($1, $2, $3)",
                        [projectId, "product_mockup", mockupUrl]
                    );
                    results.mockup = "generated";
                } else {
                    results.mockup = "generation returned null";
                }
            } catch (err) {
                console.error("Mockup regeneration error:", err);
                results.mockup = `error: ${err instanceof Error ? err.message : "unknown"}`;
            }
        } else if (existingTypes.has("product_mockup")) {
            results.mockup = "already exists";
        }

        // Generate PDF asset record if missing
        if (!existingTypes.has("pdf_report")) {
            try {
                // Store a reference — actual PDF is generated on-demand by download-report endpoint
                await query(
                    "INSERT INTO generated_assets (project_id, asset_type, s3_url) VALUES ($1, $2, $3)",
                    [projectId, "pdf_report", `/api/projects/${projectId}/download-report`]
                );
                results.pdf = "generated";
            } catch (err) {
                console.error("PDF asset record error:", err);
                results.pdf = `error: ${err instanceof Error ? err.message : "unknown"}`;
            }
        } else {
            results.pdf = "already exists";
        }

        return NextResponse.json({ status: "done", results });
    } catch (error) {
        console.error("Regenerate assets error:", error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
}
