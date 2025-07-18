import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: "https://kontext-ai-news.vercel.app", lastModified: new Date(), changeFrequency: "daily", priority: 1 },
        { url: "https://kontext-ai-news.vercel.app/dashboard", lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
        { url: "https://kontext-ai-news.vercel.app/auth/signin", lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    ];
}