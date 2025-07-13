/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Set base path and asset prefix for GitHub Pages
  // Replace 'your-repo-name' with your actual repository name
  basePath: process.env.NODE_ENV === 'production' ? '/Portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Portfolio/' : '',
  
  // Ensure trailing slash for GitHub Pages
  trailingSlash: true,
  
  // Disable server-side features not supported in static export
  experimental: {
    // Remove any experimental features that don't work with static export
  },
  
  // Enable static generation
  reactStrictMode: true,
  
  // Optimize for static export
  swcMinify: true,
  
  // Handle dynamic routes (if any)
  exportPathMap: async function (defaultPathMap) {
    return {
      '/': { page: '/' },
      // Add any other static routes here
    }
  },
}

module.exports = nextConfig
