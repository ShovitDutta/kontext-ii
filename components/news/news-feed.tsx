"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NewsCard } from "./news-card";
import { Loader2 } from "lucide-react";
import { Article } from "@prisma/client";
interface NewsFeedProps {
    category: string;
}
export function NewsFeed({ category }: NewsFeedProps) {
    const [news, setNews] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/news?category=${category}`);
                const data = await response.json();
                if (response.ok) {
                    setNews(data);
                } else {
                    console.error("Error fetching news:", data.error);
                }
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, [category]);
    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }
    return (
        <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((item, index) => (
                    <motion.div key={item.id} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                        <NewsCard news={item} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
