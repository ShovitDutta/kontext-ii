import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateBlogContent } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { newsId, type, title, description } = await request.json();

    if (!newsId || !type || !title || !description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if blog already exists
    const existingBlog = await prisma.generatedBlog.findFirst({
      where: {
        newsId,
        userId: session.user.id,
        type,
      },
    });

    if (existingBlog) {
      return NextResponse.json({ content: existingBlog.content });
    }

    // Generate new blog content
    const content = await generateBlogContent(title, description, type);

    // Save to database
    const blog = await prisma.generatedBlog.create({
      data: {
        newsId,
        userId: session.user.id,
        type,
        content,
      },
    });

    // Also save/update news item
    await prisma.news.upsert({
      where: { id: newsId },
      update: {},
      create: {
        id: newsId,
        title,
        description,
        url: `https://example.com/news/${newsId}`,
        imageUrl: "/placeholder.svg?height=400&width=800",
        category: "Technology",
        publishedAt: new Date(),
        source: "AI Generated",
      },
    });

    // Track user history
    await prisma.userHistory.upsert({
      where: {
        userId_newsId: {
          userId: session.user.id,
          newsId,
        },
      },
      update: {},
      create: {
        userId: session.user.id,
        newsId,
      },
    });

    return NextResponse.json({ content: blog.content });
  } catch (error) {
    console.error("Error generating blog:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
