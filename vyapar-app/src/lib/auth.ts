import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { query } from "./db";
import type { User } from "@/types";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-key-change-in-production-32chars";
const COOKIE_NAME = "vyapar_token";

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

export function signToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): { userId: string } | null {
    try {
        return jwt.verify(token, JWT_SECRET) as { userId: string };
    } catch {
        return null;
    }
}

export async function setAuthCookie(userId: string) {
    const token = signToken(userId);
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });
}

export async function clearAuthCookie() {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
}

export async function getCurrentUser(): Promise<User | null> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get(COOKIE_NAME);
        if (!token?.value) return null;

        const decoded = verifyToken(token.value);
        if (!decoded) return null;

        const rows = await query(
            "SELECT id, email, name, created_at FROM users WHERE id = $1",
            [decoded.userId]
        );

        if (rows.length === 0) return null;
        return rows[0] as User;
    } catch {
        return null;
    }
}

export function getTokenFromRequest(request: Request): string | null {
    const cookieHeader = request.headers.get("cookie");
    if (!cookieHeader) return null;

    const cookies = cookieHeader.split(";").map(c => c.trim());
    const tokenCookie = cookies.find(c => c.startsWith(`${COOKIE_NAME}=`));
    if (!tokenCookie) return null;

    return tokenCookie.split("=")[1];
}
