"use client"

import { motion } from "framer-motion"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { LogOut, Home } from "lucide-react"

export function Navbar() {
  const { data: session } = useSession()

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            >
              Kontext
            </motion.div>
          </Link>

          <div className="flex items-center space-x-4">
            {session ? (
              <>
                <Link href="/dashboard">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
                  >
                    <Home className="w-4 h-4" />
                    <span>Dashboard</span>
                  </motion.button>
                </Link>

                <div className="flex items-center space-x-3">
                  <img
                    src={session.user?.image || "/placeholder.svg?height=32&width=32"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm">{session.user?.name}</span>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => signOut()}
                    className="p-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </motion.button>
                </div>
              </>
            ) : (
              <Link href="/auth/signin">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Sign In
                </motion.button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
