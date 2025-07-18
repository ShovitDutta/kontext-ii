"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { NewsCategories } from "@/components/news/news-categories";
import { NewsFeed } from "@/components/news/news-feed";
import { PageLoading } from "@/components/ui/loading";
import { newsCategories } from "@/lib/news-api";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <PageLoading />;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {session.user?.name?.split(" ")[0] || "User"}
            </span>
          </h1>
          <p className="text-gray-400">
            Discover the latest technology news, transformed by AI
          </p>
        </motion.div>

        <NewsCategories
          categories={newsCategories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <NewsFeed category={selectedCategory} />
      </div>

      <Footer />
    </div>
  );
}
