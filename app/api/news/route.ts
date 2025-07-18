import NewsAPI from "newsapi";
import { type Article } from "newsapi";
import { prisma } from "@/lib/prisma";
const newsapi = new NewsAPI(process.env.NEWS_API_KEY!);
import { NextRequest, NextResponse } from "next/server";
type NewsApiCategory = "business" | "entertainment" | "general" | "health" | "science" | "sports" | "technology";
const VALID_CATEGORIES: NewsApiCategory[] = ["business", "entertainment", "general", "health", "science", "sports", "technology"];
function isValidCategory(category: string): category is NewsApiCategory {
    return VALID_CATEGORIES.includes(category as NewsApiCategory);
}
async function fetchAndSaveArticles(category: NewsApiCategory) {
    try {
        const response = await newsapi.v2.topHeadlines({ category: category, language: "en", country: "us" });
        if (response.status === "ok") {
            const articles = response.articles
                .filter((article: Article) => article.title && article.url)
                .map((article: Article) => ({
                    title: article.title!,
                    url: article.url!,
                    description: article.description,
                    urlToImage: article.urlToImage,
                    publishedAt: new Date(article.publishedAt!),
                    category: category,
                    sourceName: article.source.name!,
                }));
            if (articles.length > 0) await prisma.article.createMany({ data: articles, skipDuplicates: true });
        }
    } catch (error) {
        console.error(`Failed to fetch or save articles for category "${category}":`, error);
    }
}
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const categoryParam = searchParams.get("category") || "general";
    if (!isValidCategory(categoryParam)) {
        return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }
    try {
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        const recentArticle = await prisma.article.findFirst({ where: { category: categoryParam, createdAt: { gte: oneHourAgo } } });
        if (!recentArticle) await fetchAndSaveArticles(categoryParam);
        const articles = await prisma.article.findMany({ where: { category: categoryParam }, orderBy: { publishedAt: "desc" } });
        return NextResponse.json(articles);
    } catch (error) {
        console.error("Error in GET /api/news:", error);
        return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
    }
}
