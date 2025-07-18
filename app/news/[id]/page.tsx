import Image from "next/image";
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
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-2">{article.title}</h1>
                            <div className="flex items-center space-x-4 text-sm text-neutral-400">
                                <span>{article.author || "Unknown Author"}</span>
                                <span>&middot;</span>
                                <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                        <div className="aspect-video relative overflow-hidden rounded-lg">
                            <Image src={article.urlToImage || "/placeholder.svg"} alt={article.title} fill style={{ objectFit: "cover" }} />
                        </div>
                        <article className="prose prose-invert max-w-none">
                            <p>{article.description}</p>
                            <p>{article.content}</p>
                        </article>
                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline mt-4 inline-block">
                            Read Full Article &rarr;
                        </a>
                    </div>
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <BlogGenerator articleId={article.id} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
