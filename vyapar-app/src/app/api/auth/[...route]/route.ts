import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";
import { hashPassword, verifyPassword, setAuthCookie, clearAuthCookie, getCurrentUser } from "@/lib/auth";

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ route: string[] }> }
) {
    const { route } = await params;
    const action = route?.[0];

    try {
        if (action === "signup") {
            const { email, password, name } = await request.json();

            if (!email || !password) {
                return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
            }

            // Check if user exists
            const existing = await query("SELECT id FROM users WHERE email = $1", [email]);
            if (existing.length > 0) {
                return NextResponse.json({ error: "Email already registered" }, { status: 409 });
            }

            const password_hash = await hashPassword(password);
            const rows = await query(
                "INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name",
                [email, password_hash, name || null]
            );

            await setAuthCookie(rows[0].id as string);
            return NextResponse.json({ user: rows[0] });
        }

        if (action === "login") {
            const { email, password } = await request.json();

            if (!email || !password) {
                return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
            }

            const rows = await query(
                "SELECT id, email, name, password_hash FROM users WHERE email = $1",
                [email]
            );

            if (rows.length === 0) {
                return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
            }

            const valid = await verifyPassword(password, rows[0].password_hash as string);
            if (!valid) {
                return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
            }

            await setAuthCookie(rows[0].id as string);
            return NextResponse.json({
                user: { id: rows[0].id, email: rows[0].email, name: rows[0].name },
            });
        }

        if (action === "logout") {
            await clearAuthCookie();
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: "Unknown route" }, { status: 404 });
    } catch (error) {
        console.error("Auth error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ route: string[] }> }
) {
    const { route } = await params;
    const action = route?.[0];

    if (action === "me") {
        try {
            const user = await getCurrentUser();
            if (!user) {
                return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
            }
            return NextResponse.json({ user });
        } catch {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }
    }

    return NextResponse.json({ error: "Unknown route" }, { status: 404 });
}
