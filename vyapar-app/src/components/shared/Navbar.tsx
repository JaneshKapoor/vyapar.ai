"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, LogOut, User, LayoutDashboard, Plus } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
    const router = useRouter();
    const [user, setUser] = useState<{ name?: string; email: string } | null>(null);

    useEffect(() => {
        fetch("/api/auth/me")
            .then((res) => res.ok ? res.json() : null)
            .then((data) => {
                if (data?.user) setUser(data.user);
            })
            .catch(() => { });
    }, []);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/login");
    };

    return (
        <nav className="border-b border-[#1e2d40] bg-[#0a0e1a]/80 backdrop-blur-xl sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#FF9900] to-[#e68a00] rounded-lg flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">Vyapar<span className="text-[#FF9900]">.AI</span></span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/dashboard"
                            className="hidden sm:flex items-center gap-2 text-[#8892a4] hover:text-white transition px-3 py-2 rounded-lg hover:bg-[#1a2235]"
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            Dashboard
                        </Link>
                        <Link
                            href="/new"
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FF9900] to-[#e68a00] rounded-lg font-semibold text-sm text-white hover:shadow-lg hover:shadow-[#FF9900]/20 transition"
                        >
                            <Plus className="w-4 h-4" />
                            New Project
                        </Link>
                        {user && (
                            <div className="flex items-center gap-3 ml-2">
                                <div className="hidden md:flex items-center gap-2 text-sm text-[#8892a4]">
                                    <User className="w-4 h-4" />
                                    {user.name || user.email}
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-[#8892a4] hover:text-white transition rounded-lg hover:bg-[#1a2235]"
                                    title="Logout"
                                >
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
