import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone', // Enable standalone output for Docker
  images: {
    domains: ["jas3.hb.kz-ast.bizmrg.com"], // Add the hostname here
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // разрешить все HTTPS-домены
      },
    ],
  },
};

export default nextConfig;
