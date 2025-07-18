"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { fetchNewsByCategory, type NewsItem } from "@/lib/news-api"
import { NewsCard } from "./news-card"
import { Loader2 } from "lucide-react"

interface NewsFeedProps {
  category: string
}

export function NewsFeed({ category }: NewsFeedProps) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    loadNews(true)
  }, [category])

  const loadNews = async (reset = false) => {
    const currentPage = reset ? 1 : page
    const loadingState = reset ? setLoading : setLoadingMore

    loadingState(true)

    try {
      const result = await fetchNewsByCategory(category, currentPage)

      if (reset) {
        setNews(result.news)
        setPage(2)
      } else {
        setNews((prev) => [...prev, ...result.news])
        setPage((prev) => prev + 1)
      }

      setHasMore(result.hasMore)
    } catch (error) {
      console.error("Error loading news:", error)
    } finally {
      loadingState(false)
    }
  }

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      loadNews()
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {news.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <NewsCard news={item} />
          </motion.div>
        ))}
      </motion.div>

      {hasMore && (
        <div className="flex justify-center mt-12">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {loadingMore && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{loadingMore ? "Loading..." : "Load More"}</span>
          </motion.button>
        </div>
      )}
    </div>
  )
}
