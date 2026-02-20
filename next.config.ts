import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Increase API route timeout for long-running LEVER generations
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

export default nextConfig;
