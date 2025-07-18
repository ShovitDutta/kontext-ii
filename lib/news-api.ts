export interface NewsItem {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  category: string;
  publishedAt: string;
  source: string;
}
const mockNews: NewsItem[] = [
  {
    id: "1",
    title: "OpenAI Releases GPT-4 Turbo with Enhanced Capabilities",
    description:
      "OpenAI announces GPT-4 Turbo with improved performance and reduced costs for developers.",
    url: "https://example.com/news/1",
    imageUrl: "/placeholder.svg?height=200&width=300",
    category: "AI",
    publishedAt: new Date().toISOString(),
    source: "TechCrunch",
  },
  {
    id: "2",
    title: "Apple Vision Pro: The Future of Spatial Computing",
    description:
      "Apple unveils its revolutionary mixed reality headset with groundbreaking features.",
    url: "https://example.com/news/2",
    imageUrl: "/placeholder.svg?height=200&width=300",
    category: "Hardware",
    publishedAt: new Date().toISOString(),
    source: "The Verge",
  },
  {
    id: "3",
    title: "Meta Introduces Advanced AI Assistant for WhatsApp",
    description:
      "Meta rolls out AI-powered assistant across WhatsApp with multilingual support.",
    url: "https://example.com/news/3",
    imageUrl: "/placeholder.svg?height=200&width=300",
    category: "AI",
    publishedAt: new Date().toISOString(),
    source: "Wired",
  },
];
export async function fetchNewsByCategory(
  category: string,
  page = 1,
  limit = 10
) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const filtered =
    category === "all"
      ? mockNews
      : mockNews.filter(
          (news) => news.category.toLowerCase() === category.toLowerCase()
        );
  const start = (page - 1) * limit;
  const end = start + limit;
  return {
    news: filtered.slice(start, end),
    hasMore: end < filtered.length,
    total: filtered.length,
  };
}
export const newsCategories = [
  { id: "all", name: "All", icon: "🌐" },
  { id: "ai", name: "AI & ML", icon: "🤖" },
  { id: "hardware", name: "Hardware", icon: "💻" },
  { id: "software", name: "Software", icon: "⚡" },
  { id: "mobile", name: "Mobile", icon: "📱" },
  { id: "web", name: "Web Dev", icon: "🌍" },
];
