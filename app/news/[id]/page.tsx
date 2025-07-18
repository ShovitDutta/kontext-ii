"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { BlogGenerator } from "@/components/blog/blog-generator";
import { PageLoading } from "@/components/ui/loading";
import type { NewsItem } from "@/lib/news-api";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

// Mock news data - in real app, fetch from API
const mockNewsData: { [key: string]: NewsItem } = {
  "1": {
    id: "1",
    title: "OpenAI Releases GPT-4 Turbo with Enhanced Capabilities",
    description:
      "OpenAI announces GPT-4 Turbo with improved performance and reduced costs for developers. The new model features enhanced reasoning capabilities, better code generation, and support for longer context windows up to 128,000 tokens.",
    url: "https://example.com/news/1",
    imageUrl: "/placeholder.svg?height=400&width=800",
    category: "AI",
    publishedAt: new Date().toISOString(),
    source: "TechCrunch",
  },
  "2": {
    id: "2",
    title: "Apple Vision Pro: The Future of Spatial Computing",
    description:
      "Apple unveils its revolutionary mixed reality headset with groundbreaking features. The Vision Pro combines digital content with the physical world, offering unprecedented immersive experiences for work and entertainment.",
    url: "https://example.com/news/2",
    imageUrl: "/placeholder.svg?height=400&width=800",
    category: "Hardware",
    publishedAt: new Date().toISOString(),
    source: "The Verge",
  },
  "3": {
    id: "3",
    title: "Meta Introduces Advanced AI Assistant for WhatsApp",
    description:
      "Meta rolls out AI-powered assistant across WhatsApp with multilingual support. The assistant can help with various tasks including answering questions, providing recommendations, and assisting with daily activities.",
    url: "https://example.com/news/3",
    imageUrl: "/placeholder.svg?height=400&width=800",
    category: "AI",
    publishedAt: new Date().toISOString(),
    source: "Wired",
  },
};

export default function NewsDetail({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    // Simulate API call
    const fetchNews = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
      const newsItem = mockNewsData[params.id];
      setNews(newsItem || null);
      setLoading(false);
    };

    fetchNews();
  }, [params.id]);

  if (status === "loading" || loading) {
    return <PageLoading />;
  }

  if (!session) {
    return null;
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">News not found</h1>
            <p className="text-gray-400 mb-6">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/dashboard">
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                Back to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Dashboard</span>
            </motion.button>
          </Link>
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden mb-8"
        >
          <div className="aspect-video relative">
            <img
              src={news.imageUrl || "/placeholder.svg"}
              alt={news.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-blue-600 text-sm font-semibold rounded-full">
                {news.category}
              </span>
            </div>
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{news.title}</h1>

            <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
              <span>{news.source}</span>
              <span>{new Date(news.publishedAt).toLocaleDateString()}</span>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {news.description}
            </p>

            <motion.a
              whileHover={{ scale: 1.02 }}
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              <span>Read Original Article</span>
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </div>
        </motion.article>

        <BlogGenerator news={news} />
      </div>

      <Footer />
    </div>
  );
}
