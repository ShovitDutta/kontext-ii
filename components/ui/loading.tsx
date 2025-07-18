"use client";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
const loadingVariants = cva("flex flex-col items-center justify-center space-y-2", {
    variants: {
        size: {
            sm: "py-4",
            md: "py-8",
            lg: "py-12",
        },
    },
    defaultVariants: {
        size: "md",
    },
});
const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
};
export interface LoadingProps extends VariantProps<typeof loadingVariants> {
    text?: string;
}
export function Loading({ size = "md", text = "Fetching Latest Kontext..." }: LoadingProps) {
    return (
        <div className={cn(loadingVariants({ size }))}>
            <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-500`} />
            {text && <p className="text-sm text-neutral-400 animate-pulse">{text}</p>}
        </div>
    );
}
export function PageLoading() {
    return (
        <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
            <Loading size="lg" text="Loading..." />
        </div>
    );
}
