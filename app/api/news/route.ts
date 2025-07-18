import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { newsCategories } from "@/lib/news-api";

// Interface for the structure of an article from the NewsAPI
interface NewsApiArticle {
    source: { id: string | null; name: string };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

// Extract frontend category IDs for validation (excluding "all")
const VALID_FRONTEND_CATEGORIES = newsCategories.map((c) => c.id).filter((id) => id !== "all");

/**
 * Fetches articles from the NewsAPI for a given category and saves them to the database.
 * @param category The category object (e.g., { id: "business" }).
 */
async function fetchAndSaveArticles(category: { id: string }) {
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) {
        console.error("NEWS_API_KEY is not set.");
        return;
    }

    // The category ID from news-api.ts now directly matches the NewsAPI category.
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category.id}&apiKey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === "ok" && data.articles.length > 0) {
            const articles = data.articles
                .filter((article: NewsApiArticle) => article.title && article.url)
                .map((article: NewsApiArticle) => ({
                    title: article.title!,
                    url: article.url!,
                    description: article.description,
                    urlToImage: article.urlToImage,
                    publishedAt: new Date(article.publishedAt!),
                    category: category.id, // Save with the correct category ID
                    sourceName: article.source.name!,
                }));

            if (articles.length > 0) {
                await prisma.article.createMany({
                    data: articles,
                    skipDuplicates: true,
                });
            }
        } else if (data.status !== "ok") {
            console.error(`NewsAPI error for category "${category.id}":`, data.message);
        }
    } catch (error) {
        console.error(`Failed to fetch/save articles for category "${category.id}":`, error);
    }
}

/**
 * Handles GET requests to /api/news.
 */
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const categoryParam = searchParams.get("category") || "all";

    if (categoryParam !== "all" && !VALID_FRONTEND_CATEGORIES.includes(categoryParam)) {
        return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    try {
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

        if (categoryParam === "all") {
            const recentArticle = await prisma.article.findFirst({
                where: { category: "general", createdAt: { gte: oneHourAgo } },
            });

            if (!recentArticle) {
                const categoriesToFetch = newsCategories.filter((c) => c.id !== "all");
                await Promise.all(categoriesToFetch.map((category) => fetchAndSaveArticles(category)));
            }
        } else {
            const recentArticle = await prisma.article.findFirst({
                where: { category: categoryParam, createdAt: { gte: oneHourAgo } },
            });

            if (!recentArticle) {
                const categoryObject = newsCategories.find((c) => c.id === categoryParam);
                if (categoryObject) {
                    await fetchAndSaveArticles(categoryObject);
                }
            }
        }

        const whereClause = categoryParam === "all" ? {} : { category: categoryParam };
        const articles = await prisma.article.findMany({
            where: whereClause,
            orderBy: { publishedAt: "desc" },
            take: 50,
        });

        return NextResponse.json(articles);
    } catch (error) {
        console.error("Error in GET /api/news:", error);
        return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
    }
}