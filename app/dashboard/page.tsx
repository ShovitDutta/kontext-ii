"use client";
import { Article } from "@prisma/client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/navbar";
import { newsCategories } from "@/lib/news-api";
import { Footer } from "@/components/ui/footer";
import { NewsFeed } from "@/components/news/news-feed";
import { NewsCategories } from "@/components/news/news-categories";
export default function Dashboard() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [allArticles, setAllArticles] = useState<Article[]>([]);
    return (
        <div className="min-h-screen bg-neutral-900">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                        Welcome to <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Kontext</span>
                    </h1>
                    <p className="text-neutral-400">Discover the latest technology news, transformed by AI</p>
                </motion.div>
                <NewsCategories categories={newsCategories} selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />{" "}
                <NewsFeed category={selectedCategory} allArticles={allArticles} setAllArticles={setAllArticles} />
            </div>
            <Footer />
        </div>
    );
}
