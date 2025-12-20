/** @type {import('next').NextConfig} */
const nextConfig = {
  // Skip type and lint errors during build (only for deployment)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Images configuration for external domains
  images: {
    domains: ['images.unsplash.com'],
    unoptimized: true
  }
};

export default nextConfig;
