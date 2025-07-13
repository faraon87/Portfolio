/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: 'export', // for static export
  distDir: 'out',   // if you want to change output folder (optional)
}

module.exports = nextConfig
