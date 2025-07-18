import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ErrorBoundary } from "@/components/ui/error-boundary";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: {
    default: "Kontext - AI-Powered News Blog",
    template: "%s | Kontext",
  },
  description:
    "Stay updated with the latest technology news, transformed into engaging blog posts using AI. Get personalized news content in short, medium, or explained formats.",
  keywords: [
    "AI",
    "news",
    "technology",
    "blog",
    "artificial intelligence",
    "tech news",
  ],
  authors: [{ name: "Kontext Team" }],
  creator: "Kontext",
  publisher: "Kontext",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kontext-ai-news.vercel.app",
    title: "Kontext - AI-Powered News Blog",
    description:
      "Transform complex technology news into engaging, personalized blog posts with AI.",
    siteName: "Kontext",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontext - AI-Powered News Blog",
    description:
      "Transform complex technology news into engaging, personalized blog posts with AI.",
    creator: "@kontext",
  },
  generator: "v0.dev",
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} bg-gray-900 text-white min-h-screen antialiased`}
      >
        <ErrorBoundary>
          <AuthProvider>{children}</AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
