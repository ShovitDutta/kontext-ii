"use client";
import { motion } from "framer-motion";
interface Category {
    id: string;
    name: string;
    icon: string;
}
interface NewsCategoriesProps {
    categories: Category[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}
export function NewsCategories({ categories, selectedCategory, onCategoryChange }: NewsCategoriesProps) {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                    <motion.button
                        key={category.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onCategoryChange(category.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === category.id ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
                    >
                        <span>{category.icon}</span> <span>{category.name}</span>
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
}
