"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { ArrowRight, Sparkles, Zap, Shield, Globe } from "lucide-react";
export default function LandingPage() {
    const features = [
        {
            icon: <Sparkles className="w-8 h-8 text-blue-400" />,
            title: "AI-Powered Content",
            description: "Transform complex tech news into engaging, easy-to-understand blog posts using advanced AI.",
        },
        { icon: <Zap className="w-8 h-8 text-purple-400" />, title: "Real-time Updates", description: "Stay ahead with the latest technology news from trusted sources, updated in real-time." },
        { icon: <Shield className="w-8 h-8 text-green-400" />, title: "Personalized Experience", description: "Get personalized news recommendations based on your interests and reading history." },
        { icon: <Globe className="w-8 h-8 text-yellow-400" />, title: "Multiple Formats", description: "Choose from short summaries, detailed analysis, or explained versions for any news." },
    ];
    return (
        <div className="min-h-screen bg-gray-900">
            <Navbar />
            <section className="relative overflow-hidden">
                <div className="px-4 sm:px-6 lg:px-8 py-20">
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
                        <motion.h1 className="text-5xl md:text-7xl font-bold mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">AI-Powered</span> <br />
                            <span className="text-white">News Blog</span>
                        </motion.h1>
                        <motion.p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                            Transform complex technology news into engaging, personalized blog posts. Stay informed with AI-generated content tailored to your understanding level.
                        </motion.p>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href="/dashboard">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold text-lg flex items-center space-x-2 hover:from-blue-700 hover:to-purple-700 transition-all"
                                >
                                    <span>Get Started</span> <ArrowRight className="w-5 h-5" />
                                </motion.button>
                            </Link>
                            <motion.button whileHover={{ scale: 1.05 }} className="px-8 py-4 border border-gray-600 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors">
                                Learn More
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                    <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
                </div>
            </section>
            <section className="py-20">
                <div className="px-4 sm:px-6 lg:px-8">
                    <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
                        <h2 className="text-4xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Powerful Features</span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">Everything you need to stay informed about the latest technology trends</p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                                className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all"
                            >
                                <div className="mb-4">{feature.icon}</div> <h3 className="text-xl font-semibold mb-2">{feature.title}</h3> <p className="text-gray-400">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-12 rounded-2xl border border-gray-700"
                    >
                        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your News Experience?</h2>
                        <p className="text-xl text-gray-300 mb-8">Join thousands of users who stay informed with AI-powered news content</p>
                        <Link href="/dashboard">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all"
                            >
                                Start Reading Now
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
