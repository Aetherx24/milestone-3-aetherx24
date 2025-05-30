/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.escuelajs.co'],
  },
  turbopack: {
    rules: {
      // Configure any Turbopack-specific rules here
    },
  },
}

module.exports = nextConfig 