import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const favorites = await prisma.favorite.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        news: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { newsId } = await request.json();

    if (!newsId) {
      return NextResponse.json(
        { error: "News ID is required" },
        { status: 400 }
      );
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: session.user.id,
        newsId,
      },
    });

    return NextResponse.json(favorite);
  } catch (error) {
    console.error("Error adding favorite:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { newsId } = await request.json();

    if (!newsId) {
      return NextResponse.json(
        { error: "News ID is required" },
        { status: 400 }
      );
    }

    await prisma.favorite.delete({
      where: {
        userId_newsId: {
          userId: session.user.id,
          newsId,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing favorite:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
