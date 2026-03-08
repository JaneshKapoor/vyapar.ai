import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const assets = await query(
            "SELECT * FROM generated_assets WHERE project_id = $1 ORDER BY created_at",
            [id]
        );

        return NextResponse.json({ assets });
    } catch (error) {
        console.error("Get assets error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
