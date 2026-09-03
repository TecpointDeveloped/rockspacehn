import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  agentRules: false,
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
