import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/situm-poi-finder',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
