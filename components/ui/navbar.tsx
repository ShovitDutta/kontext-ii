"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Home } from "lucide-react";
export function Navbar() {
    return (
        <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
            <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center space-x-2">
                        <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Kontext
                        </motion.div>
                    </Link>
                    <div className="flex items-center space-x-4">
                        <Link href="/dashboard">
                            <motion.button whileHover={{ scale: 1.05 }} className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
                                <Home className="w-4 h-4" /> <span>Dashboard</span>
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
