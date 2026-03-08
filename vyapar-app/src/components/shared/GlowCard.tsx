"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
    children: React.ReactNode;
    className?: string;
    glowColor?: string;
}

export function GlowCard({ children, className, glowColor = "rgba(255, 153, 0, 0.4)", ...props }: GlowCardProps) {
    return (
        <motion.div
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={cn(
                "relative bg-[#1a2235] border border-[#1e2d40] rounded-xl p-6 transition-all duration-300",
                "hover:shadow-lg",
                className
            )}
            style={{
                // @ts-expect-error CSS custom properties
                "--glow-color": glowColor,
            }}
            {...props}
        >
            <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: `0 0 20px ${glowColor}, inset 0 0 20px ${glowColor}15` }}
            />
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}
