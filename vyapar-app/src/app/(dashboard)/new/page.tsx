"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Globe, Loader2 } from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { PipelineProgress } from "@/components/shared/PipelineProgress";
import type { PipelineStep } from "@/types";

const PLACEHOLDER_IDEAS = [
    "A premium smartwatch brand targeting Gen Z in India",
    "Budget earbuds competing with boAt and Noise",
    "Organic skincare brand for women 25-40 in metro cities",
    "Ergonomic laptop stand for work-from-home professionals",
    "Premium yoga mat brand with natural rubber",
];

const PIPELINE_STEPS: PipelineStep[] = [
    { id: 1, label: "🔍 Parsing your product idea...", icon: "parse", status: "pending" },
    { id: 2, label: "🛒 Scraping Amazon for competitors...", icon: "scrape-amazon", status: "pending" },
    { id: 3, label: "🌐 Researching market trends...", icon: "scrape-web", status: "pending" },
    { id: 4, label: "🧠 Running AI analysis...", icon: "analyze", status: "pending" },
    { id: 5, label: "🎨 Generating brand assets...", icon: "generate", status: "pending" },
    { id: 6, label: "📄 Building your report...", icon: "report", status: "pending" },
];

export default function NewProjectPage() {
    const router = useRouter();
    const [step, setStep] = useState<"form" | "progress">("form");
    const [query, setQuery] = useState("");
    const [websiteUrl, setWebsiteUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [projectId, setProjectId] = useState<string | null>(null);
    const [pipelineSteps, setPipelineSteps] = useState<PipelineStep[]>(PIPELINE_STEPS);
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    // Cycle placeholder text
    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((i) => (i + 1) % PLACEHOLDER_IDEAS.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Poll for project status
    const pollStatus = useCallback((id: string) => {
        const interval = setInterval(async () => {
            try {
                const res = await fetch(`/api/projects/${id}/status`);
                const data = await res.json();

                let activeStep = 1;
                if (data.status === "scraping") activeStep = 2;
                else if (data.status === "analyzing") activeStep = 4;
                else if (data.status === "generating") activeStep = 5;
                else if (data.status === "complete") activeStep = 7; // all done
                else if (data.status === "error") activeStep = -1;

                setPipelineSteps((steps) =>
                    steps.map((s) => ({
                        ...s,
                        status:
                            data.status === "error" && s.id === activeStep ? "error" :
                                s.id < activeStep ? "complete" :
                                    s.id === activeStep ? "active" :
                                        "pending",
                    }))
                );

                if (data.status === "complete") {
                    clearInterval(interval);
                    setTimeout(() => router.push(`/project/${id}`), 1500);
                } else if (data.status === "error") {
                    clearInterval(interval);
                }
            } catch {
                // Continue polling
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        try {
            const res = await fetch("/api/projects/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    product_query: query,
                    website_url: websiteUrl || null,
                    name: query.slice(0, 100),
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            setProjectId(data.project.id);
            setStep("progress");
            setPipelineSteps((steps) =>
                steps.map((s, i) => ({
                    ...s,
                    status: i === 0 ? "active" : "pending",
                }))
            );
            pollStatus(data.project.id);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0e1a]">
            <Navbar />
            <main className="max-w-2xl mx-auto px-4 py-12">
                <AnimatePresence mode="wait">
                    {step === "form" ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-br from-[#FF9900] to-[#e68a00] rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Sparkles className="w-8 h-8 text-white" />
                                </div>
                                <h1 className="text-3xl font-bold text-white mb-2">
                                    Describe Your Product Idea
                                </h1>
                                <p className="text-[#8892a4]">
                                    Tell us what you want to sell, and we&apos;ll analyze the market for you
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-[#8892a4] mb-2">
                                        Product / Brand Idea
                                    </label>
                                    <textarea
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                        placeholder={PLACEHOLDER_IDEAS[placeholderIndex]}
                                        rows={4}
                                        required
                                        className="w-full resize-none text-lg"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-[#8892a4] mb-2">
                                        <Globe className="w-4 h-4" />
                                        Existing Website (optional)
                                    </label>
                                    <input
                                        type="url"
                                        value={websiteUrl}
                                        onChange={(e) => setWebsiteUrl(e.target.value)}
                                        placeholder="https://your-brand.com"
                                        className="w-full"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || !query.trim()}
                                    className="w-full py-4 bg-gradient-to-r from-[#FF9900] to-[#e68a00] rounded-xl font-bold text-lg text-white hover:shadow-xl hover:shadow-[#FF9900]/20 transition disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        <>
                                            <Sparkles className="w-5 h-5" />
                                            Analyze Now
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="progress"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-white mb-2">
                                    Analysis in Progress
                                </h1>
                                <p className="text-[#8892a4]">
                                    Our AI is analyzing the market for your product. This usually takes 2-5 minutes.
                                </p>
                            </div>

                            <div className="bg-[#1a2235] border border-[#1e2d40] rounded-2xl p-6">
                                <PipelineProgress steps={pipelineSteps} />
                            </div>

                            {projectId && (
                                <p className="text-center text-sm text-[#8892a4] mt-6">
                                    Project ID: <code className="text-[#00d4ff]">{projectId}</code>
                                </p>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
