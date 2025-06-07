import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.escuelajs.co'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
        pathname: '/**'
      },
      {
        protocol: "https",
        hostname: "test.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**"
      }
    ],
    dangerouslyAllowSVG: true,
  },
  turbopack: {
    rules: {
      // Configure any Turbopack-specific rules here
    },
  },
};

export default nextConfig;
