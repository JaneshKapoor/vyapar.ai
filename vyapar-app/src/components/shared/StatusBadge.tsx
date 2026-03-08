"use client";

import { cn } from "@/lib/utils";

interface StatusBadgeProps {
    status: string;
    className?: string;
}

const statusConfig: Record<string, { color: string; bg: string; pulse: boolean; label: string }> = {
    pending: { color: "text-yellow-400", bg: "bg-yellow-400", pulse: true, label: "Pending" },
    scraping: { color: "text-blue-400", bg: "bg-blue-400", pulse: true, label: "Scraping" },
    analyzing: { color: "text-[#FF9900]", bg: "bg-[#FF9900]", pulse: true, label: "Analyzing" },
    generating: { color: "text-purple-400", bg: "bg-purple-400", pulse: true, label: "Generating" },
    complete: { color: "text-[#00c853]", bg: "bg-[#00c853]", pulse: false, label: "Complete" },
    error: { color: "text-red-400", bg: "bg-red-400", pulse: false, label: "Error" },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const config = statusConfig[status] || statusConfig.pending;

    return (
        <span className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium", config.color, className)}
            style={{ background: `${config.bg.replace('bg-', '')}15` }}
        >
            <span className={cn("w-2 h-2 rounded-full", config.bg, config.pulse && "animate-pulse-dot")} />
            {config.label}
        </span>
    );
}
