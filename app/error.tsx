"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 p-8 rounded-xl border border-gray-700 max-w-md w-full text-center"
      >
        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Something went wrong!</h2>
        <p className="text-gray-400 mb-6">
          We encountered an unexpected error. Please try again or return to the
          homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={reset} className="flex items-center space-x-2">
            <RefreshCw className="w-4 h-4" />
            <span>Try again</span>
          </Button>
          <Link href="/">
            <Button
              variant="outline"
              className="flex items-center space-x-2 w-full bg-transparent"
            >
              <Home className="w-4 h-4" />
              <span>Go home</span>
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
