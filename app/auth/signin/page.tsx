"use client";

import { motion } from "framer-motion";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Navbar } from "@/components/ui/navbar";
import { Chrome } from "lucide-react";

export default function SignIn() {
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.push("/dashboard");
      }
    });
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 p-8 rounded-2xl border border-gray-700 w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Welcome to Kontext
              </span>
            </h1>
            <p className="text-gray-400">
              Sign in to access AI-powered news content
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center space-x-3 px-6 py-4 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            <Chrome className="w-5 h-5" />
            <span>Continue with Google</span>
          </motion.button>

          <p className="text-center text-sm text-gray-400 mt-6">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>
      </div>
    </div>
  );
}
