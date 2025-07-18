import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Article } from "@prisma/client";
import { Clock, ExternalLink } from "lucide-react";
interface NewsCardProps {
    news: Article;
}
export function NewsCard({ news }: NewsCardProps) {
    const timeAgo = new Date(news.publishedAt).toLocaleDateString();
    return (
        <motion.div whileHover={{ scale: 1.02 }} className="bg-neutral-800 rounded-xl border border-neutral-700 overflow-hidden hover:border-neutral-600 transition-all">
            <div className="aspect-video relative overflow-hidden">
                <Image src={news.urlToImage || "/placeholder.svg"} alt={news.title} fill style={{ objectFit: "cover" }} />
                <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-blue-600 text-xs font-semibold rounded-full">{news.category}</span>
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">{news.title}</h3> <p className="text-neutral-400 text-sm mb-4 line-clamp-3">{news.description}</p>
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-4">
                    <span>{news.sourceName}</span>
                    <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" /> <span>{timeAgo}</span>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <Link href={`/news/${news.id}`} className="flex-1">
                        <motion.button whileHover={{ scale: 1.02 }} className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors">
                            Generate AI Blog
                        </motion.button>
                    </Link>
                    <motion.a whileHover={{ scale: 1.05 }} href={news.url} target="_blank" rel="noopener noreferrer" className="p-2 bg-neutral-700 hover:bg-neutral-600 rounded-lg transition-colors">
                        <ExternalLink className="w-4 h-4" />
                    </motion.a>
                </div>
            </div>
        </motion.div>
    );
}
