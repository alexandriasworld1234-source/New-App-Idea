import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/New-App-Idea",
  images: {
    unoptimized: true,
  },
  // Increase API route timeout for long-running LEVER generations
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
