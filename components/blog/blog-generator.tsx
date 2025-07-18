"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { NewsItem } from "@/lib/news-api";
import { Sparkles, FileText, BookOpen, Loader2 } from "lucide-react";

interface BlogGeneratorProps {
  news: NewsItem;
}

type BlogType = "SHORT" | "MEDIUM" | "EXPLAINED";

interface GeneratedBlog {
  type: BlogType;
  content: string;
}

export function BlogGenerator({ news }: BlogGeneratorProps) {
  const [selectedType, setSelectedType] = useState<BlogType>("SHORT");
  const [generatedBlogs, setGeneratedBlogs] = useState<GeneratedBlog[]>([]);
  const [loading, setLoading] = useState(false);

  const blogTypes = [
    {
      type: "SHORT" as BlogType,
      name: "Short Summary",
      description: "Quick 2-3 paragraph overview",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      type: "MEDIUM" as BlogType,
      name: "Detailed Analysis",
      description: "Comprehensive 4-5 paragraph breakdown",
      icon: <BookOpen className="w-5 h-5" />,
    },
    {
      type: "EXPLAINED" as BlogType,
      name: "Explained Version",
      description: "In-depth explanation with context",
      icon: <Sparkles className="w-5 h-5" />,
    },
  ];

  const generateBlog = async (type: BlogType) => {
    setLoading(true);

    try {
      const response = await fetch("/api/generate-blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newsId: news.id,
          type,
          title: news.title,
          description: news.description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate blog");
      }

      const data = await response.json();

      setGeneratedBlogs((prev) => {
        const filtered = prev.filter((blog) => blog.type !== type);
        return [...filtered, { type, content: data.content }];
      });
    } catch (error) {
      console.error("Error generating blog:", error);
    } finally {
      setLoading(false);
    }
  };

  const currentBlog = generatedBlogs.find((blog) => blog.type === selectedType);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-xl border border-gray-700 p-8"
    >
      <h2 className="text-2xl font-bold mb-6">
        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          AI Blog Generator
        </span>
      </h2>

      {/* Blog Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {blogTypes.map((type) => (
          <motion.button
            key={type.type}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedType(type.type)}
            className={`p-4 rounded-lg border transition-all ${
              selectedType === type.type
                ? "border-blue-500 bg-blue-500/10"
                : "border-gray-600 hover:border-gray-500"
            }`}
          >
            <div className="flex items-center space-x-3 mb-2">
              {type.icon}
              <span className="font-semibold">{type.name}</span>
            </div>
            <p className="text-sm text-gray-400">{type.description}</p>
          </motion.button>
        ))}
      </div>

      {/* Generate Button */}
      <div className="mb-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => generateBlog(selectedType)}
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          <span>
            {loading
              ? "Generating..."
              : `Generate ${
                  blogTypes.find((t) => t.type === selectedType)?.name
                }`}
          </span>
        </motion.button>
      </div>

      {/* Generated Content */}
      {currentBlog && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900 rounded-lg p-6 border border-gray-600"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span>
              Generated {blogTypes.find((t) => t.type === selectedType)?.name}
            </span>
          </h3>

          <div className="prose prose-invert max-w-none">
            <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
              {currentBlog.content}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
