import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { query } from "@/lib/db";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        const projects = await query(
            "SELECT * FROM projects WHERE id = $1 AND user_id = $2",
            [id, user.id]
        );

        if (projects.length === 0) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        const project = projects[0];

        const analysis = await query(
            "SELECT * FROM analysis_results WHERE project_id = $1",
            [id]
        );

        const assets = await query(
            "SELECT * FROM generated_assets WHERE project_id = $1",
            [id]
        );

        return NextResponse.json({
            project,
            analysis: analysis[0] || null,
            assets,
        });
    } catch (error) {
        console.error("Get project error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
