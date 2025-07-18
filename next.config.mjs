/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    domains: ["placeholder.svg", "lh3.googleusercontent.com"],
    unoptimized: true,
  },
  experimental: { serverComponentsExternalPackages: ["@prisma/client"] },
  env: { NEXTAUTH_URL: process.env.NEXTAUTH_URL },
};
export default nextConfig;