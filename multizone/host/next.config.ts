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
      },
      {
        source: '/it-incubator',
        destination: `https://it-incubator.io`,
      }
    ];
  }
};

export default nextConfig;
