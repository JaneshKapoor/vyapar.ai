"use client";

import { useEffect, useState } from "react";

interface ScoreRingProps {
    score: number;
    size?: number;
    strokeWidth?: number;
    className?: string;
}

export function ScoreRing({ score, size = 80, strokeWidth = 6, className }: ScoreRingProps) {
    const [animatedScore, setAnimatedScore] = useState(0);
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (animatedScore / 100) * circumference;

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedScore(score);
        }, 300);
        return () => clearTimeout(timer);
    }, [score]);

    const getColor = () => {
        if (animatedScore >= 75) return "#00c853";
        if (animatedScore >= 50) return "#FF9900";
        return "#ff3d3d";
    };

    return (
        <div className={`relative inline-flex items-center justify-center ${className}`}>
            <svg width={size} height={size} className="transform -rotate-90">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke="#1e2d40"
                    strokeWidth={strokeWidth}
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke={getColor()}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 1s ease-out, stroke 0.3s" }}
                />
            </svg>
            <span className="absolute text-sm font-bold" style={{ color: getColor() }}>
                {Math.round(animatedScore)}
            </span>
        </div>
    );
}
