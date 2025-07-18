"use client";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
interface LoadingProps {
    size?: "sm" | "md" | "lg";
    text?: string;
}
export function Loading({ size = "md", text }: LoadingProps) {
    const sizeClasses = { sm: "w-4 h-4", md: "w-8 h-8", lg: "w-12 h-12" };
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center space-y-4">
            {" "}
            <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-500`} /> {text && <p className="text-sm text-gray-400 animate-pulse">{text}</p>}{" "}
        </motion.div>
    );
}
export function PageLoading() {
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            {" "}
            <Loading size="lg" text="Loading..." />{" "}
        </div>
    );
}