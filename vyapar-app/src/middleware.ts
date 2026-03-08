import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const protectedPaths = ["/dashboard", "/new", "/project"];
const COOKIE_NAME = "vyapar_token";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the path needs protection
    const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
    if (!isProtected) return NextResponse.next();

    // Allow demo route without auth
    if (pathname.startsWith("/demo")) return NextResponse.next();

    const token = request.cookies.get(COOKIE_NAME)?.value;

    if (!token) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    try {
        const secret = new TextEncoder().encode(
            process.env.JWT_SECRET || "dev-secret-key-change-in-production-32chars"
        );
        await jwtVerify(token, secret);
        return NextResponse.next();
    } catch {
        // Token is invalid or expired
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
    }
}

export const config = {
    matcher: ["/dashboard/:path*", "/new/:path*", "/project/:path*"],
};
