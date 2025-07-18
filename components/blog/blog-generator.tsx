"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { ContentLength } from "@prisma/client";
interface BlogGeneratorProps {
    articleId: string;
}
type GeneratingState = { [key in ContentLength]?: boolean };
type GeneratedContentState = { [key in ContentLength]?: string };
export function BlogGenerator({ articleId }: BlogGeneratorProps) {
    const [generating, setGenerating] = useState<GeneratingState>({});
    const [generatedContent, setGeneratedContent] = useState<GeneratedContentState>({});
    const [error, setError] = useState<string | null>(null);
    const generateContent = async (length: ContentLength) => {
        setGenerating((prev) => ({ ...prev, [length]: true }));
        setError(null);
        try {
            const response = await fetch("/api/generate-blog", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ articleId, length }) });
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || "Failed to generate content");
            }
            if (response.headers.get("Content-Type")?.includes("application/json")) {
                const data = await response.json();
                setGeneratedContent((prev) => ({ ...prev, [length]: data.content }));
            } else {
                const reader = response.body?.getReader();
                if (!reader) throw new Error("Failed to read stream.");
                let content = "";
                const decoder = new TextDecoder();
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    const chunk = decoder.decode(value);
                    content += chunk;
                    setGeneratedContent((prev) => ({ ...prev, [length]: content }));
                }
            }
        } catch (err: unknown) {
            setError((err as Error).message);
            console.error("Generation error:", err);
        } finally {
            setGenerating((prev) => ({ ...prev, [length]: false }));
        }
    };
    return (
        <div className="space-y-8">
            <div className="flex space-x-4">
                {(Object.keys(ContentLength) as Array<keyof typeof ContentLength>).map((key) => (
                    <motion.button
                        key={key}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => generateContent(ContentLength[key])}
                        disabled={generating[ContentLength[key]]}
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                    >
                        {generating[ContentLength[key]] && <Loader2 className="w-4 h-4 animate-spin" />} <span>Generate {key.toLowerCase()} version</span>
                    </motion.button>
                ))}
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="space-y-6">
                {(Object.keys(ContentLength) as Array<keyof typeof ContentLength>).map((key) => (
                    <div key={key}>
                        {generatedContent[ContentLength[key]] && <div className="prose prose-invert mt-4 bg-neutral-800 p-4 rounded-lg whitespace-pre-wrap">{generatedContent[ContentLength[key]]}</div>}
                    </div>
                ))}
            </div>
        </div>
    );
}
