import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Mock data for now - replace with actual news fetching logic
    const mockNews = {
      "1": {
        id: "1",
        title: "OpenAI Releases GPT-4 Turbo with Enhanced Capabilities",
        description:
          "OpenAI announces GPT-4 Turbo with improved performance and reduced costs for developers.",
        url: "https://example.com/news/1",
        imageUrl: "/placeholder.svg?height=400&width=800",
        category: "AI",
        publishedAt: new Date().toISOString(),
        source: "TechCrunch",
      },
      "2": {
        id: "2",
        title: "Apple Vision Pro: The Future of Spatial Computing",
        description:
          "Apple unveils its revolutionary mixed reality headset with groundbreaking features.",
        url: "https://example.com/news/2",
        imageUrl: "/placeholder.svg?height=400&width=800",
        category: "Hardware",
        publishedAt: new Date().toISOString(),
        source: "The Verge",
      },
      "3": {
        id: "3",
        title: "Meta Introduces Advanced AI Assistant for WhatsApp",
        description:
          "Meta rolls out AI-powered assistant across WhatsApp with multilingual support.",
        url: "https://example.com/news/3",
        imageUrl: "/placeholder.svg?height=400&width=800",
        category: "AI",
        publishedAt: new Date().toISOString(),
        source: "Wired",
      },
    };

    const news = mockNews[params.id as keyof typeof mockNews];

    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    // Track user history
    await prisma.userHistory.upsert({
      where: {
        userId_newsId: {
          userId: session.user.id,
          newsId: params.id,
        },
      },
      update: {},
      create: {
        userId: session.user.id,
        newsId: params.id,
      },
    });

    return NextResponse.json(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
