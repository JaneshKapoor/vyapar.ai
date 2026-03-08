import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const projects = await query(
            "SELECT id, status, error_message, updated_at FROM projects WHERE id = $1",
            [id]
        );

        if (projects.length === 0) {
            return NextResponse.json({ error: "Project not found" }, { status: 404 });
        }

        return NextResponse.json({
            status: projects[0].status,
            error_message: projects[0].error_message,
            updated_at: projects[0].updated_at,
        });
    } catch (error) {
        console.error("Get status error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
