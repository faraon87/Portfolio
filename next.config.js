/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Remove basePath and assetPrefix for Vercel
  experimental: {
    // Remove any experimental features that might cause issues
  }
}

module.exports = nextConfig
