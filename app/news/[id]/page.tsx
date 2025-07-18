import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { BlogGenerator } from "@/components/blog/blog-generator";
interface NewsDetailPageProps {
    params: { id: string };
}
export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
    const article = await prisma.article.findUnique({ where: { id: params.id } });
    if (!article) {
        notFound();
    }
    return (
        <div className="min-h-screen bg-neutral-900">
            {" "}
            <Navbar />{" "}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {" "}
                <h1 className="text-4xl font-bold mb-4 text-white">{article.title}</h1>{" "}
                <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
                    {" "}
                    <img src={article.urlToImage || "/placeholder.svg"} alt={article.title} className="w-full h-full object-cover" />{" "}
                </div>{" "}
                <p className="text-neutral-300 mb-8">{article.description}</p> <BlogGenerator articleId={article.id} />{" "}
            </div>{" "}
            <Footer />{" "}
        </div>
    );
}
