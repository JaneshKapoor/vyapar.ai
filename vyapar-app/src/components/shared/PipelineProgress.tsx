"use client";

import { motion } from "framer-motion";
import type { PipelineStep } from "@/types";
import { CheckCircle, Loader2, Circle, AlertCircle, Search, ShoppingCart, Globe, Brain, Palette, FileText } from "lucide-react";

const stepIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    "parse": Search,
    "scrape-amazon": ShoppingCart,
    "scrape-web": Globe,
    "analyze": Brain,
    "generate": Palette,
    "report": FileText,
};

interface PipelineProgressProps {
    steps: PipelineStep[];
}

export function PipelineProgress({ steps }: PipelineProgressProps) {
    return (
        <div className="space-y-4">
            {steps.map((step, index) => {
                const Icon = stepIcons[step.icon] || Circle;
                const isActive = step.status === "active";
                const isComplete = step.status === "complete";
                const isError = step.status === "error";

                return (
                    <motion.div
                        key={step.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 ${isActive ? "border-[#FF9900] bg-[#FF9900]/5" :
                                isComplete ? "border-[#00c853]/30 bg-[#00c853]/5" :
                                    isError ? "border-red-500/30 bg-red-500/5" :
                                        "border-[#1e2d40] bg-[#1a2235]/50"
                            }`}
                    >
                        <div className="flex-shrink-0">
                            {isComplete ? (
                                <CheckCircle className="w-6 h-6 text-[#00c853]" />
                            ) : isActive ? (
                                <Loader2 className="w-6 h-6 text-[#FF9900] animate-spin" />
                            ) : isError ? (
                                <AlertCircle className="w-6 h-6 text-red-400" />
                            ) : (
                                <Icon className="w-6 h-6 text-[#8892a4]" />
                            )}
                        </div>
                        <div className="flex-1">
                            <p className={`font-medium ${isActive ? "text-[#FF9900]" :
                                    isComplete ? "text-[#00c853]" :
                                        isError ? "text-red-400" :
                                            "text-[#8892a4]"
                                }`}>
                                {step.label}
                            </p>
                        </div>
                        {isActive && (
                            <motion.div
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                                className="text-xs text-[#FF9900]"
                            >
                                In progress...
                            </motion.div>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
}
