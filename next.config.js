/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  images: {
    unoptimized: true,
  },

  basePath: process.env.NODE_ENV === 'production' ? '/Portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Portfolio' : '',

  trailingSlash: true,

  reactStrictMode: true,
  swcMinify: true,

  // Remove exportPathMap if not needed or use getStaticPaths for dynamic routes
}

module.exports = nextConfig
