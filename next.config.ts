import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['pg', 'pg-cloudflare'],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "pub-d26ac971841c4419a12ff6c81f286706.r2.dev",
      },
      {
        protocol: "https",
        hostname: "br-flat-grass-b5tjlkb4.storage.c-7.us-east-2.aws.neon.tech",
      },
    ],
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
