"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NewsCard } from "./news-card";
import { Loader2 } from "lucide-react";
import { Article } from "@prisma/client";
import { Card, CardContent } from "@/components/ui/card";
interface NewsFeedProps {
    category: string;
    allArticles: Article[];
    setAllArticles: (articles: Article[]) => void;
}
export function NewsFeed({ category, allArticles, setAllArticles }: NewsFeedProps) {
    const [filteredNews, setFilteredNews] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchAndCacheNews = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/news?category=all`);
                const data = await response.json();
                if (response.ok) {
                    setAllArticles(data);
                } else {
                    console.error("Error fetching news:", data.error);
                }
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                setLoading(false);
            }
        };
        if (allArticles.length === 0) {
            fetchAndCacheNews();
        } else {
            setLoading(false);
        }
    }, [allArticles, setAllArticles]);
    useEffect(() => {
        if (category === "all") {
            setFilteredNews(allArticles);
        } else {
            setFilteredNews(allArticles.filter((item) => item.category === category));
        }
    }, [category, allArticles]);
    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center py-20">
                <p className="text-lg text-neutral-400 animate-pulse">Fetching Latest Kontext...</p>
            </div>
        );
    }
    if (filteredNews.length === 0) {
        return (
            <div className="flex justify-center items-center py-20">
                <Card className="w-full max-w-md bg-neutral-800 border-neutral-700">
                    <CardContent className="p-6">
                        <p className="text-center text-neutral-400">No latest blogs for this selected category.</p>
                    </CardContent>
                </Card>
            </div>
        );
    }
    return (
        <div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.map((item, index) => (
                    <motion.div key={item.id} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                        <NewsCard news={item} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
