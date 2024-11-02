import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: '/zone',
        destination: `${process.env.ZONE_DOMAIN}/zone`,
      },
      {
        source: '/zone/:path+',
        destination: `${process.env.ZONE_DOMAIN}/zone/:path+`,
      }
    ];
  }
};

export default nextConfig;
