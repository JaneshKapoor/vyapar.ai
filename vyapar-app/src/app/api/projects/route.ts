import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { query } from "@/lib/db";

export async function GET() {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const projects = await query(
            `SELECT p.*, ar.launch_readiness_score
       FROM projects p
       LEFT JOIN analysis_results ar ON ar.project_id = p.id
       WHERE p.user_id = $1
       ORDER BY p.created_at DESC`,
            [user.id]
        );

        return NextResponse.json({ projects });
    } catch (error) {
        console.error("List projects error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
