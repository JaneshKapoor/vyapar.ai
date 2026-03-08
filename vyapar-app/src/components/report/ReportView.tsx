"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/shared/Navbar";
import { ScoreRing } from "@/components/shared/ScoreRing";
import {
    BarChart3, Target, Users, Briefcase, Megaphone, Palette, Download,
    TrendingUp, CheckCircle, XCircle, Globe, ArrowRight, ExternalLink
} from "lucide-react";
import Link from "next/link";
import type { AnalysisResults, Project, GeneratedAsset } from "@/types";
import { DEMO_PROJECT, DEMO_ANALYSIS, DEMO_ASSETS } from "@/lib/demo-data";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, Area, AreaChart
} from "recharts";

const TABS = [
    { id: "market", label: "Market Overview", icon: BarChart3 },
    { id: "strategy", label: "Product Strategy", icon: Target },
    { id: "audience", label: "Target Audience", icon: Users },
    { id: "business", label: "Business Plan", icon: Briefcase },
    { id: "marketing", label: "Marketing", icon: Megaphone },
    { id: "brand", label: "Brand Identity", icon: Palette },
    { id: "assets", label: "Assets", icon: Download },
];

interface ReportViewProps {
    projectId: string;
    isDemo: boolean;
}

export function ReportView({ projectId, isDemo }: ReportViewProps) {
    const [activeTab, setActiveTab] = useState("market");
    const [project, setProject] = useState<Project | null>(null);
    const [analysis, setAnalysis] = useState<AnalysisResults | null>(null);
    const [assets, setAssets] = useState<GeneratedAsset[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isDemo) {
            setProject(DEMO_PROJECT);
            setAnalysis(DEMO_ANALYSIS);
            setAssets(DEMO_ASSETS);
            setLoading(false);
            return;
        }

        fetch(`/api/projects/${projectId}`)
            .then(res => res.json())
            .then(data => {
                setProject(data.project);
                setAnalysis(data.analysis);
                setAssets(data.assets || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [projectId, isDemo]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0e1a]">
                <Navbar />
                <main className="max-w-7xl mx-auto px-4 py-8">
                    <div className="skeleton h-24 rounded-xl mb-6" />
                    <div className="skeleton h-12 rounded-xl mb-6" />
                    <div className="grid md:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map(i => <div key={i} className="skeleton h-48 rounded-xl" />)}
                    </div>
                </main>
            </div>
        );
    }

    if (!project || !analysis) {
        return (
            <div className="min-h-screen bg-[#0a0e1a]">
                <Navbar />
                <main className="max-w-7xl mx-auto px-4 py-8 text-center">
                    <h1 className="text-2xl font-bold text-white">Project not found</h1>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0e1a]">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#1a2235] border border-[#1e2d40] rounded-2xl p-6 mb-6"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                {isDemo && (
                                    <span className="px-2 py-0.5 bg-[#FF9900]/10 text-[#FF9900] text-xs font-medium rounded-full">Demo</span>
                                )}
                                <h1 className="text-2xl font-bold text-white">{project.name}</h1>
                            </div>
                            <p className="text-[#8892a4] text-sm">{project.product_query}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-center">
                                <ScoreRing score={analysis.launch_readiness_score || 0} size={72} />
                                <p className="text-xs text-[#8892a4] mt-1">Launch Ready</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Tabs */}
                <div className="mb-6 overflow-x-auto">
                    <div className="flex gap-1 p-1 bg-[#111827] rounded-xl border border-[#1e2d40] min-w-max">
                        {TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                                    ? "bg-[#FF9900] text-white shadow-lg shadow-[#FF9900]/20"
                                    : "text-[#8892a4] hover:text-white hover:bg-[#1a2235]"
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === "market" && <MarketTab analysis={analysis} />}
                        {activeTab === "strategy" && <StrategyTab analysis={analysis} />}
                        {activeTab === "audience" && <AudienceTab analysis={analysis} />}
                        {activeTab === "business" && <BusinessTab analysis={analysis} />}
                        {activeTab === "marketing" && <MarketingTab analysis={analysis} />}
                        {activeTab === "brand" && <BrandTab analysis={analysis} />}
                        {activeTab === "assets" && <AssetsTab projectId={projectId} assets={assets} isDemo={isDemo} />}
                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}

// ===== Market Overview Tab =====
function MarketTab({ analysis }: { analysis: AnalysisResults }) {
    const m = analysis.market_overview;
    if (!m) return <EmptySection />;

    return (
        <div className="space-y-6">
            {/* Verdict Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`p-6 rounded-2xl border-2 ${m.should_launch ? "border-[#00c853]/30 bg-[#00c853]/5" : "border-red-500/30 bg-red-500/5"
                    }`}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-[#8892a4] mb-1">Should you launch this?</p>
                        <h2 className={`text-4xl font-bold ${m.should_launch ? "text-[#00c853]" : "text-red-400"}`}>
                            {m.should_launch ? "YES" : "NO"}
                        </h2>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-[#8892a4]">Confidence</p>
                        <p className="text-3xl font-bold text-[#FF9900]">{m.confidence_score}%</p>
                    </div>
                </div>
                <p className="mt-4 text-[#8892a4]">{m.summary}</p>
            </motion.div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Market Size (India)", value: m.market_size_india, color: "#FF9900" },
                    { label: "Market Size (Global)", value: m.market_size_global, color: "#00d4ff" },
                    {
                        label: "Competition", value: m.competition_level, color:
                            m.competition_level === "Low" ? "#00c853" :
                                m.competition_level === "Medium" ? "#FF9900" :
                                    m.competition_level === "High" ? "#ff6b35" : "#ff3d3d"
                    },
                    { label: "Readiness Score", value: `${analysis.launch_readiness_score}/100`, color: "#FF9900" },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-[#1a2235] border border-[#1e2d40] rounded-xl p-4 text-center"
                    >
                        <p className="text-xs text-[#8892a4] mb-1">{stat.label}</p>
                        <p className="text-xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Market Trend Chart */}
            {m.market_trend_data && m.market_trend_data.length > 0 && (
                <div className="bg-[#1a2235] border border-[#1e2d40] rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Market Trend (Search Interest)</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={m.market_trend_data}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#FF9900" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#FF9900" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e2d40" />
                            <XAxis dataKey="month" stroke="#8892a4" fontSize={12} />
                            <YAxis
                                stroke="#8892a4"
                                fontSize={12}
                                label={{ value: 'Search Interest Index', angle: -90, position: 'insideLeft', fill: '#8892a4', style: { textAnchor: 'middle' } }}
                            />
                            <Tooltip
                                contentStyle={{ background: "#1a2235", border: "1px solid #1e2d40", borderRadius: 8, color: "#f0f4f8" }}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                formatter={(value: any) => [value || 0, "Index"]}
                            />
                            <Area type="monotone" dataKey="value" stroke="#FF9900" fill="url(#colorValue)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            )}

            {/* Competitors Table */}
            {analysis.competitor_analysis && (
                <div className="bg-[#1a2235] border border-[#1e2d40] rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Top Competitors on Amazon</h3>
                    <p className="text-sm text-[#8892a4] mb-4">{analysis.competitor_analysis.summary}</p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-[#1e2d40]">
                                    <th className="text-left p-3 text-[#8892a4] font-medium">Brand</th>
                                    <th className="text-left p-3 text-[#8892a4] font-medium">Price Range</th>
                                    <th className="text-left p-3 text-[#8892a4] font-medium">Rating</th>
                                    <th className="text-left p-3 text-[#8892a4] font-medium">Reviews</th>
                                    <th className="text-left p-3 text-[#8892a4] font-medium">Key Features</th>
                                </tr>
                            </thead>
                            <tbody>
                                {analysis.competitor_analysis.competitors.map((c, i) => (
                                    <motion.tr
                                        key={i}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="border-b border-[#1e2d40]/50 hover:bg-[#111827] transition"
                                    >
                                        <td className="p-3 font-medium text-white">{c.brand_name}</td>
                                        <td className="p-3 text-[#FF9900]">{c.price_range}</td>
                                        <td className="p-3">
                                            <span className="flex items-center gap-1">
                                                <span className="text-yellow-400">★</span>
                                                {c.avg_rating}
                                            </span>
                                        </td>
                                        <td className="p-3 text-[#8892a4]">{c.review_count?.toLocaleString()}</td>
                                        <td className="p-3">
                                            <div className="flex flex-wrap gap-1">
                                                {c.key_features?.slice(0, 3).map((f, j) => (
                                                    <span key={j} className="px-2 py-0.5 bg-[#111827] text-[#8892a4] text-xs rounded-full">
                                                        {f}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Trends */}
            {m.trends && (
                <div className="bg-[#1a2235] border border-[#1e2d40] rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Market Trends</h3>
                    <div className="space-y-3">
                        {m.trends.map((trend, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-3"
                            >
                                <TrendingUp className="w-4 h-4 text-[#FF9900] flex-shrink-0" />
                                <span className="text-[#8892a4]">{trend}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// ===== Product Strategy Tab =====
function StrategyTab({ analysis }: { analysis: AnalysisResults }) {
    const p = analysis.pricing_strategy;
    const f = analysis.feature_recommendations;
    if (!p && !f) return <EmptySection />;

    return (
        <div className="space-y-6">
            {/* Positioning */}
            {p && (
                <div className="bg-gradient-to-r from-[#FF9900]/5 to-transparent border border-[#FF9900]/20 rounded-2xl p-6">
                    <p className="text-xs text-[#FF9900] uppercase tracking-wider mb-2">Positioning Statement</p>
                    <p className="text-xl font-medium text-white">&ldquo;{p.positioning_statement}&rdquo;</p>
                </div>
            )}

            {/* Pricing Tiers */}
            {p && (
                <div className="grid md:grid-cols-3 gap-4">
                    {[
                        { label: "Budget", range: p.budget_tier, color: "#8892a4" },
                        { label: "Mid (Recommended)", range: p.ideal_range, color: "#FF9900" },
                        { label: "Premium", range: p.premium_tier, color: "#00d4ff" },
                    ].map((tier) => (
                        <div
                            key={tier.label}
                            className={`bg-[#1a2235] border rounded-xl p-5 text-center ${tier.label.includes("Recommended") ? "border-[#FF9900]/40 ring-1 ring-[#FF9900]/10" : "border-[#1e2d40]"
                                }`}
                        >
                            <p className="text-sm text-[#8892a4] mb-2">{tier.label}</p>
                            <p className="text-2xl font-bold" style={{ color: tier.color }}>
                                ₹{tier.range.min?.toLocaleString()} - ₹{tier.range.max?.toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* USPs */}
            {p?.usp_suggestions && (
                <div className="bg-[#1a2235] border border-[#1e2d40] rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Unique Selling Propositions</h3>
                    <div className="space-y-3">
                        {p.usp_suggestions.map((usp, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <ArrowRight className="w-4 h-4 text-[#FF9900] mt-1 flex-shrink-0" />
                                <p className="text-[#8892a4]">{usp}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Features */}
            {f && (
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-[#1a2235] border border-[#1e2d40] rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-[#00c853]" />
                            Recommended Features
                        </h3>
                        <div className="space-y-3">
                            {f.recommended?.map((item, i) => (
                                <div key={i} className="p-3 bg-[#00c853]/5 border border-[#00c853]/10 rounded-lg">
                                    <p className="font-medium text-[#00c853] text-sm">{item.feature}</p>
                                    <p className="text-xs text-[#8892a4] mt-1">{item.reason}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#1a2235] border border-[#1e2d40] rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <XCircle className="w-5 h-5 text-red-400" />
                            Features to Avoid
                        </h3>
                        <div className="space-y-3">
                            {f.avoid?.map((item, i) => (
                                <div key={i} className="p-3 bg-red-500/5 border border-red-500/10 rounded-lg">
                                    <p className="font-medium text-red-400 text-sm">{item.feature}</p>
                                    <p className="text-xs text-[#8892a4] mt-1">{item.reason}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ===== Target Audience Tab =====
function AudienceTab({ analysis }: { analysis: AnalysisResults }) {
    const t = analysis.target_segments;
    if (!t) return <EmptySection />;

    return (
        <div className="space-y-6">
            {/* Age Segments */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#1a2235] border border-[#1e2d40] rounded-xl p-5">
                    <p className="text-sm text-[#8892a4] mb-1">Primary Age Group</p>
                    <p className="text-3xl font-bold text-[#FF9900]">{t.primary_age}</p>
                </div>
                <div className="bg-[#1a2235] border border-[#1e2d40] rounded-xl p-5">
                    <p className="text-sm text-[#8892a4] mb-1">Secondary Age Group</p>
                    <p className="text-3xl font-bold text-[#00d4ff]">{t.secondary_age}</p>
                </div>
            </div>

            {/* Psychographic Profile */}
            <div className="bg-[#1a2235] border border-[#1e2d40] rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">Psychographic Profile</h3>
                <p className="text-[#8892a4] leading-relaxed">{t.psychographic_profile}</p>
            </div>

            {/* Platform Breakdown */}
            {t.platform_breakdown && (
                <div className="bg-[#1a2235] border border-[#1e2d40] rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Where They Spend Time</h3>
                    <div className="space-y-3">
                        {t.platform_breakdown.map((p, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <span className="w-24 text-sm text-[#8892a4]">{p.platform}</span>
                                <div className="flex-1 h-3 bg-[#111827] rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${p.percentage}%` }}
                                        transition={{ delay: i * 0.1, duration: 0.8 }}
                                        className="h-full bg-gradient-to-r from-[#FF9900] to-[#e68a00] rounded-full"
                                    />
                                </div>
                                <span className="text-sm font-medium text-white w-10 text-right">{p.percentage}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Buyer Personas */}
            {t.personas && (
                <div>
                    <h3 className="text-lg font-bold text-white mb-4">Buyer Personas</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                        {t.personas.map((persona, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.15 }}
                                className="bg-[#1a2235] border border-[#1e2d40] rounded-xl p-6"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-[#FF9900] to-[#00d4ff] rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">
                                    {persona.name[0]}
                                </div>
                                <h4 className="font-bold text-white">{persona.name}, {persona.age}</h4>
                                <p className="text-sm text-[#8892a4] mt-2">{persona.bio}</p>
                                <div className="mt-4 pt-4 border-t border-[#1e2d40]">
                                    <p className="text-xs text-[#FF9900] font-medium mb-1">Buying Motivation</p>
                                    <p className="text-xs text-[#8892a4]">{persona.buying_motivation}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// ===== Business Plan Tab =====
function BusinessTab({ analysis }: { analysis: AnalysisResults }) {
    const inv = analysis.inventory_planning;
    const rev = analysis.revenue_projections;
    const costs = analysis.component_costs;
    if (!inv && !rev && !costs) return <EmptySection />;

    return (
        <div className="space-y-6">
            {/* Component Costs Table */}
            {costs && (
                <div className="bg-[#1a2235] border border-[#1e2d40] rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Bill of Materials (BOM)</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-[#1e2d40]">
                                    <th className="text-left p-3 text-[#8892a4]">Component</th>
                                    <th className="text-right p-3 text-[#8892a4]">Cost (INR)</th>
                                    <th className="text-left p-3 text-[#8892a4]">Supplier</th>
                                </tr>
                            </thead>
                            <tbody>
                                {costs.items?.map((item, i) => (
                                    <tr key={i} className="border-b border-[#1e2d40]/30">
                                        <td className="p-3 text-white">{item.component}</td>
                                        <td className="p-3 text-right text-[#FF9900]">₹{item.cost_inr}</td>
                                        <td className="p-3 text-[#8892a4]">{item.supplier_type}</td>
                                    </tr>
                                ))}
                                <tr className="bg-[#111827]">
                                    <td className="p-3 font-bold text-white">Total per Unit</td>
                                    <td className="p-3 text-right font-bold text-[#FF9900]">₹{costs.total_per_unit}</td>
                                    <td className="p-3 text-[#00c853] font-medium">{costs.margin_at_recommended_price}% margin</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Inventory & Budget Stats */}
            {inv && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: "First Batch", value: `${inv.recommended_first_batch} units` },
                        { label: "Break-even", value: `${inv.break_even_units} units` },
                        { label: "Break-even Time", value: `${inv.break_even_months} months` },
                        { label: "Min. Budget", value: inv.minimum_budget },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-[#1a2235] border border-[#1e2d40] rounded-xl p-4 text-center">
                            <p className="text-xs text-[#8892a4] mb-1">{stat.label}</p>
                            <p className="text-xl font-bold text-white">{stat.value}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Revenue Chart */}
            {rev?.chart_data && (
                <div className="bg-[#1a2235] border border-[#1e2d40] rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Revenue Projections</h3>
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={rev.chart_data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e2d40" />
                            <XAxis dataKey="month" stroke="#8892a4" fontSize={12} />
                            <YAxis stroke="#8892a4" fontSize={12} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
                            <Tooltip
                                contentStyle={{ background: "#1a2235", border: "1px solid #1e2d40", borderRadius: 8, color: "#f0f4f8" }}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                formatter={(value: any) => [`₹${Number(value).toLocaleString("en-IN")}`, ""]}
                            />
                            <Bar dataKey="revenue" fill="#FF9900" radius={[4, 4, 0, 0]} name="Revenue" />
                            <Bar dataKey="profit" fill="#00c853" radius={[4, 4, 0, 0]} name="Profit" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}

// ===== Marketing Tab =====
function MarketingTab({ analysis }: { analysis: AnalysisResults }) {
    const c = analysis.campaign_ideas;
    if (!c) return <EmptySection />;

    return (
        <div className="space-y-6">
            {/* Campaign Cards */}
            <div className="grid md:grid-cols-2 gap-6">
                {c.campaigns?.map((campaign, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-[#1a2235] border border-[#1e2d40] rounded-xl p-6 hover:border-[#FF9900]/30 transition"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <span className="px-2 py-0.5 bg-[#FF9900]/10 text-[#FF9900] text-xs font-medium rounded-full">
                                {campaign.platform}
                            </span>
                            <span className="px-2 py-0.5 bg-[#00d4ff]/10 text-[#00d4ff] text-xs font-medium rounded-full">
                                {campaign.format}
                            </span>
                        </div>
                        <h4 className="font-bold text-white mb-2">{campaign.name}</h4>
                        <p className="text-sm text-[#8892a4] mb-3">{campaign.hook}</p>
                        <p className="text-xs text-[#00c853]">Est. reach: {campaign.estimated_reach}</p>
                    </motion.div>
                ))}
            </div>

            {/* Additional Info */}
            <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-[#1a2235] border border-[#1e2d40] rounded-xl p-5">
                    <h4 className="font-bold text-white mb-2">Influencer Strategy</h4>
                    <p className="text-sm text-[#8892a4]">{c.influencer_tier}</p>
                </div>
                <div className="bg-[#1a2235] border border-[#1e2d40] rounded-xl p-5">
                    <h4 className="font-bold text-white mb-2">Launch Timing</h4>
                    <p className="text-sm text-[#8892a4]">{c.seasonal_timing}</p>
                </div>
                <div className="bg-[#1a2235] border border-[#1e2d40] rounded-xl p-5">
                    <h4 className="font-bold text-white mb-2">PPC Keywords</h4>
                    <div className="flex flex-wrap gap-1 mt-2">
                        {c.ppc_keywords?.map((kw, i) => (
                            <span key={i} className="px-2 py-0.5 bg-[#111827] text-[#8892a4] text-xs rounded-full">
                                {kw}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ===== Brand Identity Tab =====
function BrandTab({ analysis }: { analysis: AnalysisResults }) {
    const b = analysis.brand_strategy;
    if (!b) return <EmptySection />;

    return (
        <div className="space-y-6">
            {/* Brand Names */}
            {b.brand_names && (
                <div className="bg-[#1a2235] border border-[#1e2d40] rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Brand Name Suggestions</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {b.brand_names.map((bn, i) => (
                            <div key={i} className="p-4 bg-[#111827] rounded-lg border border-[#1e2d40]">
                                <p className="text-xl font-bold text-[#FF9900]">{bn.name}</p>
                                <p className="text-sm text-[#8892a4] mt-1">{bn.rationale}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Color Palette */}
            {b.color_palette && (
                <div className="bg-[#1a2235] border border-[#1e2d40] rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Color Palette</h3>
                    <div className="grid grid-cols-5 gap-4">
                        {b.color_palette.map((color, i) => (
                            <div key={i} className="text-center">
                                <div
                                    className="w-full aspect-square rounded-xl mb-2 border border-[#1e2d40]"
                                    style={{ backgroundColor: color.hex }}
                                />
                                <p className="text-sm font-medium text-white">{color.name}</p>
                                <p className="text-xs text-[#8892a4]">{color.hex}</p>
                                <p className="text-xs text-[#8892a4] mt-1">{color.usage}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Taglines */}
            {b.taglines && (
                <div className="bg-[#1a2235] border border-[#1e2d40] rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Tagline Options</h3>
                    <div className="space-y-3">
                        {b.taglines.map((tagline, i) => (
                            <div key={i} className="p-4 bg-gradient-to-r from-[#FF9900]/5 to-transparent border border-[#1e2d40] rounded-lg">
                                <p className="text-lg text-white font-medium">&ldquo;{tagline}&rdquo;</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Typography & Voice */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#1a2235] border border-[#1e2d40] rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-3">Typography</h3>
                    <p className="text-sm text-[#8892a4] whitespace-pre-line">{b.typography}</p>
                </div>
                <div className="bg-[#1a2235] border border-[#1e2d40] rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-3">Brand Voice</h3>
                    <p className="text-sm text-[#8892a4]">{b.brand_voice}</p>
                </div>
            </div>

            {/* Logo Concept */}
            {b.logo_concept && (
                <div className="bg-[#1a2235] border border-[#1e2d40] rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-3">Logo Concept</h3>
                    <p className="text-[#8892a4]">{b.logo_concept}</p>
                </div>
            )}
        </div>
    );
}

// ===== Assets Tab =====
function AssetsTab({ projectId, assets, isDemo }: { projectId: string; assets: GeneratedAsset[]; isDemo: boolean }) {
    const websiteAsset = assets.find(a => a.asset_type === "website_html");
    const mockupAsset = assets.find(a => a.asset_type === "product_mockup");
    const pdfAsset = assets.find(a => a.asset_type === "pdf_report");

    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownloadReport = async () => {
        if (isDemo) {
            // For demo, generate a demo report text and download it
            const demoReport = `VYAPAR.AI — DEMO ANALYSIS REPORT\n${"=".repeat(50)}\nThis is a demo report. Create a real project to get a full downloadable report.\n`;
            const blob = new Blob([demoReport], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "vyapar_demo_report.txt";
            a.click();
            URL.revokeObjectURL(url);
        } else if (pdfAsset?.s3_url && pdfAsset.s3_url.startsWith("data:")) {
            // Data URL download
            const a = document.createElement("a");
            a.href = pdfAsset.s3_url;
            a.download = "analysis_report.pdf";
            a.click();
        } else {
            // Download from API securely with proper filename
            try {
                setIsDownloading(true);
                const response = await fetch(`/api/projects/${projectId}/download-report`);
                if (!response.ok) throw new Error("Download failed");
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                // Get filename from content-disposition header if available, else fallback
                const contentDisposition = response.headers.get("content-disposition");
                let filename = "vyapar_report.pdf";
                if (contentDisposition) {
                    const match = contentDisposition.match(/filename="?([^"]+)"?/);
                    if (match && match[1]) filename = match[1];
                }
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            } catch (error) {
                console.error("Failed to download PDF:", error);
                alert("Failed to download report. Please try again.");
            } finally {
                setIsDownloading(false);
            }
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Generated Website */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0 }}
                    className="bg-[#1a2235] border border-[#1e2d40] rounded-xl p-6 hover:border-[#00d4ff]/30 transition"
                >
                    <div className="w-12 h-12 bg-[#00d4ff]/10 rounded-xl flex items-center justify-center mb-4">
                        <Globe className="w-6 h-6 text-[#00d4ff]" />
                    </div>
                    <h4 className="font-bold text-white mb-2">Brand Website</h4>
                    <p className="text-sm text-[#8892a4] mb-4">AI-generated landing page for your brand</p>
                    {isDemo || websiteAsset ? (
                        <Link
                            href={`/project/${projectId}/website`}
                            className="flex items-center gap-2 text-sm text-[#FF9900] hover:text-[#e68a00] font-medium"
                        >
                            <ExternalLink className="w-4 h-4" />
                            Preview Website
                        </Link>
                    ) : (
                        <span className="text-sm text-[#8892a4] flex items-center gap-2">
                            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                            Generating...
                        </span>
                    )}
                </motion.div>

                {/* PDF Report */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-[#1a2235] border border-[#1e2d40] rounded-xl p-6 hover:border-[#FF9900]/30 transition"
                >
                    <div className="w-12 h-12 bg-[#FF9900]/10 rounded-xl flex items-center justify-center mb-4">
                        <Download className="w-6 h-6 text-[#FF9900]" />
                    </div>
                    <h4 className="font-bold text-white mb-2">Analysis Report</h4>
                    <p className="text-sm text-[#8892a4] mb-4">Complete market analysis & business plan</p>
                    <button
                        onClick={handleDownloadReport}
                        className="flex items-center gap-2 text-sm text-[#FF9900] hover:text-[#e68a00] font-medium"
                    >
                        <Download className="w-4 h-4" />
                        Download Report
                    </button>
                </motion.div>

                {/* Product Mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-[#1a2235] border border-[#1e2d40] rounded-xl p-6 hover:border-[#00c853]/30 transition"
                >
                    <div className="w-12 h-12 bg-[#00c853]/10 rounded-xl flex items-center justify-center mb-4">
                        <Palette className="w-6 h-6 text-[#00c853]" />
                    </div>
                    <h4 className="font-bold text-white mb-2">Product Mockup</h4>
                    <p className="text-sm text-[#8892a4] mb-4">AI-generated product visualization</p>
                    {mockupAsset?.s3_url ? (
                        <a
                            href={mockupAsset.s3_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-[#FF9900] hover:text-[#e68a00] font-medium"
                        >
                            <ExternalLink className="w-4 h-4" />
                            View Mockup
                        </a>
                    ) : isDemo ? (
                        <span className="text-sm text-[#8892a4]">Available with real analysis</span>
                    ) : (
                        <span className="text-sm text-[#8892a4] flex items-center gap-2">
                            <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                            Generating...
                        </span>
                    )}
                </motion.div>
            </div>

            {/* Mockup Preview (if available) */}
            {mockupAsset?.s3_url && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#1a2235] border border-[#1e2d40] rounded-xl p-6"
                >
                    <h3 className="text-lg font-bold text-white mb-4">Product Mockup Preview</h3>
                    <div className="flex justify-center">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={mockupAsset.s3_url}
                            alt="Product Mockup"
                            className="max-w-md w-full h-auto rounded-lg border border-[#1e2d40]"
                        />
                    </div>
                </motion.div>
            )}
        </div>
    );
}

function EmptySection() {
    return (
        <div className="text-center py-16">
            <p className="text-[#8892a4]">Analysis data not available yet.</p>
        </div>
    );
}
