import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { query } from "@/lib/db";

export async function POST(request: Request) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { product_query, website_url, name } = await request.json();

        if (!product_query) {
            return NextResponse.json({ error: "Product query is required" }, { status: 400 });
        }

        const projectName = name || product_query.slice(0, 100);

        const rows = await query(
            `INSERT INTO projects (user_id, name, product_query, website_url, status) 
       VALUES ($1, $2, $3, $4, 'pending') 
       RETURNING id, name, product_query, status, created_at`,
            [user.id, projectName, product_query, website_url || null]
        );

        const project = rows[0];

        // Fire-and-forget pipeline execution
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        fetch(`${appUrl}/api/pipeline/run`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ project_id: project.id }),
        }).catch((err) => console.error("Pipeline trigger error:", err));

        return NextResponse.json({ project });
    } catch (error) {
        console.error("Create project error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
