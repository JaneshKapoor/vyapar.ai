"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, FolderOpen } from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { GlowCard } from "@/components/shared/GlowCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ScoreRing } from "@/components/shared/ScoreRing";
import type { Project } from "@/types";

export default function DashboardPage() {
    const [projects, setProjects] = useState<(Project & { launch_readiness_score?: number })[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/projects")
            .then((res) => res.json())
            .then((data) => {
                setProjects(data.projects || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0e1a]">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Your Projects</h1>
                        <p className="text-[#8892a4] mt-1">Manage and track your product analyses</p>
                    </div>
                    <Link
                        href="/new"
                        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#FF9900] to-[#e68a00] rounded-lg font-semibold text-white hover:shadow-lg hover:shadow-[#FF9900]/20 transition"
                    >
                        <Plus className="w-4 h-4" />
                        New Project
                    </Link>
                </div>

                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="skeleton h-48 rounded-xl" />
                        ))}
                    </div>
                ) : projects.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-24"
                    >
                        <div className="w-20 h-20 bg-[#1a2235] rounded-2xl flex items-center justify-center mb-6">
                            <FolderOpen className="w-10 h-10 text-[#8892a4]" />
                        </div>
                        <h2 className="text-xl font-bold text-white mb-2">No projects yet</h2>
                        <p className="text-[#8892a4] mb-6 text-center max-w-sm">
                            Create your first project to get AI-powered market analysis, competitor intel, and brand strategy.
                        </p>
                        <Link
                            href="/new"
                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF9900] to-[#e68a00] rounded-lg font-semibold text-white"
                        >
                            <Plus className="w-5 h-5" />
                            Create First Project
                        </Link>
                        <Link
                            href="/demo"
                            className="mt-4 text-sm text-[#00d4ff] hover:underline"
                        >
                            Or try the demo first →
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Link href={`/project/${project.id}`}>
                                    <GlowCard className="cursor-pointer h-full">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1 min-w-0 pr-4">
                                                <h3 className="text-lg font-bold text-white truncate">{project.name}</h3>
                                                <p className="text-sm text-[#8892a4] mt-1 line-clamp-2">
                                                    {project.product_query}
                                                </p>
                                            </div>
                                            {project.launch_readiness_score && project.status === "complete" && (
                                                <ScoreRing score={project.launch_readiness_score} size={56} strokeWidth={4} />
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between mt-4">
                                            <StatusBadge status={project.status} />
                                            <span className="text-xs text-[#8892a4]">
                                                {new Date(project.created_at).toLocaleDateString("en-IN", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        </div>
                                    </GlowCard>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
