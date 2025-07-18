"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved.",
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};
export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-8xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4"
        >
          404
        </motion.div>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
            <Button className="flex items-center space-x-2">
              <Home className="w-4 h-4" /> <span>Go Home</span>
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="flex items-center space-x-2 bg-transparent"
            >
              <Search className="w-4 h-4" /> <span>Browse News</span>
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
