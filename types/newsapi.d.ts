declare module 'newsapi' {
    class NewsAPI {
        constructor(apiKey: string);
        v2: {
            topHeadlines(params: {
                category?: 'business' | 'entertainment' | 'general' | 'health' | 'science' | 'sports' | 'technology';
                language?: string;
                country?: string;
                q?: string;
                sources?: string;
                pageSize?: number;
                page?: number;
            }): Promise<NewsAPIResponse>;
        };
    }

    export interface NewsAPIResponse {
        status: 'ok' | 'error';
        totalResults: number;
        articles: Article[];
        code?: string;
        message?: string;
    }

    export interface Article {
        source: {
            id: string | null;
            name: string;
        };
        author: string | null;
        title: string;
        description: string | null;
        url: string;
        urlToImage: string | null;
        publishedAt: string;
        content: string | null;
    }

    export default NewsAPI;
}
