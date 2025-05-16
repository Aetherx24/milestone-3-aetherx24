import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
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
  }
};

export default nextConfig;
