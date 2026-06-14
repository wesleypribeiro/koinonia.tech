import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/koinonia.tech",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
